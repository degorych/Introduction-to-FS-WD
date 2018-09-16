<?php
define('CONFIG_PATH', dirname(__DIR__) . DIRECTORY_SEPARATOR . 'configs' . DIRECTORY_SEPARATOR);
$appConfig = require_once CONFIG_PATH . 'app.php';
$dataConfig = require_once CONFIG_PATH . 'data.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    require_once $appConfig['mainPage'];
    return;
}

require_once $appConfig['responseCreator'];
echo $createResponse($_POST['query']);
