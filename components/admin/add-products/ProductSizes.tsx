export const ProductSizes = () => {
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
              className="hidden peer"
            />
            <span className="px-3 py-1 bg-slate-200 peer-checked:bg-pink-100">
              {size}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};
