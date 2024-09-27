document.addEventListener("DOMContentLoaded", function() {
    const singleNewsId = new URLSearchParams(window.location.search).get('id');
    const singleNewsApiUrl = `https://app.oplus.dev/api/v1/post/${singleNewsId}`;
    const latestNewsApiUrl = 'https://app.oplus.dev/api/v1/gef/news/posts';
    const bearerToken = '4|eJ1so9HdGTHPOzYkso2TBb04B1YxJNl294zHyIzFb446e2e9';

    // Fetch the single news item based on the ID in the URL
    fetch(singleNewsApiUrl, {
      headers: {
        'Authorization': `Bearer ${bearerToken}`
      }
    })
    .then(response => response.json())
    .then(data => {
      // Remove the loading indicator for single news
      document.getElementById('single-news-loading').style.display = 'none';

      // Update the single news section with data
      document.getElementById('single-news-title').innerHTML = data.title.en;
      document.getElementById('single-news-content').innerHTML = data.content.en;
      document.getElementById('single-news-author').innerHTML = data.author.en;
      document.getElementById('single-news-date').innerHTML = new Date(data.published_at).toLocaleDateString();
      if (data.featured_image) {
        document.getElementById('single-news-image').src = data.featured_image;
      }
    })
    .catch(error => {
      console.error('Error fetching single news:', error);
      document.getElementById('single-news-loading').innerHTML = 'Failed to load news';
    });

    // Fetch the latest three news items
    fetch(latestNewsApiUrl, {
      headers: {
        'Authorization': `Bearer ${bearerToken}`
      }
    })
    .then(response => response.json())
    .then(data => {
      // Remove the loading indicator for latest news
      document.getElementById('latest-news-loading').style.display = 'none';

      const latestNews = data.slice(0, 3); // Get the first three news items
      const latestNewsContainer = document.getElementById('latest-news');

      // Loop through each news item and add it to the DOM
      latestNews.forEach(news => {
        const newsItem = `
          <div class="post-mini">
            <div class="unit">
              <div class="unit-left">
                <img src="${news.featured_image}" alt="News image" width="59" height="59"/>
              </div>
              <div class="unit-body">
                <p class="post-mini-author">by <a href="#">${news.author.en}</a></p>
                <p class="post-mini-title">
                  <a href="single-news.html?id=${news.id}">${news.title.en}</a>
                </p>
              </div>
            </div>
          </div>
        `;
        latestNewsContainer.insertAdjacentHTML('beforeend', newsItem);
      });
    })
    .catch(error => {
      console.error('Error fetching latest news:', error);
      document.getElementById('latest-news-loading').innerHTML = 'Failed to load latest news';
    });
  });