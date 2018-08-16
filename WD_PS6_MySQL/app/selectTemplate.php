<?php
$createPage = function () use ($config) {
    $tempConf = require_once dirname(__DIR__) . DIRECTORY_SEPARATOR . 'configs' . DIRECTORY_SEPARATOR . 'templateConf.php';
    $pageConf = isset($_SESSION['userName'], $_SESSION['userId']) ? $tempConf['chat'] : $tempConf['auth'];
    require_once $config['mainTemp'];
};
