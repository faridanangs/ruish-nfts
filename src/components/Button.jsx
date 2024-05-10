"use client";
import React from "react";
import { HoverBorderGradient } from "@/components/ui/border-gradient";
import { FcNext } from "react-icons/fc";


export function Button({text}) {
  return (
    <div className=" flex justify-center text-center">
      <HoverBorderGradient
        containerClassName="rounded-full"
        as="button"
        className="dark:bg-black bg-white text-black dark:text-[#99cae3c6] flex items-center space-x-2"
      >
        <span>{text}</span>
        <FcNext className="text-[#99cae3c6]"/>
      </HoverBorderGradient>
    </div>
  );
}