import { API_KEY, BASE_URL, TREND_URL, SEARCH_URL, ID_URL } from './api/api-vars';
import {getMovies} from './api/fetch-movie.js';


export function searchMovies(movie) {
    return getMovies(
        `${SEARCH_URL}?api_key=${API_KEY}&query=${movie}`
    ); 
}

