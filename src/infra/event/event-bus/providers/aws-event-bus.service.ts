import {
  GetTopicAttributesCommand,
  PublishCommand,
  SNSClient,
} from '@aws-sdk/client-sns';
import { SQSClient, GetQueueAttributesCommand } from '@aws-sdk/client-sqs';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HealthCheckError, HealthIndicatorResult } from '@nestjs/terminus';
import { Consumer } from 'sqs-consumer';
import { ConsumeEventError } from '../consume-event.error';
import {
  Event,
  EventAttributes,
  EventBusService,
  Resource,
} from '../event-bus.interface';
import { PublishEventError } from '../publish-event.error';

@Injectable()
export class AwsEventBusService implements EventBusService {
  private logger: Logger = new Logger(AwsEventBusService.name);
  private snsClient: SNSClient;
  private sqsClient: SQSClient;
  private static resourcesToCheck: {
    topics: string[];
    queues: string[];
  };

  constructor(private configService: ConfigService) {
    const awsCredentials = {
      endpoint: configService.get('eventBus.aws.endpoint'),
      region: configService.get('eventBus.aws.region'),
      credentials: {
        accessKeyId: configService.get('eventBus.aws.accessKeyId'),
        secretAccessKey: configService.get('eventBus.aws.secretAccessKey'),
      },
    };
    this.snsClient = new SNSClient(awsCredentials);
    this.sqsClient = new SQSClient(awsCredentials);
  }

  public async publish(
    destination: string,
    eventName: string,
    body: any,
    attributes?: EventAttributes[],
  ) {
    try {
      const topicName = this.topicName(destination);
      const message = JSON.stringify(body);

      const messageAttributes = {
        EventName: {
          DataType: 'String',
          StringValue: eventName,
        },
      };

      if (attributes) {
        attributes.forEach((attribute) => {
          messageAttributes[attribute.name] = {
            DataType: 'String',
            StringValue: attribute.value,
          };
        });
      }

      await this.snsClient.send(
        new PublishCommand({
          Message: message,
          TopicArn: topicName,
          MessageGroupId: destination,
          MessageDeduplicationId: `${destination}_${new Date().getTime().toFixed()}`,
          MessageAttributes: messageAttributes,
        }),
      );
    } catch (error) {
      const publishError = new PublishEventError(error);
      this.logger.error(publishError.toString());
      throw publishError;
    }
  }

  public async eventOnSubscribed(
    name: string,
    callback: (event: Event) => any,
  ) {
    const queueName = this.queueName(name);

    const consumer = Consumer.create({
      queueUrl: queueName,
      handleMessage: async (data) => {
        const body = JSON.parse(data.Body);
        const event: Event = {
          id: data.MessageId,
          raw: data,
          source: body.TopicArn,
          body: body.Message,
          attributes: {},
        };
        try {
          await callback(event);
        } catch (error) {
          const consumeError = new ConsumeEventError(error);
          this.logger.error(consumeError.toString());
          throw error;
        }
      },
      sqs: this.sqsClient,
    });

    consumer.on('error', (error) => {
      this.logger.error(`Error ${error.message}`);
    });

    consumer.on('processing_error', (error) => {
      this.logger.error(error.message);
    });

    consumer.start();
  }

  registerToCheck(resource: Resource) {
    if (!AwsEventBusService.resourcesToCheck) {
      AwsEventBusService.resourcesToCheck = { topics: [], queues: [] };
    }

    if (resource.topic) {
      AwsEventBusService.resourcesToCheck.topics.push(
        this.topicName(resource.topic),
      );
    }
    if (resource.queue) {
      AwsEventBusService.resourcesToCheck.queues.push(
        this.queueName(resource.queue),
      );
    }
  }

  public async pingCheck(): Promise<HealthIndicatorResult> {
    const result: HealthIndicatorResult = { eventBus: {} as any };

    const topicsResult = await this.checkResource(
      AwsEventBusService.resourcesToCheck.topics,
      (resourceName) =>
        this.snsClient.send(
          new GetTopicAttributesCommand({ TopicArn: resourceName }),
        ),
    );

    const queuesResult = await this.checkResource(
      AwsEventBusService.resourcesToCheck.queues,
      (resourceName) =>
        this.sqsClient.send(
          new GetQueueAttributesCommand({
            QueueUrl: resourceName,
            AttributeNames: ['All'],
          }),
        ),
    );

    const isHealthy = !topicsResult && !queuesResult;

    if (!isHealthy) {
      result.eventBus.status = 'down';
      result.eventBus.detail = { ...topicsResult, ...queuesResult };
      throw new HealthCheckError('EventBus check failed!', result);
    }

    result.eventBus.status = 'up';
    return result;
  }

  private async checkResource(
    resources: string[],
    checkFunction: (resourceName: string) => void,
  ) {
    let result: { [key: string]: string };

    for (const resource of resources) {
      try {
        await checkFunction(resource);
      } catch (error) {
        if (!result) {
          result = {} as any;
        }
        result[resource] = error.message;
      }
    }
    return result;
  }

  private topicName(name: string) {
    return `${this.configService.get('eventBus.aws.topicBaseArn')}:${name}.fifo`;
  }

  private queueName(name: string) {
    return `${this.configService.get('eventBus.aws.queueBaseUrl')}:${name}.fifo`;
  }
}
