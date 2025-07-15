"use client";
import Team from "@/components/about/Team";
import InnerBanner from "@/components/InnerBanner";
import MissionVision from "@/components/MissionVision";
import Overview from "@/components/Overview";
import { useEffect, useState } from "react";
import BOD from "../../components/about/BOD";
import LoadingSpinner from "../LoadingSpinner";

export default function AboutClient() {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    async function fetchAboutData() {
      try {
        const res = await fetch("/api/about");
        const data = await res.json();
        console.log("About Us data:", data);
        setAboutData(data);
      } catch (error) {
        console.error("Failed to fetch about-us data:", error);
      }
    }

    fetchAboutData();
  }, []);

  if (!aboutData) return <LoadingSpinner />;

  const banner = aboutData?.data?.sections?.find(
    (f) => f?.section_data?.slug === "about-banner"
  );

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
      <InnerBanner
        img={banner?.images?.list?.[0]?.full_path}
        title={banner?.section_data?.subtitle}
      />
      <Overview data={overview} />
      <MissionVision data={missionVision} large={large} medium={medium} />
      <BOD data={directors} />
      <Team data={ourTeam} />
    </>
  );
}
