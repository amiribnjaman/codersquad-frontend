"use client";

import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

export default function page() {
  const navigate = useRouter();
  const { setReload, reload } = useContext(TaskContext);


  // Check token and if haven't the token then push to login page
  let token;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("Token");
  }
  if (!token) {
    navigate.push("/login");
  }

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  // Custom id for tostify
  const customId = "custom-id-yes";

  // Handle create task
  const handleCreateTask = (data) => {
    if (data) {
      fetch("http://localhost:4000/api/v1/task", {
        method: "POST",
        headers: {
          authorization: "Bearer " + localStorage.getItem("Token"),
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status == "201") {
            toast.success("A Task created succefully!");
            setReload(!reload)
          } else {
            toast.error(data.msg);
          }
        });
    }

    reset();
  };

  return (
    <div className="mt-10">
      <div className="flex justify-center items-center">
        <div className="md:w-[80%] w-full shadow-md border px-3 py-3 text-center">
          <h3 className="text-xl font-semibold">Create a new Task</h3>
          <form
            onSubmit={handleSubmit(handleCreateTask)}
            className="my-3 flex flex-col gap-2"
          >
            <input
              {...register("taskTitle", { required: true })}
              type="text"
              placeholder="Task name"
              className="px-2 pl-4 py-2 rounded-full"
            />
            <p className="hidden">
              {errors?.taskTitle &&
                toast.error("Task Name is required", { toastId: customId })}
            </p>

            <input
              {...register("completion", { required: true })}
              type="text"
              placeholder="Completion (%)"
              className="px-2 pl-4 py-2 rounded-full"
            />
            <p className="hidden">
              {errors?.completion &&
                toast.error("Completion is required", { toastId: customId })}
            </p>

            {/* <div className="flex justify-between"> */}
              <input
                {...register("teamLeader", { required: true })}
                type="text"
                placeholder="Team Leader"
                className="px-2 pl-4 py-2 rounded-full"
              />
              <p className="hidden">
                {errors?.teamLeader &&
                  toast.error("Leader name is required", { toastId: customId })}
              </p>

              <input
                {...register("teamMemberNum", { required: true })}
                type="number"
                placeholder="Total Member"
                className="px-2 pl-4 py-2 rounded-full"
              />
              <p className="hidden">
                {errors?.teamMemberNum &&
                  toast.error("Team members is required", { toastId: customId })}
              </p>
            {/* </div> */}

            {/* <div className="flex justify-between">
              <input
                {...register("name", { required: false })}
                type="text"
                placeholder="Member Name"
                className="px-2 pl-4 py-2 w-[70%] rounded-full"
              />
              <button
                type="text"
                placeholder="Member Name"
                className="px-4 border bg-blue-200 py-2 rounded-full text-[14px]"
              >
                Add Member
              </button>
            </div> */}
            <button
              className=" px-2 py-1 text-white mt-2 bg-blue-500 rounded-full"
              type="submit"
            >
              Create Task
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
