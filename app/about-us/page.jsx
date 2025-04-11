import { getHomeApi } from "@/api/home";

export const metadata = {
  title: {
    default: "Luminouse Housing Limited",
  },
  description:
    "Dcastalia is a software development company in Bangladesh that started its journey with the aim to deliver innovative result-driven software solutions.",
};

export default async function About() {
  const getHomeData = await getHomeApi();

  return (
    <>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum natus,
      doloribus saepe perferendis aut omnis. Excepturi, facere modi qui dolore
      maiores ducimus, repellat rerum commodi, doloribus impedit laudantium!
      Debitis, a.
    </>
  );
}
