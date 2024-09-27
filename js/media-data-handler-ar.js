document.addEventListener("DOMContentLoaded", function () {
  const token = "4|eJ1so9HdGTHPOzYkso2TBb04B1YxJNl294zHyIzFb446e2e9";
  const apiUrl = "https://app.oplus.dev/api/v1/gef/news/posts";

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

      // Iterate over the news articles and create the HTML structure in Arabic
      data.forEach((article) => {
        const newsHTML = `
          <div class="col-md-4">
            <div class="news" style='text-align:right'>
              <div class="news-img" style='min-height:250px'>
                <a href="single-news-ar.html?id=${
                  article.id
                }" data-triangle=".news-img-overlay">


                <div style='width:370px;height:284px; background-size: cover; background-position: center; background-image:url("${
                  article.featured_image
                }")'></div>
               

                </a>
              </div>
              <p class="news-meta">
                
                <span class="news-author" href="single-news-ar.html?id=${
                  article.id
                }">${article.author.ar}</span>
                <span>-</span>
                <a class="news-time" href="single-news-ar.html?id=${
                  article.id
                }">
                  <time datetime="${new Date(
                    article.published_at,
                  ).toISOString()}">
                    ${new Date(article.published_at).toLocaleDateString(
                      "ar-EG",
                    )}
                  </time>
                </a>
              </p>
                <h5 style='font-weight: bold' class="news-title">
                <a href="single-news-ar.html?id=${article.id}">${
          article.title.ar
        }</a>
              </h5>
              <a class="news-link" href="single-news-ar.html?id=${
                article.id
              }">اقرأ المزيد</a>
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
