import { getApi } from "@/api/page-api";
import Team from "@/components/about/Team";
import GarmentsGallery from "@/components/GarmentsGallery";
import InnerBannerConcern from "@/components/InnerBannerConcern";
import MissionVision from "@/components/MissionVision";
import Overview from "@/components/Overview";

export async function metadata() {
  const getData = await getApi("livous-denim");
  const pageData = getData?.data?.page_data || {};

  const banner = getData?.data?.sections?.find(
    (f) => f.section_data?.slug === "livous-banner"
  );
  const bannerImage = banner?.images?.list?.[0]?.full_path;

  return {
    title: pageData.meta_title || "Livous Denim",
    description: pageData.meta_description || "",
    openGraph: {
      title: pageData.og_title || pageData.meta_title || "Livous Denim",
      description: pageData.og_description || pageData.meta_description || "",
      images: [
        {
          url: bannerImage || "/default-og.jpg",
          alt: pageData.meta_title || "Livous Denim",
        },
      ],
    },
  };
}


export default async function LivousDenimPage() {
  const apiValue = "livous-denim";
  const livousData = await getApi(apiValue);

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
