import { Textarea } from "@/components/ui/textarea";

export const ProductDescription = () => {
  return (
    <div className="w-full">
      <p className="mb-2">Product description</p>

      <Textarea
        name="description"
        placeholder="Type your message here."
        className="focus:outline-none focus:ring-0"
        required
      />
    </div>
  );
};
