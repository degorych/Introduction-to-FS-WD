const errorArray = [
    ["Your data may be integer"],
    ["Enter number from -1000 to 1000"],
    ["Enter number from 0 to 1000"],
    ["Your number can not be negative"],
    ["Your date may be in 'October 13, 2014 11:13:00' format"],
    ["Invalid Date"],
    ["Your date may be in '2018-03-27' format"],
    ["This apartment does not exist"],
    ["Your data may be number from 1"],
    ["Enter number from 0 to 100"]
];

function checkToNumber(value) {
    if (value.split("").indexOf(".") !== -1 || value.split("").indexOf(",") !== -1) { // Check to float
        return false;
    }
    return !isNaN(parseFloat(value)) && isFinite(value);
}

function checkToLimit(value, minValue, maxValue) {
    if (value > maxValue || value < minValue) {
        return false;
    }
    return true;
}

/* --- Select word for number --- */
function addWordToDate(value, wordsArray) {
    if (("0" + value).slice(-2, -1) === "1") {
        return value + wordsArray[0];
    }

    if (value % 10 === 1) {
        return value + wordsArray[1];
    }

    else if (value % 10 === 2 || value % 10 === 3 || value % 10 === 4) {
        return value + wordsArray[2];
    }

    else  {
        return value + wordsArray[0];
    }
}

function checkToFormat(value, regexp) {
    return regexp.test(value);
}

/*--- Task 1, Task 2 ---*/

function sumNumbers() {
    let minNum = document.getElementById("minNum").value;
    let maxNum = document.getElementById("maxNum").value;

    let sumElement = document.getElementById("sum");
    let sumElement237 = document.getElementById("sum-2-3-7");

    if (!checkToNumber(minNum) || !checkToNumber(maxNum)) {
        sumElement.innerText = sumElement237.innerText = errorArray[0];
        return;
    }

    minNum = parseInt(minNum);
    maxNum = parseInt(maxNum);

    if (!checkToLimit(minNum, -1000, 1000) || !checkToLimit(maxNum, -1000, 1000)) {
        sumElement.innerText = sumElement237.innerText = errorArray[1];
        return;
    }

    let result = 0;
    let result237 = 0;

    maxNum = (minNum > maxNum) ? [minNum, minNum = maxNum][0] : maxNum; // Swap numbers

    while (minNum <= maxNum) {
        result += minNum;
        if (Math.abs(minNum) % 10 === 2 || Math.abs(minNum) % 10 === 3 || Math.abs(minNum) % 10 === 7) {
            result237 += minNum;
        }
        minNum++;
    }

    sumElement.innerText = `${result}`;
    sumElement237.innerText = `${result237}`;
}

/* --- Task 3 ---*/

function createStarImg() {
    let starElement = document.getElementById("star-img");
    starElement.innerHTML = "";
    let numberOfStars = document.getElementById("number-of-stars").value;

    if (!checkToNumber(numberOfStars)) {
        starElement.innerText = errorArray[0];
        return;
    }

    numberOfStars = parseInt(numberOfStars);

    if (!checkToLimit(numberOfStars, 0, 1000)) {
        starElement.innerText = errorArray[2];
        return;
    }

    for (let starRow = 1; numberOfStars > 0; starRow++) {
        let resultString = "";
        for (let starNumInRow = 1; starNumInRow <= starRow && numberOfStars > 0; starNumInRow++, numberOfStars--) {
            resultString += "*";
        }
        let div = document.createElement("div");
        div.innerText = resultString;
        starElement.appendChild(div);
    }
}

/*--- Task 4 ---*/

function secondToHours() {
    let second = document.getElementById("user-sec").value;
    let timeElement = document.getElementById("sec-to-hours");
    let timeArray = ["hours","minutes","seconds"];

    if (!checkToNumber(second)) {
        timeElement.innerText = errorArray[0];
        return;
    }

    if (second < 0) {
        timeElement.innerText = errorArray[3];
        return;
    }

    timeElement.innerText = timeArray.map(function (value, i) {
        let timeCounter = (3600/Math.pow(60, i));
        let time = second/timeCounter;
        second %= timeCounter;

        if (time < 10) {
            return `0${Math.floor(time)}`;
        }
        else {
            return `${Math.floor(time)}`;
        }
    }).join(":");
}

/*--- Task 5 ---*/

