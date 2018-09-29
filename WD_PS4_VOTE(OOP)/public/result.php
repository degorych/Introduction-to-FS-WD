<?php session_start(); ?>
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
    <?php if (isset($_SESSION['voted'])) : ?>
        <div class="msg">
            <?= $_SESSION['voted']; ?>
        </div>
    <?php
        unset($_SESSION['voted']);
    endif;
    ?>
    <div id="piechart"></div>
    <?php $config = require_once dirname(__DIR__) . DIRECTORY_SEPARATOR . 'app' . DIRECTORY_SEPARATOR . 'config.php'; ?>
    <a href="<?= $config['main'] ?>"> Back to main</a>
</div>
<script type="text/javascript" src="js/jquery.js"></script>
<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
<script type="text/javascript" src="js/pieCharts.js"></script>
</body>
</html>
