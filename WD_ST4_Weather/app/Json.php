<?php

include('WeatherInterface.php');

class Json implements WeatherInterface
{
    private $jsonDataConfig;
    private $icons;
    private $jsonError;

    public function __construct($dataConfig, $icons)
    {
        $this->jsonDataConfig = $dataConfig;
        $this->icons = $icons;
        $this->jsonError = $this->checkJson();
    }

    private function checkJson()
    {
        if (!file_exists($this->jsonDataConfig['jsonPath'])) {
            return 'Json is not found';
        }

        if (!is_writable($this->jsonDataConfig['jsonPath'])) {
            return 'Json is not writable';
        }

        if (!is_readable($this->jsonDataConfig['jsonPath'])) {
            return 'Json is not readable';
        }

        return false;
    }

    public function run()
    {
        if ($this->jsonError) {
            http_response_code(404);
            header('Content-Type: application/json');
            echo json_encode($this->jsonError);
            return;
        }

        include('TemperatureConverter.php');

        $jsonForecasts = json_decode(file_get_contents($this->jsonDataConfig['jsonPath']));
        $weatherForecasts = $jsonForecasts->list;

        array_splice($weatherForecasts, $this->jsonDataConfig['forecastsNumber']);

        http_response_code(200);
        header('Content-Type: application/json');

        echo json_encode(array_map(function ($weatherForHour) {
            return [
                'time' => $weatherForHour->dt,
                'temperature' => TemperatureConverter::kelvinToCelsius($weatherForHour->main->temp),
                'icon' => $this->choiceIcons($weatherForHour->weather[0]->main, $weatherForHour->clouds->all),
            ];
        }, $weatherForecasts));
    }

    private function choiceIcons($iconId, $cloudValue)
    {
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
