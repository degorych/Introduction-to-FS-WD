$(function () {
    const container = $("#container");
    
    function getCursorPosition(event) {
        const parentCoors = container.offset();
        return {x: event.pageX - parentCoors.left, y: event.pageY - parentCoors.top};
    }
    
    function createBalloon(event) {
        return $("<div/>").addClass("ui-widget-content draggable")
            .css({
                "top": getCursorPosition(event).y - 10,
                "left": getCursorPosition(event).x + 25
            })
            .append("<input>")
            .draggable({containment: "parent", cursor: "move"});
    }

    function saveMsg(obj, key = 13) {
        let value;

        if (key === 13) {
            value = obj.value;
        } else if (key === 27) {
            value = obj.getAttribute('value');
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
            $("<input/>").attr("value", msg).val(msg).appendTo(event.target).trigger("select").trigger("focus");
        }
    });

    container.on("blur", "input", function () {
        saveMsg(this);
    });

    container.on("keydown", "input", function (event) {
        saveMsg(this, event.which);
    });
});