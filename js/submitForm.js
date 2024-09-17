document.addEventListener("DOMContentLoaded", () => {
  // Handle sponsor form submission
  const sponsorForm = document.querySelector("#sponsor");
  if (sponsorForm) {
    sponsorForm.addEventListener("submit", async (event) => {
      // Handle sponsor form submission
      await handleSubmit(event, sponsorForm, "Day1.json", "sponsor");
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
    if (!form.checkValidity()) {
      event.preventDefault();
      alert("Please fill in all required fields.");
      return;
    }

    event.preventDefault();

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
      const response = await fetch("https://app.oplus.dev/api/v1/entries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization":
            "Bearer 2|4ugZh0cevSwEfQgDG4ATvf9otHF01xrlFJ7twNIjc885be21", // Token with Bearer prefix
        },
        body: JSON.stringify(data), // Ensure data is sent as JSON string
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
