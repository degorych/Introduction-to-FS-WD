$(function () {
    $(".form-auth").on("submit", function () {
        $.ajax({
            url: "index.php",
            method: "POST",
            data: $(this).serialize(),
            dataType: "json",
            success: function () {
                window.location.href = "index.php";
            },
            error: function (response) {
                const error = $(".error");
                error.val("");
                if (response.status === 403) {
                    error.prepend(function () {
                        let string = "";
                        for (let key of response.responseJSON) {
                            string += key + "<br>";
                        }
                        return string;
                    });
                } else {
                    error.text(`Server response: ${response.statusText}`);
                }
            }
        });
        return false;
    });
});
