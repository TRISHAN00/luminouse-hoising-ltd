import ProjectList from "@/components/project/ProjectList";
import InnerBanner from "../../components/InnerBanner";
import projects from "../../public/images/dynamic/projects/banner.jpg";

export const metadata = {
  title: {
    default: "Projects | Luminouse Housing Limited",
  },
  description:
    "Luminouse is a software development company in Bangladesh that started its journey with the aim to deliver innovative result-driven software solutions.",
};

export default async function Portfolio() {
  return (
    <>
      <InnerBanner img={projects} title={'Projects'} />
      <ProjectList/>
    </>
  );
}
