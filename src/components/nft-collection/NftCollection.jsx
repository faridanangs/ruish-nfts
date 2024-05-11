"use client";
import React from "react";
import { LayoutGridDemo } from "./Card";
import { Search } from "./search";

export default function NftCollection() {
  return (
    <div className="min-h-screen w-full dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative max-w-screen-xl mx-auto px-3">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

      {/* <Search />
      <div className="grid">
        <LayoutGridDemo />
      </div> */}
    </div>
  );
}
