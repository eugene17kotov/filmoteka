import {getMovies} from "./api/fetch-movie";
import {renderMovieCards} from "./render-movie-cards";

const paginationWrapRef = document.querySelector(".pagination-wrap");
const loader = document.querySelector(".backdrop-loader");

export function renderPagination(currentPage, totalPages) {
    let buttons = [];

    if (currentPage > 1) {
        buttons.push(createButton(currentPage - 1, true, "arrow-left"));
    }

    if (currentPage >= 4) {
        buttons.push(createButton(1, true, "first-button"));
    }

    if (currentPage >= 5) {
        buttons.push(createDotsEl());
    }

    if (currentPage >= 2) {
        if (currentPage >= 3) {
            buttons.push(createButton(currentPage-2))
        }
        buttons.push(createButton(currentPage-1));
    }

    buttons.push(createButton(currentPage, false));

    if (currentPage <= totalPages-1) {
        buttons.push(createButton(currentPage+1));
        if (currentPage <= totalPages-2) {
            buttons.push(createButton(currentPage+2));
        }
    }

    if (currentPage < totalPages-3) {
        buttons.push(createDotsEl());
    }

    if (currentPage <= totalPages-3) {
        buttons.push(createButton(totalPages, true, "last-button"));
    }

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

function createDotsEl() {
    const newDotsEl = document.createElement("span");
    newDotsEl.innerHTML = `<span class="dots">...</span>`;
    return newDotsEl;
}

function createButton(pageNum, isButtonClickable = true, additionalClass = null) {
    const newButton = createBaseButton();
    newButton.dataset["page"] = pageNum;
    newButton.textContent = additionalClass && additionalClass.includes("arrow")  ? "" : pageNum;

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

    loader.classList.remove('backdrop-loader--is-hidden');

    getMovies(newUrl)
        .then(response => {
        loader.classList.add('backdrop-loader--is-hidden');
        renderMovieCards(response.results);
        renderPagination(response.page, response.total_pages);
    })
}
