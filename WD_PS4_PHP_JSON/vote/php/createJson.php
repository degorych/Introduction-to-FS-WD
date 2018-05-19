<?php
function createJson($file) {
	$variants = array("first variant" => 0, "second variant" => 0, "third variant" => 0, "fourth variant" => 0);

	if (!file_exists($file)) {
		$createFile = fopen($file, "w");
		fwrite($createFile, json_encode($variants));
		fclose($createFile);
	}
}

