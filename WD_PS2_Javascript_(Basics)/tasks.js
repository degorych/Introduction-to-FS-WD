const errorMessage = {
    notInteger: "Your data may be integer",
    outOfRange_1000_1000: "Enter number from -1000 to 1000",
    outOfRange_0_1000: "Enter number from 0 to 1000",
    negative: "Your number can not be negative",
    normalDataFormat: "Your date may be in 'October 13, 2014 11:13:00' format",
    invalidDate: "Invalid Date",
    isoDataFormat: "Your date may be in '2018-03-27' format",
    apartmentDNExist:"This apartment does not exist",
    outOfRange_1: "Your data may be number from 1",
    outOfRange_0_100: "Enter number from 0 to 100"
};

/* --- Do nothing if user press "enter", when inputs in focus --- */
const inputElements = document.getElementsByTagName("input");
const inputElementsLens = inputElements.length;

for (let i = 0; i < inputElementsLens; i++) {
    inputElements[i].addEventListener("keypress", function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
        }
    });
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

    const sumElement = document.getElementById("sum");
    const sumElement237 = document.getElementById("sum-2-3-7");

    if (!Number.isInteger(parseFloat(minNum)) || !Number.isInteger(parseFloat(maxNum))) {
        return sumElement.innerText = sumElement237.innerText = errorMessage.notInteger;
    }

    minNum = parseInt(minNum);
    maxNum = parseInt(maxNum);

    if (!checkToLimit(minNum, -1000, 1000) || !checkToLimit(maxNum, -1000, 1000)) {
        return sumElement.innerText = sumElement237.innerText = errorMessage.outOfRange_1000_1000;
    }

    let result = 0;
    let result237 = 0;

    [maxNum, minNum] = (minNum > maxNum) ? [minNum, maxNum] : [maxNum, minNum]; // Swap numbers

    while (minNum <= maxNum) {
        result += minNum;
        let minNumLastDigit = Math.abs(minNum) % 10;
        if (minNumLastDigit === 2 || minNumLastDigit === 3 || minNumLastDigit % 10 === 7) {
            result237 += minNum;
        }
        minNum++;
    }

    sumElement.innerText = result.toString();
    sumElement237.innerText = result237.toString();
}

/* --- Task 3 ---*/

function createStarImg() {
    const starElement = document.getElementById("star-img");
    let numberOfStars = document.getElementById("number-of-stars").value;
    starElement.innerHTML = "";

    if (!Number.isInteger(parseFloat(numberOfStars))) {
        return starElement.innerText = errorMessage.notInteger;
    }

    numberOfStars = parseInt(numberOfStars);

    if (!checkToLimit(numberOfStars, 0, 1000)) {
        return starElement.innerText = errorMessage.outOfRange_0_1000;
    }

    let starConstruction = "";
    for (let starRow = 1; numberOfStars > 0; starRow++) {
        for (let starNumInRow = 1; starNumInRow <= starRow && numberOfStars > 0; starNumInRow++, numberOfStars--) {
            starConstruction += "*";
        }
        starConstruction += "<br>";
    }

    starElement.innerHTML = starConstruction;
}

/*--- Task 4 ---*/

