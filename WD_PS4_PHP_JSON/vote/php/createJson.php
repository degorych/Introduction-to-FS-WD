<?php
if (stristr($_SERVER['PHP_SELF'], 'createJson.php')) {
	header('Location:../index.html');
}

function createJson($file) {
	$variants = ['first variant' => 0, 'second variant' => 0, 'third variant' => 0, 'fourth variant' => 0];

    // File does not exist
	if (!file_exists($file)) {
        if (!file_put_contents($file, json_encode($variants, JSON_PRETTY_PRINT))) {
            throw new Exception('File can not be created');
        };
        return;
    }

    // File exists but empty
    $openFile = file_get_contents($file);
    if (!$openFile) {
        if (!file_put_contents($file, json_encode($variants, JSON_PRETTY_PRINT))) {
            throw new Exception('Can not be written to a file');
        };
        return;
    }

    // Wrong number of variants
    $voteData = json_decode($openFile, true);
    if (count($voteData) !== count($variants)) {
        throw new Exception('Error count of variants');
    }

    // Incorrect key or value of variants
    $checkVariants = function () use ($voteData, $variants) {
        foreach ($voteData as $key => $value) {
            if (!isset($variants[$key]) || !is_numeric($value) || $value < 0) {
                return $key;
            }
        }
        return true;
    };
    if ($checkVariants() !== true) {
        throw new Exception("Error in json data: {$checkVariants()}");
    }
}

