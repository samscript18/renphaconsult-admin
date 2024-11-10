"use client";

import { ButtonContained } from "@/components/ui/buttons";
import TextField from "@/components/ui/textField";
import { uploadFile, uploadFiles, uploadImages } from "@/lib/utils/file";
import { useCreateDestination } from "@/services/destination.service";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

const CreateDestinationPage = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [mainImage, setMainImage] = useState<File>();
  const [gallery, setGallery] = useState<FileList>();
  const [location, setLocation] = useState<string>("");
  const [budget, setBudget] = useState<number>();
  const payload = useCreateDestination();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!mainImage || !gallery) {
      toast.error("select image/images");
      return;
    }
    const destinationBgImage = await uploadFile(mainImage);
    const destinationGallery = await uploadFiles(gallery);
    await payload.mutateAsync({
      name,
      description,
      mainImage: destinationBgImage,
      gallery: destinationGallery,
      location,
      budget: budget!,
    });
  };
  return (
    <section>
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
                required: true,
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
                required: true,
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
                required
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
                required: true,
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
            Create Destination
          </ButtonContained>
        </div>
      </form>
    </section>
  );
};
export default CreateDestinationPage;
