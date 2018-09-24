<?php

include('WeatherInterface.php');

class Db implements WeatherInterface
{
    private $dbDataConfig;

    public function __construct($dataConfig)
    {
        $this->dbDataConfig = $dataConfig;
    }

    public function run()
    {
        $dbConfig = $this->dbDataConfig;
        $dsn = "mysql:host={$dbConfig['dbHost']};port={$dbConfig['dbPort']};dbname={$dbConfig['dbName']};charset=utf8";
        $connection = new PDO($dsn, $dbConfig['dbUser'], $dbConfig['dbPassword'], $dbOptions);
        $request = $connection->prepare('SELECT UNIX_TIMESTAMP(forecast.timestamp) AS `time`, `temperature`, `rain_possibility`, `clouds` FROM `forecast`');
        $request->execute();
        $weatherForecasts = $request->fetchAll();
        $request = null;
        $connection = null;

        array_splice($weatherForecasts, $dbConfig['forecastsNumber']);
        echo json_encode(array_map(function ($weatherForHour) use ($dbConfig) {
            $weatherForHour['icon'] = $this->choiceIcons($value['rain_possibility'], $value['clouds']);
            return $weatherForHour;
        }, $weatherForecasts));
    }

    private function choiceIcons($rainPossibility, $clouds) {
            if ($rainPossibility >= 0.8) {
                return $this->dbDataConfig['icons'][2];
            } 
            if ($clouds > 15) {
               return $this->dbDataConfig['icons'][4];
            }
            return $this->dbDataConfig['icons'][3];
    }
}
