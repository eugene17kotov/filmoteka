import { localstorage } from './localstorage.js';
import { muvieObject } from './movie-modal';
import {
  startPaginationObserver,
  stopPaginationObserver,
} from './infinity-scroll';
import {
  renderMovieCardsLibrary,
  checkCurrentPageAndRewrite,
  getPlugHidden,
  getPlugVisible,
  clearGallery,
  inLocalStorage,
} from './queue';
import { startLoader, stopLoader } from './loader';

const addToWatchedButton = document.querySelector('.to-watched');
const bg = document.querySelector('.backdrop');
const libraryTextContainer = document.querySelector('.library-text');
const libraryGallery = document.querySelector('.library-gallery');
const libraryWatchedBtn = document.querySelector(
  'button[data-action="watched"]'
);
const libraryQueueBtn = document.querySelector('button[data-action="queue"]');
let watchedMovieId = localStorage.getItem('watched');
let parseWatchedMovieId = JSON.parse(watchedMovieId);

// Add to Watched button logic

export function onAddToWatchedBtnClick() {
  if (localStorage.getItem('watched') === null) {
    localStorage.setItem('watched', '[]');
  }

  if (!inLocalStorage(muvieObject, 'watched')) {
    addToWatchedButton.textContent = 'Remove from watched';
    localstorage.setFilm('watched', muvieObject);
    addToWatchedButton.classList.add('is-active');
    checkCurrentPageAndRewrite(libraryWatchedBtn, 1);
  } else {
    addToWatchedButton.textContent = 'Add to watched';
    localstorage.removeFilm('watched', muvieObject);
    addToWatchedButton.classList.remove('is-active');
    checkCurrentPageAndRewrite(libraryWatchedBtn, -1);
  }
}

// Library Watched button logic

libraryWatchedBtn &&
  libraryWatchedBtn.addEventListener('click', onWatchedBtnClick);

async function onWatchedBtnClick() {
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

  startLoader();

  await renderMovieCardsLibrary(parseWatchedMovieId.slice(0, 9));

  startPaginationObserver();
  setTimeout(() => {
    stopLoader();
  }, 300);
}
