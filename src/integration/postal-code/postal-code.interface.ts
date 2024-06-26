export interface PostalCodeService {
  getAddressByPostalCode(cep: string): Promise<PostalCode>;
}

export const PostalCodeProvider = Symbol('PostalCodeService');

export interface PostalCode {
  street: string;
  district: string;
  city: string;
  state: string;
  zipCode: string;
}
