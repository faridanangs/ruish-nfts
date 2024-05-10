"use client";
import React from "react";
import { HoverBorderGradient } from "@/components/ui/border-gradient";
import { GrLinkNext } from "react-icons/gr";


export function Button({text}) {
  return (
    <div className=" flex justify-center text-center">
      <HoverBorderGradient
        containerClassName="rounded-full"
        as="button"
        className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
      >
        <span>{text}</span>
        <GrLinkNext/>
      </HoverBorderGradient>
    </div>
  );
}