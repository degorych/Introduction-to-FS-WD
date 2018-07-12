<?php
session_start();

if (isset($_POST['task'])) {
    $taskValue = $_POST['task'];
    switch ($taskValue) {
        case 'sum':
            $_SESSION[$taskValue] = sumElements();
            break;
        case 'sum237':
            $_SESSION[$taskValue] = sumElements([2, 3, 7]);
            break;
        case 'star':
            $_SESSION[$taskValue] = createStar();
            break;
        case 'paintChess':
            $_SESSION[$taskValue] = paintChess();
            break;
        case 'digitSum':
            $_SESSION[$taskValue] = digitSum();
            break;
        case 'sortArray':
            $_SESSION[$taskValue] = createRandomArr();
            break;
    }
}
header('Location:../index.php#'.$taskValue);

/* --- Task 1, 2 --- */

function sumElements($elements = [])
{
    $sum = 0;

    for ($i = -1000; $i >= 1000; $i++) {
        if (empty($elements)) {
            $sum += $i;
            continue;
        }
        if (in_array(abs($i) % 10, $elements)) {
            $sum += $i;
        };
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
    for (; $rows > 0; $rows--) {
        $result .= '<div>';

        for ($j = 0; $j < $columns; $j++) {
            $color = (($j + $rows) % 2 === 0) ? 'black' : 'white';
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
