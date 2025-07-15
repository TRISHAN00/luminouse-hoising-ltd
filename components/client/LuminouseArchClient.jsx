"use client";
import Team from "@/components/about/Team";
import GarmentsGallery from "@/components/GarmentsGallery";
import InnerBannerConcern from "@/components/InnerBannerConcern";
import MissionVision from "@/components/MissionVision";
import Overview from "@/components/Overview";
import { useEffect, useState } from "react";
import LoadingSpinner from "../LoadingSpinner";

export default function LuminouseArchClient() {
  const [archData, setArchData] = useState(null);

  useEffect(() => {
    async function fetchArchData() {
      try {
        const res = await fetch("/api/luminouse-arch");
        const data = await res.json();
        setArchData(data);
      } catch (error) {
        console.error("Failed to fetch Arch data:", error);
      }
    }

    fetchArchData();
  }, []);

  const banner = archData?.data?.sections?.find(
    (f) => f?.section_data?.slug === "arch-banner"
  );

  const overview = archData?.data?.sections?.find(
    (f) => f?.section_data?.slug === "overview-arch"
  );

  const large = overview?.images?.list?.find((f) => f.large === "on");
  const medium = overview?.images?.list?.find((f) => f.medium === "on");

  const gallery = archData?.data?.sections?.find(
    (f) => f?.section_data?.slug === "gallery-arch"
  );

  const team = archData?.data?.sections?.find(
    (f) => f?.section_data?.slug === "team-arch"
  );

  if (!archData) return <LoadingSpinner />;

  return (
    <>
      {banner && (
        <InnerBannerConcern
          color={"#F68A32"}
          img={banner?.images?.list?.[0]?.full_path}
          title={banner?.section_data?.subtitle}
          address={banner?.section_data?.description}
        />
      )}
      {overview && <Overview data={overview} />}
      {overview && (
        <MissionVision data={overview} large={large} medium={medium} />
      )}
      {gallery && <GarmentsGallery gallery={gallery} />}
      {team && <Team data={team} />}
    </>
  );
}
