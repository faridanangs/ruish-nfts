"use client";
import React, { useEffect, useState } from "react";
import { EcommerceCard, LayoutGridDemo } from "./Card";
import { Search } from "./search";
import Category from "../create-nft/category";
import { useStateContext } from "@/context/nfts";

export default function NftCollection() {
  const [values, setValues] = React.useState(new Set([]));
  const [allNfts, setallNfts] = useState();

  const { getAllNFT } = useStateContext();

  const handleGetAllNFTs = async () => {
    const nfts = await getAllNFT();
    setallNfts(nfts);
  };

  useEffect(() => {
    handleGetAllNFTs();
  }, []);

  console.log(allNfts);

  return (
    <div className="min-h-screen w-full dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative max-w-screen-xl mx-auto px-6">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      <Search />
      <div className="flex justify-end mb-12">
        <Category
          values={values}
          setValues={setValues}
          show={false}
          text={"NFT Category"}
        />
      </div>
      {/* <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {allNfts?.map(async (val, i) => {
          const resp = await fetch(val.tokenUri);
          console.log(resp);
          return (
            <EcommerceCard owner={val.owner} id={val.id} uri={val.tokenUri} />
          );
        })}
      </div> */}
    </div>
  );
}
