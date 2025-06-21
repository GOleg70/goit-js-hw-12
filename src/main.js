import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { getImagesByQuery } from './js/pixabay-api.js';
import {
    createGallery,
    clearGallery,
    showLoader,
    hideLoader,
    hideLoadMoreButton,
    showLoadMoreButton,
    lightbox,
    scrollPage,
} from './js/render-functions.js';

let currentPage = 1;
let currentQuery = "";
let totalPages = 0; 
const perPage = 15;

const btnMore = document.querySelector(".formBtnMore");
btnMore.addEventListener("click", handleClickBtnMore);

async function handleClickBtnMore() {
    currentPage++;
    showLoader();
    try {
         
        const dataMore = await getImagesByQuery(currentQuery, currentPage);
        createGallery(dataMore.hits);
        lightbox.refresh();
        scrollPage();
    
        if (currentPage >= totalPages) {
            hideLoadMoreButton();

            iziToast.info
                ({
                    message: "We're sorry, but you've reached the end of search results.",
                    position: "topRight"
                });
        }
    }
    catch (error) {
            iziToast.info({
            message: "Sorry, there are no images matching your search query. Please try again!",
            position: "topRight"
            });
        
        return;
    }
    
    finally {
        hideLoader();
       }
}


const form = document.querySelector(".form");
form.addEventListener("submit", handleClick);


async function handleClick(event) {
    event.preventDefault();
    currentQuery = event.target.elements['search-text'].value.trim();
    currentPage = 1;
    clearGallery();
    hideLoadMoreButton();
    
    if (currentQuery === "") {
        iziToast.info({
            message: "Sorry, there are no images matching your search query. Please try again!",
            position: "topRight"
        });
        return;
    }
    showLoader();
    try {
        const data = await getImagesByQuery(currentQuery, currentPage);
        const images = data.hits;
        totalPages = Math.ceil(data.totalHits / perPage);
            
           

        if (images.length === 0) {
            iziToast.info({
                message: "Sorry, there are no images matching your search query. Please try again!",
                position: "topRight"
            });
            return;
        }

        createGallery(images);
        iziToast.success({
            message: `We found ${data.totalHits} images.`,
            position: "topRight"
        });
        if (currentPage < totalPages) {
            showLoadMoreButton();
        } else {
            hideLoadMoreButton();
            iziToast.info({
                message: "We're sorry, but you've reached the end of search results.",
                position: "topRight"
            });
        }
    }
        catch (error) {
            console.error("Помилка отримання зображень:", error);
            iziToast.error({
                message: "Sorry, there are no images matching your search query. Please try again!",
                position: "topRight"
            });
        }
        finally {
            hideLoader();
            event.target.reset();
        }
    
    

    } 

    



