import axios from "axios";

const MY_API_KEY = "50762825-7fe49127b3d94f6c93c99dfe1";

export function getImagesByQuery(query,currentPage=1) {
    const imageType = "photo";
    const orientation = "horizontal";
    const safesearch = true;
    const perPage = 15;
    


    return axios.get('https://pixabay.com/api/', {
        params: {
            key: MY_API_KEY,
            q: query,
            image_type: imageType,
            orientation: orientation,
            safesearch: safesearch,
            per_page: perPage,
            page: currentPage,
        }
    })
    .then(response => {
       
        return response.data;
    });
    }