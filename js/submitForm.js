document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#sponsor");

  form.addEventListener("submit", async (event) => {
    // Check if the form is valid
    if (!form.checkValidity()) {
      event.preventDefault(); // Prevent the form submission
      alert("Please fill in all required fields."); // Show an alert
      return;
    }

    event.preventDefault(); // Prevent the default form submission

    // Collect form data
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    try {
      // Send data to Firebase
      const response = await fetch(
        "https://sdg-signture-default-rtdb.firebaseio.com/Day1.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Form submitted successfully:", result);

      // Handle success (e.g., show a success message)
      alert("Your message has been sent successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle errors (e.g., show an error message)
      alert("There was an error sending your message. Please try again.");
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#register");

  form.addEventListener("submit", async (event) => {
    // Check if the form is valid
    if (!form.checkValidity()) {
      event.preventDefault(); // Prevent the form submission
      alert("Please fill in all required fields."); // Show an alert
      return;
    }

    event.preventDefault(); // Prevent the default form submission

    // Collect form data
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    try {
      // Send data to Firebase
      const response = await fetch(
        "https://sdg-signture-default-rtdb.firebaseio.com/Day1.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Form submitted successfully:", result);

      // Handle success (e.g., show a success message)
      alert("Your message has been sent successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle errors (e.g., show an error message)
      alert("There was an error sending your message. Please try again.");
    }
  });
});
