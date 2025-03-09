import React from "react";
import Link from "next/link";
import { logo } from "@/assets";
import Image from "next/image";

export const Navbar = () => {
  return (
    <section className="flex items-center justify-between py-5 font-medium">
      <Link href="/">
        <Image src={logo} className="w-36" alt="logo" />
      </Link>
      <div className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm cursor-pointer">
        Logout
      </div>
    </section>
  );
};
