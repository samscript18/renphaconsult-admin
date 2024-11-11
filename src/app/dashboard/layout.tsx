"use client";
import Navbar from "@/components/dashboard/ui/navbar";
import { ReactElement } from "react";
import DotLoader from "@/components/ui/dot-loader";
import { useGetProfile } from "@/services/admin.service";

interface Props {
  children?: ReactElement | ReactElement[];
}

export default function DashboardLayout({ children }: Props) {
  const { isPending } = useGetProfile();
  return (
    <>
      {isPending ? (
        <div className="flex justify-center items-center mt-[25%]">
          <DotLoader />
        </div>
      ) : (
        <section className="min-h-screen">
          <Navbar />
          <div className="bg-[#eeedf6] px-4 pt-2.5 pb-4 min-h-[95vh]">
            <div className="max-w-[1200px] mx-auto">{children}</div>
          </div>
        </section>
      )}
    </>
  );
}
