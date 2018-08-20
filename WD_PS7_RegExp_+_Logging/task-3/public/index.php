<?php
session_start();
define('INDEX', 'index');
$config = require_once dirname(__DIR__) . DIRECTORY_SEPARATOR . 'configs' . DIRECTORY_SEPARATOR . 'appConfig.php';
require_once $config['logFunc'];
require_once $config['createResponse'];
require_once $config['logger'];
$logPath = $config['logFile'];
$isLogging = $config['logging'];

try {
    checkLog($logPath);
} catch (Exception $e) {
    $_SESSION['error'][] = $e->getMessage();
    $isLogging = false;
} finally {
    //var_dump($isLogging);
    if (isset($_POST['logout'])) {
        $logger(createResponse('nonErr', 'user is logout', INDEX), $isLogging);
        session_destroy();
        header('Location: ./');
    }

    require_once $config['connectDb'];
    try {
        $connection = connectDb();
    } catch (Exception $e) {
        $logger(createResponse('criticalErr', 'connection failed', INDEX), $isLogging);
        $_SESSION['error'][] = $e->getMessage();
        require_once $config['selectTemplate'];
        http_response_code(400);
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
}
