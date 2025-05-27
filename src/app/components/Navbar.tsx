"use client";
import Contact from "./ui/Contact";

const Navbar = () => {
  return (
    <header>
      <nav className="z-50 top-0 fixed flex w-full items-center justify-between gap-5 bg-white/5 backdrop-blur-md p-6 px-[1.25rem] shadow-md border-b border-white/20">
        <h1 className="text-xl sm:text-2xl font-bold flex items-center text-center">
          Fullmers Grind LLC
        </h1>
        <div className="flex items-center bg-black/30 p-2 rounded-md">
          <ul className="z-50 gap-[1.25rem] px-[1rem] font-bold text-white drop-shadow-lg">
            <Contact />
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
