import { _SERVER_URI, _TOKEN } from "./API_config.js";
document.addEventListener("DOMContentLoaded", () => {
  // Handle sponsor form submission
  const sponsorForm = document.querySelector("#sponsor");
  if (sponsorForm) {
    sponsorForm.addEventListener("submit", async (event) => {
      // Handle sponsor form submission
      await handleSubmit(event, sponsorForm, "Day1.json", "sponsors");
    });
  }

  // Handle register form submission
  const registerForm = document.querySelector("#register");
  if (registerForm) {
    registerForm.addEventListener("submit", async (event) => {
      // Handle register form submission
      await handleSubmit(event, registerForm, "Day2.json", "reg");
    });
  }

  // Common function to handle form submission with dynamic API endpoint
  async function handleSubmit(event, form, endpoint, formType) {
    // Validate the "name" field to ensure it contains only English characters
    const nameField = form.querySelector("input[name='name']");
    const englishPattern = /^[A-Za-z\s]+$/;

    if (nameField && !englishPattern.test(nameField.value)) {
      alert("Name must be in English For Badge Printing");
      return; // Prevent form submission if validation fails
    }

    if (!form.checkValidity()) {
      alert("Please fill in all required fields.");
      return;
    }

    event.preventDefault();

    // Disable the submit button for 5 seconds
    const submitButton = form.querySelector("button[type='submit']");
    submitButton.disabled = true;

    // Re-enable the submit button after 5 seconds
    setTimeout(() => {
      submitButton.disabled = false;
    }, 5000);

    // Collect form data
    const formData = new FormData(form);
    const fields = {};
    formData.forEach((value, key) => {
      fields[key] = value;
    });

    // Create the data structure as specified
    const data = {
      event: "gef",
      form: formType,
      fields,
    };

    // Print JSON data to the console
    console.log("Posting JSON data:", JSON.stringify(data));

    try {
      // Send data to the specified API endpoint with a Bearer token
      const response = await fetch(`${_SERVER_URI}/api/v1/entries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${_TOKEN}`, // Token with Bearer prefix
        },
        body: JSON.stringify(data), // Ensure data is sent as JSON string
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Form submitted successfully:", result);

      // Redirect based on the current URL
      const currentUrl = window.location.href;
      if (currentUrl.includes("-ar.html")) {
        // Redirect to Arabic thanks page for Arabic versions
        window.location.href = "thanks-ar.html";
      } else {
        // Redirect to default thanks page for English versions
        window.location.href = "thanks.html";
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error sending your message. Please try again.");
    }
  }
});
