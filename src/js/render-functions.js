import SimpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css";

const itemUl = document.querySelector(".gallery");
const loaderWrapper = document.querySelector(".loader-wrapper");
const btnMore = document.querySelector(".formBtnMore");

export const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
});

export function createGallery(images) {
    const galleryMarkup = images
        .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
            <li class="gallery-item">
                <a class="gallery-link" href="${largeImageURL}">
                    <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
                </a>
                <div class="info">
                    <p class="info-item"><b>Likes:</b> ${likes}</p>
                    <p class="info-item"><b>Views:</b> ${views}</p>
                    <p class="info-item"><b>Comments:</b> ${comments}</p>
                    <p class="info-item"><b>Downloads:</b> ${downloads}</p>
                </div>
            </li>
        `)
        .join("");

    itemUl.insertAdjacentHTML('beforeend', galleryMarkup);

    lightbox.refresh();
}

export function clearGallery() {
    itemUl.innerHTML = "";
}

export function showLoader() {
    loaderWrapper.classList.remove("is-hidden");
}

export function hideLoader() {
    loaderWrapper.classList.add("is-hidden");
}

export function showLoadMoreButton() {                             
    btnMore.classList.remove("is-hidden-btn");
}

export function hideLoadMoreButton() {                               
    btnMore.classList.add("is-hidden-btn");
}


export function scrollPage() {
    const { height: cardHeight } = document.querySelector('.gallery').firstElementChild.getBoundingClientRect();
    window.scrollBy({
        top: cardHeight * 2, 
        behavior: 'smooth'
    });
}