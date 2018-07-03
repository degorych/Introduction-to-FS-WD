<?php
// Convert chars to smiles
function smile($msg)
{
    $smiles = ['smile' => ':)', 'sad' => ':('];
    foreach ($smiles as $key => $value) {
        $msg = str_replace($value, "<img src='./img/$key.png' alt='$key'>", $msg);
    }
    return $msg;
}

// Show messages in $showTimeSec period
function showMsgInPeriod($currentDate, $time)
{
    $showTimeSec = 3600;
    return ($currentDate - $time) < $showTimeSec;
}

// Convert seconds to hh:mm:ss
function formatDate($date)
{
    return '[' . date('H:i:s', $date) . ']';
}

// Create date
function createDate()
{
    date_default_timezone_set('Europe/Kiev');
    return time();
}
