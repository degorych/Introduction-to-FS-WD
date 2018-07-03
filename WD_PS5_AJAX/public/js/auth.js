$(function () {
    function sendForm() {
        $.ajax({
            url: "./php/auth.php",
            method: "POST",
            data: $(".form-auth").serialize(),
            success: function (request) {
                const error = $(".error");
                error.val("");
                if (request.length > 0) {
                    error.prepend(function () {
                        let string = "";
                        for (let key in request) {
                            string += request[key] + "<br>";
                        }
                        return string;
                    });
                } else {
                    window.location.href = "chat.php";
                }
            }
        });
        return false;
    }

    $(".auth-btn").on("click", function (event) {
        event.preventDefault();
        sendForm();
    });

});