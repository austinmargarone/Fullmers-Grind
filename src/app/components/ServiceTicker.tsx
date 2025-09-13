"use client";

import { useRef, useEffect } from "react";

const services = [
  "Stump Grinding",
  "Snow Plowing",
  "Small Tree Removal",
  "Small Demo",
  "|",
];

const ServiceTicker: React.FC = () => {
  const tickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ticker = tickerRef.current;
    if (!ticker) return;

    const firstList = ticker.children[0] as HTMLElement;
    const listWidth = firstList.offsetWidth; // Get the width of the original list
    const cloneCount = Math.ceil(window.innerWidth / listWidth) + 1; // Enough clones to cover viewport + buffer

    // Clear any existing clones to avoid duplicates on re-render
    while (ticker.children.length > 1) {
      ticker.removeChild(ticker.children[1]);
    }

    // Add clones based on calculated count
    for (let i = 0; i < cloneCount; i++) {
      const clone = firstList.cloneNode(true) as HTMLElement;
      ticker.appendChild(clone);
    }

    // Update animation duration based on content width for consistent speed
    const totalWidth = listWidth * (cloneCount + 1); // Total width including clones
    const speed = 120; // Pixels per second (adjust for desired speed)
    const duration = totalWidth / speed; // Calculate duration for smooth scrolling

    ticker.style.animationDuration = `${duration}s`;
  }, []);

  return (
    <div
      style={{
        width: "100%",
        overflow: "hidden",
        backgroundColor: "rgba(255, 255, 255, 0.0777)", // bg-white/5 for glassy effect
        backdropFilter: "blur(8px)", // backdrop-blur-md
        color: "#FFFFFF", // text-white
        paddingTop: "1rem", // py-4
        paddingBottom: "1rem",
      }}
    >
      <div
        ref={tickerRef}
        style={{
          display: "flex",
          whiteSpace: "nowrap",
          animation: "ticker linear infinite",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "2rem", // space-x-8
          }}
        >
          {services.map((service, index) => (
            <span
              key={index}
              style={{
                fontSize: "1.125rem", // text-lg
                fontWeight: "600", // font-semibold
                minWidth: "200px", // Minimum width for consistent spacing
                textAlign: "center",
                display: "inline-block", // Ensure consistent width
              }}
            >
              {service}
            </span>
          ))}
        </div>
      </div>
      <style jsx>{`
        @keyframes ticker {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-120%);
          }
        }
      `}</style>
    </div>
  );
};

export default ServiceTicker;
