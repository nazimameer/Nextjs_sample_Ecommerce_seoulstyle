import { Input } from "@/components/ui/input";
import { ProductFormType } from "@/lib/validations/product";
import { useFormContext } from "react-hook-form";

export const ProductPrice = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProductFormType>();
  return (
    <div>
      <p className="mb-2">Product Price</p>
      <Input
        {...register("price")}
        className="w-full px-3 py-2 sm:w-[120px]"
        type="Number"
        placeholder="25"
      />
      {errors.price && <p className="text-red-500">{errors.price.message}</p>}
    </div>
  );
};
