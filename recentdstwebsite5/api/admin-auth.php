<?php
/**
 * Admin Authentication API
 * 
 * This script handles admin login and authentication for the dashboard.
 * It validates credentials against the database and manages sessions.
 * 
 * Author: ReCentDST Development Team
 */

// Start session
session_start();

// Include database configuration
require_once '../config/database.php';

// Set content type for JSON response
header('Content-Type: application/json');

// Only allow POST requests for login
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

try {
    // Get database connection
    $connection = getDatabaseConnection();
    if (!$connection) {
        throw new Exception('Database connection failed');
    }
    
    // Get login credentials
    $username = sanitizeInput($_POST['username'] ?? '');
    $password = $_POST['password'] ?? ''; // Don't sanitize password as it may contain special chars
    
    // Validate input
    if (empty($username) || empty($password)) {
        echo json_encode([
            'success' => false,
            'message' => 'Username and password are required'
        ]);
        exit;
    }
    
    // Query admin user from database
    $query = "SELECT id, username, password_hash, full_name, email, last_login 
              FROM admin_users 
              WHERE username = ? AND status = 'active'";
    
    $result = executeQuery($connection, $query, [$username], 's');
    
    if (!$result || $result->num_rows === 0) {
        // User not found or inactive
        echo json_encode([
            'success' => false,
            'message' => 'Invalid username or password'
        ]);
        exit;
    }
    
    $admin = $result->fetch_assoc();
    
    // Verify password
    if (!password_verify($password, $admin['password_hash'])) {
        echo json_encode([
            'success' => false,
            'message' => 'Invalid username or password'
        ]);
        exit;
    }
    
    // Update last login time
    $updateQuery = "UPDATE admin_users SET last_login = NOW() WHERE id = ?";
    executeQuery($connection, $updateQuery, [$admin['id']], 'i');
    
    // Set session variables
    $_SESSION['admin_user'] = [
        'id' => $admin['id'],
        'username' => $admin['username'],
        'name' => $admin['full_name'],
        'email' => $admin['email']
    ];
    
    // Close database connection
    $connection->close();
    
    // Return success response
    echo json_encode([
        'success' => true,
        'message' => 'Login successful',
        'user' => [
            'name' => $admin['full_name'],
            'email' => $admin['email'],
            'username' => $admin['username']
        ]
    ]);
    
} catch (Exception $e) {
    error_log('Admin auth error: ' . $e->getMessage());
    echo json_encode([
        'success' => false,
        'message' => 'An error occurred during login'
    ]);
}
?>
