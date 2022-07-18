import { ID_URL, BASE_IMG_URL } from './api/api-vars';
import { getMovies } from './api/fetch-movie';
import { genres } from './genres.json';

const refsModal = {
  queueBtn: document.querySelector('.to-queue'),
  library: document.querySelector('.library-gallery'),
  bg: document.querySelector('.backdrop'),
};

const { queueBtn, library, bg } = refsModal;

const localstorage = {
  loadData(key) {
    const localStorageData = localStorage.getItem(key);
    return JSON.parse(localStorageData);
  },

  saveData(key, value) {
    const dataToSave = JSON.stringify(value);
    localStorage.setItem(key, dataToSave);
  },

  setFilm(key, value) {
    const currentCollection = this.getMovies(key);
    currentCollection.push(value);
    this.saveData(key, currentCollection);
  },

  removeFilm(key, value) {
    const films = this.getMovies(key);
    if (films.includes(value)) {
      films.splice(films.indexOf(value), 1);
      this.saveData(key, films);
    } else return;
  },

  getMovies(key) {
    const movies = this.loadData(key);
    if (!movies) {
      this.saveData(key, []);
      return [];
    } else {
      return movies;
    }
  },
};

if (queueBtn) {
  queueBtn.addEventListener('click', onBtnQueueClick);
}

function inLocalStorage(value) {
  if (!localStorage.getItem('queue').contains(value)) {
    return false;
  }
  return true;
}

function onBtnQueueClick() {
  const id = bg.id;
  if (!inLocalStorage(id)) {
    refs.queueBtn.textContent = 'Remove to queue';
    localstorage.setFilm('queue', id);
  } else {
    refs.queueBtn.textContent = 'Add to queue';
    localstorage.removeFilm('queue', id);
  }
}
