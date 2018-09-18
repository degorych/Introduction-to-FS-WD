<?php
return function ($config) {
    if (!file_exists($config['jsonPath']) || !($jsonData = @file_get_contents($config['jsonPath'])) || !is_readable($config['jsonPath']) || !is_writable($config['jsonPath'])) {
        return 'Can not work with json file';
    }

    $jsonData = json_decode($jsonData, true);

    if (empty($jsonData)) {
        return 'Json file is empty';
    }

    foreach ($jsonData['list'] as $value) {
        $icon = array_search($value['weather'][0]['main'], $config['icons']);

        if ($icon === 'Clouds' && $value['clouds']['all'] > 20) {
            $icon .= '-sun';
        }

        $response[] = [
            'time' => $value['dt'],
            'temperature' => round($value['main']['temp'] - 273.15) + 0,
            'icon' => $icon

        ];
    }
    return $response;
};
