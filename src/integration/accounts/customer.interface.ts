export interface CustomerService {
  getCustomer(publicId: string): Promise<Customer>;
}

export const CustomerProvider = Symbol('CustomerService');

export interface Customer {
  name: string;
  socialIdentification: string;  
}

export interface Address {
  street: string;
  district: string;
  city: string;
  state: string;
  zipCode: string;
}
