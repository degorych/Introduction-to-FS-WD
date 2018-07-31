<?php
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: ../index.html');
}

$regex = [
    'ip' => '/^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$/',
    'url' => '/^(https?:\/\/)?([\da-z-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/',
    'email' => '/^([a-z0-9_\.-]+)@([a-z0-9]+)\.([a-z]{2,6})$/',
    'date' => '/^(0\d|1[0-2])\/([0-2]\d|3[01])\/([01]\d{3}|20[01][0-8])$/',
    'time' => '/^([01]\d|2[0-3])(:[0-5]\d){2}$/'
];

$result = [];

foreach ($regex as $name => $reg) {
    $result[$name] = (boolean)preg_match($reg, $_POST[$name]);
}

header('Content-Type: application/json');
echo json_encode($result);
