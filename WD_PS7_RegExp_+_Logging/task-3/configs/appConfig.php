<?php
define('ROOT_PATH', dirname(__DIR__) . DIRECTORY_SEPARATOR);
define('APP_PATH', ROOT_PATH . 'app' . DIRECTORY_SEPARATOR);
define('LOG_PATH', ROOT_PATH . 'logger' . DIRECTORY_SEPARATOR);
return [
    'logging' => true,
    'connectDb' => APP_PATH . 'connectDb.php',
    'auth' => APP_PATH . 'auth.php',
    'sendMsg' => APP_PATH . 'sendMsg.php',
    'getMsg' => APP_PATH . 'getMsg.php',
    'selectTemplate' => APP_PATH . 'selectTemplate.php',
    'createResponse' => APP_PATH . 'createResponse.php',
    'logger' => LOG_PATH . 'logger.php',
    'logFile' => LOG_PATH . 'logs.log',
    'logFunc' => LOG_PATH . 'logFunctions.php',
    'mainTemp' => ROOT_PATH . 'templates' . DIRECTORY_SEPARATOR . 'mainTemplate.php',
];
