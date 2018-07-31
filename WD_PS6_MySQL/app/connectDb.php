<?php
function connectDb() {
    $dbConf = require_once dirname(__DIR__) . DIRECTORY_SEPARATOR . 'configs' . DIRECTORY_SEPARATOR . 'dbConfig.php';
    $dsn = "mysql:host={$dbConf['dbHost']};port={$dbConf['dbPort']};dbname={$dbConf['dbName']};charset=utf8";

    $dbOptions = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ];

    return $connection = new PDO($dsn, $dbConf['dbUser'], $dbConf['dbPassword'], $dbOptions);
}
