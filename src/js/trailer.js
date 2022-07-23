// import * as basicLightbox from 'basiclightbox';
import { getMovies } from './api/fetch-movie';
import { ID_URL, API_KEY } from './api/api-vars';
import { trailer } from './trailer';
const btnModalTrailer = document.querySelector('.modal-film__play-btn');

//Фетч треллера
async function fetchTrailer(movieId) {
  const url = `${ID_URL}${movieId}/videos?api_key=${API_KEY}&language=en-US`;
  const responce = await getMovies(url);
  return responce;
}

export async function trailer(e) {
  fetchTrailer(Number(e.target.dataset.id))
    .then(data => {
      trailerRender(data);
    })
    .catch(console.log);
}

// const modalTrailer = document.querySelector('.modal');
// console.log(modalTrailer);

function trailerRender(data) {
  const instance = basicLightbox.create(
    `<div class="modal-trailer__backdrop">
          <iframe class="iframe" width="640" height="480" frameborder="0" allowfullscreen allow='autoplay'
            src="https://www.youtube.com/embed/${data.results[0].key}?autoplay=1" >
          </iframe>
          <p> Watch Trailer</p>
    </div>`,
    {
      onShow: instance => {
        instance.element().onclick = instance.close;
        document.addEventListener('keydown', onEscClose);
      },
    },
    {
      onClose: instance => {
        document.removeEventListener('keydown', onEscClose);
        console.log(instance);
      },
    }
  );
  function onEscClose(event) {
    if (event.code === 'Escape') {
      instance.close();
    }
  }
  btnModalTrailer &&
    btnModalTrailer.addEventListener('click', () => {
      instance.show();
    });
}
