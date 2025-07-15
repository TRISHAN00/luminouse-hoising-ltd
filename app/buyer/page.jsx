// "use client" ❌ REMOVE THIS LINE

import BuyerClient from "@/components/client/BuyerClient";

export const metadata = {
  title: {
    default: "Buyer | Luminouse Housing Limited",
  },
  description:
    "Luminouse is a software development company in Bangladesh that started its journey with the aim to deliver innovative result-driven software solutions.",
};

export default async function Buyer() {
  return (
    <>
      <BuyerClient/>
    </>
  );
}
