/* ==============================
   MOBILE MENU TOGGLE
============================== */
document.addEventListener("DOMContentLoaded", function () {
    const navToggle = document.querySelector("#menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (navToggle) {
        navToggle.addEventListener("click", function () {
            navLinks.classList.toggle("active");
        });
    }
});

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

/* ==============================
   WHATSAPP CLICK-TO-CHAT
============================== */
document.addEventListener("DOMContentLoaded", function () {
    const whatsappBtn = document.querySelector("#whatsapp-btn");

    if (whatsappBtn) {
        whatsappBtn.addEventListener("click", function () {
            const phoneNumber = "2348103859169"; // Replace with EEOSS WhatsApp number
            const defaultMessage = encodeURIComponent("Hello, I’d like to inquire about your services.");
            window.open(`https://wa.me/${phoneNumber}?text=${defaultMessage}`, "_blank");
        });
    }
});

// ===== MOBILE MENU TOGGLE =====
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle) {
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("show");
    });
}

// ===== FLOATING WHATSAPP BUTTON =====
const whatsappBtn = document.querySelector(".whatsapp-float");

if (whatsappBtn) {
    whatsappBtn.addEventListener("click", () => {
        const phoneNumber = "2348103859169"; // Replace with EEOSS WhatsApp number (no + or spaces)
        const message = encodeURIComponent("Hello EEOSS, I would like to inquire about your services.");
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
    });
}
