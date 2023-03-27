"use client";

import { registerUser, signinUser } from "@/lib/api";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "./button";
import { Card } from "./card";

const registerContent = {
  linkUrl: "/signin",
  linkText: "Already have an account?",
  header: "Create a new account",
  subHeader: "Just a few things to get started",
  buttonText: "Register",
};

const signinContent = {
  linkUrl: "/register",
  linkText: "Don't have an account?",
  header: "Welcome back!",
  subHeader: "Enter your credentials to access your account",
  buttonText: "Sign In",
};

export function AuthForm({ mode }: { mode: "REGISTER" | "SIGN_IN" }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  async function onSubmit(data: any) {
    try {
      if (mode === "REGISTER") {
        await registerUser(data);
      } else {
        await signinUser(data);
      }

      router.replace("/");
    } catch (error) {
      console.error(error);
    }
  }

  const content = mode === "REGISTER" ? registerContent : signinContent;

  return (
    <Card>
      <div className="w-full">
        <div className="text-center">
          <h2 className="text-3xl mb-2">{content.header}</h2>
          <p className="text-lg text-black/25">{content.subHeader}</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="py-10 w-full">
          {mode === "REGISTER" && (
            <div className="flex mb-8 justify-between">
              <div className="pr-2">
                <div
                  className={clsx(
                    "text-lg mb-4 ml-2 text-black/50",
                    errors.firstName && "text-red-600"
                  )}
                >
                  First Name
                </div>
                <input
                  className={clsx(
                    "border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full",
                    errors.firstName && "border-red-600"
                  )}
                  placeholder="First Name"
                  {...register("firstName", { required: true })}
                  aria-invalid={errors.firstName ? "true" : "false"}
                />
              </div>

              <div className="pl-2">
                <div
                  className={clsx(
                    "text-lg mb-4 ml-2 text-black/50",
                    errors.lastName && "text-red-600"
                  )}
                >
                  Last Name
                </div>
                <input
                  className={clsx(
                    "border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full",
                    errors.lastName && "border-red-600"
                  )}
                  placeholder="Last Name"
                  type="text"
                  {...register("lastName", { required: true })}
                />
              </div>
            </div>
          )}
          <div className="mb-8">
            <div
              className={clsx(
                "text-lg mb-4 ml-2 text-black/50",
                errors.email && "text-red-600"
              )}
            >
              Email
            </div>
            <input
              className={clsx(
                "border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full",
                errors.email && "border-red-600"
              )}
              placeholder="Email"
              {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            />
          </div>
          <div className="mb-8">
            <div
              className={clsx(
                "text-lg mb-4 ml-2 text-black/50",
                errors.email && "text-red-600"
              )}
            >
              Password
            </div>
            <input
              className={clsx(
                "border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full",
                errors.password && "border-red-600"
              )}
              placeholder="Password"
              type="password"
              {...register("password", { required: true, min: 4 })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span>
                <Link
                  href={content.linkUrl}
                  className="text-blue-600 font-bold"
                >
                  {content.linkText}
                </Link>
              </span>
            </div>
            <div>
              <Button type="submit" intent="secondary">
                {content.buttonText}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Card>
  );
}
