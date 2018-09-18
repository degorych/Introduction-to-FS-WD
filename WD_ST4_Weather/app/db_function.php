<?php
return function ($dbConfig) {
    $dsn = "mysql:host={$dbConfig['dbHost']};port={$dbConfig['dbPort']};dbname={$dbConfig['dbName']};charset=utf8";

    $dbOptions = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ];

    try {
        $connection = new PDO($dsn, $dbConfig['dbUser'], $dbConfig['dbPassword'], $dbOptions);
        $request = $connection->prepare('SELECT UNIX_TIMESTAMP(forecast.timestamp) AS `time`, `temperature`, `rain_possibility`, `clouds` FROM `forecast`');
        $request->execute();
        $result = $request->fetchAll();
        $request = null;
        $connection = null;
    } catch (PDOException $e) {
        return $e->getMessage();
    }

    // Select icon
    return array_map(function ($value) use ($dbConfig) {
        if ($value['rain_possibility'] >= 0.8) {
            $value['icon'] = $dbConfig['icons'][2];
        } else if ($value['clouds'] > 15) {
            $value['icon'] = $dbConfig['icons'][4];
        } else {
            $value['icon'] = $dbConfig['icons'][3];
        }
        unset ($value['rain_possibility'], $value['clouds']);
        return $value;
    }, $result);
};
