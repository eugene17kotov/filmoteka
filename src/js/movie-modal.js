
import { getMovies } from './api/fetch-movie';
import { ID_URL, BASE_IMG_URL } from './api/api-vars';
// import { BASE_IMG_URL } from './api/api-vars';

const cardModal = document.querySelector('.gallery');
const imgageContainer = document.querySelector('.image-container');
const backdrop = document.querySelector('.backdrop');

 

cardModal.addEventListener('click', clickOnMovieHandler);



// клик
 function clickOnMovieHandler(e) {
     e.preventDefault();
  
     backdrop.classList.remove('visually-hidden')
    if (e.target.nodeName !== 'IMG' && e.target.nodeName !== 'H2') {
      return;
    }
  
    let movieId = e.target.dataset.id;
    
     fetchById(movieId);
  
  }

 
  
  //Фетч фильма по ID
  async function fetchById() {
    const movieId = (await getMovies(ID_URL)).results;
    renderFilmCard(movieId);
  }

  function renderFilmCard(film) {
    imgageContainer.insertAdjacentHTML('afterbegin', modalFilmCart(film));
    
  }
  


 function modalFilmCart(movieFilm) {
    const { title, 
        name, 
        vote_average, 
        vote_count, 
        popularity, 
        original_title, 
        original_name,
        genres, 
        poster_path, } = movieFilm;  
        
        return `
        <div class="image-container">
         <img 
        src="${BASE_IMG_URL}${poster_path}"
            alt="${title} movie poster}" 
            width="240" height="357" 
            class="image"
            />
    </div>
    <div class="content">
        <h2 class="title">${name}${title}</h2>
        <div class="properties">
            <div class="titles">
                <p class="property">Vote / Votes</p>
                <p class="property">Popularity</p>
                <p class="property">Original Title</p>
                <p class="property">Genre</p>
            </div>
            <div class="values">
                <p class="value"><span class="first-mark">${vote_average}</span>&nbsp;/&nbsp;<span class="second-mark">${vote_count}</span></p>
                <p class="value">${popularity}</p>
                <p class="value">${original_title}${original_name}</p>
                <p class="value">${genres}</p>
            </div>
        </div>
        <div class="about">
            <p class="title">About</p>
            <div class="about-container">
                <p class="text">${overview}</p>
            </div>
<<<<<<< Updated upstream
   ` }
=======
        `
 }
>>>>>>> Stashed changes
