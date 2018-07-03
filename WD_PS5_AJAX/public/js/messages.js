$(function () {
    const field = $(".chat-field");
    const msg = $(".text-input");

    function sendMessage() {
        const data = msg.serialize();
        $.ajax({
            url: "./php/sendMsg.php",
            method: "POST",
            data: data,
            success: function (msgPhp) {
                if (msgPhp.length > 0) {
                    msg.css("color", "red");
                    msg.val(msgPhp);
                } else {
                    msg.val("");
                }
                msg.trigger("blur");
            }
        })
    }

    $(".send-btn").on("click", function (event) {
        event.preventDefault();
        sendMessage();
    });

    msg.on({
        keypress: function (event) {
            if (event.which === 13 && !msg.val()) {
                sendMessage();
                return false;
            }
        },
        focus: function () {
            msg.css("color", "#635960");
        }
    });

    const time = 1000;
    setInterval(function () {
        $.ajax({
            url: "./php/getMsg.php",
            method: "POST",
            dataType: "json",
            success: function (response) {
                if (response.length > 0) {
                    const innerMsg = response.reduce(function (sum, value) {
                        return sum + `<p class="msg">${value['date']}<span class="name"> ${value['name']}: </span>${value['message']}</p>`;
                    }, "");
                    field.append(innerMsg).scrollTop(field.innerHeight());
                }
            }
        })
    }, time);
});