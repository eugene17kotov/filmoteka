import { getMovies } from './api/fetch-movie';
import { ID_URL, VIDEO_URL } from './api/api-vars';
import { movieId, removeAllEventListenersModal, addAllEventListenersModal} from './movie-modal';
import { startLoader, stopLoader } from './loader';

const refs = {
  modalTrailerIfraim: document.querySelector('.modal-video__trailer'),
  modalTrailer: document.querySelector('.backdrop-video'),
};

const { modalTrailerIfraim, modalTrailer } = refs;
let closeTrailerBtn;


//Фетч треллера
async function fetchForMovieTrailers(movieId) {
  const url = `${ID_URL}${movieId}${VIDEO_URL}`;

  const response = await getMovies(url);

  return response.results;
}

// https://api.themoviedb.org/3/movie/507086/videos?api_key=820f51701c1eae13089594e954cb7930&language=en-US

export async function onTreilerBtnClick(e) {
  e.preventDefault();

  startLoader();
  
  videoFrameClean();

  removeAllEventListenersModal();

  await openVideo(movieId);

  modalTrailer.classList.remove('modal-trailer--is-hidden');

  stopLoader();

  closeTrailerBtn = document.querySelector('.modal__close-btn');


  closeTrailerBtn &&
    closeTrailerBtn.addEventListener('click', closeModalTrailer);    
  modalTrailer && modalTrailer.addEventListener('click', onTrailerBackdropClick);
    window.addEventListener('keydown', onKeydownEscape);
}

// `<iframe src="https://www.youtube.com/embed/${e.target.dataset.video}" width="80%" height="70%" frameborder="0"></iframe>`

const BASE_TREILER_URL = 'https://www.youtube.com/embed/';

async function openVideo(id) {
  const result = await fetchForMovieTrailers(id);
  if (result[0]) {
    const key =  result[0].key;
    await videoFrameCreate(key);
    } else{
      modalTrailerIfraim.innerHTML = `<p class="modal-video__error">Trailer not found!</p>`
  }
}

function videoFrameCreate(key) {
  const trailer = `
    <iframe 
    width="100%" 
    height="100%"  
   src="${BASE_TREILER_URL}${key}" 
   title="YouTube video player" 
   frameborder="0" 
   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
   allowfullscreen>
   </iframe>
 `;
  modalTrailerIfraim.insertAdjacentHTML('beforeend', trailer);
}

function videoFrameClean() {
  modalTrailerIfraim.innerHTML = '';
}

export function closeModalTrailer() {
  addAllEventListenersModal();
  removeAllEventListenersTrailer();
  modalTrailer.classList.add('modal-trailer--is-hidden');
}

function onTrailerBackdropClick(e) {
    if (!e.target.classList.contains('backdrop-video')) {
    return;
  }
  addAllEventListenersModal();
  removeAllEventListenersTrailer();
  modalTrailer.classList.add('modal-trailer--is-hidden');
}


function onKeydownEscape(e) {
  e.preventDefault();
  if (e.code !== 'Escape') {
    return;
  }
  addAllEventListenersModal();
  removeAllEventListenersTrailer();
  modalTrailer.classList.add('modal-trailer--is-hidden');
}

function removeAllEventListenersTrailer() {
  closeTrailerBtn.removeEventListener('click', closeModalTrailer);    
  modalTrailer.removeEventListener('click', onTrailerBackdropClick);
  window.removeEventListener('keydown', onKeydownEscape);
}
