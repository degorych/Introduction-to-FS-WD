/* --- Function for checking user data to valid value end limits --- */
function checkUserData(value, regex, upLimit, downLimit) {
    if (parseInt(value)<downLimit || parseInt(value)>upLimit) { // Check limits
        return "limitError";
    }

    if (value.toString().match(regex) != null) { // Check value to regexp's compatibility
        return 1;
    }

    else {
        return -1;
    }
}

/* --- Add text to date number function:
                dateValue - user date number,
                textArray - words array for number,
                innerId - function must insert result into this element id
 --- */
function getTextForDate(dateValue, textArray, innerId) {

    // for 10, 11, 12,...,19 and 110,...,119,...
    if (("0"+dateValue).slice(-2, -1) == 1) {
        document.getElementById(innerId).innerHTML += parseInt(dateValue)+textArray[0];
    }

    // for other
    else {
        document.getElementById(innerId).innerHTML += parseInt(dateValue)+textArray[parseInt(("0"+dateValue).slice(-1))];
    }
}

/*--- Task 1, Task 2 ---*/

function summa() {
    var minNum = document.getElementById("minNum").value;
    var maxNum = document.getElementById("maxNum").value;
    var regexp = /[^-?\d+]/;

    // Check minNum and maxNum to number
    if (checkUserData(minNum, regexp, 1000, -1000) == 1 || checkUserData(maxNum, regexp, 1000, -1000) == 1) {
        document.getElementById("summ").innerHTML = "Your data may by number";
        document.getElementById("summ-2-3-7").innerHTML = "Your data may by number";
        return;
    }
    // Check minNum and maxNum to limits
    if (checkUserData(minNum, regexp, 1000, -1000) == "limitError" || checkUserData(maxNum, regexp, 1000, -1000) == "limitError") {
        document.getElementById("summ").innerHTML = "Enter number from -1000 to 1000";
        document.getElementById("summ-2-3-7").innerHTML = "Enter number from -1000 to 1000";
        return;
    }

    minNum = parseInt(minNum);
    maxNum = parseInt(maxNum);

    if (minNum>maxNum) { // Swapping values
        var swap = minNum;
        minNum = maxNum;
        maxNum = swap;
    }

    var result = 0;
    var result237 = 0;

    for (minNum; minNum<=maxNum; minNum++) {
        result = result + minNum;
        if (minNum.toString().slice(-1) == 2 || minNum.toString().slice(-1) == 3 || minNum.toString().slice(-1) == 7) {
            result237 = result237 + minNum;
        }
    }

    document.getElementById("summ").value = result;
    document.getElementById("summ-2-3-7").value = result237;
}

/* --- Task 3 ---*/

function createStarImg() {
    document.getElementById("star-img").innerHTML = "";

    var i, j;
    var n = document.getElementById("number-of-stars").value;
    var regexp = /\D/;

    // Check n to number
    if (checkUserData(n, regexp, 100, 0) == 1) {
        document.getElementById("star-img").innerHTML = "Your data may by number";
        return;
    }
    // Check n to limits
    if (checkUserData(n, regexp, 100, 0) == "limitError") {
        document.getElementById("star-img").innerHTML = "Enter number from 0 to 100";
        return;
    }

    n = parseInt(n);

    for (i=1; n>0; i++) {
        for (j=1; j<=i && n>0; j++) {
            document.getElementById("star-img").innerHTML += "*";
            n--;
        }
        document.getElementById("star-img").innerHTML += "<br>";
    }
}

/*--- Task 4 ---*/

function colculateDate() {
    var secunda = document.getElementById("user-sec").value;
    var regexp = /\D/;

    // Check secunda to number
    if (checkUserData(secunda, regexp) == 1) {
        document.getElementById("sec-to-hours").innerHTML = "Your data may by positive number or 0";
        return;
    }

    secondToHours(secunda);
}

function secondToHours(numSec) {
    var date = new Date(2018, 1);
    var dateOptions = {
        hour: "numeric",
        minute: "numeric",
        second: "numeric"
    };

    date.setSeconds(numSec);

    if (date.getHours()<10) { // Add "0" if hours less then 10
        document.getElementById("sec-to-hours").innerHTML = "0"+date.toLocaleString("ru", dateOptions);
    }
    else {
        document.getElementById("sec-to-hours").innerHTML = date.toLocaleString("ru", dateOptions);
    }
}

/*--- Task 5 ---*/

function getStudentsYear() {
    var yearVariables = [" лет ", " год ", " года ", " года ", " года ", " лет ", " лет ", " лет ", " лет ", " лет "];
    var getStudentYear = document.getElementById("student-year").value;
    var regexp = /\D/;

    // Check getStudentYear to number
    if (checkUserData(getStudentYear, regexp) == 1) {
        document.getElementById("student-year-string").innerHTML = "Your data may by positive number or 0";
        return;
    }

    document.getElementById("student-year-string").innerHTML = "";

    getTextForDate(getStudentYear, yearVariables, "student-year-string"); // Add word in yearVariables to getStudentYear
}

