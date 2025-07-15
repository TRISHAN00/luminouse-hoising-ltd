"use client";
import Team from "@/components/about/Team";
import InnerBannerConcern from "@/components/InnerBannerConcern";
import MissionVision from "@/components/MissionVision";
import Overview from "@/components/Overview";
import { useEffect, useState } from "react";
import GarmentsGallery from "../GarmentsGallery";
import LoadingSpinner from "../LoadingSpinner";

export default function LivousDenimClient() {
  const [livousData, setLivousData] = useState(null);

  useEffect(() => {
    async function fetchLivousData() {
      try {
        const res = await fetch("/api/livous");
        const data = await res.json();
        setLivousData(data);
      } catch (error) {
        console.error("Failed to fetch Livous data:", error);
      }
    }

    fetchLivousData();
  }, []);

  const banner = livousData?.data?.sections?.find(
    (f) => f?.section_data?.slug === "livous-banner"
  );

  const overview = livousData?.data?.sections?.find(
    (f) => f?.section_data?.slug === "overview"
  );

  const large = overview?.images?.list?.find((f) => f.large === "on");
  const medium = overview?.images?.list?.find((f) => f.medium === "on");

  const gallery = livousData?.data?.sections?.find(
    (f) => f?.section_data?.slug === "gallery"
  );

  const team = livousData?.data?.sections?.find(
    (f) => f?.section_data?.slug === "team"
  );

  if (!livousData) return <LoadingSpinner />;

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
