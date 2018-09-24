<?php
define('FORECAST_AMOUNT', 6);
return [
    'api' => [
        'forecastsNumber' => FORECAST_AMOUNT,
        'apiPath' => 'http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/324291?apikey=',
        'apiKey' => 'ukGAODqauQ90orXmsQ4XnunciQ5UkKDg'
    ],

    'db' => [
        'forecastsNumber' => FORECAST_AMOUNT,
        'dbHost' => 'localhost',
        'dbName' => 'weather',
        'dbUser' => 'root',
        'dbPassword' => '',
        'dbPort' => 3306
    ],
    'json' => [
        'forecastsNumber' => FORECAST_AMOUNT,
        'jsonPath' => dirname(__DIR__) . DIRECTORY_SEPARATOR . 'data' . DIRECTORY_SEPARATOR . 'today.json'
    ]
];
