import { getApi } from "@/api/page-api";
import { getProjectListApi } from "@/api/project";
import InnerBanner from "@/components/InnerBanner";
import ProjectList from "@/components/project/ProjectList";

export async function metadata() {
  const getData = await getApi("projects");
  const pageData = getData?.data?.page_data || {};

  const banner = getData?.data?.sections?.find(
    (f) => f.section_data?.slug === "project-banner"
  );
  const bannerImage = banner?.images?.list?.[0]?.full_path;

  return {
    title: pageData.meta_title || "Our Projects",
    description: pageData.meta_description || "",
    openGraph: {
      title: pageData.og_title || pageData.meta_title || "Our Projects",
      description: pageData.og_description || pageData.meta_description || "",
      images: [
        {
          url: bannerImage || "/default-og.jpg",
          alt: pageData.meta_title || "Our Projects",
        },
      ],
    },
  };
}


export default async function page() {
  const projectBanner = await getApi("projects");
  const projectsData = await getProjectListApi();

  const banner = projectBanner?.data?.sections?.find(
    (f) => f?.section_data?.slug === "project-banner"
  );

  return (
    <>
      <InnerBanner
        img={banner?.images?.list?.[0]?.full_path}
        title={banner?.section_data?.subtitle}
      />
      <ProjectList data={projectsData} />
    </>
  );
}
