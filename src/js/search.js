import { API_KEY, SEARCH_URL } from './api/api-vars';
import { getMovies } from './api/fetch-movie.js';
import { renderMovieCards } from './render-movie-cards';

const refs = {
    form: document.querySelector('.header__form'),
    gallery: document.querySelector('.gallery'),
}
if (refs.form) {
    refs.form.addEventListener('submit', onFormSubmit);
}



export function searchMovies(movie, pageNumber) {
    return getMovies(
        `${SEARCH_URL}?api_key=${API_KEY}&query=${movie}&page=${pageNumber}`
    ); 
}

let searchText = '';

export async function onFormSubmit(e) {
    e.preventDefault();
    
    clearGallery();
    
    searchText = e.currentTarget.query.value.trim();
    
    const muvie = await searchMovies(searchText);

    e.target.reset();
    
    renderMovieCards(muvie.results);
    
}

function clearGallery() {
    refs.gallery.innerHTML = '';
}









