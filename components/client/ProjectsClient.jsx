"use client";

import ProjectList from "@/components/project/ProjectList";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import InnerBanner from "../../components/InnerBanner";
import projects from "../../public/images/dynamic/projects/banner.jpg";
import LoadingSpinner from "../LoadingSpinner";

export default function ProjectClient({projectsData}) {
  const searchParams = useSearchParams();
  const type = searchParams.get("type"); 
  const [projectsData, setProjectsData] = useState(null);

  useEffect(() => {
    async function fetchProjectsData() {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        setProjectsData(data);
      } catch (error) {
        console.error("Failed to fetch projects data:", error);
      }
    }

    fetchProjectsData();
  }, []);

  if (!projectsData) return <LoadingSpinner />;

  return (
    <>
      <InnerBanner img={projects} title={"Projects"} />
      <ProjectList data={projectsData} type={type} />
    </>
  );
}
