// components/HomeClient.jsx
"use client";

import CallbackRequestForm from "@/components/Contact";
import Banner from "@/components/home/Banner";
import Client from "@/components/home/Client";
import Dream from "@/components/home/Dream";
import FeatureSlider from "@/components/home/FeatureSlider";
import ImageCollageSection from "@/components/ImageCollageSection";
import NewsEventsSlider from "@/components/NewsEventsSlider";
import Overview from "@/components/Overview";
import { useEffect, useState } from "react";
import LoadingSpinner from "../LoadingSpinner";

export default function HomeClient() {
  const [homeData, setHomeData] = useState(null);

  useEffect(() => {
    async function fetchHomeData() {
      try {
        const res = await fetch("/api/home");
        const data = await res.json();
        console.log("Home data in browsersss:", data);
        setHomeData(data);
      } catch (error) {
        console.error("Failed to fetch home data:", error);
      }
    }

    fetchHomeData();
  }, []);

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
    (f) => f?.section_data?.slug === "vision-statement"
  );

  const landownerBuyer = homeData?.data?.sections?.find(
    (f) => f?.section_data?.slug === "growth-values"
  );

  const contactUs = homeData?.data?.sections?.find(
    (f) => f?.section_data?.slug === "contact-with-us"
  );

  const newsEvent = homeData?.data?.sections?.find(
    (f) => f?.section_data?.slug === "news-events"
  );

  return (
    <>
      <Banner data={bannerData} />
      <Overview data={overview} />
      <ImageCollageSection data={overview} />
      <FeatureSlider title={featureTitle} />
      <Dream data={dream} />
      <Client data={landownerBuyer} />
      <CallbackRequestForm data={contactUs} />
      <NewsEventsSlider data={newsEvent} />
    </>
  );
}
