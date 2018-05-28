const voteData = [];
const voteTitle = ["Vote variant", "result"];
const piechart = document.getElementById("piechart");

fetch("json/data.json")
    .then(response => response.json())
    .then(function (data) {
        for (let key in data) {
            voteData.push([key, data[key]]);
        }
        // If nobody voted, pie chart is invisible
        if (voteData.every(value => (value[1] === 0))) {
            piechart.style.display = "none";
        }
        voteData.unshift(voteTitle);
    })
    .then(function () {
        google.charts.load("current", {packages:["corechart"]});
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
                titleTextStyle: {color:"#ff1763", fontName: "Verdana", fontSize: 20},
            };

            const chart = new google.visualization.PieChart(piechart);
            chart.draw(data, options);
        }
    });