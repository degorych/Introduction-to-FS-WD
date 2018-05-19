<?php
include_once("./php/functions.php");

define("PAINTCHESS", "0");
define("DIGITSUM", "1");

if (isset($_POST["task"])) {
    $resultFunc = 0;
    $taskValue = $_POST["task"];
    switch ($taskValue) {
        case PAINTCHESS: $resultFunc = paintChess();
            break;
        case DIGITSUM: $resultFunc = digitSum();
            break;
				default: $resultFunc = "function error";
    }
}
?>
<!doctype html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport"
					content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
		<meta http-equiv="X-UA-Compatible" content="ie=edge">
		<title>WD_PS4 PHP, JSON</title>
		<link rel="stylesheet" href="css/style.css">
	</head>
	<body>
		<div class="1task">
			<h2>1. Я считаю сумму чисел от "-1000" до "1000"</h2>
        <?php
        echo $sum;
        ?>
		</div>
		<div class="2task">
			<h2>2. Я считаю сумму чисел, оканчивающихся на 2, 3, 7</h2>
        <?php
        echo $sum237;
        ?>
		</div>
		<div class="3task">
			<h2>3. Я рисую картинку из 50 строк со звездами</h2>
				<?php
        echo $star;
				?>
		</div>
		<div class="4task">
			<h2>4. Я рисую шахматные доски</h2>
			<form method="post">
				<label>Введите размер доски:
					<input type="number" name="chess-number-row" value="4" pattern="\d+" required/>
					<span>Х</span>
					<input type="number" name="chess-number-column" value="4" pattern="\d+" required/>
				</label>
				<input type="hidden" name="task" value="<?php echo PAINTCHESS; ?>"/>
				<input type="submit" name="but" value="Нарисовать"/>
			</form>
			<div class="chess-board">
				<?php
				if ($taskValue === PAINTCHESS) {
					echo $resultFunc;
				}
				?>
			</div>
		</div>
		<div class="5task">
			<h2>5. Я считаю сумму цифр числа</h2>
			<form action="/" method="post">
				<label>Введите число
					<input type="number" name="user-number" value="1234" pattern="\d+" required/>
				</label>
				<input type="hidden" name="task" value="<?php echo DIGITSUM; ?>">
				<input type="submit" name="but" value="Считать"/>
			</form>
        <?php
        if ($taskValue === DIGITSUM) {
            echo $resultFunc;
        }
        ?>
		</div>
		<div class="6task">
			<h2>5. Я создаю и сортирую массив</h2>
				<?php
        foreach ($uniqRandomArr as $key => $val) {
            echo "$val key: $key"."<br>"; // Key - index in array
        }
				?>
		</div>
	</body>
</html>
