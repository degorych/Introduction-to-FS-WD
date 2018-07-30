<?php
$getMsg = function () use ($config, $connection) {
    $lastShowedMsgId = (isset($_SESSION['lastShowedMsgId'])) ? $_SESSION['lastShowedMsgId'] : -1;
    try {
        $request = $connection->prepare("SELECT id, UNIX_TIMESTAMP(date) AS date, userName, messageText FROM messages WHERE id > :lastId AND date > DATE_SUB(CURRENT_TIMESTAMP, INTERVAL 1 HOUR)");
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

    $_SESSION['lastShowedMsgId'] = end($messages)['id'];
    reset($messages);

    http_response_code(200);
    header('Content-Type: application/json');
    echo json_encode($messages);
};
