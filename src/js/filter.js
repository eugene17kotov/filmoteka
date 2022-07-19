import { TREND_URL_WEEK, TREND_URL_DAY } from './api/api-vars';
import { renderMovieCards } from './render-movie-cards';

const refs = {
  btnToday: document.querySelector('button[data-group="today"]'),
  filterBg: document.querySelector('.background__filter'),
  btnWeek: document.querySelector('button[data-group="week"]'),
};

const { btnToday, filterBg, btnWeek } = refs;
let anchorNodeToday = btnToday.parentNode.parentNode;
let anchorNodeWeek = btnWeek.parentNode.parentNode;

btnToday.addEventListener('click', () => {
  if (anchorNodeToday.classList.contains('.selected')) {
    return;
  } else {
    anchorNodeToday.classList.add('selected');
    anchorNodeWeek.classList.remove('selected');
    filterBg.classList.remove('to-right');
  }
});

btnWeek.addEventListener('click', () => {
  if (anchorNodeWeek.classList.contains('.selected')) {
    return;
  } else {
    anchorNodeToday.classList.remove('selected');
    anchorNodeWeek.classList.add('selected');
    filterBg.classList.add('to-right');
  }
});
