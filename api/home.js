import axios from "axios";

// home page data
export async function getHomeApi() {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        return response.data
    } catch (error) {
        console.error(error);
    }
}

// features blog data
export async function GetBlogApi() {
    try {
        const response = await axios.get('https://bestinbd.com/projects/web/dmblog/wp-json/getFeaturedBlogList/all');
        return response.data
    } catch (error) {
        console.error(error);
    }
}
