// Prestige University — Frontend interactions
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".menu");
  const nav = document.getElementById("nav");

  // ==============================
  // MOBILE NAVIGATION
  // ==============================

  if (menuButton && nav) {
    menuButton.setAttribute("aria-expanded", "false");

    menuButton.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (event) => {
      if (
        nav.classList.contains("open") &&
        !nav.contains(event.target) &&
        !menuButton.contains(event.target)
      ) {
        nav.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Close menu with Escape
  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      nav &&
      nav.classList.contains("open")
    ) {
      nav.classList.remove("open");

      if (menuButton) {
        menuButton.setAttribute("aria-expanded", "false");
      }
    }
  });

  // ==============================
  // ADMISSION FORM
  // ==============================

  const applicationForm = document.getElementById("application");

  if (applicationForm) {
    applicationForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const data = Object.fromEntries(
        new FormData(applicationForm)
      );

      try {
        localStorage.setItem(
          "prestige_application",
          JSON.stringify({
            ...data,
            submittedAt: new Date().toISOString()
          })
        );
      } catch (error) {
        console.warn(
          "Could not save application locally.",
          error
        );
      }

      showMessage(
        applicationForm,
        "Application received successfully. This is currently a frontend demo."
      );

      applicationForm.reset();
    });
  }

  // ==============================
  // CONTACT FORM
  // ==============================

  const contactForm = document.getElementById("contact");

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const data = Object.fromEntries(
        new FormData(contactForm)
      );

      try {
        localStorage.setItem(
          "prestige_contact",
          JSON.stringify({
            ...data,
            submittedAt: new Date().toISOString()
          })
        );
      } catch (error) {
        console.warn(
          "Could not save contact message locally.",
          error
        );
      }

      showMessage(
        contactForm,
        "Your message has been received. Backend submission will be connected later."
      );

      contactForm.reset();
    });
  }

  // ==============================
  // STUDENT LOGIN
  // ==============================

  const loginForm = document.getElementById("login");

  if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const emailInput = document.getElementById("email");

      const email = emailInput
        ? emailInput.value.trim()
        : "";

      if (!email) {
        return;
      }

      try {
        sessionStorage.setItem(
          "prestige_user",
          email
        );
      } catch (error) {
        console.warn(
          "Could not save login session.",
          error
        );
      }

      window.location.href = "dashboard.html";
    });
  }

  // ==============================
  // STUDENT DASHBOARD
  // ==============================

  if (/dashboard\.html$/i.test(window.location.pathname)) {
    let user = null;

    try {
      user = sessionStorage.getItem(
        "prestige_user"
      );
    } catch (error) {
      console.warn(
        "Could not read login session.",
        error
      );
    }

    // If user is not logged in, return to login
    if (!user) {
      window.location.href = "login.html";
      return;
    }

    const welcome =
      document.getElementById("welcome");

    if (welcome) {
      const name = user
        .split("@")[0]
        .replace(/[._-]+/g, " ")
        .replace(/\b\w/g, (char) =>
          char.toUpperCase()
        );

      welcome.textContent =
        `Welcome, ${name}`;
    }
  }
});


// ==============================
// SUCCESS MESSAGE
// ==============================

function showMessage(form, message) {
  if (!form) {
    return;
  }

  let notice =
    form.querySelector(".form-message");

  if (!notice) {
    notice = document.createElement("div");

    notice.className =
      "form-message";

    notice.setAttribute(
      "role",
      "status"
    );

    notice.style.cssText =
      "background:#eaf6ed;" +
      "color:#216238;" +
      "padding:12px;" +
      "margin-bottom:18px;" +
      "font-size:12px;" +
      "border:1px solid #c9e5d0;" +
      "border-radius:5px;";

    form.prepend(notice);
  }

  notice.textContent = message;

  window.setTimeout(() => {
    if (
      notice &&
      notice.parentNode
    ) {
      notice.remove();
    }
  }, 7000);
}


// ==============================
// MOBILE MENU FUNCTION
// ==============================
// Required by:
// onclick="toggleMenu()"

function toggleMenu() {
  const menuButton =
    document.querySelector(".menu");

  const nav =
    document.getElementById("nav");

  if (!nav) {
    return;
  }

  const isOpen =
    nav.classList.toggle("open");

  if (menuButton) {
    menuButton.setAttribute(
      "aria-expanded",
      String(isOpen)
    );
  }
}


// ==============================
// LOGOUT FUNCTION
// ==============================
// Required by the dashboard.

function logout() {
  try {
    sessionStorage.removeItem(
      "prestige_user"
    );
  } catch (error) {
    console.warn(
      "Could not clear login session.",
      error
    );
  }

  window.location.href = "login.html";
}
