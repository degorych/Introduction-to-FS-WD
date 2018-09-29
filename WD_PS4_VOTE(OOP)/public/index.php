<?php
session_start();
$config = require_once dirname(__DIR__) . DIRECTORY_SEPARATOR . 'app' . DIRECTORY_SEPARATOR . 'config.php';

include_once $config['jsonController'];
$jsonController = new JsonController($config);

if (isset($_POST['jsonContent'])) {
    http_response_code(200);
    header('Content-Type: application/json');
    echo json_encode($jsonController->sendJsonContent());
    return;
}

$data = $_POST['vote-variants'] ?? null;
$result = $jsonController->run($data);

if (is_string($result)) {
    $_SESSION['error'] = $result;
} else {
    $_SESSION['voted'] = 'You voted';
}

$jsonController->view($_SERVER['REQUEST_METHOD'], $_SESSION['error']);
