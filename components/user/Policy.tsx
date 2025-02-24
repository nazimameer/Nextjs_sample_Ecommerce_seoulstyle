import Image from "next/image";
import { support_img, shipping_icon, quality_icon } from "@/assets";

export const Policy = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700">
      <div className="mt-1.5">
        <Image src={shipping_icon} className="w-16 m-auto mb-5" alt="" />
        <p className=" font-semibold">Free Delivery Across India</p>
        <p className=" text-gray-400">
          We provide free delivery across India with no additional charges!
        </p>
      </div>
      <div>
        <Image src={quality_icon} className="w-12 m-auto mb-5" alt="" />
        <p className=" font-semibold">7 Days Return Policy</p>
        <p className=" text-gray-400">We provide 7 days free return policy</p>
      </div>
      <div>
        <Image src={support_img} className="w-12 m-auto mb-5" alt="" />
        <p className=" font-semibold">Best customer support</p>
        <p className=" text-gray-400">We provide 24/7 customer support</p>
      </div>
    </div>
  );
};
