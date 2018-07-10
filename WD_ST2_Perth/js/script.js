/* --- Button on top --- */
$(function() {

    const onTopButton = $("#go-up");
    const htmlBody = $("body, html");
    const speedAnimation = 400;
    const invisibleHeight = 50;

    // Show button
    $(window).on("scroll", function () {
        if ($(this).scrollTop() > invisibleHeight) {
            onTopButton.removeClass("invisibleElem").addClass("showedElem");
        }
        else {
            onTopButton.removeClass("showedElem").addClass("invisibleElem");
        }
    });

    // Go to top function
    let onTopIsPress = false;

    onTopButton.on("click", function () {
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
        // Clear queue if go-up is pressed several times (onTopIsPress === true)
        else {
            onTopButton.stop();
        }
    });

    /* --- Hidden menu --- */
    const hiddenMenu = $("#hidden-menu");
    const burger = $(".burger");
    
    function showOrHidden() {
        hiddenMenu.toggleClass("invisibleElem showedElem");
        burger.children("i").toggleClass("fas fa-times perfect icon-gamburger");
    }

    burger.on("click", showOrHidden);
    hiddenMenu.on("click", "a", showOrHidden);
});
