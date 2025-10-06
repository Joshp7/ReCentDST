<?php
/**
 * Database Configuration File for ReCentDST Website
 * 
 * This file contains all database connection settings and provides
 * a centralized connection function for the entire website.
 * 
 * Author: ReCentDST Development Team
 * Created: 2025
 */

// Database configuration constants
define('DB_HOST', 'localhost');        // Database server hostname
define('DB_NAME', 'recentdst_db');     // Database name
define('DB_USER', 'root');             // Database username (change in production)
define('DB_PASS', '');                 // Database password (change in production)
define('DB_CHARSET', 'utf8mb4');       // Character set for proper encoding

/**
 * Create database connection using MySQLi
 * 
 * This function establishes a connection to the MySQL database
 * and returns the connection object for use throughout the application.
 * 
 * @return mysqli|false Returns mysqli connection object on success, false on failure
 */
function getDatabaseConnection() {
    try {
        // Create new MySQLi connection
        $connection = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
        
        // Check if connection was successful
        if ($connection->connect_error) {
            // Log error for debugging (in production, log to file instead of displaying)
            error_log("Database connection failed: " . $connection->connect_error);
            return false;
        }
        
        // Set character set to prevent encoding issues
        $connection->set_charset(DB_CHARSET);
        
        return $connection;
        
    } catch (Exception $e) {
        // Handle any exceptions during connection
        error_log("Database connection exception: " . $e->getMessage());
        return false;
    }
}

/**
 * Execute a prepared statement safely
 * 
 * This function helps prevent SQL injection by using prepared statements
 * for all database queries.
 * 
 * @param mysqli $connection Database connection object
 * @param string $query SQL query with placeholders (?)
 * @param array $params Array of parameters to bind
 * @param string $types String of parameter types (i=integer, s=string, d=double, b=blob)
 * @return mysqli_result|bool Query result on success, false on failure
 */
function executeQuery($connection, $query, $params = [], $types = '') {
    try {
        // Prepare the SQL statement
        $stmt = $connection->prepare($query);
        
        if (!$stmt) {
            error_log("Query preparation failed: " . $connection->error);
            return false;
        }
        
        // Bind parameters if provided
        if (!empty($params) && !empty($types)) {
            $stmt->bind_param($types, ...$params);
        }
        
        // Execute the statement
        $result = $stmt->execute();
        
        if (!$result) {
            error_log("Query execution failed: " . $stmt->error);
            $stmt->close();
            return false;
        }
        
        // Get result for SELECT queries
        if (stripos($query, 'SELECT') === 0) {
            $result = $stmt->get_result();
        }
        
        $stmt->close();
        return $result;
        
    } catch (Exception $e) {
        error_log("Query execution exception: " . $e->getMessage());
        return false;
    }
}

/**
 * Sanitize input data to prevent XSS attacks
 * 
 * @param string $data Input data to sanitize
 * @return string Sanitized data
 */
function sanitizeInput($data) {
    // Remove whitespace from beginning and end
    $data = trim($data);
    // Remove backslashes
    $data = stripslashes($data);
    // Convert special characters to HTML entities
    $data = htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
    return $data;
}

/**
 * Validate email address
 * 
 * @param string $email Email address to validate
 * @return bool True if valid, false otherwise
 */
function validateEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

/**
 * Generate a secure random token
 * 
 * @param int $length Length of the token
 * @return string Random token
 */
function generateToken($length = 32) {
    return bin2hex(random_bytes($length / 2));
}

// Test database connection on file include
$test_connection = getDatabaseConnection();
if ($test_connection) {
    // Connection successful - close test connection
    $test_connection->close();
} else {
    // Log connection failure
    error_log("Database connection test failed during config load");
}
?>
