<?php
$logger = function ($responseArr, $isLogging) use ($config)
{
    if ($isLogging === false) {
        return false;
    }

    $responseArr['timestamp'] = date('Y-m-d h:i:s', $responseArr['timestamp']);

    $log = '';
    foreach ($responseArr as $key => $value) {
        $log .= "{$key}={$value}, ";
    }
    $log = rtrim(ltrim($log, 'timestamp='), ', ');
    $log .= PHP_EOL;

    file_put_contents($config['logFile'], $log, FILE_APPEND | LOCK_EX);
    return true;
};
