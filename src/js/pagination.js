import {getMovies} from "./api/fetch-movie";
import { API_KEY, BASE_URL, TREND_URL, SEARCH_URL, ID_URL } from "./api/api-vars";

const paginationWrapRef = document.querySelector(".pagination-wrap");
const arrowLeftBtnRef = document.querySelector(".arrow-left");
const arrowRightBtnRef = document.querySelector(".arrow-right");
const dotsBeforeRef = document.querySelector("#before");
const dotsAfterRef = document.querySelector("#after");
const firstBtnRef = document.querySelector(".first-button");
const lastBtnRef = document.querySelector(".last-button");
const btnOneRef = document.querySelector("[data-index='1']");
const btnSecondRef = document.querySelector("[data-index='2']");
const btnThirdRef = document.querySelector("[data-index='3']");
const btnFourthRef = document.querySelector("[data-index='4']");
const btnFifthRef = document.querySelector("[data-index='5']");

const galleryRef = document.querySelector(".gallery");
const IMAGE_URL = "https://image.tmdb.org/t/p/w200";

getMovies(TREND_URL)
.then(response => 
galleryRef.insertAdjacentHTML("afterbegin", buildMarkup(response.results)));

function buildMarkup (responseFromServer) {
  return responseFromServer.map( ({poster_path}) =>
  `<a class="gallery__link" href="">
        <img class="gallery__image" src="${IMAGE_URL}${poster_path}" alt="" loading="lazy" />
    </a>
    <div class="info">
        <p class="info__item">Name</p>
        <div class="info-detail">
            <p class="info-detail__item">Genres</p>
            <p class="info-detail__item">Year</p>
        </div>
    </div>`).join("");
}

