import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const SubCategory = () => {
  return (
    <div>
      <p className="mb-2">Sub category</p>
      <Select name="subCategory">
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a sub category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="Topwear">Topwear</SelectItem>
            <SelectItem value="Bottomwear">Bottomwear</SelectItem>
            <SelectItem value="Winterwear">Winterwear</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
