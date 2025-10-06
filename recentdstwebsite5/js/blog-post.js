// Blog Post JavaScript
document.addEventListener("DOMContentLoaded", () => {
  // Get post slug from URL
  const urlParams = new URLSearchParams(window.location.search)
  const postSlug = urlParams.get("slug")

  if (postSlug) {
    loadBlogPost(postSlug)
  } else {
    // Redirect to blog page if no slug provided
    window.location.href = "blog.html"
  }

  // Set up event listeners
  setupEventListeners()
})

// Sample blog posts data (same as in blog.js)
const sampleBlogPosts = [
  {
    id: 1,
    title: "Digital Agriculture: Transforming Food Security in West Africa",
    slug: "digital-agriculture-west-africa",
    category: "tech",
    categoryName: "Tech Trends",
    summary:
      "Comprehensive analysis of how digital technologies are revolutionizing agricultural practices across West Africa, with specific case studies from Sierra Leone's AKIS Aid platform.",
    content: `
            <h2>Introduction</h2>
            <p>Digital agriculture represents a paradigm shift in how we approach food production and security across West Africa. This comprehensive analysis examines the transformative impact of digital technologies on agricultural practices, with specific focus on successful implementations in Sierra Leone and neighboring countries.</p>
            
            <h2>The Digital Agriculture Landscape</h2>
            <p>West Africa's agricultural sector is experiencing unprecedented transformation through the adoption of digital technologies. From precision farming techniques to mobile-based market platforms, farmers are increasingly leveraging technology to improve productivity, reduce costs, and access new markets.</p>
            
            <h3>Key Technologies Driving Change</h3>
            <ul>
                <li><strong>Mobile Applications:</strong> Platforms like AKIS Aid are connecting farmers with agricultural information, weather data, and market prices in real-time.</li>
                <li><strong>IoT Sensors:</strong> Smart sensors are monitoring soil conditions, moisture levels, and crop health, enabling data-driven farming decisions.</li>
                <li><strong>Satellite Imagery:</strong> Remote sensing technology is helping farmers optimize irrigation, detect pest infestations, and predict crop yields.</li>
                <li><strong>Blockchain Technology:</strong> Ensuring transparency in supply chains and enabling fair trade practices for smallholder farmers.</li>
            </ul>
            
            <h2>Case Study: AKIS Aid Platform</h2>
            <p>The Agricultural Knowledge and Information System (AKIS) Aid platform, developed in partnership with local agricultural organizations, exemplifies the potential of digital agriculture in Sierra Leone. This mobile-based platform provides farmers with:</p>
            
            <blockquote>
                "The AKIS Aid platform has revolutionized how we access agricultural information. What used to take days of travel to obtain, we now get instantly on our phones." - Local Farmer, Bo District
            </blockquote>
            
            <h3>Platform Features</h3>
            <p>The AKIS Aid platform offers comprehensive support for farmers through multiple channels:</p>
            <ul>
                <li>Real-time weather forecasts and climate advisories</li>
                <li>Crop management recommendations based on local conditions</li>
                <li>Market price information for major agricultural commodities</li>
                <li>Direct connection to agricultural extension services</li>
                <li>Peer-to-peer knowledge sharing among farmers</li>
            </ul>
            
            <h2>Impact Assessment</h2>
            <p>Our research indicates significant positive impacts from digital agriculture adoption:</p>
            
            <h3>Productivity Improvements</h3>
            <p>Farmers using digital tools report average productivity increases of 25-40% compared to traditional methods. This improvement stems from better timing of planting, optimized use of inputs, and improved pest management.</p>
            
            <h3>Market Access</h3>
            <p>Digital platforms have reduced information asymmetries, enabling farmers to access better prices for their produce. Market linkage platforms have increased farmer incomes by an average of 30%.</p>
            
            <h2>Challenges and Solutions</h2>
            <p>Despite the promising developments, several challenges remain:</p>
            
            <h3>Infrastructure Limitations</h3>
            <p>Limited internet connectivity and unreliable electricity supply continue to hinder widespread adoption. However, innovative solutions such as offline-capable applications and solar-powered charging stations are addressing these challenges.</p>
            
            <h3>Digital Literacy</h3>
            <p>Many farmers lack the digital skills necessary to effectively use new technologies. Comprehensive training programs and user-friendly interfaces are essential for successful adoption.</p>
            
            <h2>Future Outlook</h2>
            <p>The future of digital agriculture in West Africa looks promising, with several trends emerging:</p>
            
            <ul>
                <li><strong>AI and Machine Learning:</strong> Advanced analytics will provide more precise recommendations for crop management.</li>
                <li><strong>Drone Technology:</strong> Unmanned aerial vehicles will enable detailed crop monitoring and precision application of inputs.</li>
                <li><strong>Financial Technology Integration:</strong> Digital payment systems will facilitate access to credit and insurance for smallholder farmers.</li>
            </ul>
            
            <h2>Conclusion</h2>
            <p>Digital agriculture represents a critical pathway to achieving food security and sustainable development in West Africa. While challenges remain, the success stories from platforms like AKIS Aid demonstrate the transformative potential of technology when properly implemented and supported.</p>
            
            <p>As we move forward, continued investment in digital infrastructure, farmer education, and technology development will be essential to realizing the full potential of digital agriculture across the region.</p>
        `,
    coverImage: "images/blog-digital-agriculture.jpg",
    author: "ReCent DST Research Team",
    publishedAt: "2025-03-15",
    readingTime: 12,
    featured: true,
    views: 3200,
    tags: ["agriculture", "digital transformation", "west africa", "food security"],
  },
  // Add other posts here...
]

