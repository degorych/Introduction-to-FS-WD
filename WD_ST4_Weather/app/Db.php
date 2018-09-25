<?php

include('WeatherInterface.php');

class Db implements WeatherInterface
{
    private $dbDataConfig;
    private $icons;

    public function __construct($dataConfig, $icons)
    {
        $this->dbDataConfig = $dataConfig;
        $this->icons = $icons;
    }

    public function run()
    {
        $dbConfig = $this->dbDataConfig;
        $dsn = "mysql:host={$dbConfig['dbHost']};port={$dbConfig['dbPort']};dbname={$dbConfig['dbName']};charset=utf8";

        $dbOptions = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ];

        try {
            $connection = new PDO($dsn, $dbConfig['dbUser'], $dbConfig['dbPassword'], $dbOptions);
            $request = $connection->query('SELECT UNIX_TIMESTAMP(forecast.timestamp) AS `time`, `temperature`, `rain_possibility`, `clouds` FROM `forecast`');
        } catch (PDOException $e) {
            http_response_code(400);
            header('Content-Type: application/json');
            echo json_encode($e->getMessage());
            return;
        }

        $weathers = $request->fetchAll();
        $request = null;
        $connection = null;

        array_splice($weathers, $dbConfig['forecastsNumber']);

        http_response_code(200);
        header('Content-Type: application/json');

        echo json_encode(array_map(function ($weatherForHour) {
            $weatherForHour['icon'] = $this->choiceIcons($weatherForHour['rain_possibility'],
                $weatherForHour['clouds']);
            return $weatherForHour;
        }, $weathers));
    }

    private function choiceIcons($rainPossibility, $clouds)
    {
        if ($rainPossibility >= 0.8) {
            return $this->icons['rain'];
        }

        if ($clouds > 15) {
            return $this->icons['sunCloud'];
        }

        return $this->icons['sun'];
    }
}
