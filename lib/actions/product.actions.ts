"use server";

import { connectToDB } from "@/lib/database/mogoose";
import { Product } from "@/lib/models";
import { revalidatePath } from "next/cache";

interface IParams {
  name: string;
  description: string;
  price: number;
  category: string;
  subCategory: string;
  sizes: string[];
  imagesUrl: string[];
  bestseller: boolean;
  path: string;
}
export async function addProduct({
  name,
  description,
  price,
  category,
  subCategory,
  sizes,
  imagesUrl,
  bestseller,
  path,
}: IParams): Promise<void> {
  try {
    connectToDB();

    await Product.create({
      name,
      description,
      price,
      image: imagesUrl,
      category,
      subCategory,
      sizes,
      bestseller,
    });

    if (path === "/product/create") {
      revalidatePath(path);
    }
  } catch (error: any) {
    throw new Error(`Error create product : ${error.message}`);
  }
}
