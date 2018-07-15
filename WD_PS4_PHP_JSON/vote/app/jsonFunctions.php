<?php
/**
 * @param string $file
 * @param array $variants
 * @return bool
 * @throws Exception
 */
function createJson($file, $variants)
{
    $defaultVoteResults = [];
    foreach ($variants as $value) {
        $defaultVoteResults[$value] = 0;
    }

    // File does not exist
    if (!file_exists($file)) {
        if (!file_put_contents($file, json_encode($defaultVoteResults, JSON_PRETTY_PRINT))) {
            throw new Exception('File can not be created');
        }
    }

    // File is not writable
    if (!is_writable($file)) {
        throw new Exception('File not writable');
    }
    return true;
}
