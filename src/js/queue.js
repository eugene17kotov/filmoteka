import { getMovies } from './api/fetch-movie';
import { API_KEY, BASE_IMG_URL, SEARCH_URL, ID_URL } from './api/api-vars.js';
// import { renderPagination } from './pagination.js';

const refsModal = {
  queueBtn: document.querySelector('.to-queue'),
  library: document.querySelector('.library-gallery'),
  bg: document.querySelector('.backdrop'),
};

const { queueBtn, library, bg } = refsModal;

const localstorage = {
  loadData(key) {
    const localStorageData = localStorage.getItem(key);
    return JSON.parse(localStorageData);
  },

  saveData(key, value) {
    const dataToSave = JSON.stringify(value);
    localStorage.setItem(key, dataToSave);
  },

  setFilm(key, value) {
    const currentCollection = this.getMovies(key);
    currentCollection.push(value);
    this.saveData(key, currentCollection);
  },

  removeFilm(key, value) {
    const films = this.getMovies(key);
    if (films.includes(value)) {
      films.splice(films.indexOf(value), 1);
      this.saveData(key, films);
    } else return;
  },

  getMovies(key) {
    const movies = this.loadData(key);
    if (!movies) {
      this.saveData(key, []);
      return [];
    } else {
      return movies;
    }
  },
};

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

  if (!inLocalStorage(id)) {
    queueBtn.textContent = 'Remove from queue';
    localstorage.setFilm('queue', id);
  } else {
    queueBtn.textContent = 'Add to queue';
    localstorage.removeFilm('queue', id);
  }
}

// const libraryTextContainer = document.querySelector('.if-have-no-movies');
const libraryTextContainer = document.querySelector('.library-text');
const libraryGallery = document.querySelector('.library-gallery');
const libraryQueueBtn = document.querySelector('button[data-action="queue"]');

libraryQueueBtn &&
  libraryQueueBtn.addEventListener('click', onLibraryQueueBtnClick);

const queueMovieId = localStorage.getItem('queue');
const parseQueueMovieId = JSON.parse(queueMovieId);

function onLibraryQueueBtnClick() {
  libraryGallery.innerHTML = '';

  fetchQueue(queueMovieId);
}

function fetchQueue(queueMovieId) {
  const moviesIDInQueue = JSON.parse(queueMovieId);

  moviesIDInQueue.map(movieID => {
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