function getStudentsYear() {
    let studentYear = document.getElementById("student-year").value;
    let studentYearElement = document.getElementById("student-year-string");

    if (!checkToNumber(studentYear)) {
        studentYearElement.innerText = errorArray[0];
        return;
    }

    if (studentYear < 0) {
        studentYearElement.innerText = errorArray[3];
        return;
    }

    let wordsArray = [" лет ", " год ", " года "];
    studentYearElement.innerText = addWordToDate(parseInt(studentYear), wordsArray);
}

/* --- Task 6 --- */

function getTimeBetweenDates() {
    let timeBetweenDatesElement = document.getElementById("time-between-dates");

    let firstDate = document.getElementById("1data").value;
    let secondDate = document.getElementById("2data").value;
	
	const regexp = /^\w{3,9}\s\d{1,2},\s\d{1,4}\s\d{2}:\d{2}:\d{2}$/;
	if (!checkToFormat(firstDate, regexp) || !checkToFormat(secondDate, regexp)) {
        timeBetweenDatesElement.innerText = errorArray[4];
	    return;
    }

    let fDate = new Date(Date.parse(firstDate));
    let sDate = new Date(Date.parse(secondDate));

	if (fDate == "Invalid Date" || sDate == "Invalid Date") {
        timeBetweenDatesElement.innerText = errorArray[5];
		return;
	}

    sDate = (fDate > sDate) ? [fDate, fDate = sDate][0] : sDate; // Swap dates

    // Get difference between dates in date format
    sDate.setSeconds(sDate.getSeconds()-fDate.getSeconds());
    sDate.setMinutes(sDate.getMinutes()-fDate.getMinutes());
    sDate.setHours(sDate.getHours()-fDate.getHours());
    sDate.setDate(sDate.getDate()-fDate.getDate());
    sDate.setMonth(sDate.getMonth()-fDate.getMonth());
    sDate.setFullYear(sDate.getFullYear()-fDate.getFullYear());

    sDate.setMinutes(sDate.getMinutes() + (sDate.getTimezoneOffset())*(-1)); // Convert to  UTC timezone.

    let timeBetweenDates = sDate.toISOString().split(/[\s-T.:/]+/);// Get array with comfortable structure to output
    timeBetweenDates[1] -= 1; // In ISO view mount contain from 1 to 12 values.

    const dateText = [
        [" лет, ", " год, ", " года, "],
        [" месяцев, ", " месяц, ", " месяца, "],
        [" дней, ", " день, ", " дня, "],
        [" часов, ", " час, ", " часа, "],
        [" минут, ", " минута, ", " минуты, "],
        [" секунд ", " секунда ", " секунды "]
    ];

    // Output result
    timeBetweenDatesElement.innerText = dateText.reduce(function (resultString, value, i) {
        return resultString + addWordToDate(parseInt(timeBetweenDates[i]), value);
    }, "");
}

/* --- Task 7 --- */

function zodiac() {
    const zodiacArr = [
        ["2000-01-20", "2000-02-18", 9810, "Водолей"],
        ["2000-02-19", "2000-03-20", 9811, "Рыбы"],
        ["2000-03-21", "2000-04-19", 9800, "Овен"],
        ["2000-04-20", "2000-05-20", 9801, "Телец"],
        ["2000-05-21", "2000-06-20", 9802, "Близнецы"],
        ["2000-06-21", "2000-07-22", 9803, "Рак"],
        ["2000-07-23", "2000-08-22", 9804, "Лев"],
        ["2000-08-23", "2000-09-22", 9805, "Дева"],
        ["2000-09-23", "2000-10-22", 9806, "Весы"],
        ["2000-10-23", "2000-11-21", 9807, "Скорпион"],
        ["2000-11-22", "2000-12-21", 9808, "Стрелец"],
        ["2000-12-22", "2001-01-19", 9809, "Козерог"]
    ];

    let userDate = document.getElementById("zodiac-date").value;
    let zodiacTitleElement = document.getElementById("user-zodiac");
	
    const regexp = /^\d{4}-\d{2}-\d{2}$/;

    // Check getUserDate to yyyy-mm-dd format
    if (!checkToFormat(userDate, regexp)) {
        zodiacTitleElement.innerText = errorArray[6];
        return;
    }

    // Check to correct date
    let createUserDate = new Date(userDate);
    let userDateArr = userDate.split("-");
	
    if (parseInt(userDateArr[1]) !== createUserDate.getMonth() + 1) {
        zodiacTitleElement.innerText = errorArray[5];
        return;
    }

    userDate = userDate.replace(/\d+/, 2000);

    for (let i = 0; i < 12; i++) {
        if (userDate >= zodiacArr[i][0] && userDate <= zodiacArr[i][1]) {
            zodiacTitleElement.innerText = `${String.fromCharCode(zodiacArr[i][2])} ${zodiacArr[i][3]}`;
        }
    }
}

