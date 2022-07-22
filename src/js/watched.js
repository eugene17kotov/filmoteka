import { getAuth } from 'firebase/auth';
import { createNote } from './firebase/firebaseAuth.js';

import { API_KEY, BASE_IMG_URL, SEARCH_URL, ID_URL } from './api/api-vars.js';
import { getMovies } from './api/fetch-movie';
import { localstorage } from './localstorage.js';
import { muvieObject } from './movie-modal';
import { fetchByIds } from './queue.js';
import {
  startPaginationObserver,
  stopPaginationObserver,
} from './infinity-scroll';
import { createLibraryMovieMarkup } from './queue';

const addToWatchedButton = document.querySelector('.to-watched');
const bg = document.querySelector('.backdrop');
const libraryTextContainer = document.querySelector('.library-text');
const libraryGallery = document.querySelector('.library-gallery');
const libraryWatchedBtn = document.querySelector(
  'button[data-action="watched"]'
);
const libraryQueueBtn = document.querySelector('button[data-action="queue"]');

function inLocalStorage(value) {
  if (localStorage.getItem('watched') !== null) {
    if (!JSON.parse(localStorage.getItem('watched').includes(value))) {
      return false;
    }
    return true;
  }
  return true;
}

export function onAddToWatchedBtnClick() {
  if (localStorage.getItem('watched') === null) {
    localStorage.setItem('watched', '[]');
  }

  if (!inLocalStorage(muvieObject.id)) {
    addToWatchedButton.textContent = 'Remove from watched';
    localstorage.setFilm('watched', muvieObject);
    addToWatchedButton.classList.add('is-active');
  } else {
    addToWatchedButton.textContent = 'Add to watched';
    localstorage.removeFilm('watched', muvieObject);
    addToWatchedButton.classList.remove('is-active');
  }
  // auth
  const currentUser = getAuth().currentUser;
  if (currentUser !== null) {
    const queue = localStorage.getItem('queue') || [];
    const watched = localStorage.getItem('watched') || [];
    createNote(currentUser, queue, watched);
  }

  //!VIktor: add check if button is active to prevent changing library tabs
  if (
    libraryGallery &&
    libraryWatchedBtn.classList.contains('library__item-btn--active')
  ) {
    onWatchedBtnClick();
  }
}

libraryWatchedBtn &&
  libraryWatchedBtn.addEventListener('click', onWatchedBtnClick);

let watchedMovieId;
let parseWatchedMovieId;

function onWatchedBtnClick() {
  stopPaginationObserver();
  libraryQueueBtn.classList.remove('library__item-btn--active');
  libraryWatchedBtn.classList.add('library__item-btn--active');

  watchedMovieId = localStorage.getItem('watched');
  parseWatchedMovieId = JSON.parse(watchedMovieId);

  clearGallery();

  if (watchedMovieId === null) {
    getPlugVisible();
    return;
  } else if (parseWatchedMovieId.length === 0) {
    getPlugVisible();
    return;
  } else if (!libraryTextContainer.classList.contains('visually-hidden')) {
    getPlugHidden();
  }

  fetchWatched(watchedMovieId);
}

function clearGallery() {
  libraryGallery.innerHTML = '';
}

function getPlugVisible() {
  libraryGallery.innerHTML = '';

  libraryTextContainer.classList.remove('visually-hidden');
}

function getPlugHidden() {
  libraryTextContainer.classList.add('visually-hidden');
}

function fetchWatched(watchedMovieId) {
  const moviesIDInWatched = JSON.parse(watchedMovieId);

  const TEMPVAR = moviesIDInWatched.map(film => film.id);

  //!Viktor: add slice method to moviesIDInWatched for showing only 6 cards when function  onWatchedBtnClick is executed and rewrite fetchById func to fetchByIds
  // moviesIDInWatched.slice(0, 6).map(movieID => {
  //   fetchById(movieID).then(res => {
  //     renderMovieCardsLibrary(res);
  //   });
  // });
  fetchByIds(TEMPVAR.slice(0, 6)).then(movies => {
    movies.forEach(movie => renderMovieCardsLibrary(movie));
    startPaginationObserver();
  });
}

// function fetchById(movieId) {
//   const idURL = `${ID_URL}${movieId}?api_key=${API_KEY}&language=en-US`;
//   return getMovies(idURL);
// }

function renderMovieCardsLibrary(movie) {
  const movieGalleryMarkup = createLibraryMovieMarkup(movie);

  libraryGallery.insertAdjacentHTML('beforeend', movieGalleryMarkup);
}
