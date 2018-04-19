/* --- Button on top --- */
$(document).ready(function() {
    $(window).scroll(function () {

        const invisibleHeight = 50;

        // Show button
        if ($(this).scrollTop() > invisibleHeight) {
            $("#on-top").css("display", "flex");
        }
        else {
            $("#on-top").css("display", "none");
        }
    });

    let onTopIsPress = false;
    const speedAnimation = 400;
    let htmlBody = $("body, html");

    $("#on-top").click(function () {
        htmlBody.on("wheel DOMMouseScroll mousewheel", function () {
            htmlBody.stop();
        });

        if (!onTopIsPress) {
            onTopIsPress = true;
            htmlBody.animate({
                scrollTop: 0
            }, speedAnimation, function () {
                htmlBody.off("wheel DOMMouseScroll mousewheel");
                onTopIsPress = false;
            });
        }
        // Clear queue if on-top is pressed several times (onTopIsPress === true)
        else {
            $("#on-top").stop();
        }
    });

    /* --- Ancor links --- */

    $("nav.header__nav").on("click","a", function (event) {
        event.preventDefault();

        htmlBody.on("wheel DOMMouseScroll mousewheel", function () {
            htmlBody.stop();
        });

        // Get height to center of element, or to beginning of element if his height more then window
        let id  = $(this).attr("href");
        let top = $(id).offset().top;
        let ElementHeight = $(id).outerHeight(true);
        let windowHeight = $(window).height();
        let scrollHeight = (ElementHeight > windowHeight) ? top : top - (windowHeight - ElementHeight) / 2;

        htmlBody.animate({
            scrollTop: scrollHeight
        }, speedAnimation, function () {
            htmlBody.off("wheel DOMMouseScroll mousewheel");
        });
    });
});