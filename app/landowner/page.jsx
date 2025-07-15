import LandownerClient from "@/components/client/LandownerClient";

export const metadata = {
  title: {
    default: "Landowner | Luminouse Housing Limited",
  },
  description:
    "Luminouse is a software development company in Bangladesh that started its journey with the aim to deliver innovative result-driven software solutions.",
};

export default async function Landowner() {
  return (
    <>
      <LandownerClient/>
    </>
  );
}
