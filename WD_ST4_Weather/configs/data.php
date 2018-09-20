<?php
return [
    'api' => [
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
        'dbHost' => 'mysql',
        'dbName' => 'WeatherInterface',
        'dbUser' => 'root',
        'dbPassword' => '',
        'dbPort' => 3306,
        'icons' => ['cloud', 'flash', 'rain', 'sun', 'sun-cloud']
    ],
    'json' => [
        'jsonPath' => dirname(__DIR__) . DIRECTORY_SEPARATOR . 'data' . DIRECTORY_SEPARATOR . 'today.json',
        'icons' => [
            'sun' => 'Clear',
            'sun-cloud' => 'Clouds-sun',
            'flash' => 'Flash',
            'rain' => 'Rain',
            'cloud' => 'Clouds'
        ]
    ]
];
