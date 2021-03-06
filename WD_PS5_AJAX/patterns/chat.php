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
        <div class="chat-field-container">
            <div class="chat-field">
                <?php
                if (isset($_SESSION["userName"])) :
                    ?>
                    Hello, <span class='name'><?= $_SESSION["userName"] ?></span><br>
                <?php endif; ?>
            </div>
        </div>
        <form class="form-chat">
            <input type="text" class="text-input" name="message" required/>
            <input type="hidden" name="chat"/>
            <input type="submit" class="send-btn" value="Send"/>
        </form>
        <form method="post">
            <input type="hidden" name="logout"/>
            <input type="submit" value="Logout"/>
        </form>
    </div>
</div>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="js/messages.js"></script>
</body>
</html>
