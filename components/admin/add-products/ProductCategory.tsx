import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

export const ProductCategory = () => {
  return (
    <div>
      <p className="mb-2">Product category</p>
      <Select name="category">
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="Men">Men</SelectItem>
            <SelectItem value="Women">Women</SelectItem>
            <SelectItem value="Kids">Kids</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
