"use client";
import React, { useEffect, useState } from "react";
import { EcommerceCard } from "./Card";
import { Search } from "./search";
import Category from "../create-nft/category";
import { useStateContext } from "@/context/nfts";

export default function NftCollection() {
  const [values, setValues] = useState(new Set([]));
  const [allNfts, setAllNfts] = useState([]);
  const [ecommerceCards, setEcommerceCards] = useState([]);

  const { getAllNFT } = useStateContext();

  const handleGetAllNFTs = async () => {
    const nfts = await getAllNFT();
    setAllNfts(nfts);
  };

  useEffect(() => {
    handleGetAllNFTs();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ecommerceCards = await Promise.all(
          allNfts.map(async (nft) => {
            const resp = await fetch(nft.tokenUri);
            if (!resp.ok) {
              throw new Error(resp.statusText);
            }
            const data = await resp.json();
            return (
              <EcommerceCard
                id={nft.id}
                name={data.name}
                owner={data.owner}
                desc={data.description}
                image={data.image}
              />
            );
          })
        );
        setEcommerceCards(ecommerceCards);
      } catch (error) {
        console.error("Error fetching tokenUris:", error);
      }
    };

    fetchData();
  }, [allNfts]);

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
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {ecommerceCards ? ecommerceCards : "lol"}
      </div>
    </div>
  );
}
