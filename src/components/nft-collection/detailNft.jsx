"use client";
import { useStateContext } from "@/context/nfts";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Loading from "../loading/Loading";
import { FaEthereum, FaRegHeart, FaExternalLinkAlt } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { TbFileDescription } from "react-icons/tb";
import { IoIosArrowDown } from "react-icons/io";
import { Button as BTN } from "@material-tailwind/react";
import Link from "next/link";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Spinner,
  Button,
} from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";
import { useAccount, useReadContract } from "wagmi";
import { contractAbi, contractAddress } from "@/context/contract-abi";

const DetailNft = ({ id }) => {
  const { getNFTByID, setNotification, buyNft, getHistoryID } = useStateContext();
  const [dataNft, setDataNft] = useState(null);
  const [metadata, setMetadata] = useState();
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const nft = await getNFTByID(id);
      setDataNft(nft);

      const historyId = await getHistoryID(id);
      setHistory(historyId);

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
    <div className="w-full max-w-screen-xl mx-auto">
      {loading ? (
        <Loading text="Loading..." />
      ) : (
        <div className="font-sans">
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="lg:col-span-1">
                <div className="flex justify-between items-center px-4 py-2 bg-gradient-to-l from-blue-gray-700 to-blue-gray-900 rounded-t-md">
                  <FaEthereum />
                  <div className="flex items-center gap-4">
                    <FaRegHeart />
                    <Link href={metadata.image}>
                      <FaExternalLinkAlt className="text-blue-400" />
                    </Link>
                  </div>
                </div>
                <Image
                  src={metadata.image}
                  alt="Product"
                  className="w-full rounded-b object-cover mx-auto"
                  width={1000}
                  height={1000}
                />
              </div>

              <div className="md:col-span-1 flex flex-col gap-2">
                <div className="flex items-center gap-4">
                  <span className="flex text-sm items-center gap-2 px-2 rounded-md border-[1px]">
                    <FaRegHeart /> 1 favorites
                  </span>
                  <span className="flex text-sm items-center gap-2 px-2 rounded-md border-[1px]">
                    <MdOutlineRemoveRedEye /> 1 view
                  </span>
                </div>

                <div className="my-6">
                  <span className="text-3xl text-blue-gray-100 font-bold flex items-start justify-between gap-1">
                    <span>{metadata.name}</span>
                    <span>#{dataNft.id}</span>
                  </span>
                  <span className="text-sm font-bold text-blue-gray-500">
                    Owned By{" "}
                    <span className="font-normal text-white/70 underline">
                      {dataNft.owner.slice(0, 30)}...
                    </span>
                  </span>
                </div>

                <div className="border-[1px] rounded-md px-2 py-4">
                  <div className="flex flex-col gap-1">
                    <p className="text-sm text-blue-gray-200 font-bold ">
                      Current Price
                    </p>
                    <div className="flex items-center">
                      <h1 className="font-bold text-xl px-1 py-1">
                        {dataNft.price} ETH
                      </h1>
                    </div>
                    <div className="flex items-center bg-gradient-to-r from-blue-gray-700 to-blue-gray-900 rounded-md">
                      <BTN
                        fullWidth
                        className="bg-transparent border-r-1 rounded-none border-gray-500"
                        onClick={() => {
                          buyNft(dataNft.id, dataNft.price);
                          setLoading(true);
                        }}
                      >
                        Buy Now{" "}
                      </BTN>
                      <span className="h-full text-xl px-3 cursor-pointer hover:text-green-500 hover:scale-105 inline-block">
                        <FaCartShopping />
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border-[1px] rounded-md flex flex-col">
                  <span className="flex items-center border-b-[1px] p-2">
                    <TbFileDescription />
                    Description
                  </span>
                  <span className="px-2 py-3 inline-block border-b">
                    <span className="flex items-center text-sm gap-[3px] text-blue-gray-500">
                      {" "}
                      By{" "}
                      <p className="text-white/90 font-normal text-[14px]">
                        {dataNft.owner.slice(0, 8)}...
                      </p>
                    </span>
                    <p className="text-blue-gray-200 text-sm">
                      {metadata.description}
                    </p>
                  </span>
                  <span className="px-2 py-3 border-b flex justify-between items-center">
                    <span className=" text-sm text-blue-gray-100">Traits</span>
                    <span>
                      <IoIosArrowDown className="text-lg" />
                    </span>
                  </span>
                  <span className="px-2 py-3 flex justify-between items-center">
                    <span className=" text-sm text-blue-gray-100">Details</span>
                    <span>
                      <IoIosArrowDown className="text-lg" />
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <div className="my-8">
              <h1 className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-gray-400 to-blue-gray-800 text-xl md:text-3xl my-3">
                Transaction History
              </h1>
              {
                history && <TransactionHistory history={history}/>
              }
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const TransactionHistory = ({history}) => {
  const [page, setPage] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(true);
  let list = useAsyncList({
    async load({ signal, cursor }) {
      if (cursor) {
        setPage((prev) => prev + 1);
      }

      if (!cursor) {
        setIsLoading(false);
      }

      
    },
  });
  const hasMore = page < 2;

  return (
    <Table
      isHeaderSticky
      aria-label="Example table with client side sorting"
      classNames={{
        base: "max-h-[520px] overflow-scroll max-w-3xl",
        table: "min-h-[50px]",
      }}
    >
      <TableHeader>
        <TableColumn key="id">ID</TableColumn>
        <TableColumn key="from">From</TableColumn>
        <TableColumn key="to">To</TableColumn>
        <TableColumn key="amount">Value</TableColumn>
        <TableColumn key="time">Time</TableColumn>
      </TableHeader>
      <TableBody
        isLoading={isLoading}
        items={history}
        loadingContent={<Spinner label="Loading..." />}
        className="flex items-center gap-2"
      >
        {(item) => (
          <TableRow key={item.name}>
            {(columnKey) => (
              <TableCell className="mx-4">{getKeyValue(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default DetailNft;
