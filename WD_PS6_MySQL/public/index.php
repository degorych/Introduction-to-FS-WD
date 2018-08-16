<?php
session_start();
$config = require_once dirname(__DIR__) . DIRECTORY_SEPARATOR . 'configs' . DIRECTORY_SEPARATOR . 'appConfig.php';

if (isset($_POST['logout'])) {
    session_destroy();
    header('Location: ./');
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    unset($_SESSION['$lastShowedMsgId']);
}

require_once $config['connectDb'];
try {
    $connection = connectDb();
} catch (Exception $e) {
    $_SESSION['error'] = $e->getMessage();
    require_once $config['selectTemplate'];
    $createPage();
    die();
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

// Close connection
if (isset($connection)) {
    $connection = null;
}
