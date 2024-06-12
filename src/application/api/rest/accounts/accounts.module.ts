import { Module, forwardRef } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { AccountsContextModule } from '@domain/accounts/accounts.module';

@Module({
    imports: [forwardRef(() => AccountsContextModule)],
    controllers: [CustomerController],
})
export class AccountsModule {}
