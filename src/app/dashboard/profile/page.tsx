"use client";

import { useEditProfile, useGetProfile } from "@/services/admin.service";
import Image from "next/image";
import { ButtonContained } from "@/components/ui/buttons";
import TextField from "@/components/ui/textField";
import { FormEvent, useEffect, useState } from "react";
import Loader from "@/components/ui/loader";
import { convertUrl, uploadFile } from "@/lib/utils/file";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Profile = () => {
  const { data: admin, isPending } = useGetProfile();
  const { push } = useRouter();
  const [lastName, setLastName] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [profilePicture, setProfilePicture] = useState<File>();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const mutation = useEditProfile(admin?._id);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const profileImageUrl = await uploadFile(profilePicture!);

    await mutation.mutateAsync({
      email: email,
      firstName: firstName,
      lastName: lastName,
      profilePicture: profileImageUrl,
    });
    setIsEdit(false);
    toast.success("Profile Updated Successfully");
    push("/dashboard/destination");
  };

  const handleImageUrl = async () => {
    const newFile = await convertUrl(admin?.profilePicture);
    setProfilePicture(newFile);
  };

  useEffect(() => {
    setFirstName(admin?.firstName);
    setLastName(admin?.lastName);
    setEmail(admin?.email);
    handleImageUrl();
  }, [admin]);

  if (isPending)
    return (
      <Loader loading={isPending} loadingText="Fetching Profile Details..." />
    );

  return (
    <section>
      {isPending && (
        <div className="flex justify-center items-center mt-[8rem]">
          <Loader
            loading={isPending}
            loadingText="Fetching Profile Details..."
          />
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="w-full h-auto bg-white mt-[8rem] py-8 px-4 md:px-12 flex flex-col shadow-md rounded-lg"
      >
        <div className="w-full flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex flex-col md:flex-row justify-start items-center">
            <Image
              src={
                (admin?.profilePicture as string) ||
                "https://res.cloudinary.com/dynopc0cn/image/upload/v1728734784/avatar_ym1ctb.jpg"
              }
              alt={admin?.lastName}
              width={200}
              height={200}
              className="w-[100px] h-[100px] md:w-[200px] md:h-[200px] rounded-full object-center object-cover"
            />
            <div className="flex flex-col ml-4 mb-2 md:mb-0">
              <h1 className="text-[1.2rem] font-bold pb-2 text-center md:text-start">
                {admin?.firstName} {admin?.lastName}
              </h1>
              <p className="text-[1rem] text-gray-400 text-center md:text-start">
                {admin?.email}
              </p>
            </div>
          </div>
          <ButtonContained
            className={`hidden ${
              isEdit ? "md:block" : "md:hidden"
            }  text-[1.05rem]`}
            loading={mutation.isPending}
            loadingText="Updating"
            type={"submit"}
          >
            Save
          </ButtonContained>
          <ButtonContained
            className={`hidden ${
              isEdit ? "md:hidden" : "md:block"
            }  text-[1.05rem]`}
            onClick={() => setIsEdit(true)}
            type={"button"}
          >
            Edit
          </ButtonContained>
        </div>
        {isEdit ? (
          <div className="w-full flex flex-col md:flex-row justify-between items-start">
            <div className="w-full flex flex-col md:pr-4">
              <TextField
                label="FirstName"
                InputProps={{
                  id: "firstName",
                  name: "firstName",
                  type: "text",
                  value: firstName,
                  onChange(e) {
                    setFirstName(e.target.value);
                  },
                  className: "focus:border-primary text-[.7rem]",
                }}
                className="mb-[22px]"
                LabelProps={{ className: "text-[.8rem] font-[500]" }}
              ></TextField>
              <TextField
                label="LastName"
                InputProps={{
                  id: "lastName",
                  name: "lastName",
                  type: "text",
                  value: lastName,
                  onChange(e) {
                    setLastName(e.target.value);
                  },
                  className: "focus:border-primary text-[.7rem]",
                }}
                className="mb-[22px]"
                LabelProps={{ className: "text-[.8rem] font-[500]" }}
              ></TextField>
            </div>
            <div className="w-full flex flex-col md:pl-4">
              <TextField
                label="Email Address"
                InputProps={{
                  id: "email",
                  name: "email",
                  type: "email",
                  value: email,
                  onChange(e) {
                    setEmail(e.target.value);
                  },
                  className: "focus:border-primary text-[.7rem]",
                }}
                className="mb-[22px]"
                LabelProps={{ className: "text-[.8rem] font-[500]" }}
              ></TextField>
              <div className="flex flex-col mb-[14px]">
                <label htmlFor="profileImage" className="text-[.9rem]">
                  Profile Picture
                </label>
                <input
                  type="file"
                  id="profileImage"
                  className="w-full p-2 outline-none text-[#444] text-[.8rem] bg-gray-100 rounded-md border-[1.5px] focus:border-primary"
                  accept="image/*"
                  onChange={(e) => setProfilePicture(e.target?.files?.[0])}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full flex flex-col md:flex-row justify-between items-start">
            <div className="w-full flex flex-col md:pr-4">
              <TextField
                label="FirstName"
                InputProps={{
                  id: "firstName",
                  name: "firstName",
                  type: "text",
                  defaultValue: firstName,
                  readOnly: true,
                  className: "focus:border-primary text-[.7rem]",
                }}
                className="mb-[22px]"
                LabelProps={{ className: "text-[.8rem] font-[500]" }}
              ></TextField>
              <TextField
                label="LastName"
                InputProps={{
                  id: "lastName",
                  name: "lastName",
                  type: "text",
                  defaultValue: lastName,
                  readOnly: true,
                  className: "focus:border-primary text-[.7rem]",
                }}
                className="mb-[22px]"
                LabelProps={{ className: "text-[.8rem] font-[500]" }}
              ></TextField>
            </div>
            <div className="w-full flex flex-col md:pl-4">
              <TextField
                label="Email Address"
                InputProps={{
                  id: "email",
                  name: "email",
                  type: "email",
                  defaultValue: email,
                  readOnly: true,
                  className: "focus:border-primary text-[.7rem]",
                }}
                className="mb-[22px]"
                LabelProps={{ className: "text-[.8rem] font-[500]" }}
              ></TextField>
            </div>
          </div>
        )}
        <ButtonContained
          className={`md:hidden ${isEdit ? "block" : "hidden"}  text-[1.05rem]`}
          loading={mutation.isPending}
          loadingText="Updating"
          type={"submit"}
        >
          Save
        </ButtonContained>
        <ButtonContained
          className={`md:hidden ${isEdit ? "hidden" : "block"}  text-[1.05rem]`}
          onClick={() => setIsEdit(true)}
          type={"button"}
        >
          Edit
        </ButtonContained>
      </form>
    </section>
  );
};
export default Profile;
