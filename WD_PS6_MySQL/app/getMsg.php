<?php
$getMsg = function () use ($config, $connection) {
    try {
        $request = $connection->prepare("SELECT * FROM messages WHERE date > :time");
        $request->execute(['time' => time() - 3600]);
        $messages = $request->fetchAll();
        $request = null;
    } catch (Exception $e) {
        http_response_code(400);
        header('Content-Type: application/json');
        echo json_encode($e->getMessage());
        return;
    }

    $lastMsg = end($messages);
    $lastMsgId = $lastMsg['id'];
    reset($messages);

    $lastShowedMsgId = (isset($_SESSION['lastShowedMsgId'])) ? $_SESSION['lastShowedMsgId'] : -1;

    if (empty($messages) || $lastShowedMsgId === $lastMsgId) {
        http_response_code(200);
        header('Content-Type: application/json');
        echo json_encode(['No messages']);
        return;
    }

    if ($lastShowedMsgId > $lastMsgId) {
        $lastShowedMsgId = $_SESSION['lastShowedMsgId'] = $lastMsgId;
    }

    // Get key in messages array from which not shown messages begin and split message array
    if ($lastShowedMsgId > 0) {
        $idKey = 0;
        foreach ($messages as $idsInMsgArr => $msg) {
            if ($msg['id'] === $lastShowedMsgId) {
                $idKey = $idsInMsgArr;
                break;
            }
        }
        $messages = array_slice($messages, $idKey + 1);
    }

    $_SESSION['lastShowedMsgId'] = $lastMsgId;
    http_response_code(200);
    header('Content-Type: application/json');
    echo json_encode($messages);
};
