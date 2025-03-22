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

export const SubCategory = () => {
  const {
    setValue,
    formState: { errors },
  } = useFormContext<ProductFormType>();
  return (
    <div>
      <p className="mb-2">Sub category</p>
      <Select
        name="subCategory"
        onValueChange={(value: string) => setValue("subCategory", value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a sub category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="Topwear">Topwear</SelectItem>
            <SelectItem value="Bottomwear">Bottomwear</SelectItem>
            <SelectItem value="Winterwear">Winterwear</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      {errors.subCategory && (
        <p className="text-red-500">{errors.subCategory.message}</p>
      )}
    </div>
  );
};
