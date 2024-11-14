import { _SERVER_URI, _TOKEN } from "./API_config.js";

document.addEventListener("DOMContentLoaded", () => {
  function showAlert(message) {
    // Set the alert message
    alertDiv.innerHTML = `
    <button class="x">x</button>
    Error: <br />
    ${message}
  `;

    // Show the 'over' and 'alert' divs by adding the 'show' class
    overDiv.classList.add("show");
    alertDiv.classList.add("show");
    const closeButton = document.querySelector(".x");
    // Event listener for the close button
    if (closeButton) {
      closeButton.addEventListener("click", () => {
        // Remove the 'show' class from 'over' and 'alert' divs
        overDiv.classList.remove("show");
        alertDiv.classList.remove("show");
      });
    }
  }
  // Select the elements with class 'over' and 'alert'
  const overDiv = document.querySelector(".over");
  const alertDiv = document.querySelector(".alert");

  // Handle sponsor form submission
  const sponsorForm = document.querySelector("#sponsor");
  if (sponsorForm) {
    sponsorForm.addEventListener("submit", async (event) => {
      // Handle sponsor form submission
      await handleSubmit(event, sponsorForm, "sponsors");
    });
  }

  // Handle register form submission
  const registerForm = document.querySelector("#register");
  if (registerForm) {
    registerForm.addEventListener("submit", async (event) => {
      // Handle register form submission
      await handleSubmit(event, registerForm, "reg");
    });
  }

  // Common function to handle form submission with dynamic API endpoint
  async function handleSubmit(event, form, formType) {
    // Validation for English-only characters in the "name" field
    const nameField = form.querySelector("input[name='name']");
    const englishPattern = /^[A-Za-z\s]+$/;

    if (nameField && !englishPattern.test(nameField.value)) {
      showAlert("Name must be in English for badge printing.");
      return;
    }

    if (!form.checkValidity()) {
      showAlert("Please fill in all required fields.");
      return;
    }

    event.preventDefault();

    // Disable the submit button temporarily
    const submitButton = form.querySelector("button[type='submit']");
    submitButton.disabled = true;
    setTimeout(() => {
      submitButton.disabled = false;
    }, 5000);

    // Collect form data and prepare the payload
    const formData = new FormData(form);
    const fields = Object.fromEntries(formData.entries());
    const data = {
      event: "gef",
      form: formType,
      fields,
    };

    console.log("Posting JSON data:", JSON.stringify(data));

    try {
      // Send the form data to the API endpoint with the Bearer token using axios
      const response = await axios.post(`${_SERVER_URI}/api/v1/entries`, data, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${_TOKEN}`,
        },
      });

      console.log("Form submitted successfully:", response.data);

      // Redirect based on current page language (Arabic or English)
      const redirectPage = window.location.href.includes("-ar.html")
        ? "thanks-ar.html"
        : "thanks.html";
      window.location.href = redirectPage;
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 2xx
        console.log("Error response:", error.response);
        if (error.response.status === 422) {
          const errorResponse = error.response.data;
          if (errorResponse.errors && errorResponse.errors["fields.email"]) {
            showAlert(
              "The email address you provided has already been registered for the event.",
            );
          } else {
            showAlert(
              "Please ensure all information is correct and try again.",
            );
          }
        } else {
          showAlert("An error occurred. Please try again.");
        }
      } else if (error.request) {
        // Request was made but no response was received
        console.error("No response received:", error.request);
        showAlert("Network error. Please check your connection and try again.");
      } else {
        // Error setting up the request
        console.error("Error:", error.message);
        showAlert("An unexpected error occurred. Please try again later.");
      }
    }
  }
});
