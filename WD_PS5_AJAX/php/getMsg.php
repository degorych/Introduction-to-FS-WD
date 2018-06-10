<?php
session_start();
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    $_SESSION['error'] = 'No access to get messages';
    header('Location:../index.php');
}

// Current time
date_default_timezone_set('Europe/Kiev');
$currentDate = time();

// Show messages in $showTimeSec period
function showMsgInPeriod($currentDate, $time)
{
    $showTimeSec = 3600;
    return ($currentDate - $time) < $showTimeSec;
}

// Convert seconds to hh:mm:ss
function formatDate($date)
{
    return "[" . date('H:i:s', $date) . "]";
}

// Number of showed messages
$numOfMsg = isset($_SESSION['numOfMsg']) ? $_SESSION['numOfMsg'] : 0;

$config = include 'config.php';
$file = $config['messages'];
include_once $config['createJson'];

if (!file_exists($file) || !file_get_contents($file)) {
    echo '';
} else {
    $dataToUser = '';
    $msgList = json_decode(file_get_contents($file), true);
    $msgListNumEl = count($msgList);

    for (; $numOfMsg < $msgListNumEl; $numOfMsg++) {
        if (showMsgInPeriod($currentDate, $msgList[$numOfMsg]['date'])) {
            $dataToUser .= "<p class='msg'>" . formatDate($msgList[$numOfMsg]['date']) . " <span class='name'>" . $msgList[$numOfMsg]['name'] . ": </span>" . $msgList[$numOfMsg]['msg'] . "</p>";
        }
    }

    $_SESSION['numOfMsg'] = $msgListNumEl;
    echo $dataToUser;
}