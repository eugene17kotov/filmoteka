import axios from 'axios';

import { API_KEY, BASE_IMG_URL, SEARCH_URL, ID_URL } from './api/api-vars.js';
import { localstorage } from './localstorage.js';
import { muvieObject } from './movie-modal';
import {
  startPaginationObserver,
  stopPaginationObserver,
} from './infinity-scroll';
import { loader, startLoader, stopLoader } from './loader';

const queueBtn = document.querySelector('.to-queue');
const bg = document.querySelector('.backdrop');
const libraryTextContainer = document.querySelector('.library-text');
export const libraryGallery = document.querySelector('.library-gallery');
const libraryQueueBtn = document.querySelector('button[data-action="queue"]');
const libraryWatchedBtn = document.querySelector(
  'button[data-action="watched"]'
);
let queueMovieId = localStorage.getItem('queue');
let parseQueueMovieId = JSON.parse(queueMovieId);

libraryQueueBtn &&
  libraryQueueBtn.addEventListener('click', onLibraryQueueBtnClick);
libraryQueueBtn && onLibraryQueueBtnClick();
libraryQueueBtn && libraryQueueBtn.classList.add('library__item-btn--active');

// Add to Queue button logic

function inLocalStorage(value) {
  if (localStorage.getItem('queue') !== null) {
    if (!JSON.parse(localStorage.getItem('queue').includes(value))) {
      return false;
    }
    return true;
  }
  return true;
}

export async function onBtnQueueClick() {
  if (localStorage.getItem('queue') === null) {
    localStorage.setItem('queue', '[]');
  }

  if (!inLocalStorage(muvieObject.id)) {
    queueBtn.textContent = 'Remove from queue';
    queueBtn.classList.add('is-active');
    localstorage.setFilm('queue', muvieObject);
  } else {
    queueBtn.textContent = 'Add to queue';
    queueBtn.classList.remove('is-active');
    localstorage.removeFilm('queue', muvieObject);
  }
  //!VIktor: add check if button is active to prevent changing library tabs
  if (
    libraryGallery &&
    libraryQueueBtn.classList.contains('library__item-btn--active')
  ) {
    onLibraryQueueBtnClick();
  }
}

libraryQueueBtn &&
  libraryQueueBtn.addEventListener('click', onLibraryQueueBtnClick);

// Library Queue button logic

async function onLibraryQueueBtnClick() {
  stopPaginationObserver();
  libraryWatchedBtn.classList.remove('library__item-btn--active');
  libraryQueueBtn.classList.add('library__item-btn--active');
  queueMovieId = localStorage.getItem('queue');

  parseQueueMovieId = JSON.parse(queueMovieId).slice(0, 9);

  clearGallery();

  if (queueMovieId === null) {
    getPlugVisible();
    return;
  } else if (parseQueueMovieId.length === 0) {
    getPlugVisible();
    return;
  } else if (!libraryTextContainer.classList.contains('visually-hidden')) {
    getPlugHidden();
  }

  startLoader();

  await renderMovieCardsLibrary(parseQueueMovieId);

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

export function renderMovieCardsLibrary(movies) {
  const movieGalleryMarkup = movies
    .map(movie => createLibraryMovieMarkup(movie))
    .join('');

  libraryGallery.insertAdjacentHTML('beforeend', movieGalleryMarkup);
}

export function createLibraryMovieMarkup(movie) {
  const { title, genres, release_date, poster_path, vote_average, id } = movie;

  let year = '';
  if (typeof release_date !== 'undefined' && release_date.length > 4) {
    year = release_date.slice(0, 4);
  }

  const queueGenres = getQueueMovieGenresList(genres);

  poster_src =
    poster_path === null
      ? 'https://dummyimage.com/395x574/000/fff.jpg&text=no+poster'
      : `${BASE_IMG_URL}${poster_path}`;

  return `<li>
            <a class="gallery__link" href="#">
              <img class="gallery__image" data-id="${id}" src="${poster_src}" alt="${title} movie poster" loading="lazy">

            <div class="info">
              <p class="info__item">${title}</p>
              <div class="info-detail">
                <p class="info-detail__item">${queueGenres}</p>
                <p class="info-detail__item">${year} <span class="points">${vote_average}</span></p>
              </div>
            </div>
            </a>
          </li>`;
}

function getQueueMovieGenresList(genres) {
  let genresNames = genres.map(genre => genre.name);
  if (genresNames.length > 3) {
    genresNames = genresNames.slice(0, 2);
    genresNames.push('Other');
  }
  return genresNames.join(', ');
}
