"use client";

import Destination from "@/components/dashboard/destination";
import { ButtonContained } from "@/components/ui/buttons";
import Loader from "@/components/ui/loader";
import { Destination as IDestination } from "@/schema/interfaces/destination.interface";
import { useGetDestinations } from "@/services/destination.service";
import Link from "next/link";
import { useEffect, useState } from "react";

const DestinationPage = () => {
  const { data: destinations, isPending } = useGetDestinations();
  const [newDestinations, setNewDestinations] =
    useState<IDestination[]>(destinations);

  useEffect(() => {
    setNewDestinations(destinations);
  }, [destinations]);
  return (
    <section>
      {isPending ? (
        <div className="flex justify-center items-center">
          <Loader loading={isPending} loadingText="Fetching Destinations..." />
        </div>
      ) : (
        <div className="flex flex-col">
          <div className="flex justify-between items-center">
            <h1 className="text-[1.3rem] font-bold">Destinations</h1>
            <Link href={`/dashboard/destination/create`}>
              <ButtonContained
                type="button"
                className="w-[100px] no-underline md:w-[200px]"
              >
                Create Destination
              </ButtonContained>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-11 mt-[5rem]">
            {newDestinations.map((destination: IDestination) => {
              return <Destination key={destination._id} {...destination} />;
            })}
          </div>
        </div>
      )}
    </section>
  );
};
export default DestinationPage;
