import { API_KEY, SEARCH_URL, BASE_URL } from './api/api-vars';
import { getMovies } from './api/fetch-movie.js';
import { renderPagination, paginationWrapRef } from './pagination';
import { renderMovieCards } from './render-movie-cards';
import { filter, toTrendingBtn, toTrendingBtnClick } from './filter';
import { debounce } from './debounce';
import { startLoader, stopLoader } from './loader';
import { hideSlider, showSlider } from './slider';

const refs = {
  form: document.querySelector('.header__form'),
  input: document.querySelector('.header__form-input'),
  gallery: document.querySelector('.gallery'),
  loader: document.querySelector('.backdrop-loader'),
  failSearchText: document.querySelector('.not-succesful-search-text'),
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

  paginationWrapRef.classList.add('visually-hidden');

  setTimeout(() => { e.target.reset(); }, 700);

  filter.classList.add('is-hidden');
  toTrendingBtn.classList.remove('is-hidden');

  hideSlider();

  clearGallery();

  startLoader();

  const movie = await searchMovies(searchText);

  if (!movie.total_results) {
    refs.failSearchText.classList.remove('visually-hidden');
    stopLoader();
    return;
  }

  renderMovieCards(movie.results);
  renderPagination(movie.page, movie.total_pages);
  paginationWrapRef.classList.remove('visually-hidden');
  stopLoader();
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
  hideSlider();
  if (searchText === '') {
    toTrendingBtnClick();
    return;
  }
  paginationWrapRef.classList.add('visually-hidden');

  startLoader();

  filter.classList.add('is-hidden');
  toTrendingBtn.classList.remove('is-hidden');
  refs.failSearchText.classList.add('visually-hidden');

  clearGallery();

  const movie = await searchMovies(searchText);

  if (!movie.total_results) {
    paginationWrapRef.classList.add('visually-hidden');
    refs.failSearchText.classList.remove('visually-hidden');
    stopLoader(); 
    return;
  }

  renderMovieCards(movie.results);
  renderPagination(movie.page, movie.total_pages);
  paginationWrapRef.classList.remove('visually-hidden');
  stopLoader();
}
