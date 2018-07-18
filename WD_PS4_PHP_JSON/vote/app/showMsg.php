<?php
function showMsg($msgArray, $component)
{
    $result = '';

    if (!empty($msgArray)) {
        $msg = include $component;
        foreach ($msgArray as $value) {
            $result .= str_replace('message', $value, $msg);
        }
    }

    unset($_SESSION['msg']);
    return $result;
}
