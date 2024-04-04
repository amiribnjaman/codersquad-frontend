"use client";

import Sidebar from "@/components/sidebar";
import TopNavbar from "@/components/topNavbar";
import Footer from "@/components/footer";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { TaskContext } from "@/app/context/TaskContext";

export default function LayoutComponent({ children }) {
  // Those are declare here to props drillings (awful)
  const [reload, setReload] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("https://codersquad-backend.onrender.com/api/v1/task", {
      method: "GET",
      headers: {
        authorization: "Bearer " + localStorage.getItem("Token"),
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
      });
  }, [reload]);

  return (
    <div className="md:flex ">
      <aside className="md:block hidden w-64 h-full shadow-md">
        <Sidebar />
      </aside>

      <div className="bg-[#F8F7FA] md:w-[80%] h-full">
        <div className="px-6 relative">
          {/* Top Navbar  */}
          <TopNavbar setReload={setReload} tasks={tasks} setTasks={setTasks} />
          <TaskContext.Provider value={{ reload, setReload, tasks, setTasks }}>
            <div className="min-h-[85vh] md:flex gap-6 justify-between">
              <div className="mt-4 p-4 pb-6 md:w-[90%] border">
                <ToastContainer position="top-center" />
                {children}
              </div>
            </div>
          </TaskContext.Provider>
          {/* Footer */}
          <Footer />
        </div>
      </div>
    </div>
  );
}
