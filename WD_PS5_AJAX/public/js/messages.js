$(function () {
    const field = $(".chat-field");
    const msg = $(".text-input");

    function sendMessage() {
        $.ajax({
            url: "index.php",
            method: "POST",
            data: $(".form-chat").serialize(),
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
        const getMsg = new FormData();
        getMsg.append("getMsg", "");

        $.ajax({
            url: "index.php",
            method: "POST",
            data: {getMsg: ""},
            dataType: "json",
            success: function (response) {
                if (response.length > 0) {
                    let messages = "";
                    for (let i in response) {
                        messages += `<p class="msg">${response[i]['date']}<span class="name"> ${response[i]['name']}: </span>${response[i]['message']}</p>`;
                    }
                    field.append(messages).scrollTop(field.innerHeight());
                }
            }
        })
    }, time);
});
