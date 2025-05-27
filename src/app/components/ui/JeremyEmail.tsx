"use client";
import React from "react";
import { toast } from "react-toastify";

const JeremyEmail = () => {
  function copyText(entryText: string) {
    navigator.clipboard.writeText(entryText);
  }

  const notify = () => toast("Copied Jeremy's Email");

  return (
    <button
      onClick={() => {
        copyText("fullmersgrind@yahoo.com");
        notify();
      }}
    >
      <p className="text-fullmer-whitetext">
        <span className="hover:underline">fullmersgrind@yahoo.com</span>
      </p>
    </button>
  );
};

export default JeremyEmail;
