// Admin Dashboard JavaScript
document.addEventListener("DOMContentLoaded", () => {
  // Check authentication
  checkAuthentication()

  // Initialize dashboard
  initializeDashboard()

  // Set up event listeners
  setupEventListeners()

  // Load initial data
  loadDashboardData()
})

function checkAuthentication() {
  const userData = localStorage.getItem("adminUser") || sessionStorage.getItem("adminUser")

  if (!userData) {
    window.location.href = "login.html"
    return
  }

  const user = JSON.parse(userData)
  document.getElementById("adminName").textContent = user.name
}

function initializeDashboard() {
  // Set current date
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
  document.getElementById("currentDate").textContent = currentDate

  // Initialize navigation
  setupNavigation()
}

function setupNavigation() {
  const navLinks = document.querySelectorAll(".sidebar-nav .nav-link")
  const contentSections = document.querySelectorAll(".content-section")

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      // Remove active class from all links
      navLinks.forEach((l) => l.classList.remove("active"))

      // Add active class to clicked link
      this.classList.add("active")

      // Hide all content sections
      contentSections.forEach((section) => section.classList.remove("active"))

      // Show target section
      const targetSection = this.getAttribute("data-section") + "-section"
      const section = document.getElementById(targetSection)
      if (section) {
        section.classList.add("active")

        // Load section-specific data
        loadSectionData(this.getAttribute("data-section"))
      }
    })
  })
}

function setupEventListeners() {
  // Sidebar toggle
  document.getElementById("sidebarToggle").addEventListener("click", () => {
    document.getElementById("sidebar").classList.toggle("show")
  })

  // Logout
  document.getElementById("logoutBtn").addEventListener("click", (e) => {
    e.preventDefault()
    logout()
  })

  // New post buttons
  document.getElementById("newBlogPostBtn").addEventListener("click", () => {
    openNewPostModal("blog")
  })

  document.getElementById("newNewsPostBtn").addEventListener("click", () => {
    openNewPostModal("news")
  })

  // Quick action buttons
  document.querySelectorAll("[data-section]").forEach((btn) => {
    if (btn.hasAttribute("data-action")) {
      btn.addEventListener("click", function () {
        const section = this.getAttribute("data-section")
        const action = this.getAttribute("data-action")

        if (action === "new") {
          if (section === "blog-posts") {
            openNewPostModal("blog")
          } else if (section === "news-posts") {
            openNewPostModal("news")
          }
        } else {
          // Navigate to section
          document.querySelector(`[data-section="${section}"]`).click()
        }
      })
    }
  })

  // Save post button
  document.getElementById("savePostBtn").addEventListener("click", savePost)
}

function loadDashboardData() {
  // Simulate loading dashboard statistics
  const stats = {
    blogPosts: 12,
    newsPosts: 8,
    contacts: 24,
    subscribers: 156,
  }

  document.getElementById("blogPostsCount").textContent = stats.blogPosts
  document.getElementById("newsPostsCount").textContent = stats.newsPosts
  document.getElementById("contactsCount").textContent = stats.contacts
  document.getElementById("subscribersCount").textContent = stats.subscribers
}

function loadSectionData(section) {
  switch (section) {
    case "blog-posts":
      loadBlogPosts()
      break
    case "news-posts":
      loadNewsPosts()
      break
    case "contacts":
      loadContacts()
      break
    case "quotes":
      loadQuotes()
      break
    case "newsletter":
      loadNewsletter()
      break
  }
}

