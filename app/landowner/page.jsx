import { getApi } from "@/api/page-api";
import InnerBanner from "@/components/InnerBanner";
import LandownerForm from "@/components/landowner/LandownerForm";
import LoadingSpinner from "@/components/LoadingSpinner";
import MissionVision from "@/components/MissionVision";
import Overview from "@/components/Overview";
import TestimonialSection from "@/components/Testimonial";
import RealEstateTestimonials from "@/components/TestimonialVideo";

export async function metadata() {
  const getData = await getApi("landowner");
  const banner = getData?.data?.sections?.find(
    (f) => f.section_data?.slug == "landowner-banner"
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

export default async function Landowner() {
  const apiValue = "landowner";
  const landownerData = await getApi(apiValue);

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
