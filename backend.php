<?php
// backend.php
$url = 'https://api.example.com/registration';
$apiKey = 'your-secret-api-key';

$data = json_decode(file_get_contents('php://input'), true);

$options = [
  'http' => [
    'header' => "Authorization: Bearer $apiKey\r\n" .
                "Content-Type: application/json\r\n",
    'method' => 'POST',
    'content' => json_encode($data),
  ],
];

$context = stream_context_create($options);
$result = file_get_contents($url, false, $context);

echo $result;
?>