import { API_KEY, BASE_IMG_URL, SEARCH_URL, ID_URL } from './api/api-vars.js';
// import { renderPagination } from './pagination.js';
import { getMovies } from './api/fetch-movie';
import { localstorage } from './localstorage.js';

const addToWatchedButton = document.querySelector('.to-watched');
const bg = document.querySelector('.backdrop');
const libraryTextContainer = document.querySelector('.library-text');
const libraryGallery = document.querySelector('.library-gallery');
const libraryWatchedBtn = document.querySelector(
  'button[data-action="watched"]'
);

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
  const id = bg.id;

  if (!inLocalStorage(id)) {
    addToWatchedButton.textContent = 'Remove from watched';
    localstorage.setFilm('watched', id);
  } else {
    addToWatchedButton.textContent = 'Add to watched';
    localstorage.removeFilm('watched', id);
  }

  libraryGallery && onWatchedBtnClick();
  libraryWatchedBtn && libraryWatchedBtn.focus();
}

libraryWatchedBtn &&
  libraryWatchedBtn.addEventListener('click', onWatchedBtnClick);

let watchedMovieId;
let parseWatchedMovieId;

function onWatchedBtnClick() {
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

  moviesIDInWatched.map(movieID => {
    fetchById(movieID).then(res => {
      renderMovieCardsLibrary(res);
    });
  });
}

function fetchById(movieId) {
  const idURL = `${ID_URL}${movieId}?api_key=${API_KEY}&language=en-US`;
  return getMovies(idURL);
}

function renderMovieCardsLibrary(movie) {
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
