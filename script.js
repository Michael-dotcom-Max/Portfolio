// Enhanced Mobile Menu Toggle
document.addEventListener("DOMContentLoaded", function () {
  // Create mobile menu toggle button if it doesn't exist
  const navContainer = document.querySelector(".nav-container");
  const navLinks = document.querySelector(".nav-links");

  if (navContainer && navLinks && window.innerWidth <= 768) {
    // Check if toggle button already exists
    let menuToggle = document.querySelector(".menu-toggle");

    if (!menuToggle) {
      // Create toggle button
      menuToggle = document.createElement("button");
      menuToggle.className = "menu-toggle";
      menuToggle.setAttribute("aria-label", "Toggle menu");
      menuToggle.innerHTML = '<i class="fas fa-bars"></i>';

      // Insert after logo
      const logo = navContainer.querySelector(".logo");
      if (logo) {
        logo.parentNode.insertBefore(menuToggle, logo.nextSibling);
      } else {
        navContainer.appendChild(menuToggle);
      }
    }

    // Toggle menu on click
    menuToggle.addEventListener("click", function () {
      navLinks.classList.toggle("active");
      const icon = this.querySelector("i");

      // Toggle icon between bars and times
      if (navLinks.classList.contains("active")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-times");
        this.setAttribute("aria-expanded", "true");
      } else {
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
        this.setAttribute("aria-expanded", "false");
      }
    });

    // Close menu when clicking on a link
    const links = navLinks.querySelectorAll("a");
    links.forEach((link) => {
      link.addEventListener("click", function () {
        navLinks.classList.remove("active");
        const icon = menuToggle.querySelector("i");
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (event) {
      if (!navContainer.contains(event.target)) {
        navLinks.classList.remove("active");
        const icon = menuToggle.querySelector("i");
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Re-check on window resize
  window.addEventListener("resize", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (window.innerWidth > 768) {
      if (navLinks) {
        navLinks.classList.remove("active");
      }
      if (menuToggle) {
        const icon = menuToggle.querySelector("i");
        if (icon) {
          icon.classList.remove("fa-times");
          icon.classList.add("fa-bars");
        }
      }
    }
  });
});

// Enhanced scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe elements when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  const animatedElements = document.querySelectorAll(
    ".skill-card, .project-card, .stat-card, .contact-item",
  );

  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
});

// Smooth scroll behavior for anchor links
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));

      if (target) {
        const navHeight = document.querySelector("nav").offsetHeight;
        const targetPosition = target.offsetTop - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
});

// Active navigation link on scroll
window.addEventListener("scroll", () => {
  let current = "";
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-links a");

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (window.pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

// Add parallax effect to hero section
window.addEventListener("scroll", () => {
  const hero = document.querySelector(".hero");
  if (hero) {
    const scrolled = window.pageYOffset;
    const parallax = scrolled * 0.5;
    hero.style.transform = `translateY(${parallax}px)`;
  }
});

// Profile picture upload functionality (if it exists)
document.addEventListener("DOMContentLoaded", function () {
  const fileInput = document.getElementById("fileInput");
  const profileImg = document.getElementById("profileImg");

  if (fileInput && profileImg) {
    fileInput.addEventListener("change", function (e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          profileImg.src = e.target.result;
          localStorage.setItem("profileImage", e.target.result);
        };
        reader.readAsDataURL(file);
      }
    });

    // Load saved profile image from localStorage
    const savedImage = localStorage.getItem("profileImage");
    if (savedImage) {
      profileImg.src = savedImage;
    }
  }
});

// Add loading animation
window.addEventListener("load", function () {
  document.body.classList.add("loaded");
});

// Add CSS class for loaded state
const style = document.createElement("style");
style.textContent = `
  body {
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  body.loaded {
    opacity: 1;
  }
  .nav-links a.active {
    color: var(--accent) !important;
    position: relative;
  }
  .nav-links a.active::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--accent);
  }
`;
document.head.appendChild(style);
