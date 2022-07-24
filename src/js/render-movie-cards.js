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

  addAd();

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

export function addAd() {
  const adCard = `<li class="ad-card">
            <a class="gallery__link ad-card-link" href="#">
              <div class="gallery__image ad-card-content-wrapper">
                <p class="ad-title">Здесь может быть ваша реклама</p>
                <div class="ad-content">
                  <p class="ad-text">Продам гараж</br>Недорого</p>
                  <p class="ad-number">066-222-33-44</br>Саша Репета</p>
                </div>
              </div>
            </a>
          </li>`;

  document.querySelector('.gallery').insertAdjacentHTML('beforeEnd', adCard);
}
