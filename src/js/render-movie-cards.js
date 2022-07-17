import { getMovies } from './api/fetch-movie';

import { TREND_URL } from './api/api-vars';
import { renderPagination } from './pagination.js';

(async () => {
  const trendMoviesList = (await getMovies(TREND_URL));

  renderMovieCards(trendMoviesList.results);

  // Viktor:need to save last url to localstorage 
  localStorage.setItem('LAST_REQUESTED_URL', TREND_URL)
  // Viktor:render pagination buttons
  renderPagination(trendMoviesList.page, trendMoviesList.total_pages);
})();

export function renderMovieCards(movies) {
  const movieGalleryMarkup = movies
    .map(movie => createMovieMarkup(movie))
    .join('');
  document
    .querySelector('.gallery')
    .innerHTML=movieGalleryMarkup;
    //.insertAdjacentHTML('beforeend', movieGalleryMarkup);   //Viktor: we need replace card, not append!
}
