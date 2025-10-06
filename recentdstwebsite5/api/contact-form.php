<?php
/**
 * Contact Form Handler
 * 
 * This script processes contact form submissions from the website.
 * It validates input data, stores it in the database, and sends email notifications.
 * 
 * Author: ReCentDST Development Team
 */

// Include database configuration
require_once '../config/database.php';

// Set content type for JSON response
header('Content-Type: application/json');

// Only allow POST requests
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
    
    // Collect and sanitize form data
    $fullName = sanitizeInput($_POST['fullName'] ?? '');
    $email = sanitizeInput($_POST['email'] ?? '');
    $phone = sanitizeInput($_POST['phone'] ?? '');
    $organization = sanitizeInput($_POST['organization'] ?? '');
    $serviceInterest = sanitizeInput($_POST['serviceInterest'] ?? '');
    $projectType = sanitizeInput($_POST['projectType'] ?? '');
    $timeline = sanitizeInput($_POST['timeline'] ?? '');
    $subject = sanitizeInput($_POST['subject'] ?? '');
    $message = sanitizeInput($_POST['message'] ?? '');
    $newsletter = isset($_POST['newsletter']) ? 1 : 0;
    
    // Get contact methods (checkboxes)
    $contactMethods = [];
    if (isset($_POST['contactMethod'])) {
        if (is_array($_POST['contactMethod'])) {
            $contactMethods = $_POST['contactMethod'];
        } else {
            $contactMethods = [$_POST['contactMethod']];
        }
    }
    $contactMethodsStr = implode(',', array_map('sanitizeInput', $contactMethods));
    
    // Validate required fields
    $errors = [];
    
    if (empty($fullName)) {
        $errors[] = 'Full name is required';
    }
    
    if (empty($email)) {
        $errors[] = 'Email address is required';
    } elseif (!validateEmail($email)) {
        $errors[] = 'Please enter a valid email address';
    }
    
    if (empty($serviceInterest)) {
        $errors[] = 'Service interest is required';
    }
    
    if (empty($projectType)) {
        $errors[] = 'Project type is required';
    }
    
    if (empty($subject)) {
        $errors[] = 'Subject is required';
    }
    
    if (empty($message)) {
        $errors[] = 'Message is required';
    }
    
    // If there are validation errors, return them
    if (!empty($errors)) {
        echo json_encode([
            'success' => false,
            'message' => 'Please fix the following errors:',
            'errors' => $errors
        ]);
        exit;
    }
    
    // Insert contact form submission into database
    $insertQuery = "INSERT INTO contact_forms (
        full_name, email, phone, organization, service_interest, 
        project_type, timeline, contact_methods, subject, message, 
        newsletter_signup, submission_date, status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), 'new')";
    
    $params = [
        $fullName, $email, $phone, $organization, $serviceInterest,
        $projectType, $timeline, $contactMethodsStr, $subject, $message,
        $newsletter
    ];
    
    $types = 'ssssssssssi'; // All strings except newsletter (integer)
    
    $result = executeQuery($connection, $insertQuery, $params, $types);
    
    if (!$result) {
        throw new Exception('Failed to save contact form submission');
    }
    
    // If user opted for newsletter, add them to newsletter subscribers
    if ($newsletter) {
        $newsletterQuery = "INSERT IGNORE INTO newsletter_subscribers (email, name, subscription_date, status) 
                          VALUES (?, ?, NOW(), 'active')";
        executeQuery($connection, $newsletterQuery, [$email, $fullName], 'ss');
    }
    
    // Send email notification to admin (optional - requires mail configuration)
    $adminEmail = 'info@recentdst.com';
    $emailSubject = 'New Contact Form Submission: ' . $subject;
    $emailBody = "
    New contact form submission received:
    
    Name: $fullName
    Email: $email
    Phone: $phone
    Organization: $organization
    Service Interest: $serviceInterest
    Project Type: $projectType
    Timeline: $timeline
    Contact Methods: $contactMethodsStr
    Subject: $subject
    
    Message:
    $message
    
    Newsletter Signup: " . ($newsletter ? 'Yes' : 'No') . "
    
    Submitted: " . date('Y-m-d H:i:s') . "
    ";
    
    // Send email (uncomment when mail server is configured)
    // mail($adminEmail, $emailSubject, $emailBody, "From: $email");
    
    // Close database connection
    $connection->close();
    
    // Return success response
    echo json_encode([
        'success' => true,
        'message' => 'Thank you for your message! We will get back to you within 24 hours.'
    ]);
    
} catch (Exception $e) {
    // Log error and return error response
    error_log('Contact form error: ' . $e->getMessage());
    
    echo json_encode([
        'success' => false,
        'message' => 'Sorry, there was an error processing your request. Please try again later.'
    ]);
}
?>
