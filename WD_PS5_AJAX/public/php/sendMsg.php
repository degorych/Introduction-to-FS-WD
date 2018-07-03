<?php
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: ' . $config['index']);
}

if (trim($_POST['message']) === '') {
    echo $errors[] = 'Message is empty';
    return;
}

session_start();
$errors = [];
$config = require_once __DIR__ . '\..\..\private\php\config.php';
require_once $config['msgFunctions'];

$message = smile(htmlspecialchars(trim($_POST['message'])));
$name = $_SESSION['userName'];

$date = createDate();

$file = $config['messages'];
$userData = [1 => ['date' => $date, 'name' => $name, 'msg' => $message]];
include_once $config['createJson'];

try {
    $newJson = createJson($file, $userData);
} catch (Exception $e) {
    $errors[] = $e->getMessage();
    echo json_encode($errors);
}

if (!$newJson) {
    $msgList = json_decode(file_get_contents($file), true);
    $numOfMsg = end(array_keys($msgList)) + 1;
    $msgList[$numOfMsg] = ['date' => $date, 'name' => $name, 'msg' => $message];
    try {
        if (!file_put_contents($file, json_encode($msgList, JSON_FORCE_OBJECT | JSON_PRETTY_PRINT))) {
            throw new Exception('Can not save message');
        };
    } catch (Exception $e) {
        $errors[] = $e->getMessage();
        echo json_encode($errors);
    }
}
