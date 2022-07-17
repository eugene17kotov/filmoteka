
const refs = {
    addToWatchedButton: document.querySelector('.to-watched'),
    gallery: document.querySelector('.library-gallery'),
}


refs.addToWatchedButton.addEventListener('click', onAddToWatchedBtnClick);

function isInLocalStorage(id) {
  if (!localStorage.getItem('watched').contains(id)) {
    return false;
  }
  return true;
}

function onAddToWatchedBtnClick() {
  const id = document.querySelector('backdrop').id;
  if (!isInLocalStorage(id)) {
    refs.addToWatchedButton.textContent = 'Remove From Watched';
    localStorage.setItem('watched', id);
  } else {
    refs.addToWatchedButton.textContent = 'Add to watched';
    localStorage.removeItem('watched', id);
  }
}


// function onAddToWatchedBtnClick() {
//    localStorage.setItem('watched', refs.film.textContent);
//     refs.addToWatchedButton.textContent = 'Remove From Watched';
//     refs.addToWatchedButton.classList.add('is-addedToWatchedFilms');
//    const watchedFilm = document.querySelector('.is-addedToWatchedFilms');
//     watchedFilm.addEventListener('click', onRemoveFromWatchedBtnClick);

// }


// function onRemoveFromWatchedBtnClick() {
  
//     refs.addToWatchedButton.classList.remove('is-addedToWatchedFilms');
//     refs.addToWatchedButton.textContent = 'Add to Watched';
//     localStorage.removeItem('watched');
// }


// function getStorage() {
//     let watched = localStorage.getItem('watched');
//     if (watched === null) {
//       return  watched = [];
//     } else {
//        return watched = JSON.parse(watched);
//     }
// }

