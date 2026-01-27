// Modern Portfolio JavaScript

// Mobile Menu Toggle
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");

// Toggle menu on button click
if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    const icon = menuToggle.querySelector("i");

    if (navMenu.classList.contains("active")) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-times");
    } else {
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    }
  });
}

// Close menu when clicking on a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    const icon = menuToggle.querySelector("i");
    if (icon) {
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    }
  });
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
    navMenu.classList.remove("active");
    const icon = menuToggle.querySelector("i");
    if (icon) {
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    }
  }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      const navHeight = document.querySelector(".navbar").offsetHeight;
      const targetPosition = target.offsetTop - navHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Active navigation on scroll
window.addEventListener("scroll", () => {
  let current = "";
  const sections = document.querySelectorAll("section");

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    const navHeight = document.querySelector(".navbar").offsetHeight;

    if (window.pageYOffset >= sectionTop - navHeight - 100) {
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

// Navbar background on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
  } else {
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.05)";
  }
});

// Intersection Observer for animations
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

// Observe animated elements
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(
    ".stat-box, .skill-box, .project-card, .contact-detail",
  );

  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
});

// Skill progress bars animation
const animateSkillBars = () => {
  const skillSection = document.getElementById("skills");
  const skillBars = document.querySelectorAll(".skill-progress");

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        skillBars.forEach((bar) => {
          const width = bar.style.width;
          bar.style.width = "0";
          setTimeout(() => {
            bar.style.width = width;
          }, 100);
        });
        skillObserver.unobserve(entry.target);
      }
    });
  });

  if (skillSection) {
    skillObserver.observe(skillSection);
  }
};

// Run skill bars animation
animateSkillBars();

// Page load animation
window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.5s ease";
  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 100);
});

// Add active class to current nav link
const currentPath = window.location.hash;
if (currentPath) {
  navLinks.forEach((link) => {
    if (link.getAttribute("href") === currentPath) {
      link.classList.add("active");
    }
  });
}

// Profile Picture Upload and Management
const profileImg = document.getElementById("profileImg");
const profileOverlay = document.getElementById("profileOverlay");
const fileInput = document.getElementById("fileInput");
const removeBtn = document.getElementById("removeBtn");
const defaultImageUrl = "https://ui-avatars.com/api/?name=Michael&size=400&background=667eea&color=fff&bold=true";

// Load saved image from localStorage on page load
function loadProfileImage() {
  const savedImage = localStorage.getItem("profileImage");
  if (savedImage) {
    profileImg.src = savedImage;
    if (removeBtn) removeBtn.style.display = "flex";
  } else {
    profileImg.src = defaultImageUrl;
    if (removeBtn) removeBtn.style.display = "none";
  }
}

// Make image container clickable
if (profileImg && profileOverlay) {
  // Click on image or overlay to upload
  profileImg.style.cursor = "pointer";
  
  profileImg.addEventListener("click", () => {
    fileInput.click();
  });
  
  profileOverlay.addEventListener("click", () => {
    fileInput.click();
  });
}

// File input change handler
if (fileInput) {
  fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        showNotification('⚠️ Please select an image file', 'error');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        showNotification('⚠️ Image size should be less than 5MB', 'error');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target.result;
        profileImg.src = imageData;
        localStorage.setItem("profileImage", imageData);
        if (removeBtn) removeBtn.style.display = "flex";
        
        showNotification('✓ Profile picture updated!', 'success');
      };
      reader.onerror = () => {
        showNotification('⚠️ Error reading file. Please try again.', 'error');
      };
      reader.readAsDataURL(file);
    }
  });
}

// Remove button click handler
if (removeBtn) {
  removeBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent triggering the upload
    
    if (confirm('Remove your profile picture?')) {
      profileImg.src = defaultImageUrl;
      localStorage.removeItem("profileImage");
      removeBtn.style.display = "none";
      fileInput.value = '';
      
      showNotification('✓ Profile picture removed', 'success');
    }
  });
}

// Notification function
function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add('show');
  }, 10);
  
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

// Load profile image on page load
loadProfileImage();

// Console message
console.log(
  "%c👋 Hey there! Thanks for checking out my portfolio!",
  "color: #667eea; font-size: 16px; font-weight: bold;",
);
console.log(
  "%cInterested in working together? Reach out!",
  "color: #718096; font-size: 14px;",
);