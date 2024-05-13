"use client";

import { PlaceholdersAndVanishInput } from "../ui/search-input";

export function Search() {
  const placeholders = [
    "What makes NFTs so unique?",
    "What is DeFi (Decentralized Finance)?",
    "How is a blockchain transaction validated?",
    "Write a smart contract to mint an NFT on Ethereum.",
    "What is Proof of Stake consensus in crypto?",
];


  const handleChange = (e) => {
    console.log(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
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
