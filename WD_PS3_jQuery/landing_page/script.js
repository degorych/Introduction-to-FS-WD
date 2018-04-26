/* --- Button on top --- */
$(document).ready(function() {

    const onTopButton = $("#on-top");
    const htmlBody = $("body, html");
    const speedAnimation = 400;
    const invisibleHeight = 50;

    // Show button
    $(window).scroll(function () {
        if ($(this).scrollTop() > invisibleHeight) {
            onTopButton.css("display", "flex");
        }
        else {
            onTopButton.css("display", "none");
        }
    });

    // Go to top function
    let onTopIsPress = false;

    onTopButton.click(function () {
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
            onTopButton.stop();
        }
    });

    /* --- Ancor links --- */

    $("nav.header__nav").on("click","a", function (event) {
        event.preventDefault();

        htmlBody.on("wheel DOMMouseScroll mousewheel", function () {
            htmlBody.stop();
        });

        // Get height to center of element, or to beginning of element if his height more then window
        const id  = $(this).attr("href");
        const top = $(id).offset().top;
        const ElementHeight = $(id).outerHeight(true);
        const windowHeight = $(window).height();
        const scrollHeight = (ElementHeight > windowHeight) ? top : top - (windowHeight - ElementHeight) / 2;

        htmlBody.animate({
            scrollTop: scrollHeight
        }, speedAnimation, function () {
            htmlBody.off("wheel DOMMouseScroll mousewheel");
        });
    });
});