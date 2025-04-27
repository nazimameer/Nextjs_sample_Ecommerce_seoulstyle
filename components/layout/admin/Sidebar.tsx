import Link from "next/link";
import { add_icon, order_icon } from "@/assets";
import Image from "next/image";

export const Sidebar = () => {
  return (
    <div className="w-[18%] min-h-screen border-r-2">
      <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
        <Link
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
          href={"/admin/add-item"}
        >
          <Image className="w-5 h-5" src={add_icon} alt="" />
          <p className="hidden md:block">Add Items</p>
        </Link>

        <Link
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
          href={"/list"}
        >
          <Image className="w-5 h-5" src={order_icon} alt="" />
          <p className="hidden md:block">List Items</p>
        </Link>

        <Link
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
          href={"/orders"}
        >
          <Image className="w-5 h-5" src={order_icon} alt="" />
          <p className="hidden md:block">Orders</p>
        </Link>
      </div>
    </div>
  );
};