function secondToHours() {
    let second = document.getElementById("user-sec").value;
    const timeElement = document.getElementById("sec-to-hours");
    let timeArray = ["hours","minutes","seconds"];

    if (!Number.isInteger(parseFloat(second))) {
        return timeElement.innerText = errorMessage.notInteger;
    }

    if (second < 0) {
        return timeElement.innerText = errorMessage.negative;
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
    const studentYearElement = document.getElementById("student-year-string");

    if (!Number.isInteger(parseFloat(studentYear))) {
        return studentYearElement.innerText = errorMessage.notInteger;
    }

    if (studentYear < 0) {
        return studentYearElement.innerText = errorMessage.negative;
    }

    const wordsArray = [" лет ", " год ", " года "];
    studentYearElement.innerText = addWordToDate(parseInt(studentYear), wordsArray);
}

/* --- Task 6 --- */

function getTimeBetweenDates() {
    const timeBetweenDatesElement = document.getElementById("time-between-dates");

    const firstDate = document.getElementById("1data").value;
    const secondDate = document.getElementById("2data").value;
	
	const regexp = /^\w{3,9}\s\d{1,2},\s\d{1,4}\s\d{2}:\d{2}:\d{2}$/;
	if (!checkToFormat(firstDate, regexp) || !checkToFormat(secondDate, regexp)) {
	    return timeBetweenDatesElement.innerText = errorMessage.normalDataFormat;
    }

    let fDate = new Date(Date.parse(firstDate));
    let sDate = new Date(Date.parse(secondDate));

	if (isNaN(fDate) || isNaN(sDate)) {
		return timeBetweenDatesElement.innerText = errorMessage.invalidDate;
	}

    [sDate, fDate] = (fDate > sDate) ? [fDate, sDate] : [sDate, fDate]; // Swap dates

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
    const zodiacTitleElement = document.getElementById("user-zodiac");
	
    const regexp = /^\d{4}-\d{2}-\d{2}$/;

    // Check getUserDate to yyyy-mm-dd format
    if (!checkToFormat(userDate, regexp)) {
        return zodiacTitleElement.innerText = errorMessage.isoDataFormat;
    }

    // Check to correct date
    let createUserDate = new Date(userDate);
    let userDateArr = userDate.split("-");
	
    if (parseInt(userDateArr[1]) !== createUserDate.getMonth() + 1) {
        return zodiacTitleElement.innerText = errorMessage.invalidDate;
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
    const chessBoardElement = document.getElementById("chess-board");
    let chessNumberRow = document.getElementById("chess-number-row").value;
    let chessNumberColumn = document.getElementById("chess-number-column").value;

    chessBoardElement.innerHTML = "";

    // Check user data to integer
    if (!Number.isInteger(parseFloat(chessNumberRow)) || !Number.isInteger(parseFloat(chessNumberColumn))) {
        return chessBoardElement.innerText = errorMessage.notInteger;
    }

    // Check user data to limits
    if (!checkToLimit(chessNumberRow, 0, 100) || !checkToLimit(chessNumberColumn, 0, 100)) {
        return chessBoardElement.innerText = errorMessage.outOfRange_0_100;
    }

    // Get max width our chess board and create default width and height for chess cell
    const chessBoardMaxWidth = chessBoardElement.clientWidth;
    const chessCellWidth = chessBoardMaxWidth / chessNumberColumn;
    const chessCellSize = (chessCellWidth < 50) ? `${chessCellWidth}px` : "50px";

    // Paint chess board
    let chessBoardString = "";

    while (chessNumberRow > 0) { // Paint rows
        chessBoardString += "<div>";
        chessNumberRow--;

        for (let i = 0; i < chessNumberColumn; i++) { // Paint columns
            if ((i + chessNumberRow) % 2 === 0) { // Select color for chess cells
                chessBoardString += `<div style="background-color: black; width: ${chessCellSize}; height: ${chessCellSize}"></div>`;
            }
            else {
                chessBoardString += `<div style="background-color: white; width: ${chessCellSize}; height: ${chessCellSize}"></div>`;
            }
        }
        chessBoardString += "</div>";
    }
    chessBoardElement.innerHTML = chessBoardString;
}

/* --- Task 9 --- */

function countFloorsAndEntrances() {
    const floors = document.getElementById("number-floors").value;
    const apartments = document.getElementById("number-apartments").value;
    const entrances = document.getElementById("number-entrances").value;
    let userApartment = document.getElementById("user-apartments").value;
    const floorAndEntranceElement = document.getElementById("apartments-to-floors-and-entrances");
    const maxApartmentsNumber = entrances * floors * apartments;

    if (!Number.isInteger(parseFloat(floors)) || !Number.isInteger(parseFloat(apartments)) || !Number.isInteger(parseFloat(entrances)) || !Number.isInteger(parseFloat(userApartment))) {
        return floorAndEntranceElement.innerText = errorMessage.notInteger;
    }

    if (!checkToLimit(floors, 1, maxApartmentsNumber) || !checkToLimit(apartments, 1, maxApartmentsNumber) || !checkToLimit(entrances, 1, maxApartmentsNumber)) {
        return floorAndEntranceElement.innerText = errorMessage.outOfRange_1;
    }

    if (!checkToLimit(userApartment, 1, maxApartmentsNumber)) {
        return floorAndEntranceElement.innerText = errorMessage.apartmentDNExist;
    }

    const apartmentInEntrance = floors * apartments;
    const numberOfEntrances = Math.ceil(userApartment / apartmentInEntrance); // Get entrance

    while (userApartment > apartmentInEntrance) {
        userApartment -= apartmentInEntrance;
    }
    const numberOfFloors = Math.ceil(userApartment / apartments); // Get floor

    floorAndEntranceElement.innerText = `Подъезд: ${numberOfEntrances}, этаж: ${numberOfFloors}`
}

/* --- Task 10 --- */

function countNumberDigits() {
    let userNumber = document.getElementById("user-number").value;
    let numberDigitsSumElement = document.getElementById("digit-sum");

    if (!Number.isInteger(parseFloat(userNumber))) {
        return numberDigitsSumElement.innerText = errorMessage.notInteger;
    }

    userNumber = Math.abs(userNumber);

    const digitSum = userNumber.toString().split("").reduce((sum, item) => sum + parseInt(item), 0);

    numberDigitsSumElement.innerText = `Сумма чисел: ${digitSum}`;
}

/* --- Task 11 --- */

function formatLinks() {
    const linksListElement = document.getElementById("links-list");
    const linksTempContainer = document.createDocumentFragment();
    linksListElement.innerHTML = "";

    const links = document.getElementById("links").value
        .split(/[\s,]/)
        .filter(value => !!value)
        .map(value => value.replace(/^https?:\/\//, ""))
        .sort((a, b) => (a > b))
        .forEach(function (value) {
            let li = document.createElement("li");
            let a = document.createElement("a");
            a.textContent = value;
            a.href = `//${value}`;
            li.appendChild(a);
            linksTempContainer.appendChild(li);
        });
    linksListElement.appendChild(linksTempContainer);
}