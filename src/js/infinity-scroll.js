// логика: когда observer срабатывает запускается проверка сколько элементов уже есть на странице, сколько есть в локал стораж и соответственно подгружается указанное количество с локал стораджа и проверка снова повторяется когда обсервер снова срабатвает //
import {libraryGallery} from "./queue";
import {fetchById} from "./queue";
import {renderMovieCardsLibrary} from "./queue";



const options = {
  rootMargin: "10%",
  threshold: 1.0
}

const observer = new IntersectionObserver(paginateFromLocalStorage, options);

observer.observe(document.querySelector(".scroll-guard"));

function paginateFromLocalStorage(entries) {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      
      addNewEl();
    }
  })
}
const actualArray = libraryGallery.querySelectorAll('li');
console.log(actualArray.length);
const parsedObject = JSON.parse(localStorage.getItem("queue"));
console.log(parsedObject.length);

function addNewEl () {
  if ( actualArray.length < parsedObject.length ) {
    console.log(actualArray.length);
    parsedObject.slice(actualArray.length, 6).map(movieID => {
      // console.log(movieID)
      fetchById(movieID)
      .then(res => {
        renderMovieCardsLibrary(res);
      });
    });
  }
}
