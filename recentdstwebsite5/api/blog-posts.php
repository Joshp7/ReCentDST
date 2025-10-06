<?php
/**
 * Blog Posts API
 * 
 * This script handles all blog post operations including:
 * - Fetching all blog posts
 * - Fetching individual blog posts
 * - Creating new blog posts (admin only)
 * - Updating existing blog posts (admin only)
 * - Deleting blog posts (admin only)
 * 
 * Author: ReCentDST Development Team
 */

// Include database configuration
require_once '../config/database.php';

// Set content type for JSON response
header('Content-Type: application/json');

// Handle different HTTP methods
$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? '';

try {
    // Get database connection
    $connection = getDatabaseConnection();
    if (!$connection) {
        throw new Exception('Database connection failed');
    }
    
    switch ($method) {
        case 'GET':
            handleGetRequest($connection, $action);
            break;
            
        case 'POST':
            handlePostRequest($connection, $action);
            break;
            
        case 'PUT':
            handlePutRequest($connection, $action);
            break;
            
        case 'DELETE':
            handleDeleteRequest($connection, $action);
            break;
            
        default:
            http_response_code(405);
            echo json_encode(['success' => false, 'message' => 'Method not allowed']);
            break;
    }
    
    $connection->close();
    
} catch (Exception $e) {
    error_log('Blog API error: ' . $e->getMessage());
    echo json_encode([
        'success' => false,
        'message' => 'An error occurred processing your request'
    ]);
}

/**
 * Handle GET requests for fetching blog posts
 */
function handleGetRequest($connection, $action) {
    switch ($action) {
        case 'single':
            // Get single blog post by ID
            $id = intval($_GET['id'] ?? 0);
            if ($id <= 0) {
                echo json_encode(['success' => false, 'message' => 'Invalid post ID']);
                return;
            }
            
            $query = "SELECT * FROM blog_posts WHERE id = ? AND status = 'published'";
            $result = executeQuery($connection, $query, [$id], 'i');
            
            if ($result && $result->num_rows > 0) {
                $post = $result->fetch_assoc();
                echo json_encode(['success' => true, 'post' => $post]);
            } else {
                echo json_encode(['success' => false, 'message' => 'Post not found']);
            }
            break;
            
        case 'admin':
            // Get all posts for admin (including drafts)
            $query = "SELECT * FROM blog_posts ORDER BY created_at DESC";
            $result = executeQuery($connection, $query);
            
            if ($result) {
                $posts = [];
                while ($row = $result->fetch_assoc()) {
                    $posts[] = $row;
                }
                echo json_encode(['success' => true, 'posts' => $posts]);
            } else {
                echo json_encode(['success' => false, 'message' => 'Failed to fetch posts']);
            }
            break;
            
        default:
            // Get all published blog posts
            $limit = intval($_GET['limit'] ?? 10);
            $offset = intval($_GET['offset'] ?? 0);
            $category = sanitizeInput($_GET['category'] ?? '');
            
            $query = "SELECT * FROM blog_posts WHERE status = 'published'";
            $params = [];
            $types = '';
            
            if (!empty($category)) {
                $query .= " AND category = ?";
                $params[] = $category;
                $types .= 's';
            }
            
            $query .= " ORDER BY created_at DESC LIMIT ? OFFSET ?";
            $params[] = $limit;
            $params[] = $offset;
            $types .= 'ii';
            
            $result = executeQuery($connection, $query, $params, $types);
            
            if ($result) {
                $posts = [];
                while ($row = $result->fetch_assoc()) {
                    $posts[] = $row;
                }
                echo json_encode(['success' => true, 'posts' => $posts]);
            } else {
                echo json_encode(['success' => false, 'message' => 'Failed to fetch posts']);
            }
            break;
    }
}

/**
 * Handle POST requests for creating new blog posts
 */
