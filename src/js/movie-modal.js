import { getMovies } from './api/fetch-movie';
import { ID_URL, BASE_IMG_URL, API_KEY } from './api/api-vars';
import { onBtnQueueClick } from './queue';
import { onAddToWatchedBtnClick } from './watched';

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

function addAllEventListenersModal() {
  closeBtn.addEventListener('click', onCloseBtnClick);
  window.addEventListener('keydown', onKeydownEscape);
  backdrop.addEventListener('click', onBackdropClick);
  queueBtn.addEventListener('click', onBtnQueueClick);
  addToWatchedButton.addEventListener('click', onAddToWatchedBtnClick);
}

function onCloseBtnClick(e) {
  e.preventDefault();
  backdrop.classList.add('is-hidden');
  removeAllEventListenersModal();
}

function onKeydownEscape(e) {
  e.preventDefault();
  if (e.code !== 'Escape') {
    return;
  }
  backdrop.classList.add('is-hidden');
  removeAllEventListenersModal();
}

function onBackdropClick(e) {
  if (!e.target.classList.contains('backdrop')) {
    return;
  }
  backdrop.classList.add('is-hidden');
  removeAllEventListenersModal();
}

function removeAllEventListenersModal() {
  closeBtn.removeEventListener('click', onCloseBtnClick);
  window.removeEventListener('keydown', onKeydownEscape);
  backdrop.removeEventListener('click', onBackdropClick);
  queueBtn.removeEventListener('click', onBtnQueueClick);
  addToWatchedButton.removeEventListener('click', onAddToWatchedBtnClick);
  document.body.classList.toggle('modal-open');
}

cardModal && cardModal.addEventListener('click', clickOnMovieHandler);

let movieId;
// клик
function clickOnMovieHandler(e) {
  e.preventDefault();

  if (e.target.nodeName !== 'IMG') {
    return;
  }

  backdrop.classList.remove('is-hidden');
  document.body.classList.toggle('modal-open');

  movieId = e.target.dataset.id;
  backdrop.setAttribute('id', movieId);

  fetchById(movieId);

  addAllEventListenersModal();

  whichBtnShow(movieId);
  whichBtnShowInWatchedFilms(movieId);
}

//Фетч фильма по ID
function fetchById(movieId) {
  const idURL = `${ID_URL}${movieId}?api_key=${API_KEY}&language=en-US`;
  getMovies(idURL).then(res => {
    renderFilmCard(res);
  });
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
  const imageMarkup = `
  <img 
    src="${BASE_IMG_URL}${poster_path}"
      alt="${title} movie poster}" 
      width="395" height="574" 
      class="image"
      />`;

  const markup = `
  <h2 class="title">${title}</h2>
  <div class="properties">
      <div class="titles">
          <p class="property">Vote / Votes</p>
          <p class="property">Popularity</p>
          <p class="property">Original Title</p>
          <p class="property">Genre</p>
      </div>
      <div class="values">
          <p class="value"><span class="first-mark">${vote_average}</span>&nbsp;/&nbsp;<span class="second-mark">${vote_count}</span></p>
          <p class="value">${popularity}</p>
          <p class="value">${original_title}</p>
          <p class="value">${getGenresNames(genres)}</p>
          
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
