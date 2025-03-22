"use client";
import Link from "next/link";
import { logo } from "@/assets";
import Image from "next/image";

export const Navbar = () => {
  return (
    <section className="flex items-center justify-between py-5 font-medium">
      <Link href="/">
        <Image src={logo} className="w-36" alt="logo" />
      </Link>
    </section>
  );
};
