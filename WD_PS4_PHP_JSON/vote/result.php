<?php
session_start();
$config = require 'config.php';
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="css/style.css">
    <title>Paint graph</title>
</head>
<body>
<div class="container-pie">
    <?php
    function printErrorMsg($msg) {
        echo "<div class='error-msg'>$msg</div>";
    }

    include_once $config['createJson'];
    $file = $config['jsonFile'];
    try {
        createJson($file);
    } catch (Exception $e) {
        if ($e->getMessage() !== $_SESSION['error']) {
            printErrorMsg($e->getMessage());
        }
    }

    if (!$_SESSION['referer']) {
        $errorMsg = 'Warning, you are not vote, please, back to main to choice variant';
        printErrorMsg($errorMsg);
    } else {
        unset($_SESSION['referer']);
    }

    if (isset($_SESSION['error'])) {
        printErrorMsg($_SESSION['error']);
        unset($_SESSION['error']);
    }
    ?>
    <div id="piechart"></div>
    <a href="<?= $config['main'] ?>"> Back to main</a>
</div>
<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
<script type="text/javascript" src="<?= $config['js'] ?>"></script>
</body>
</html>