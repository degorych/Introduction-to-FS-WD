<?php
session_start();

$createLink = function () {
    $name = strip_tags($_POST['name']);
    $pass = htmlspecialchars($_POST['pass']);
    $routs = ['index' => '../index.php', 'chat' => '../chat.php'];

    if (!$name || !$pass) {
        $_SESSION['error'] = 'Empty login or password';
        return $routs['index'];
    }

    // Error to access in auth.php from browser
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        $_SESSION['error'] = 'No access to auth';
        return $routs['index'];
    }

    $file = '../json/users.json';

    // Create users.json
    include_once 'createJson.php';
    $userData = [$name => $pass];
    $newJson = createJson($file, $userData);
    if ($newJson) {
        $_SESSION['userName'] = $name;
        return $routs[$newJson];
    }

    $usersList = json_decode(file_get_contents($file), true);

    if (isset($usersList[$name]) && $usersList[$name] !== $pass) {
        $_SESSION['error'] = 'Wrong password';
        return $routs['index'];
    }
    if (!isset($usersList[$name])) {
        $usersList[$name] = $pass;
        file_put_contents($file, json_encode($usersList, JSON_PRETTY_PRINT));
    }

    // isset($usersList[$name]) && $usersList[$name] === $pass
    $_SESSION['userName'] = $name;
    return $routs['chat'];

};

header('Location:' . $createLink());