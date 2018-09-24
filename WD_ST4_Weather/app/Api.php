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
        $weathers = json_decode(file_get_contents($this->apiDataConfig['apiPath'] . $this->apiDataConfig['apiKey']));
        include('TemperatureConverter.php');


        array_splice($weathers, $this->apiDataConfig['forecastsNumber']);
        echo json_encode(array_map(function ($weatherForHour) use ($icons) {
            return [
                    'time' => $weatherForHour->EpochDateTime,
                    'temperature' => TemperatureConverter::fahrenheitToCelsius($weatherForHour->Temperature->Value),
                    'icon' => $this->choiceIcons($weatherForHour->WeatherIcon),
            ];
        }, $weathers));
    }

    private function choiceIcons($iconId) {
            if ($iconId >= 1 && $iconId <= 5 || $iconId >= 33 && $iconId <= 37) {
                return 'sun';
            } 
            if ($iconId === 38 || $iconId === 6) {
                return 'sun-cloud';
            } 
            if ($iconId >= 15 && $iconId <= 17 || $iconId === 41 || $iconId === 42) {
                return 'flash';
            } 
            if ($iconId >= 7 && $iconId <= 11 || $iconId === 30 || $iconId === 32) {
                return 'cloud';
            }
            return 'rain';
            //єто самое длинное условие, его вынес без проверок
            // if ($iconId >= 12 && $iconId <= 29 || $iconId === 39 || $iconId === 40 || $iconId === 43 || $iconId === 44) {
            //     return 'rain';
            // } 
    }
}
