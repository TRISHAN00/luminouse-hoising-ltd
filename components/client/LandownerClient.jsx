"use client";
import InnerBanner from "@/components/InnerBanner";
import LandownerForm from "@/components/landowner/LandownerForm";
import MissionVision from "@/components/MissionVision";
import Overview from "@/components/Overview";
import TestimonialSection from "@/components/Testimonial";
import { useEffect, useState } from "react";
import LoadingSpinner from "../LoadingSpinner";
import RealEstateTestimonials from "../TestimonialVideo";

export default function LandownerClient() {
  const [landownerData, setlandownerData] = useState(null);

  useEffect(() => {
    async function fetchlandownerData() {
      try {
        const res = await fetch("/api/landowner");
        const data = await res.json();
        console.log("landowner data in browser:", data);
        setlandownerData(data);
      } catch (error) {
        console.error("Failed to fetch landowner data:", error);
      }
    }

    fetchlandownerData();
  }, []);

  if (!landownerData) return <LoadingSpinner />;

  const banner = landownerData?.data?.sections?.find(
    (f) => f?.section_data?.slug === "landowner-banner"
  );

  const overview = landownerData?.data?.sections?.find(
    (f) => f?.section_data?.slug === "landowner-overview"
  );

  const landownerImage = landownerData?.data?.sections?.find(
    (f) => f?.section_data?.slug === "landowner-images"
  );

  const large = landownerImage?.images?.list?.find((f) => f.large === "on");
  const medium = landownerImage?.images?.list?.find((f) => f.medium === "on");

  const videos = landownerData?.data?.sections?.find(
    (f) => f?.section_data?.slug === "landowner-video"
  );

  const testimonial = landownerData?.data?.sections?.find(
    (f) => f?.section_data?.slug === "testimonial"
  );

  return (
    <>
      {banner && (
        <InnerBanner
          img={banner?.images?.list?.[0]?.full_path}
          title={banner?.section_data?.subtitle}
        />
      )}
      {overview && <Overview data={overview} />}
      {landownerImage && (
        <MissionVision isMissionVision large={large} medium={medium} />
      )}
      <LandownerForm />
      {videos && <RealEstateTestimonials data={videos} />}
      {testimonial && <TestimonialSection data={testimonial} />}
    </>
  );
}
