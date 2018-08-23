<?php
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    header('Location: ' . __DIR__ . DIRECTORY_SEPARATOR .'..' . DIRECTORY_SEPARATOR. 'index.html');
    die();
}

$dataPath = __DIR__ . DIRECTORY_SEPARATOR .'..' . DIRECTORY_SEPARATOR . 'data' . DIRECTORY_SEPARATOR . 'data.json';

if (!file_exists($dataPath)) {
    if (file_put_contents($dataPath, []) === false) {
        $fileError = 'Data file can not be created';
    }
}

if (!is_readable($dataPath)) {
    $fileError = 'Data file is not readable';
}

if (!is_writable($dataPath)) {
    $fileError = 'Data file is not writable';
}

if (isset($fileError)) {
    http_response_code(400);
    header('Content-Type: application/json');
    echo json_encode($fileError);
    return;
}

if (!isset($_POST['newInfo'])) {
    http_response_code(400);
    header('Content-Type: application/json');
    echo json_encode('no get data');
    return;
} else {
    $balloonInfo = $_POST['newInfo'];
}

$fullBalloonsData = json_decode(file_get_contents($dataPath),true);

if (!$fullBalloonsData) {
    file_put_contents($dataPath, json_encode($balloonInfo, JSON_PRETTY_PRINT));
}

$findBalloon = false;

foreach ($fullBalloonsData as $index => $balloon) {
    if ($balloon['id'] === $balloonInfo['id'] && $balloonInfo['delete'] === 'false') {
        $fullBalloonsData[$index] = $balloonInfo;
        $findBalloon = true;
        break;
    } elseif ($balloon['id'] === $balloonInfo['id'] && $balloonInfo['delete'] === 'true') {
        unset ($fullBalloonsData[$index]);
        $findBalloon = true;
        break;
    }
}

if (!$findBalloon && $balloonInfo['delete'] === 'false') {
    $fullBalloonsData[] = $balloonInfo;
}
file_put_contents($dataPath, json_encode(array_values($fullBalloonsData), JSON_PRETTY_PRINT), LOCK_EX);
echo json_encode('OK');
