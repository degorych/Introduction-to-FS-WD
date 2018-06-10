<?php
session_start();
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    $_SESSION['error'] = 'No access to send message';
    header('Location:../index.php');
}

if ($_POST['message'] === '') {
    echo '';
    exit();
}

function smile($msg)
{
    $smiley = ['smile' => ':)', 'sad' => ':('];
    foreach ($smiley as $key => $value) {
        $msg = str_replace($value, "<img src='../img/$key.png' alt='$key'>", $msg);
    }
    return $msg;
}

$message = smile(htmlspecialchars($_POST['message']));
$name = $_SESSION['userName'];

date_default_timezone_set('Europe/Kiev');
$date = time();

$file = '../json/messages.json';
include_once 'createJson.php';
$userData = [0 => ['date' => $date, 'name' => $name, 'msg' => $message]];

if (!createJson($file, $userData)) {
    $msgList = json_decode(file_get_contents($file), true);
    $numOfMsg = count($msgList);
    $msgList[$numOfMsg] = ['date' => $date, 'name' => $name, 'msg' => $message];
    file_put_contents($file, json_encode($msgList, JSON_FORCE_OBJECT | JSON_PRETTY_PRINT));
}

echo $message;
