$(function() {
    // Names array
    const friendsArray = [
        {
            name: "Jenny Hess",
            img: "1.png"
        },
        {
            name: "Elliot Fu",
            img: "2.png"
        },
        {
            name: "Stevie Feliciano",
            img: "3.png"
        },
        {
            name: "Cristian",
            img: "4.png"
        },
        {
            name: "Matt",
            img: "5.png"
        }
    ];

    // Dropdown DOM elements and speed const
    const dropDivEl = $(".dropdown-element-div");
    const dropPersonEl = $(".dropdown-element-person");
    const dropUlEl = $(".dropdown-element-ul");
    const speedAnimation = 400;

    // Create options for dropdown
    dropUlEl.append(friendsArray.reduce(function (elements, value) {
        let name = value.name;
        let img = value.img;
        return elements + `<li class="dropdown-element-li">
                                  <img class="dropdown-element-img" 
                                          src="img/${img}" 
                                          alt="${name}">${name}
                           </li>`;
    }, ""));

    const dropLiEl = $(".dropdown-element-li");

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
    dropLiEl.on("click", function () {
            const optionElement = $(this);
            dropUlEl.slideUp(speedAnimation);
            dropPersonEl.text(optionElement.text()).css("color", "black");
            dropPersonEl.prepend(`<img class="dropdown-element-img" 
                                        src="${optionElement.find("img").attr("src")}" 
                                        alt="${optionElement.text()}">`);
        })
        .hover(function () {
            $(this).css("background-color", "#eaeaea");
        }, function () {
            $(this).css("background-color", "#fff");
        });
});