<?php
$getMsg = function () use ($connection) {
    $lastShowedMsgId = (isset($_SESSION['lastShowedMsgId'])) ? $_SESSION['lastShowedMsgId'] : -1;
    try {
        $request = $connection->prepare('SELECT UNIX_TIMESTAMP(messages.dateMsg) AS `dateMsg`, messages.messageText, messages.idMsg, users.userName FROM `messages` JOIN `users` ON messages.idUser=users.id WHERE messages.idMsg > :lastId AND messages.dateMsg > DATE_SUB(CURRENT_TIMESTAMP, INTERVAL 1 HOUR)');
        $request->execute(['lastId' => $lastShowedMsgId]);
        $messages = $request->fetchAll();
        $request = null;
    } catch (Exception $e) {
        http_response_code(400);
        header('Content-Type: application/json');
        echo json_encode($e->getMessage());
        return;
    }

    if (empty($messages)) {
        http_response_code(200);
        header('Content-Type: application/json');
        echo json_encode(['No messages']);
        return;
    }

    $_SESSION['lastShowedMsgId'] = end($messages)['idMsg'];
    reset($messages);

    http_response_code(200);
    header('Content-Type: application/json');
    echo json_encode($messages);
};
