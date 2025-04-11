import axios from "axios";

// contact post
export function postContact(formData) {
    try {
        const response = axios.post('https://jsonplaceholder.typicode.com/posts', formData);
        return response.data
    } catch (error) {
        console.error(error);
    }
}


