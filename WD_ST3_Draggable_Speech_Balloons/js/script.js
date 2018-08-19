$(function () {
    const container = $("#container");
    let balloonId = 0;

    function createBalloon(event) {
        const parentCoors = container.offset();
        return $("<div/>").attr("id", balloonId)
            .addClass("ui-widget-content draggable")
            .css({
                "top": event.clientY - parentCoors.top,
                "left": event.clientX - parentCoors.left,
                "position": "absolute"
            })
            .append("<input>")
            .draggable({containment: "parent"});
    }

    function createBalloonFromServer(params) {
        balloonId = parseInt(params.id) + 1;
        return $("<div/>").attr("id", params.id)
            .addClass("ui-widget-content draggable")
            .css({
                "top": parseInt(params.position.positionY),
                "left": parseInt(params.position.positionX),
                "position": "absolute"
            })
            .text(params.message)
            .draggable({containment: "parent"});
    }

    function saveMsg(obj, key = 13) {
        let value = "";
        const input = obj.children[0];

        if (key === 13) {
            value = input.value;
        } else if (key === 27) {
            value = input.getAttribute("value");
        } else {
            return false;
        }

        if (!value) {
            obj.remove();
            return false;
        }

        const styles = getComputedStyle(obj);
        const info = {
            "id": obj.getAttribute("id"),
            "position": {
                "positionX": styles.left,
                "positionY": styles.top
            },
            "message": value
        };
        sendBalloonInfo(info);

        $(obj).text(value);
        input.remove();
        return true;
    }

    function sendBalloonInfo(info) {
        return $.ajax({
            url: "server/server.php",
            method: "POST",
            data: {"newInfo": info}
        }).fail(function (response) {
            console.log("error: " + response);
        })
    }

    $.ajax({
        url: "data/data.json",
        method: "GET",
        dataType: "json"
    }).done(function (response) {
        for (let i in response) {
            createBalloonFromServer(response[i]).appendTo(container);
        }
    }).fail(function (response) {
        if (response.responseText === "") {
            console.log("data file is empty");
        } else {
            console.log(response.statusText);
        }
    });

    container.on("dblclick", function (event) {
        const dblclickTarget = event.target;
        if (dblclickTarget === this) {
            createBalloon(event).appendTo(container).children("input").trigger("focus");
            balloonId++;
        } else if (dblclickTarget.className.indexOf("draggable") + 1) {
            const msg = dblclickTarget.innerText;
            dblclickTarget.innerText = "";
            $("<input/>").attr("value", msg).val(msg).appendTo(dblclickTarget).trigger("select").trigger("focus");
        }
    });

    container.on("blur", ".draggable", function () {
        saveMsg(this);
    });

    container.on("keydown", ".draggable", function (event) {
        saveMsg(this, event.which);
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
                "id": currentBalloon.attr("id"),
                "position": {
                    "positionX": currentBalloon.css("left"),
                    "positionY": currentBalloon.css("top")
                },
                "message": currentBalloon.text()
            };
            sendBalloonInfo(info);
        }
    });
});