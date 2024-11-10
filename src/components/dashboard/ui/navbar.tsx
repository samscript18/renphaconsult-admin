"use client";
import { dashboardLinks } from "@/lib/data/navbarLinks.data";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import NavbarDropdown from "./navbarDropdown";
import NavDropdown from "./navDropdown";
import logo from "../../../../public/images/logos/logo1.png";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-gray-200 px-1.5 md:px-[2.5rem] py-1.5 w-full">
      <div className="w-full flex items-center justify-between">
        <Link href={"/"}>
          <Image src={logo} width={150} height={100} alt="logo" />
        </Link>

        <ul className="hidden z-[5] w-full h-auto mx-auto md:flex items-center justify-center gap-[15rem]">
          {dashboardLinks?.map((link, index) => {
            return (
              <li key={index} className="md:pt-6">
                <Link
                  href={link.href}
                  className={`hover:font-bold py-3 px-4 text-[#00628f] md:text-[.75rem] no-underline uppercase ${
                    pathname.includes(link.href) && "font-bold"
                  }`}
                >
                  {link.text}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-4">
          <NavbarDropdown />
          <NavDropdown />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
