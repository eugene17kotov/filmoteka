import { API_KEY, SEARCH_URL } from './api/api-vars';
import { getMovies } from './api/fetch-movie.js';
import { renderPagination } from './pagination'; //Viktor;
import { renderMovieCards } from './render-movie-cards';

const refs = {
    form: document.querySelector('.header__form'),
    gallery: document.querySelector('.gallery'),
    loader: document.querySelector(".backdrop-loader"),
}
if (refs.form) {
    refs.form.addEventListener('submit', onFormSubmit);
}



// export function searchMovies(movie, pageNumber) {
//     return getMovies(
//         `${SEARCH_URL}?api_key=${API_KEY}&query=${movie}&page=${pageNumber}`
//     ); 
// }

//Viktor rewrited function: save searchUrl to localStorage for using in pagination;
export function searchMovies(searchText) {
    const searchUrl = `${SEARCH_URL}&query=${searchText}`;
    localStorage.setItem('LAST_REQUESTED_URL', searchUrl)
    return getMovies(searchUrl); 
}

let searchText = '';

export async function onFormSubmit(e) {
    e.preventDefault();

    refs.loader.classList.remove('backdrop-loader--is-hidden');
    
    clearGallery();
    
    searchText = e.currentTarget.query.value.trim();
    
    const muvie = await searchMovies(searchText);

    refs.loader.classList.add('backdrop-loader--is-hidden');

    e.target.reset();

    renderMovieCards(muvie.results);
    renderPagination(muvie.page, muvie.total_pages);  //Viktor: renderPagination function added 
}

function clearGallery() {
    refs.gallery.innerHTML = '';
}







