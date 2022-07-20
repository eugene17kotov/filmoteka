import { renderMovieCards } from './render-movie-cards';
import { getMovies } from './api/fetch-movie';
import { API_KEY, BASE_URL } from './api/api-vars';

const refs = {
  btnToday: document.querySelector('button[data-group="today"]'),
  filterBg: document.querySelector('.background__filter'),
  btnWeek: document.querySelector('button[data-group="week"]'),
  gallery: document.querySelector('.gallery'),
};

const loader = document.querySelector('.backdrop-loader');
export const { btnToday, filterBg, btnWeek } = refs;
let anchorNodeToday = btnToday.parentNode.parentNode;
let anchorNodeWeek = btnWeek.parentNode.parentNode;

let page = 1;

btnToday.addEventListener('click', () => {
  page = document.querySelector('.pagination-button--current').dataset.page;
  const TREND_URL_DAY = `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`;
  if (anchorNodeToday.classList.contains('.selected')) {
    return;
  } else {
    anchorNodeToday.classList.add('selected');
    anchorNodeWeek.classList.remove('selected');
    filterBg.classList.remove('to-right');
    localStorage.setItem('LAST_REQUESTED_URL', TREND_URL_DAY);
    renderMovies(TREND_URL_DAY + `&page=${page}`);
  }
});

btnWeek.addEventListener('click', () => {
  page = document.querySelector('.pagination-button--current').dataset.page;
  const TREND_URL_WEEK = `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`;
  if (anchorNodeWeek.classList.contains('.selected')) {
    return;
  } else {
    anchorNodeToday.classList.remove('selected');
    anchorNodeWeek.classList.add('selected');
    filterBg.classList.add('to-right');
    localStorage.setItem('LAST_REQUESTED_URL', TREND_URL_WEEK);
    renderMovies(TREND_URL_WEEK + `&page=${page}`);
  }
});

function renderMovies(url) {
  getMovies(url).then(response => {
    loader.classList.add('backdrop-loader--is-hidden');
    renderMovieCards(response.results);
  });
}
