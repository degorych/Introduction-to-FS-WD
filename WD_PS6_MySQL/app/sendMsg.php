<?php
$sendMsg = function () use ($connection) {
    $message = htmlspecialchars(trim($_POST['message']));

    if (empty($message)) {
        http_response_code(403);
        header('Content-Type: application/json');
        echo json_encode(['Message is empty']);
        return;
    }

    try {
        $request = $connection->prepare('INSERT INTO `messages` (`messageText`, `idUser`) VALUES (:message, :id)');
        $request->execute(['message' => $message, 'id' => $_SESSION['userId']]);
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
