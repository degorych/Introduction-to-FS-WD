<?php

include('WeatherInterface.php');

class Json implements WeatherInterface
{
    private $jsonDataConfig;
    private $icons;

    public function __construct($dataConfig, $icons)
    {
        $this->jsonDataConfig = $dataConfig;
        $this->icons = $icons;
    }

    public function run()
    {
        include('TemperatureConverter.php');

        $jsonForecasts = json_decode(file_get_contents($this->jsonDataConfig['jsonPath']));
        $icons = $this->jsonDataConfig['icons'];
        $weatherForecasts = $jsonForecasts->list;

        array_splice($weatherForecasts, $this->jsonDataConfig['forecastsNumber']);

        echo json_encode(array_map(function ($weatherForHour) use ($icons) {
            return [
                    'time' => $weatherForHour->dt,
                    'temperature' => TemperatureConverter::kelvinToCelsius($weatherForHour->main->temp),
                    'icon' => $this->choiceIcons($weatherForHour->weather[0]->main, $weatherForHour->clouds->all),
            ];
        }, $weatherForecasts));
    }

    private function choiceIcons($iconId, $cloudValue) {
        if ($iconId === 'Clear' && $cloudValue < 10) {
            return $this->icons['sun'];
        }

        if ($iconId === 'Clear' && $cloudValue >= 10) {
            return $this->icons['sunCloud'];
        }

        if ($iconId === 'Clouds') {
            return $this->icons['cloud'];
        }

        if ($iconId === 'Rain') {
            return $this->icons['rain'];
        }

        return $this->icons['flash'];
    }
}
