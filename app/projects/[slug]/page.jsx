import { getProjectDetailApi } from "@/api/project";
import AtaGlance from "@/components/AtaGlance";
import ContactSection from "@/components/ContactSection";
import ImageCollageSection from "@/components/ImageCollageSection";
import FeaturedAmenities from "@/components/project/FeaturedAmenities";
import InnerBannerDetail from "@/components/project/InnerBannerDetail";
import ProjectGalllery from "@/components/project/ProjectGalllery";
import banner from "../../../public/images/dynamic/home/banner-01.jpg";

export async function generateMetadata({ params, searchParams }, parent) {
  const PortfolioData = await getProjectDetailApi(params.slug);
  return {
    title: {
      default: `Luminouse Jesmin Tower | Luminouse Housing Limited`,
    },
    description:
      "We are a full-service digital marketing agency in Dhaka, Bangladesh that converts ideas into simple, trendy, and optimal solutions.",
  };
}

export default async function PortfolioDetail({ params }) {
  const PortfolioData = await getProjectDetailApi(params.slug);
  return (
    <div className={"project-detail"}>
      <InnerBannerDetail img={banner} title={"Luminous Jesmin Tower"} />
      <AtaGlance />
      <ImageCollageSection/>
      <FeaturedAmenities/>
      <ProjectGalllery/>
      <ContactSection/>
    </div>
  );
}
