import { getApi } from "@/api/page-api";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactSection from "@/components/ContactSection";
import InnerBanner from "@/components/InnerBanner";

export async function metadata() {
  const getData = await getApi("contact-us");
  const banner = getData?.data?.sections?.find(
    (f) => f.section_data?.slug == "contact-banner"
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
