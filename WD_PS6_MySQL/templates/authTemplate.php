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
