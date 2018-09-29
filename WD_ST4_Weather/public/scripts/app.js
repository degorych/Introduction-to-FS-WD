// Need HTML elements
const navEl = $("nav");
const weatherNow = $(".weatherNow");
const forecast = $(".forecast");
const errorEl = $(".error-message");

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
    $.get(`img/icons/${name}.svg`).done(function (response) {
            parent.find($(`.${iconClassName}`)[elementNumber])
                .html($(response.documentElement).attr("fill", "#fff"));
        })
        .fail(function () {
            parent.find($(`.${iconClassName}`)[elementNumber])
                .html($("<img>", {"src": "img/icons/not-found.png", "alt": "no image"}));
        });
}

// Change current weather section
function changewWeatherNow(response) {
    const firstForecastIndex = 0;
    const date = new Date(response[firstForecastIndex]["time"] * 1000);
    const options = {
        weekday: 'long',
        day: 'numeric',
        month: 'numeric'
    };

    weatherNow.find(".date")
        .text(date.toLocaleString("en", options));

    weatherNow.find(".current-temperature")
        .html(`${response[firstForecastIndex]["temperature"]}  ° `);

    insertSvg(response[firstForecastIndex]["icon"], weatherNow, "weather-icon");
}

// Create forecasts list
function createForecast(response) {
    forecast.empty();

    for (let i in response) {
        const forecastEl = $("<div/>", {class: 'hourly-forecast clearfix'});
        const date = new Date(response[i]["time"] * 1000);
        const options = {
            hour: 'numeric',
            minute: 'numeric'
        };

        $("<div/>", {class: 'forecast-date', text: date.toLocaleString("ru", options)})
            .appendTo(forecastEl);
        $("<div/>", {class: 'forecast-weather'})
            .append($("<div/>", {class: 'forecast-temperature', html: `${response[i]["temperature"]} ° `}))
            .append($("<div/>", {class: 'forecast-icon'}))
            .appendTo(forecastEl);
        insertSvg(response[i]["icon"], forecast, "forecast-icon", i);
        forecastEl.appendTo(forecast);
    }
}

// View data for selected service
function selectService(clickedEl) {
    ajax({handler: clickedEl.attr("id")}).done(function (response) {
        weatherNow.removeClass("hidden");
        forecast.removeClass("hidden");
        if (errorEl.text()) {
            errorEl.addClass("hidden").text("");
        }

        changewWeatherNow(response);
        createForecast(response);
    }).fail(function (response) {
        if (!weatherNow.hasClass("hidden")) {
            weatherNow.addClass("hidden");
        }

        if (!forecast.hasClass("hidden")) {
            forecast.addClass("hidden");
        }

        errorEl.removeClass("hidden").text(response.responseText);
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
    selectService($(this));
});
