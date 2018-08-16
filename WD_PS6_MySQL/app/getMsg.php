<?php
$getMsg = function () use ($connection, $config) {
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
        echo json_encode(createResponse('criticalErr', 'get message bad request', GETMSGS, $e->getMessage()));
        return;
    }

    if (empty($messages)) {
        http_response_code(200);
        header('Content-Type: application/json');
        echo json_encode(createResponse('nonErr', 'no new messages', GETMSGS));
        return;
    }

    http_response_code(200);
    header('Content-Type: application/json');
    echo json_encode(createResponse('nonErr', 'update new messages', GETMSGS, $messages));
};
