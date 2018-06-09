<?php
session_start();
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: ../index.html');
    exit();
}

include_once 'createJson.php';
$file = '../json/data.json';
try {
    createJson($file);
} catch (Exception $e) {
    $_SESSION['error'] = $e->getMessage();
}

if (!is_writable($file)) {
    $_SESSION['error'] = 'File is not writable';
}

$data = $_POST['vote-variants'];
$voteData = json_decode(file_get_contents($file), true);

if (isset($voteData[$data])) {
    $voteData[$data] += 1;
    file_put_contents($file, json_encode($voteData, JSON_PRETTY_PRINT));
} else {
    $_SESSION['error'] = "$data not found";
}

$_SESSION['referer'] = true;
header('Location: ../result.php');