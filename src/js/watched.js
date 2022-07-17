import { API_KEY, SEARCH_URL } from './api/api-vars';
import { getMovies } from './api/fetch-movie.js';
import { createMovieMarkup } from './create-movie-markup';


const refs = {
    addToWatchedButton: document.querySelector('.to-watched'),
    watchedButton: document.querySelector('button[data-action="watched"]'),
    film: document.querySelector('.modal h2'),
}




refs.addToWatchedButton.addEventListener('click', onAddToWatchedBtnClick);



function onAddToWatchedBtnClick() {
   localStorage.setItem('watched', refs.film.textContent);
    refs.addToWatchedButton.textContent = 'Remove From Watched';
    refs.addToWatchedButton.classList.add('is-addedToWatchedFilms');
   const watchedFilm = document.querySelector('.is-addedToWatchedFilms');
    watchedFilm.addEventListener('click', onRemoveFromWatchedBtnClick);

}


function onRemoveFromWatchedBtnClick() {
  
    refs.addToWatchedButton.classList.remove('is-addedToWatchedFilms');
    refs.addToWatchedButton.textContent = 'Add to Watched';
    localStorage.removeItem('watched');
}


function getStorage() {
    let watched = localStorage.getItem('watched');
    if (watched === null) {
      return  watched = [];
    } else {
       return watched = JSON.parse(watched);
    }
}

/////LIBRARY - WATCHED

// refs.watchedButton.addEventListener('click', onWatchedBtnClick);

// async function onWatchedBtnClick (){
//     if (localStorage.getItem('key') !== null) {
//    const  searchText = watchedMovies;
//         const movie = await searchMovies(searchText);  
//    console.log(movie)     
//    renderMovieCards(movie.results);     
// }




// }




// function searchMovies(movie) {
//     return getMovies(
//         `${SEARCH_URL}?api_key=${API_KEY}&query=${movie}`
//     );
// }

// function renderMovieCards(movies) {
//   const movieGalleryMarkup = movies
//     .map(movie => createMovieMarkup(movie))
//     .join('');

//   document
//     .querySelector('.library-gallery')
//     .insertAdjacentHTML('beforeend', movieGalleryMarkup);
// }
