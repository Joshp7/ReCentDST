// Blog and News System JavaScript
document.addEventListener("DOMContentLoaded", () => {
  // Initialize blog system
  initializeBlog()

  // Set up event listeners
  setupEventListeners()

  // Load initial blog posts
  loadBlogPosts()
})

// Blog data structure
const blogData = {
  posts: [],
  currentFilter: "all",
  currentPage: 1,
  postsPerPage: 6,
  searchQuery: "",
}

// Sample blog posts data (in a real application, this would come from the database)
const sampleBlogPosts = [
  {
    id: 1,
    title: "Digital Agriculture: Transforming Food Security in West Africa",
    slug: "digital-agriculture-west-africa",
    category: "tech",
    categoryName: "Tech Trends",
    summary:
      "Comprehensive analysis of how digital technologies are revolutionizing agricultural practices across West Africa, with specific case studies from Sierra Leone's AKIS Aid platform.",
    content:
      "This in-depth report examines the transformative impact of digital technologies on agricultural practices across West Africa...",
    coverImage: "images/blog-digital-agriculture.jpg",
    author: "ReCent DST Research Team",
    publishedAt: "2025-03-15",
    readingTime: 12,
    featured: true,
    views: 3200,
    tags: ["agriculture", "digital transformation", "west africa", "food security"],
  },
  {
    id: 2,
    title: "The Role of GIS Technology in Urban Planning: Sierra Leone Case Study",
    slug: "gis-urban-planning-sierra-leone",
    category: "research",
    categoryName: "Research Insights",
    summary:
      "Deep dive into how Geographic Information Systems are enabling better urban planning decisions in Freetown, featuring our Western Area Zonal Mapping project.",
    content: "Geographic Information Systems (GIS) have become indispensable tools for urban planners worldwide...",
    coverImage: "images/blog-gis-urban.jpg",
    author: "Prof. Percival Showers",
    publishedAt: "2025-02-28",
    readingTime: 8,
    featured: false,
    views: 2500,
    tags: ["gis", "urban planning", "freetown", "mapping"],
  },
  {
    id: 3,
    title: "Market Research Best Practices for NGO Program Design",
    slug: "ngo-market-research-best-practices",
    category: "industry",
    categoryName: "Industry Analysis",
    summary:
      "Evidence-based guidelines for non-governmental organizations on conducting effective market research to inform program design and implementation strategies.",
    content: "Non-governmental organizations (NGOs) play a crucial role in addressing social challenges...",
    coverImage: "images/blog-ngo-research.jpg",
    author: "Harold Domingo",
    publishedAt: "2025-03-01",
    readingTime: 12,
    featured: false,
    views: 1800,
    tags: ["ngo", "market research", "program design", "best practices"],
  },
  {
    id: 4,
    title: "The Future of Digital Payment Systems in Sierra Leone",
    slug: "digital-payments-sierra-leone-future",
    category: "tech",
    categoryName: "Tech Trends",
    summary:
      "Analysis of mobile money adoption trends and the potential for digital payment systems to transform financial inclusion in Sierra Leone's emerging economy.",
    content: "Digital payment systems are rapidly transforming the financial landscape across Africa...",
    coverImage: "images/blog-mobile-money.jpg",
    author: "Olaoluwa Ogunfeyitimi",
    publishedAt: "2025-02-20",
    readingTime: 6,
    featured: false,
    views: 1600,
    tags: ["mobile money", "digital payments", "financial inclusion", "sierra leone"],
  },
  {
    id: 5,
    title: "Building Agrilinxs: Connecting Farmers to Markets Through Digital Innovation",
    slug: "agrilinxs-case-study-digital-innovation",
    category: "case-studies",
    categoryName: "Case Studies",
    summary:
      "Detailed examination of the Agrilinxs development journey, from concept to implementation, including challenges faced and solutions implemented.",
    content:
      "The Agrilinxs platform represents a significant milestone in our mission to connect farmers with markets...",
    coverImage: "images/blog-agrilinxs-case.jpg",
    author: "Louise Chaytor",
    publishedAt: "2025-02-15",
    readingTime: 10,
    featured: false,
    views: 2100,
    tags: ["agrilinxs", "case study", "farmers", "digital platform"],
  },
  {
    id: 6,
    title: "ReCent DST Partners with FLS Group for Wind Farm Feasibility Study",
    slug: "recentdst-fls-wind-farm-partnership",
    category: "company",
    categoryName: "Company News",
    summary:
      "Announcing our strategic partnership with FLS Group to conduct comprehensive feasibility studies for wind energy projects across West Africa.",
    content: "We are excited to announce our strategic partnership with FLS Group...",
    coverImage: "images/blog-company-expansion.jpg",
    author: "ReCent DST Communications",
    publishedAt: "2025-03-10",
    readingTime: 4,
    featured: false,
    views: 950,
    tags: ["partnership", "wind energy", "feasibility study", "renewable energy"],
  },
  {
    id: 7,
    title: "Climate Change Impact Assessment: Research Methodologies for West Africa",
    slug: "climate-change-research-methodologies-west-africa",
    category: "research",
    categoryName: "Research Insights",
    summary:
      "Comprehensive overview of research methodologies and frameworks for assessing climate change impacts in West African contexts, with practical applications.",
    content: "Climate change poses significant challenges to West African countries...",
    coverImage: "images/blog-climate-research.jpg",
    author: "Prof. Percival Showers",
    publishedAt: "2025-02-05",
    readingTime: 15,
    featured: false,
    views: 1750,
    tags: ["climate change", "research methodology", "west africa", "impact assessment"],
  },
  {
    id: 8,
    title: "New Research Initiative: Small Scale Biogas Plants Nationwide",
    slug: "biogas-plants-research-initiative",
    category: "company",
    categoryName: "Company News",
    summary:
      "Launching our comprehensive research program to assess the viability and impact of small-scale biogas plants across Sierra Leone's rural communities.",
    content:
      "We are proud to announce the launch of our new research initiative focusing on small-scale biogas plants...",
    coverImage: "images/blog-biogas-research.jpg",
    author: "ReCent DST Research Team",
    publishedAt: "2025-03-05",
    readingTime: 7,
    featured: false,
    views: 1200,
    tags: ["biogas", "renewable energy", "rural development", "research initiative"],
  },
]

