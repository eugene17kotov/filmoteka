// import fetchMovie from './api/fetch-movie';
// import renderMovieCard from './render-movie-cards';

// const refs = {
//   queueBtn: document.querySelector('.to-queue'),
//   gallery: document.querySelector('.library-gallery'),
//   queueBtnLibrary: document.querySelector('button[data-action="queue"]'),
// };

// const { queueBtn, gallery, queueBtnLibrary } = refs;

// console.log(document);

// // queueBtn.addEventListener('click', onBtnQueueClick);
// // queueBtnLibrary.addEventListener('click', onBtnQueueLibraryClick);

// const id = document.querySelector('backdrop').id;
// console.log(id);

// function inLocalStorage(id) {
//   if (!localStorage.getItem('queue').contains(id)) {
//     return false;
//   }
//   return true;
// }

// function onBtnQueueClick() {
//   if (!inLocalStorage(id)) {
//     queueBtn.textContent = 'Remove to queue';
//     localStorage.setItem('queue', id);
//   } else {
//     queueBtn.textContent = 'Add to queue';
//     localStorage.removeItem('queue', id);
//   }
// }

// function onBtnQueueLibraryClick() {}

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
