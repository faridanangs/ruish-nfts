"use client";
import Image from "next/image";
import React, { useState } from "react";
import image1 from "../Image/1.jpg";
import { IoMdClose } from "react-icons/io";
import { SignupFormDemo } from "./property";
import { useStateContext } from "@/context/nfts";

const CreateNFT = () => {
  const { setLoading, loading } = useStateContext();
  const [display, setDisplay] = useState();
  const [file, setFile] = useState();

  const retrieveFile = (e) => {
    const data = e.target.files[0];

    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    };
    e.preventDefault();
  };

  // take image
  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setDisplay(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="text-white max-w-screen-xl mx-auto w-full md:min-h-[80vh] md:items-center justify-center md:flex">
      <div className="flex flex-col items-center bg-white/10 md:flex-row md:justify-between md:px-8 md:items-start md:gap-6 pt-8 md:py-20 md:rounded-md w-full backdrop-blur-md">
        <div className="w-[22rem] h-[22rem] border-dashed border-[2px] flex items-center justify-center flex-col p-2 relative max-w-[22rem] min-w-[20rem]">
          {display != null ? (
            <>
              <span className="absolute top-2 right-2 z-10">
                <IoMdClose
                  className="text-3xl text-red-700 font-bold backdrop-blur-none hover:scale-110 transition-all duration-100 bg-white/80 cursor-pointer"
                  onClick={() => setDisplay(null)}
                />
              </span>
              <Image src={display} alt="nft images" fill quality={100} />
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={0.4}
                stroke="currentColor"
                className="h-[10rem] w-[10rem]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                />
              </svg>
              <label htmlFor="file" className="cursor-pointer hover:scale-110 transition-all duration-100">
                <p>Selected File Here</p>
              </label>
              <input
                type="file"
                id="file"
                className="hidden"
                onChange={(e) => (onImageChange(e), retrieveFile(e))}
              />
            </>
          )}
        </div>
        <div className="mt-8 md:mt-0">
          <SignupFormDemo />
        </div>
      </div>
    </div>
  );
};

export default CreateNFT;
