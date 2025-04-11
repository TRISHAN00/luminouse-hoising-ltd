import axios from "axios";

export async function getProjectDetailApi(id) {
    try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
        return response.data
    } catch (error) {
        console.error(error);
    }
}