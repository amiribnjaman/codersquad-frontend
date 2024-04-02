"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function page() {
  const navigate = useRouter();

  // Check token and if have the token then push to my task page
  let token;
  useEffect(() => {
    if (typeof window !== "undefined") {
      token = localStorage.getItem("Token");
    }
    if (token) {
      navigate.push("/my-task");
    }
  }, []);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  // Signup submit function
  const signUpSubmit = (data) => {
    if (data.name && data.email && data.password) {
      fetch("http://localhost:4000//api/v1/user/signup", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status == "201") {
            toast.success("Signup successfully! Login now.");
            // Redirect user to Login page
            navigate.push("/login");
          } else if (data.status == "400") {
            toast.warning("Already registered! Login please.");
          } else {
            toast.error(data.msg);
          }
        });
    }
    reset();
  };

  // Custom id for tostify
  const customId = "custom-id-yes";

  return (
    <div className="mt-8">
      <div className="flex justify-center items-center">
        <div className="md:w-[60%] w-full shadow-md border px-5 py-8 text-center min-h-[200px]">
          <h3 className="text-xl font-semibold">Signup</h3>
          {/* {errors && <Toaster />} */}
          <form
            onSubmit={handleSubmit(signUpSubmit)}
            className="my-3 flex flex-col gap-2"
          >
            <input
              {...register("name", { required: true })}
              type="text"
              placeholder="Enter your Name"
              className="px-2 py-2 pl-4 rounded-full"
            />
            <p className="hidden">
              {errors?.name &&
                toast.error("Name field is required", { toastId: customId })}
            </p>

            <input
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                },
              })}
              type="email"
              placeholder="Enter your email"
              className="px-2 py-2 pl-4 rounded-full"
            />
            <p className="hidden">
              {errors.email?.type === "pattern" &&
                toast.error(
                  `Invalid email. Please provide a valid email address.`,
                  {
                    toastId: customId,
                  }
                )}
            </p>
            <p className="hidden">
              {errors?.email &&
                toast.error("Email field is required", { toastId: customId })}
            </p>

            <input
              {...register("password", { required: true, minLength: 6 })}
              type="password"
              placeholder="Enter password"
              className="px-2 py-2 pl-4 rounded-full"
            />
            <p className="hidden">
              {errors.password?.type === "minLength" &&
                toast.error(
                  `Password is too short. 
                Please provide atleast 6 characters.`,
                  {
                    toastId: customId,
                  }
                )}
            </p>
            <p className="hidden">
              {errors?.password &&
                toast.error("Password field is required", {
                  toastId: customId,
                })}
            </p>

            <button
              className=" px-2 py-1 text-white mt-2 bg-green-500 rounded-full"
              type="submit"
            >
              Signup
            </button>

            <p className="text-[12px] m-0">
              Already registered?
              <Link href="/login" className="ml-1 text-blue-700">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

// export const metadata = {
//   title: "Dashboard - TaskTrack",
//   description: "TaskTrack is a task management application",
// };