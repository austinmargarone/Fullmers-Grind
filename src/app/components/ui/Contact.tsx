"use client";
import React from "react";
import { toast } from "react-toastify";

const CopyNumber = () => {
  function copyText(entryText: string) {
    navigator.clipboard.writeText(entryText);
  }

  const notify = () =>
    toast("Phone number copied to clipboard!", {
      // these are optional now, since defaults are set in layout
    });

  return (
    <button
      onClick={() => {
        copyText("5854090818");
        notify();
      }}
    >
      <p className="text-fullmer-whitetext">
        <span className="hover:underline">Contact</span>
      </p>
    </button>
  );
};

export default CopyNumber;
