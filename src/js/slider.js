import Glide from '@glidejs/glide';
import { getMovies } from './api/fetch-movie';
import { API_KEY, BASE_URL} from './api/api-vars';
import { clickOnMovieHandler } from './movie-modal';

const UPCOMING_URL = `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`;
const SLIDER_IMG_URL = 'https://image.tmdb.org/t/p/w200';
export const slideGalleryRef = document.querySelector(".glide__slides-upcoming");

(async () => {
  const upcomingMovieList = await getMovies(UPCOMING_URL);

  renderSlideMovieCards(upcomingMovieList.results);
  
  const options = {
    type: "carousel",
    perView: 8,
    draggable: true,
    autoplay: 2500,
    breakpoints: {
      1280: {
        perView: 6
      },
      767: {
        perView: 3
      }
    }
  }
  const slider = new Glide('.glide', options).mount();

})();

function renderSlideMovieCards(movies) {
  const slideMovieGalleryMarkup = movies
    .map(movie => createSlideMovieMarkup(movie))
    .join('');

  slideGalleryRef.innerHTML = slideMovieGalleryMarkup;
  slideGalleryRef.addEventListener("click", clickOnMovieHandler)
}

function createSlideMovieMarkup (movie) {
  const { title, poster_path, id, release_date } = movie;
    poster_src = poster_path === null
      ? 'https://dummyimage.com/100x100/000/fff.jpg&text=no+poster'
      : `${SLIDER_IMG_URL}${poster_path}`;

  return `<li class="glide__slide">
              <img class="glide__slide-item"data-id="${id}" src="${poster_src}" alt="${title} movie poster" loading="lazy"/>
              <p class="glide__slide-title">${title}</p>
              <p class="glide__slide-text">${release_date}</p>
          </li>`;
}
