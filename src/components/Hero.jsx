import React from "react";

import { Spotlight } from "@/components/ui/Spotlight";
import { Button } from "./button";

function Hero() {
  return (
    <div className="min-h-screen w-full flex-col flex sm:items-center sm:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden mx-auto max-w-screen-xl px-4 py-2">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0">
        <div className="text-4xl md:text-7xl sm:text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-blue-gray-100 to-blue-gray-200 bg-opacity-70">
          Keep your assets safe by tokenizing them using &nbsp;
          <span className="text-[#99cae3c6] ">
            NFTs
          </span>
        </div>
        <p className="mt-14 font-normal text-base text-blue-gray-50 max-w-lg text-center mx-auto">
          Experience tokenization with our NFTs to keep your assets safe from
          loss, duplication, damage, etc
        </p>
      </div>
      <div className="mt-8">
        <Button text="Get Started"/>
      </div>
    </div>
  );
}

export default Hero;
