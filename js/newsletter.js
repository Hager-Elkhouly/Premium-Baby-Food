// Newsletter Subscription Functionality
document.addEventListener("DOMContentLoaded", function () {
  // Newsletter form handlers
  const newsletterForms = document.querySelectorAll(
    "#newsletter-form, #blog-newsletter-form"
  );

  newsletterForms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      handleNewsletterSubmission(this);
    });
  });

  // Newsletter subscription validation and submission
  function handleNewsletterSubmission(form) {
    const emailInput = form.querySelector('input[type="email"]');
    const submitButton = form.querySelector('button[type="submit"]');
    const email = emailInput.value.trim();

    // Validate email
    if (!email) {
      showNewsletterMessage(form, "Please enter your email address", "error");
      return;
    }

    if (!isValidEmail(email)) {
      showNewsletterMessage(
        form,
        "Please enter a valid email address",
        "error"
      );
      return;
    }

    // Check if already subscribed (simulate with localStorage)
    const subscribers = getSubscribers();
    if (subscribers.includes(email.toLowerCase())) {
      showNewsletterMessage(
        form,
        "You are already subscribed to our newsletter!",
        "info"
      );
      return;
    }

    // Show loading state
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = "Subscribing...";
    submitButton.disabled = true;

    // Simulate API call
    setTimeout(() => {
      // Add to subscribers list
      addSubscriber(email.toLowerCase());

      // Reset form
      form.reset();

      // Restore button
      submitButton.textContent = originalButtonText;
      submitButton.disabled = false;

      // Show success message
      showNewsletterMessage(
        form,
        "Thank you for subscribing! Check your email for confirmation.",
        "success"
      );

      // Track subscription (analytics simulation)
      trackNewsletterSubscription(email);
    }, 2000);
  }

  // Email validation function
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Show newsletter message
  function showNewsletterMessage(form, message, type) {
    // Remove existing messages
    const existingMessage = form.querySelector(".newsletter-message");
    if (existingMessage) {
      existingMessage.remove();
    }

    // Create new message
    const messageElement = document.createElement("div");
    messageElement.className = `newsletter-message newsletter-${type}`;
    messageElement.innerHTML = `
            <i class="fas fa-${getMessageIcon(type)}"></i>
            <span>${message}</span>
        `;

    // Insert message after form
    form.parentNode.insertBefore(messageElement, form.nextSibling);

    // Auto remove after 5 seconds
    setTimeout(() => {
      if (messageElement.parentNode) {
        messageElement.remove();
      }
    }, 5000);
  }

  // Get appropriate icon for message type
  function getMessageIcon(type) {
    switch (type) {
      case "success":
        return "check-circle";
      case "error":
        return "exclamation-circle";
      case "info":
        return "info-circle";
      default:
        return "info-circle";
    }
  }

  // Subscriber management (using localStorage for demo)
  function getSubscribers() {
    const subscribers = localStorage.getItem("littlebites_subscribers");
    return subscribers ? JSON.parse(subscribers) : [];
  }

  function addSubscriber(email) {
    const subscribers = getSubscribers();
    subscribers.push(email);
    localStorage.setItem(
      "littlebites_subscribers",
      JSON.stringify(subscribers)
    );
  }

  // Analytics tracking simulation
  function trackNewsletterSubscription(email) {
    console.log("Newsletter subscription tracked:", {
      email: email,
      timestamp: new Date().toISOString(),
      source: window.location.pathname,
    });

    // In a real application, you would send this data to your analytics service
    // Example: gtag('event', 'newsletter_signup', { email: email });
  }

  // Newsletter preferences modal (if implemented)
  function showNewsletterPreferences() {
    const modal = createNewsletterPreferencesModal();
    document.body.appendChild(modal);
    modal.classList.add("active");
  }

  function createNewsletterPreferencesModal() {
    const modal = document.createElement("div");
    modal.className = "newsletter-modal";
    modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Newsletter Preferences</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <p>Choose what you'd like to receive:</p>
                    <div class="preference-options">
                        <label class="preference-option">
                            <input type="checkbox" value="product-updates" checked>
                            <span>Product Updates & New Releases</span>
                        </label>
                        <label class="preference-option">
                            <input type="checkbox" value="parenting-tips" checked>
                            <span>Parenting Tips & Advice</span>
                        </label>
                        <label class="preference-option">
                            <input type="checkbox" value="recipes" checked>
                            <span>Recipes & Nutrition Tips</span>
                        </label>
                        <label class="preference-option">
                            <input type="checkbox" value="promotions">
                            <span>Special Offers & Promotions</span>
                        </label>
                    </div>
                    <div class="frequency-options">
                        <h4>Email Frequency:</h4>
                        <label class="frequency-option">
                            <input type="radio" name="frequency" value="weekly" checked>
                            <span>Weekly</span>
                        </label>
                        <label class="frequency-option">
                            <input type="radio" name="frequency" value="biweekly">
                            <span>Bi-weekly</span>
                        </label>
                        <label class="frequency-option">
                            <input type="radio" name="frequency" value="monthly">
                            <span>Monthly</span>
                        </label>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary modal-cancel">Cancel</button>
                    <button class="btn btn-primary modal-save">Save Preferences</button>
                </div>
            </div>
        `;

    // Modal event listeners
    const closeBtn = modal.querySelector(".modal-close");
    const cancelBtn = modal.querySelector(".modal-cancel");
    const saveBtn = modal.querySelector(".modal-save");
    const overlay = modal.querySelector(".modal-overlay");

    [closeBtn, cancelBtn, overlay].forEach((element) => {
      element.addEventListener("click", () => {
        modal.remove();
      });
    });

    saveBtn.addEventListener("click", () => {
      saveNewsletterPreferences(modal);
      modal.remove();
    });

    return modal;
  }

  function saveNewsletterPreferences(modal) {
    const preferences = {
      topics: [],
      frequency: "weekly",
    };

    // Get selected topics
    const topicCheckboxes = modal.querySelectorAll(
      '.preference-option input[type="checkbox"]:checked'
    );
    topicCheckboxes.forEach((checkbox) => {
      preferences.topics.push(checkbox.value);
    });

    // Get selected frequency
    const frequencyRadio = modal.querySelector(
      '.frequency-option input[type="radio"]:checked'
    );
    if (frequencyRadio) {
      preferences.frequency = frequencyRadio.value;
    }

    // Save preferences
    localStorage.setItem(
      "littlebites_newsletter_preferences",
      JSON.stringify(preferences)
    );

    // Show confirmation
    showNotification("Newsletter preferences saved successfully!", "success");
  }

  // Unsubscribe functionality
  function handleUnsubscribe(email) {
    const subscribers = getSubscribers();
    const updatedSubscribers = subscribers.filter(
      (subscriber) => subscriber !== email.toLowerCase()
    );
    localStorage.setItem(
      "littlebites_subscribers",
      JSON.stringify(updatedSubscribers)
    );

    showNotification("You have been unsubscribed from our newsletter.", "info");
  }

  // Check for unsubscribe parameter in URL
  const urlParams = new URLSearchParams(window.location.search);
  const unsubscribeEmail = urlParams.get("unsubscribe");
  if (unsubscribeEmail) {
    handleUnsubscribe(unsubscribeEmail);
  }

  // Newsletter popup (optional feature)
  function showNewsletterPopup() {
    // Only show if user hasn't seen it recently
    const lastShown = localStorage.getItem("newsletter_popup_last_shown");
    const now = Date.now();
    const dayInMs = 24 * 60 * 60 * 1000;

    if (!lastShown || now - parseInt(lastShown) > dayInMs) {
      setTimeout(() => {
        const popup = createNewsletterPopup();
        document.body.appendChild(popup);
        popup.classList.add("active");
        localStorage.setItem("newsletter_popup_last_shown", now.toString());
      }, 30000); // Show after 30 seconds
    }
  }

  function createNewsletterPopup() {
    const popup = document.createElement("div");
    popup.className = "newsletter-popup";
    popup.innerHTML = `
            <div class="popup-overlay"></div>
            <div class="popup-content">
                <button class="popup-close">&times;</button>
                <div class="popup-header">
                    <i class="fas fa-envelope fa-2x"></i>
                    <h3>Stay Connected!</h3>
                </div>
                <div class="popup-body">
                    <p>Get weekly parenting tips, nutrition advice, and exclusive offers delivered to your inbox.</p>
                    <form class="popup-newsletter-form">
                        <input type="email" placeholder="Enter your email" required>
                        <button type="submit" class="btn btn-primary">Subscribe Now</button>
                    </form>
                    <p class="popup-note">No spam, unsubscribe anytime.</p>
                </div>
            </div>
        `;

    // Popup event listeners
    const closeBtn = popup.querySelector(".popup-close");
    const overlay = popup.querySelector(".popup-overlay");
    const form = popup.querySelector(".popup-newsletter-form");

    [closeBtn, overlay].forEach((element) => {
      element.addEventListener("click", () => {
        popup.remove();
      });
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      handleNewsletterSubmission(form);
      setTimeout(() => popup.remove(), 2000);
    });

    return popup;
  }

  // Initialize newsletter popup (uncomment to enable)
  // showNewsletterPopup();

  // Utility function for notifications (if not already defined in main.js)
  if (typeof showNotification === "undefined") {
    window.showNotification = function (message, type = "info") {
      const notification = document.createElement("div");
      notification.className = `notification notification-${type}`;
      notification.innerHTML = `
                <i class="fas fa-${
                  type === "success" ? "check" : "info"
                }-circle"></i>
                <span>${message}</span>
                <button class="notification-close"><i class="fas fa-times"></i></button>
            `;

      document.body.appendChild(notification);

      setTimeout(() => {
        notification.remove();
      }, 5000);

      notification
        .querySelector(".notification-close")
        .addEventListener("click", () => {
          notification.remove();
        });
    };
  }
});

// Newsletter-specific CSS
const newsletterStyles = `
    .newsletter-message {
        margin-top: 1rem;
        padding: 0.75rem 1rem;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.9rem;
        animation: slideInUp 0.3s ease;
    }
    
    .newsletter-success {
        background: #d4edda;
        color: #155724;
        border: 1px solid #c3e6cb;
    }
    
    .newsletter-error {
        background: #f8d7da;
        color: #721c24;
        border: 1px solid #f5c6cb;
    }
    
    .newsletter-info {
        background: #d1ecf1;
        color: #0c5460;
        border: 1px solid #bee5eb;
    }
    
    .newsletter-modal,
    .newsletter-popup {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1000;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
    }
    
    .newsletter-modal.active,
    .newsletter-popup.active {
        opacity: 1;
        visibility: visible;
    }
    
    .modal-overlay,
    .popup-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
    }
    
    .modal-content,
    .popup-content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        border-radius: 15px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        max-width: 500px;
        width: 90%;
        max-height: 90vh;
        overflow-y: auto;
    }
    
    .modal-header,
    .popup-header {
        padding: 1.5rem;
        border-bottom: 1px solid #eee;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    
    .popup-header {
        text-align: center;
        flex-direction: column;
        gap: 1rem;
        border-bottom: none;
    }
    
    .popup-header i {
        color: var(--primary-color);
    }
    
    .modal-close,
    .popup-close {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: #666;
        position: absolute;
        top: 1rem;
        right: 1rem;
    }
    
    .modal-body,
    .popup-body {
        padding: 1.5rem;
    }
    
    .preference-options,
    .frequency-options {
        margin: 1rem 0;
    }
    
    .preference-option,
    .frequency-option {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin: 0.5rem 0;
        cursor: pointer;
    }
    
    .modal-footer {
        padding: 1rem 1.5rem;
        border-top: 1px solid #eee;
        display: flex;
        gap: 1rem;
        justify-content: flex-end;
    }
    
    .popup-newsletter-form {
        display: flex;
        gap: 0.5rem;
        margin: 1rem 0;
    }
    
    .popup-newsletter-form input {
        flex: 1;
        padding: 0.75rem;
        border: 1px solid #ddd;
        border-radius: 8px;
        outline: none;
    }
    
    .popup-newsletter-form input:focus {
        border-color: var(--primary-color);
        box-shadow: 0 0 0 2px rgba(255, 182, 193, 0.2);
    }
    
    .popup-note {
        font-size: 0.8rem;
        color: #666;
        text-align: center;
        margin: 0;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @media (max-width: 768px) {
        .popup-newsletter-form {
            flex-direction: column;
        }
        
        .modal-footer {
            flex-direction: column;
        }
    }
`;

// Inject newsletter styles
const newsletterStyleSheet = document.createElement("style");
newsletterStyleSheet.textContent = newsletterStyles;
document.head.appendChild(newsletterStyleSheet);