/* --- Task 8 --- */

function chessPaint() {
    let chessBoardElement = document.getElementById("chess-board");
    let chessNumberRow = document.getElementById("chess-number-row").value;
    let chessNumberColumn = document.getElementById("chess-number-column").value;

    chessBoardElement.innerHTML = "";

    // Get max width our chess board and create default width and height for chess cell
    let chessBoardMaxWidth = chessBoardElement.clientWidth;
    let chessCellWidthAndHeight = "50px";

    // Calculate actual size for chess cells
    if (chessBoardMaxWidth / chessNumberColumn < 50) {
        chessCellWidthAndHeight = `${chessBoardMaxWidth / chessNumberColumn}px`;
    }

    // Check user data to integer
    if (!checkToNumber(chessNumberRow) || !checkToNumber(chessNumberColumn)) {
        chessBoardElement.innerText = errorArray[0];
        return;
    }

    // Check user data to limits
    if (!checkToLimit(chessNumberRow, 0, 100) || !checkToLimit(chessNumberColumn, 0, 100)) {
        chessBoardElement.innerText = errorArray[9];
        return;
    }

    // Paint chess board
    while (chessNumberRow > 0) { // Paint rows
        let newRow = document.createElement("div");
        chessBoardElement.appendChild(newRow);
        chessNumberRow--;

        for (let i = 0; i < chessNumberColumn; i++) { // Paint columns
            let newColumn = document.createElement("div");
            if ((i + chessNumberRow) % 2 === 0) { // Select color for chess cells
                newColumn.style.backgroundColor = "black";
            }
            else {
                newColumn.style.backgroundColor = "white";
            }
            newColumn.style.width = newColumn.style.height = chessCellWidthAndHeight;
            newRow.appendChild(newColumn);
        }
    }
}

/* --- Task 9 --- */

function countFloorsAndEntrances() {
    let floors = document.getElementById("number-floors").value;
    let apartments = document.getElementById("number-apartments").value;
    let entrances = document.getElementById("number-entrances").value;
    let userApartment = document.getElementById("user-apartments").value;
    let floorAndEntranceElement = document.getElementById("apartments-to-floors-and-entrances");
    let maxApartmentsNumber = entrances * floors * apartments;

    if (!checkToNumber(floors) || !checkToNumber(apartments) || !checkToNumber(entrances) || !checkToNumber(userApartment)) {
        floorAndEntranceElement.innerText = errorArray[8];
        return;
    }

    if (!checkToLimit(floors, 1, maxApartmentsNumber) || !checkToLimit(apartments, 1, maxApartmentsNumber) || !checkToLimit(entrances, 1, maxApartmentsNumber)) {
        floorAndEntranceElement.innerText = errorArray[8];
        return;
    }

    if (!checkToLimit(userApartment, 1, maxApartmentsNumber)) {
        floorAndEntranceElement.innerText = errorArray[7];
        return;
    }

    let numberOfEntrances = Math.ceil(userApartment / (floors * apartments)); // Get entrance

    while (userApartment > (floors * apartments)) {
        userApartment -= (floors * apartments);
    }
    let numberOfFloors = Math.ceil(userApartment / apartments); // Get floor

    floorAndEntranceElement.innerText = `Подъезд: ${numberOfEntrances}, этаж: ${numberOfFloors}`
}

/* --- Task 10 --- */

function countNumberDigits() {
    let userNumber = document.getElementById("user-number").value;
    let numberDigitsSumElement = document.getElementById("digit-sum");

    if (!checkToNumber(userNumber)) {
        numberDigitsSumElement.innerText = errorArray[0];
        return;
    }

    userNumber = (userNumber < 0) ? userNumber * (-1) : userNumber;

    let digitSum = userNumber.toString().split("").reduce(function(sum, item) {
        return sum + parseInt(item);
    },0);

    numberDigitsSumElement.innerText = `Сумма чисел: ${digitSum}`;
}

/* --- Task 11 --- */

function formatLinks() {
    let linksListElement = document.getElementById("links-list");
    linksListElement.innerHTML = "";
    let links = document.getElementById("links").value
        .split(/[\s,]/)
        .map(value => value.replace(/^https?:\/\//, ""))
        .filter(value => !!value)
        .sort(function(a,b){return a > b})
        .forEach(function (value) {
            let li = document.createElement("li");
            let a = document.createElement("a");
            a.textContent = a.href = value;
            li.appendChild(a);
            linksListElement.appendChild(li);
        });
}