<?php
/**
 * @param array $variants Associative array with voting options
 * @return string
 */
function createCheckbox($variants) {
    $checkboxList = '';
    foreach ($variants as $key => $value) {
        $checked = ($key === 0) ? 'checked/' : '';
        $checkboxList .= "<label><input type='radio' name='vote-variants' value='{$value}' {$checked}> {$value}</label>";
    }
    return $checkboxList;
}
