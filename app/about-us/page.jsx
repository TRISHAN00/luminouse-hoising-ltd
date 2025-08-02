// app/page.jsx
import LoadingSpinner from "@/components/LoadingSpinner";

import { getApi } from "@/api/page-api.js";
import Team from "@/components/about/Team";
import InnerBanner from "@/components/InnerBanner";
import MissionVision from "@/components/MissionVision";
import Overview from "@/components/Overview";
import BOD from "../../components/about/BOD";

export async function metadata() {
  const getData = await getApi("about-us");
  const pageData = getData?.data?.page_data || {};

  const banner = getData?.data?.sections?.find(
    (f) => f.section_data?.slug === "about-banner"
  );
  const bannerImage = banner?.images?.list?.[0]?.full_path;

  return {
    title: pageData?.meta_title || "About Us",
    description: pageData?.meta_description || "",
    openGraph: {
      title: pageData?.og_title || pageData?.meta_title || "About Us",
      description: pageData?.og_description || pageData?.meta_description || "",
      images: [
        {
          url: bannerImage || "/default-og-image.jpg",
          alt: pageData?.meta_title || "About Us",
        },
      ],
    },
  };
}

export default async function AboutPage() {
  const apiValue = "about-us";
  const aboutData = await getApi(apiValue);

  if (!aboutData) return <LoadingSpinner />;

  const banner = aboutData?.data?.sections?.find(
    (f) => f?.section_data?.slug === "about-banner"
  );

  const bannerImage = banner?.images?.list?.[0]?.full_path;
  const bannerName = banner?.section_data?.subtitle;

  const overview = aboutData?.data?.sections?.find(
    (f) => f?.section_data?.slug === "about-overview"
  );

  const missionVision = aboutData?.data?.sections?.find(
    (f) => f?.section_data?.slug === "mission-vision"
  );

  const large = missionVision?.images?.list?.find((f) => f.large === "on");
  const medium = missionVision?.images?.list?.find((f) => f.medium === "on");

  const directors = aboutData?.data?.sections?.find(
    (f) => f?.section_data?.slug === "directors"
  );

  const ourTeam = aboutData?.data?.sections?.find(
    (f) => f?.section_data?.slug === "our-team"
  );

  if (!aboutData) return <LoadingSpinner />;
  return (
    <>
      {bannerName && <InnerBanner img={bannerImage} title={bannerName} />}
      {overview && <Overview data={overview} />}
      {missionVision && (
        <MissionVision data={missionVision} large={large} medium={medium} />
      )}
      {directors && <BOD data={directors} />}
      {ourTeam && <Team data={ourTeam} />}
    </>
  );
}
