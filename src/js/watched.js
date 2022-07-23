import { API_KEY, BASE_IMG_URL, SEARCH_URL, ID_URL } from './api/api-vars.js';
import { getMovies } from './api/fetch-movie';
import { localstorage } from './localstorage.js';
import { muvieObject } from './movie-modal';
import {
  startPaginationObserver,
  stopPaginationObserver,
} from './infinity-scroll';
import { renderMovieCardsLibrary } from './queue';
import { loader, startLoader, stopLoader } from './loader';

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

  if (
    libraryGallery &&
    libraryWatchedBtn.classList.contains('library__item-btn--active')
  ) {
    onWatchedBtnClick();
  }
}

libraryWatchedBtn &&
  libraryWatchedBtn.addEventListener('click', onWatchedBtnClick);

let watchedMovieId = localStorage.getItem('watched');
let parseWatchedMovieId = JSON.parse(watchedMovieId);

async function onWatchedBtnClick() {
  stopPaginationObserver();
  libraryQueueBtn.classList.remove('library__item-btn--active');
  libraryWatchedBtn.classList.add('library__item-btn--active');

  watchedMovieId = localStorage.getItem('watched');
  parseWatchedMovieId = JSON.parse(watchedMovieId).slice(0, 9);

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

  startLoader();

  await renderMovieCardsLibrary(parseWatchedMovieId);

  startPaginationObserver();
  setTimeout(() => {
    stopLoader();
  }, 300);
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
