import { getHomeApi } from "@/api/home";
import Banner from "@/components/home/Banner";
import FeatureSlider from "@/components/home/FeatureSlider";
import ImageCollageSection from "@/components/ImageCollageSection";
import Overview from "@/components/Overview";

export const metadata = {
  title: {
    default: "Luminouse Housing Limited",
  },
  description:
    "Dcastalia is a software development company in Bangladesh that started its journey with the aim to deliver innovative result-driven software solutions.",
};

export default async function Home() {
  const getHomeData = await getHomeApi();

  return (
    <>
      <Banner/>
      <Overview/>
      <ImageCollageSection/>
      <FeatureSlider/>
    </>
  );
}