function loadBlogPost(slug) {
  // Find the post by slug
  const post = sampleBlogPosts.find((p) => p.slug === slug)

  if (!post) {
    // Post not found, redirect to blog page
    window.location.href = "blog.html"
    return
  }

  // Update page title and meta
  document.title = `${post.title} - ReCentDST Limited`
  document.getElementById("postDescription").content = post.summary

  // Update breadcrumb
  document.getElementById("breadcrumbTitle").textContent = post.title

  // Update article header
  document.getElementById("articleCategory").textContent = post.categoryName
  document.getElementById("articleTitle").textContent = post.title
  document.getElementById("articleSummary").textContent = post.summary

  // Update article meta
  document.getElementById("publishDate").textContent = formatDate(post.publishedAt)
  document.getElementById("authorName").textContent = post.author
  document.getElementById("readingTime").textContent = post.readingTime
  document.getElementById("viewCount").textContent = formatViews(post.views)

  // Update tags
  const tagsContainer = document.getElementById("articleTags")
  tagsContainer.innerHTML = post.tags.map((tag) => `<span class="tag">#${tag}</span>`).join("")

  // Update article image
  const imageContainer = document.getElementById("articleImageContainer")
  imageContainer.innerHTML = `<img src="${post.coverImage}" alt="${post.title}" class="img-fluid article-featured-image">`

  // Update article content
  document.getElementById("articleBody").innerHTML = post.content

  // Update author info
  updateAuthorInfo(post.author)

  // Set up share buttons
  setupShareButtons(post)

  // Generate table of contents
  generateTableOfContents()

  // Load related articles
  loadRelatedArticles(post)

  // Load more articles
  loadMoreArticles(post)

  // Increment view count (in a real app, this would be done server-side)
  incrementViewCount(post.id)

  // Initialize AOS
  const AOS = window.AOS // Declare AOS variable
  if (typeof AOS !== "undefined") {
    AOS.init()
  }
}

function updateAuthorInfo(authorName) {
  const authorContainer = document.getElementById("authorInfo")

  // Simple author mapping (in a real app, this would come from a database)
  const authorInfo = {
    "ReCent DST Research Team": {
      name: "ReCent DST Research Team",
      bio: "Our multidisciplinary research team combines expertise in science, technology, and development to deliver comprehensive insights.",
      avatar: "images/team/research-team.jpg",
    },
    "Prof. Percival Showers": {
      name: "Prof. Percival Showers, PhD",
      bio: "Director of Scientific Research with over 40 years of experience in environmental science and research methodology.",
      avatar: "images/team/percival-showers.jpg",
    },
    "Louise Chaytor": {
      name: "Louise Chaytor",
      bio: "Managing Director and ICT Expert with 16+ years of marketing expertise and extensive experience in technology solutions.",
      avatar: "images/team/louise-chaytor.jpg",
    },
    "Harold Domingo": {
      name: "Harold Domingo",
      bio: "Director of Market Research with extensive experience in market analysis and business intelligence.",
      avatar: "images/team/harold-domingo.jpg",
    },
    "Olaoluwa Ogunfeyitimi": {
      name: "Olaoluwa Ogunfeyitimi",
      bio: "Director of Technology Research, bringing innovative solutions and cutting-edge research capabilities.",
      avatar: "images/team/olaoluwa-ogunfeyitimi.jpg",
    },
  }

  const author = authorInfo[authorName] || authorInfo["ReCent DST Research Team"]

  authorContainer.innerHTML = `
        <div class="d-flex align-items-center">
            <img src="${author.avatar}" alt="${author.name}" class="author-avatar me-3">
            <div>
                <h6 class="mb-1">${author.name}</h6>
                <p class="mb-0 text-muted small">${author.bio}</p>
            </div>
        </div>
    `
}

