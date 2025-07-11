"use client";
import Image from "next/image";
import React, { useState } from "react";

const verticalImages = [
  "/Vertical1.jpg",
  "/Vertical2.jpg",
  "/Vertical3.jpg",
  "/Vertical4.jpg",
  "/BeforeDemo.jpg",
  "/AfterDemo.jpg",
];

const Cover = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? verticalImages.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === verticalImages.length - 1 ? 0 : prev + 1
    );
  };

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
        <div className="relative w-full aspect-[3/4] max-h-[450px] rounded-xl shadow-md overflow-hidden">
          <Image
            src={verticalImages[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            fill
            className="object-cover"
          />
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white opacity-40"
            aria-label="Previous slide"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="black"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white opacity-40"
            aria-label="Next slide"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="black"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
        {/* Slide Indicators */}
        <div className="flex justify-center mt-4 space-x-2">
          {verticalImages.map((_, i) => (
            <button
              key={i}
              className={`w-3 h-3 rounded-full ${
                i === currentIndex ? "bg-white" : "bg-gray-400"
              }`}
              onClick={() => setCurrentIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Cover;
