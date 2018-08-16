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
</div>
