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

    $msgLastKey = end(array_keys($messages));
    $dataToUser = [];

    $lastShowedMsgId = (isset($_SESSION['lastShowedMsgId'])) ? $_SESSION['lastShowedMsgId'] : -1;

    if ($lastShowedMsgId > 0) {
        $messages = array_slice($messages, $lastShowedMsgId);
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
