import { model, models, Schema } from "mongoose"; // Importing Mongoose modules
import { IProduct } from "./interface";


// Defining the Product schema
const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: [String], required: true },
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    sizes: { type: [String], required: true },
    bestseller: { type: Boolean },
  },
  { timestamps: true }
);

// Creating the Product model (prevents redefinition if it already exists)
export const Product = models?.Product || model("Product", ProductSchema);
