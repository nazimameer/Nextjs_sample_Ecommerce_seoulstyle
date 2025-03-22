import { ProductFormType } from "@/lib/validations/product";
import { useFormContext } from "react-hook-form";

export const AddToBestSeller = () => {
  const { setValue } = useFormContext<ProductFormType>();
  return (
    <div className="flex gap-2 mt-2">
      <input
        type="checkbox"
        id="bestseller"
        name="bestseller"
        onChange={(e) => setValue("bestSeller", e.target.checked)}
      />
      <label className="cursor-pointer" htmlFor="bestseller">
        Add to bestseller
      </label>
    </div>
  );
};
