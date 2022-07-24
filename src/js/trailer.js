import { getMovies } from './api/fetch-movie';
import { ID_URL, VIDEO_URL } from './api/api-vars';
import { movieId } from './movie-modal';

const refs = {
  modalTrailerIfraim: document.querySelector('.modal-video__trailer'),
  modalTrailer: document.querySelector('.backdrop-video'),
};

const { modalTrailerIfraim, modalTrailer } = refs;

//Фетч треллера
async function fetchForMovieTrailers(movieId) {
  const url = `${ID_URL}${movieId}${VIDEO_URL}`;

  const response = await getMovies(url);

  return response.results;
}


// https://api.themoviedb.org/3/movie/507086/videos?api_key=820f51701c1eae13089594e954cb7930&language=en-US

export function onTreilerBtnClick(e) {
  e.preventDefault();

  videoFrameClean();

  modalTrailer.classList.remove('modal-trailer--is-hidden');

  openVideo(movieId);

  const closeTrailerBtn = document.querySelector('.modal__close-btn');

  closeTrailerBtn &&
    closeTrailerBtn.addEventListener('click', closeModalTrailer);
    
    window.addEventListener('keydown', onKeydownEscape);
}

// `<iframe src="https://www.youtube.com/embed/${e.target.dataset.video}" width="80%" height="70%" frameborder="0"></iframe>`

const BASE_TREILER_URL = 'https://www.youtube.com/embed/';

function openVideo(id) {
  fetchForMovieTrailers(id).then(result => {
    if(result[0]){

      const key =  result[0].key;
      videoFrameCreate(key);
    } else{

      modalTrailerIfraim.innerHTML = `<p class="modal-video__error">Trailer not found!</p>`
    }
    //  return ;
    
      
    
  });
}

function videoFrameCreate(key) {
  const trailer = `
    <iframe 
    width="560px" 
    height="315px"  
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
  videoFrameClean();
  modalTrailer.classList.add('modal-trailer--is-hidden');
}


function onKeydownEscape(e) {
  e.preventDefault();
  if (e.code !== 'Escape') {
    return;
  }
  modalTrailer.classList.add('modal-trailer--is-hidden');
}
