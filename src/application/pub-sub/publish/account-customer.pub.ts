
import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EventBusProvider, EventBusService } from '@infra/event/event-bus/event-bus.interface';
import { Customer } from '@domain/accounts/customer.entity';

@Injectable()
export class CustomerCompanyPub {
  constructor(
    @Inject(EventBusProvider)
    private eventBus: EventBusService,
  ) {}

  @OnEvent('customer.created')
  async handleCompanyCreatedEvent(customer: Customer) {
    const desctination = 'Accounts_Customer.fifo';
    const eventName = 'CREATED';

    this.eventBus.publish(desctination, eventName, customer);
  }
}
