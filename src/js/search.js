import { BASE_URL, API_KEY, SEARCH_URL, ID_URL } from './api/api-vars';
import { getMovies } from './api/fetch-movie.js';
import { renderPagination } from './pagination'; //Viktor;
import { renderMovieCards } from './render-movie-cards';
import { filter, toTrendingBtn } from './filter';
import { debounce } from './debounce';
import {toTrendingBtnClick} from './filter';

const refs = {
  form: document.querySelector('.header__form'),
  input: document.querySelector('.header__form-input'),
  gallery: document.querySelector('.gallery'),
  loader: document.querySelector('.backdrop-loader'),
  pagination: document.querySelector('.pagination-wrap'),
  mainSection: document.querySelector('.section.main'),
  toTrendingBtn: document.querySelector('.to-trending__button'),
  filter: document.querySelector('.filter'),
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

  refs.loader.classList.remove('backdrop-loader--is-hidden');

  clearGallery();
 

  refs.loader.classList.add('backdrop-loader--is-hidden');

  e.target.reset();

  renderMovieCards(muvie.results);
  renderPagination(muvie.page, muvie.total_pages);
  const paginationWrapRef = document.querySelector('.pagination-wrap');
  refs.pagination.classList.add('pagination-wrap');
  console.log(refs.pagination)
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}

// Search by input

const DEBOUNCE_DELAY = 600;

refs.form && refs.form.addEventListener('submit', onFormSubmit);
refs.input &&
  refs.input.addEventListener('input', debounce(onInputText, DEBOUNCE_DELAY));

async function onInputText(e) {
  searchText = e.target.value.trim();

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

  refs.loader.classList.remove('backdrop-loader--is-hidden');

  clearGallery();

  // 
  refs.loader.classList.add('backdrop-loader--is-hidden');

  renderMovieCards(muvie.results);
 
  renderPagination(muvie.page, muvie.total_pages);
}
