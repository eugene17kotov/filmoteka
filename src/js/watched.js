import { API_KEY, SEARCH_URL } from './api/api-vars';
import { getMovies } from './api/fetch-movie.js';
import { renderMovieCards } from './render-movie-cards';


const refs = {
    addToWatchedButton: document.querySelector('.to-watched'),
    watchedButton: document.querySelector('button[data-action="watched"]'),
    film: document.querySelector('.modal h2'),
}


let watchedMovies = [];

refs.addToWatchedButton.addEventListener('click', onAddToWatchedBtnClick);



function onAddToWatchedBtnClick (){
   localStorage.setItem('film', refs.film.textContent);
    refs.addToWatchedButton.innerHTML = 'Remove From Watched';
    refs.addToWatchedButton.classList.add('is-addedToWatchedFilms');
    watchedMovies.push(localStorage.getItem('film'));
   const watchedFilm = document.querySelector('.is-addedToWatchedFilms');
    watchedFilm.addEventListener('click', onRemoveFromWatchedBtnClick);

}


function onRemoveFromWatchedBtnClick() {
    const watchedFilm = document.querySelector('.is-addedToWatchedFilms');
    watchedFilm.classList.remove('is-addedToWatchedFilms');
    refs.addToWatchedButton.innerHTML = 'Add to Watched';
    localStorage.removeItem('film');
}


/////LIBRARY - WATCHED

refs.watchedButton.addEventListener('click', onWatchedBtnClick);

async function onWatchedBtnClick (){
    if (localStorage.getItem('key') !== null) {
   const  searchText = watchedMovies;
        const movie = await searchMovies(searchText);  
   console.log(movie)     
   renderMovieCards(movie.results);     
}




}
onWatchedBtnClick();  



function searchMovies(movie) {
    return getMovies(
        `${SEARCH_URL}?api_key=${API_KEY}&query=${movie}`
    );
}