<?php
include_once ("php/paintVoutGraph.php");
?>
<!doctype html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport"
					content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
		<meta http-equiv="X-UA-Compatible" content="ie=edge">
		<link rel="stylesheet" href="css/style.css">
		<title>Paint graph</title>
	</head>
	<body>
		<div class="container-pie">
			<div class="hidden"></div>  <!--For error-->
			<div id="piechart"></div>
			<a href="index.html"> Back to main</a>
		</div>
		<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
		<script type="text/javascript" src="js/pieCharts.js"></script>
		<script>
        let error = <?php echo $error ? "true" : "false"; ?>;
        const errorMsg = "Warning, you are not vout, please, back to main to choice variant";
        const errorMsgElement = document.getElementsByClassName("hidden");
        if (error) {
            errorMsgElement[0].innerText = errorMsg;
            errorMsgElement[0].className = "error-msg";
        }
		</script>
	</body>
</html>