function setupShareButtons(post) {
  const currentUrl = window.location.href
  const title = encodeURIComponent(post.title)
  const summary = encodeURIComponent(post.summary)

  // LinkedIn
  document.getElementById("shareLinkedIn").href =
    `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`

  // Twitter
  document.getElementById("shareTwitter").href =
    `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${title}`

  // Facebook
  document.getElementById("shareFacebook").href =
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`

  // Email
  document.getElementById("shareEmail").href =
    `mailto:?subject=${title}&body=${summary}%0A%0ARead more: ${encodeURIComponent(currentUrl)}`
}

function generateTableOfContents() {
  const articleBody = document.getElementById("articleBody")
  const headings = articleBody.querySelectorAll("h2, h3")

  if (headings.length === 0) return

  const tocList = document.getElementById("tocList")
  const tocWidget = document.getElementById("tocWidget")

  let tocHTML = ""
  headings.forEach((heading, index) => {
    const id = `heading-${index}`
    heading.id = id

    const level = heading.tagName === "H2" ? "toc-level-1" : "toc-level-2"
    tocHTML += `<li class="${level}"><a href="#${id}">${heading.textContent}</a></li>`
  })

  tocList.innerHTML = tocHTML
  tocWidget.style.display = "block"

  // Smooth scroll for TOC links
  tocList.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href").substring(1)
      const targetElement = document.getElementById(targetId)
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" })
      }
    })
  })
}

function loadRelatedArticles(currentPost) {
  const relatedContainer = document.getElementById("relatedArticles")

  // Find related articles based on tags and category
  const relatedPosts = sampleBlogPosts
    .filter((post) => post.id !== currentPost.id)
    .filter((post) => post.category === currentPost.category || post.tags.some((tag) => currentPost.tags.includes(tag)))
    .slice(0, 3)

  if (relatedPosts.length === 0) {
    relatedContainer.innerHTML = '<p class="text-muted">No related articles found.</p>'
    return
  }

  const relatedHTML = relatedPosts
    .map(
      (post) => `
      <div class="col-md-4 mb-4">
          <div class="card h-100 border-0 shadow-sm">
              <img src="${post.coverImage}" class="card-img-top" alt="${post.title}" style="height: 200px; object-fit: cover;">
              <div class="card-body d-flex flex-column">
                  <span class="badge bg-primary mb-2 align-self-start">${post.categoryName}</span>
                  <h6 class="card-title">${post.title}</h6>
                  <p class="card-text text-muted small flex-grow-1">${post.summary.substring(0, 100)}...</p>
                  <div class="d-flex justify-content-between align-items-center mt-auto">
                      <small class="text-muted">${formatDate(post.publishedAt)}</small>
                      <a href="blog-post.html?slug=${post.slug}" class="btn btn-sm btn-outline-primary">Read More</a>
                  </div>
              </div>
          </div>
      </div>
  `,
    )
    .join("")

  relatedContainer.innerHTML = relatedHTML
}

function loadMoreArticles(currentPost) {
  const moreContainer = document.getElementById("moreArticles")

  // Get more articles excluding current and related
  const moreArticles = sampleBlogPosts.filter((post) => post.id !== currentPost.id).slice(0, 6)

  const moreHTML = moreArticles
    .map(
      (post) => `
      <div class="col-lg-4 col-md-6 mb-4">
          <div class="card h-100 border-0 shadow-sm">
              <img src="${post.coverImage}" class="card-img-top" alt="${post.title}" style="height: 180px; object-fit: cover;">
              <div class="card-body d-flex flex-column">
                  <span class="badge bg-secondary mb-2 align-self-start">${post.categoryName}</span>
                  <h6 class="card-title">${post.title}</h6>
                  <p class="card-text text-muted small flex-grow-1">${post.summary.substring(0, 80)}...</p>
                  <div class="d-flex justify-content-between align-items-center mt-auto">
                      <small class="text-muted">${post.readingTime} min read</small>
                      <a href="blog-post.html?slug=${post.slug}" class="btn btn-sm btn-primary">Read</a>
                  </div>
              </div>
          </div>
      </div>
  `,
    )
    .join("")

  moreContainer.innerHTML = moreHTML
}

function setupEventListeners() {
  // Back to blog button
  const backButton = document.getElementById("backToBlog")
  if (backButton) {
    backButton.addEventListener("click", () => {
      window.location.href = "blog.html"
    })
  }

  // Copy link functionality
  const copyLinkBtn = document.getElementById("copyLink")
  if (copyLinkBtn) {
    copyLinkBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(window.location.href).then(() => {
        // Show success message
        const originalText = copyLinkBtn.innerHTML
        copyLinkBtn.innerHTML = '<i class="fas fa-check"></i> Copied!'
        copyLinkBtn.classList.add("btn-success")
        copyLinkBtn.classList.remove("btn-outline-secondary")

        setTimeout(() => {
          copyLinkBtn.innerHTML = originalText
          copyLinkBtn.classList.remove("btn-success")
          copyLinkBtn.classList.add("btn-outline-secondary")
        }, 2000)
      })
    })
  }
}

function incrementViewCount(postId) {
  // In a real application, this would make an API call to increment the view count
  // For now, we'll just store it in localStorage for demo purposes
  const viewKey = `post_${postId}_views`
  const currentViews = Number.parseInt(localStorage.getItem(viewKey) || "0")
  localStorage.setItem(viewKey, (currentViews + 1).toString())
}

// Utility functions
function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" }
  return new Date(dateString).toLocaleDateString("en-US", options)
}

function formatViews(views) {
  if (views >= 1000) {
    return (views / 1000).toFixed(1) + "k"
  }
  return views.toString()
}
