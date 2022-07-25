import { getMovies } from './api/fetch-movie';
import { ID_URL, BASE_IMG_URL, API_KEY } from './api/api-vars';
import { onBtnQueueClick } from './queue';
import { onAddToWatchedBtnClick } from './watched';
import { scrollFunction } from './scroll-up';
import { startLoader, stopLoader } from './loader';
import { slideGalleryRef } from './slider';
import { onTreilerBtnClick, closeModalTrailer } from './trailer';

const refs = {
  backdrop: document.querySelector('.movie-backdrop'),
  closeBtn: document.querySelector('button[data-dismiss="modal"]'),
  cardModal: document.querySelector('ul[data-point="galery"]'),
  queueBtn: document.querySelector('.to-queue'),
  imgRef: document.querySelector('.image-container'),
  contentRef: document.querySelector('.content-markup'),
  addToWatchedButton: document.querySelector('.to-watched'),
};

const {
  backdrop,
  closeBtn,
  cardModal,
  queueBtn,
  imgRef,
  contentRef,
  addToWatchedButton,
} = refs;
export let movieObject = {};
const toTopBtn = document.getElementById('myBtn');

function addAllEventListenersModal() {
  closeBtn.addEventListener('click', onCloseBtnClick);
  window.addEventListener('keydown', onKeydownEscape);
  backdrop.addEventListener('click', onBackdropClick);
  queueBtn.addEventListener('click', onBtnQueueClick);
  addToWatchedButton.addEventListener('click', onAddToWatchedBtnClick);
}

function onCloseBtnClick(e) {
  e.preventDefault();
  backdrop.classList.add('movie-backdrop--is-hidden');
  scrollFunction();
  removeAllEventListenersModal();
}

function onKeydownEscape(e) {
  e.preventDefault();
  if (e.code !== 'Escape') {
    return;
  }
  backdrop.classList.add('movie-backdrop--is-hidden');
  scrollFunction();
  removeAllEventListenersModal();
}

function onBackdropClick(e) {
  if (!e.target.classList.contains('movie-backdrop')) {
    return;
  }
  backdrop.classList.add('movie-backdrop--is-hidden');
  scrollFunction();
  removeAllEventListenersModal();
}

function removeAllEventListenersModal() {
  closeBtn.removeEventListener('click', onCloseBtnClick);
  window.removeEventListener('keydown', onKeydownEscape);
  backdrop.removeEventListener('click', onBackdropClick);
  queueBtn.removeEventListener('click', onBtnQueueClick);
  addToWatchedButton.removeEventListener('click', onAddToWatchedBtnClick);
  document.body.classList.remove('modal-open');
}

cardModal && cardModal.addEventListener('click', clickOnMovieHandler);

export let movieId;

// клик
export async function clickOnMovieHandler(e) {
  e.preventDefault();

  if (e.currentTarget === slideGalleryRef) {
    queueBtn.parentElement.classList.add('visually-hidden');
  } else {
    queueBtn.parentElement.classList.remove('visually-hidden');
  }

  if (e.target.nodeName !== 'IMG') {
    return;
  }

  startLoader();

  movieId = e.target.dataset.id;
  backdrop.setAttribute('id', movieId);

  await fetchById(movieId);

  const trailerBtn = document.querySelector('.modal-film__play-btn');

  trailerBtn && trailerBtn.addEventListener('click', onTreilerBtnClick);

  stopLoader();

  backdrop.classList.remove('movie-backdrop--is-hidden');
  document.body.classList.add('modal-open');
  toTopBtn.style.display = 'none';

  addAllEventListenersModal();

  whichBtnShow(movieId);
  whichBtnShowInWatchedFilms(movieId);

  // add/remove is-active class on buttons
  if (addToWatchedButton.textContent.toLowerCase() === 'add to watched') {
    addToWatchedButton.classList.remove('is-active');
  } else {
    addToWatchedButton.classList.add('is-active');
  }

  if (queueBtn.textContent.toLowerCase() === 'add to queue') {
    queueBtn.classList.remove('is-active');
  } else {
    queueBtn.classList.add('is-active');
  }
}

//Фетч фильма по ID
async function fetchById(movieId) {
  const idURL = `${ID_URL}${movieId}?api_key=${API_KEY}&language=en-US`;

  const responce = await getMovies(idURL);

  renderFilmCard(responce);

  movieObject = responce;

  return responce;
}

function renderFilmCard(film) {
  modalFilmCart(film);
}

const getGenresNames = genres => genres.map(genre => genre.name).join(', ');

function modalFilmCart({
  title,
  original_title,
  vote_average,
  vote_count,
  popularity,
  genres,
  overview,
  poster_path,
}) {
  let roundPopularity = Math.round(popularity);
  let roundVote_average = vote_average.toFixed(2);
  let imageMarkup = `
  <img 
    src="${BASE_IMG_URL}${poster_path}"
      alt="${title} movie poster}" 
      width="375" height="478" 
      class="image"
      />`;
  if (poster_path === null) {
    imageMarkup = `
  <img 
    src="https://dummyimage.com/395x574/000/fff.jpg&text=no+poster"
      alt="${title} movie poster}" 
      width="395" height="574" 
      class="image"
      />`;
  }
  const markup = `
  <h2 class="title">${title}</h2>
  <div class="properties">
      <div class="titles">
          <p class="property">Vote / Votes</p>
          <p class="property">Popularity</p>
          <p class="property">Original Title</p>
          <p class="property">Genre</p>
          <p class="property property--trailer">Trailer</p>
      </div>
      <div class="values">
          <p class="value"><span class="first-mark">${roundVote_average}</span>&nbsp;/&nbsp;<span class="second-mark">${vote_count}</span></p>
          <p class="value">${roundPopularity}</p>
          <p class="value">${original_title}</p>
          <p class="value">${getGenresNames(genres)}</p>
          <p class="value"> 
           <button class="modal-film__play-btn" type="button" ></button>
          </p>
          
      </div>
  </div>
  <div class="about">
      <p class="title">About</p>
      <div class="about-container">
          <p class="text">${overview}</p>          
      </div>
  </div>
      `;

  imgRef.innerHTML = imageMarkup;
  contentRef.innerHTML = markup;
}

function clearModalContent() {
  imgRef.innerHTML = '';
  contentRef.innerHTML = '';
}

function whichBtnShow(id) {
  const localstorage = localStorage.getItem('queue');

  if (localstorage === null) {
    queueBtn.textContent = 'Add to queue';
    return;
  }
  if (JSON.parse(localstorage.includes(id))) {
    queueBtn.textContent = 'Remove from queue';
  } else {
    queueBtn.textContent = 'Add to queue';
  }
}

function whichBtnShowInWatchedFilms(id) {
  const localstorageWatched = localStorage.getItem('watched');

  if (localstorageWatched === null) {
    addToWatchedButton.textContent = 'Add to watched';
    return;
  }
  if (JSON.parse(localstorageWatched.includes(id))) {
    addToWatchedButton.textContent = 'Remove from watched';
  } else {
    addToWatchedButton.textContent = 'Add to watched';
  }
}
