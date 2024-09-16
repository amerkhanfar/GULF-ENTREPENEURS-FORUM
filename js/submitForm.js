document.addEventListener("DOMContentLoaded", () => {
  // Handle sponsor form submission
  const sponsorForm = document.querySelector("#sponsor");
  if (sponsorForm) {
    sponsorForm.addEventListener("submit", async (event) => {
      // For now, using the same API for testing
      handleSubmit(event, sponsorForm, "./submit.php"); 
    });
  }

  // Handle register form submission
  const registerForm = document.querySelector("#register");
  if (registerForm) {
    registerForm.addEventListener("submit", async (event) => {
      // For now, using the same API for testing
      handleSubmit(event, registerForm, "./submit.php"); 
    });
  }

  // Common function to handle form submission with dynamic API endpoint
  async function handleSubmit(event, form, apiUrl) {
    if (!form.checkValidity()) {
      event.preventDefault(); 
      alert("Please fill in all required fields.");
      return;
    }

    event.preventDefault();

    // Collect form data
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    try {
      // Send data to dynamic API endpoint
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Form submitted successfully:", result);
      alert("Your message has been sent successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error sending your message. Please try again.");
    }
  }
});
