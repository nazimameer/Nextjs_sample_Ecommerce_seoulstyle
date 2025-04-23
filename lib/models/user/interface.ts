import { Document } from "mongoose";

export interface IAddress extends Document {
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  isDefault?: boolean;
}

export interface IUser extends Document {
  id: number;
  email: string;
  addresses: IAddress[];
  role: string;
  isDeleted: boolean;
}
