import fetchMovie from './api/fetch-movie';
import renderMovieCard from './render-movie-cards';

export const refsModal = {
  queueBtn: document.querySelector('.to-queue'),
  gallery: document.querySelector('.library-gallery'),
  bg: document.querySelector('backdrop'),
};

// const { queueBtn, gallery, bg } = refs;
// const id = backdrop.id;
// queueBtn.addEventListener('click', onBtnQueueClick);

function inLocalStorage(id) {
  if (!localStorage.getItem('queue')) {
    return false;
  }
  return true;
}

export function onBtnQueueClick(callback, value) {
  if (!callback(value)) {
    refs.queueBtn.textContent = 'Remove to queue';
    localStorage.setItem('queue', id);
  } else {
    refs.queueBtn.textContent = 'Add to queue';
    localStorage.removeItem('queue', id);
  }
}
