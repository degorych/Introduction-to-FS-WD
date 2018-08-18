$(function () {
    const container = $("#container");
    
    function getCursorPosition(event) {
        return {x: event.pageX, y: event.pageY};
    }
    
    function createBalloon(event) {
        return $("<div/>").addClass("ui-widget-content draggable")
            .css({
                "top": getCursorPosition(event).y,
                "left": getCursorPosition(event).x
            })
            .append("<input>")
            .draggable();
    }

    function saveMsg(obj, key) {
        let value;
        if (key === 13) {
            value = obj.value;
        } else if (key === 27) {
            value = getAttribute('value');
        } else {
            return;
        }
        obj.offsetParent.innerText = value;
        obj.remove();
    }

    container.on("dblclick", function (event) {
        if (event.target === this) {
            createBalloon(event).appendTo(container).children("input").trigger("focus");
        } else if (event.target.className.indexOf("draggable") + 1) {
            const msg = event.target.innerText;
            event.target.innerText = "";
            $("<input/>").attr("value", msg).val(msg).appendTo(event.target).trigger("focus");
            console.log(event.target.children);
        }
    });

    container.on("blur", "input", function () {
        saveMsg(this, 13);
    });

    container.on("keydown", "input", function (event) {
        saveMsg(this, event.which);
    });
});