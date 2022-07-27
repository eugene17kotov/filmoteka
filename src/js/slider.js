import Glide from '@glidejs/glide';
import { getMovies } from './api/fetch-movie';
import { API_KEY, BASE_URL } from './api/api-vars';
import { clickOnMovieHandler } from './movie-modal';

const UPCOMING_URL = `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&region=US&language=en-US&page=1`;
const SLIDER_IMG_URL = 'https://image.tmdb.org/t/p/w200';
export const slideGalleryRef = document.querySelector('.glide__slides-upcoming');
export const sliderGalleryWrap = document.querySelector('.slider');
export const sliderGalleryTitle = document.querySelector('.upcoming-title');

slideGalleryRef && startWorkSlider();

 export async function startWorkSlider() {
  const upcomingMovieList = await getMovies(UPCOMING_URL);
  renderSlideMovieCards(upcomingMovieList.results);
  slider.mount();
}

const options = {
  type: 'carousel',
  perView: 8,
  draggable: true,
  autoplay: 2500,
  breakpoints: {
    1280: {
      perView: 6,
    },
    767: {
      perView: 3,
    },
  },
};

const slider = new Glide('.glide', options);

function renderSlideMovieCards(movies) {
  const slideMovieGalleryMarkup = movies
    .map(movie => createSlideMovieMarkup(movie))
    .join('');

  if (slideGalleryRef) {
    slideGalleryRef.innerHTML = slideMovieGalleryMarkup;
  }
  slideGalleryRef &&
    slideGalleryRef.addEventListener('click', clickOnMovieHandler);
}

function createSlideMovieMarkup(movie) {
  const { title, poster_path, id, release_date } = movie;
  const poster_src =
    poster_path === null
      ? 'https://dummyimage.com/100x100/000/fff.jpg&text=no+poster'
      : `${SLIDER_IMG_URL}${poster_path}`;

  return `<li class="glide__slide">
              <img class="glide__slide-item"data-id="${id}" src="${poster_src}" alt="${title} movie poster" loading="lazy"/>
              <p class="glide__slide-title">${title}</p>
              <p class="glide__slide-text">${release_date}</p>
          </li>`;
}

export function showSlider () {
  sliderGalleryWrap.classList.remove("visually-hidden");
  sliderGalleryTitle.classList.remove("visually-hidden");
  startSliderAutoplay();
}

export function hideSlider () {
  sliderGalleryWrap.classList.add("visually-hidden");
  sliderGalleryTitle.classList.add("visually-hidden");
  stopSliderAutoplay();
}

export function stopSliderAutoplay () {
  slider.pause();
}

export function startSliderAutoplay () {
  slider.play();
}
