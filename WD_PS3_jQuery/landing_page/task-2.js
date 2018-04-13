/* --- Button on top --- */
$(document).ready(function() {
    $(window).scroll(function () {

        let invisibleHeight = 50;

        // Show button
        if ($(this).scrollTop() > invisibleHeight) {
            $("#on-top").css("display", "flex");
        }
        else {
            $("#on-top").css("display", "none");
        }
    });

    let htmlBody = $("body, html");

    $("#on-top").click(function () {
        htmlBody.on("wheel DOMMouseScroll mousewheel", function () {
            htmlBody.stop();
        });
        htmlBody.animate({
            scrollTop: 0
        }, "slow", function () {
            htmlBody.off("wheel DOMMouseScroll mousewheel");
        });
    });

    /* --- Ancor links --- */

    $("nav.header__nav").on("click","a", function (event) {
        event.preventDefault();

        htmlBody.on("wheel DOMMouseScroll mousewheel", function () {
            htmlBody.stop();
        });

        let id  = $(this).attr("href");
        let top = $(id).offset().top;
        let ElementHeight = $(id).outerHeight(true);
        let windowHeight = $(window).height();
        let scrollHeight = (ElementHeight > windowHeight) ? top : top - (windowHeight - ElementHeight) / 2;

        htmlBody.animate({
            scrollTop: scrollHeight
        }, "slow", function () {
            htmlBody.off("wheel DOMMouseScroll mousewheel");
        });
    });
});