import { _SERVER_URI, _TOKEN } from "./API_config.js";

const token = _TOKEN;
const apiUrl = `${_SERVER_URI}/api/v1/gef/agenda`;

// Function to render the schedule based on the session type
function renderSession(session, parentDiv) {
  const startTime = session.duration.start;
  const endTime = session.duration.end;
  const title = session.title.en;

  let sessionDiv;
  if (session.session_type === "keynote") {
    // Create schedule-classic for keynote sessions
    sessionDiv = `
            <div class="schedule-classic schedule-classic-simple">
                <div class="schedule-classic-content">
                    <div class="schedule-classic-img">
                        <svg class="svg-icon-md svg-icon-primary" role="img">
                            <use xlink:href="images/svg/sprite.svg#clock"></use>
                        </svg>
                    </div>
                    <span class="schedule-classic-time">${startTime} am to ${endTime} am</span>
                    <span class="schedule-classic-title heading-4">${title}</span>
                </div>
            </div>`;
  } else if (session.session_type === "panel") {
    // Generate unique IDs for the accordion functionality
    const headId = `accordion1-card-head-${Math.random()
      .toString(36)
      .substring(7)}`;
    const bodyId = `accordion1-card-body-${Math.random()
      .toString(36)
      .substring(7)}`;

    // Process the description to add line breaks
    const description =
      session.description.en !== "Null"
        ? session.description.en.replace(/(?<!H\.E)(\.|:)(?!\w)/g, "<br>")
        : "No description available";

    // Create card for panel discussion sessions
    sessionDiv = `
            <article class="card card-custom card-corporate">
                <div class="card-header" role="tab" id="${headId}">
                    <div class="card-title">
                        <a class="collapsed" 
                           data-toggle="collapse" 
                           data-parent="#accordion1" 
                           href="#${bodyId}" 
                           aria-controls="${bodyId}" 
                           aria-expanded="false" 
                           role="button">
                            <span class="schedule-classic">
                                <span class="unit unit-spacing-md align-items-center d-block d-md-flex">
                                    <span class="unit-body">
                                        <span class="schedule-classic-content">
                                            <span class="schedule-classic-time">${startTime} am to ${endTime} am</span>
                                            <span class="schedule-classic-title heading-4">${title}</span>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </a>
                    </div>
                </div>
                <div class="collapse" id="${bodyId}" role="tabpanel" aria-labelledby="${headId}">
                    <div class="card-body">
                        <p>Description: ${description}</p>
                    </div>
                </div>
            </article>`;
  }

  // Insert the session HTML into the parent div
  parentDiv.insertAdjacentHTML("beforeend", sessionDiv);
}

// Function to process and display the data
function displaySchedule(data) {
  // Get the first elements with class names tabs-1-1 and tabs-1-2
  const tabs1_1 = document.querySelector(".tabs-1-1");
  const tabs1_2 = document.querySelector(".tabs-1-2");

  // Loop through the sessions and distribute them to the correct tab by day
  Object.keys(data).forEach((day) => {
    data[day].forEach((session) => {
      if (day === "1") {
        renderSession(session, tabs1_1);
      } else if (day === "2") {
        renderSession(session, tabs1_2);
      }
    });
  });
}

// Fetch data from the API with token authentication
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
    console.log(data);
    displaySchedule(data);
  })
  .catch((error) => console.error("Error fetching data:", error));
