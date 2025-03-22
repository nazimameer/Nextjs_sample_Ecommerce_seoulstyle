import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductFormType } from "@/lib/validations/product";
import { useFormContext } from "react-hook-form";
export const ProductCategory = () => {
  const {
    setValue,
    formState: { errors },
  } = useFormContext<ProductFormType>();
  return (
    <div>
      <p className="mb-2">Product category</p>
      <Select
        name="category"
        onValueChange={(value: string) => setValue("category", value)}
      >
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

      {errors.category && (
        <p className="text-red-500">{errors.category.message}</p>
      )}
    </div>
  );
};
