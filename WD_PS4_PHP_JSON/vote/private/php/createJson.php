<?php
/**
 * @param string $file
 * @param array $variants Associative array with voting options
 * @return bool
 * @throws Exception
 */
function createJson($file, $variants)
{
    // File does not exist
    if (!file_exists($file)) {
        if (!file_put_contents($file, json_encode($variants, JSON_PRETTY_PRINT))) {
            throw new Exception('File can not be created');
        }
    }

    // File is not writable
    if (!is_writable($file)) {
        throw new Exception('File can not be created');
    }

    // Wrong number of variants
    $voteData = json_decode(file_get_contents($file), true);
    if (count($voteData) !== count($variants)) {
        throw new Exception('Error count of variants');
    }

    /**
     * Incorrect key or value of variants
     * @return bool|int|string
     */
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
    return true;
}
