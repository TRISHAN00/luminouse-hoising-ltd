import ProjectClient from "@/components/client/ProjectsClient";

export const metadata = {
  title: {
    default: "Projects | Luminouse Housing Limited",
  },
  description:
    "Luminouse is a software development company in Bangladesh that started its journey with the aim to deliver innovative result-driven software solutions.",
};

export default async function page() {
  return (
    <>
     <ProjectClient/>
    </>
  );
}
