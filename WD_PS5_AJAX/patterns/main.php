<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="css/style.css">
    <title>Auth chat</title>
</head>
<body>
<header>
    <div class="line"></div>
</header>
<div class="content-center">
    <div class="container-auth">
        <h1>Easy Chat</h1>
        <form method="post" class="form-auth">
            <output class="error"></output>
            <label>Enter your name</label>
            <input type="text" class="text-input" name="name" required/>
            <label>Enter your password</label>
            <input type="password" class="text-input" name="pass" required/>
            <input type="hidden" name="auth" value="true"/>
            <div class="shadow"></div>
            <input type="submit" class="auth-btn" value="Submit"/>
        </form>
    </div>
</div>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="js/auth.js"></script>
</body>
</html>
