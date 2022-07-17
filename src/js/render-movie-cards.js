import { getMovies } from './api/fetch-movie';
import { createMovieMarkup } from './create-movie-markup';
import { TREND_URL } from './api/api-vars';

(async () => {
  const trendMoviesList = (await getMovies(TREND_URL)).results;

  renderMovieCards(trendMoviesList);
})();

export function renderMovieCards(movies) {
  const movieGalleryMarkup = movies
    .map(movie => createMovieMarkup(movie))
    .join('');

  document
    .querySelector('.gallery')
    .insertAdjacentHTML('beforeend', movieGalleryMarkup);
}
