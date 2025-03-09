export const AddToBestSeller = () => {
  return (
    <div className="flex gap-2 mt-2">
      <input
        type="checkbox"
        id="bestseller"
        name="bestseller"
      />
      <label className="cursor-pointer" htmlFor="bestseller">
        Add to bestseller
      </label>
    </div>
  );
};
