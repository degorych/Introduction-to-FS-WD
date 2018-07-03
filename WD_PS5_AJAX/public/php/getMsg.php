<?php
session_start();
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: ' . $config['index']);
}

header('Content-Type: application/json');

$config = require_once __DIR__ . '\..\..\private\php\config.php';
require_once $config['msgFunctions'];

$currentDate = createDate();

$file = $config['messages'];
$dataToUser = [];

if (file_exists($file) && file_get_contents($file)) {
    $msgList = json_decode(file_get_contents($file), true);
    $msgListKeys = array_keys($msgList); // Get all message ID
    $msgListLastEl = end($msgListKeys); // Get last message ID
    reset($msgListKeys);

    // Id of showed messages
    $lastShowedMsgId = isset($_SESSION['lastShowedMsgId']) ? $_SESSION['lastShowedMsgId'] : 0;

    if ($lastShowedMsgId !== $msgListLastEl) { // If need show messages
        $currentMsgId = is_integer(array_search($lastShowedMsgId, $msgListKeys)) ? array_search($lastShowedMsgId,
            $msgListKeys) : -1;
        for ($i = $currentMsgId; $lastShowedMsgId < $msgListLastEl; $i++) {
            // $i = -1 - json contain 1 msg, $i = 0 - no messages shown, or get last showed ID message
            $lastShowedMsgId = $msgListKeys[$i + 1];
            if (showMsgInPeriod($currentDate, $msgList[$lastShowedMsgId]['date'])) {
                $dataToUser[] = [
                    'date' => formatDate($msgList[$lastShowedMsgId]['date']),
                    'name' => $msgList[$lastShowedMsgId]['name'],
                    'message' => $msgList[$lastShowedMsgId]['msg']
                ];
            }
        }
    }
    $_SESSION['lastShowedMsgId'] = $msgListLastEl;
}
echo json_encode($dataToUser);
