<?php
function auth($name, $pass, $file)
{
    $errors = [];

    $name = htmlspecialchars($name);
    $pass = htmlspecialchars($pass);

    if (strlen(trim($name)) < 3) {
        $errors[] = 'Name mast contain more then 3 characters';
    }
    if (strlen(trim($pass)) < 3) {
        $errors[] = 'Password mast contain more then 3 characters';
    }

    if (!empty($errors)) {
        header('Content-Type: application/json');
        echo json_encode($errors);
        return;
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

    header('Content-Type: application/json');
    echo json_encode($errors);
}
