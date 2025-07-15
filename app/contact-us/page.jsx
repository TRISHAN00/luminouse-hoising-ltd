import ContactInfo from "@/components/contact/ContactInfo";
import ContactSection from "@/components/ContactSection";
import InnerBanner from "@/components/InnerBanner";
import landownerImage from "../../public/images/dynamic/contact/banner.jpg";

export const metadata = {
  title: {
    default: "Contact | Luminouse Housing Limited",
  },
  description:
    "Luminouse is a software development company in Bangladesh that started its journey with the aim to deliver innovative result-driven software solutions.",
};

export default async function Landowner() {
  return (
    <>
      <InnerBanner img={landownerImage} title={"Contact"} />
      <ContactInfo />
      <ContactSection />
    </>
  );
}
