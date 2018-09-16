<?php
return function ($config) {
    if (!($jsonData = @file_get_contents($config['apiPath'] . $config['apiKey']))) {
        return 'Can not get data from app';
    }

    $jsonData = json_decode($jsonData, true);

    foreach ($jsonData as $value) {
        $response[] = [
            'time' => $value['EpochDateTime'],
            'temperature' => round(($value['Temperature']['Value'] - 32) * 5 / 9) + 0,
            'icon' => key(array_filter($config['icons'], function ($val) use ($value) {
                return preg_match($val, (string)$value['WeatherIcon']);
            }))
        ];
    }
    return $response;
};