function initializeBlog() {
  // Initialize blog data
  blogData.posts = sampleBlogPosts

  // Update category counts
  updateCategoryCounts()

  // Set up featured post
  displayFeaturedPost()

  // Update popular articles
  updatePopularArticles()
}

function setupEventListeners() {
  // Category filter buttons
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const category = this.getAttribute("data-category")
      filterPosts(category)

      // Update active button
      document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"))
      this.classList.add("active")
    })
  })

  // Search functionality
  const searchInput = document.getElementById("blogSearch")
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      blogData.searchQuery = this.value.toLowerCase()
      filterAndDisplayPosts()
    })
  }

  // Load more button
  const loadMoreBtn = document.getElementById("loadMoreBtn")
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", () => {
      blogData.currentPage++
      displayPosts(true) // append = true
    })
  }

  // Newsletter form
  document.querySelectorAll(".newsletter-form").forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault()
      handleNewsletterSignup(this)
    })
  })
}

function loadBlogPosts() {
  // In a real application, this would fetch from the database
  // For now, we'll use the sample data
  displayPosts()
}

function filterPosts(category) {
  blogData.currentFilter = category
  blogData.currentPage = 1
  filterAndDisplayPosts()
}

function filterAndDisplayPosts() {
  let filteredPosts = blogData.posts

  // Apply category filter
  if (blogData.currentFilter !== "all") {
    filteredPosts = filteredPosts.filter((post) => post.category === blogData.currentFilter)
  }

  // Apply search filter
  if (blogData.searchQuery) {
    filteredPosts = filteredPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(blogData.searchQuery) ||
        post.summary.toLowerCase().includes(blogData.searchQuery) ||
        post.tags.some((tag) => tag.toLowerCase().includes(blogData.searchQuery)),
    )
  }

  // Sort by date (newest first)
  filteredPosts.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))

  displayPosts(false, filteredPosts)
}

