<?php
session_start();
$config = require_once dirname(__DIR__) . DIRECTORY_SEPARATOR . 'configs' . DIRECTORY_SEPARATOR . 'appConfig.php';
require_once $config['connectDb'];

if (isset($_POST['logout'])) {
    session_destroy();
    header('Location: index.php');
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    unset($_SESSION['lastShowedMsgId']);
}

// Authorisation
if (isset($_POST['name'], $_POST['pass'])) {
    require_once $config['auth'];
    $auth();
    return;
}

// Send message
if (isset($_POST['message'])) {
    require_once $config['sendMsg'];
    $sendMsg();
    return;
}

// Get messages
if (isset($_POST['getMsg'])) {
    require_once $config['getMsg'];
    $getMsg();
    return;
}

// Select template
require_once $config['selectTemplate'];
$createPage();

$connection = null;
