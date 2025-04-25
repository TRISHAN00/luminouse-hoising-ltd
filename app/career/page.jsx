// "use client" ❌ REMOVE THIS LINE

import { getHomeApi } from "@/api/home";
import CareerForm from "@/components/career/CareerForm";
import InnerBanner from "@/components/InnerBanner";
import Overview from "@/components/Overview";
import landownerImage from "../../public/images/dynamic/career/banner.jpg";

export const metadata = {
  title: {
    default: "Career | Luminouse Housing Limited",
  },
  description:
    "Luminouse is a software development company in Bangladesh that started its journey with the aim to deliver innovative result-driven software solutions.",
};

export default async function Career() {
  const getHomeData = await getHomeApi();

  return (
    <>
      <InnerBanner img={landownerImage} title={"Career"} />
      <Overview />
      <CareerForm />
    </>
  );
}
