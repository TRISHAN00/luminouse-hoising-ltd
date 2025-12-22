import { getBlogListApi } from "@/api/blog";
import { getApi } from "@/api/page-api.js";
import { getProjectListApi } from "@/api/project";
import CallbackRequestForm from "@/components/Contact";
import Banner from "@/components/home/Banner";
import ClientSection from "@/components/home/Client";
import Dream from "@/components/home/Dream";
import FeatureSlider from "@/components/home/FeatureSlider";
import ImageCollageSection from "@/components/ImageCollageSection";
import LoadingSpinner from "@/components/LoadingSpinner";
import NewsEventsSlider from "@/components/NewsEventsSlider";
import Overview from "@/components/Overview";

export async function metadata() {
  const getData = await getApi("home");
  const pageData = getData?.data?.page_data || {};

  const banner = getData?.data?.sections?.find(
    (f) => f.section_data?.slug === "banner"
  );
  const bannerImage = banner?.images?.list?.[0]?.full_path;

  return {
    title: pageData.meta_title || "Home",
    description: pageData.meta_description || "",
    openGraph: {
      title: pageData.og_title || pageData.meta_title || "Home",
      description: pageData.og_description || pageData.meta_description || "",
      images: [
        {
          url: bannerImage || "/default-og.jpg",
          alt: pageData.meta_title || "Home",
        },
      ],
    },
  };
}


export default async function HomePage() {
  const apiValue = "home";
  const homeData = await getApi(apiValue);
  const featuredProjects = await getProjectListApi();
  const getAllNewsEvents = await getBlogListApi();

  if (!homeData && !featuredProjects) return <LoadingSpinner />;

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

  return (
    <>
      {bannerData && <Banner data={bannerData} />}
      {overview && <Overview data={overview} />}
      {overview && <ImageCollageSection data={overview} />}
      {featureTitle && featuredProjects && (
        <FeatureSlider
          title={featureTitle}
          featuredProjects={featuredProjects}
        />
      )}

      {dream && <Dream data={dream} />}
      {landownerBuyer && <ClientSection data={landownerBuyer} />}
      {contactUs && <CallbackRequestForm data={contactUs} />}

      <NewsEventsSlider getAllNewsEvents={getAllNewsEvents} />
    </>
  );
}
