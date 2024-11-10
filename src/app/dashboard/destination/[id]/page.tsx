"use client";

import Loader from "@/components/ui/loader";
import ScrollContainers from "@/components/ui/ScrollContainers";
import {
  useDeleteDestination,
  useGetDestination,
} from "@/services/destination.service";
import Image from "next/image";
import { useParams } from "next/navigation";
import img from "../../../../../public/images/austrialia-1.jpg";
import { Destination, Review } from "@/schema/interfaces/destination.interface";
import { formatValue } from "@/lib/utils/format.utils";
import {
  useDeleteReview,
  useGetDestinationReviews,
} from "@/services/review.service";
import { ButtonContained } from "@/components/ui/buttons";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import { useState } from "react";

const DestinationPage = () => {
  const [reviewId, setReviewId] = useState<string>("");
  const { id: destinationId } = useParams<{ id: string }>();
  const { data: destinationData, isPending } = useGetDestination(destinationId);
  const { data: reviewsData } = useGetDestinationReviews(destinationId);
  const destination: Destination = destinationData;
  const reviews: Review[] = reviewsData;
  const payload = useDeleteDestination(destinationId);
  const mutation = useDeleteReview(reviewId!);
  const gallery = [
    { id: 1, img },
    { id: 2, img },
    { id: 3, img },
    { id: 4, img },
  ];

  const deleteReview = async (id: string) => {
    if (id === reviewId) {
      await mutation.mutateAsync();
      toast.success("Review has been deleted successfully");
    }
    return;
  };

  return (
    <div className="w-full h-full mt-[8rem]">
      {isPending ? (
        <Loader
          loading={isPending}
          loadingText="Fetching Destination Details..."
        />
      ) : (
        <>
          {gallery.length === 0 ? (
            <Image
              key={destination._id}
              src={img}
              alt={destination.name}
              className="w-auto h-[250px] rounded-md"
            />
          ) : (
            <ScrollContainers>
              {gallery.map((image) => {
                return (
                  <Image
                    key={image.id}
                    src={image.img}
                    alt={destination.name}
                    className="w-auto h-[250px]"
                  />
                );
              })}
            </ScrollContainers>
          )}
          <div className="py-[1.5rem]">
            <h3 className="text-[1.1rem] font-bold">Name:</h3>
            <p className="mb-0 text-[1rem]">{destination.name}</p>
            <h3 className="text-[1.1rem] font-bold mt-4">Description:</h3>
            <p className="text-[1rem] mb-4">{destination.description}</p>
            <h3 className="text-[1.1rem] font-bold">Location:</h3>
            <p className="text-[1rem] mb-4">{destination.location}</p>
            <h3 className="text-[1.1rem] font-bold">Budget:</h3>
            <h4 className="mb-0 text-[#fff] text-[1.1rem] bg-[#00628f] max-w-fit py-[0.8rem] px-[1rem] rounded-md">
              ₦{formatValue(destination.budget.toString())}
            </h4>
            <h3 className="text-[1.1rem] font-bold mt-4">Average Rating:</h3>
            <p className="text-[1rem]">{destination.averageRating}</p>
          </div>
          <div className="my-[2rem]">
            <h2 className="text-[1.25rem] font-bold mb-6">Reviews</h2>
            {reviews.map((review) => {
              return (
                <div
                  key={review._id}
                  className="flex justify-start items-center"
                >
                  <Image
                    src={review.user?.profilePicture as string}
                    alt={review.user?.firstName}
                    width={35}
                    height={35}
                    className="rounded-full"
                  />
                  <div className="flex flex-col">
                    <p className="mb-2.5 text-[1rem] font-semibold">
                      {review.user?.firstName}
                    </p>
                    <p className="text-[.9rem]">{review.comment}</p>
                  </div>
                  <div className="flex justify-center items-center ml-auto">
                    <MdDelete
                      size={25}
                      className="text-[#00628f] cursor-pointer"
                      onClick={async () => {
                        setReviewId(review._id);
                        deleteReview(review._id);
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-center md:justify-start items-center my-8">
            <ButtonContained
              type="button"
              className="w-[100px] no-underline md:w-[200px]"
              loading={payload.isPending}
              disabled={payload.isPending}
              onClick={async () => {
                await payload.mutateAsync();
                toast.success("Destination has been deleted successfully");
              }}
            >
              Delete Destination
            </ButtonContained>
          </div>
        </>
      )}
    </div>
  );
};
export default DestinationPage;
