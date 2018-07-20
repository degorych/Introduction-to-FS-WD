<?php
function getMsg($config, $file)
{
    header('Content-Type: application/json');

    require_once $config['msgFunctions'];

    $dataToUser = [];
    $msgList = json_decode(file_get_contents($file), true);

    if (empty($msgList)) {
        echo json_encode($msgList);
        return;
    }

    $msgListKeys = array_keys($msgList); // Get all message ID
    $msgListLastEl = end($msgListKeys); // Get last message ID
    reset($msgListKeys);


    // Id and Id key of showed messages
    $lastShowedMsgId = isset($_SESSION['lastShowedMsgId']) ? $_SESSION['lastShowedMsgId'] : 0;
    $lastShowedMsgKey = array_search($lastShowedMsgId, $msgListKeys);

    if ($lastShowedMsgKey === false) {
        $lastShowedMsgKey = -1;
    }

    // If do not need to show messages
    if ($lastShowedMsgId === $msgListLastEl) {
        echo json_encode($dataToUser);
        return;
    }

    for (; $lastShowedMsgId < $msgListLastEl; $lastShowedMsgKey++) {
        $nextMsgId = $msgListKeys[$lastShowedMsgKey + 1];
        if (showMsgInPeriod(createDate(), $msgList[$nextMsgId]['date'])) {
            $dataToUser[] = [
                'date' => formatDate($msgList[$nextMsgId]['date']),
                'name' => $msgList[$nextMsgId]['name'],
                'message' => $msgList[$nextMsgId]['msg']
            ];
        }
        $lastShowedMsgId = $nextMsgId;
    }

    $_SESSION['lastShowedMsgId'] = $msgListLastEl;
    echo json_encode($dataToUser);
}
