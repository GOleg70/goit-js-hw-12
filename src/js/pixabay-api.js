import axios from "axios";

const MY_API_KEY = "50762825-7fe49127b3d94f6c93c99dfe1";

export async function getImagesByQuery(query, currentPage = 1) {
    const imageType = "photo";
    const orientation = "horizontal";
    const safesearch = true;
    const perPage = 15;

    const response = await axios.get('https://pixabay.com/api/', {
        params: {
            key: MY_API_KEY,
            q: query,
            image_type: imageType,
            orientation: orientation,
            ssafesearch: safesearch,
            per_page: perPage,
            page: currentPage,
        },
    });
    return response.data;
}
