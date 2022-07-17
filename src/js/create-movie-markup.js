import { genres } from './genres.json';
import { BASE_IMG_URL } from './api/api-vars';

export function createMovieMarkup(movie) {
  const { title, genre_ids, release_date, poster_path, id } = movie;
  const year = release_date.slice(0, 4);
  const movieGenresList = getMovieGenresList(genre_ids).join(', ');

  return `<li>
            <a class="gallery__link" href="#">
              <img class="gallery__image" data-id="${id}" src="${BASE_IMG_URL}${poster_path}" alt="${title} movie poster" loading="lazy">
            </a>
            <div class="info">
              <p class="info__item">${title}</p>
              <div class="info-detail">
                <p class="info-detail__item">${movieGenresList}</p>
                <p class="info-detail__item">${year}</p>
              </div>
            </div>
          </li>`;
}

function getMovieGenresList(genresIdsList) {
  let movieGenres = genres.reduce((acc, { id, name }) => {
    if (genresIdsList.includes(id)) {
      acc.push(name);
    }
    return acc;
  }, []);
  if (movieGenres.length > 3) {
    movieGenres = movieGenres.slice(0, 2);
    movieGenres.push('Other');
  }
  return movieGenres;
}
