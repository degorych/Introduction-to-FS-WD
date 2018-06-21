<?php
session_start();
$config = require_once __DIR__ . '/../private/php/config.php';
$file = $config['jsonFile'];
$variants = require_once $config['variants'];
$errorMsg = [];

include_once $config['createJson'];
try {
    createJson($file, $variants);
} catch (Exception $e) {
    $errorMsg[] = $e->getMessage();
}

if (!isset($_POST['vote-variants']) || isset($_SESSION['isVote'])) {
    $errorMsg[] = 'Warning, you are not vote, please, back to main to choice variant';
} else {
    $_SESSION['isVote'] = true;
    $countVotes = include_once $config['voteCounter'];
    try {
        if (!is_bool($countVotes($_POST['vote-variants'], $file))) {
            $errorMsg[] = $countVotes;
        }
    } catch (Exception $e) {
        $errorMsg[] = $e->getMessage();
    }
}
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
    if (!empty($errorMsg)) {
        foreach ($errorMsg as $value) {
            echo "<div class='error-msg'>$value</div>";
        }
    }
    ?>
    <div id="piechart"></div>
    <a href="<?= $config['main'] ?>"> Back to main</a>
</div>
<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
<script type="text/javascript" src="<?= $config['js'] ?>"></script>
</body>
</html>