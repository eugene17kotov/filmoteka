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

function inLocalStorage(value) {
  if (localStorage.getItem('queue') !== null) {
    if (!JSON.parse(localStorage.getItem('queue').includes(value))) {
      return false;
    }
  }
  return true;
}

export function onBtnQueueClick() {
  // localStorage.clear();
  const id = bg.id;
  const test = localStorage.getItem('queue');
  // console.log(test);

  // console.log(bg.id);
  if (!inLocalStorage(id)) {
    queueBtn.textContent = 'Remove from queue';
    localstorage.setFilm('queue', id);
  } else {
    queueBtn.textContent = 'Add to queue';
    localstorage.removeFilm('queue', id);
  }
  // console.log(test);
}
