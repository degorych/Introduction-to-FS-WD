<?php
session_start();
if (!isset($_SESSION['userName'])) {
    $_SESSION['error'] = 'No access to chat';
    header('Location: index.php');
}
if ($_SERVER['REQUEST_METHOD']) {
    unset($_SESSION['numOfMsg']);
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
    <title>Chat</title>
</head>
<body>
<header>
    <div class="line"></div>
</header>
<div class="content-center">
    <div class="container-chat">
        <h1>Easy Chat</h1>
        <div class="chat-field">
            <?php echo "Hello, <span class='name'>" . $_SESSION["userName"] . "</span><br>" ?>
        </div>
        <form class="form-chat">
            <input type="text" class="text-input" name="message" required/>
            <input type="submit" class="send-btn" value="Send"/>
        </form>
    </div>
</div>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="js/script.js"></script>
</body>
</html>