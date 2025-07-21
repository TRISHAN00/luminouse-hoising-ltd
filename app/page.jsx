// app/page.jsx
import LoadingSpinner from "@/components/LoadingSpinner";

import { getApi } from "@/api/home.js";
import { getProjectListApi } from "@/api/project";
import CallbackRequestForm from "@/components/Contact";
import Banner from "@/components/home/Banner";
import ClientSection from "@/components/home/Client";
import Dream from "@/components/home/Dream";
import FeatureSlider from "@/components/home/FeatureSlider";
import ImageCollageSection from "@/components/ImageCollageSection";
import Overview from "@/components/Overview";

export async function metadata() {
  const getData = await getApi("home");


  const banner = getData?.data?.sections?.find(
    (f) => f.section_data?.slug == "banner"
  );

  return {
    title: {
      default: `${getData?.data?.page_data?.meta_title}`,
    },
    description: `${getData?.data?.page_data?.meta_description}`,
    openGraph: {
      title: `${getData?.data?.page_data?.og_title}`,
      description: `${getData?.data?.page_data?.og_description}`,
      images: [
        {
          url: `${banner?.images?.list?.[0]?.full_path}`,
          alt: `${getData?.data?.page_data?.meta_title}`,
        },
      ],
    },
  };
}

export default async function HomePage() {
  const apiValue = "home";
  const homeData = await getApi(apiValue);
  const featuredProjects = await getProjectListApi();

  if (!homeData) return <LoadingSpinner />;

  const bannerData = homeData?.data?.sections?.find(
    (f) => f?.section_data?.slug === "banner"
  )?.posts?.list;

  const overview = homeData?.data?.sections?.find(
    (f) => f?.section_data?.slug === "about"
  );

  const featureTitle = homeData?.data?.sections?.find(
    (f) => f?.section_data?.slug === "featured-projects"
  );
  const dream = homeData?.data?.sections?.find(
    (f) => f?.section_data?.slug === "dream"
  );

  const landownerBuyer = homeData?.data?.sections?.find(
    (f) => f?.section_data?.slug === "buyer-landowner"
  );

  const contactUs = homeData?.data?.sections?.find(
    (f) => f?.section_data?.slug === "get-in-touch"
  );

  const newsEvent = homeData?.data?.sections?.find(
    (f) => f?.section_data?.slug === "news-events"
  );
  return (
    <>
      <Banner data={bannerData} />
      <Overview data={overview} />
      <ImageCollageSection data={overview} />
      <FeatureSlider title={featureTitle} featuredProjects={featuredProjects} />
      <Dream data={dream} />
      <ClientSection data={landownerBuyer} />
      <CallbackRequestForm data={contactUs} />
      {/* <NewsEventsSlider data={newsEvent} />  */}
    </>
  );
}
