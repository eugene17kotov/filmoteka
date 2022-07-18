// import fetchMovie from './api/fetch-movie';
// import { API_KEY, BASE_URL, SEARCH_URL, ID_URL } from './api/api-vars.js';
// import { renderPagination } from './pagination.js';
// import { getMovies } from './api/fetch-movie';
// import { createMovieMarkup } from './create-movie-markup';
// //////////////////////////////////////////////////////////
// const refs = {
//   addToWatchedButton: document.querySelector('.to-watched'),
//   gallery: document.querySelector('.library-gallery'),
//   modal: document.querySelector('.js-modal'),
//   libraryWatchedBtn: document.querySelector('button[data-action="watched"]'),
// };
// ///////////////////ADD TO WATCHED/////////////////////////////////

// refs.modal.addEventListener('click', modal);

// function modal() {
//   refs.addToWatchedButton.addEventListener('click', onAddToWatchedBtnClick);
//   function onAddToWatchedBtnClick() {
//     if (!isInLocalStorage(id)) {
//       refs.addToWatchedButton.textContent = 'Remove From Watched';
//       localStorage.setItem('watched', id);
//     } else {
//       refs.addToWatchedButton.textContent = 'Add to watched';
//       localStorage.removeItem('watched', id);
//     }
//   }

//   function isInLocalStorage(id) {
//     if (!localStorage.getItem('watched').contains(id)) {
//       return false;
//     }
//     return true;
//   }
// }
// // ///////////////////ADD TO WATCHED/////////////////////////////////

// // /////WATCHED/////

// refs.libraryWatchedBtn.addEventListener('click', onLibraryWatchedBtnClick);
// const libraryTextContainer = document.querySelector('.library-text');

// function onLibraryWatchedBtnClick(watchedMovieUrl) {
//   let watchedMovieId = localStorage.getItem('watched');
//   if (watched === null) {
//     return (libraryTextContainer.textContent = 'You have not added any movies');
//   } else {
//     (async () => {
//       const moviesById = await getMovies(ID_URL);
//       renderMovieCardsLibrary(moviesById.results);
//       renderPagination(trendMoviesList.page, trendMoviesList.total_pages);
//     })();
//   }
// }

// function renderMovieCardsLibrary(movies) {
//   const movieGalleryMarkup = movies
//     .map(movie => createMovieMarkup(movie))
//     .join('');
//   document
//     .querySelector('.library-gallery')
//     .insertAdjacentHTML('beforeend', movieGalleryMarkup);
// }

// ///WATCHED/////

// function createMovieMarkup(movie) {
//   const { title, genre_ids, release_date, poster_path, vote_average } = movie;
//   const year = release_date.slice(0, 4);
//   const movieGenresList = getMovieGenresList(genre_ids).join(', ');

//   return `<li>
//             <a class="gallery__link" href="#">
//               <img class="gallery__image" src="${BASE_IMG_URL}${poster_path}" alt="${title} movie poster" loading="lazy">

//             <div class="info">
//               <p class="info__item">${title}</p>
//               <div class="info-detail">
//                 <p class="info-detail__item">${movieGenresList}</p>
//                 <p class="info-detail__item">${year} <span class="points">${vote_average}</span></p>
//               </div>
//             </div>
//             </a>
//           </li>`;
// }

// /////////////////////////////////////
// // function onAddToWatchedBtnClick() {
// //   localStorage.setItem('watched', refs.film.textContent);
// //   refs.addToWatchedButton.textContent = 'Remove From Watched';
// //   refs.addToWatchedButton.classList.add('is-addedToWatchedFilms');
// //   const watchedFilm = document.querySelector('.is-addedToWatchedFilms');
// //   watchedFilm.addEventListener('click', onRemoveFromWatchedBtnClick);
// // }
// // function onRemoveFromWatchedBtnClick() {
// //   refs.addToWatchedButton.classList.remove('is-addedToWatchedFilms');
// //   refs.addToWatchedButton.textContent = 'Add to Watched';
// //   localStorage.removeItem('watched');
// // }

// // function onAddToWatchedBtnClick() {
// //   localStorage.setItem('watched', refs.film.textContent);
// //   refs.addToWatchedButton.textContent = 'Remove From Watched';
// //   refs.addToWatchedButton.classList.add('is-addedToWatchedFilms');
// //   const watchedFilm = document.querySelector('.is-addedToWatchedFilms');
// //   watchedFilm.addEventListener('click', onRemoveFromWatchedBtnClick);
// // }

// // function onRemoveFromWatchedBtnClick() {
// //   refs.addToWatchedButton.classList.remove('is-addedToWatchedFilms');
// //   refs.addToWatchedButton.textContent = 'Add to Watched';
// //   localStorage.removeItem('watched');
// // }

// // function getStorage() {
// //   let watched = localStorage.getItem('watched');
// //   if (watched === null) {
// //     return (watched = []);
// //   } else {
// //     return (watched = JSON.parse(watched));
// //   }
// // }
