$(function () {
    function addError() {
        let err = "";
        for (let i in arguments) {
            err += arguments[i].data + "<br>";
        }
        return err;
    }

    $(".form-auth").on("submit", function () {
        $.ajax({
            url: "index.php",
            method: "POST",
            data: $(this).serialize(),
            dataType: "json"
        }).done(function () {
            window.location.href = "index.php";
        }).fail(function (response) {
            let respJson = response.responseJSON;

            const error = $(".error:first");
            error.val("");

            if (response.status === 403) {
                if (!Array.isArray(respJson)) {
                    error.prepend(addError(respJson));
                } else {
                    error.prepend(addError(...respJson));
                }
            } else {
                error.text(`Server response: ${response.statusText}`);
            }
            log(response.responseJSON);
        });
        return false;
    });
});
