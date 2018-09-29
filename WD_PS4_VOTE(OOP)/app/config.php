<?php
define('ROOT_PATH', dirname(__DIR__) . DIRECTORY_SEPARATOR);
define('APP_PATH',ROOT_PATH . 'app' . DIRECTORY_SEPARATOR);

return [
    'json' => APP_PATH .'Json.php',
    'jsonController' => APP_PATH .'JsonController.php',
    'jsonPath' => ROOT_PATH.'json'.DIRECTORY_SEPARATOR.'data.json',
    'main' => 'main.php',
    'result' => 'result.php'
];
