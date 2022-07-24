import { BASE_URL, API_KEY, SEARCH_URL, ID_URL } from './api/api-vars';
import { getMovies } from './api/fetch-movie.js';
import { renderPagination, paginationWrapRef } from './pagination'; //Viktor;
import { renderMovieCards } from './render-movie-cards';
import { filter, toTrendingBtn, toTrendingBtnClick } from './filter';
import { debounce } from './debounce';
import {toTrendingBtnClick} from './filter';
import { startLoader, stopLoader } from './loader';

const refs = {
  form: document.querySelector('.header__form'),
  input: document.querySelector('.header__form-input'),
  gallery: document.querySelector('.gallery'),
  loader: document.querySelector('.backdrop-loader'),
  pagination: document.querySelector('.pagination-wrap'),
  mainSection: document.querySelector('.section.main'),
  toTrendingBtn: document.querySelector('.to-trending__button'),
  filter: document.querySelector('.filter'),
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

  const muvie = await searchMovies(searchText);
  if (muvie.total_results === 0) {
 
    toTrendingBtn.classList.remove('is-hidden');
    refs.gallery.classList.remove('gallery');
    let noMovieToMatch = refs.gallery.innerHTML = '<p class="mainsection-container">Search result not successful. Enter the correct movie name.</p>';
   const noFilter = refs.filter.classList.add('is-hidden');
    const paginationWhenMovieIsNotFound = refs.pagination.classList.add('is-hidden');
    const paginationWhenMovieIsNotFoundd = refs.pagination.classList.remove('pagination-wrap');
    refs.mainSection.classList.add('mainsection-container');
    return [noMovieToMatch, paginationWhenMovieIsNotFound,noFilter];
  }


    filter.classList.add('is-hidden');
  toTrendingBtn.classList.remove('is-hidden');

  clearGallery();
 

  const movie = await searchMovies(searchText);

  stopLoader();

  e.target.reset();

  if (!movie.total_results) {
    paginationWrapRef.classList.add('visually-hidden');
    refs.failSearchText.classList.remove('visually-hidden');
    return;
  }

  renderMovieCards(movie.results);
  renderPagination(movie.page, movie.total_pages);
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}

// Search by input

const DEBOUNCE_DELAY = 500;

refs.form && refs.form.addEventListener('submit', onFormSubmit);
refs.input &&
  refs.input.addEventListener('input', debounce(onInputText, DEBOUNCE_DELAY));

async function onInputText(e) {
  searchText = e.target.value.trim();

  if (searchText === '') {
    toTrendingBtnClick();
    return;
  }

  const muvie = await searchMovies(searchText);
if (muvie.total_results === 0) {
 
    toTrendingBtn.classList.remove('is-hidden');
    refs.gallery.classList.remove('gallery');
    let noMovieToMatch = refs.gallery.innerHTML = '<p class="mainsection-container">Search result not successful. Enter the correct movie name.</p>';
   const noFilter = refs.filter.classList.add('is-hidden');
    const paginationWhenMovieIsNotFound = refs.pagination.classList.add('is-hidden');
    const paginationWhenMovieIsNotFoundd = refs.pagination.classList.remove('pagination-wrap');
    refs.mainSection.classList.add('mainsection-container');
    return [noMovieToMatch, paginationWhenMovieIsNotFound,noFilter];
  }


    filter.classList.add('is-hidden');
  toTrendingBtn.classList.remove('is-hidden');

  startLoader();

  clearGallery();

  const movie = await searchMovies(searchText);

  stopLoader();

  if (!movie.total_results) {
    paginationWrapRef.classList.add('visually-hidden');
    refs.failSearchText.classList.remove('visually-hidden');
    return;
  }

  renderMovieCards(movie.results);
  renderPagination(movie.page, movie.total_pages);
}
