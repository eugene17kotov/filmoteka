import axios from 'axios';

const regex = /[0-9]/g;
const today = new Date().toISOString().slice(0, 10).match(regex).join('');
const lastWeeksDate = getLastWeeksDate().match(regex).join('');
let page = 0;
let newsCountBySearch = 0;
let newsCountStartOnPage = 0;
let NEWS_URL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=movie&begin_date=${lastWeeksDate}&end_date=${today}&fq=Movies&sort=relevance&api-key=7V2Mdku3K6jAwbEoNcKctzHC7q7RRQcQ`;
const BASE_NEWS_IMG_URL = 'https://static01.nyt.com/';
const newsfeedGallery = document.querySelector('.newsfeed');

async function getNewsFeed(url, page) {
  const urlWithPagePagination = `${url}&page=${page}`;

  try {
    const result = await axios.get(urlWithPagePagination);

    return result.data.response;
  } catch (error) {
    console.error(error);
  }
}

getNewsFeed(NEWS_URL, page).then(newsArticles => {
  renderNews(newsArticles.docs);

  newsCountBySearch = newsArticles.meta.hits;
  newsCountStartOnPage = newsArticles.meta.offset + 10;

  console.log('Hits:', newsArticles.meta.hits);
  console.log('Offset:', newsArticles.meta.offset);
});

function renderNews(news) {
  const newsFeedMarkup = news.map(item => createNewsCardMarkup(item)).join('');

  newsfeedGallery.insertAdjacentHTML('beforeend', newsFeedMarkup);
}

function createNewsCardMarkup(newsItem) {
  const {
    byline: { original: author = 'Anonymous' },
    pub_date: publishedAt,
    headline: { main: title },
    source: sourceName,
    snippet: description,
    web_url: url,
    multimedia,
    lead_paragraph: content,
  } = newsItem;

  const img = multimedia.find(item => /blog/.test(item.subtype));
  let newsImg = '';
  if (!img) {
    newsImg = 'https://picsum.photos/400/300';
  } else {
    newsImg = BASE_NEWS_IMG_URL + img.url;
  }

  return `<li class="news-item-card">
            <img class="news-item-image" src="${newsImg}" alt="${description}" loading="lazy">            
            <div class="news-item-content-wrapper">
                <h2 class="news-item-title">${title}</h2>
                <p class="news-item-description"><b>Overview: </b>${description}</p>
                <p class="news-item-content">${content}</p>
                <a class="news-item-btn" href="${url}" target="_blank"><button type="button" class="news-btn">Read more</button></a>
                <p class="news-item-source"><b>Source: </b>${sourceName}</p>
                <p class="news-item-author"><b>Author: </b>${author}</p>
                <p class="news-item-date"><b>Published At: </b>${publishedAt}</p>
            </div>
          </li>`;
}

function getLastWeeksDate() {
  const now = new Date();

  return new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7)
    .toISOString()
    .slice(0, 10);
}

const scrollGuardRef = document.querySelector('.scroll-guard');

const options = {
  rootMargin: '250px',
  threshold: 1.0,
};

function getStartObserver(entries) {
  entries.forEach(entry => {
    if (newsCountBySearch <= newsCountStartOnPage) {
      const endScrollText =
        '<p class="end-scroll-text">No more news this week</p>';
      document.querySelector('.end-scroll-text-container').innerHTML =
        endScrollText;
      return;
    }

    if (entry.isIntersecting) {
      console.log('Page before:', page);
      page += 1;
      console.log('Page after:', page);

      getNewsFeed(NEWS_URL, page).then(newsArticles => {
        renderNews(newsArticles.docs);

        slowScrollOnAddPhotos();

        newsCountBySearch = newsArticles.meta.hits;
        newsCountStartOnPage = newsArticles.meta.offset + 10;

        console.log('Hits:', newsArticles.meta.hits);
        console.log('Offset:', newsArticles.meta.offset);
      });
    }
  });
}

const observer = new IntersectionObserver(getStartObserver, options);

setTimeout(() => {
  observer.observe(scrollGuardRef);
}, 1000);

function slowScrollOnAddPhotos() {
  const { height: cardHeight } =
    newsfeedGallery.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 1,
    behavior: 'smooth',
  });
}
