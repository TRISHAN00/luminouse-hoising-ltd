import { getProjectDetailApi } from "@/api/project";
import reactHtmlParser from "react-html-parser";


export async function generateMetadata({params, searchParams}, parent) {
    const PortfolioData = await getProjectDetailApi(params.slug)
    return {
        title: {
            default: `${PortfolioData?.title} | Dcastalia`,
        },
        description: "We are a full-service digital marketing agency in Dhaka, Bangladesh that converts ideas into simple, trendy, and optimal solutions.",
    }
};

export default async function PortfolioDetail({params}) {
    const PortfolioData = await getProjectDetailApi(params.slug)
    return (
        <div className={"project-detail"} style={{width: '80%', margin: '100px auto'}}>
            <h3>{PortfolioData?.title}</h3>
            <p>{reactHtmlParser(PortfolioData?.body)}</p>
        </div>
    );
};

