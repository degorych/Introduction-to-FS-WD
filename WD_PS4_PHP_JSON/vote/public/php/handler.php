<?php
session_start();

$_SESSION['msg'] = [];

// Check access
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    $_SESSION['msg'][] = 'Access closed';
    header('Location: ../index.php');
    return;
}

// Check user voted or no
if (!isset($_POST['vote-variants']) && !isset($_POST['getJson'])) {
    $_SESSION['msg'][] = 'You not voted, please select variant';
    header('Location: ../index.php');
    return;
}

define('SEP', DIRECTORY_SEPARATOR);
define('ROOT_PATH', __DIR__.SEP.'..'.SEP.'..'.SEP);
$config = require_once ROOT_PATH.'app'.SEP.'config.php';
$file = $config['jsonFile'];
$variants = require_once $config['variants'];
require_once $config['jsonFunctions'];

// Create json if it does not exist, check to writable
try {
    checkJson($file, $variants);
} catch (Exception $e) {
    $_SESSION['msg'][] = $e->getMessage();
    header('Location: ../result.php');
    return;
}

// Get data for pie to js
if (isset($_POST['getJson'])) {
    header('Content-Type: application/json');
    echo file_get_contents($file);
    return;
}

require_once $config['voteCounter'];

// Count user vote
try {
    countVotes($_POST['vote-variants'], $file);
    $_SESSION['msg'][] = 'You voted';
} catch (Exception $e) {
    $_SESSION['msg'][] = $e->getMessage();
    header('Location: ../result.php');
}

header('Location: ../result.php');
