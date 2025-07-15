"use client";

import InnerBanner from "@/components/InnerBanner";
import MissionVision from "@/components/MissionVision";
import Overview from "@/components/Overview";
import { useEffect, useState } from "react";
import LandownerForm from "../landowner/LandownerForm";
import LoadingSpinner from "../LoadingSpinner";
import TestimonialSection from "../Testimonial";
import RealEstateTestimonials from "../TestimonialVideo";

export const metadata = {
  title: {
    default: "Buyer | Luminouse Housing Limited",
  },
  description:
    "Luminouse is a software development company in Bangladesh that started its journey with the aim to deliver innovative result-driven software solutions.",
};

export default function BuyerClient() {
  const [buyerData, setbuyerData] = useState(null);

  useEffect(() => {
    async function fetchbuyerData() {
      try {
        const res = await fetch("/api/buyer");
        const data = await res.json();
        console.log("buyer data in browser:", data);
        setbuyerData(data);
      } catch (error) {
        console.error("Failed to fetch buyer data:", error);
      }
    }

    fetchbuyerData();
  }, []);

  if (!buyerData) return <LoadingSpinner />;

  const banner = buyerData?.data?.sections?.find(
    (f) => f?.section_data?.slug === "buyer-banner"
  );

  const overview = buyerData?.data?.sections?.find(
    (f) => f?.section_data?.slug === "buyer-overview"
  );

  const buyerImage = buyerData?.data?.sections?.find(
    (f) => f?.section_data?.slug === "buyer-images"
  );

  const large = buyerImage?.images?.list?.find((f) => f.large === "on");
  const medium = buyerImage?.images?.list?.find((f) => f.medium === "on");

  const videos = buyerData?.data?.sections?.find(
    (f) => f?.section_data?.slug === "buyer-video"
  );

  const testimonial = buyerData?.data?.sections?.find(
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
      {buyerImage && (
        <MissionVision isMissionVision large={large} medium={medium} />
      )}
      <LandownerForm />
      {videos && <RealEstateTestimonials data={videos} />}
      {testimonial && <TestimonialSection data={testimonial} />}
    </>
  );
}
