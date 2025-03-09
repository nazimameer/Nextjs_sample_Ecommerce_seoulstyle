"use client";

import { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import { upload_area } from "@/assets"; // Make sure this is the correct path

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

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      handleFileSelect(file, index); // Pass the selected file to the parent
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
        onChange={handleImageChange}
      />
    </label>
  );
};
