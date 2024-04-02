"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "react-toastify";

export default function page() {
    const navigate = useRouter();
    const [loading, setLoading] = useState(false);
    const [tasks, setTasks] = useState([])
    const [deleteConfirmationCard, setdeleteConfirmationCard] = useState(false);
    const [deleteConfirmationId, setdeleteConfirmationId] = useState("");

  // Check token and if haven't the token then push to login page
  let token;
  useEffect(() => {
    if (typeof window !== "undefined") {
      token = localStorage.getItem("Token");
    }
    if (!token) {
      navigate.push("/login");
    }
  }, []);



  return (
    <>
      <div>
        {/* Header */}
        <div className="flex relative items-center justify-between mb-10">
          <div className="flex items-center gap-5">
            <h3 className="text-xl">Tasks</h3>
            {loading ? (
              <span>...</span>
            ) : (
              <button className="mt-1 cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1"
                  stroke="currentColor"
                  class="w-5 h-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
              </button>
            )}
          </div>
          <button
            onClick={() => navigate.push("/create-task")}
            className="bg-[#2565e6] px-4 py-2 rounded-lg text-white"
          >
            Create Task
          </button>
        </div>

        {/* Body */}

        <>
          <h4 className="text-sm">
            <span className="mr-1 font-bold">{tasks.length}</span>Tasks found.
          </h4>
          {tasks.length > 0 ? (
            <div className="grid relative grid-cols-1 md:grid-cols-3 mt-6 gap-x-4 gap-y-8">
              {/* card */}

              {/*-------------- SINGLE CARD ---------------*/}
              {
                tasks.map((task) => (
                  <div className="shadow rounded">
                    <div className="text-[15px] font-semibold p-4 relative">
                      {task.completion < 100 ? (
                        <span className="text-[10px] text-black absolute top-[-12px] right-[0px] bg-red-100 px-2 py-1 rounded-full">
                          Incomplete
                        </span>
                      ) : (
                        <span className="text-[10px] text-black absolute top-[-12px] right-[0px] bg-green-100 px-2 py-1 rounded-full">
                          Completed
                        </span>
                      )}
                      <p className="mb-2 text-[#2565e6] capitalize">
                        {task.taskTitle}
                      </p>
                      <hr />
                    </div>
                    {/* Body */}
                    <div className="px-3 pb-3">
                      {/* Completion */}
                      <div className="flex justify-between items-center">
                        <h5
                          className={`text-[11px] font-semibold ${
                            task.completion < 100
                              ? "text-red-500"
                              : "text-green-600"
                          }`}
                        >
                          {task.completion}% completed
                        </h5>
                        <button className="bg-green-100 text-sm rounded-full px-4 py-[2px] inline-block">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width=".5"
                            stroke="currentColor"
                            class="w-4 h-4"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M12 6v12m6-6H6"
                            />
                          </svg>
                        </button>
                      </div>
                      {/* Team leader */}
                      <div className="flex justify-between items-center mt-2">
                        <h5 className="text-[12px] font-semibold">
                          Team Leader
                        </h5>
                        <p className="bg-[#e1e9fa] text-[13px] rounded-full px-4 py-[2px] inline-block capitalize">
                          {task.teamLeader}
                        </p>
                      </div>

                      {/* Members heading */}
                      <div className="flex justify-between mt-2 items-center">
                        <h5 className="text-[12px] font-semibold">
                          Team Members
                        </h5>
                        <h5 className="text-[12px] font-semibold bg-blue-100 rounded-full px-2 py-[3px]">
                          {task.teamMemberNum}
                        </h5>
                      </div>

                      {/* Members body */}
                      <div className="grid grid-cols-3 gap-2 mt-2">
                        {task.teamMembers.map((element) => (
                          <div className="bg-gray-200 px-1.5 text-sm py-[3px] rounded-full">
                            <h6 className="text-[11px]">@{element}</h6>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* BOTTOM */}
                    <div className="px-5 py-2 gap-2 flex">
                      <Link
                        href={`/update-task/${task.id}`}
                        className="text-sm text-white px-4 py-1 bg-green-500 rounded-full"
                      >
                        Update
                      </Link>
                      <button
                        onClick={() => {
                          setdeleteConfirmationId(task.id);
                          setdeleteConfirmationCard(true);
                        }}
                        className="text-sm px-3 py-1 bg-red-400 text-white rounded-full"
                      >
                        Delete
                      </button>

                      {/*------------------DELETE COMFIMATION BUTTON-------------- */}
                      <div
                        className={`${
                          deleteConfirmationCard ? "block" : "hidden"
                        } fixed z-50 left-[7%] top-[15%] md:left-[33%] shadow bg-white w-[330px] text-center rounded py-3 h-[170px] flex flex-col justify-center`}
                        style={{ backdropFilter: "blur(8px)" }}
                      >
                        <div>
                          <h5 className="text-[18px] font-semibold">
                            Are you sure
                          </h5>
                          <h5 className="text-[18px] font-semibold">
                            You want to Delete this?
                          </h5>
                        </div>
                        <div className="flex gap-3 justify-center">
                          <button
                            onClick={() => setdeleteConfirmationCard(false)}
                            className="bg-slate-600 px-5 py-2 mt-3 rounded-lg text-white"
                          >
                            Cancel
                          </button>
                          <button
                            onClick=''
                            className="bg-red-600 px-7 py-2 mt-3 rounded-lg text-white"
                          >
                            Yes, I'm!
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-center flex justify-center items-center mt-10 gap-2">
              <p>No task is available!</p>
              <button
                onClick={() => navigate.push("/create-task")}
                className="border border-[#2565e6] px-2 py-1 rounded-lg text-sm"
              >
                Create Now
              </button>
            </div>
          )}
        </>

      </div>
    </>
  );
}
