import { getProjectDetailApi } from "@/api/project";
import AtaGlance from "@/components/AtaGlance";
import ContactSection from "@/components/ContactSection";
import ImageCollageSection from "@/components/ImageCollageSection";
import FeaturedAmenities from "@/components/project/FeaturedAmenities";
import InnerBannerDetail from "@/components/project/InnerBannerDetail";
import ProjectGalllery from "@/components/project/ProjectGalllery";
import HTMLReactParser from "html-react-parser";
import { notFound } from "next/navigation";

// SEO
export async function generateMetadata({ params }) {
  const slug = params.slug;
  const projectData = await getProjectDetailApi(slug);

  if (!projectData || !projectData?.data?.product_data) {
    return notFound();
  }

  const banner = projectData?.data;

  return {
    title: {
      default: `${HTMLReactParser(
        banner?.product_data?.title
      )} | Luminous Housing Ltd.`,
    },
    openGraph: {
      title: `${HTMLReactParser(
        banner?.product_data?.title
      )} | Luminous Housing Ltd.`,
    },
  };
}

// Dynamic Detail Page
export default async function ProjectDetailPage({ params }) {
  const slug = params.slug;
  const projectData = await getProjectDetailApi(slug);

  if (!projectData || !projectData?.data?.product_data) {
    return notFound();
  }

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

  const bannerImg =
    banner?.images?.list?.find((f) => f.background === "on") ||
    banner?.images?.list?.[0]?.full_path;

  return (
    <div className="project-detail">
      {banner && (
        <InnerBannerDetail
          data={banner}
          title={banner?.product_data?.title}
          img={bannerImg}
        />
      )}
      {atAGlance && <AtaGlance data={atAGlance} projectData={projectData} />}
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
