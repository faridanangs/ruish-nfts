"use client";

import { useState } from "react";
import { PlaceholdersAndVanishInput } from "../ui/search-input";

export function Search({ setQuery }) {
  const placeholders = [
    "What makes NFTs so unique?",
    "What is DeFi (Decentralized Finance)?",
    "How is a blockchain transaction validated?",
    "Write a smart contract to mint an NFT on Ethereum.",
    "What is Proof of Stake consensus in crypto?",
  ];
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    setQuery(value);
  };
  return (
    <div className="mb-8">
      <h2 className="mb-4 text-xl text-center sm:text-3xl dark:text-white text-black mt-8 font-bold">
        Search for The NFT You Want
      </h2>
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
    </div>
  );
}
