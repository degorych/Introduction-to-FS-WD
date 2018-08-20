<div class="container-chat">
    <h1>Easy Chat</h1>
    <div class="chat-field-container">
        <div class="chat-field">
            Hello, <span class='name'><?= $_SESSION['userName'] ?></span><br>
        </div>
    </div>
    <form class="form-chat">
        <input type="text" class="text-input" name="message" required/>
        <input type="submit" class="send-btn" value="Send"/>
    </form>
    <form method="post">
        <input type="hidden" name="logout"/>
        <input type="submit" value="Logout"/>
    </form>
    <div class="error"></div>
    <?php if (isset($_SESSION['error'])) :
        foreach (array_unique($_SESSION['error']) as $error) :
            ?>
            <div class="error"><?= $error ?></div>
        <?php
        endforeach;
    endif;
    unset($_SESSION['error']);
    ?>
</div>
