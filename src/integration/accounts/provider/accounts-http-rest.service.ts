import { Injectable } from '@nestjs/common';

import { Customer, CustomerService } from '../customer.interface';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AccountsHttpRestService implements CustomerService {

  constructor(private configService: ConfigService, 
    private readonly httpService: HttpService) {}

  async getCustomer(): Promise<Customer> {
    const accountHost = this.configService.get('accounts.host');
    const { data } = await firstValueFrom(
      this.httpService.get<Customer>(accountHost).pipe(
        catchError((error: AxiosError) => {          
          throw 'An error happened!';
        }),
      ),
    );
    return data;
  }

}
