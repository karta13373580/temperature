<?php
$servername = "localhost";
$username = "s106021145";
$password = "dei3Laeg";
$dbname="s106021145";
// Create connection
$conn = new mysqli($servername, $username, $password,$dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
// echo "Connected successfully";
?>