/* --- Task 6 --- */

function getUserDate() {
    document.getElementById("time-between-dates").innerHTML = "";

    var fDate = new Date(Date.parse(document.getElementById("1data").value));
    var sDate = new Date(Date.parse(document.getElementById("2data").value));

    if (fDate>sDate) { // Swapping values
        var swap = fDate;
        fDate = sDate;
        sDate = swap;
    }

    // Get difference between dates in date format
    sDate.setSeconds(sDate.getSeconds()-fDate.getSeconds());
    sDate.setMinutes(sDate.getMinutes()-fDate.getMinutes());
    sDate.setHours(sDate.getHours()-fDate.getHours());
    sDate.setDate(sDate.getDate()-fDate.getDate());
    sDate.setMonth(sDate.getMonth()-fDate.getMonth());
    sDate.setFullYear(sDate.getFullYear()-fDate.getFullYear());

    sDate.setMinutes(sDate.getMinutes() + (sDate.getTimezoneOffset())*(-1)); // Convert to  UTC timezone.

    var timeBetweenDates = sDate.toISOString().split(/[\s-T.:/]+/); // Get array with comfortable structure to output
    timeBetweenDates[1] -= 1; // In ISO view mount contain from 1 to 12 values.

    var dateText = [
        [" лет ", " год ", " года ", " года ", " года ", " лет ", " лет ", " лет ", " лет ", " лет "],
        [" месяцев ", " месяц ", " месяца ", " месяца ", " месяца ", " месяцев ", " месяцев ", " месяцев ", " месяцев ", " месяцев "],
        [" дней ", " день ", " дня ", " дня ", " дня "," дней ", " дней ", " дней ", " дней ", " дней "],
        [" часов ", " час ", " часа ", " часа ", " часа ", " часов ", " часов ", " часов ", " часов ", " часов "],
        [" минут ", " минута ", " минуты ", " минуты ", " минуты ", " минут ", " минут ", " минут ", " минут ", " минут "],
        [" секунд ", " секунда ", " секунды ", " секунды ", " секунды ", " секунд ", " секунд ", " секунд ", " секунд ", " секунд "]
    ];

    // Output result
    var i;
    var dataTextLens = dateText.length;
    for (i=0; i<dataTextLens; i++) {
        getTextForDate(timeBetweenDates[i], dateText[i], "time-between-dates"); // Number from date + word from text arr
    }
}

/* --- Task 7 --- */

function zodiac() {
    var zodiacArr = [
        [new Date("2000-01-20"), new Date("2000-02-18"), "&#9810;", "Водолей"],
        [new Date("2000-02-19"), new Date("2000-03-20"), "&#9811;", "Рыбы"],
        [new Date("2000-03-21"), new Date("2000-04-19"), "&#9800;", "Овен"],
        [new Date("2000-04-20"), new Date("2000-05-20"), "&#9801;", "Телец"],
        [new Date("2000-05-21"), new Date("2000-06-20"), "&#9802;", "Близнецы"],
        [new Date("2000-06-21"), new Date("2000-07-22"), "&#9803;", "Рак"],
        [new Date("2000-07-23"), new Date("2000-08-22"), "&#9804;", "Лев"],
        [new Date("2000-08-23"), new Date("2000-09-22"), "&#9805;", "Дева"],
        [new Date("2000-09-23"), new Date("2000-10-22"), "&#9806;", "Весы"],
        [new Date("2000-10-23"), new Date("2000-11-21"), "&#9807;", "Скорпион"],
        [new Date("2000-11-22"), new Date("2000-12-21"), "&#9808;", "Стрелец"],
        [new Date("2000-12-22"), new Date("2001-01-19"), "&#9809;", "Козерог"]
    ];

    var getUserDate = document.getElementById("zodiac-date").value;
    var regexp = /^\d{4}-\d{2}-\d{2}$/;

    // Check getUserDate to yyyy-mm-dd format
    if (checkUserData(getUserDate, regexp) == -1) {
        document.getElementById("user-zodiac").innerHTML = "Your date may be in 2018-03-27 format";
        return;
    }

    var getUserDateArr = getUserDate.split("-"); // For check correct date

    var userDate = new Date(getUserDate);

    // Check to correct date
    if (getUserDateArr[1] != userDate.getMonth()+1) {
        document.getElementById("user-zodiac").innerHTML = "Enter correct date";
        return;
    }

    userDate.setFullYear(2000);

    if (userDate >= zodiacArr[userDate.getMonth()][0] && userDate <= zodiacArr[userDate.getMonth()][1]) {
        document.getElementById("user-zodiac").innerHTML = zodiacArr[userDate.getMonth()][2]+" "+zodiacArr[userDate.getMonth()][3];
    }

    else {
        document.getElementById("user-zodiac").innerHTML = zodiacArr[userDate.getMonth()-1][2]+" "+zodiacArr[userDate.getMonth()-1][3];
    }
}

