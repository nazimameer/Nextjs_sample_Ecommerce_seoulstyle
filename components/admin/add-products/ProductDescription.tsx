import { Textarea } from "@/components/ui/textarea";
import { ProductFormType } from "@/lib/validations/product";
import { useFormContext } from "react-hook-form";

export const ProductDescription = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProductFormType>();
  return (
    <div className="w-full">
      <p className="mb-2">Product description</p>

      <Textarea
        {...register("description")}
        placeholder="Type your message here."
        className="w-full max-w-[500px] px-3 py-2"
        required
      />
      {errors.description && (
        <p className="text-red-500">{errors.description.message}</p>
      )}
    </div>
  );
};
