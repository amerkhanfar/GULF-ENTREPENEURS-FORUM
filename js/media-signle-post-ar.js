import { _SERVER_URI,_TOKEN } from "./API_config.js";
document.addEventListener("DOMContentLoaded", function () {
  const singleNewsId = new URLSearchParams(window.location.search).get("id");
  const singleNewsApiUrl = `${_SERVER_URI}/api/v1/post/${singleNewsId}`;
  const latestNewsApiUrl = `${_SERVER_URI}/api/v1/gef/news/posts`;
  const bearerToken = _TOKEN;

  // Fetch the single news item based on the ID in the URL (Arabic)
  fetch(singleNewsApiUrl, {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // Remove the loading indicator for single news
      document.getElementById("single-news-loading-ar").style.display = "none";

      // Update the single news section with Arabic data
      document.getElementById("single-news-title-ar").innerHTML = data.title.ar;
      document.getElementById("single-news-content-ar").innerHTML =
        data.content.ar;
      document.getElementById("single-news-author-ar").innerHTML =
        data.author.ar;
      document.getElementById("single-news-date-ar").innerHTML = new Date(
        data.published_at,
      ).toLocaleDateString("ar-EG");
      if (data.featured_image) {
        document.getElementById("single-news-image-ar").src =
          _SERVER_URI+'/storage/'+data.featured_image;
      }
    })
    .catch((error) => {
      console.error("Error fetching single news (Arabic):", error);
      document.getElementById("single-news-loading-ar").innerHTML =
        "فشل تحميل الخبر";
    });

  // Fetch the latest three news items (Arabic)
  fetch(latestNewsApiUrl, {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // Remove the loading indicator for latest news
      document.getElementById("latest-news-loading-ar").style.display = "none";

      const latestNews = data.slice(0, 3); // Get the first three news items
      const latestNewsContainer = document.getElementById("latest-news-ar");

      // Loop through each news item and add it to the DOM in Arabic
      latestNews.forEach((news) => {
        const newsItem = `
          <div class="post-mini">
            <div class="unit">
             <a href="single-news-ar.html?id=${news.id}" style='text-align: right;'>
              <div class="unit-left">
                <img src="${_SERVER_URI+"/storage/"+news.featured_image}" alt="News image" width="59" height="59"/>
              </div>
              </a>
              <div class="unit-body" style='text-align: right;'>
                <p class="post-mini-author">بواسطة <a href="#">${news.author.ar}</a></p>
                <p class="post-mini-title">
                  <a href="single-news-ar.html?id=${news.id}">${news.title.ar}</a>
                </p>
              </div>
            </div>
          </div>
        `;
        latestNewsContainer.insertAdjacentHTML("beforeend", newsItem);
      });
    })
    .catch((error) => {
      console.error("Error fetching latest news (Arabic):", error);
      document.getElementById("latest-news-loading-ar").innerHTML =
        "فشل تحميل الأخبار";
    });
});
