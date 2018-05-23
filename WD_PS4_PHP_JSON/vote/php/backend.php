<?php
$rout = (empty($_POST)) ? "../index.html" : "../result.php";

include_once "createJson.php";
$file = "../json/data.json";
createJson($file);

$data = $_POST["vote-variants"];

$openFile = file_get_contents($file);
$voteData = json_decode($openFile, true);
if (array_key_exists($data, $voteData)) {
	$voteData[$data] += 1;
	file_put_contents($file, json_encode($voteData, JSON_PRETTY_PRINT));
}
unset($_POST["vote-variants"]);
header("Location:".$rout);