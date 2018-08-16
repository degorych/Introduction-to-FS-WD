<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no,
          initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="icon" type="img/ico" href="img/favicon.ico">
    <link rel="stylesheet" href="css/style.css">
    <title><?= $pageConf['title']; ?></title>
</head>
<body>
<header>
    <div class="line"></div>
</header>
<div class="content-center">
<?php require $pageConf['body']; ?>
</div>
<?php if (isset($_SESSION['error'])) : ?>
    <div class="error"><?= $_SESSION['error'] ?></div>
<?php
endif;
unset($_SESSION['error']);
?>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="<?= $pageConf['script']; ?>"></script>
</body>
</html>
