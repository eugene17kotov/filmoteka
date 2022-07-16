import {getMovies} from "./api/fetch-movie";
// import {createMovieMarkup} from "./create-movie-markup";
import {renderMovieCards} from "./render-movie-cards";
import { API_KEY, BASE_URL, TREND_URL, SEARCH_URL, ID_URL,  BASE_IMG_URL } from "./api/api-vars";

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

    function readyMarkup (url) {
        getMovies(url)
        .then(response => {
            renderMovieCards(response.results)
        })
    }




    
    
