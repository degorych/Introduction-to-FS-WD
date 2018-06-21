<?php
session_start();
unset($_SESSION['isVote']);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="css/style.css">
    <title>Vote</title>
</head>
<body>
<div class="container">
    <form action="result.php" method="post">
        <fieldset>
            <legend>Vote variant</legend>
            <?php
            $config = require_once __DIR__ . '/../private/php/config.php';
            $variants = require_once $config['variants'];
            $createCheckboxList = require_once $config['createVote'];
            echo $createCheckboxList(array_keys($variants));
            ?>
            <input type="submit" value="Vote"/>
        </fieldset>
    </form>
</div>
</body>
</html>