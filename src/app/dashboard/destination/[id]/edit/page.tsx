"use client";

import { ButtonContained } from "@/components/ui/buttons";
import Loader from "@/components/ui/loader";
import TextField from "@/components/ui/textField";
import { uploadFile } from "@/lib/utils/file";
import { Destination } from "@/schema/interfaces/destination.interface";
import {
  useEditDestination,
  useGetDestination,
} from "@/services/destination.service";
import { useParams, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

const EditDestinationPage = () => {
  const { id: destinationId } = useParams<{ id: string }>();
  const { data: destinationData, isPending } = useGetDestination(destinationId);
  const destination: Destination = destinationData;
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [mainImage, setMainImage] = useState<File>();
  const [gallery, setGallery] = useState<FileList>();
  const [location, setLocation] = useState<string>("");
  const [budget, setBudget] = useState<number>();
  const payload = useEditDestination(destinationId);
  const { push } = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let destinationBgImage, destinationGallery;
    if (mainImage) {
      destinationBgImage = await uploadFile(mainImage);
    }
    if (gallery) {
      destinationGallery = await Promise.all(
        Array.from(gallery).map(async (image) => {
          const url = await uploadFile(image);
          return url;
        })
      );
    }

    await payload.mutateAsync({
      name,
      description,
      mainImage: destinationBgImage,
      gallery: destinationGallery,
      location,
      budget: budget!,
    });
    toast.success("Destination edited successfully");
    push("/dashboard/destination");
  };

  useEffect(() => {
    setName(destination?.name);
    setDescription(destination?.description);
    setLocation(destination?.location);
    setBudget(destination?.budget);
  }, [destination]);

  if (isPending) {
    return (
      <div className="flex justify-center items-center mt-[6.5rem]">
        <Loader
          loading={isPending}
          loadingText="Fetching Destination Details..."
        />
      </div>
    );
  }
  return (
    <section className="mt-[6.5rem]">
      <h1 className="text-[1.25rem] my-3 font-bold capitalize text-center">
        Welcome! Kindly input the required details
      </h1>
      <form action="" method="post" onSubmit={handleSubmit}>
        <div className="w-full flex flex-col md:flex-row justify-between items-start">
          <div className="w-full mr-8">
            <TextField
              label="Name"
              InputProps={{
                id: "destinationName",
                name: "name",
                placeholder: "Name of the Destination",
                type: "text",
                value: name,
                onChange(e) {
                  setName(e.target.value);
                },
                className: "focus:border-primary text-[.7rem]",
              }}
              className="mb-[22px]"
              LabelProps={{ className: "text-[.8rem] font-[500]" }}
            ></TextField>
            <TextField
              label="Description"
              InputProps={{
                id: "destinationDescription",
                name: "description",
                placeholder: "Description of the Destination",
                type: "text",
                value: description,
                onChange(e) {
                  setDescription(e.target.value);
                },
                className: "focus:border-primary text-[.7rem] font-light",
              }}
              className="mb-[22px]"
              LabelProps={{ className: "text-[.8rem] font-[500]" }}
            ></TextField>
            <div className="flex flex-col my-[14px]">
              <label htmlFor="quizBgImage" className="text-[.9rem]">
                Background Image
              </label>
              <input
                type="file"
                id="destinationBgImage"
                className="w-full p-2 outline-none text-[#444] text-[.8rem] bg-gray-100 rounded-md border-[1.5px] focus:border-primary"
                accept="image/*"
                onChange={(e) => setMainImage(e.target?.files?.[0])}
              />
            </div>
          </div>
          <div className="w-full mr-8">
            <div className="flex flex-col mb-[14px]">
              <label htmlFor="quizBgImage" className="text-[.9rem]">
                Gallery
              </label>
              <input
                type="file"
                id="destinationGallery"
                className="w-full p-2 outline-none text-[#444] text-[.8rem] bg-gray-100 rounded-md border-[1.5px] focus:border-primary"
                accept="image/*"
                multiple
                onChange={(e) => {
                  const files = e.target?.files;
                  if (files) {
                    setGallery(files);
                  }
                }}
              />
            </div>
            <TextField
              label="Location"
              InputProps={{
                placeholder: "Location of the destination",
                type: "text",
                value: location,
                onChange(e) {
                  setLocation(e.target.value);
                },
                className: "focus:border-primary text-[.7rem]",
              }}
              className="my-[22px]"
              LabelProps={{ className: "text-[.8rem] font-[500]" }}
            ></TextField>
            <TextField
              label="Budget"
              InputProps={{
                placeholder: "Amount to budget for visiting the destination",
                type: "number",
                required: true,
                value: budget,
                onChange(e) {
                  const value = Number(e.target.value);
                  setBudget(value);
                },
                className: "focus:border-primary text-[.7rem]",
              }}
              className="my-[22px]"
              LabelProps={{ className: "text-[.8rem] font-[500]" }}
            ></TextField>
          </div>
        </div>
        <div className="flex justify-end items-end">
          <ButtonContained
            loading={payload.isPending}
            loadingText="Creating Destination..."
            className="max-w-fit ml-auto mt-5"
          >
            Edit Destination
          </ButtonContained>
        </div>
      </form>
    </section>
  );
};
export default EditDestinationPage;
