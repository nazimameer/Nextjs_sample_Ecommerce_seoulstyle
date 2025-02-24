"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  logo,
  search_icon,
  profile_icon,
  cart_icon,
  menu_icon,
  dropdown_icon,
} from "@/assets";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSearchStore } from "@/app/store";

export const Navbar = () => {
  const router = useRouter();
  const [visible, setVisible] = useState<boolean>(false);
  const { toggleShowSearch } = useSearchStore();
  //   const getCartCount = () => {};
  const logout = () => {};
  const token = false;
  return (
    <section className="flex items-center justify-between py-5 font-medium">
      <Link href="/">
        <Image src={logo} className="w-36" alt="logo" />
      </Link>
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <Link href="/" className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </Link>
        <Link href="/collection" className="flex flex-col items-center gap-1">
          <p>COLLECTION</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </Link>
        <Link href="/about" className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </Link>
        <Link href="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </Link>
      </ul>

      <div className="flex items-center gap-6">
        <Image
          onClick={toggleShowSearch}
          src={search_icon}
          className="w-5 cursor-pointer"
          alt=""
        />

        <div className="group relative">
          <Image
            onClick={() => (token ? null : router.push("/login"))}
            className="w-5 cursor-pointer"
            src={profile_icon}
            alt=""
          />
          {/* Dropdown Menu */}
          {token && (
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
              <div className="flex flex-col gap-2 w-36 py-3 px-5  bg-slate-100 text-gray-500 rounded">
                <p className="cursor-pointer hover:text-black">My Profile</p>
                <p
                  onClick={() => router.push("/orders")}
                  className="cursor-pointer hover:text-black"
                >
                  Orders
                </p>
                <p onClick={logout} className="cursor-pointer hover:text-black">
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>
        <Link href="/cart" className="relative">
          <Image src={cart_icon} className="w-5 min-w-5" alt="" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {/* {getCartCount()} */}2
          </p>
        </Link>
        <Image
          onClick={() => setVisible(true)}
          src={menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt=""
        />
      </div>

      {/* Sidebar menu for small screens */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <Image className="h-4 rotate-180" src={dropdown_icon} alt="" />
            <p>Back</p>
          </div>
          <Link
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            href="/"
          >
            HOME
          </Link>
          <Link
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            href="/collection"
          >
            COLLECTION
          </Link>
          <Link
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            href="/about"
          >
            ABOUT
          </Link>
          <Link
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            href="/contact"
          >
            CONTACT
          </Link>
        </div>
      </div>
    </section>
  );
};
