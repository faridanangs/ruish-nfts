"use client";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Typography,
} from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";

export function EcommerceCard({ id, image, desc, name }) {
  return (
    <Card className="w-full relative bg-gradient-to-l from-blue-gray-200 to-blue-gray-400">
      <div className="absolute text-lg text-white p-2 bottom-0 right-0 bg-black/90 rounded-sm">#{id}</div>
      <CardHeader shadow={false} floated={false}>
        <Image
          src={image}
          alt={name}
          className="w-full h-[14rem] sm:h-[18rem] md:h-[16rem] object-cover"
          width={500}
          priority={100}
          height={500}
        />
      </CardHeader>
      <CardBody>
        <div className=" flex items-center justify-between">
          <Typography color="blue-gray" className="font-bold max-w-[13rem]">
            {name.slice(0, 20).toUpperCase()}
          </Typography>
          <Typography color="blue-gray" className="font-semibold text-sm">
            0,004 ETH
          </Typography>
        </div>
        <Typography
          variant="small"
          color="black"
          className="font-normal"
        >
          {desc}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Link href="/nft-collection/1 ">
          <Button
            variant="text"
            className="flex items-center gap-2 bg-black text-white hover:bg-black/70"
          >
            Show Detail{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
