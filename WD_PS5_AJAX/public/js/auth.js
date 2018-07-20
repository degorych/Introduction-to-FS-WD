$(function () {
    function sendForm() {
        $.ajax({
            url: "index.php",
            method: "POST",
            data: $(".form-auth").serialize(),
            success: function (request) {
                if (request.length > 0) {
                    const error = $(".error");
                    error.val("");
                    error.prepend(function () {
                        let string = "";
                        for (let key in request) {
                            string += request[key] + "<br>";
                        }
                        return string;
                    });
                } else {
                    window.location.href = "index.php";
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