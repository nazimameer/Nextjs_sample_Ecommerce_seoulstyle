import { Input } from "@/components/ui/input";
export const ProductName = () => {
  return (
    <div className="w-full">
      <p className="mb-2">Product name</p>
      <Input
        name="name"
        className="w-full max-w-[500px] px-3 py-2 focus:outline-none focus:ring-0"
        type="text"
        placeholder="Type here"
        required
      />
    </div>
  );
};
