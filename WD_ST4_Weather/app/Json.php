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
        include('TemperatureConverter.php');
        $obj = json_decode(file_get_contents($this->jsonDataConfig['jsonPath']));
        $icons = $this->jsonDataConfig['icons'];
        $weathers = $obj->list;
        array_splice($weathers, $this->jsonDataConfig['forecastsNumber']);
        echo json_encode(array_map(function ($weatherForHour) use ($icons) {
            return [
                    'time' => $weatherForHour->dt,
                    'temperature' => TemperatureConverter::kelvinToCelsius($weatherForHour->main->temp),
                    'icon' => $this->choiceIcons($weatherForHour->weather[0]->main),
            ];
        }, $weathers));
    }

    private function choiceIcons($iconId) {
        return $this->jsonDataConfig['icons'][$iconId];
    }
}
