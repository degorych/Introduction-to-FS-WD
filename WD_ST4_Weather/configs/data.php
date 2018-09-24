<?php
define(FORECAST_AMOUNT, 6); 
return [
    'api' => [
        'forecastsNumber' => FORECAST_AMOUNT,
        'apiPath' => 'http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/324291?apikey=',
        'apiKey' => 'ukGAODqauQ90orXmsQ4XnunciQ5UkKDg',
        'icons' => [
            'cloud' => '/^[7-9]$|1[01]|30|32/',
            'flash' => '/1[5-7]|4[1-2]/',
            'rain' => '/1[23489]|2[0-9]|39|4[034]/',
            'sun' => '/^[1-5]$|3[3-7]/',
            'sun-cloud' => '/^6$|38/'
        ]
    ],

    'db' => [
        'forecastsNumber' => FORECAST_AMOUNT,
        'dbHost' => 'localhost',
        'dbName' => 'weather',
        'dbUser' => 'root',
        'dbPassword' => '',
        'dbPort' => 3306,
        'icons' => ['cloud', 'flash', 'rain', 'sun', 'sun-cloud']
    ],
    'json' => [
        'forecastsNumber' => FORECAST_AMOUNT,
        'jsonPath' => dirname(__DIR__) . DIRECTORY_SEPARATOR . 'data' . DIRECTORY_SEPARATOR . 'today.json',
        'icons' => [
            'Clear' => 'sun',
            'Clouds' => 'cloud',
            'Rain' => 'rain',
            'Clouds-sun' => 'sun-cloud',
            'Flash' => 'flash',
        ]
    ]
];
