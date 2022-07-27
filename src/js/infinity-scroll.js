import { libraryGallery } from './queue';
import { renderMovieCardsLibrary } from './queue';
import { startLoader, stopLoader } from './loader';

export const scrollGuardRef = document.querySelector('.scroll-guard');

export const options = {
  rootMargin: '250px',
  threshold: 1.0,
};

const observer = new IntersectionObserver(scrollPagination, options);

export function startPaginationObserver() {
  observer.observe(scrollGuardRef);
}

export function stopPaginationObserver() {
  observer.unobserve(scrollGuardRef);
}

function scrollPagination(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      addNewCards();
    }
  });
}

async function addNewCards() {
  const activeButton = document.querySelector('.library__item-btn--active');
  const actualArray = libraryGallery.querySelectorAll('li');
  const parsedObject = JSON.parse(
    localStorage.getItem(activeButton.dataset['action'])
  );

  if (parsedObject && actualArray.length < parsedObject.length) {
    startLoader();

    await renderMovieCardsLibrary(
      parsedObject.slice(actualArray.length, actualArray.length + 9)
    );

    setTimeout(() => {
      stopLoader();
    }, 500);

    slowScrollOnAddCards(libraryGallery);
  }

  if (parsedObject === null || actualArray.length === parsedObject.length) {
    stopPaginationObserver();
  }
}

export function slowScrollOnAddCards(gallery) {
  const { height: cardHeight } =
    gallery.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 1,
    behavior: 'smooth',
  });
}
