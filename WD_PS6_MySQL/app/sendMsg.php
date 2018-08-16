<?php
$sendMsg = function () use ($connection, $config) {
    define('SENDMSG', 'sendMsg');
    $message = htmlspecialchars(trim($_POST['message']));

    require_once $config['createResponse'];

    if ($message !== '0' && empty($message)) {
        http_response_code(403);
        header('Content-Type: application/json');
        echo json_encode(createResponse('nonCriticalErr', 'User sent empty message', SENDMSG, 'Message is empty'));
        return;
    }

    try {
        $request = $connection->prepare('INSERT INTO `messages` (`messageText`, `idUser`) VALUES (:message, :id)');
        $request->execute(['message' => $message, 'id' => $_SESSION['userId']]);
        $request = null;
    } catch (Exception $e) {
        http_response_code(400);
        header('Content-Type: application/json');
        echo json_encode(createResponse('criticalErr', 'bad add message request', SENDMSG, $e->getMessage()));
        return;
    }

    http_response_code(200);
    header('Content-Type: application/json');
    echo json_encode(createResponse('nonError', 'user sent message successfully', SENDMSG));
};
