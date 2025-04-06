import { Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  image: string[]; // Assuming an array of image URLs or file paths
  category: string;
  subCategory: string;
  sizes: string[]; // Assuming an array of size strings (e.g., ["S", "M", "L"])
  bestseller?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export const userRoles = ["admin", "user"] as const