"use client";
import React from "react";
import { HoverBorderGradient } from "@/components/ui/border-gradient";
import { GrLinkNext } from "react-icons/gr";
import Link from "next/link";

export function ButtonAnim({ text, link }) {
  return (
    <div className=" flex justify-center text-center">
      <Link href={link}>
        <HoverBorderGradient
          containerClassName="rounded-full"
          as="button"
          className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
        >
          <span>{text}</span>
          <GrLinkNext />
        </HoverBorderGradient>
      </Link>
    </div>
  );
}
