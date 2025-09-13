"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

interface Slide {
  src: string;
  alt: string;
}

const slides: Slide[] = [
  { src: "/plow.jpg", alt: "Plow" },
  { src: "/Grinder.jpg", alt: "Grinder" },
  { src: "/Equipment.jpg", alt: "Equipment" },
  { src: "/X1.jpg", alt: "X1" },
  { src: "/Vertical1.jpg", alt: "Vertical 1" },
  { src: "/Vertical2.jpg", alt: "Vertical 2" },
  { src: "/Vertical3.jpg", alt: "Vertical 3" },
  { src: "/Vertical4.jpg", alt: "Vertical 4" },
  { src: "/BeforeDemo.jpg", alt: "Before Demo" },
  { src: "/AfterDemo.jpg", alt: "After Demo" },
  { src: "/X.jpg", alt: "X" },
  { src: "/X2.jpg", alt: "X2" },
  { src: "/X3.jpg", alt: "X3" },
  { src: "/ZeroTurn.jpg", alt: "Zero Turn" },
  { src: "/TreeDown.jpg", alt: "Tree Down" },
  { src: "/Landscape.jpg", alt: "Landscape" },
  { src: "/Landscape1.jpg", alt: "Landscape 1" },
];

const Slideshow: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance slides
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsPaused(true);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsPaused(true);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsPaused(true);
  };

  const getImageClass = (src: string) => {
    return src.toLowerCase().includes("landscape")
      ? "object-contain scale-[0.9]"
      : "object-contain";
  };

  return (
    <div
      className="relative w-full max-w-[90vw] sm:max-w-[700px] md:max-w-[800px] lg:max-w-[1048px] mx-auto overflow-hidden"
      style={{ aspectRatio: "1048 / 1536" }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            width={1048}
            height={1536}
            className={`w-full h-full object-center ${getImageClass(
              slide.src
            )}`}
            style={{ objectFit: "contain", objectPosition: "center" }}
            priority={index === 0}
          />
        </div>
      ))}

      {/* Left Arrow */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-colors"
        aria-label="Previous slide"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
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

      {/* Right Arrow */}
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-colors"
        aria-label="Next slide"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
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

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentSlide ? "bg-white" : "bg-gray-400"
            } hover:bg-gray-200 transition-colors`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slideshow;
