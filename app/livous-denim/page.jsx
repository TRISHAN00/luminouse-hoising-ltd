import { getHomeApi } from "@/api/home";
import BOD from "@/components/about/BOD";
import GarmentsGallery from "@/components/GarmentsGallery";
import InnerBanner from "@/components/InnerBanner";
import MissionVision from "@/components/MissionVision";
import Overview from "@/components/Overview";
import landownerImage from "../../public/images/dynamic/landowner/banner.jpg";

export const metadata = {
  title: {
    default: "Livous Denim Ltd | Luminouse Housing Limited",
  },
  description:
    "Livous Denim Ltd is a software development company in Bangladesh that started its journey with the aim to deliver innovative result-driven software solutions.",
};

export default async function LivousDenim() {
  const getHomeData = await getHomeApi();

  return (
    <>
      <InnerBanner img={landownerImage} title={"Livous Denim Ltd."} />
      <Overview />
      <MissionVision/>
      <GarmentsGallery/>
      <BOD/>
    </>
  );
}
