<?php
if (stristr($_SERVER["PHP_SELF"], "functions.php")) {
    header("Location:../index.php");
}

/* --- Task 1 --- */

function sumElements() {
    $minNum = -1000;
    $maxNum = 1000;
    $sum = 0;

    while ($minNum <= $maxNum) {
        $sum += $minNum;
        $minNum++;
    }
    return $sum;
}

$sum = sumElements();

/* --- Task 2 --- */

function sumElements237() {
    $minNum = -1000;
    $maxNum = 1000;
    $sum237 = 0;

    while ($minNum <= $maxNum) {
        $minNumLastDigit = abs($minNum) % 10;
        if ($minNumLastDigit === 2 || $minNumLastDigit === 3 || $minNumLastDigit === 7) {
            $sum237 += $minNum;
        }
        $minNum++;
    }
    return $sum237;
}

$sum237 = sumElements237();

/* --- Task 3 --- */

function createStar() {
    define("ELEMENTS", 50);
    $star = "";
    for ($row = 1; $row <= ELEMENTS; $row++) {
        for ($column = 1; $column <= $row; $column++) {
            $star .= "*";
        }
        $star .= "<br>";
    }
    return $star;
}

$star = createStar();

/* --- Task 4 --- */

function paintChess() {
    $rows = $_POST["chess-number-row"];
    $columns = $_POST["chess-number-column"];

    if (!ctype_digit($rows) || !ctype_digit($columns)) {
        return "Your data must be positive integer";
    }

    define("MINVALUE", 1);
    define("MAXVALUE", 100);

    if ($rows > MAXVALUE || $columns > MAXVALUE || $rows < MINVALUE || $columns < MINVALUE) {
        return "Your data may be from 1 to 100";
    }

    $result = "";
    while ($rows > 0) {
        $result .= "<div>";
        $rows--;

        for ($j = 0; $j < $columns; $j++) {
            if (($j + $rows) % 2 === 0) {
                $result .= "<div style='background-color: black '></div>";
            }
            else {
                $result .= "<div style='background-color: white '></div>";
            }
        }
        $result .= "</div>";
    }
    return $result;
}

/* --- Task 5 --- */

function digitSum() {
	$digitSum = (string)abs($_POST["user-number"]);

    if (!ctype_digit($digitSum)) {
        return "Your data must be integer";
    }

    $digitSumArr = str_split($digitSum);
    return array_sum($digitSumArr);
}

/* --- Task 6 --- */

function createRandomArr() {
    $randomArr = [];

    for ($i = 0; $i < 100; $i++) {
        $randomArr[] = rand(1, 10);
    }

    $uniqRandomArr = array_unique($randomArr);
    arsort($uniqRandomArr);

    return $uniqRandomArr;
}

$uniqRandomArr = createRandomArr();