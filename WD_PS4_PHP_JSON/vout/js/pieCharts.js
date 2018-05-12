let voutData = [
    ["Vout variant", "result"]
];

fetch("json/data.json")
    .then(response => response.json())
    .then(function (data) {
        for (let key in data) {
            voutData.push([key, data[key]]);
        }
    })
    .then(function() {
        google.charts.load("current", {packages:["corechart"]});
        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {
            let data = google.visualization.arrayToDataTable(voutData);

            let options = {
                width: 900,
                colors: ["#ff1763", "#ff4c8a", "#ff85b3", "#ffabcf"],
                pieHole: 0.5,
                backgroundColor: "#0d192a",
                fontName: "Verdana",
                legend: {position: "right", alignment: "center", textStyle: {color: "white", fontSize: 20}},
                title: "Vout result",
                titleTextStyle: {color:"#ff1763", fontName: "Verdana", fontSize: 20},
            };

            const chart = new google.visualization.PieChart(document.getElementById("piechart"));
            chart.draw(data, options);
        }
    });