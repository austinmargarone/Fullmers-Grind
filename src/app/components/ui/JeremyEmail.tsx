"use client";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const JeremyEmail = () => {
  function copyText(entryText: string) {
    navigator.clipboard.writeText(entryText);
  }

  const notify = () =>
    toast("Copied Jeremy's Email", {
      position: "top-center",
      autoClose: 4200,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      style: {
        backgroundColor: "#F7DF6C",
        color: "#000000",
        borderRadius: "10px",
        border: "2px solid #000000",
      },
    });

  return (
    <>
      <button
        onClick={() => {
          copyText("fullmersgrind@yahoo.com");
          notify();
        }}
      >
        <ToastContainer />
        <p className="text-empower-whitetext">
          <span className="hover:underline">fullmersgrind@yahoo.com</span>
        </p>
      </button>
    </>
  );
};

export default JeremyEmail;
