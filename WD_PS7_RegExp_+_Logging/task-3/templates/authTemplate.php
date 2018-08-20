<div class="container-auth">
    <h1>Easy Chat</h1>
    <form method="post" class="form-auth">
        <output class="error"></output>
        <?php if (isset($_SESSION['error'])) :
            foreach (array_unique($_SESSION['error']) as $error) :
                ?>
                <div class="error"><?= $error ?></div>
            <?php
            endforeach;
        endif;
        unset($_SESSION['error']);
        ?>
        <label>Enter your name</label>
        <input type="text" class="text-input" name="name" required/>
        <label>Enter your password</label>
        <input type="password" class="text-input" name="pass" required/>
        <input type="submit" class="auth-btn" value="Submit"/>
        <div class="shadow"></div>
    </form>
</div>
