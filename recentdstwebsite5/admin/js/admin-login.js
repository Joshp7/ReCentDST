// Admin Login JavaScript
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm")
  const loginError = document.getElementById("loginError")
  const togglePassword = document.getElementById("togglePassword")
  const passwordInput = document.getElementById("password")
  const loginBtn = loginForm.querySelector(".login-btn")

  // Demo credentials for testing
  const demoCredentials = {
    admin: { password: "admin123", name: "System Administrator", role: "super_admin" },
    louise: { password: "admin123", name: "Louise Chaytor", role: "admin" },
    editor: { password: "admin123", name: "Content Editor", role: "editor" },
  }

  // Toggle password visibility
  togglePassword.addEventListener("click", function () {
    const type = passwordInput.getAttribute("type") === "password" ? "text" : "password"
    passwordInput.setAttribute("type", type)

    const icon = this.querySelector("i")
    icon.classList.toggle("fa-eye")
    icon.classList.toggle("fa-eye-slash")
  })

  // Handle login form submission
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const username = document.getElementById("username").value.trim()
    const password = document.getElementById("password").value
    const rememberMe = document.getElementById("rememberMe").checked

    // Show loading state
    showLoading(true)
    hideError()

    // Simulate API call delay
    setTimeout(() => {
      if (validateCredentials(username, password)) {
        // Store user session
        const userData = {
          username: username,
          name: demoCredentials[username].name,
          role: demoCredentials[username].role,
          loginTime: new Date().toISOString(),
        }

        if (rememberMe) {
          localStorage.setItem("adminUser", JSON.stringify(userData))
        } else {
          sessionStorage.setItem("adminUser", JSON.stringify(userData))
        }

        // Redirect to dashboard
        window.location.href = "dashboard.html"
      } else {
        showError("Invalid username or password. Please try again.")
        showLoading(false)
      }
    }, 1500)
  })

  function validateCredentials(username, password) {
    return demoCredentials[username] && demoCredentials[username].password === password
  }

  function showLoading(show) {
    const btnText = loginBtn.querySelector(".btn-text")
    const spinner = loginBtn.querySelector(".spinner-border")

    if (show) {
      btnText.textContent = "Signing In..."
      spinner.classList.remove("d-none")
      loginBtn.disabled = true
    } else {
      btnText.textContent = "Sign In"
      spinner.classList.add("d-none")
      loginBtn.disabled = false
    }
  }

  function showError(message) {
    document.getElementById("errorMessage").textContent = message
    loginError.classList.remove("d-none")
  }

  function hideError() {
    loginError.classList.add("d-none")
  }

  // Check if user is already logged in
  const storedUser = localStorage.getItem("adminUser") || sessionStorage.getItem("adminUser")
  if (storedUser) {
    window.location.href = "dashboard.html"
  }

  // Auto-fill demo credentials on click
  document.querySelectorAll(".demo-credentials small").forEach((credential) => {
    credential.addEventListener("click", function () {
      const text = this.textContent
      if (text.includes("admin")) {
        document.getElementById("username").value = "admin"
        document.getElementById("password").value = "admin123"
      } else if (text.includes("editor")) {
        document.getElementById("username").value = "editor"
        document.getElementById("password").value = "admin123"
      }
    })
  })
})
