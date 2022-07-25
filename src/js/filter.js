import { renderMovieCards } from './render-movie-cards';
import { getMovies } from './api/fetch-movie';
import { API_KEY, BASE_URL } from './api/api-vars';
import { paginationWrapRef } from './pagination';
import { startLoader, stopLoader } from './loader';
import { adRandomizer } from './render-movie-cards';
import { showSlider } from './slider';

const refs = {
  btnToday: document.querySelector('button[data-group="today"]'),
  filterBg: document.querySelector('.background__filter'),
  btnWeek: document.querySelector('button[data-group="week"]'),
  gallery: document.querySelector('.gallery'),
  form: document.querySelector('.header__form'),
  filter: document.querySelector('.filter'),
  toTrendingBtn: document.querySelector('.to-trending__button'),
  failSearchText: document.querySelector('.not-succesful-search-text'),
};

export const {
  btnToday,
  filterBg,
  btnWeek,
  gallery,
  form,
  filter,
  toTrendingBtn,
  failSearchText,
} = refs;
let anchorNodeToday = btnToday.parentNode.parentNode;
let anchorNodeWeek = btnWeek.parentNode.parentNode;

let page = 1;

toTrendingBtn.addEventListener('click', toTrendingBtnClick);

btnToday.addEventListener('click', async () => {
  page = document.querySelector('.pagination-button--current').dataset.page;
  const TREND_URL_DAY = `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`;
  if (anchorNodeToday.classList.contains('.selected')) {
    return;
  } else {
    startLoader();
    anchorNodeToday.classList.add('selected');
    anchorNodeWeek.classList.remove('selected');
    filterBg.classList.remove('to-right');
    localStorage.setItem('LAST_REQUESTED_URL', TREND_URL_DAY);
    await renderMovies(TREND_URL_DAY + `&page=${page}`);
    setTimeout(() => {
      stopLoader();
    }, 200);
  }
});

btnWeek.addEventListener('click', async () => {
  page = document.querySelector('.pagination-button--current').dataset.page;
  const TREND_URL_WEEK = `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`;
  if (anchorNodeWeek.classList.contains('.selected')) {
    return;
  } else {
    startLoader();
    anchorNodeToday.classList.remove('selected');
    anchorNodeWeek.classList.add('selected');
    filterBg.classList.add('to-right');
    localStorage.setItem('LAST_REQUESTED_URL', TREND_URL_WEEK);
    await renderMovies(TREND_URL_WEEK + `&page=${page}`);
    setTimeout(() => {
      stopLoader();
    }, 200);
  }
});

export function renderMovies(url) {
  getMovies(url).then(response => {
    renderMovieCards(response.results);

    adRandomizer();
  });
}

export async function toTrendingBtnClick() {
  page = document.querySelector('.pagination-button--current').dataset.page;

  const TREND_URL_WEEK = `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`;

  showSlider();
  filter.classList.remove('is-hidden');
  toTrendingBtn.classList.add('is-hidden');
  form.reset();

  if (anchorNodeWeek.classList.contains('.selected')) {
    return;
  } else {
    startLoader();
    anchorNodeToday.classList.remove('selected');
    anchorNodeWeek.classList.add('selected');
    filterBg.classList.add('to-right');
    localStorage.setItem('LAST_REQUESTED_URL', TREND_URL_WEEK);
    await renderMovies(TREND_URL_WEEK + `&page=${page}`);
    paginationWrapRef.classList.remove('visually-hidden');
    failSearchText.classList.add('visually-hidden');
    setTimeout(() => {
      stopLoader();
    }, 200);
  }
}
