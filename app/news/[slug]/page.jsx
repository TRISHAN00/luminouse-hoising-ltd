import { getBlogDetailApi } from "@/api/blog";
import NewsBlogDetails from "@/components/news/NewsDetails";

// SEO
export async function generateMetadata({ params }) {
  const slug = params.slug;
  const projectData = await getBlogDetailApi(slug);

  return {
    title: {
      default: `${projectData?.data?.data?.title} | Luminous Housing Ltd.`,
    },
    openGraph: {
      title: `${projectData?.data?.data?.body} | Luminous Housing Ltd.`,
    },
  };
}

export default async function NewsDetails({ params }) {
  const slug = params.slug;
  const projectData = await getBlogDetailApi(slug);

  return <NewsBlogDetails projectData={projectData} />;
}
