// Contact Page Enhancements
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm")
  if (contactForm) {
    const inputs = contactForm.querySelectorAll("input, select, textarea")

    inputs.forEach((input) => {
      input.addEventListener("blur", validateField)
      input.addEventListener("input", clearValidation)
      input.addEventListener("focus", handleInputFocus)
    })

    contactForm.addEventListener("submit", handleEnhancedFormSubmission)
  }

  const contactOptions = document.querySelectorAll(".contact-option .btn")
  contactOptions.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault()
      const target = btn.getAttribute("href")
      if (target === "#consultation" || target === "#quote" || target === "#inquiry") {
        document.getElementById("contactForm").scrollIntoView({
          behavior: "smooth",
          block: "start",
        })

        const serviceSelect = document.getElementById("serviceInterest")
        if (target === "#consultation") {
          serviceSelect.value = "consultation"
        } else if (target === "#quote") {
          serviceSelect.value = "research"
        } else if (target === "#inquiry") {
          serviceSelect.value = ""
        }

        serviceSelect.style.background = "rgba(37, 99, 235, 0.1)"
        setTimeout(() => {
          serviceSelect.style.background = ""
        }, 1000)
      }
    })
  })

  initEnhancedFAQ()
  initContactMethodLogic()
})

function handleInputFocus(e) {
  const field = e.target
  field.style.transform = "translateY(-1px)"
  field.style.boxShadow = "0 4px 12px rgba(37, 99, 235, 0.15)"

  field.addEventListener(
    "blur",
    function removeFocusEffect() {
      field.style.transform = ""
      field.style.boxShadow = ""
      field.removeEventListener("blur", removeFocusEffect)
    },
    { once: true },
  )
}

function validateField(e) {
  const field = e.target
  const value = field.value.trim()

  // Remove existing validation classes
  field.classList.remove("is-valid", "is-invalid")

  // Validate based on field type
  let isValid = true

  if (field.hasAttribute("required") && !value) {
    isValid = false
  } else if (field.type === "email" && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    isValid = emailRegex.test(value)
  } else if (field.type === "tel" && value) {
    const phoneRegex = /^[+]?[1-9][\d]{0,15}$/
    isValid = phoneRegex.test(value.replace(/\s/g, ""))
  }

  // Apply validation class
  field.classList.add(isValid ? "is-valid" : "is-invalid")

  return isValid
}

function clearValidation(e) {
  const field = e.target
  if (field.classList.contains("is-invalid")) {
    field.classList.remove("is-invalid")
  }
}

function handleEnhancedFormSubmission(e) {
  e.preventDefault()

  const form = e.target
  const formData = new FormData(form)
  const button = form.querySelector('button[type="submit"]')
  const originalHTML = button.innerHTML

  const inputs = form.querySelectorAll("input[required], select[required], textarea[required]")
  let isFormValid = true

  inputs.forEach((input) => {
    if (!validateField({ target: input })) {
      isFormValid = false
    }
  })

  if (!isFormValid) {
    window.RecentDST.showNotification("Please correct the highlighted fields before submitting.", "error")
    return
  }

  button.innerHTML = '<span class="loading-spinner"></span> Sending Message...'
  button.disabled = true
  form.classList.add("form-loading")

  fetch("api/contact-form.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        window.RecentDST.showNotification(data.message, "success")

        // Reset form with animation
        const formInputs = form.querySelectorAll("input, textarea, select")
        formInputs.forEach((input, index) => {
          setTimeout(() => {
            input.style.transform = "scale(0.95)"
            setTimeout(() => {
              if (input.type !== "checkbox") {
                input.value = ""
              } else {
                input.checked = false
              }
              input.classList.remove("is-valid", "is-invalid")
              input.style.transform = "scale(1)"
            }, 100)
          }, index * 50)
        })
      } else {
        window.RecentDST.showNotification(data.message, "error")
        if (data.errors) {
          data.errors.forEach((error) => {
            console.error("Form validation error:", error)
          })
        }
      }
    })
    .catch((error) => {
      console.error("Form submission error:", error)
      window.RecentDST.showNotification("Sorry, there was an error sending your message. Please try again.", "error")
    })
    .finally(() => {
      setTimeout(() => {
        button.innerHTML = originalHTML
        button.disabled = false
        form.classList.remove("form-loading")
      }, 1500)
    })
}

function initEnhancedFAQ() {
  const faqButtons = document.querySelectorAll(".accordion-button")

  faqButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const icon = button.querySelector("i") || button.querySelector(".faq-icon")
      if (icon) {
        icon.style.transform = button.classList.contains("collapsed") ? "rotate(0deg)" : "rotate(180deg)"
      }
    })
  })
}

function initContactMethodLogic() {
  const contactMethods = document.querySelectorAll('input[name="contactMethod"]')
  const phoneInput = document.getElementById("phone")

  contactMethods.forEach((method) => {
    method.addEventListener("change", () => {
      const phoneSelected = document.querySelector('input[name="contactMethod"][value="phone"]').checked
      const whatsappSelected = document.querySelector('input[name="contactMethod"][value="whatsapp"]').checked

      if (phoneSelected || whatsappSelected) {
        phoneInput.setAttribute("required", "")
        phoneInput.parentElement.querySelector("label").innerHTML = "Phone Number *"
      } else {
        phoneInput.removeAttribute("required")
        phoneInput.parentElement.querySelector("label").innerHTML = "Phone Number"
      }
    })
  })
}

window.ContactEnhancements = {
  validateField,
  handleEnhancedFormSubmission,
  initEnhancedFAQ,
  initContactMethodLogic,
}
