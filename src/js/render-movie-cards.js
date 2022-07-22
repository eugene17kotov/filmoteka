import { getMovies } from './api/fetch-movie';
import { createMovieMarkup } from './create-movie-markup';
import { TREND_URL } from './api/api-vars';
import { renderPagination } from './pagination.js';
import { loader, startLoader, stopLoader } from './loader';

const gallery = document.querySelector('.gallery');

startLoader();

(async () => {
  const trendMoviesList = await getMovies(TREND_URL);

  renderMovieCards(trendMoviesList.results);

  stopLoader();

  // Viktor:need to save last url to localstorage
  localStorage.setItem('LAST_REQUESTED_URL', TREND_URL);
  // Viktor:render pagination buttons
  renderPagination(trendMoviesList.page, trendMoviesList.total_pages);
})();

export function renderMovieCards(movies) {
  const movieGalleryMarkup = movies
    .map(movie => createMovieMarkup(movie))
    .join('');

  gallery && appendMarkup();

  function appendMarkup() {
    gallery.innerHTML = movieGalleryMarkup;
  }
}
