<?php
$createResponse = function ($functionName) use ($appConfig, $dataConfig) {
    if (!isset($functionName)) {
        http_response_code(404);
        header('Content-Type: application/json');
        echo json_encode('No weather service selected');
        return;
    }

    $data = $dataConfig[$functionName];

    if (!isset($data)) {
        http_response_code(404);
        header('Content-Type: application/json');
        echo json_encode('Weather service information not found');
        return;
    }

    if (file_exists($appConfig[$functionName])) {
        $handler = require_once $appConfig[$functionName];
    } else {
        http_response_code(404);
        header('Content-Type: application/json');
        echo json_encode('Weather service application not found');
        return;
    }

    $response = $handler($data);

    if (!is_array($response)) {
        http_response_code(400);
    } else {
        http_response_code(200);
    }

    header('Content-Type: application/json');
    echo json_encode($response);
};
