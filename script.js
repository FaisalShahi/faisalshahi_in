// Mobile Navigation
const navSlide = () => {
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links li");

  hamburger.addEventListener("click", () => {
    // Toggle Nav
    nav.classList.toggle("nav-active");

    // Animate Links
    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${
          index / 7 + 0.3
        }s`;
      }
    });

    // Hamburger Animation
    hamburger.classList.toggle("toggle");
  });
};

// Animate Skills Progress Bars
const animateSkills = () => {
  const progressBars = document.querySelectorAll(".progress");
  progressBars.forEach((bar) => {
    const width = bar.getAttribute("data-width");
    bar.style.width = width + "%";
  });
};

// Animate on Scroll
const checkScroll = () => {
  const timelineItems = document.querySelectorAll(".timeline-item");
  const projectCards = document.querySelectorAll(".project-card");

  timelineItems.forEach((item) => {
    const itemTop = item.getBoundingClientRect().top;
    if (itemTop < window.innerHeight - 100) {
      item.classList.add("visible");
    }
  });

  projectCards.forEach((card, index) => {
    const cardTop = card.getBoundingClientRect().top;
    if (cardTop < window.innerHeight - 100) {
      setTimeout(() => {
        card.classList.add("visible");
      }, index * 100);
    }
  });
};

// Smooth Scrolling
const smoothScroll = () => {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      const navHeight = document.querySelector("header").offsetHeight;
      const targetPosition =
        targetElement.getBoundingClientRect().top +
        window.pageYOffset -
        navHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });

      // Close mobile menu if open
      const nav = document.querySelector(".nav-links");
      const hamburger = document.querySelector(".hamburger");
      if (nav.classList.contains("nav-active")) {
        nav.classList.remove("nav-active");
        hamburger.classList.remove("toggle");
      }
    });
  });
};

// Initialize
window.addEventListener("DOMContentLoaded", () => {
  navSlide();
  smoothScroll();

  // Initial animation triggers
  animateSkills();
  checkScroll();

  // On scroll animation triggers
  window.addEventListener("scroll", checkScroll);
});
