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
        echo json_encode([
            [
                'time' => time(),
                'temperature' => 25,
                'icon' => 'sun'
            ],
            [
                'time' => time(),
                'temperature' => 25,
                'icon' => 'sun'
            ]
        ]);
    }
}
