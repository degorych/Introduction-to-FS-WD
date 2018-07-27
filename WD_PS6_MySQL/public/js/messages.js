$(function () {
    function formatTime(time) {
        const date = new Date(time * 1000);
        const dataOptions = {
            hour: "numeric",
            minute: "numeric",
            second: "numeric"
        };
        return `[${date.toLocaleString("ru", dataOptions)}]`;
    }

    function changeCharsToSmile(message) {
        const smiles = {"smile": ":\\)", "sad": ":\\("};
        for (let emotion in smiles) {
            message = message.replace(
                new RegExp(smiles[emotion], "g"),
                `<img src="./img/${emotion}.png" alt="${emotion}">`
            );
        }
        return message;
    }

    function badResponse(errorMsg) {
        if (errorMsg.status === 403) {
            error.text(errorMsg.responseJSON);
        } else {
            error.text(`Server response: ${errorMsg.statusText}`);
        }
    }

    const field = $(".chat-field");
    const msg = $(".text-input");
    const error = $(".error");

    $(".form-chat").on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            url: "index.php",
            method: "POST",
            data: $(this).serialize(),
            dataType: "json",
            success: function () {
                msg.val("");
                error.text("");
            },
            error: function (response) {
                badResponse(response);
            }
        })
    });

    setInterval(function () {
        const getMsg = new FormData();
        getMsg.append("getMsg", "");

        $.ajax({
            url: "index.php",
            method: "POST",
            data: {getMsg: "get messages"},
            dataType: "json",
            success: function (response) {
                if (response[0] === 'No messages') {
                    return;
                }
                let messages = "";
                for (let i in response) {
                    messages += `<p class="msg">
                            ${formatTime(response[i]['date'])}
                            <span class="name"> ${response[i]['name']}: </span>
                            ${changeCharsToSmile(response[i]['messageText'])}
                        </p>`;
                }
                field.append(messages).scrollTop(field.innerHeight());
            },
            error: function (response) {
                badResponse(response);
            }
        })
    }, 1000);
});
