import { registerAs } from '@nestjs/config';

export default registerAs('eventBus', () => ({
  aws: {
    endpoint: process.env.EVENT_BUS_AWS_ENDPOINT,
    region: process.env.EVENT_BUS_AWS_REGION,
    accessKeyId: process.env.EVENT_BUS_AWS_KEY_ID,
    secretAccessKey: process.env.EVENT_BUS_AWS_ACCESS_KEY,
    queueBaseUrl: process.env.EVENT_BUS_AWS_QUEUE_BASE_URL,
    topicBaseArn: process.env.EVENT_BUS_AWS_TOPIC_BASE_ARN,
  },
}));
