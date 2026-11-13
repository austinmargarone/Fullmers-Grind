"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import Lightbox from "./Lightbox";

interface Slide {
  src: string;
  alt: string;
}

const slides: Slide[] = [
  { src: "/StumpGrinding-Trailer.jpg", alt: "Stump ground below grade with the Fullmers Grind trailer behind" },
  { src: "/TreeRemoval-Lift.jpg", alt: "Tree being taken down from a boom lift" },
  { src: "/TreeRemoval-Chipper.jpg", alt: "Wood chipper and boom lift on a tree removal job" },
  { src: "/StumpGrinding-After1.jpg", alt: "Lawn after several stumps were ground out" },
  { src: "/plow.jpg", alt: "Snow plow truck ready for winter" },
  { src: "/Grinder.jpg", alt: "Fullmers Grind stump grinder" },
  { src: "/Equipment.jpg", alt: "Stump grinder, chainsaw and brush equipment" },
  { src: "/X1.jpg", alt: "Mini excavator clearing an overgrown field" },
  { src: "/Vertical1.jpg", alt: "Tree stump before grinding" },
  { src: "/Vertical2.jpg", alt: "Same spot after stump grinding" },
  { src: "/Vertical3.jpg", alt: "Cut tree stump in a lawn" },
  { src: "/Vertical4.jpg", alt: "Ground stump area in a yard" },
  { src: "/BeforeDemo.jpg", alt: "Old shed before demolition" },
  { src: "/AfterDemo.jpg", alt: "Cleared ground after shed demolition" },
  { src: "/X.jpg", alt: "CAT mini excavator" },
  { src: "/X2.jpg", alt: "Mini excavator clearing brush" },
  { src: "/X3.jpg", alt: "Excavator loading a dumpster" },
  { src: "/ZeroTurn.jpg", alt: "Zero-turn mower" },
  { src: "/TreeDown.jpg", alt: "Downed tree in a backyard" },
  { src: "/Landscape.jpg", alt: "Mulched garden bed with stone border" },
  { src: "/Landscape1.jpg", alt: "Fresh mulch bed around a lamp post" },
  { src: "/Demo1.jpg", alt: "Small outbuilding ready for demolition" },
  { src: "/Demo2.jpg", alt: "Demolition debris being cleared" },
  { src: "/Demo3.jpg", alt: "Clearing debris from the excavator cab" },
  { src: "/Demo4.jpg", alt: "Site after demolition cleanup" },
];

const Slideshow: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const touchX = useRef<number | null>(null);

  // Auto-advance slides
  useEffect(() => {
    if (isPaused || lightbox !== null) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isPaused, lightbox]);

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
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) > 50) (dx < 0 ? goToNext : goToPrevious)();
      }}
    >
      {/* Slides */}
      {slides.map((slide, index) => (
        <button
          type="button"
          key={index}
          onClick={() => setLightbox(index)}
          tabIndex={index === currentSlide ? 0 : -1}
          aria-hidden={index !== currentSlide}
          aria-label={`View photo full screen: ${slide.alt}`}
          className={`absolute inset-0 cursor-zoom-in transition-opacity duration-500 ${
            index === currentSlide ? "opacity-100" : "pointer-events-none opacity-0"
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
        </button>
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

      <Lightbox
        images={slides}
        index={lightbox}
        onChange={(i) => {
          setLightbox(i);
          if (i !== null) setCurrentSlide(i);
        }}
      />
    </div>
  );
};

export default Slideshow;
