import { getAuth } from 'firebase/auth';
import { createNote } from './firebase/firebaseAuth.js';
import { BASE_IMG_URL } from './api/api-vars.js';
import { localstorage } from './localstorage.js';
import { movieObject } from './movie-modal';
import {
  startPaginationObserver,
  stopPaginationObserver,
} from './infinity-scroll';
import { startLoader, stopLoader } from './loader';

const queueBtn = document.querySelector('.to-queue');
const libraryTextContainer = document.querySelector('.library-text');
export const libraryGallery = document.querySelector('.library-gallery');
const libraryQueueBtn = document.querySelector('button[data-action="queue"]');
const libraryWatchedBtn = document.querySelector(
  'button[data-action="watched"]'
);
let queueMovieId = localStorage.getItem('queue');
let parseQueueMovieId = JSON.parse(queueMovieId);

// Library page enter

libraryQueueBtn &&
  libraryQueueBtn.addEventListener('click', onLibraryQueueBtnClick);
libraryQueueBtn && onLibraryQueueBtnClick();
libraryQueueBtn && libraryQueueBtn.classList.add('library__item-btn--active');

// Add to Queue button logic

export async function onBtnQueueClick() {
  if (localStorage.getItem('queue') === null) {
    localStorage.setItem('queue', '[]');
  }

  if (!inLocalStorage(movieObject, 'queue')) {
    queueBtn.textContent = 'Remove from queue';
    queueBtn.classList.add('is-active');
    localstorage.setFilm('queue', movieObject);
    checkCurrentPageAndRewrite(libraryQueueBtn, 1);
  } else {
    queueBtn.textContent = 'Add to queue';
    queueBtn.classList.remove('is-active');
    localstorage.removeFilm('queue', movieObject);
    checkCurrentPageAndRewrite(libraryQueueBtn, -1);
  }

  // auth
  const currentUser = getAuth().currentUser;

  if (currentUser !== null) {
    const queue = localStorage.getItem('queue') || [];
    const watched = localStorage.getItem('watched') || [];
    createNote(currentUser, queue, watched);
  }
}

// Library Queue button logic

libraryQueueBtn &&
  libraryQueueBtn.addEventListener('click', onLibraryQueueBtnClick);

async function onLibraryQueueBtnClick() {
  stopPaginationObserver();

  libraryWatchedBtn.classList.remove('library__item-btn--active');
  libraryQueueBtn.classList.add('library__item-btn--active');

  queueMovieId = localStorage.getItem('queue');
  parseQueueMovieId = JSON.parse(queueMovieId);

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

  await renderMovieCardsLibrary(parseQueueMovieId.slice(0, 9));

  startPaginationObserver();
  setTimeout(() => {
    stopLoader();
  }, 300);
}

export function inLocalStorage(value, key) {
  const lsWhenBtnClick = localStorage.getItem(key);
  const filmsIdArrayInLs = JSON.parse(lsWhenBtnClick).map(film => film.id);

  if (lsWhenBtnClick !== null) {
    if (!filmsIdArrayInLs.includes(value.id)) {
      return false;
    }
    return true;
  }
  return true;
}

export function clearGallery() {
  libraryGallery.innerHTML = '';
}

export function getPlugVisible() {
  libraryGallery.innerHTML = '';

  libraryTextContainer.classList.remove('visually-hidden');
}

export function getPlugHidden() {
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
  let roundVote_average = vote_average.toFixed(2);

  const poster_src =
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
                <p class="info-detail__item">${year} <span class="points">${roundVote_average}</span></p>
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

export function checkCurrentPageAndRewrite(button, amount) {
  if (
    libraryGallery &&
    button.classList.contains('library__item-btn--active')
  ) {
    rewriteGalleryAfterChange(amount);
  }
}

function rewriteGalleryAfterChange(changeAmount) {
  const actualArray = libraryGallery.querySelectorAll('li');
  const activeButton = document.querySelector('.library__item-btn--active');

  const parseWatchedMovie = JSON.parse(
    localStorage.getItem(activeButton.dataset['action'])
  );

  clearGallery();

  if (parseWatchedMovie.length === 0) {
    getPlugVisible();
    return;
  } else if (!libraryTextContainer.classList.contains('visually-hidden')) {
    getPlugHidden();
  }

  if (actualArray.length > 9) {
    renderMovieCardsLibrary(
      parseWatchedMovie.slice(0, actualArray.length + changeAmount)
    );
    return;
  }

  renderMovieCardsLibrary(parseWatchedMovie.slice(0, 9));
}
