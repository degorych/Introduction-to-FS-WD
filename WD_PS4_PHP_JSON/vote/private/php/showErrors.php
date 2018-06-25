<?php
/**
 * @param array $errors
 * @return string
 */
function showError($errors = []) {
    $messages = '';
    if (!empty($errors)) {
        foreach ($errors as $value) {
            $messages .= "<div class='error-msg'>$value</div>";
        }
    }
    return $messages;
}
