'use client'
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

export function EcommerceCard({owner, uri, id}) {  
  return (
    <Card className="w-full backdrop-blur-md relative ">
      <CardHeader shadow={false} floated={false}>
        <Image
          src="https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80"
          alt="card-image"
          className="w-full h-[14rem] sm:h-[18rem] md:h-[16rem] object-cover"
          width={500}
          priority={100}
          height={500}
        />
      </CardHeader>
      <CardBody>
        <div className=" flex items-center justify-between">
          <Typography color="blue-gray" className="font-medium">
            Apple AirPods
          </Typography>
          <Typography color="blue-gray" className="font-medium">
            $95.00
          </Typography>
        </div>
        <Typography
          variant="small"
          color="gray"
          className="font-normal opacity-75"
        >
          With plenty of talk and listen time, voice-activated Siri access, and
          an available wireless charging case.
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
