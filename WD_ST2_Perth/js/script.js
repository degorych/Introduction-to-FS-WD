/* --- Button on top --- */
$(function() {

    const onTopButton = $("#go-up");
    const htmlBody = $("body, html");
    const speedAnimation = 400;
    const invisibleHeight = 50;

    // Show button
    $(window).on("scroll", function () {
        if ($(this).scrollTop() > invisibleHeight) {
            onTopButton.css("display", "flex");
        }
        else {
            onTopButton.css("display", "none");
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
    }).hover(function () {
        $(this).css("opacity", 1);
    }, function () {
        $(this).css("opacity", 0.7);
    });

    /* --- Hidden menu --- */
    const hiddenMenu = $("#hidden-menu");
    const burger = $(".burger");
    let burgerIsClicked = false;

    burger.on("click", function () {
        if (!burgerIsClicked) {
            hiddenMenu.css("display", "flex");
            burgerIsClicked = true;
        }
        else {
            hiddenMenu.css("display", "none");
            burgerIsClicked = false;
        }
        burger.children("i").toggleClass("fas fa-times perfect icon-gamburger");
        hiddenMenu.css("height", $("header").outerHeight());
    });

    hiddenMenu.on("click", "a", function () {
        hiddenMenu.css("display", "none");
        burger.children("i").toggleClass("fas fa-times perfect icon-gamburger");
        burgerIsClicked = false;
    });

    $(window).on("resize", function () {
        hiddenMenu.css("height", $("header").outerHeight());
    })
});