function loadBlogPosts() {
  const tableBody = document.querySelector("#blogPostsTable tbody")

  // Sample blog posts data
  const blogPosts = [
    {
      id: 1,
      title: "Digital Agriculture: Transforming Food Security in West Africa",
      category: "Digital Solutions",
      status: "published",
      publishedAt: "2025-03-15",
      featured: true,
    },
    {
      id: 2,
      title: "The Role of GIS Technology in Urban Planning",
      category: "Research",
      status: "published",
      publishedAt: "2025-02-28",
      featured: true,
    },
    {
      id: 3,
      title: "Market Research Best Practices for NGO Program Design",
      category: "Research",
      status: "published",
      publishedAt: "2025-03-01",
      featured: false,
    },
  ]

  tableBody.innerHTML = blogPosts
    .map(
      (post) => `
        <tr>
            <td>
                <strong>${post.title}</strong>
                ${post.featured ? '<span class="badge bg-warning ms-2">Featured</span>' : ""}
            </td>
            <td>${post.category}</td>
            <td><span class="badge bg-success">${post.status}</span></td>
            <td>${formatDate(post.publishedAt)}</td>
            <td>
                <button class="btn btn-sm btn-outline-primary me-1" onclick="editPost('blog', ${post.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger" onclick="deletePost('blog', ${post.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `,
    )
    .join("")
}

function loadNewsPosts() {
  const tableBody = document.querySelector("#newsPostsTable tbody")

  // Sample news posts data
  const newsPosts = [
    {
      id: 1,
      title: "ReCentDST Partners with FLS Group for Wind Farm Feasibility Study",
      category: "Company News",
      status: "published",
      publishedAt: "2025-03-10",
      featured: true,
    },
    {
      id: 2,
      title: "New Research Initiative: Small Scale Biogas Plants Nationwide",
      category: "Research Insights",
      status: "published",
      publishedAt: "2025-03-05",
      featured: false,
    },
  ]

  tableBody.innerHTML = newsPosts
    .map(
      (post) => `
        <tr>
            <td>
                <strong>${post.title}</strong>
                ${post.featured ? '<span class="badge bg-warning ms-2">Featured</span>' : ""}
            </td>
            <td>${post.category}</td>
            <td><span class="badge bg-success">${post.status}</span></td>
            <td>${formatDate(post.publishedAt)}</td>
            <td>
                <button class="btn btn-sm btn-outline-primary me-1" onclick="editPost('news', ${post.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger" onclick="deletePost('news', ${post.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `,
    )
    .join("")
}

function openNewPostModal(type) {
  const modal = window.bootstrap.Modal.getOrCreateInstance(document.getElementById("newPostModal"))
  const modalTitle = document.getElementById("modalTitle")
  const categorySelect = document.getElementById("postCategory")

  // Set modal title
  modalTitle.textContent = type === "blog" ? "New Blog Post" : "New News Article"

  // Set category options
  if (type === "blog") {
    categorySelect.innerHTML = `
            <option value="">Select Category</option>
            <option value="research">Research</option>
            <option value="digital_solutions">Digital Solutions</option>
            <option value="agricultural_development">Agricultural Development</option>
            <option value="government_solutions">Government Solutions</option>
        `
  } else {
    categorySelect.innerHTML = `
            <option value="">Select Category</option>
            <option value="research_insights">Research Insights</option>
            <option value="tech_trends">Tech Trends</option>
            <option value="case_studies">Case Studies</option>
            <option value="company_news">Company News</option>
            <option value="industry_analysis">Industry Analysis</option>
        `
  }

  // Store post type for saving
  document.getElementById("postForm").setAttribute("data-type", type)

  // Reset form
  document.getElementById("postForm").reset()

  modal.show()
}

