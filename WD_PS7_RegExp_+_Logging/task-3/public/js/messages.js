$(function () {
    const error = $(".error:first");

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
            error.text(errorMsg.responseJSON.data);
        } else {
            error.text(`Server response: ${errorMsg.responseJSON.message}`);
        }
        log(errorMsg.responseJSON);
    }

    function ajax(data) {
        return $.ajax({
            url: "index.php",
            method: "POST",
            data: data,
            dataType: "json"
        });
    }

    const field = $(".chat-field");
    let lastMsgId = -1;

    function getMessages() {
        ajax({
            getMsg: "get messages",
            msgId: lastMsgId
        }).done(function (response) {
            const msgsArr = response["data"];
            if (!msgsArr) {
                return log(response);
            }

            const currentMsgId = lastMsgId;
            const lastResponseMsgId = msgsArr[msgsArr.length - 1]["idMsg"];
            if (currentMsgId === lastResponseMsgId) {
                response.message = "no new messages";
                return log(response);
            }

            lastMsgId = lastResponseMsgId;

            for (let i in msgsArr) {
                if (currentMsgId >= msgsArr[i]["idMsg"]) {
                    continue;
                }
                field.append(
                    $("<p/>").addClass("msg")
                        .text(`${formatTime(msgsArr[i]["dateMsg"])} `)
                        .append(
                            $("<span/>").addClass("name")
                                .text(`${msgsArr[i]["userName"]}: `)
                        )
                        .append(`${changeCharsToSmile(msgsArr[i]["messageText"])}`)
                );
            }

            field.scrollTop(field.prop("scrollHeight") - field.innerHeight());
            log(response);
        }).fail(function (response) {
            badResponse(response);
        });
    }

    getMessages();

    $(".form-chat").on("submit", function (e) {
        e.preventDefault();
        ajax($(this).serialize()).done(function (response) {
            $(".text-input").val("");
            error.text("");
            log(response);
            getMessages();
        }).fail(function (response) {
            badResponse(response);
        });
    });

    setInterval(getMessages, 1000);
});
