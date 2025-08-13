document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");

    // ✅ Check if the form exists before attaching events
    if (!form) {
        console.warn("⚠️ Contact form not found on this page.");
        return;
    }

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        // Get form values safely
        const nameField = document.getElementById("name");
        const emailField = document.getElementById("email");
        const phoneField = document.getElementById("phone");
        const messageField = document.getElementById("message");

        if (!nameField || !emailField || !messageField) {
            alert("⚠️ Form fields are missing. Please reload the page.");
            return;
        }

        const name = nameField.value.trim();
        const email = emailField.value.trim();
        const phone = phoneField ? phoneField.value.trim() : "";
        const message = messageField.value.trim();

        // Basic validation
        if (!name || !email || !message) {
            alert("Please fill in all required fields.");
            return;
        }

        try {
            const response = await fetch("https://eeoss-backend.onrender.com/send-message", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
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
