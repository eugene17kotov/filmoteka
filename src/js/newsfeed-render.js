import axios from 'axios';

const today = new Date().toISOString().slice(0, 10);
const lastWeeksDate = getLastWeeksDate();
const query = 'movie';
const NEWS_URL_BY_QUERY = `https://newsapi.org/v2/everything?q=${query}&from=${lastWeeksDate}&to=${today}&language=en&sortBy=relevancy&pageSize=20&page=1&apiKey=262f56bb0a9143c7aea90930d1daf721`;
const NEWS_URL_TOP_HEADLINES = `https://newsapi.org/v2/top-headlines?category=entertainment&country=us&apiKey=262f56bb0a9143c7aea90930d1daf721`;

async function getNewsFeed(url) {
  try {
    const result = await axios.get(url);
    return result.data.articles;
  } catch (error) {
    console.error(error);
  }
}

getNewsFeed(NEWS_URL_BY_QUERY).then(newsArticles => {
  renderNews(newsArticles);
});

function renderNews(news) {
  const newsFeedMarkup = news.map(item => createNewsCardMarkup(item)).join('');

  document
    .querySelector('.newsfeed')
    .insertAdjacentHTML('beforeend', newsFeedMarkup);
}

function createNewsCardMarkup(newsItem) {
  const {
    urlToImage,
    description,
    title,
    content,
    source: { name: sourceName },
    author,
    publishedAt,
    url,
  } = newsItem;

  return `<li class="news-item-card">
            <img class="news-item-image" src="${urlToImage}" alt="${description}" loading="lazy">            
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
