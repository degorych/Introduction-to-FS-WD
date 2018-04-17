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

/* --- Do nothing if user press "enter", when inputs in focus --- */
let inputElements = document.getElementsByTagName("input");
let inputElementsLens = inputElements.length;

for (let i = 0; i < inputElementsLens; i++) {
    inputElements[i].addEventListener("keypress", function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
        }
    });
}

/* --- Check data to integer --- */
function isInteger(value) {
    const isNumber = value => !isNaN(parseFloat(value)) && isFinite(value);
    const isNotFloat = value => (value.split("").indexOf(".") < 0) && (value.split("").indexOf(",") < 0);
    return isNumber(value) && isNotFloat(value);
}

/* --- Check data to consist in interval from  minValue to maxValue --- */
const checkToLimit = (value, minValue, maxValue) => (value <= maxValue) && (value >= minValue);

/* --- Select word for number --- */
function addWordToDate(value, wordsArray) {
    let lastDigit = value % 10;
    if (("0" + value).slice(-2, -1) === "1") {
        return value + wordsArray[0];
    }

    if (lastDigit === 1) {
        return value + wordsArray[1];
    }

    else if (lastDigit === 2 || lastDigit === 3 || lastDigit === 4) {
        return value + wordsArray[2];
    }

    else  {
        return value + wordsArray[0];
    }
}

/* --- Check data for correct input --- */
const checkToFormat = (value, regexp) => regexp.test(value);

/*--- Task 1, Task 2 ---*/

