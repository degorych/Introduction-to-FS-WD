// Need HTML elements
const navEl = $("nav");
const now = $(".now");
const forecast = $(".forecast");

// Ajax constructor
function ajax(data) {
    return $.ajax({
        url: "index.php",
        method: "POST",
        data: data,
        dataType: "json"
    });
}

// Svg insertion
function insertSvg(name, parent, iconClassName, elementNumber = 0) {
    $.get(`img/icons/${name}.svg`).always(function (response, status) {
        const imageContent = (status === "success") ? $(response.documentElement).attr("fill", "#fff") : $("<img>", {"src": "img/icons/not-found.png", "alt": "no image"});
            parent.find($(`.${iconClassName}`)[elementNumber])
                .html(imageContent);
        });
}

// Change current weather section
function changeNow(response) {
    const date = new Date(response[0]["time"] * 1000);
    const options = {
        weekday: 'long',
        day: 'numeric',
        month: 'numeric'
    };
    now.find(".date")
        .text(date.toLocaleString("en", options));
    now.find(".current-temperature")
        .html(response[0]["temperature"] + " &#176;&nbsp;");

    insertSvg(response[0]["icon"], now, "weather-icon");
}

// Create forecasts list
function createForecast(response) {
    forecast.empty();
    const forecastsNumber = 6;

    for (let i = 0; i < forecastsNumber; i++) {
        const forecastEl = $("<div/>").addClass("hourly-forecast clearfix");

        const date = new Date(response[i]["time"] * 1000);
        const options = {
            hour: 'numeric',
            minute: 'numeric'
        };

        $("<div/>").addClass("forecast-date")
            .text(date.toLocaleString("ru", options))
            .appendTo(forecastEl);
        $("<div/>").addClass("forecast-weather")
            .append($("<div/>")
                .addClass("forecast-temperature")
                .html(response[i]["temperature"] + " &#176;&nbsp;"))
            .append($("<div/>")
                .addClass("forecast-icon"))
            .appendTo(forecastEl);
        insertSvg(response[i]["icon"], forecast, "forecast-icon", i);
        forecastEl.appendTo(forecast);
    }
}

// View data for selected service
function selectService(clickedEl) {
    ajax({query: clickedEl.attr("id")}).done(function (response) {
        now.removeClass("hidden");
        forecast.removeClass("hidden");
        $(".error-message").addClass("hidden").text("");

        changeNow(response);
        createForecast(response);
    }).fail(function (response) {
        now.addClass("hidden");
        forecast.addClass("hidden");
        $(".error-message").removeClass("hidden").text(response.responseText);
    }).always(function () {
        navEl.find("a.active").removeClass("active");
        clickedEl.addClass("active");
    });
}

// First start
selectService(navEl.children().first());

// Click listener
navEl.on("click", "a", function (e) {
    e.preventDefault();
    selectService($(e.target));
});
