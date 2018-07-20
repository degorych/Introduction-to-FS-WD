<?php
function sendMsg($config, $file)
{
    header('Content-Type: application/json');
    $errors = [];
    if (trim($_POST['message']) === '') {
        $errors[] = 'Message is empty';
        echo json_encode($errors);
        return;
    }

    require_once $config['msgFunctions'];
    $smileStr = require_once $config['smileStr'];

    $message = smile(htmlspecialchars(trim($_POST['message'])), $smileStr);

    $msgList = json_decode(file_get_contents($file), true);
    $numOfMsg = end(array_keys($msgList)) + 1;
    $msgList[$numOfMsg] = ['date' => createDate(), 'name' => $_SESSION['userName'], 'msg' => $message];
    try {
        if (!file_put_contents($file, json_encode($msgList, JSON_FORCE_OBJECT | JSON_PRETTY_PRINT))) {
            throw new Exception('Can not save message');
        };
    } catch (Exception $e) {
        $errors[] = $e->getMessage();
        echo json_encode($errors);
    }
    echo json_encode($errors);
}
