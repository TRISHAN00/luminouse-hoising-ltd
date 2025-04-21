// "use client" ❌ REMOVE THIS LINE

import { getHomeApi } from "@/api/home";
import InnerBanner from "@/components/InnerBanner";
import LandownerForm from "@/components/landowner/LandownerForm";
import MissionVision from "@/components/MissionVision";
import Overview from "@/components/Overview";
import TestimonialSection from "@/components/Testimonial";
import landownerImage from "../../public/images/dynamic/landowner/banner.jpg";

export const metadata = {
  title: {
    default: "Landowner | Luminouse Housing Limited",
  },
  description:
    "Luminouse is a software development company in Bangladesh that started its journey with the aim to deliver innovative result-driven software solutions.",
};

export default async function Landowner() {
  const getHomeData = await getHomeApi();

  return (
    <>
      <InnerBanner img={landownerImage} title={"Landowner"} />
      <Overview />
      <MissionVision isMissionVision />
      <LandownerForm />
      <TestimonialSection/>
    </>
  );
}
