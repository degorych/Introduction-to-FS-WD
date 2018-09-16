<?php
define('ROOT_PATH', dirname(__DIR__) . DIRECTORY_SEPARATOR);
define('APP_PATH', ROOT_PATH . 'app' . DIRECTORY_SEPARATOR);

return [
    'api' => APP_PATH . 'api_function.php',
    'db' => APP_PATH . 'db_function.php',
    'json' => APP_PATH . 'json_function.php',
    'mainPage' => ROOT_PATH . 'view' . DIRECTORY_SEPARATOR . 'main.php',
    'responseCreator' => APP_PATH . 'response_creator.php'
];

