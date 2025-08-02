import { getBlogDetailApi } from "@/api/blog";
import NewsBlogDetails from "@/components/news/NewsDetails";

// SEO
export async function generateMetadata({ params }) {
  const slug = params.slug;
  const getData = await getBlogDetailApi(slug);
  const pageData = getData?.data?.data;

  return {
    title: pageData?.meta_title || "News Details",
    description: pageData?.meta_description || "",
  };
}


export default async function NewsDetails({ params }) {
  const slug = params.slug;
  const projectData = await getBlogDetailApi(slug);

  return <NewsBlogDetails projectData={projectData} />;
}
