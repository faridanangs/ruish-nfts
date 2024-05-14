import React from "react";
import style from "./Logo.module.css";

const Loading = ({text}) => {
  return (
    <div className="w-full min-h-screen flex items-center md:gap-16 justify-center flex-col gap-8">
      <div className={`${style.spinner}`}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <h1 className="text-2xl">{text}</h1>
    </div>
  );
};

export default Loading;
