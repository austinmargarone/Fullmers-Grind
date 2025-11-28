"use client";

import Slideshow from "./Slideshow";
import ServiceTicker from "./ServiceTicker";

const Cover: React.FC = () => {
  return (
    <div>
      {/* Hero Background */}
      <main className="flex min-h-screen items-center justify-start bg-cover bg-center lg:pl-36 bg-[url('/MobileBackground.jpg')] lg:bg-[url('/AllEquipment.jpg')]">
        <div className="text-white flex-col justify-center md:justify-start mx-auto lg:mx-0">
          {/* Add any hero content here */}
        </div>
        <div className="absolute inset-x-0 bottom-0 z-20">
          <ServiceTicker />
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
