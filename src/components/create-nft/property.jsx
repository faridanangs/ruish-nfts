import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/utils/cn";
import { Textarea } from "../ui/textarea";
import Category from "./category";
import { useStateContext } from "@/context/nfts";
import axios from "axios";

export function SignupFormDemo({ file, setDisplay }) {
  const { setLoading, createNFT, address } = useStateContext();

  const [values, setValues] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ((file && name && email && description, values && address)) {
      try {
        setLoading(true);
        const formFile = new FormData();
        formFile.append("file", file);

        const resp = await axios({
          method: "POST",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formFile,
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIwNjE2ZWE3OC1lYWFkLTQxYTAtYTExOC02MDc2NzFmZTZmNzgiLCJlbWFpbCI6ImY0cjFkYW5hbmdzQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJjMTIwMjYyZTcyODg3MzFlYzEwYiIsInNjb3BlZEtleVNlY3JldCI6IjRjYzYyNDUzZmYxMzAxZWI1M2MxNTEyYjRhOTI2MTg5MWI5NTYwZWRhNGE1MTQ3YWYzMGYxY2RkOTkyYzc3ZTUiLCJpYXQiOjE3MTQxOTUzODB9.SJi0bb1vp_Rfzn2ChUDwrX39tvRiTaB1w_LrZW6cj74",
          },
        });

        const image = `https://gateway.pinata.cloud/ipfs/${resp.data.IpfsHash}`;

        const metadata = {
          owner: address,
          name: name,
          email: email,
          image: image,
          category: Array.from(values),
          description: description,
          createdAt: new Date(),
        };

        const pinataMetadata = await axios.post(
          "https://api.pinata.cloud/pinning/pinJSONToIPFS",
          metadata,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIwNjE2ZWE3OC1lYWFkLTQxYTAtYTExOC02MDc2NzFmZTZmNzgiLCJlbWFpbCI6ImY0cjFkYW5hbmdzQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJjMTIwMjYyZTcyODg3MzFlYzEwYiIsInNjb3BlZEtleVNlY3JldCI6IjRjYzYyNDUzZmYxMzAxZWI1M2MxNTEyYjRhOTI2MTg5MWI5NTYwZWRhNGE1MTQ3YWYzMGYxY2RkOTkyYzc3ZTUiLCJpYXQiOjE3MTQxOTUzODB9.SJi0bb1vp_Rfzn2ChUDwrX39tvRiTaB1w_LrZW6cj74`,
            },
          }
        );

        const jsonUri = `https://gateway.pinata.cloud/ipfs/${pinataMetadata.data.IpfsHash}`;

        await createNFT(address, jsonUri);
        setDisplay(null);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    setName("");
    setEmail("");
    setEmail("");
    setValues([]);
    setDescription("");
    setDisplay(null);
    setLoading(false);
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-0 shadow-input lg:max-w-xl lg:w-[10000rem]">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200 md:text-4xl">
        Property
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Create properties for your NFTs so they are easy to identify
      </p>

      <form className="my-8" onSubmit={(e) => handleSubmit(e)}>
        <div className="flex flex-col md:flex-row space-y-2 gap-4 md:gap-0 w-full md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="name">name</Label>
            <Input
              id="name"
              placeholder="Usman"
              type="text"
              onChange={setName}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              placeholder="usmanni@fc.com"
              type="email"
              onChange={setEmail}
            />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="my-6">
          <Label htmlFor="category">Category</Label>
          <Category
            values={values}
            setValues={setValues}
            show={true}
            text={"Category for your NFTs"}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="description">Description</Label>
          <Textarea
            onChange={setDescription}
            id="description"
            color="blue-gray"
            label="description"
            placeholder="Description"
          />
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Create Now &rarr;
          <BottomGradient />
        </button>
      </form>
    </div>
  );
}

export const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
