import Link from "next/link";
import React from "react";

const Cover = () => {
  return (
    <main
      className="flex min-h-screen  items-center justify-start bg-cover bg-center lg:pl-36"
      style={{ backgroundImage: "url('/heroimg.png')" }}
    >
      <div className="text-white flex-col justify-center md:justify-start mx-auto lg:mx-0">
        <h1 className="text-2xl sm:text-5xl lg:text-6xl font-bold mb-4 text-center">
          Fullmers Grind LLC
        </h1>
      </div>
    </main>
  );
};

export default Cover;
