import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import { upload_area } from "@/assets";

interface Props {
  index: number;
  setSelectedFiles: Dispatch<SetStateAction<(File | null)[]>>;
  selectedFiles: (File | null)[];
}

export const UploadImages = ({
  index,
  setSelectedFiles,
  selectedFiles,
}: Props) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileSelect = (file: File | null, index: number) => {
    const newFiles = [...selectedFiles];
    newFiles[index] = file;
    setSelectedFiles(newFiles);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.target.files && e.target.files.length) {
      const file = e.target.files?.[0];
      handleFileSelect(file, index);
      if (!file.type.includes("image")) return;
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <label htmlFor={`image${index}`} className="cursor-pointer">
      <Image
        className="w-20 h-20 object-cover border border-gray-300"
        src={preview || upload_area}
        alt="Upload preview"
        width={80}
        height={80}
      />
      <input
        id={`image${index}`}
        type="file"
        accept="image/*"
        className="hidden"
        placeholder="Upload a photo"
        onChange={handleImageChange}
      />
    </label>
  );
};
