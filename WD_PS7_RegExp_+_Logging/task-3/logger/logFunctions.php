<?php
function checkLog($logPath) {
    if (!file_exists($logPath)) {
        if (file_put_contents($logPath, []) === false) {
            throw new Exception('Log file can not be created');
        }
    }

    if (!is_readable($logPath)) {
        throw new Exception('Log file is not readable');
    }

    if (!is_writable($logPath)) {
        throw new Exception('Log file is not writable');
    }
    return true;
}
