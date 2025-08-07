// Main JavaScript for Little Bites Website
document.addEventListener("DOMContentLoaded", function () {
  // Mobile Navigation Toggle
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      });
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      // Skip if href is just "#" or empty
      if (href === "#" || href === "" || href.length <= 1) {
        e.preventDefault();
        return;
      }

      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Product Filter Functionality (Products Page)
  const filterButtons = document.querySelectorAll(".filter-btn");
  const productCards = document.querySelectorAll(".product-card");

  if (filterButtons.length > 0 && productCards.length > 0) {
    filterButtons.forEach((button) => {
      button.addEventListener("click", function () {
        // Remove active class from all buttons
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        // Add active class to clicked button
        this.classList.add("active");

        const filterValue = this.getAttribute("data-filter");

        productCards.forEach((card) => {
          if (
            filterValue === "all" ||
            card.getAttribute("data-category") === filterValue
          ) {
            card.style.display = "block";
            card.style.opacity = "0";
            card.style.transform = "translateY(20px)";

            // Animate in
            setTimeout(() => {
              card.style.transition = "all 0.5s ease";
              card.style.opacity = "1";
              card.style.transform = "translateY(0)";
            }, 100);
          } else {
            card.style.transition = "all 0.3s ease";
            card.style.opacity = "0";
            card.style.transform = "translateY(-20px)";

            setTimeout(() => {
              card.style.display = "none";
            }, 300);
          }
        });
      });
    });
  }

  // Blog Category Filter (Blog Page)
  const categoryButtons = document.querySelectorAll(".category-btn");
  const blogCards = document.querySelectorAll(".blog-card");

  if (categoryButtons.length > 0 && blogCards.length > 0) {
    categoryButtons.forEach((button) => {
      button.addEventListener("click", function () {
        // Remove active class from all buttons
        categoryButtons.forEach((btn) => btn.classList.remove("active"));
        // Add active class to clicked button
        this.classList.add("active");

        const categoryValue = this.getAttribute("data-category");

        blogCards.forEach((card) => {
          if (
            categoryValue === "all" ||
            card.getAttribute("data-category") === categoryValue
          ) {
            card.style.display = "block";
            card.style.opacity = "0";
            card.style.transform = "translateY(20px)";

            // Animate in
            setTimeout(() => {
              card.style.transition = "all 0.5s ease";
              card.style.opacity = "1";
              card.style.transform = "translateY(0)";
            }, 100);
          } else {
            card.style.transition = "all 0.3s ease";
            card.style.opacity = "0";
            card.style.transform = "translateY(-20px)";

            setTimeout(() => {
              card.style.display = "none";
            }, 300);
          }
        });
      });
    });
  }

  // FAQ Accordion (Contact Page)
  const faqItems = document.querySelectorAll(".faq-item");

  if (faqItems.length > 0) {
    faqItems.forEach((item) => {
      const question = item.querySelector(".faq-question");
      const answer = item.querySelector(".faq-answer");
      const icon = question.querySelector("i");

      if (question && answer && icon) {
        question.addEventListener("click", function () {
          const isActive = item.classList.contains("active");

          // Close all FAQ items
          faqItems.forEach((faqItem) => {
            faqItem.classList.remove("active");
            const faqAnswer = faqItem.querySelector(".faq-answer");
            const faqIcon = faqItem.querySelector(".faq-question i");
            if (faqAnswer) faqAnswer.style.maxHeight = null;
            if (faqIcon) faqIcon.style.transform = "rotate(0deg)";
          });

          // Open clicked item if it wasn't active
          if (!isActive) {
            item.classList.add("active");
            answer.style.maxHeight = answer.scrollHeight + "px";
            icon.style.transform = "rotate(180deg)";
          }
        });
      }
    });
  }

  // Form Validation and Submission
  const forms = document.querySelectorAll("form");

  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Basic form validation
      const requiredFields = form.querySelectorAll("[required]");
      let isValid = true;

      requiredFields.forEach((field) => {
        if (!field.value.trim()) {
          isValid = false;
          field.classList.add("error");
          showFieldError(field, "This field is required");
        } else {
          field.classList.remove("error");
          hideFieldError(field);
        }
      });

      // Email validation
      const emailFields = form.querySelectorAll('input[type="email"]');
      emailFields.forEach((field) => {
        if (field.value && !isValidEmail(field.value)) {
          isValid = false;
          field.classList.add("error");
          showFieldError(field, "Please enter a valid email address");
        }
      });

      if (isValid) {
        // Show success message
        showSuccessMessage(form);
        // Reset form
        form.reset();

        // Remove any error states
        form.querySelectorAll(".error").forEach((field) => {
          field.classList.remove("error");
          hideFieldError(field);
        });
      }
    });
  });

  // Rating Input (Testimonials Page)
  const ratingInputs = document.querySelectorAll(".rating-input");

  ratingInputs.forEach((ratingContainer) => {
    const stars = ratingContainer.querySelectorAll('input[type="radio"]');
    const labels = ratingContainer.querySelectorAll("label");

    labels.forEach((label, index) => {
      label.addEventListener("mouseenter", function () {
        highlightStars(labels, index);
      });

      label.addEventListener("mouseleave", function () {
        const checkedStar = ratingContainer.querySelector(
          'input[type="radio"]:checked'
        );
        if (checkedStar) {
          const checkedIndex = Array.from(stars).indexOf(checkedStar);
          highlightStars(labels, checkedIndex);
        } else {
          clearStars(labels);
        }
      });

      label.addEventListener("click", function () {
        highlightStars(labels, index);
      });
    });
  });

  // Load More Functionality
  const loadMoreButtons = document.querySelectorAll(
    ".load-more button, .load-more-posts button"
  );

  loadMoreButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Simulate loading more content
      const originalText = button.textContent;
      button.textContent = "Loading...";
      button.disabled = true;

      setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
        showNotification("More content loaded successfully!", "success");
      }, 1500);
    });
  });

  // Scroll to Top Button
  const scrollTopButton = createScrollTopButton();
  document.body.appendChild(scrollTopButton);

  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      scrollTopButton.classList.add("visible");
    } else {
      scrollTopButton.classList.remove("visible");
    }
  });

  // Lazy Loading Animation
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("loading");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animateElements = document.querySelectorAll(
    ".feature-card, .product-card, .testimonial-card, .blog-card"
  );
  animateElements.forEach((el) => observer.observe(el));

  // Initialize tooltips
  initializeTooltips();

  // Initialize live chat button
  initializeLiveChat();

  // Initialize store locator
  initializeStoreLocator();

  // Initialize social media links
  initializeSocialMediaLinks();
});

