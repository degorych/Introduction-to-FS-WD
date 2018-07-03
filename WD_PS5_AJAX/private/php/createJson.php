<?php
function createJson($file, $data)
{
    if (!file_exists($file)) {
        if (!file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT))) {
            throw new Exception('File can not be created');
        }
        return true;
    }
    if (!is_writable($file)) {
        throw new Exception('File is not writable');
    }
    return false;
}