/* --- Task 8 --- */

function chessPaint() {
    document.getElementById("chess-board").innerHTML = "";

    var chessSize = document.getElementById("chess-size").value;
    var regexp = /^\d+x\d+$/;

    // Check chessSize to 3x3 format
    if (checkUserData(chessSize, regexp) == -1) {
        document.getElementById("chess-board").innerHTML = "Your data may be in 4x4 format";
        return;
    }

    chessSize = chessSize.split("x");
    var i, j;
    var currentChesRow; // Need for getting current row

    for (i=0; i<chessSize[0]; i++) {
        // Create row with first-str or second-str classes
        if ((i+1)%2 != 0) {
            document.getElementById("chess-board").innerHTML += "<div class='first-str'>"
        }
        else {
            document.getElementById("chess-board").innerHTML += "<div class='second-str'>"
        }

        currentChesRow = document.querySelector("div#chess-board > div:last-child"); // Get last element in <div id="chess-board">

        // Create chess cells
        for (j=0; j<chessSize[1]; j++) {
            currentChesRow.innerHTML += "<div></div>"
        }
    }
}

/* --- Task 9 --- */

function countFloorsAndEntrances() {
    var getFloors = parseInt(document.getElementById("number-floors").value);
    var getApartments = parseInt(document.getElementById("number-apartments").value);
    var getEntrances = parseInt(document.getElementById("number-entrances").value);
    var getUserApartments = parseInt(document.getElementById("user-apartments").value);

    var maxApartmentsNumber = getEntrances*getFloors*getApartments;
    var regexp = /\D/;

    // Check user data values to number
    if (checkUserData(getFloors, regexp, 1, maxApartmentsNumber) == 1 || checkUserData(getApartments, regexp, 1, maxApartmentsNumber) == 1 || checkUserData(getEntrances, regexp, 1, maxApartmentsNumber) == 1 || checkUserData(getUserApartments, regexp, 1, maxApartmentsNumber) == 1) {
        document.getElementById("apartments-to-floors-and-entrances").innerHTML = "Your data may be number";
        return;
    }

    // Check user data values to limits
    if (checkUserData(getFloors, regexp, maxApartmentsNumber, 1) == "limitError" || checkUserData(getApartments, regexp, maxApartmentsNumber, 1) == "limitError" || checkUserData(getEntrances, regexp, maxApartmentsNumber, 1) == "limitError" || checkUserData(getUserApartments, regexp, maxApartmentsNumber, 1) == "limitError") {
        document.getElementById("apartments-to-floors-and-entrances").innerHTML = "This apartment does not exist";
        return;
    }

    document.getElementById("apartments-to-floors-and-entrances").innerHTML = "Подъезд: "+Math.ceil(getUserApartments/(getFloors*getApartments)); // Get entrance

    while (getUserApartments>(getFloors*getApartments)) {
        getUserApartments = getUserApartments - (getFloors*getApartments);
    }

    document.getElementById("apartments-to-floors-and-entrances").innerHTML += ", Этаж: "+Math.ceil(getUserApartments/getApartments); // Get floor
}

/* --- Task 10 --- */

function countNumber() {
    var getUserNumber = document.getElementById("user-number").value;
    var regexp = /-?\d+/;

    // Check getUserNumber to number
    if (checkUserData(getUserNumber, regexp) == -1) {
        document.getElementById("setNumSum").innerHTML = "Your data may be number";
        return;
    }

    getUserNumber = getUserNumber.split("");

    // Check getUserNumber to negative number
    if (getUserNumber[0] == "-") {
        getUserNumber.splice(0, 1);
    }

    var summa = getUserNumber.reduce(function(summa, item) {
        return summa+parseInt(item);
    },0);

    document.getElementById("setNumSum").innerHTML = "Сумма чисел: "+summa;
}

/* --- Task 11 --- */

function formatLinks() {
    var getLinks = document.getElementById("links").value.split(/[\s,]/);
    var getLinksLens = getLinks.length;

    // Delete "" - elements from getLinks
    var i;
    for (i=0; i<getLinksLens; i++) {
        if (getLinks[i] == "") {
            getLinks.splice(i, 1);
            i--;
        }
    }

    // Create link list, if does not exist
    if (!document.getElementById("link-list")) {
        var newLinkList = document.createElement("ul");
        newLinkList.id = "link-list";
        document.getElementById("set-links").appendChild(newLinkList);
    }
    else {
        document.getElementById("link-list").innerHTML = "";
    }

    // Sort getLinks
    getLinks.sort(function(a,b){return a.replace(/https?:\/\//g, "") > b.replace(/https?:\/\//g, "")});

    // Output link list
    getLinks.forEach(function (value) {
        document.getElementById("link-list").innerHTML += '<li><a href="'+value+'">'+value.replace(/https?:\/\//, "")+'</a></li>';
    });

    // Format links in textarea
    document.getElementById("links").value = getLinks.toString().replace(/https?:\/\//g, " ");
}