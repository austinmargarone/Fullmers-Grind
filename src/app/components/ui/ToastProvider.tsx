"use client";

import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastProvider = () => {
  return (
    <ToastContainer
      position="top-center"
      autoClose={4200}
      hideProgressBar
      closeOnClick
      pauseOnHover
      draggable
      toastClassName={() =>
        "bg-[#E5AB00] text-black border-2 border-black rounded-[10px] shadow-none px-4 py-3 min-w-[200px] min-h-[48px] flex items-center"
      }
      className="text-sm font-medium"
    />
  );
};

export default ToastProvider;
