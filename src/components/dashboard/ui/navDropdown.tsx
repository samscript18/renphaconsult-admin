import Link from "next/link";
import React, { useState } from "react";
import { dashboardLinks } from "@/lib/data/navbarLinks.data";
import { usePathname } from "next/navigation";
import { RiCloseLine } from "react-icons/ri";
import { HiOutlineMenu } from "react-icons/hi";

const NavDropdown = () => {
  const [tabOpened, setTabOpened] = useState<boolean>(false);
  const toggleTab = () => setTabOpened((prev) => !prev);
  const pathname = usePathname();

  return (
    <div className="relative md:hidden">
      {tabOpened ? (
        <RiCloseLine
          size={35}
          className="text-[#00628f] cursor-pointer md:hidden"
          onClick={toggleTab}
        />
      ) : (
        <HiOutlineMenu
          size={35}
          className="text-[#00628f] cursor-pointer md:hidden"
          onClick={toggleTab}
        />
      )}

      {tabOpened && (
        <div className="absolute scale-up-center top-[115%] right-0 w-[160px] text-center h-auto bg-[#00628f] rounded-lg shadow-md z-10">
          {dashboardLinks?.map((link, index) => {
            return (
              <li
                onClick={toggleTab}
                key={index}
                className="py-6 md:py-0 list-none"
              >
                <Link
                  href={link.href}
                  className={`hover:font-bold py-3 px-4 text-[1.05rem] leading-6 text-white text-center capitalize no-underline ${
                    pathname.includes(link.href) && "font-bold"
                  }`}
                >
                  {link.text}
                </Link>
              </li>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default NavDropdown;
