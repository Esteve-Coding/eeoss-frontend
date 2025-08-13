document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const message = document.getElementById("message").value.trim();

        // Basic validation
        if (!name || !email || !message) {
            alert("Please fill in all required fields.");
            return;
        }

        try {
            const response = await fetch("https://eeoss-backend.onrender.com/send-message", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, phone, message }),
            });

            const result = await response.json();

            if (response.ok) {
                alert("✅ Your message has been sent successfully!");
                form.reset();
            } else {
                alert("❌ Failed to send message: " + (result.error || "Unknown error"));
            }
        } catch (error) {
            console.error("Error:", error);
            alert("❌ Unable to send message. Please try again later.");
        }
    });
});
