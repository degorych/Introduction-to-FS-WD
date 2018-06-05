<?php
session_start();
if (!empty($_POST)) header('Location: ../index.html');

include_once 'createJson.php';
$file = '../json/data.json';
try {
    createJson($file);
} catch (Exception $e) {
    $_SESSION['error'] = $e->getMessage();
}

if (file_exists($file)) {
    $data = $_POST['vote-variants'];
    $openFile = file_get_contents($file);
    $voteData = json_decode($openFile, true);

    if (isset($voteData[$data])) {
        $voteData[$data] += 1;
        file_put_contents($file, json_encode($voteData, JSON_PRETTY_PRINT));
    } else {
        $_SESSION['error'] = "$data not found";
    }
}

$_SESSION['referer'] = true;
header('Location: ../result.php');