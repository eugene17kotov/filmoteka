import { API_KEY, SEARCH_URL, BASE_URL } from './api/api-vars';
import { getMovies } from './api/fetch-movie.js';
import { renderPagination } from './pagination'; //Viktor;
import { renderMovieCards } from './render-movie-cards';
import { filter, toTrendingBtn } from './filter';
import { debounce } from './debounce';
import { paginationWrapRef } from './pagination';
import { renderMovies } from './filter';

const refs = {
  form: document.querySelector('.header__form'),
  input: document.querySelector('.header__form-input'),
  gallery: document.querySelector('.gallery'),
  loader: document.querySelector('.backdrop-loader'),
};

export function searchMovies(searchText) {
  const searchUrl = `${SEARCH_URL}&query=${searchText}`;
  localStorage.setItem('LAST_REQUESTED_URL', searchUrl);
  return getMovies(searchUrl);
}

let searchText = '';

// Search by submit

export async function onFormSubmit(e) {
  e.preventDefault();

  searchText = e.currentTarget.query.value.trim();

  if (searchText === '') {
    return;
  }

  filter.classList.add('is-hidden');
  toTrendingBtn.classList.remove('is-hidden');

  refs.loader.classList.remove('backdrop-loader--is-hidden');

  clearGallery();

  const muvie = await searchMovies(searchText);

  refs.loader.classList.add('backdrop-loader--is-hidden');

  e.target.reset();

  renderMovieCards(muvie.results);
  renderPagination(muvie.page, muvie.total_pages);
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}

// Search by input

const DEBOUNCE_DELAY = 700;

refs.form && refs.form.addEventListener('submit', onFormSubmit);
refs.input &&
  refs.input.addEventListener('input', debounce(onInputText, DEBOUNCE_DELAY));

async function onInputText(e) {
  searchText = e.target.value.trim();

  if (searchText === '') {
    renderMovies(
      `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&page=${
        document.querySelector('.pagination-button--current').dataset.page
      }`
    );
    filter.classList.remove('is-hidden');
    toTrendingBtn.classList.add('is-hidden');
    paginationWrapRef.classList.remove('visually-hidden');
    return;
  }

  filter.classList.add('is-hidden');
  toTrendingBtn.classList.remove('is-hidden');

  refs.loader.classList.remove('backdrop-loader--is-hidden');

  clearGallery();

  const muvie = await searchMovies(searchText);

  if (!muvie.total_results) {
    console.log('YEEEEEH');
    paginationWrapRef.classList.add('visually-hidden');
  }

  refs.loader.classList.add('backdrop-loader--is-hidden');

  renderMovieCards(muvie.results);
  renderPagination(muvie.page, muvie.total_pages);
}