function handlePostRequest($connection, $action) {
    // Check if user is authenticated (simple check - enhance for production)
    if (!isset($_SESSION['admin_user'])) {
        http_response_code(401);
        echo json_encode(['success' => false, 'message' => 'Unauthorized']);
        return;
    }
    
    // Get POST data
    $title = sanitizeInput($_POST['title'] ?? '');
    $category = sanitizeInput($_POST['category'] ?? '');
    $summary = sanitizeInput($_POST['summary'] ?? '');
    $content = sanitizeInput($_POST['content'] ?? '');
    $readingTime = intval($_POST['readingTime'] ?? 0);
    $status = sanitizeInput($_POST['status'] ?? 'draft');
    $featured = isset($_POST['featured']) ? 1 : 0;
    
    // Handle file upload for cover image
    $coverImage = '';
    if (isset($_FILES['coverImage']) && $_FILES['coverImage']['error'] === UPLOAD_ERR_OK) {
        $uploadDir = '../uploads/blog/';
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }
        
        $fileName = time() . '_' . basename($_FILES['coverImage']['name']);
        $uploadPath = $uploadDir . $fileName;
        
        if (move_uploaded_file($_FILES['coverImage']['tmp_name'], $uploadPath)) {
            $coverImage = 'uploads/blog/' . $fileName;
        }
    }
    
    // Validate required fields
    if (empty($title) || empty($category) || empty($summary) || empty($content)) {
        echo json_encode(['success' => false, 'message' => 'All required fields must be filled']);
        return;
    }
    
    // Insert new blog post
    $query = "INSERT INTO blog_posts (
        title, category, summary, content, cover_image, reading_time, 
        status, featured, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())";
    
    $params = [$title, $category, $summary, $content, $coverImage, $readingTime, $status, $featured];
    $types = 'sssssissi';
    
    $result = executeQuery($connection, $query, $params, $types);
    
    if ($result) {
        echo json_encode(['success' => true, 'message' => 'Blog post created successfully']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to create blog post']);
    }
}

/**
 * Handle PUT requests for updating blog posts
 */
function handlePutRequest($connection, $action) {
    // Check if user is authenticated
    if (!isset($_SESSION['admin_user'])) {
        http_response_code(401);
        echo json_encode(['success' => false, 'message' => 'Unauthorized']);
        return;
    }
    
    // Get PUT data
    parse_str(file_get_contents("php://input"), $putData);
    
    $id = intval($putData['id'] ?? 0);
    $title = sanitizeInput($putData['title'] ?? '');
    $category = sanitizeInput($putData['category'] ?? '');
    $summary = sanitizeInput($putData['summary'] ?? '');
    $content = sanitizeInput($putData['content'] ?? '');
    $readingTime = intval($putData['readingTime'] ?? 0);
    $status = sanitizeInput($putData['status'] ?? 'draft');
    $featured = isset($putData['featured']) ? 1 : 0;
    
    if ($id <= 0) {
        echo json_encode(['success' => false, 'message' => 'Invalid post ID']);
        return;
    }
    
    // Update blog post
    $query = "UPDATE blog_posts SET 
        title = ?, category = ?, summary = ?, content = ?, 
        reading_time = ?, status = ?, featured = ?, updated_at = NOW()
        WHERE id = ?";
    
    $params = [$title, $category, $summary, $content, $readingTime, $status, $featured, $id];
    $types = 'ssssisii';
    
    $result = executeQuery($connection, $query, $params, $types);
    
    if ($result) {
        echo json_encode(['success' => true, 'message' => 'Blog post updated successfully']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to update blog post']);
    }
}

/**
 * Handle DELETE requests for deleting blog posts
 */
function handleDeleteRequest($connection, $action) {
    // Check if user is authenticated
    if (!isset($_SESSION['admin_user'])) {
        http_response_code(401);
        echo json_encode(['success' => false, 'message' => 'Unauthorized']);
        return;
    }
    
    $id = intval($_GET['id'] ?? 0);
    
    if ($id <= 0) {
        echo json_encode(['success' => false, 'message' => 'Invalid post ID']);
        return;
    }
    
    // Delete blog post
    $query = "DELETE FROM blog_posts WHERE id = ?";
    $result = executeQuery($connection, $query, [$id], 'i');
    
    if ($result) {
        echo json_encode(['success' => true, 'message' => 'Blog post deleted successfully']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to delete blog post']);
    }
}
?>
