<?php

class WeatherFactory
{
    public static function selectClass($name, $appConfig, $dataConfig)
    {
        if (!isset($dataConfig[$name])) {
            return 'Weather service data not found';
        }

        if (!file_exists($appConfig[$name])) {
            return 'Weather service functions not found';
        }

        require $appConfig[$name];
        return new $name($dataConfig[$name]);
    }
}
