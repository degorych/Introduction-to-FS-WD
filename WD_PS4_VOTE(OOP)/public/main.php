<?php session_start(); ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="css/style.css">
    <title>Vote</title>
</head>
<body>
<div class="container">
    <?php if (isset($_SESSION['error'])) : ?>
        <div class="msg">
            <?= $_SESSION['error']; ?>
        </div>
    <?php
        unset($_SESSION['error']);
    endif;
    ?>
    <form action="index.php" method="post">
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