// Helper Functions

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showFieldError(field, message) {
  let errorElement = field.parentNode.querySelector(".field-error");
  if (!errorElement) {
    errorElement = document.createElement("span");
    errorElement.className = "field-error";
    field.parentNode.appendChild(errorElement);
  }
  errorElement.textContent = message;
}

function hideFieldError(field) {
  const errorElement = field.parentNode.querySelector(".field-error");
  if (errorElement) {
    errorElement.remove();
  }
}

function showSuccessMessage(form) {
  // Remove any existing success messages
  const existingMessage = form.parentNode.querySelector(".success-message");
  if (existingMessage) {
    existingMessage.remove();
  }

  const successMessage = document.createElement("div");
  successMessage.className = "success-message";
  successMessage.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>Thank you! Your message has been sent successfully.</span>
    `;

  form.parentNode.insertBefore(successMessage, form);

  setTimeout(() => {
    if (successMessage.parentNode) {
      successMessage.remove();
    }
  }, 5000);
}

function highlightStars(labels, index) {
  labels.forEach((label, i) => {
    if (i <= index) {
      label.classList.add("highlighted");
    } else {
      label.classList.remove("highlighted");
    }
  });
}

function clearStars(labels) {
  labels.forEach((label) => {
    label.classList.remove("highlighted");
  });
}

function createScrollTopButton() {
  const button = document.createElement("button");
  button.className = "scroll-top-btn";
  button.innerHTML = '<i class="fas fa-chevron-up"></i>';
  button.setAttribute("aria-label", "Scroll to top");

  button.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  return button;
}

function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll(".notification");
  existingNotifications.forEach((notification) => notification.remove());

  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <i class="fas fa-${type === "success" ? "check" : "info"}-circle"></i>
        <span>${message}</span>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;

  document.body.appendChild(notification);

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove();
    }
  }, 5000);

  // Manual close
  const closeButton = notification.querySelector(".notification-close");
  if (closeButton) {
    closeButton.addEventListener("click", () => {
      notification.remove();
    });
  }
}

function initializeTooltips() {
  const tooltipElements = document.querySelectorAll("[data-tooltip]");

  tooltipElements.forEach((element) => {
    element.addEventListener("mouseenter", function () {
      const tooltip = document.createElement("div");
      tooltip.className = "tooltip";
      tooltip.textContent = this.getAttribute("data-tooltip");
      document.body.appendChild(tooltip);

      const rect = this.getBoundingClientRect();
      tooltip.style.left =
        rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + "px";
      tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + "px";

      this.tooltipElement = tooltip;
    });

    element.addEventListener("mouseleave", function () {
      if (this.tooltipElement) {
        this.tooltipElement.remove();
        this.tooltipElement = null;
      }
    });
  });
}

function initializeLiveChat() {
  const chatButtons = document.querySelectorAll(".btn-small");
  chatButtons.forEach((button) => {
    if (button.textContent.includes("Start Chat")) {
      button.addEventListener("click", function (e) {
        e.preventDefault();
        showNotification(
          "Live chat feature coming soon! Please use our contact form or call us directly.",
          "info"
        );
      });
    }
  });
}

// Social Media Links Functionality
function initializeSocialMediaLinks() {
  const socialLinks = document.querySelectorAll(".social-link");
  socialLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const href = this.getAttribute("href");
      if (href === "#" || !href || href === "") {
        showNotification("Social media links coming soon!", "info");
      } else {
        window.open(href, "_blank");
      }
    });
  });
}

// Store Locator Functionality
function initializeStoreLocator() {
  const storeLocatorForm = document.querySelector(".locator-form");
  if (storeLocatorForm) {
    const input = storeLocatorForm.querySelector("input");
    const button = storeLocatorForm.querySelector("button");

    if (input && button) {
      button.addEventListener("click", function (e) {
        e.preventDefault();
        const location = input.value.trim();

        if (location) {
          const originalText = button.textContent;
          button.textContent = "Searching...";
          button.disabled = true;

          // Simulate API call
          setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
            showNotification(`Found 12 stores near "${location}"`, "success");
          }, 2000);
        } else {
          showNotification("Please enter a location to search", "info");
        }
      });

      // Also handle form submission
      storeLocatorForm.addEventListener("submit", function (e) {
        e.preventDefault();
        button.click();
      });
    }
  }
}

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(function () {
  // Handle scroll-based animations or effects here
}, 100);

window.addEventListener("scroll", optimizedScrollHandler);

// Add CSS for dynamic elements
const dynamicStyles = `
    .field-error {
        color: #ff4757;
        font-size: 0.8rem;
        margin-top: 0.25rem;
        display: block;
    }
    
    .error {
        border-color: #ff4757 !important;
        box-shadow: 0 0 0 2px rgba(255, 71, 87, 0.2) !important;
    }
    
    .success-message {
        background: linear-gradient(135deg, #2ed573, #1e90ff);
        color: white;
        padding: 1rem;
        border-radius: 10px;
        margin-bottom: 2rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        animation: slideInDown 0.5s ease;
    }
    
    .scroll-top-btn {
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
    
    .scroll-top-btn.visible {
        opacity: 1;
        visibility: visible;
    }
    
    .scroll-top-btn:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
    }
    
    .notification {
        position: fixed;
        top: 2rem;
        right: 2rem;
        background: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        display: flex;
        align-items: center;
        gap: 0.5rem;
        z-index: 1001;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
    }
    
    .notification-success {
        border-left: 4px solid #2ed573;
    }
    
    .notification-info {
        border-left: 4px solid #1e90ff;
    }
    
    .notification-close {
        background: none;
        border: none;
        cursor: pointer;
        margin-left: auto;
        color: #666;
        padding: 0.2rem;
    }
    
    .notification-close:hover {
        color: #333;
    }
    
    .tooltip {
        position: absolute;
        background: #333;
        color: white;
        padding: 0.5rem;
        border-radius: 5px;
        font-size: 0.8rem;
        z-index: 1002;
        pointer-events: none;
        animation: fadeIn 0.2s ease;
    }
    
    .rating-input label.highlighted i {
        color: #FFD700;
    }
    
    /* Mobile Navigation Styles */
    @media (max-width: 768px) {
        .hamburger {
            display: flex;
            flex-direction: column;
            cursor: pointer;
        }
        
        .hamburger.active .bar:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active .bar:nth-child(1) {
            transform: translateY(8px) rotate(45deg);
        }
        
        .hamburger.active .bar:nth-child(3) {
            transform: translateY(-8px) rotate(-45deg);
        }
        
        .nav-menu {
            position: fixed;
            left: -100%;
            top: 70px;
            flex-direction: column;
            background-color: white;
            width: 100%;
            text-align: center;
            transition: 0.3s;
            box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
            z-index: 999;
        }
        
        .nav-menu.active {
            left: 0;
        }
        
        .nav-item {
            margin: 1rem 0;
        }
    }
    
    @keyframes slideInDown {
        from {
            opacity: 0;
            transform: translateY(-30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;

// Inject dynamic styles
const styleSheet = document.createElement("style");
styleSheet.textContent = dynamicStyles;
document.head.appendChild(styleSheet);
