import axios from 'axios';

<<<<<<< HEAD
const today = new Date().toISOString().slice(0, 10);
const lastWeeksDate = getLastWeeksDate();
const query = 'movie';
const NEWS_URL_BY_QUERY = `https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/everything?q=${query}&from=${lastWeeksDate}&to=${today}&language=en&sortBy=relevancy&pageSize=20&page=1&apiKey=262f56bb0a9143c7aea90930d1daf721`;
const NEWS_URL_TOP_HEADLINES = `https://newsapi.org/v2/top-headlines?category=entertainment&country=us&apiKey=262f56bb0a9143c7aea90930d1daf721`;
=======
const regex = /[0-9]/g;
const today = new Date().toISOString().slice(0, 10).match(regex).join('');
const lastWeeksDate = getLastWeeksDate().match(regex).join('');
let page = 0;
const NEWS_URL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=movie&begin_date=${lastWeeksDate}&end_date=${today}&fq=Movies&page=${page}&sort=relevance&api-key=7V2Mdku3K6jAwbEoNcKctzHC7q7RRQcQ`;
const BASE_NEWS_IMG_URL = 'https://static01.nyt.com/';
>>>>>>> dev

async function getNewsFeed(url) {
  try {
    const result = await axios.get(url);

    return result.data.response;
  } catch (error) {
    console.error(error);
  }
}

getNewsFeed(NEWS_URL).then(newsArticles => {
  renderNews(newsArticles.docs);
});

function renderNews(news) {
  const newsFeedMarkup = news.map(item => createNewsCardMarkup(item)).join('');

  document
    .querySelector('.newsfeed')
    .insertAdjacentHTML('beforeend', newsFeedMarkup);
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
                <a class="news-item-btn" href="${url}" target="_blank"><button type="button">Read more</button></a>
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
