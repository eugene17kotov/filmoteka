import { getMovies } from './api/fetch-movie';
import { API_KEY, BASE_IMG_URL, SEARCH_URL, ID_URL } from './api/api-vars.js';
// import { renderPagination } from './pagination.js';
import { localstorage } from './localstorage.js';

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

libraryQueueBtn && libraryQueueBtn.classList.add('library__item-btn--active');
libraryQueueBtn && onLibraryQueueBtnClick();

function inLocalStorage(value) {
  if (localStorage.getItem('queue') !== null) {
    if (!JSON.parse(localStorage.getItem('queue').includes(value))) {
      return false;
    }
    return true;
  }
  return true;
}

export function onBtnQueueClick() {
  const id = bg.id;

  if (localStorage.getItem('queue') === null) {
    localStorage.setItem('queue', '[]');
  }

  if (!inLocalStorage(id)) {
    queueBtn.textContent = 'Remove from queue';
    queueBtn.classList.add('is-active');
    localstorage.setFilm('queue', id);
  } else {
    queueBtn.textContent = 'Add to queue';
    queueBtn.classList.remove('is-active');
    localstorage.removeFilm('queue', id);
  }

  libraryGallery && onLibraryQueueBtnClick();
}

libraryQueueBtn &&
  libraryQueueBtn.addEventListener('click', onLibraryQueueBtnClick);

function onLibraryQueueBtnClick() {
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

  fetchQueue(queueMovieId);
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

function fetchQueue(queueMovieId) {
  const moviesIDInQueue = JSON.parse(queueMovieId);
//!add slice method to moviesIDInQueue for showing only 6 cards when function onLibraryQueueBtnClick is executed
  moviesIDInQueue.slice(0,6).map(movieID => {
    fetchById(movieID).then(res => {
      renderMovieCardsLibrary(res);
    });
  });
}

export function fetchById(movieId) {
  const idURL = `${ID_URL}${movieId}?api_key=${API_KEY}&language=en-US`;
  return getMovies(idURL);
}

export function renderMovieCardsLibrary(movie) {
  const movieGalleryMarkup = createLibraryMovieMarkup(movie);

  libraryGallery.insertAdjacentHTML('beforeend', movieGalleryMarkup);
}

function createLibraryMovieMarkup(movie) {
  const { title, genres, release_date, poster_path, vote_average, id } = movie;

  let year = '';
  if (typeof release_date !== 'undefined' && release_date.length > 4) {
    year = release_date.slice(0, 4);
  }

  const queueGenres = getQueueMovieGenresList(genres);

  if (poster_path === null) {
    return `<li>
            <a class="gallery__link" href="#">
              <img class="gallery__image" data-id="${id}" src="https://dummyimage.com/395x574/000/fff.jpg&text=no+poster" alt="${title} movie poster" loading="lazy">

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
  
  return `<li>
            <a class="gallery__link" href="#">
              <img class="gallery__image" data-id="${id}" src="${BASE_IMG_URL}${poster_path}" alt="${title} movie poster" loading="lazy">

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
