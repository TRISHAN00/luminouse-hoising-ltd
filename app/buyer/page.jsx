import { getApi } from "@/api/page-api";
import InnerBanner from "@/components/InnerBanner";
import LandownerForm from "@/components/landowner/LandownerForm";
import LoadingSpinner from "@/components/LoadingSpinner";
import MissionVision from "@/components/MissionVision";
import Overview from "@/components/Overview";
import TestimonialSection from "@/components/Testimonial";
import RealEstateTestimonials from "@/components/TestimonialVideo";


export async function metadata() {
  const getData = await getApi("buyer");
  const banner = getData?.data?.sections?.find(
    (f) => f.section_data?.slug == "buyer-banner"
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

export default async function buyer() {
  const apiValue = "buyer";
  const buyerData = await getApi(apiValue);

  if (!buyerData) return <LoadingSpinner/>;

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
