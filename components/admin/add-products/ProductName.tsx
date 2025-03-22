import { Input } from "@/components/ui/input";
import { ProductFormType } from "@/lib/validations/product";
import { useFormContext } from "react-hook-form";
export const ProductName = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProductFormType>();
  return (
    <div className="w-full">
      <p className="mb-2">Product name</p>
      <Input
        {...register("name")}
        className="w-full max-w-[500px] px-3 py-2 focus:outline-none focus:ring-0"
        type="text"
        placeholder="Type here"
        required
      />
      {errors.name && <p className="text-red-500">{errors.name.message}</p>}
    </div>
  );
};
