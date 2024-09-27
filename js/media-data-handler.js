import { _SERVER_URI ,_TOKEN} from "./API_config.js";
document.addEventListener("DOMContentLoaded", function () {
  const token = _TOKEN;
  const apiUrl = `${_SERVER_URI}/api/v1/gef/news/posts`;

  // Fetch the news from the API
  fetch(apiUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const newsContainer = document.getElementById("news-container");

      // Iterate over the news articles and create the HTML structure in English
      data.forEach((article) => {
        const newsHTML = `
          <div class="col-md-4">
            <div class="news">
              <div class="news-img" style='min-height:250px'>
                <a href="single-news.html?id=${
                  article.id
                }" data-triangle=".news-img-overlay">
                  <span class="news-img-overlay"></span>
                  <div style='width:370px;height:284px; background-size: cover; background-position: center; background-image:url("${
                    _SERVER_URI+'/storage/'+article.featured_image
                  }")'></div>
                </a>
              </div>
              <p class="news-meta">
                by
                <span class="news-author">${article.author.en}</span>
                <span>-</span>
                <a class="news-time" href="single-news.html?id=${article.id}">
                  <time datetime="${new Date(
                    article.published_at,
                  ).toISOString()}">
                    ${new Date(article.published_at).toLocaleDateString(
                      "en-GB",
                    )}
                  </time>
                </a>
              </p>
              <h5 style='font-weight: bold' class="news-title">
                <a href="single-news.html?id=${article.id}">${
          article.title.en
        }</a>
              </h5>
              <a class="news-link" href="single-news.html?id=${
                article.id
              }">Read More</a>
            </div>
          </div>
        `;

        // Append each article to the container
        newsContainer.innerHTML += newsHTML;
      });
    })
    .catch((error) => {
      console.error("Error fetching news:", error);
    });
});
