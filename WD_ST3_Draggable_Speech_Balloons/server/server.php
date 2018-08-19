<?php
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    header('Location: ../index.html');
}

$dataPath = '../data/data.json';

if (!file_exists($dataPath)) {
    if (file_put_contents($dataPath, []) === false) {
        $fileError = 'Log file can not be created';
    }
}

if (!is_readable($dataPath)) {
    $fileError = 'Log file is not readable';
}

if (!is_writable($dataPath)) {
    $fileError = 'Log file is not writable';
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
    if ($balloon['id'] === $balloonInfo['id']) {
        $fullBalloonsData[$index] = $balloonInfo;
        $findBalloon = true;
        break;
    }
}

if (!$findBalloon) {
    $fullBalloonsData[] = $balloonInfo;
}

file_put_contents($dataPath, json_encode($fullBalloonsData, JSON_PRETTY_PRINT), LOCK_EX);
