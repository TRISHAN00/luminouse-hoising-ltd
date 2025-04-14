// "use client" ❌ REMOVE THIS LINE

import { getHomeApi } from "@/api/home";
import InnerBanner from "@/components/InnerBanner";
import MissionVision from "@/components/MissionVision";
import Overview from "@/components/Overview";
import BOD from "../../components/about/BOD";
import aboutImg from '../../public/images/dynamic/about/about.jpg';

export const metadata = {
  title: {
    default: "About Us | Luminouse Housing Limited",
  },
  description:
    "Dcastalia is a software development company in Bangladesh that started its journey with the aim to deliver innovative result-driven software solutions.",
};

export default async function About() {
  const getHomeData = await getHomeApi();

  return (
    <>
      <InnerBanner img={aboutImg} title={'About Us'} />
      <Overview />
      <MissionVision />
      <BOD/>
    </>
  );
}
