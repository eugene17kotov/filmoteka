import {libraryGallery} from "./queue";
import {fetchByIds} from "./queue";
import {renderMovieCardsLibrary} from "./queue";

export const options = {
  rootMargin: "250px",
  threshold: 1.0
}

const observer = new IntersectionObserver(scrollPagination, options);

export function startPaginationObserver() {
  observer.observe(document.querySelector(".scroll-guard"));
}

export function stopPaginationObserver() {
  observer.unobserve(document.querySelector(".scroll-guard"));
}

function scrollPagination(entries) {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      addNewCards();
      slowScrollOnAddCards();
    }
  })
}
function addNewCards () {
  const activeButton = document.querySelector(".library__item-btn--active");
  const actualArray = libraryGallery.querySelectorAll("li");
  const parsedObject = JSON.parse(localStorage.getItem(activeButton.dataset['action']));
  
  if (parsedObject && actualArray.length < parsedObject.length) {
    fetchByIds(parsedObject.slice(actualArray.length, actualArray.length + 3)).then(movies => {
      movies.forEach(movie => renderMovieCardsLibrary(movie));
    })
  }

  if (parsedObject === null || actualArray.length === parsedObject.length) {
      observer.unobserve(document.querySelector(".scroll-guard"));
  }
}

function slowScrollOnAddCards() {
  const { height: cardHeight } =
    libraryGallery.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 1,
    behavior: 'smooth',
  });
}