"use client";

import TopNavbar from "@/components/topNavbar";
import { useEffect, useState } from "react";
import Sidebar from "@/components/sidebar";
import { ToastContainer } from "react-toastify";

export default function LayoutComponent({ children }) {
  // Those are declare here to props drillings (awful)

  return (
    <div className="md:flex ">
      <aside className="md:block hidden w-64 h-full shadow-md">
        <Sidebar />
      </aside>
      <div className="bg-[#F8F7FA] md:w-[80%] h-full">
        <div className="px-6 relative">
          {/* Top Navbar  */}
          <TopNavbar />
          <div className="min-h-[85vh] md:flex gap-6 justify-between">
            <div className="mt-4 p-4 pb-6 md:w-[90%] border">
              <ToastContainer position="top-center" />
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
