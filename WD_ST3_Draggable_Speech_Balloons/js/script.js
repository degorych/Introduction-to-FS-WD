$(function () {
    const container = $("#container");
    const body = $("body");
    const badDbResponse = {
        responseText: "Can not get speech balloons"
    };
    let balloonId = 0;

    function formatText(message) {
        const maxMessageLens = 100;
        const maxWordLens = 15;
        const hyphenLens = 7;

        message = message.split(" ").reduce(function (msg, word) {
            if (word.length >= maxWordLens) {
                return msg + " " + word.match(new RegExp('(.{1,'+ maxWordLens +'})', 'g'))
                    .reduce(function (accum, value) {

                        const beforeHyphen = value.slice(0, hyphenLens);
                        const afterHyphen = value.slice(hyphenLens, value.length-1);

                        return accum + beforeHyphen + "\u00AD" + afterHyphen;
                    }, "\u00AD");
            } else {
                return msg + " " + word;
            }
        }, "");

        if (message.length > maxMessageLens) {
            message = message.slice(0, maxMessageLens) + "...";
        }

        return message;
    }

    const failResponseHandler = function (response) {
        const errorSelector = response.status === 404 ? badDbResponse : response;
        const createErrorEl = $("<div/>").addClass("error")
            .text(errorSelector.responseText)
            .appendTo(body);
        setTimeout(function () {
            createErrorEl.hide(400);
        }, 3000);
    };

    function getBalloonsFromDB() {
        $.ajax({
            url: "data/data.json",
            method: "GET",
            dataType: "json"
        }).done(function (response) {
            for (let i in response) {
                createSpeechBalloon(response[i]).appendTo(container)
                    .hyphenate('en-us');
            }
        }).fail(failResponseHandler);
    }

    function createSpeechBalloon(params) {
        balloonId = parseInt(params.id) + 1;
        const newBalloon = $("<div/>").attr("id", params.id)
            .addClass("ui-widget-content draggable")
            .css({
                top: parseInt(params.position.positionY),
                left: parseInt(params.position.positionX),
                position: "absolute"
            })
            .draggable({containment: "parent"});

        !params.message ? newBalloon.append("<input>") : newBalloon.text(formatText(params.message));

        return newBalloon;
    }

    function checkOutBorder(obj) {
        const balloonCoors = $(obj).position();
        const containerCoors = container.offset();

        const rightPos = container.outerWidth() - (balloonCoors.left + $(obj).outerWidth(true));
        const bottomPos = container.outerHeight() - (balloonCoors.top + $(obj).outerHeight(true));

        const absoluteCoors = {
            top: containerCoors.top + balloonCoors.top,
            left: containerCoors.left + balloonCoors.left
        };

        if (rightPos < 0) {
            absoluteCoors.left += rightPos;
            $(obj).offset(absoluteCoors);
        }
        if (bottomPos < 0) {
            absoluteCoors.top += bottomPos;
            $(obj).offset(absoluteCoors);
        }
    }

    const saveKey = 13;
    const revertKey = 27;

    function saveMsg(obj, key = saveKey) {
        let value = "";
        const input = obj.children[0];

        if (key === saveKey) {
            value = input.value;
        } else if (key === revertKey) {
            value = input.getAttribute("value");
        } else {
            return false;
        }

        if (!value) {
            const info = {
                id: obj.getAttribute("id"),
                delete: 1
            };
            sendBalloonInfo(info);

            $(obj).remove();
            return false;
        }

        $(obj).text(formatText(value)).hyphenate('en-us');
        input.remove();

        checkOutBorder(obj);

        const styles = getComputedStyle(obj);
        const info = {
            id: obj.getAttribute("id"),
            position: {
                positionX: styles.left,
                positionY: styles.top
            },
            message: value,
            delete: 0
        };
        sendBalloonInfo(info);

        return true;
    }

    function sendBalloonInfo(info) {
        return $.ajax({
            url: "server/server.php",
            method: "POST",
            data: {newInfo: info},
        }).fail(failResponseHandler)
    }

    getBalloonsFromDB();

    container.on("dblclick", function (event) {
        const dblclickTarget = event.target;

        if (dblclickTarget === this) {
            const parentCoors = container.offset();
            const info = {
                id: balloonId,
                position: {
                    positionX: event.clientX - parentCoors.left - 20,
                    positionY: event.clientY - parentCoors.top - 50
                },
                message: "",
                delete: 0
            };
            createSpeechBalloon(info).appendTo(container)
                .children("input")
                .trigger("focus");
        } else if (dblclickTarget.className.indexOf("draggable") + 1) {
            const msg = dblclickTarget.innerText;
            dblclickTarget.innerText = "";
            $("<input/>").attr("value", msg)
                .val(msg)
                .appendTo(dblclickTarget)
                .trigger("select")
                .trigger("focus");
        }
    });

    container.on("blur", ".draggable", function () {
        saveMsg(this);
    });

    container.on("keydown", ".draggable", function (event) {
        container.off("blur", ".draggable");
        saveMsg(this, event.which);
        container.on("blur", ".draggable", function () {
            saveMsg(this);
        });
    });

    container.on("mousedown", ".draggable", function () {
        const currentBalloon = $(this);
        currentBalloon.data("position", currentBalloon.offset());
    });

    container.on("mouseup", ".draggable", function () {
        const currentBalloon = $(this);
        const firstPos = currentBalloon.data().position;
        const lastPos = currentBalloon.offset();

        if (firstPos.top !== lastPos.top || firstPos.left !== lastPos.left) {
            const info = {
                id: currentBalloon.attr("id"),
                position: {
                    positionX: currentBalloon.css("left"),
                    positionY: currentBalloon.css("top")
                },
                message: currentBalloon.text(),
                delete: 0
            };
            sendBalloonInfo(info);
        }
    });
});