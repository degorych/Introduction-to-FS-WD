<?php
$auth = function () use ($config, $connection) {
    $name = htmlspecialchars($_POST['name']);
    $pass = htmlspecialchars($_POST['pass']);

    if (strlen($name) < 3) {
        $errors[] = 'Name mast contain more then 2 characters';
    }
    if (strlen($pass) < 3) {
        $errors[] = 'Password mast contain more then 2 characters';
    }

    if (!empty($errors)) {
        http_response_code(403);
        header('Content-Type: application/json');
        echo json_encode($errors);
        return;
    }

    try {
        $request = $connection->prepare("SELECT userName, userPass FROM users WHERE userName = :name");
        $request->execute(['name' => $name]);
        $findUser = $request->fetch();
        $request = null;
    } catch (Exception $e) {
        $errors[] = $e->getMessage();
        http_response_code(400);
        header('Content-Type: application/json');
        echo json_encode($errors);
        return;
    }

    if (empty($findUser)) {
        try {
            $request = $connection->prepare("INSERT INTO users VALUES (null, :name, :pass)");
            $request->execute(['name' => $name, 'pass' => $pass]);
            $request = null;
        } catch (Exception $e) {
            $errors[] = $e->getMessage();
            http_response_code(400);
            header('Content-Type: application/json');
            echo json_encode($errors);
            return;
        }

        $_SESSION['userName'] = $name;
        $responseCode = 200;
        $msg[] = 'New user is add';
    } elseif ($findUser['userPass'] === $pass) {
        $_SESSION['userName'] = $name;
        $responseCode = 200;
        $msg[] = 'User is auth';
    } else {
        $responseCode = 403;
        $msg[] = 'Wrong password';
    }

    http_response_code($responseCode);
    header('Content-Type: application/json');
    echo json_encode($msg);
};
