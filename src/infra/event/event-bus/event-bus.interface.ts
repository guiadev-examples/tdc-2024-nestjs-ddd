import { HealthIndicatorResult } from '@nestjs/terminus';

export interface EventBusService {
  publish(
    destination: string,
    eventName: string,
    body: any,
    attributes?: EventAttributes[],
  ): any;
  eventOnSubscribed(name: string, callback: (event: Event) => any): any;
  //HealthCheck methods
  registerToCheck(resource: Resource): any;
  pingCheck(): Promise<HealthIndicatorResult>;
}

export const EventBusProvider = Symbol('EventBusService');

export interface Resource {
  topic?: string;
  queue?: string;
}

export interface Event {
  id: string;
  raw: any;
  source: string;
  body: any;
  attributes: any;
}

export interface EventAttributes {
  name: string;
  value: string;
}
