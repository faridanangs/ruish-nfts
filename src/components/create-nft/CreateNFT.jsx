"use client";
import Image from "next/image";
import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { SignupFormDemo } from "./property";
import { useStateContext } from "@/context/nfts";

const CreateNFT = () => {
  const { loading } = useStateContext();
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
    <>
      {loading ? (
        "Loading.."
      ) : (
        <div className="text-white bg-black max-w-screen-xl mx-auto w-full md:min-h-[100vh] md:items-center justify-center md:flex">
          <div className="flex flex-col items-center md:flex-row md:justify-between md:px-8 md:items-start md:gap-6 pt-8 md:py-20 md:rounded-md w-full ">
            <div className="w-[22rem] h-[22rem] border-dashed border-[2px] flex items-center justify-center flex-col p-2 md:p-0 md:mt-3 relative max-w-[22rem] min-w-[20rem]">
              {display != null ? (
                <>
                  <span className="absolute top-0 right-0 z-10">
                    <IoMdClose
                      className="text-2xl text-black font-bold bg-white hover:scale-110 transition-all duration-100 cursor-pointer"
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
                  <label
                    htmlFor="file"
                    className="cursor-pointer text-blue-500 hover:scale-110 transition-all duration-100"
                  >
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
              <SignupFormDemo file={file} setFile={setFile} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateNFT;
