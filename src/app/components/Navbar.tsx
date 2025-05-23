"use client";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <header>
      <nav className="z-50 top-0 fixed flex w-full items-center justify-between gap-5 bg-white/5 backdrop-blur-md p-6 px-[1.25rem] shadow-md border-b border-white/20">
        {" "}
        <Link href="/" passHref>
          <Image
            src="/Logo.png"
            alt="Fullmers Grind LLC"
            width={100}
            height={50}
          />
        </Link>
        <div className="flex items-center bg-black/30 p-2 rounded-md">
          <ul className="z-50 hidden md:flex gap-[1.25rem] px-[1rem] font-bold text-white drop-shadow-lg">
            <Link href="/" passHref>
              <li>Contact</li>
            </Link>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
