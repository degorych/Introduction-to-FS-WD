<?php
define('APP_PATH', __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR);
define('GOOD_RESPONSE', 'save data');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    header('Location: ' . APP_PATH . 'index.html');
    die();
}

if (!isset($_POST['newInfo'])) {
    http_response_code(400);
    echo 'No get data';
    die();
} else {
    $balloonInfo = $_POST['newInfo'];
}

$dataPath = APP_PATH . 'data' . DIRECTORY_SEPARATOR . 'data.json';

if (!file_exists($dataPath)) {
    if (!file_put_contents($dataPath, json_encode([$balloonInfo], JSON_PRETTY_PRINT))) {
        http_response_code(400);
        echo 'Data file can not be created';
        die();
    } else {
        echo GOOD_RESPONSE;
        return;
    }
}

if (!is_readable($dataPath) || !is_writable($dataPath)) {
    http_response_code(400);
    echo 'Can not work with data file';
    return;
}

$fullBalloonsData = json_decode(file_get_contents($dataPath), true);

if (!$fullBalloonsData) {
    file_put_contents($dataPath, json_encode([$balloonInfo], JSON_PRETTY_PRINT));
    echo GOOD_RESPONSE;
    return;
}

$findBalloon = false;
$deleteBalloon = (boolean) $balloonInfo['delete'];

// Rewrite or delete balloon if it exists
foreach ($fullBalloonsData as $index => $balloon) {
    if ($balloon['id'] === $balloonInfo['id'] && !$deleteBalloon) {
        $fullBalloonsData[$index] = $balloonInfo;
        $findBalloon = true;
        break;
    } elseif ($balloon['id'] === $balloonInfo['id'] && $deleteBalloon) {
        unset ($fullBalloonsData[$index]);
        $findBalloon = true;
        break;
    }
}

// Add new balloon to db
if (!$findBalloon && !$deleteBalloon) {
    $fullBalloonsData[] = $balloonInfo;
}

file_put_contents($dataPath, json_encode(array_values($fullBalloonsData), JSON_PRETTY_PRINT), LOCK_EX);
echo GOOD_RESPONSE;
