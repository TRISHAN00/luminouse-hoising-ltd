import { getBlogListApi } from "@/api/blog";
import { getApi } from "@/api/page-api";
import InnerBanner from "@/components/InnerBanner";
import LoadingSpinner from "@/components/LoadingSpinner";
import NewsEventFilter from "@/components/news/NewsEventFilter";

export async function metadata() {
  const getData = await getApi("news-events");
  const pageData = getData?.data?.page_data || {};

  const banner = getData?.data?.sections?.find(
    (f) => f.section_data?.slug === "news-banner"
  );
  const bannerImage = banner?.images?.list?.[0]?.full_path;

  return {
    title: pageData.meta_title || "News & Events",
    description: pageData.meta_description || "",
    openGraph: {
      title: pageData.og_title || pageData.meta_title || "News & Events",
      description: pageData.og_description || pageData.meta_description || "",
      images: [
        {
          url: bannerImage || "/default-og.jpg",
          alt: pageData.meta_title || "News & Events",
        },
      ],
    },
  };
}


export default async function NewsEvents() {
  const apiValue = "news-events";
  const aboutData = await getApi(apiValue);
  const blogData = await getBlogListApi();

  if (!aboutData) return <LoadingSpinner />;

  const banner = aboutData?.data?.sections?.find(
    (f) => f?.section_data?.slug === "news-banner"
  );

  const bannerImage = banner?.images?.list?.[0]?.full_path;
  const bannerName = banner?.section_data?.subtitle;

  return (
    <div>
      <InnerBanner img={bannerImage} title={bannerName} />
      <NewsEventFilter newsList={blogData} />
    </div>
  );
}
