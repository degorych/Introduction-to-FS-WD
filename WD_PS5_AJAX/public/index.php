<?php
session_start();
$config = require_once dirname(__DIR__).DIRECTORY_SEPARATOR.'app'.DIRECTORY_SEPARATOR.'config.php';
$errors = [];

if (isset($_POST['logout'])) {
    unset($_SESSION['userName']);
    header('Location: index.php');
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    unset($_SESSION['lastShowedMsgId']);
}

// Get selected file and check it
if (!empty($_POST)) {
    require_once $config['selectFile'];
    require_once $config['createJson'];

    try {
        $file = selectFile($_POST, $config);
        createJson($file);
    } catch (Exception $e) {
        $errors[] = $e->getMessage();
        header('Content-Type: application/json');
        echo json_encode($errors);
        return;
    }
}

// Authorisation
if (isset($_POST['name'], $_POST['pass'])) {
    require_once $config['auth'];
    auth($_POST['name'], $_POST['pass'], $file);
    return;
}

// Send message
if (isset($_POST['message'])) {
    require_once $config['sendMsg'];
    sendMsg($config, $file);
    return;
}

// Get messages
if (isset($_POST['getMsg'])) {
    require_once $config['getMsg'];
    getMsg($config, $file);
    return;
}

// Select patterns
include_once (isset($_SESSION['userName'])) ? $config['chat'] : $config['main'];
