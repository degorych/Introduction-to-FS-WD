$(function () {
    const field = $(".chat-field");
    const msg = $(".text-input");

    function sendMessage() {
        const data = msg.serialize();
        $.ajax({
            url: "../php/sendMsg.php",
            method: "POST",
            data: data,
            success: function (msgPhp) {
                if (msgPhp) {
                    msg.val("");
                } else {
                    msg.val("Your message is empty");
                }
            }
        })
    }

    $(".send-btn").on("click", function (event) {
        event.preventDefault();
        sendMessage();
    });

    msg.on("keypress", function (event) {
        if (event.which === 13 && !msg.val()) {
            sendMessage();
            return false;
        }
    });

    const time = 1000;
    setInterval(function () {
        $.ajax({
            url: "../php/getMsg.php",
            method: "POST",
            success: function (response) {
                if (response) {
                    field.append(response).scrollTop(field.innerHeight());
                }
            }
        })
    }, time);
});