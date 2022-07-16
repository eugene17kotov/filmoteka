import {getMovies} from "./api/fetch-movie";
import {renderMovieCards} from "./render-movie-cards";
import { API_KEY, BASE_URL, TREND_URL, SEARCH_URL, ID_URL,  BASE_IMG_URL, LAST_REQUESTED_URL} from "./api/api-vars";

const paginationWrapRef = document.querySelector(".pagination-wrap");
// const arrowLeftBtnRef = document.querySelector(".arrow-left");
// const arrowRightBtnRef = document.querySelector(".arrow-right");
// const dotsBeforeRef = document.querySelector("#before");
// const dotsAfterRef = document.querySelector("#after");
// const firstBtnRef = document.querySelector(".first-button");
// const lastBtnRef = document.querySelector(".last-button");
// const btnOneRef = document.querySelector("[data-index='1']");
// const btnSecondRef = document.querySelector("[data-index='2']");
// const btnThirdRef = document.querySelector("[data-index='3']");
// const btnFourthRef = document.querySelector("[data-index='4']");
// const btnFifthRef = document.querySelector("[data-index='5']");
export function renderPagination(currentPage, totalPages) {
    let buttons = [];

    if (currentPage > 1) {
        buttons.push(createButton(currentPage - 1, true, "arrow-left"));
    }

    buttons.push(createDotsButton());

    buttons.push(createButton(currentPage, false));

    buttons.push(createDotsButton());

    if (currentPage < totalPages) {
        buttons.push(createButton(currentPage + 1, true, "arrow-right"));
    }

    paginationWrapRef.innerHTML = "";

    buttons.forEach(button => paginationWrapRef.append(button));
}

function createBaseButton () {
    const baseButton = document.createElement("button");
    baseButton.classList.add("pagination-button");
    return baseButton;
}

function createDotsButton() {
    const newButton = createBaseButton();
    newButton.innerHTML = `<span class="dots">...</span>`;
    return newButton;
}

function createButton(pageNum, isButtonClickable = true, additionalClass = null) {
    const newButton = createBaseButton();
    newButton.dataset["page"] = pageNum;
    newButton.textContent = additionalClass ? "" : pageNum;

    if (additionalClass) {
        newButton.classList.add(additionalClass);
    }

    if (isButtonClickable) {
        newButton.addEventListener("click", pageButtonPressed);
    } else {
        newButton.classList.add("pagination-button--current");
    }

    return newButton;
}

function pageButtonPressed(event) {
    const page = event.target.dataset.page;
    const lastUrl = localStorage.getItem("LAST_REQUESTED_URL");
    const newUrl = `${lastUrl}&page=${page}`;

    getMovies(newUrl)
    .then (response => {
        renderMovieCards(response.results);
        renderPagination(response.page, response.total_pages);
    })
}




    
// export function renderPagination(currentPage, totalPages) {
//     // init empty buttons array
//     buttons = [];

//     // check and generate button for prev page with event listener and additional class
//     if (currentPage > 1) {
//         buttons.push(createButton(currentPage-1, true, "arrow-left"));
//     }

//     // generate button for current page without event listener
//     buttons.push(createButton(currentPage, false));

//     // check and generate button for next page with event listener and additional class
//     if (currentPage < totalPages) {
//         buttons.push(createButton(currentPage+1, true, "arrow-right"));
//     }

//     // clear old buttons 
//     paginationWrapRef.innerHTML="";
//     // show new buttons
//     buttons.forEach(button => paginationWrapRef.append(button));
// }

// function createButton(pageNum, addListener=true, typeClass=null) {
//     newButton = document.createElement("button")
//     newButton.classList.add("pagination-button");
//     newButton.dataset['page']=pageNum;
//     newButton.textContent = typeClass ? "" : pageNum;  // show pageNum on button if it is without arrows
//     if (typeClass) { newButton.classList.add(typeClass) }   // add class with arrow if it specified
//     if (!addListener) { newButton.classList.add("pagination-button--current"); }    // add class for current page button
//     if (addListener) {newButton.addEventListener("click", pageButtonPressed);}  // add event listener if it is not current page button
//     return newButton;
// }

// function pageButtonPressed(event) {
//     // get needed page from pressed button dataset
//     page = event.target.dataset.page;
 
//     // create new url for last request with page number
//     lastUrl = localStorage.getItem('LAST_REQUESTED_URL');
//     newUrl = lastUrl + "&page=" + page;

//     // get new results and render them
//     getMovies(newUrl)
//     .then(response => {
//         renderMovieCards(response.results);
//         renderPagination(response.page, response.total_pages);
//     })
// }
