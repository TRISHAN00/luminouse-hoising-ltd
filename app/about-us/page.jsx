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
  const banner = getData?.data?.sections?.find(
    (f) => f.section_data?.slug == "about-banner"
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
      <InnerBanner img={bannerImage} title={bannerName} />
      <Overview data={overview} />
      <MissionVision data={missionVision} large={large} medium={medium} />
      <BOD data={directors} />
      <Team data={ourTeam} />
    </>
  );
}
