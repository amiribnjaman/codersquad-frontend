"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import {  useEffect } from "react";

export default function page() {
  const navigate = useRouter();

  // Check token and if have the token then push to my task page
  let token;
  useEffect(() => {
    if (typeof window !== "undefined") {
      token = localStorage.getItem("Token");
    }
    if (!token) {
      navigate.push("/login");
    }
  }, []);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  // Custom id for tostify
  const customId = "custom-id-yes";

  //Handle Login submit
  const loginSubmit = (data) => {
    if (data.email && data.password) {
      fetch("http://localhost:4000//api/v1/user/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status == "200") {
            // Set token into localstorage
            localStorage.setItem("Token", data.token);
            toast.success("You have logedin successfully!");
            setReload(!reload);
            // Redirect user to My Task
            navigate.push("/my-task");
          } else {
            toast.error("Email or password is invalid");
          }
        });
    }
    reset();
  };

  return (
    <div className="mt-10">
      <div className="flex justify-center items-center">
        <div className="md:w-[60%] w-full shadow-md border px-5 py-10 text-center">
          <h3 className="text-xl font-semibold">Login</h3>
          <form
            onSubmit={handleSubmit(loginSubmit)}
            className="my-3 flex flex-col gap-2"
          >
            <input
              {...register("email", { required: true })}
              type="email"
              placeholder="Enter your email"
              className="px-2 py-2 pl-4 rounded-full"
            />
            <p className="hidden">
              {errors?.email &&
                toast.error("Email field is required", { toastId: customId })}
            </p>

            <input
              {...register("password", { required: true })}
              type="password"
              placeholder="Enter password"
              className="px-2 py-2 pl-4 rounded-full"
            />
            <p className="hidden">
              {errors?.password &&
                toast.error("Password field is required", {
                  toastId: customId,
                })}
            </p>
            <button
              className=" px-2 py-1 text-white mt-2 bg-blue-500 rounded-full"
              type="submit"
            >
              Login
            </button>

            <p className="text-[12px] m-0">
              Haven't account?
              <Link href="/signup" className="text-green-700 ml-1">
                Signup
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
