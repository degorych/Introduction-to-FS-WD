<?php
$getMsg = function () use ($connection, $config, $logger, $isLogging) {
    define('GETMSGS', 'getMsg');

    require_once $config['createResponse'];

    try {
        $request = $connection->prepare('SELECT UNIX_TIMESTAMP(messages.dateMsg) AS `dateMsg`, messages.messageText, messages.idMsg, users.userName FROM `messages` JOIN `users` ON messages.idUser=users.id WHERE UNIX_TIMESTAMP(messages.dateMsg) > :currentTime AND messages.idMsg > :lastId');
        $request->execute(['lastId' => isset($_POST['msgId']) ? $_POST['msgId'] : -1, 'currentTime' => time() - 3600]);
        $messages = $request->fetchAll();
        $request = null;
    } catch (Exception $e) {
        http_response_code(400);
        header('Content-Type: application/json');
        $serverResponse = createResponse('criticalErr', 'get message bad request', GETMSGS, $e->getMessage());
        $logger($serverResponse, $isLogging);
        echo json_encode($serverResponse);
        return;
    }

    if (empty($messages)) {
        http_response_code(200);
        header('Content-Type: application/json');
        $serverResponse = createResponse('nonErr', 'no new messages', GETMSGS);
        //$logger($serverResponse, $isLogging); //If need logging no update messages moments, uncomment this
        echo json_encode($serverResponse);
        return;
    }

    http_response_code(200);
    header('Content-Type: application/json');
    $serverResponse = createResponse('nonErr', 'update new messages', GETMSGS, $messages);
    $logger($serverResponse, $isLogging);
    echo json_encode($serverResponse);
};
