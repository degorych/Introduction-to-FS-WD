<?php
// Convert chars to smiles
function smile($msg, $smileComponent)
{
    $smiles = ['smile' => ':)', 'sad' => ':('];
    foreach ($smiles as $key => $value) {
        $smileStr = str_replace('smile', $key, $smileComponent);
        $msg = str_replace($value, $smileStr, $msg);
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
