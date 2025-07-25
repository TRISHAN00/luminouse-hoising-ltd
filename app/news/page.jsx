import { getBlogListApi } from "@/api/blog";
import { getApi } from "@/api/page-api";
import InnerBanner from "@/components/InnerBanner";
import LoadingSpinner from "@/components/LoadingSpinner";
import NewsEventFilter from "@/components/news/NewsEventFilter";

export async function metadata() {
  const getData = await getApi("news-events");

  const banner = getData?.data?.sections?.find(
    (f) => f.section_data?.slug == "news-banner"
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
