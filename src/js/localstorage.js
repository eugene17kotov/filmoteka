export const localstorage = {
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
    const filmsId = films.map(film => film.id);

    if (filmsId.includes(value.id)) {
      films.splice(films.indexOf(value.id), 1);
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
