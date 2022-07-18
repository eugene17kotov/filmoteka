// import fetchMovie from './api/fetch-movie';
import { API_KEY, BASE_IMG_URL, SEARCH_URL, ID_URL } from './api/api-vars.js';
// import { renderPagination } from './pagination.js';
import { getMovies } from './api/fetch-movie';
// import { createMovieMarkup } from './create-movie-markup';
//////////////////////////////////////////////////////////
const refs = {
  addToWatchedButton: document.querySelector('.to-watched'),
  //   library: document.querySelector('.library-gallery'),
  bg: document.querySelector('.backdrop'),
  //   modal: document.querySelector('.js-modal'),
};

const { addToWatchedButton, library, bg, modal } = refs;
///////////////////ADD TO WATCHED/////////////////////////////////
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
}

const libraryTextContainer = document.querySelector('.if-have-no-movies');
const libraryGallery = document.querySelector('.library-gallery');
const libraryWatchedBtn = document.querySelector(
  'button[data-action="watched"]'
);
console.log(libraryWatchedBtn);

libraryWatchedBtn &&
libraryWatchedBtn.addEventListener('click',onWatchedBtnClick);

const watchedMovieId = localStorage.getItem('watched');

export function onWatchedBtnClick() {
  if (watchedMovieId) {
    const noMoviesMarkup = `<p class="library-text">You have not added any movies</p>`;
    libraryTextContainer.innerHTML = noMoviesMarkup;
    return;
  }

  libraryGallery.innerHTML = '';

  fetchWatched(watchedMovieId);
}

export function fetchWatched(watchedMovieId) {
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
