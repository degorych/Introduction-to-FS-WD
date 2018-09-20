<?php

include('WeatherInterface.php');

class Json implements WeatherInterface
{
    private $jsonDataConfig;

    public function __construct($dataConfig)
    {
        $this->jsonDataConfig = $dataConfig;
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
