<?php
$sendMsg = function () use ($connection, $config, $logger, $isLogging) {
    define('SENDMSG', 'sendMsg');
    $message = htmlspecialchars(trim($_POST['message']));

    require_once $config['createResponse'];

    if ($message !== '0' && empty($message)) {
        http_response_code(403);
        header('Content-Type: application/json');
        $serverResponse = createResponse('nonCriticalErr', 'User sent empty message', SENDMSG, 'Message is empty');
        $logger($serverResponse, $isLogging);
        echo json_encode($serverResponse);
        return;
    }

    try {
        //$request = $connection->prepare('INSERT INTO `messages` (`messageText`, `idUser`) VALUES (:message, :id)');
        $request = $connection->prepare('INSERT INTO `messages` (`messageText`, `idUser`) VALUES (:message, :id)');
        $request->execute(['message' => $message, 'id' => $_SESSION['userId']]);
        $request = null;
    } catch (Exception $e) {
        http_response_code(400);
        header('Content-Type: application/json');
        $serverResponse = createResponse('criticalErr', 'bad add message request', SENDMSG, $e->getMessage());
        $logger($serverResponse, $isLogging);
        echo json_encode($serverResponse);
        return;
    }

    http_response_code(200);
    header('Content-Type: application/json');
    $serverResponse = createResponse('nonErr', 'user sent message successfully', SENDMSG);
    $logger($serverResponse, $isLogging);
    echo json_encode($serverResponse);
};
