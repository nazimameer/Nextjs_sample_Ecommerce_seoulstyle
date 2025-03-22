import { ProductFormType } from "@/lib/validations/product";
import { useFormContext } from "react-hook-form";

export const ProductSizes = () => {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<ProductFormType>();

  const selectedSizes = watch("sizes", []);

  const handleSizeChange = (size: string) => {
    const updatedSizes = selectedSizes.includes(size)
      ? selectedSizes.filter((s) => s !== size)
      : [...selectedSizes, size];
    setValue("sizes", updatedSizes);
  };
  return (
    <div>
      <p className="mb-2">Product Sizes</p>
      <div className="flex gap-3">
        {["S", "M", "L", "XL", "XXL"].map((size) => (
          <label key={size} className="cursor-pointer">
            <input
              type="checkbox"
              name="sizes"
              value={size}
              onChange={() => handleSizeChange(size)}
              className="hidden peer"
            />
            <span className="px-3 py-1 bg-slate-200 peer-checked:bg-pink-100">
              {size}
            </span>
          </label>
        ))}
        {errors.sizes && <p className="text-red-500">{errors.sizes.message}</p>}
      </div>
    </div>
  );
};
