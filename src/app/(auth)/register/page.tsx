"use client";
import { ButtonContained } from "@/components/ui/buttons";
import TextField from "@/components/ui/textField";
import { RoleNames } from "@/schema/enums/admin.enum";
import { useSignUp } from "@/services/auth.service";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function Register() {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { push } = useRouter();

  const { mutateAsync, isPending } = useSignUp({
    firstName,
    lastName,
    email,
    password,
    role: RoleNames.ADMIN,
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await mutateAsync();

    // navigate to home page;
    toast.success("Account Created Successfully", {
      duration: 3000,
      id: "register",
    });
    push(`/login`);
  };

  return (
    <form onSubmit={onSubmit} className="text-white z-[4]">
      {/* title */}
      <div>
        <h1 className="text-[1.3rem] font-bold">Sign Up</h1>
        <p className="text-[.85rem] mt-2">
          Create your RenphaConsulting Admin Account
        </p>
      </div>

      <div className="flex w-full gap-[1rem] flex-col">
        <div className="w-full flex flex-col md:flex-row gap-x-[2rem] gap-y-[1rem] items-end">
          <TextField
            label="FirstName"
            InputProps={{
              placeholder: "FirstName",
              type: "text",
              required: true,
              value: firstName,
              onChange(e) {
                setFirstName(e.target.value);
              },
            }}
            className="mt-6"
            LabelProps={{ className: "text-[.8rem] font-[500]" }}
          />
          <TextField
            label="LastName"
            InputProps={{
              placeholder: "LastName",
              type: "text",
              required: true,
              value: lastName,
              onChange(e) {
                setLastName(e.target.value);
              },
            }}
            className="mt-3 md:mt-6"
            LabelProps={{ className: "text-[.8rem] font-[500]" }}
          />
        </div>
        <div className="w-full flex flex-col md:flex-row gap-x-[2rem] gap-y-[1rem] items-end">
          <TextField
            label="Email Address"
            InputProps={{
              placeholder: "Email Address",
              type: "email",
              required: true,
              value: email,
              onChange(e) {
                setEmail(e.target.value);
              },
            }}
            className="mt-6"
            LabelProps={{ className: "text-[.8rem] font-[500]" }}
          />
          <TextField
            label="Password"
            InputProps={{
              placeholder: "Password",
              type: "password",
              required: true,
              value: password,
              onChange(e) {
                setPassword(e.target.value);
              },
              minLength: 8,
            }}
            className="mt-3 md:mt-10"
            LabelProps={{ className: "text-[.8rem] font-[500]" }}
          />{" "}
        </div>
        <TextField
          label="Confirm Password"
          InputProps={{
            placeholder: "Confirm Password",
            type: "password",
            required: true,
            value: confirmPassword,
            onChange(e) {
              setConfirmPassword(e.target.value);
            },
            minLength: 8,
          }}
          className="mt-3"
          LabelProps={{ className: "text-[.8rem] font-[500]" }}
        />
        <ButtonContained
          loading={isPending}
          disabled={
            isPending ||
            !email ||
            !password ||
            (password.length > 0 && confirmPassword != password)
          }
          className="mt-4"
        >
          Sign Up
        </ButtonContained>
        <p className="text-[.9rem] mt-2 text-white">
          Already have an account?{" "}
          <Link href={"/login"} className="text-secondary">
            Sign In
          </Link>{" "}
          here
        </p>
      </div>
    </form>
  );
}
