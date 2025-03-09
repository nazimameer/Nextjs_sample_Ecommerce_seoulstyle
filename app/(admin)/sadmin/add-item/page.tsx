"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  AddToBestSeller,
  ProductCategory,
  ProductDescription,
  ProductName,
  ProductPrice,
  ProductSizes,
  SubCategory,
  UploadImages,
} from "@/components/admin";
export default function page() {
  const [selectedFiles, setSelectedFiles] = useState<(File | null)[]>([
    null,
    null,
    null,
    null,
  ]);

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent page reload

    const formData = new FormData(event.currentTarget); // Get form data

    // Extracting form values
    const data = {
      name: formData.get("name"),
      description: formData.get("description"),
      price: formData.get("price"),
      category: formData.get("category"),
      subCategory: formData.get("subCategory"),
      bestseller: formData.get("bestseller") === "on", // Checkbox value
      sizes: formData.getAll("sizes"), // Get all selected sizes
      selectedFiles,
    };

    console.log(data); // Log extracted data
  };
  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full items-start gap-3"
    >
      <div>
        <p className="mb-2">Upload Image</p>

        <div className="flex gap-2">
          {[1, 2, 3, 4].map((num: number, index: number) => (
            <UploadImages
              key={index}
              index={index}
              selectedFiles={selectedFiles}
              setSelectedFiles={setSelectedFiles}
            />
          ))}
        </div>
      </div>

      <ProductName />

      <ProductDescription />

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <ProductCategory />

        <SubCategory />

        <ProductPrice />
      </div>

      <ProductSizes />

      <AddToBestSeller />

      <Button type="submit" className="w-28 py-3 mt-4 bg-black text-white">
        ADD
      </Button>
    </form>
  );
}