function editPost(type, id) {
  // Fetch post data from API
  fetch(`../api/blog-posts.php?action=single&id=${id}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        // Open edit modal with post data
        openEditPostModal(type, data.post)
      } else {
        alert("Error loading post data: " + data.message)
      }
    })
    .catch((error) => {
      console.error("Error:", error)
      alert("Error loading post data")
    })
}

function openEditPostModal(type, postData) {
  const modal = window.bootstrap.Modal.getOrCreateInstance(document.getElementById("newPostModal"))
  const modalTitle = document.getElementById("modalTitle")
  const form = document.getElementById("postForm")

  // Set modal title
  modalTitle.textContent = `Edit ${type === "blog" ? "Blog Post" : "News Article"}`

  // Pre-fill form with existing data
  document.getElementById("postTitle").value = postData.title || ""
  document.getElementById("postCategory").value = postData.category || ""
  document.getElementById("postSummary").value = postData.summary || ""
  document.getElementById("postContent").value = postData.content || ""
  document.getElementById("readingTime").value = postData.reading_time || ""
  document.getElementById("publishNow").checked = postData.status === "published"

  // Store post ID and type for updating
  form.setAttribute("data-type", type)
  form.setAttribute("data-id", postData.id)
  form.setAttribute("data-mode", "edit")

  // Update save button text
  document.getElementById("savePostBtn").innerHTML = '<i class="fas fa-save me-2"></i>Update Post'

  modal.show()
}

function savePost() {
  const form = document.getElementById("postForm")
  const postType = form.getAttribute("data-type")
  const postId = form.getAttribute("data-id")
  const mode = form.getAttribute("data-mode") || "create"

  // Get form data
  const formData = new FormData()
  formData.append("title", document.getElementById("postTitle").value)
  formData.append("category", document.getElementById("postCategory").value)
  formData.append("summary", document.getElementById("postSummary").value)
  formData.append("content", document.getElementById("postContent").value)
  formData.append("readingTime", document.getElementById("readingTime").value)
  formData.append("status", document.getElementById("publishNow").checked ? "published" : "draft")

  if (document.getElementById("coverImage").files[0]) {
    formData.append("coverImage", document.getElementById("coverImage").files[0])
  }

  if (mode === "edit") {
    formData.append("id", postId)
  }

  // Validate form
  const title = formData.get("title")
  const category = formData.get("category")
  const summary = formData.get("summary")
  const content = formData.get("content")

  if (!title || !category || !summary || !content) {
    alert("Please fill in all required fields.")
    return
  }

  // Show loading state
  const saveBtn = document.getElementById("savePostBtn")
  const originalText = saveBtn.innerHTML
  saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Saving...'
  saveBtn.disabled = true

  // Determine API endpoint and method
  const apiUrl = "../api/blog-posts.php"
  const method = mode === "edit" ? "PUT" : "POST"

  // Send request to API
  fetch(apiUrl, {
    method: method,
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert(
          `${postType === "blog" ? "Blog post" : "News article"} ${mode === "edit" ? "updated" : "saved"} successfully!`,
        )

        // Close modal
        window.bootstrap.Modal.getInstance(document.getElementById("newPostModal")).hide()

        // Reload the appropriate section
        if (postType === "blog") {
          loadBlogPosts()
        } else {
          loadNewsPosts()
        }

        // Reset form
        form.reset()
        form.removeAttribute("data-id")
        form.removeAttribute("data-mode")
      } else {
        alert("Error: " + data.message)
      }
    })
    .catch((error) => {
      console.error("Error:", error)
      alert("Error saving post")
    })
    .finally(() => {
      // Reset button
      saveBtn.innerHTML = originalText
      saveBtn.disabled = false
    })
}

function deletePost(type, id) {
  if (confirm(`Are you sure you want to delete this ${type} post?`)) {
    alert(`Delete ${type} post with ID: ${id}`)
    // In a real application, you would send a delete request to your backend
  }
}

function logout() {
  if (confirm("Are you sure you want to logout?")) {
    localStorage.removeItem("adminUser")
    sessionStorage.removeItem("adminUser")
    window.location.href = "login.html"
  }
}

function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

// Placeholder functions for other sections
function loadContacts() {
  console.log("Loading contacts...")
}

function loadQuotes() {
  console.log("Loading quotes...")
}

function loadNewsletter() {
  console.log("Loading newsletter subscribers...")
}

// Handle responsive sidebar
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    document.getElementById("sidebar").classList.remove("show")
  }
})
