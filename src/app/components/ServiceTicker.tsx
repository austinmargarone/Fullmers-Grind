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

  // Ensure seamless looping by duplicating content multiple times
  useEffect(() => {
    const ticker = tickerRef.current;
    if (ticker) {
      const firstList = ticker.children[0] as HTMLElement;
      // Duplicate the list 3 additional times (total 4 lists: original + 3 clones)
      for (let i = 0; i < 6; i++) {
        const clone = firstList.cloneNode(true) as HTMLElement;
        ticker.appendChild(clone);
      }
    }
  }, []);

  return (
    <div
      style={{
        width: "100%",
        overflow: "hidden",
        backgroundColor: "rgba(255, 255, 255, 0.0777)", // bg-white/5 for glassy effect
        backdropFilter: "blur(8px)", // backdrop-blur-md
        // borderBottom: '1px solid rgba(255, 255, 255, 0.2)', // border-b border-white/20 (optional, uncomment if desired)
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
          animation: "ticker 20s linear infinite",
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
                width: "200px", // Fixed width for consistent spacing
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
            transform: translateX(-80%);
          }
        }
      `}</style>
    </div>
  );
};

export default ServiceTicker;
