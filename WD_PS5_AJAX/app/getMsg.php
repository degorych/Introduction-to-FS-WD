<?php
function getMsg($config, $file)
{
    header('Content-Type: application/json');

    require_once $config['msgFunctions'];

    $messages = json_decode(file_get_contents($file), true);

    if (empty($messages)) {
        echo json_encode($messages);
        return;
    }

    $msgKeys = array_keys($messages);
    $msgLastKey = end($msgKeys);
    reset($msgKeys);

    $dataToUser = [];

    $lastShowedMsgId = (isset($_SESSION['lastShowedMsgId'])) ? $_SESSION['lastShowedMsgId'] : -1;

    if ($lastShowedMsgId === $msgLastKey) {
        echo json_encode($dataToUser);
        return;
    }

    if ($lastShowedMsgId > 0) {
        $idPlace = array_search($lastShowedMsgId, $msgKeys);
        $messages = array_slice($messages, $idPlace + 1);
    }

    foreach ($messages as $value) {
        if (showMsgInPeriod(createDate(), $value['date'])) {
            $value['date'] = formatDate($value['date']);
            $dataToUser[] = $value;
        }
    }

    $_SESSION['lastShowedMsgId'] = $msgLastKey;
    echo json_encode($dataToUser);
}
