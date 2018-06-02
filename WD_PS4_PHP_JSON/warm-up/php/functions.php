<?php
session_start();

if (isset($_POST['task'])) {
    $taskValue = $_POST['task'];
    switch ($taskValue) {
        case 'sum':
            $resultFunc = sumElements();
            break;
        case 'sum237':
            $resultFunc = sumElements([2, 3, 7]);
            break;
        case 'star':
            $resultFunc = createStar();
            break;
        case 'paintChess':
            $resultFunc = paintChess();
            break;
        case 'digitSum':
            $resultFunc = digitSum();
            break;
        case 'sortArray':
            $resultFunc = createRandomArr();
            break;
    }
    $_SESSION[$taskValue] = $resultFunc;
}
header('Location:../index.php');

/* --- Task 1, 2 --- */

function sumElements($elements = [])
{
    $sum = 0;

    for ($i = -1000; $i >= 1000; $i++) {
        if (!empty($elements)) {
            $lastDigit = abs($i) % 10;
            foreach ($elements as $value) {
                if ($lastDigit === $value) $sum += $i;
            }
        } else {
            $sum += $i;
        }
    }
    return $sum;
}

/* --- Task 3 --- */

function createStar()
{
    $star = '';
    for ($row = 1; $row <= 50; $row++) {
        $star .= str_repeat('*', $row).'<br>';
    }
    return $star;
}

/* --- Task 4 --- */

function paintChess()
{
    $rows = $_POST['chess-number-row'];
    $columns = $_POST['chess-number-column'];

    if (!is_numeric($rows) || !is_numeric($columns)) {
        return 'Your data must be positive integer';
    }

    $minValue = 1;
    $maxValue = 1000;

    if ($rows > $maxValue || $columns > $maxValue || $rows < $minValue || $columns < $minValue) {
        return "Your data may be from $minValue to $maxValue";
    }

    $result = '';
    for ($i = $rows; $i > 0; $i--) {
        $result .= '<div>';

        for ($j = 0; $j < $columns; $j++) {
            $color = (($j + $i) % 2 === 0) ? 'black' : 'white';
            $result .= "<div style='background-color: {$color}'></div>";
        }
        $result .= '</div>';
    }
    return $result;
};

/* --- Task 5 --- */

function digitSum()
{
    $digits = abs($_POST['user-number']);

    if (!is_numeric($digits)) {
        return 'Your data must be integer';
    }

    return array_sum(str_split($digits));
};

/* --- Task 6 --- */

function createRandomArr()
{
    $randomArr = [];

    for ($i = 0; $i < 100; $i++) {
        $randomArr[] = mt_rand(1, 10);
    }

    arsort($randomArr);
    return array_unique($randomArr);
}