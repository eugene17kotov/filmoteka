import { API_KEY, SEARCH_URL } from './api/api-vars';
import { getMovies } from './api/fetch-movie.js';
import { renderPagination } from './pagination'; //Viktor;
import { renderMovieCards } from './render-movie-cards';
import { filter, toTrendingBtn } from './filter';
import debounce from 'lodash.debounce';

const refs = {
  form: document.querySelector('.header__form'),
  input: document.querySelector('.header__form-input'),
  gallery: document.querySelector('.gallery'),
  loader: document.querySelector('.backdrop-loader'),
};
const DEBOUNCE_DELAY = 500;

refs.form && refs.form.addEventListener('submit', onFormSubmit);
refs.input &&
  refs.input.addEventListener('input', debounce(onInputText, DEBOUNCE_DELAY));

async function onInputText(e) {
  searchText = e.target.value.trim();

  if (searchText === '') {
    return;
  }

  filter.classList.add('is-hidden');
  toTrendingBtn.classList.remove('is-hidden');

  refs.loader.classList.remove('backdrop-loader--is-hidden');

  clearGallery();

  const muvie = await searchMovies(searchText);

  refs.loader.classList.add('backdrop-loader--is-hidden');

  renderMovieCards(muvie.results);
  renderPagination(muvie.page, muvie.total_pages);
}

export function searchMovies(searchText) {
  const searchUrl = `${SEARCH_URL}&query=${searchText}`;
  localStorage.setItem('LAST_REQUESTED_URL', searchUrl);
  return getMovies(searchUrl);
}

let searchText = '';

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
