import Image from "next/image";
import React from "react";
import Link from "next/link";
import CopyNumber from "./ui/CopyNumber";
import JeremyEmail from "./ui/JeremyEmail";

const Footer = () => {
  return (
    <section className="w-full justify-center pt-[4rem] px-[1rem]">
      <div className="flex flex-col md:flex-row md:flex-wrap text-white justify-evenly md:gap-[.33rem] lg:gap-0">
        <div className="flex flex-col lg:flex-row">
          <Image
            src="/Logo.jpeg"
            alt="Fullmers Grind LLC"
            width={574}
            height={435}
            className="w-[250px] h-auto rounded-xl"
          />
          <div className="flex-col">
            <p className="text-white max-w-[315px] sm:max-w-[375px] mt-[.75rem] lg:mt-0 lg:ml-[.75rem]">
              At Fullmers Grind LLC, we are proud to be a family-owned and
              operated business. We understand how important your property is to
              you, and we are here to help with all your stump grinding needs.
              Thank you for choosing Fullmers Grind LLC — we look forward to
              serving you!
            </p>
            <div>
              <h2 className="max-w-[315px] sm:max-w-[375px] pt-[.75rem] lg:mt-0 lg:ml-[.75rem] h4 font-bold">
                Services:
              </h2>
              <p className="text-white max-w-[315px] sm:max-w-[375px] mt-[.5rem] lg:mt-0 lg:ml-[.75rem]">
                Stump Grinding, Small Tree Removal, Snow Removal and Small Demo
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col py-[1.25rem] lg:py-0">
          <h2 className="h4 font-bold">Service Area: </h2>
          <div className="flex mt-[.25rem] mb-[.75rem]">
            <Image
              src={"/Map.png"}
              alt={"Map"}
              width={14}
              height={14}
              className="mr-[.5rem] w-[14px] h-[14px] flex my-auto"
            ></Image>
            <p>Buffalo, NY | Wyoming & Genesee County</p>
          </div>

          <h2 className="h4 font-bold">Contact Info:</h2>
          <div className="flex my-[.5rem]">
            <Image
              className="mr-[.5rem]"
              src={"/Phone.svg"}
              alt={"Phone"}
              width={14}
              height={14}
            ></Image>
            <CopyNumber />
          </div>
          <div className="flex gap-[.5rem]">
            <Image
              src={"/Mail.svg"}
              alt={"Email"}
              width={14}
              height={14}
            ></Image>
            <JeremyEmail />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="mb-[1.25rem] lg:mb-[2.25rem]">
            <h2 className="h4 mb-[.75rem] font-bold">Follow Us:</h2>
            <Link
              href="https://www.facebook.com/share/1C4tFpuSw9/?mibextid=wwXIfr"
              target="_blank"
            >
              <Image
                src={"/facebook.svg"}
                alt={"Facebook"}
                width={32}
                height={32}
                className="bg-[#3b5998] rounded-full hover:scale-110 transition-all duration-200 ease-in-out"
              ></Image>
            </Link>
          </div>
          <div>
            <Link href={"https://www.fcvt.dev/"} target="_blank">
              <button className="w-[205px] h-[48px] border flex flex-col items-start gap-[-3px] rounded-lg">
                <div className="flex flex-col  items-start m-auto">
                  <span className="text-[.5rem] flex items-start">
                    Developed by
                  </span>
                  <span className="pb-1">Flower City Virtual Tours</span>
                </div>
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="text-white text-[.66rem] flex justify-center mt-[2.5rem] border-t py-[.25rem] w-full">
        © 2025 Fullmers Grind LLC | All Rights Reserved
      </div>
    </section>
  );
};

export default Footer;
