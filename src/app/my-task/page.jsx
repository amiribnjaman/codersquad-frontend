"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import Link from "next/link";
import { toast } from "react-toastify";

export default function page() {
  const [deleteConfirmationCard, setdeleteConfirmationCard] = useState(false);
  const [deleteConfirmationId, setdeleteConfirmationId] = useState("");
  const navigate = useRouter();
  const [tasks, setTasks] = useState([]);

  // SERACH CONTEXT VALUE
  const { setReload, reload } = useContext(TaskContext);

  // Check token and if haven't the token then push to login page
  let token;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("Token");
  }
  if (!token) {
    navigate.push("/login");
  }

  useEffect(() => {
    fetch("http://localhost:4000/api/v1/task/my-task", {
      method: "GET",
      headers: {
        authorization: "Bearer " + localStorage.getItem("Token"),
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setTasks(data);
      });
  }, [reload]);

  // Handle delete a task
  const handleDeleteTask = () => {
    fetch(`http://localhost:4000/api/v1/task/${deleteConfirmationId}`, {
      method: "DELETE",
      headers: {
        authorization: "Bearer " + localStorage.getItem("Token"),
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "204") {
          setReload(!reload);
          toast.success("A task deleted!");
        } else {
          toast.error("Sorry! You're not Authorized to Delete this task!");
        }
      });
    setdeleteConfirmationCard(false);
  };

  //--------------------------------PAGINATION
  //------------------------------
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 3;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;

  let tasksData;
  let npage;
  let numbers;
  if (tasks.length > 0) {
    tasksData = tasks.length > 0 && tasks.slice(firstIndex, lastIndex);
    npage = Math.ceil(tasks.length / recordsPerPage);
    numbers = [...Array(npage + 1).keys()].slice(1);
  }

  // handle next page
  const nextPage = () => {
    if (currentPage !== lastIndex) {
      setCurrentPage(currentPage + 1);
    }
  };

  // handle previous page
  const prevPage = () => {
    if (currentPage !== firstIndex) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Change current page
  const changeCurPage = (index) => {
    setCurrentPage(index);
  };

  return (
    <>
      <div>
        {/* Header */}
        <div className="flex relative items-center justify-between mb-10">
          <h3 className="text-xl">Tasks</h3>
          <button
            onClick={() => navigate.push("/create-task")}
            className="bg-[#2565e6] px-4 py-2 rounded-lg text-white"
          >
            Create Task
          </button>
        </div>

        {/* Body */}
        {tasks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 mt-6 gap-x-4 gap-y-8">
            {/* card */}

            {/*-------------- SINGLE CARD ---------------*/}
            {tasksData.length > 0 &&
              tasksData.map((task) => (
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
                      <h5 className="text-[12px] font-semibold">Team Leader</h5>
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
                      } fixed top-[20%] left-[33%] shadow bg-white w-[330px] text-center rounded py-3 h-[170px] flex flex-col justify-center`}
                      style={{ backdropFilter: "blur(8px)" }}
                    >
                      <div>
                        <h5 className="text-[20px] font-semibold">
                          Are you sure?{" "}
                        </h5>
                        <h5 className="text-[20px] font-semibold">
                          You want to Delete this?
                        </h5>
                      </div>
                      <div className="flex gap-3 justify-center">
                        <button
                          onClick={() => handleDeleteTask()}
                          className="bg-blue-600 px-7 py-2 mt-3 rounded-lg text-white"
                        >
                          Yes!
                        </button>
                        <button
                          onClick={() => setdeleteConfirmationCard(false)}
                          className="bg-red-600 px-5 py-2 mt-3 rounded-lg text-white"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="text-center flex justify-center items-center mt-10 gap-2">
            <p>You don't create any task yet!</p>
            <button
              onClick={() => navigate.push("/create-task")}
              className="border border-[#2565e6] px-2 py-1 rounded-lg text-sm"
            >
              Create Now
            </button>
          </div>
        )}

        {/*-----------------PAGINATION------------------ */}
        {tasks.length > 3 ? (
          <div className="flex justify-center mt-14 gap-1">
            {currentPage == 1 ? (
              <button
                onClick={prevPage}
                className=" btn btn-sm capitalize text-slate-500 mr-2 font-normal cursor-not-allowed"
                disabled
              >
                Previous
              </button>
            ) : (
              <button
                onClick={prevPage}
                className=" btn btn-sm mr-2 capitalize  font-normal"
              >
                Previous
              </button>
            )}
            {numbers.map((n) => (
              <button
                onClick={() => changeCurPage(n)}
                className={`py-[5px] px-[5px] rounded-full ${
                  currentPage === n
                    ? "text-blue-600 px-[14px] bg-[#e8eefa] "
                    : ""
                } join-item btn btn-sm`}
              >
                {n}
              </button>
            ))}
            {numbers.length === currentPage ? (
              <button
                onClick={nextPage}
                className={`btn capitalize font-normal btn-sm text-slate-500 ml-2 font-normal cursor-not-allowed`}
                disabled
              >
                Next
              </button>
            ) : (
              <button
                onClick={nextPage}
                className={`btn capitalize font-normal btn-sm`}
              >
                Next
              </button>
            )}
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
