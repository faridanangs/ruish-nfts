import DetailNft from "@/components/nft-collection/detailNft";
import React from "react";

const page = ({ params }) => {
  return <DetailNft id={params.slug}/>;
};

export default page;
