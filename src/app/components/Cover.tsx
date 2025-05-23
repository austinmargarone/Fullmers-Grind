import Image from "next/image";
import React from "react";

const verticalImages = [
  "/Vertical1.jpg",
  "/Vertical2.jpg",
  "/Vertical3.jpg",
  "/Vertical4.jpg",
];

const Cover = () => {
  return (
    <div>
      {/* Hero Background */}
      <main
        className="flex min-h-screen items-center justify-start bg-cover bg-center lg:pl-36"
        style={{ backgroundImage: "url('/Hero.jpg')" }}
      >
        <div className="text-white flex-col justify-center md:justify-start mx-auto lg:mx-0">
          {/* Add any hero content here */}
        </div>
      </main>

      {/* Vertical Image Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-6">
        {verticalImages.map((src, i) => (
          <div key={i} className="relative w-full aspect-[3/4]">
            <Image
              src={src}
              alt={`Vertical Image ${i + 1}`}
              fill
              className="object-cover rounded-xl shadow-md"
            />
          </div>
        ))}
      </section>
    </div>
  );
};

export default Cover;
