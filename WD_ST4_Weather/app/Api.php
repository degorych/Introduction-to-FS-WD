<?php
include('WeatherInterface.php');

class Api implements WeatherInterface
{
    private $apiDataConfig;

    public function __construct($dataConfig)
    {
        $this->apiDataConfig = $dataConfig;
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