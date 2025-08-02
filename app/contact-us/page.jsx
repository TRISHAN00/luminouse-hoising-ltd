import { getApi } from "@/api/page-api";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactSection from "@/components/ContactSection";
import InnerBanner from "@/components/InnerBanner";

export async function metadata() {
  const getData = await getApi("contact-us");
  const pageData = getData?.data?.page_data || {};

  const banner = getData?.data?.sections?.find(
    (f) => f.section_data?.slug === "contact-banner"
  );
  const bannerImage = banner?.images?.list?.[0]?.full_path;

  return {
    title: pageData.meta_title || "Contact Us",
    description: pageData.meta_description || "",
    openGraph: {
      title: pageData.og_title || pageData.meta_title || "Contact Us",
      description: pageData.og_description || pageData.meta_description || "",
      images: [
        {
          url: bannerImage || "/default-og-image.jpg",
          alt: pageData.meta_title || "Contact Us",
        },
      ],
    },
  };
}

export default async function Landowner() {
  const apiValue = "contact-us";
  const contactData = await getApi(apiValue);

  const banner = contactData?.data?.sections?.find(
    (f) => f?.section_data?.slug === "contact-banner"
  );

  const contactInfo = contactData?.data?.sections?.find(
    (f) => f?.section_data?.slug === "contact-info"
  );
  return (
    <>
      {banner && (
        <InnerBanner
          img={banner?.images?.list?.[0]?.full_path}
          title={banner?.section_data?.subtitle}
        />
      )}
      <ContactInfo data={contactInfo} />
      <ContactSection />
    </>
  );
}
