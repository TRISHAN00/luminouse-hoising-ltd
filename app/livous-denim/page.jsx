import { getHomeApi } from "@/api/home";
import Team from "@/components/about/Team";
import GarmentsGallery from "@/components/GarmentsGallery";
import InnerBannerConcern from "@/components/InnerBannerConcern";
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
      {/* <InnerBanner img={landownerImage} title={"Livous Denim Ltd."} /> */}
   
      <InnerBannerConcern 
        img={landownerImage}
        title="Livous Denim Ltd."
        address="123 Industrial Zone, Textile District<br>Mumbai, Maharashtra 400001<br><a href='tel:+919876543210'>+91 9876543210</a>"
      />
      <Overview />
      <MissionVision />
      <GarmentsGallery />
      <Team />
    </>
  );
}
