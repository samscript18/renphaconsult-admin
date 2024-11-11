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

  if (destinations?.length === 0) {
    return (
      <div className="flex justify-center items-center mt-[7rem]">
        <h1 className="text-[1.3rem]">
          Sorry, there are no destinations available at the moment
        </h1>
      </div>
    );
  }
  return (
    <section>
      {isPending ? (
        <div className="flex justify-center items-center mt-[7rem]">
          <Loader loading={isPending} loadingText="Fetching Destinations..." />
        </div>
      ) : (
        <div className="flex flex-col mt-[6.5rem]">
          <div className="flex justify-between items-center">
            <h1 className="text-[1.3rem] font-bold">Destinations</h1>
            <Link href={`/dashboard/destination/create`}>
              <ButtonContained
                type="button"
                className="w-[100px] no-underline md:w-[200px]"
              >
                Create
              </ButtonContained>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-11 mt-[2rem]">
            {newDestinations?.map((destination: IDestination) => {
              return <Destination key={destination._id} {...destination} />;
            })}
          </div>
        </div>
      )}
    </section>
  );
};
export default DestinationPage;
