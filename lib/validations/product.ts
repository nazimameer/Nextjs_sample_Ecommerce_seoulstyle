import * as z from "zod";

export const ProductValidation = z.object({
  name: z.string().min(3).max(30),
  description: z.string().min(3).max(30),
  category: z.string().nonempty(),
  subCategory: z.string().min(3).max(30),
  price: z.number().min(3).max(30),
  sizes: z.array(z.string()),
  bestSeller: z.boolean(),
});

export type ProductFormType = z.infer<typeof ProductValidation>;
