"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import AtaGlance from "@/components/AtaGlance";
import ContactSection from "@/components/ContactSection";
import FeaturedAmenities from "@/components/project/FeaturedAmenities";
import InnerBannerDetail from "@/components/project/InnerBannerDetail";
import ProjectGalllery from "@/components/project/ProjectGalllery";
import ImageCollageSection from "../ImageCollageSection";
import LoadingSpinner from "../LoadingSpinner";

export default function ProjectDetailClient() {
  const params = useParams();
  const [projectData, setprojectData] = useState(null);

  useEffect(() => {
    if (!params?.slug) return;

    async function fetchprojectData() {
      try {
        const res = await fetch(`/api/project-detail/${params.slug}`);
        const data = await res.json();
        setprojectData(data);
      } catch (error) {
        console.error("Failed to fetch project data:", error);
      }
    }

    fetchprojectData();
  }, [params.slug]);

  const banner = projectData?.data;
  const atAGlance = projectData?.data?.product_data;
  const overview = projectData?.data?.posts?.list?.find(
    (f) => f?.data?.slug === "overview"
  );

  const amenities = projectData?.data?.posts?.list?.find(
    (f) => f?.data?.slug === "featured-amenities"
  );

  const gallery = projectData?.data?.posts?.list?.find(
    (f) => f?.data?.slug === "gallery"
  );

  if (!projectData) return <LoadingSpinner />;

  return (
    <div className={"project-detail"}>
      {banner && (
        <InnerBannerDetail
          data={banner}
          title={banner?.product_data?.title}
          img={banner?.images?.list?.[0]?.full_path}
        />
      )}
      {atAGlance && <AtaGlance data={atAGlance} />}
      {overview?.images?.length > 0 && (
        <ImageCollageSection projectData={overview} />
      )}
      {amenities?.images && (
        <FeaturedAmenities amenitiesData={amenities?.images} />
      )}
      {gallery && <ProjectGalllery data={gallery} />}
      <ContactSection />
    </div>
  );
}