function sumNumbers() {
    let minNum = document.getElementById("minNum").value;
    let maxNum = document.getElementById("maxNum").value;

    let sumElement = document.getElementById("sum");
    let sumElement237 = document.getElementById("sum-2-3-7");

    if (!isInteger(minNum) || !isInteger(maxNum)) {
        return sumElement.innerText = sumElement237.innerText = errorArray[0];
    }

    minNum = parseInt(minNum);
    maxNum = parseInt(maxNum);

    if (!checkToLimit(minNum, -1000, 1000) || !checkToLimit(maxNum, -1000, 1000)) {
        return sumElement.innerText = sumElement237.innerText = errorArray[1];
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
    let numberOfStars = document.getElementById("number-of-stars").value;
    starElement.innerHTML = "";

    if (!isInteger(numberOfStars)) {
        return starElement.innerText = errorArray[0];
    }

    numberOfStars = parseInt(numberOfStars);

    if (!checkToLimit(numberOfStars, 0, 1000)) {
        return starElement.innerText = errorArray[2];
    }

    let starConstruction = document.createDocumentFragment();
    for (let starRow = 1; numberOfStars > 0; starRow++) {
        let resultString = "";
        for (let starNumInRow = 1; starNumInRow <= starRow && numberOfStars > 0; starNumInRow++, numberOfStars--) {
            resultString += "*";
        }
        let div = document.createElement("div");
        div.innerText = resultString;
        starConstruction.appendChild(div);
    }

    starElement.appendChild(starConstruction);
}

/*--- Task 4 ---*/

function secondToHours() {
    let second = document.getElementById("user-sec").value;
    let timeElement = document.getElementById("sec-to-hours");
    let timeArray = ["hours","minutes","seconds"];

    if (!isInteger(second)) {
        return timeElement.innerText = errorArray[0];
    }

    if (second < 0) {
        return timeElement.innerText = errorArray[3];
    }

    timeElement.innerText = timeArray.map(function (value, i) {
        let timeCounter = (3600 / Math.pow(60, i));
        let time = second / timeCounter;
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

    if (!isInteger(studentYear)) {
        return studentYearElement.innerText = errorArray[0];
    }

    if (studentYear < 0) {
        return studentYearElement.innerText = errorArray[3];
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
	    return timeBetweenDatesElement.innerText = errorArray[4];
    }

    let fDate = new Date(Date.parse(firstDate));
    let sDate = new Date(Date.parse(secondDate));

	if (isNaN(fDate) || isNaN(sDate)) {
		return timeBetweenDatesElement.innerText = errorArray[5];
	}

    sDate = (fDate > sDate) ? [fDate, fDate = sDate][0] : sDate; // Swap dates

    // Get difference between dates in date format
    sDate.setSeconds(sDate.getSeconds() - fDate.getSeconds());
    sDate.setMinutes(sDate.getMinutes() - fDate.getMinutes());
    sDate.setHours(sDate.getHours() - fDate.getHours());
    sDate.setDate((sDate.getDate() - fDate.getDate() === 0) ? 1 : (sDate.getDate() - fDate.getDate() + 1));
    sDate.setMonth(sDate.getMonth() - fDate.getMonth());
    sDate.setFullYear(sDate.getFullYear() - fDate.getFullYear());

    sDate.setMinutes(sDate.getMinutes() + (sDate.getTimezoneOffset()) * (-1)); // Convert to  UTC timezone.

    let timeBetweenDates = sDate.toISOString().split(/[\s-T.:/]+/);// Get array with comfortable structure to output
    timeBetweenDates[1] -= 1; // In ISO view mount contain from 1 to 12 values.
    timeBetweenDates[2] -= 1; // In Date Obj day can not be 0

    const dateText = [
        [" лет, ", " год, ", " года, "],
        [" месяцев, ", " месяц, ", " месяца, "],
        [" дней, ", " день, ", " дня, "],
        [" часов, ", " час, ", " часа, "],
        [" минут, ", " минута, ", " минуты, "],
        [" секунд ", " секунда ", " секунды "]
    ];

    // Output result
    timeBetweenDatesElement.innerText = dateText.reduce((resultString, value, i) => resultString + addWordToDate(parseInt(timeBetweenDates[i]), value), "");
}

/* --- Task 7 --- */

function zodiac() {
    const zodiacArr = [
        // 9800 - 9811 zodiac symbols in unicode
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
        return zodiacTitleElement.innerText = errorArray[6];
    }

    // Check to correct date
    let createUserDate = new Date(userDate);
    let userDateArr = userDate.split("-");
	
    if (parseInt(userDateArr[1]) !== createUserDate.getMonth() + 1) {
        return zodiacTitleElement.innerText = errorArray[5];
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

    // Check user data to integer
    if (!isInteger(chessNumberRow) || !isInteger(chessNumberColumn)) {
        return chessBoardElement.innerText = errorArray[0];
    }

    // Check user data to limits
    if (!checkToLimit(chessNumberRow, 0, 100) || !checkToLimit(chessNumberColumn, 0, 100)) {
        return chessBoardElement.innerText = errorArray[9];
    }

    // Get max width our chess board and create default width and height for chess cell
    let chessBoardMaxWidth = chessBoardElement.clientWidth;
    let chessCellWidth = chessBoardMaxWidth / chessNumberColumn;
    let chessCellSize = (chessCellWidth < 50) ? `${chessCellWidth}px` : "50px";

    // Paint chess board
    let chessBoardPaintElement = document.createDocumentFragment();

    while (chessNumberRow > 0) { // Paint rows
        let newRow = document.createElement("div");
        chessBoardPaintElement.appendChild(newRow);
        chessNumberRow--;

        for (let i = 0; i < chessNumberColumn; i++) { // Paint columns
            let newColumn = document.createElement("div");
            if ((i + chessNumberRow) % 2 === 0) { // Select color for chess cells
                newColumn.style.backgroundColor = "black";
            }
            else {
                newColumn.style.backgroundColor = "white";
            }
            newColumn.style.width = newColumn.style.height = chessCellSize;
            newRow.appendChild(newColumn);
        }
    }
    chessBoardElement.appendChild(chessBoardPaintElement);
}

/* --- Task 9 --- */

function countFloorsAndEntrances() {
    let floors = document.getElementById("number-floors").value;
    let apartments = document.getElementById("number-apartments").value;
    let entrances = document.getElementById("number-entrances").value;
    let userApartment = document.getElementById("user-apartments").value;
    let floorAndEntranceElement = document.getElementById("apartments-to-floors-and-entrances");
    let maxApartmentsNumber = entrances * floors * apartments;

    if (!isInteger(floors) || !isInteger(apartments) || !isInteger(entrances) || !isInteger(userApartment)) {
        return floorAndEntranceElement.innerText = errorArray[8];
    }

    if (!checkToLimit(floors, 1, maxApartmentsNumber) || !checkToLimit(apartments, 1, maxApartmentsNumber) || !checkToLimit(entrances, 1, maxApartmentsNumber)) {
        return floorAndEntranceElement.innerText = errorArray[8];
    }

    if (!checkToLimit(userApartment, 1, maxApartmentsNumber)) {
        return floorAndEntranceElement.innerText = errorArray[7];
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

    if (!isInteger(userNumber)) {
        return numberDigitsSumElement.innerText = errorArray[0];
    }

    userNumber = (userNumber < 0) ? userNumber * (-1) : userNumber;

    let digitSum = userNumber.toString().split("").reduce((sum, item) => sum + parseInt(item), 0);

    numberDigitsSumElement.innerText = `Сумма чисел: ${digitSum}`;
}

/* --- Task 11 --- */

function formatLinks() {
    let linksListElement = document.getElementById("links-list");
    linksListElement.innerHTML = "";
    let links = document.getElementById("links").value
        .split(/[\s,]/)
        .filter(value => !!value);

    let linksTempContainer = document.createDocumentFragment();
    let linksText = links.map(value => value.replace(/^https?:\/\//, ""))
        .sort((a, b) => (a > b))
        .forEach(function (value) {
            let li = document.createElement("li");
            let a = document.createElement("a");
            a.textContent = value;
            let reg = new RegExp(value);

            links.forEach(function (linksValue) {
                let searchResult = linksValue.match(reg);
                if (searchResult !== null) {
                    a.href = searchResult.input;
                }
            });
            li.appendChild(a);
            linksTempContainer.appendChild(li);
        });

    linksListElement.appendChild(linksTempContainer);
}