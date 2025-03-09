import { Input } from "@/components/ui/input";

export const ProductPrice = () => {
  return (
    <div>
      <p className="mb-2">Product Price</p>
      <Input
        name="price"
        className="w-full px-3 py-2 sm:w-[120px]"
        type="Number"
        placeholder="25"
      />
    </div>
  );
};
