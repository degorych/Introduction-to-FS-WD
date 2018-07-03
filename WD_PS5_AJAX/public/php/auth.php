<?php
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: ' . $config['index']);
}
header('Content-Type: application/json');

session_start();
$errors = [];
$config = require_once __DIR__ . '\..\..\private\php\config.php';

$name = htmlspecialchars($_POST['name']);
$pass = htmlspecialchars($_POST['pass']);

if (strlen(trim($name)) < 3) {
    $errors[] = 'Name mast contain more then 3 characters';
}
if (strlen(trim($pass)) < 3) {
    $errors[] = 'Password mast contain more then 3 characters';
}

if (empty($errors)) {
    $file = $config['users'];
    $userData = [$name => $pass];
    include_once $config['createJson'];

    try {
        $newJson = createJson($file, $userData);
    } catch (Exception $e) {
        $errors[] = $e->getMessage();
        echo json_encode($errors);
    }

    if ($newJson) {
        $_SESSION['userName'] = $name;
    }

    $usersList = json_decode(file_get_contents($file), true);

    if (!isset($usersList[$name])) {
        $usersList[$name] = $pass;
        file_put_contents($file, json_encode($usersList, JSON_PRETTY_PRINT));
        $_SESSION['userName'] = $name;
    } else {
        if ($usersList[$name] !== $pass) {
            $errors[] = 'Wrong password';
        } else {
            $_SESSION['userName'] = $name;

        }
    }
}

echo json_encode($errors);
