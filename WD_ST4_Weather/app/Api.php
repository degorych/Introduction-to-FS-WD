<?php

include('WeatherInterface.php');

class Api implements WeatherInterface
{
    private $apiDataConfig;
    private $icons;

    public function __construct($dataConfig, $icons)
    {
        $this->apiDataConfig = $dataConfig;
        $this->icons = $icons;
    }

    public function run()
    {
        $weather = json_decode(@file_get_contents($this->apiDataConfig['apiPath'] . $this->apiDataConfig['apiKey']));

        if (!$weather) {
            http_response_code(400);
            header('Content-Type: application/json');
            echo json_encode('Can not get data from weather service API');
            return;
        }

        include('TemperatureConverter.php');

        array_splice($weather, $this->apiDataConfig['forecastsNumber']);

        http_response_code(200);
        header('Content-Type: application/json');
        echo json_encode(array_map(function ($weatherForHour) {
            return [
                'time' => $weatherForHour->EpochDateTime,
                'temperature' => TemperatureConverter::fahrenheitToCelsius($weatherForHour->Temperature->Value),
                'icon' => $this->choiceIcons($weatherForHour->WeatherIcon),
            ];
        }, $weather));
    }

    private function choiceIcons($iconId)
    {
        if ($iconId >= 1 && $iconId <= 5 || $iconId >= 33 && $iconId <= 37) {
            return $this->icons['sun'];
        }

        if ($iconId === 38 || $iconId === 6) {
            return $this->icons['sunCloud'];
        }

        if ($iconId >= 15 && $iconId <= 17 || $iconId === 41 || $iconId === 42) {
            return $this->icons['flash'];
        }

        if ($iconId >= 7 && $iconId <= 11 || $iconId === 30 || $iconId === 32) {
            return $this->icons['cloud'];
        }

        return $this->icons['rain'];
    }
}
