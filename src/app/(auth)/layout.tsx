import Navbar from "@/components/ui/navbar";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function AuthLayout({ children }: Props) {
  return (
    <>
      <Navbar />
      <section className="home-categories min-h-screen after:bg-cover after:bg-center flex items-center justify-center z-[4] pb-[5px] pt-[100px]">
        <div
          className="relative w-[96vw] max-w-[400px] py-8 md:py-5 px-8 md:px-14 bg-[#7499da] overflow-hidden rounded-sm z-[4]"
          style={{
            background:
              "radial-gradient(circle, rgba(76,164,207,1) 35%, rgba(135,148,180,1) 100%)",
          }}
        >
          {children}
        </div>
      </section>
    </>
  );
}
