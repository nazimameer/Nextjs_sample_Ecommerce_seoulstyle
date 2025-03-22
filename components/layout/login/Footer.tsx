import { logo } from "@/assets";
import Image from "next/image";
export const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <Image src={logo} className="mb-5 w-32" alt="" />
          <p className="w-full md:w-2/3 text-gray-600">
            Seoul Style is a trusted India-based online store offering
            high-quality Korean fashion. We bring you the latest trends from
            Seoul, ensuring stylish, authentic, and affordable apparel. With
            secure shopping, reliable service, and customer satisfaction as our
            priority, we make K-fashion accessible to you. Shop with confidence!
            🇰🇷✨
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>seoulstyleindia@gmail.com</li>
          </ul>
        </div>
      </div>

      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          © {currentYear} - All rights reserved @seoulstyle.store
        </p>
      </div>
    </div>
  );
};
