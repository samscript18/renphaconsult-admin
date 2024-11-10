import { UserStorage } from "@/lib/utils/localStorage";
import { User } from "@/schema/interfaces/admin.interface";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { logout } from "@/services/auth.service";

const NavbarDropdown = () => {
  const [tabOpened, setTabOpened] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  const toggleTab = () => setTabOpened((prev) => !prev);

  useEffect(() => {
    setUser(UserStorage.get());
  }, []);

  return (
    <div className="relative">
      <Image
        src={
          (user?.profilePicture as string) ||
          "https://res.cloudinary.com/dynopc0cn/image/upload/v1728734784/avatar_ym1ctb.jpg"
        }
        alt="profile"
        width={40}
        height={40}
        className="w-[40px] h-[40px] object-center object-cover rounded-full cursor-pointer"
        onClick={toggleTab}
      />

      {tabOpened && (
        <div className="absolute scale-up-center top-[105%] right-0 w-[150px] bg-[#00628f] rounded-md overflow-hidden z-20">
          <Link
            href={"/dashboard/profile"}
            onClick={toggleTab}
            className="w-full bg-transparent hover:bg-[#00648f] text-[#fff] block text-[.9rem] leading-6 py-4 font-semibold px-4 cursor-pointer no-underline"
          >
            Profile
          </Link>
          <div
            className="w-full bg-transparent hover:bg-[#00648f] block text-[.9rem] leading-6 py-4 font-semibold text-red-700 px-4 cursor-pointer"
            onClick={() => {
              logout();
              toggleTab();
            }}
          >
            Log Out
          </div>
        </div>
      )}
    </div>
  );
};

export default NavbarDropdown;
