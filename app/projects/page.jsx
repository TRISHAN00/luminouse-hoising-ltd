import { getApi } from "@/api/page-api";
import { getProjectListApi } from "@/api/project";
import InnerBanner from "@/components/InnerBanner";
import ProjectList from "@/components/project/ProjectList";

export async function metadata() {
  const getData = await getApi("projects");
  const banner = getData?.data?.sections?.find(
    (f) => f.section_data?.slug == "project-banner"
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
