<?php
define('ROOT_PATH', dirname(__DIR__) . DIRECTORY_SEPARATOR);
define('APP_PATH', ROOT_PATH . 'app' . DIRECTORY_SEPARATOR);

return [
    'api' => APP_PATH . 'Api.php',
    'db' => APP_PATH . 'Db.php',
    'json' => APP_PATH . 'Json.php',
    'WeatherFactory' => APP_PATH . 'WeatherFactory.php',
    'icons' => APP_PATH . 'icons.php',
    'mainPage' => ROOT_PATH . 'view' . DIRECTORY_SEPARATOR . 'main.php'
];
