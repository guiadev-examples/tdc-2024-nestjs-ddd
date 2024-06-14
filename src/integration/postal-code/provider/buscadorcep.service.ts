import { Injectable } from '@nestjs/common';

import * as buscadorcep from 'buscadorcep';
import { PostalCode, PostalCodeService } from '../postal-code.interface';

@Injectable()
export class BuscadorCepService implements PostalCodeService {
  async getAddressByPostalCode(cep: string): Promise<PostalCode> {
    try {
      const address = await buscadorcep(cep);
      if (address.erro) {
        throw new Error(`Zipcode not found: '${cep}'`);
      }
      return {
        street: address.logradouro,
        district: address.bairro,
        city: address.localidade,
        state: address.uf,
        zipCode: address.cep,
      };
    } catch (error) {
      if (error.name === 'FetchError') {
        throw new Error(`Invalid Zipcode: '${cep}'`);
      }
      throw error;
    }
  }
}
