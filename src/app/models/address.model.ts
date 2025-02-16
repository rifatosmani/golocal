// Address Model
export interface Address {
    addressId?: number;
    latitude: number;
    longitude: number;
    address: string;
    city: string;
    zipCode: string;
    country: string;
  }