import axios from "axios";

export async function getProjectDetailApi(slug) {
    try {
        const response = await axios.get(`https://luminoushousingltd.com/cms/api/get-req-data/product-data?type=slug&value=${slug}&image=yes&post=yes&file=yes`);
        return response.data
    } catch (error) {
        console.error(error);
    }
}