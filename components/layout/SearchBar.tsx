"use client";

import { ChangeEvent } from "react";
import { search_icon, cross_icon } from "@/assets";
import Image from "next/image";
import { useSearchStore } from "@/app/store"; // Import Zustand store

export const SearchBar = () => {
  const { search, setSearch, toggleShowSearch, showSearch } = useSearchStore();

  return (
    showSearch && (
      <div className="border-t border-b text-center">
        <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
          <input
            value={search}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
            className="flex-1 outline-none bg-inherit text-sm"
            type="text"
            placeholder="Search"
          />
          <Image className="w-4" src={search_icon} alt="" />
        </div>
        <Image
          onClick={toggleShowSearch}
          className="inline w-3 cursor-pointer"
          src={cross_icon}
          alt=""
        />
      </div>
    )
  );
};
