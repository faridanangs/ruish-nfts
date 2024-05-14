"use client";
import { useStateContext } from "@/context/nfts";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Loading from "../loading/Loading";

const DetailNft = ({ id }) => {
  const { getNFTByID, setNotification } = useStateContext();
  const [dataNft, setDataNft] = useState(null);
  const [metadata, setMetadata] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const nft = await getNFTByID(id);
      setDataNft(nft);

      if (nft && nft.tokenUri) {
        try {
          const resp = await fetch(nft.tokenUri);
          if (resp.ok) {
            const data = await resp.json();
            setMetadata(data);
            setLoading(false);
          } else {
            console.log("error fetching data from pinata: " + resp.statusText);
            setLoading(false);
          }
        } catch (error) {
          console.log("error fetching data from pinata: " + error);
          setLoading(false);
        }
      } else {
        setNotification("data yang anda minta tidak ada");
        setLoading(false);
      }
    };

    fetchData();
  }, [id, getNFTByID]);

  return (
    <div className="w-full max-w-screen-xl mx-auto min-h-screen flex items-center">
      {loading ? (
        <Loading text="Loading..." />
      ) : (
        <div class="font-sans bg-gray-700">
          <div class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-6">
              <div class="lg:col-span-1 w-full text-center">
                <div class="">
                  <img
                    src={metadata.image}
                    alt="Product"
                    class="w-full rounded object-cover mx-auto"
                  />
                </div>
              </div>

              <div class="md:col-span-1">
                <h2 class="text-3xl font-semibold text-white">
                  {metadata.name.toUpperCase()}
                </h2>
                <div class="flex flex-wrap gap-4 mt-4">
                  <p class="text-white text-4xl font-semibold">$12</p>
                </div>

                <div class="flex flex-wrap gap-4 mt-8">
                  <button
                    type="button"
                    class="min-w-[200px] px-4 py-3 bg-yellow-300 hover:bg-yellow-400 text-black text-sm font-semibold rounded"
                  >
                    Buy now
                  </button>
                </div>

                <div class="mt-8">
                  <h3 class="text-lg font-semibold text-white">
                    About the Nft
                  </h3>
                  <p className="text-wrap">{metadata.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailNft;
