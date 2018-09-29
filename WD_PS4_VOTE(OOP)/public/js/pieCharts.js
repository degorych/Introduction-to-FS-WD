const piechart = $('#piechart');
const voteData = [["Vote variant", "result"]];

$.ajax({
    url: "index.php",
    method: "POST",
    data: {jsonContent: "true"},
    dataType: "json"
}).done(function (response) {
    for (let key in response) {
        voteData.push([key, response[key]]);
    }

    drawPiecharts();

}).fail(function () {
    $("<div/>", {class: "msg", text: "No data"}).prependTo($(".container-pie"));
    piechart.addClass("hidden");
});

function drawPiecharts() {
    google.charts.load('current', {'packages': ['corechart']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        const data = google.visualization.arrayToDataTable(voteData);

        const options = {
            width: 900,
            colors: ["#ff1763", "#ff4c8a", "#ff85b3", "#ffabcf"],
            pieHole: 0.5,
            backgroundColor: "#0d192a",
            fontName: "Verdana",
            legend: {position: "right", alignment: "center", textStyle: {color: "white", fontSize: 20}},
            title: "Vote result",
            titleTextStyle: {color: "#ff1763", fontName: "Verdana", fontSize: 20}
        };

        const chart = new google.visualization.PieChart(piechart[0]);

        chart.draw(data, options);
    }
}
