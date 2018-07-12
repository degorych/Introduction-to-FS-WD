<?php
session_start();
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
<div id="sum" class="1task">
    <h2>1. Я считаю сумму чисел от &#34;-1000&#34; до &#34;1000&#34;</h2>
    <form action="php/functions.php" method="post">
        <input type="hidden" name="task" value="sum"/>
        <input type="submit" value="Посчитать"/>
    </form>
    <div>
        <?php
        if (isset($_SESSION['sum'])) {
            echo $_SESSION['sum'];
        }
        ?>
    </div>
</div>
<div id="sum237" class="2task">
    <h2>2. Я считаю сумму чисел, оканчивающихся на 2, 3, 7</h2>
    <form action="php/functions.php" method="post">
        <input type="hidden" name="task" value="sum237"/>
        <input type="submit" value="Посчитать"/>
    </form>
    <div>
        <?php
        if (isset($_SESSION['sum237'])) {
            echo $_SESSION['sum237'];
        }
        ?>
    </div>
</div>
<div id="star" class="3task">
    <h2>3. Я рисую картинку из 50 строк со звездами</h2>
    <form action="php/functions.php" method="post">
        <input type="hidden" name="task" value="star"/>
        <input type="submit" value="Нарисовать"/>
    </form>
    <div>
        <?php
        if (isset($_SESSION['star'])) {
            echo $_SESSION['star'];
        }
        ?>
    </div>
</div>
<div id="paintChess" class="4task">
    <h2>4. Я рисую шахматные доски</h2>
    <form action="php/functions.php" method="post">
        <label>Введите размер доски:
            <input type="number" name="chess-number-row" placeholder="4" pattern="\d+" required/>
            <span>Х</span>
            <input type="number" name="chess-number-column" placeholder="4" pattern="\d+" required/>
        </label>
        <input type="hidden" name="task" value="paintChess"/>
        <input type="submit" value="Нарисовать"/>
    </form>
    <div class="chess-board">
        <?php
        if (isset($_SESSION['paintChess'])) {
            echo $_SESSION['paintChess'];
        }
        ?>
    </div>
</div>
<div id="digitSum" class="5task">
    <h2>5. Я считаю сумму цифр числа</h2>
    <form action="php/functions.php" method="post">
        <label>Введите число
            <input type="number" name="user-number" placeholder="1234" pattern="\d+" required/>
        </label>
        <input type="hidden" name="task" value="digitSum">
        <input type="submit" value="Считать"/>
    </form>
    <div>
        <?php
        if (isset($_SESSION['digitSum'])) {
            echo $_SESSION['digitSum'];
        }
        ?>
    </div>
</div>
<div id="sortArray" class="6task">
    <h2>6. Я создаю и сортирую массив</h2>
    <form action="php/functions.php" method="post">
        <input type="hidden" name="task" value="sortArray"/>
        <input type="submit" value="Создать"/>
    </form>
    <div>
        <?php
        if (isset($_SESSION['sortArray'])) {
            print_r($_SESSION['sortArray']);
        }
        session_destroy();
        ?>
    </div>
</div>
</body>
</html>
