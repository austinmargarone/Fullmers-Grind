"use client";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CopyNumber = () => {
  function copyText(entryText: string) {
    navigator.clipboard.writeText(entryText);
  }

  const notify = () =>
    toast("Number copied to clipboard!", {
      position: "top-center",
      autoClose: 4200,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      style: {
        backgroundColor: "#E5AB00",
        color: "#000000",
        borderRadius: "10px",
        border: "2px solid #000000",
      },
    });

  return (
    <>
      <button
        onClick={() => {
          copyText("5854090818");
          notify();
        }}
      >
        <ToastContainer />
        <p className="text-fullmer-whitetext">
          <span className="hover:underline">Contact</span>
        </p>
      </button>
    </>
  );
};

export default CopyNumber;
