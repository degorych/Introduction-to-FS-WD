<?php
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: ../index.php');
}
$file = __DIR__ . '\..\..\private\json\data.json';
header('Content-Type: application/json');
echo file_get_contents($file);