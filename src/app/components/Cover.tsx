"use client";

import Slideshow from "./Slideshow";

const Cover: React.FC = () => {
  return (
    <div>
      {/* Hero Background */}
      <main
        className="flex min-h-screen items-center justify-start bg-cover bg-center lg:pl-36"
        style={{ backgroundImage: "url('/AllEquipment.jpg')" }}
      >
        <div className="text-white flex-col justify-center md:justify-start mx-auto lg:mx-0">
          {/* Add any hero content here */}
        </div>
      </main>

      {/* Image Slideshow */}
      <section className="relative w-full max-w-2xl mx-auto p-6">
        <Slideshow />
      </section>
    </div>
  );
};

export default Cover;
