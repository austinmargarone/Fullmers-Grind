import React from "react";

const Cover = () => {
  return (
    <main
      className="flex min-h-screen  items-center justify-start bg-cover bg-center lg:pl-36"
      style={{ backgroundImage: "url('/Hero.jpg')" }}
    >
      <div className="text-white flex-col justify-center md:justify-start mx-auto lg:mx-0"></div>
    </main>
  );
};

export default Cover;
