<?php
function createResponse($level, $message, $service, $data = '') {
    $customerId = isset($_SESSION['userId']) ? $_SESSION['userId'] : 'none';
    return [
        'timestamp' => time(),
        'level' => $level,
        'message' => $message,
        'service' => $service,
        'customerId' => $customerId,
        'ip' => $_SERVER['REMOTE_ADDR'],
        'data' => $data
    ];
}
