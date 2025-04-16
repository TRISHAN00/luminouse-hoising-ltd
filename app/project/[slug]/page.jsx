import { getProjectDetailApi } from "@/api/project";
import InnerBannerDetail from "@/components/project/InnerBannerDetail";
import banner from '../../../public/images/dynamic/home/banner-01.jpg';


export async function generateMetadata({params, searchParams}, parent) {
    const PortfolioData = await getProjectDetailApi(params.slug)
    return {
        title: {
            default: `Luminouse Jesmin Tower | Luminouse Housing Limited`,
        },
        description: "We are a full-service digital marketing agency in Dhaka, Bangladesh that converts ideas into simple, trendy, and optimal solutions.",
    }
};

export default async function PortfolioDetail({params}) {
    const PortfolioData = await getProjectDetailApi(params.slug)
    return (
        <div className={"project-detail"} >
            <InnerBannerDetail img={banner} title={"Luminous Jesmin Tower" } />
           
        </div>
    );
};

