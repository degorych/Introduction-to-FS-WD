<?php
function createJson($file, $data) {
    if (!file_exists($file)) {
        if (!file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT))) {
            $_SESSION['error'] = 'Can not create file';
            return 'index';
        }
        return 'chat';
    }
    if (!is_writable($file)) {
        $_SESSION['error'] = 'File is not writable';
        return 'index';
    }
    return false;
}