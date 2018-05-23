<?php
if (stristr($_SERVER["PHP_SELF"], "createJson.php")) {
	header("Location:../index.html");
}

function createJson($file) {
	$variants = ["first variant" => 0, "second variant" => 0, "third variant" => 0, "fourth variant" => 0];
	if (!file_exists($file) || !file_get_contents($file)) {
		$createFile = fopen($file, "w");
		fwrite($createFile, json_encode($variants, JSON_PRETTY_PRINT));
		fclose($createFile);
	}
}

