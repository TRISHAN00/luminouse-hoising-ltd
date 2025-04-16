import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";
import InnerBannerBg from "../../components/InnerBannerBg";
import Overview from "../../components/Overview";
import AtGlance from "../../components/project/AtaGlance";
import EnquiryForm from "../../components/project/EnquiryForm";
import FeatureSlider from "../../components/project/FeatureSlider";
import Gallery from "../../components/project/Gallery";
import Location from "../../components/project/Location";
import Video from "../../components/project/Video";

const Projects = ({data}) => {
    const [offset, setOffset] = useState('90');
    const [windowWidth, setWindowWidth] = useState(0);
    const getPost = data && data;

    const banner = getPost?.data;
    const desktop = getPost?.data?.images?.list?.find((f) => f?.Desktop === "on");
    const mobile = getPost?.data?.images?.list?.find((f) => f?.Mobile === "on");
    const overview = getPost?.data?.posts?.list?.find((f) => f?.data?.slug === "overview");
    const atAGlance = getPost?.data?.posts?.list?.find((f) => f?.data?.slug === "at-a-glance");
    const features = getPost?.data?.posts?.list?.find((f) => f?.data?.slug === "features-amenities");
    const gallery = getPost?.data?.posts?.list?.find((f) => f?.data?.slug === "gallery");
    const video = getPost?.data?.posts?.list?.find((f) => f?.data?.slug === "video");
    const location = getPost?.data?.posts?.list?.find((f) => f?.data?.slug === "location");


    useEffect(() => {
        const updateOffset = () => {
            if (window.innerWidth > 767) {
                const container = document.querySelector('.container');
                if (container) {
                    setOffset(container.offsetLeft + 15);
                }
            }
        };

        updateOffset();
    }, []);


    useEffect(() => {
        // Function to handle window resize
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        // Initial window width
        setWindowWidth(window.innerWidth);

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const data2 = [
        {
            "product_data": {
                "id": 0,
                "title": banner?.product_data?.title,
                "slug": banner?.product_data?.slug,
                "type": banner?.product_data?.type,
                "mapLink": banner?.product_data?.mapLink,
                "location": banner?.product_data?.location,
                "latitude": banner?.product_data?.latitude?.toString(),
                "longitude": banner?.product_data?.longitude?.toString(),
            }
        },
    ]


    return (
        <>
            <NextSeo
                title={getPost?.data?.product_data?.meta_title}
                description={getPost?.data?.product_data?.meta_description}
                openGraph={{
                    title:getPost?.data?.product_data?.meta_title,
                    description:getPost?.data?.product_data?.meta_description
                }}
            />


            <NextSeo
                title={getPost?.data?.page_data?.title}
                description={getPost?.data?.page_data?.description}
            />



            <InnerBannerBg srcSm={mobile?.full_path} img={desktop?.full_path} title={banner?.product_data?.title}
                           location={banner?.product_data?.location}/>
            {
                overview && <Overview title={overview?.data?.title}
                                      descriptionLeft={overview?.data?.subtitle}
                                      descriptionRight={overview?.data?.description}/>
            }
            {
                atAGlance && <AtGlance data={atAGlance} windowWidth={windowWidth} offset={offset}/>
            }
            {features && <FeatureSlider windowWidth={windowWidth} data={features}/>}
            {gallery && <Gallery  data={gallery}/>}
            {video?.images?.[0]?.short_title && <Video data={video}/>}
            <Location isBtn gallery={gallery} detail data={data2} windowWidth={windowWidth} sectionData={location} line/>
            <EnquiryForm project={getPost?.detail?.data?.product_data?.title}/>
        </>
    );
};

export async function getServerSideProps(context) {
    const { query } = context;
    const { slug } = query;

    // Fetch data from an API or perform any async operations based on the slug
    const res = await fetch(`https://cms.tropicalhomesltd.com/api/get-req-data/product-data?type=slug&image=yes&post=yes&value=${slug}`);
    const data = await res.json();

    // Pass fetched data as props to the component
    return {
        props: {
            data,
        },
    };
}

export default Projects;
