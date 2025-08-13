document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = {
            name: document.getElementById("name").value.trim(),
            email: document.getElementById("email").value.trim(),
            message: document.getElementById("message").value.trim()
        };

        // Show loading feedback
        const status = document.getElementById("status");
        status.textContent = "Sending message...";
        status.style.color = "blue";

        fetch("https://eeoss-backend.onrender.com/send-message", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            status.textContent = "✅ Message sent successfully!";
            status.style.color = "green";
            form.reset();
        })
        .catch(error => {
            console.error("Error:", error);
            status.textContent = "❌ Failed to send message. Please try again later.";
            status.style.color = "red";
        });
    });
});
