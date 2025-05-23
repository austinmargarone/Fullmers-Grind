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
          <p className="text-white max-w-[315px] sm:max-w-[375px] mt-[.75rem] lg:mt-0 lg:ml-[.75rem]">
            At Fullmers Grind LLC, we take pride in being a family-owned and
            operated business. We understand the importance of your property,
            and we are here to help you with all of your stump grinding and tree
            removal needs. Thank you for choosing Fullmers Grind LLC. We look
            forward to serving you!
          </p>
        </div>

        <div className="flex flex-col py-[1.25rem] lg:py-0">
          <h2 className="h4">Service Area: </h2>
          <p className="mt-[.25rem]">Buffalo, NY</p>
          <h2 className="h4">Contact Info:</h2>
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
            <h2 className="h4 mb-[.75rem]">Follow Us</h2>
            <Link
              href="https://www.facebook.com/share/1C4tFpuSw9/?mibextid=wwXIfr"
              target="_blank"
            >
              <Image
                src={"/Insta.svg"}
                alt={"Facebook"}
                width={32}
                height={32}
              ></Image>
            </Link>
          </div>
          <div>
            <Link href={"https://www.fcvt.dev/"} target="_blank">
              <button className="w-[205px] h-[48px] border flex flex-col items-start gap-[-3px]">
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
