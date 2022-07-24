
import { getMovies } from './api/fetch-movie';
import { ID_URL, API_KEY } from './api/api-vars';

const refs = {
  modalTrailerIfraim: document.querySelector('.modal-video__trailer'),
  modalTrailer: document.querySelector('.backdrop-video'),
  closeTrailerBtn: document.querySelector('.modal__close-btn'),
 
}

const {
  modalTrailerIfraim,
  modalTrailer,
  closeTrailerBtn,
} = refs;






//Фетч треллера 
async function fetchTrailer(movieId) {
  const url = `${ID_URL}${movieId}/videos?api_key=${API_KEY}&language=en-US`;
  const response = await getMovies(url);

  return response

}

let videoId;
export function onTreilerBtnClick(e) {
  e.preventDefault();

  
  
  modalTrailer.classList.remove('modal-trailer--is-hidden');

  
 
  videoFrameClean();
  videoFrameCreate()
  openVideo(507086)



  closeTrailerBtn && closeTrailerBtn.addEventListener('click', closeModalTrailer);
}

// `<iframe src="https://www.youtube.com/embed/${e.target.dataset.video}" width="80%" height="70%" frameborder="0"></iframe>`


const BASE_TREILER_URL = "https://www.youtube.com/embed/";

function openVideo(key) {
  fetchTrailer(key).then(result => {
    const playlist = result.videos.results.map(value => value.key).join(',');
    console.log(playlist);

    videoFrameCreate(playlist)
  });
}

function videoFrameCreate(key) {
    
    const trailer = `
    <iframe 
    width="560px" 
    height="300px"  
   src="${BASE_TREILER_URL}${key}" 
   title="YouTube video player" 
   frameborder="0" 
   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
   allowfullscreen>
   </iframe>
 `;
    modalTrailerIfraim.insertAdjacentHTML('beforeend', trailer)
};

function videoFrameClean() {
    modalTrailerIfraim.innerHTML = '';
};


 

export function closeModalTrailer() {
  videoFrameClean();
  modalTrailer.classList.add('modal-trailer--is-hidden');
}
