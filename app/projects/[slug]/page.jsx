import ProjectDetailClient from "@/components/client/ProjectDetailClient";

export async function generateMetadata() {
  return {
    title: {
      default: `Luminouse Jesmin Tower | Luminouse Housing Limited`,
    },
    description:
      "We are a full-service digital marketing agency in Dhaka, Bangladesh that converts ideas into simple, trendy, and optimal solutions.",
  };
}

export default async function PortfolioDetail() {
  return <ProjectDetailClient />;
}
