$(document).ready(function() {
    // Names array
    const friendsArray = [
        ["Jenny Hess", "1.png"],
        ["Elliot Fu", "2.png"],
        ["Stevie Feliciano", "3.png"],
        ["Cristian", "4.png"],
        ["Matt", "5.png"]
    ];

    // Dropdown DOM elements and speed const
    let dropDivEl = $(".dropdown-element-div");
    let dropPersonEl = $(".dropdown-element-person");
    let dropUlEl = $(".dropdown-element-ul");
    const speedAnimation = 400;

    // Create options for dropdown
    dropUlEl.append(friendsArray.reduce(function (elements, value) {
        let name = value.slice(0, 1);
        let img = value.slice(1);
        return elements + `<li class="dropdown-element-li"><img class="dropdown-element-img" src="img/${img}" alt="${name}">${name}</li>`;
    }, ""));

    let dropLiEl = $(".dropdown-element-li");

    // Show options
    dropDivEl.on("click", function () {
        dropUlEl.slideToggle(speedAnimation, function () {
            $(this).stop(true, false);
        });
    });

    // Hide options when clicking outside dropdown
    $(document).on("click", function (event) {
        if (!dropDivEl.is(event.target)) {
            dropUlEl.slideUp(speedAnimation);
        }
    });

    // Event listeners for clicking on options
    dropLiEl.on({"click": function () {
            let optionElement = $(this);
            dropUlEl.slideUp(speedAnimation);
            dropPersonEl.text(optionElement.text()).css("color", "black");
            dropPersonEl.prepend(`<img class="dropdown-element-img" src="${optionElement.find("img").attr("src")}" alt="${optionElement.text()}">`);
        },
        "mouseover": function () {
            $(this).css("background-color", "#eaeaea");
        },
        "mouseout": function () {
            $(this).css("background-color", "white");
        }
    });
});