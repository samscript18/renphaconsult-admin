"use client";
import { ButtonContained } from "@/components/ui/buttons";
import TextField from "@/components/ui/textField";
import { useLogin } from "@/services/auth.service";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const payload = useLogin({ email, password });
  const { push } = useRouter();

  const submit = async (e: FormEvent) => {
    e.preventDefault();

    await payload.mutateAsync();

    await toast.success("Sign In Successful", { duration: 3000, id: "Login" });
    push("/dashboard/destination");
  };

  return (
    <form onSubmit={submit} className="text-white z-[4]">
      {/* title */}
      <div>
        <h1 className="text-[1.3rem] font-bold">Sign In</h1>
        <p className="text-[.85rem] mt-2">
          Kindly sign in to your RenphaConsulting account
        </p>
      </div>

      <div className="flex w-full gap-[1rem] flex-col">
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
          }}
          className="mt-3"
          LabelProps={{ className: "text-[.8rem] font-[500]" }}
        />

        <ButtonContained
          loading={payload.isPending}
          disabled={payload.isPending || !email || !password}
          className="mt-4"
        >
          Sign In
        </ButtonContained>

        <p className="text-[.9rem] mt-2 text-white">
          {"Don't have an account? "}
          <Link href={"/register"} className="text-secondary">
            Sign Up
          </Link>{" "}
          here
        </p>
      </div>
    </form>
  );
}
