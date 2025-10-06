// Main JavaScript for ReCent DST Website

// Declare AOS variable
const AOS = window.AOS

document.addEventListener("DOMContentLoaded", () => {
  // Initialize AOS (Animate On Scroll)
  AOS.init({
    duration: 1000,
    easing: "ease-in-out",
    once: true,
    offset: 100,
  })

  // Theme Toggle Functionality
  initThemeToggle()

  // Navigation Scroll Effect
  initNavbarScroll()

  // Counter Animation
  initCounterAnimation()

  // Smooth Scrolling
  initSmoothScrolling()

  // Form Handling
  initFormHandling()

  // Loading Animations
  initLoadingAnimations()

  // Mobile Menu Handling
  initMobileMenu()

  // Lazy Loading for Images
  initLazyLoading()

  initScrollAnimations()
  initScrollToTop()
  initPageLoadAnimations()

  initParallaxEffect()
})

// Theme Toggle
function initThemeToggle() {
  const themeToggle = document.getElementById("themeToggle")
  const body = document.body

  // Check for saved theme preference or default to light
  const currentTheme = localStorage.getItem("theme") || "light"
  body.setAttribute("data-theme", currentTheme)

  // Update toggle icon
  updateThemeIcon(currentTheme)

  themeToggle.addEventListener("click", () => {
    const currentTheme = body.getAttribute("data-theme")
    const newTheme = currentTheme === "light" ? "dark" : "light"

    body.setAttribute("data-theme", newTheme)
    localStorage.setItem("theme", newTheme)
    updateThemeIcon(newTheme)

    // Add transition class for smooth theme change
    body.classList.add("theme-transition")

    // Animate all glassmorphism cards
    const cards = document.querySelectorAll(".glassmorphism-card")
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.style.transform = "scale(0.95)"
        setTimeout(() => {
          card.style.transform = "scale(1)"
        }, 150)
      }, index * 50)
    })

    setTimeout(() => {
      body.classList.remove("theme-transition")
    }, 500)
  })
}

function updateThemeIcon(theme) {
  const themeToggle = document.getElementById("themeToggle")
  const icon = themeToggle.querySelector("i")

  if (theme === "dark") {
    icon.className = "fas fa-sun"
  } else {
    icon.className = "fas fa-moon"
  }
}

// Navbar Scroll Effect
function initNavbarScroll() {
  const navbar = document.getElementById("mainNav")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }
  })
}

// Counter Animation
function initCounterAnimation() {
  const counters = document.querySelectorAll(".stat-number")
  const observerOptions = {
    threshold: 0.5,
    rootMargin: "0px 0px -100px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target)
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  counters.forEach((counter) => {
    observer.observe(counter)
  })
}

function animateCounter(element) {
  const target =
    Number.parseInt(element.getAttribute("data-count")) || Number.parseInt(element.textContent.replace("+", ""))
  const duration = 2000 // 2 seconds
  const startTime = performance.now()

  function updateCounter(currentTime) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)

    // Easing function for smooth animation
    const easeOutQuart = 1 - Math.pow(1 - progress, 4)
    const current = Math.floor(target * easeOutQuart)

    element.textContent = current + "+"

    if (progress < 1) {
      requestAnimationFrame(updateCounter)
    } else {
      element.textContent = target + "+"
    }
  }

  requestAnimationFrame(updateCounter)
}

// Smooth Scrolling
function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]')

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80 // Account for fixed navbar

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })
}

// Form Handling
function initFormHandling() {
  // Newsletter Form
  const newsletterForm = document.querySelector(".newsletter-form")
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault()
      handleNewsletterSubmission(this)
    })
  }

  // Contact Forms
  const contactForms = document.querySelectorAll(".contact-form")
  contactForms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault()
      handleContactFormSubmission(this)
    })
  })
}

function handleNewsletterSubmission(form) {
  const email = form.querySelector('input[type="email"]').value
  const button = form.querySelector('button[type="submit"]')

  // Show loading state
  const originalText = button.textContent
  button.textContent = "Subscribing..."
  button.disabled = true

  // Simulate API call
  setTimeout(() => {
    // Show success message
    showNotification("Thank you for subscribing to our newsletter!", "success")
    form.reset()

    // Reset button
    button.textContent = originalText
    button.disabled = false
  }, 1500)
}

function handleContactFormSubmission(form) {
  const button = form.querySelector('button[type="submit"]')
  const originalText = button.innerHTML
  const formData = new FormData(form)

  // Validate form
  if (!validateForm(form)) {
    showNotification("Please fill in all required fields correctly.", "error")
    return
  }

  // Show loading state with spinner
  button.innerHTML = '<span class="loading-spinner"></span> Sending...'
  button.disabled = true

  // Add loading class to form
  form.classList.add("form-loading")

  // Simulate API call
  setTimeout(() => {
    showNotification("Thank you for your message! We'll get back to you within 24 hours.", "success")

    // Reset form with animation
    const inputs = form.querySelectorAll("input, textarea, select")
    inputs.forEach((input, index) => {
      setTimeout(() => {
        input.style.transform = "scale(0.95)"
        setTimeout(() => {
          input.value = ""
          input.style.transform = "scale(1)"
        }, 100)
      }, index * 50)
    })

    // Reset button
    setTimeout(() => {
      button.innerHTML = originalText
      button.disabled = false
      form.classList.remove("form-loading")
    }, 1000)
  }, 2000)
}

