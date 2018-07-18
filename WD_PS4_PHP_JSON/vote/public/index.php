<?php
session_start();
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
    <?php
	if (isset($_SESSION['msg'])) {
		$config = require_once dirname(__DIR__).DIRECTORY_SEPARATOR.'app'.DIRECTORY_SEPARATOR.'config.php';
        require_once $config['showMsg'];
        echo showMsg($_SESSION['msg'], $config['message']);
	}
    ?>
    <form action="php/handler.php" method="post">
        <fieldset>
            <legend>Vote variants</legend>
            <label>
                <input type='radio' name='vote-variants' value='first variant' checked/> first variant
            </label>
            <label>
                <input type='radio' name='vote-variants' value='second variant'/> second variant
            </label>
            <label>
                <input type='radio' name='vote-variants' value='third variant'/> third variant
            </label>
            <label>
                <input type='radio' name='vote-variants' value='fourth variant'/> fourth variant
            </label>
            <input type="submit" value="Vote"/>
        </fieldset>
    </form>
</div>
</body>
</html>
