<?php
// Get the JSON data sent from the JavaScript frontend
$data = json_decode(file_get_contents('php://input'), true);

if ($data) {
  // Firebase API endpoint
  $firebase_url = 'https://sdg-signture-default-rtdb.firebaseio.com/Day1.json';

  // Initialize a cURL session
  $ch = curl_init($firebase_url);

  // Set the cURL options
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json'
  ]);
  curl_setopt($ch, CURLOPT_POST, true);
  curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

  // Execute the cURL request
  $response = curl_exec($ch);

  // Check if the request was successful
  if ($response === false) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to submit data']);
  } else {
    http_response_code(200);
    echo $response;
  }

  // Close the cURL session
  curl_close($ch);
} else {
  // Return a 400 Bad Request response if no data is sent
  http_response_code(400);
  echo json_encode(['error' => 'No data received']);
}
