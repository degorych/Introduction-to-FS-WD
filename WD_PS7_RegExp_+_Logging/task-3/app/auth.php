<?php
$auth = function () use ($connection, $config, $logger, $isLogging) {
    define('AUTH', 'auth');
    $name = htmlspecialchars(trim($_POST['name']));
    $pass = trim($_POST['pass']);

    $nameLen = iconv_strlen($name);
    $passLen = iconv_strlen($pass);

    require_once $config['createResponse'];

    if ($nameLen < 3 || $nameLen > 20) {
        $serverResponse = createResponse('nonCriticalErr', 'name length error', AUTH, 'Name mast contain from 3 to 20 characters');
        $logger($serverResponse, $isLogging);
        $errors[] = $serverResponse;
    }
    if ($passLen < 3 || $passLen > 20) {
        $serverResponse = createResponse('nonCriticalErr', 'password length error', AUTH, 'Password mast contain from 3 to 20 characters');
        $logger($serverResponse, $isLogging);
        $errors[] = $serverResponse;
    }

    if (!empty($errors)) {
        http_response_code(403);
        header('Content-Type: application/json');
        echo json_encode($errors);
        return;
    }

    try {
        $request = $connection->prepare('SELECT * FROM `users` WHERE `userName` = :name');
        $request->execute(['name' => $name]);
        $findUser = $request->fetch();
        $request = null;
    } catch (Exception $e) {
        http_response_code(400);
        header('Content-Type: application/json');
        echo json_encode(createResponse('criticalErr', 'bad select user request', AUTH, $e->getMessage()));
        return;
    }

    if (empty($findUser)) {
        try {
            $request = $connection->prepare('INSERT INTO `users` VALUES (null, :name, :pass)');
            $request->execute(['name' => $name, 'pass' => password_hash($pass, PASSWORD_DEFAULT)]);
            $request = null;
            $_SESSION['userId'] = $connection->lastInsertId();
        } catch (Exception $e) {
            http_response_code(400);
            header('Content-Type: application/json');
            $serverResponse = createResponse('criticalErr', 'bad add user request', AUTH, $e->getMessage());
            $logger($serverResponse, $isLogging);
            echo json_encode($serverResponse);
            return;
        }

        $_SESSION['userName'] = $name;
        $responseCode = 200;
        $responseMsg = createResponse('nonErr', 'add new user', AUTH);
    } elseif (password_verify($pass, $findUser['userPass'])) {
        $_SESSION['userId'] = $findUser['id'];
        $_SESSION['userName'] = $name;
        $responseCode = 200;
        $responseMsg = createResponse('nonErr', 'auth user', AUTH);
    } else {
        $responseCode = 403;
        $responseMsg = createResponse('nonCriticalErr', 'user entered wrong password', AUTH, 'Wrong password');
    }

    http_response_code($responseCode);
    header('Content-Type: application/json');
    $logger($responseMsg, $isLogging);
    echo json_encode($responseMsg, JSON_PRETTY_PRINT);
};