function displayPosts(append = false, posts = null) {
  const postsContainer = document.querySelector(".blog-posts")
  if (!postsContainer) return

  const postsToShow = posts || blogData.posts
  const startIndex = append ? (blogData.currentPage - 1) * blogData.postsPerPage : 0
  const endIndex = blogData.currentPage * blogData.postsPerPage
  const currentPosts = postsToShow.slice(startIndex, endIndex)

  if (!append) {
    postsContainer.innerHTML = ""
  }

  currentPosts.forEach((post, index) => {
    const postElement = createPostElement(post, startIndex + index)
    postsContainer.appendChild(postElement)
  })

  // Update load more button visibility
  const loadMoreBtn = document.getElementById("loadMoreBtn")
  if (loadMoreBtn) {
    if (endIndex >= postsToShow.length) {
      loadMoreBtn.style.display = "none"
    } else {
      loadMoreBtn.style.display = "block"
    }
  }

  // Reinitialize AOS for new elements
  if (typeof AOS !== "undefined") {
    AOS.refresh()
  }
}

function createPostElement(post, index) {
  const postDiv = document.createElement("div")
  postDiv.className = "col-lg-4 col-md-6 mb-4 blog-post"
  postDiv.setAttribute("data-category", post.category)
  postDiv.setAttribute("data-aos", "fade-up")
  postDiv.setAttribute("data-aos-delay", (index % 3) * 100)

  postDiv.innerHTML = `
        <article class="blog-card glassmorphism-card">
            <div class="blog-image">
                <img src="${post.coverImage}" alt="${post.title}" class="img-fluid">
                <div class="blog-category">${post.categoryName}</div>
                ${post.featured ? '<div class="featured-badge">Featured</div>' : ""}
            </div>
            <div class="blog-content">
                <h4><a href="blog-post.html?slug=${post.slug}">${post.title}</a></h4>
                <p>${post.summary}</p>
                <div class="blog-meta">
                    <span><i class="fas fa-calendar"></i> ${formatDate(post.publishedAt)}</span>
                    <span><i class="fas fa-clock"></i> ${post.readingTime} min read</span>
                    <span><i class="fas fa-eye"></i> ${formatViews(post.views)}</span>
                </div>
                <div class="blog-tags mb-3">
                    ${post.tags
                      .slice(0, 3)
                      .map((tag) => `<span class="tag">#${tag}</span>`)
                      .join("")}
                </div>
                <a href="blog-post.html?slug=${post.slug}" class="btn btn-outline-primary btn-sm">Read Article</a>
            </div>
        </article>
    `

  return postDiv
}

function displayFeaturedPost() {
  const featuredPost = blogData.posts.find((post) => post.featured)
  if (!featuredPost) return

  const featuredContainer = document.querySelector(".featured-post")
  if (!featuredContainer) return

  featuredContainer.innerHTML = `
        <div class="featured-image">
            <img src="${featuredPost.coverImage}" alt="${featuredPost.title}" class="img-fluid">
            <div class="featured-badge">Featured Article</div>
        </div>
        <div class="featured-content">
            <div class="post-category">${featuredPost.categoryName}</div>
            <h2><a href="blog-post.html?slug=${featuredPost.slug}">${featuredPost.title}</a></h2>
            <p class="lead">${featuredPost.summary}</p>
            <p>${featuredPost.content.substring(0, 200)}...</p>
            <div class="post-meta">
                <span><i class="fas fa-calendar"></i> ${formatDate(featuredPost.publishedAt)}</span>
                <span><i class="fas fa-user"></i> ${featuredPost.author}</span>
                <span><i class="fas fa-clock"></i> ${featuredPost.readingTime} min read</span>
                <span><i class="fas fa-eye"></i> ${formatViews(featuredPost.views)}</span>
            </div>
            <div class="featured-tags mb-3">
                ${featuredPost.tags.map((tag) => `<span class="tag">#${tag}</span>`).join("")}
            </div>
            <a href="blog-post.html?slug=${featuredPost.slug}" class="btn btn-primary">Read Full Article</a>
        </div>
    `
}

function updatePopularArticles() {
  const popularContainer = document.querySelector(".popular-list")
  if (!popularContainer) return

  // Sort by views and get top 3
  const popularPosts = [...blogData.posts].sort((a, b) => b.views - a.views).slice(0, 3)

  popularContainer.innerHTML = popularPosts
    .map(
      (post) => `
        <div class="popular-item">
            <h6><a href="blog-post.html?slug=${post.slug}">${post.title}</a></h6>
            <small><i class="fas fa-eye"></i> ${formatViews(post.views)} views</small>
        </div>
    `,
    )
    .join("")
}

function updateCategoryCounts() {
  const categoryCounts = {}

  blogData.posts.forEach((post) => {
    categoryCounts[post.category] = (categoryCounts[post.category] || 0) + 1
  })

  // Update category cards
  document.querySelectorAll(".category-card").forEach((card) => {
    const categoryIcon = card.querySelector(".category-icon i")
    if (!categoryIcon) return

    let category = ""
    if (categoryIcon.classList.contains("fa-microscope")) category = "research"
    else if (categoryIcon.classList.contains("fa-laptop-code")) category = "tech"
    else if (categoryIcon.classList.contains("fa-chart-line")) category = "case-studies"
    else if (categoryIcon.classList.contains("fa-building")) category = "company"
    else if (categoryIcon.classList.contains("fa-industry")) category = "industry"

    if (category && categoryCounts[category]) {
      const countElement = card.querySelector(".category-count")
      if (countElement) {
        countElement.textContent = `${categoryCounts[category]} articles`
      }
    }
  })
}

function handleNewsletterSignup(form) {
  const emailInput = form.querySelector('input[type="email"]')
  const email = emailInput.value.trim()

  if (!email) {
    showNotification("Please enter a valid email address.", "error")
    return
  }

  // Show loading state
  const submitBtn = form.querySelector('button[type="submit"]')
  const originalText = submitBtn.textContent
  submitBtn.textContent = "Subscribing..."
  submitBtn.disabled = true

  // Simulate API call
  setTimeout(() => {
    // In a real application, this would send the email to your backend
    console.log("Newsletter signup:", email)

    // Store in localStorage for demo purposes
    const subscribers = JSON.parse(localStorage.getItem("newsletter_subscribers") || "[]")
    if (!subscribers.includes(email)) {
      subscribers.push(email)
      localStorage.setItem("newsletter_subscribers", JSON.stringify(subscribers))
      showNotification("Successfully subscribed to our newsletter!", "success")
      emailInput.value = ""
    } else {
      showNotification("You are already subscribed to our newsletter.", "info")
    }

    // Reset button
    submitBtn.textContent = originalText
    submitBtn.disabled = false
  }, 1500)
}

function showNotification(message, type = "info") {
  // Create notification element
  const notification = document.createElement("div")
  notification.className = `alert alert-${type === "error" ? "danger" : type === "success" ? "success" : "info"} notification-toast`
  notification.innerHTML = `
        <i class="fas fa-${type === "error" ? "exclamation-triangle" : type === "success" ? "check-circle" : "info-circle"} me-2"></i>
        ${message}
        <button type="button" class="btn-close" onclick="this.parentElement.remove()"></button>
    `

  // Add to page
  document.body.appendChild(notification)

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.remove()
    }
  }, 5000)
}

// Utility functions
function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

function formatViews(views) {
  if (views >= 1000) {
    return (views / 1000).toFixed(1) + "k"
  }
  return views.toString()
}

// Export functions for use in other scripts
window.blogSystem = {
  filterPosts,
  loadBlogPosts,
  handleNewsletterSignup,
  showNotification,
}
