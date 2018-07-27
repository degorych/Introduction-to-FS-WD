<?php
$sendMsg = function () use ($config, $connection) {
    $message = htmlspecialchars(trim($_POST['message']));

    if (!$message) {
        http_response_code(403);
        header('Content-Type: application/json');
        echo json_encode(['Message is empty']);
        return;
    }

    try {
        $request = $connection->prepare("INSERT INTO messages VALUES (null, :date, :name, :messageText)");
        $request->execute(['date' => time(), 'name' => $_SESSION['userName'], 'messageText' => $message]);
        $request = null;
    } catch (Exception $e) {
        http_response_code(400);
        header('Content-Type: application/json');
        echo json_encode($e->getMessage());
        return;
    }

    http_response_code(200);
    header('Content-Type: application/json');
    echo json_encode(['Send message']);
};
