<?php
if (empty($_POST) && $_SERVER["PHP_SELF"] === "/php/paintVoutGraph.php") {
	header("Location:../index.html");
}

$error = false;
$file = "json/data.json";
$variants = array("first variant" => 0, "second variant" => 0, "third variant" => 0, "fourth variant" => 0);

if (!file_exists($file)) {
    $createFile = fopen($file, "w");
    fwrite($createFile, json_encode($variants));
    fclose($createFile);
}

$data = $_POST["vout-variants"];

$openFile = file_get_contents($file);
$voutData = json_decode($openFile, true);
if (array_key_exists($data, $voutData)) {
	$voutData[$data] += 1;
	file_put_contents($file, json_encode($voutData));
}
else {
	$error = true;
}