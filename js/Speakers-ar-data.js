import { _SERVER_URI, _TOKEN } from "./API_config.js";

const token = _TOKEN;
const apiUrl = `${_SERVER_URI}/api/v1/gef/speakers`; // Update the endpoint to fetch speakers if needed

// Function to append speaker information
function appendSpeakers(speakers) {
  const container = document.getElementById("speakers-containter");

  speakers.forEach((speaker) => {
    const arabicName = speaker.name.ar || "No name available";
    const arabicPosition = speaker.position.ar || "No position available";
    const speakerImage = `${_SERVER_URI}${speaker.photo}`
      ? `${_SERVER_URI}${speaker.photo}`
      : "images/default-speaker.jpg"; // Default image if not available

    // Create speaker HTML
    const speakerDiv = `
      <div class="col-md-6 col-lg-4">
        <div class="speaker">
          <div class="speaker-img" data-triangle=".speaker-overlay">
            <div class="speaker-overlay"></div>
            <a href="#">
              <div class="speakers-image" style="background-image: url(${speakerImage})"></div>
            </a>
          </div>
          <h5 class="speaker-title">
            <a href="#">${arabicName}</a>
          </h5>
          <p class="speaker-position">${arabicPosition}</p>
        </div>
      </div>`;

    // Append the speaker HTML to the container
    container.insertAdjacentHTML("beforeend", speakerDiv);
  });
}

// Fetch data from the API
fetch(apiUrl, {
  method: "GET",
  headers: {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json",
  },
})
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    console.log(data); // Log the data to see the structure
    appendSpeakers(data); // Call the function to append speakers to the container
  })
  .catch((error) => console.error("Error fetching data:", error));