function validateForm(form) {
  const requiredFields = form.querySelectorAll("[required]")
  let isValid = true

  requiredFields.forEach((field) => {
    if (!field.value.trim()) {
      field.classList.add("is-invalid")
      isValid = false
    } else {
      field.classList.remove("is-invalid")
    }
  })

  return isValid
}

// Notification System
function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`

  const iconMap = {
    success: "check-circle",
    error: "exclamation-circle",
    warning: "exclamation-triangle",
    info: "info-circle",
  }

  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas fa-${iconMap[type]}"></i>
      <span>${message}</span>
      <button class="notification-close">
        <i class="fas fa-times"></i>
      </button>
    </div>
  `

  // Enhanced styles
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: var(--glass-bg);
    backdrop-filter: var(--glass-blur);
    border: 1px solid var(--glass-border);
    border-left: 4px solid var(--${type === "success" ? "secondary-aqua" : type === "error" ? "accent-orange" : "primary-blue"});
    border-radius: 10px;
    padding: 1rem;
    box-shadow: var(--glass-shadow);
    z-index: 9999;
    transform: translateX(400px) scale(0.8);
    transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    max-width: 350px;
    opacity: 0;
  `

  document.body.appendChild(notification)

  // Animate in with bounce effect
  setTimeout(() => {
    notification.style.transform = "translateX(0) scale(1)"
    notification.style.opacity = "1"
  }, 100)

  // Close functionality
  const closeBtn = notification.querySelector(".notification-close")
  closeBtn.addEventListener("click", () => {
    closeNotification(notification)
  })

  // Auto close after 5 seconds
  setTimeout(() => {
    if (document.body.contains(notification)) {
      closeNotification(notification)
    }
  }, 5000)
}

function closeNotification(notification) {
  notification.style.transform = "translateX(400px) scale(0.8)"
  notification.style.opacity = "0"
  setTimeout(() => {
    if (document.body.contains(notification)) {
      document.body.removeChild(notification)
    }
  }, 400)
}

// Scroll to Top
function initScrollToTop() {
  // Create scroll to top button
  const scrollBtn = document.createElement("button")
  scrollBtn.id = "scrollToTop"
  scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>'
  scrollBtn.setAttribute("aria-label", "Scroll to top")
  document.body.appendChild(scrollBtn)

  scrollBtn.addEventListener("click", scrollToTop)

  // Show/hide button based on scroll position
  window.addEventListener(
    "scroll",
    debounce(() => {
      if (window.scrollY > 500) {
        scrollBtn.classList.add("show")
      } else {
        scrollBtn.classList.remove("show")
      }
    }, 100),
  )
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
}

// Loading Animations
function initLoadingAnimations() {
  const elements = document.querySelectorAll(".loading")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("loaded")
          observer.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.1,
    },
  )

  elements.forEach((element) => {
    observer.observe(element)
  })
}

// Mobile Menu Handling
function initMobileMenu() {
  const navbarToggler = document.querySelector(".navbar-toggler")
  const navbarCollapse = document.querySelector(".navbar-collapse")

  if (navbarToggler && navbarCollapse) {
    // Close mobile menu when clicking on a link
    const navLinks = navbarCollapse.querySelectorAll(".nav-link")
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (navbarCollapse.classList.contains("show")) {
          navbarToggler.click()
        }
      })
    })

    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!navbarCollapse.contains(e.target) && !navbarToggler.contains(e.target)) {
        if (navbarCollapse.classList.contains("show")) {
          navbarToggler.click()
        }
      }
    })
  }
}

// Lazy Loading for Images
function initLazyLoading() {
  const images = document.querySelectorAll("img[data-src]")

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.classList.remove("lazy")
        imageObserver.unobserve(img)
      }
    })
  })

  images.forEach((img) => imageObserver.observe(img))
}

function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(".fade-in-up, .fade-in-left, .fade-in-right, .scale-in")

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("visible")
        }, index * 100)
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  animatedElements.forEach((element) => {
    observer.observe(element)
  })
}

function initPageLoadAnimations() {
  // Add staggered animations to elements
  const elements = document.querySelectorAll(".glassmorphism-card, .service-card, .project-card, .blog-card")

  elements.forEach((element, index) => {
    element.style.opacity = "0"
    element.style.transform = "translateY(30px)"

    setTimeout(() => {
      element.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
      element.style.opacity = "1"
      element.style.transform = "translateY(0)"
    }, index * 100)
  })
}

function initParallaxEffect() {
  const heroSection = document.querySelector(".hero-section")
  const shapes = document.querySelectorAll(".shape")

  if (heroSection && shapes.length > 0) {
    window.addEventListener(
      "scroll",
      debounce(() => {
        const scrolled = window.pageYOffset
        const rate = scrolled * -0.5

        shapes.forEach((shape, index) => {
          const speed = (index + 1) * 0.1
          shape.style.transform = `translateY(${rate * speed}px)`
        })
      }, 10),
    )
  }
}

// Utility Functions
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Page Navigation
function navigateToPage(page) {
  // Add loading animation
  document.body.classList.add("page-transition")

  setTimeout(() => {
    window.location.href = page
  }, 300)
}

// Export functions for use in other files
window.RecentDST = {
  navigateToPage,
  scrollToTop,
  showNotification,
  initThemeToggle,
  initCounterAnimation,
}
