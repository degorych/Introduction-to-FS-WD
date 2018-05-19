let voteData = [
    ["Vote variant", "result"]
];

fetch("json/data.json")
    .then(response => response.json())
    .then(function (data) {
        let valueArr = []; // For check
        for (let key in data) {
            voteData.push([key, data[key]]);
            valueArr.push(data[key]);
        }
        // If json not exist and nobody voted, pie chart is invisible
        const piechart = document.getElementById("piechart");
        if (valueArr.every(value => (value === 0))) {
            piechart.style.display = "none";
        }
    })
    .then(function() {
        google.charts.load("current", {packages:["corechart"]});
        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {
            let data = google.visualization.arrayToDataTable(voteData);

            let options = {
                width: 900,
                colors: ["#ff1763", "#ff4c8a", "#ff85b3", "#ffabcf"],
                pieHole: 0.5,
                backgroundColor: "#0d192a",
                fontName: "Verdana",
                legend: {position: "right", alignment: "center", textStyle: {color: "white", fontSize: 20}},
                title: "Vote result",
                titleTextStyle: {color:"#ff1763", fontName: "Verdana", fontSize: 20},
            };

            const chart = new google.visualization.PieChart(document.getElementById("piechart"));
            chart.draw(data, options);
        }
    });