"use client";
import React, { useEffect, useState } from "react";
import { EcommerceCard } from "./Card";
import { Search } from "./search";
import Category from "../create-nft/category";
import { useStateContext } from "@/context/nfts";
import Loading from "../loading/Loading";

export default function NftCollection() {
  const [values, setValues] = useState(new Set([]));
  const [allNfts, setAllNfts] = useState([]);
  const [ecommerceCards, setEcommerceCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchResultsFound, setSearchResultsFound] = useState(true);

  const { getAllNFT, setNotification } = useStateContext();

  const handleGetAllNFTs = async () => {
    try {
      const nfts = await getAllNFT();
      setAllNfts(nfts);
      setLoading(false);
    } catch (error) {
      console.error("Error getting all NFTs:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetAllNFTs();
  }, []);

  useEffect(() => {
    if (allNfts === undefined) return setNotification("Tidak ada nft");

    const fetchData = async () => {
      try {
        const results = await Promise.all(
          allNfts.map(async (nft) => {
            const resp = await fetch(nft.tokenUri);
            if (!resp.ok) {
              throw new Error(resp.statusText);
            }
            const data = await resp.json();

            return {
              id: nft.id,
              name: data.name,
              owner: data.owner,
              desc: data.description,
              image: data.image,
            };
          })
        );

        setSearchResults(results);
      } catch (error) {
        console.error("Error fetching tokenUris:", error);
      }
    };

    fetchData();
  }, [allNfts]);

  useEffect(() => {
    const filteredResults = searchResults.filter(
      (result) =>
        result.name.toLowerCase().includes(query.toLowerCase()) ||
        result.desc.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResultsFound(filteredResults.length > 0);
    setEcommerceCards(
      filteredResults.map((result) => (
        <EcommerceCard
          key={result.id}
          id={result.id}
          name={result.name}
          owner={result.owner}
          desc={result.desc}
          image={result.image}
        />
      ))
    );
  }, [searchResults, query]);

  return (
    <>
      {loading ? (
        <Loading text="Loading..." />
      ) : (
        <div className="min-h-screen w-full dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative max-w-screen-xl mx-auto px-6">
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
          <Search setQuery={setQuery} />
          <div className="flex justify-end mb-12">
            <Category
              values={values}
              setValues={setValues}
              show={false}
              text={"NFT Category"}
            />
          </div>
          {allNfts !== undefined ? (
            <>
              {!searchResultsFound && (
                <div className="text-sm" ><Loading text="No results found for your search." /></div>
              )}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {ecommerceCards}
              </div>
            </>
          ) : (
            <Loading text="Theren't Collections" />
          )}
        </div>
      )}
    </>
  );
}
