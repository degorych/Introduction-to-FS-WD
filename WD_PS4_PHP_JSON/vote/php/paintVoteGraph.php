<?php
if (stristr($_SERVER["PHP_SELF"], "paintVoteGraph.php")) {
	header("Location:../index.html");
}

$error = false;
$file = "./json/data.json";
$variants = array("first variant" => 0, "second variant" => 0, "third variant" => 0, "fourth variant" => 0);

if (!file_exists($file)) {
    $createFile = fopen($file, "w");
    fwrite($createFile, json_encode($variants));
    fclose($createFile);
}

$data = $_POST["vote-variants"];

$openFile = file_get_contents($file);
$voteData = json_decode($openFile, true);
if (array_key_exists($data, $voteData)) {
	$voteData[$data] += 1;
	file_put_contents($file, json_encode($voteData));
}
else {
	$error = true;
}