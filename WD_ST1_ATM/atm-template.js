const ATM = {
    is_auth: false, 
    current_user:false,
    current_type:false,

    // for report
    report: [],

    reportMessages: [
        {toLog: "Authentication attempt then user login", toUser: "Please logout"},
        {toLog: "logined as", toUser: "Login is success"},
        {toLog: "Error  authentication", toUser: "Your number and pin not found"},
        {toLog: "checked current debet"},
        {toLog: "Not logged in user trying", toUser: "Please, authentication"},
        {toLog: "Admin trying", toUser: "You have not access rights"},
        {toLog: "entered incorrect data", toUser: "Your data is incorrect"},
        {toLog: "entered negative cash", toUser: "Your data can not be negative"},
        {toLog: "entered large cash,then account contain", toUser: "Insufficient cash in account"},
        {toLog: "entered large cash, then ATM contain", toUser: "Insufficient cash in ATM"},
        {toLog: "get", toUser: "Success, you get"},
        {toLog: "load", toUser: "Success, you load"},
        {toLog: "Non admin trying", toUser: "You have not access rights"},
        {toLog: "is log out", toUser: "You are log out"}
    ],

    postfix: {
        check: " to check",
        getCash: " to get cash from account",
        getCashRes: " from account",
        loadCash: " to load cash to account",
        loadCashRes: " to account",
        load_cash: " to load cash to ATM",
        load_cashRes: " to ATM",
        getReport: " to get report",
        logout: " to log out"
    },

    dataOptions: {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric"
    },

    createReport: (indexReport, postfix, logOrUser) =>
        ATM.reportMessages[indexReport][logOrUser] + ATM.postfix[postfix],
    addReport: (report, user = "", data = "") =>
        ATM.report.push(`${new Date().toLocaleString("ru", ATM.dataOptions)} - ${user} ${report} ${data}`),

    // all cash of ATM
    cash: 2000,
    // all available users
    users: [
        {number: "0000", pin: "000", debet: 0, type: "admin"}, // EXTENDED
        {number: "0025", pin: "123", debet: 2675, type: "user"}
    ],

    // Check authorised
    checkAuth: function (postfix) {
        if (!this.is_auth) {
            this.addReport(this.createReport(4, postfix, "toLog"));
        }
        return this.is_auth;
    },

    // Data check
    int: value => Number.isInteger(value), // Data is integer
    notNegative: value => (value >= 0), // Data is not negative

    dataCheck: function (value, postfix) {
        if (!this.int(value)) {
            this.addReport(this.createReport(6, postfix, "toLog"), this.current_user.number);
        }
        if (!this.notNegative(value) && this.int(value)) {
            this.addReport(this.createReport(7, postfix, "toLog"), this.current_user.number);
        }
        return (this.int(value)) && (this.notNegative(value));
    },

    // Error if getting cash more then account and ATM contain
    checkBigCash: function (cash, varArr, errorArr) {
        const index = varArr.findIndex(element => (element < cash));
        if (errorArr[index]) {
            this.addReport(this.reportMessages[errorArr[index]].toLog, this.current_user.number);
            return this.reportMessages[errorArr[index]].toUser;
        }
        return false;
    },

    // Check user status
    checkUserStatus: function (status, report) {
        if (this.current_type !== status) {
            this.addReport(report);
        }
        return (this.current_type === status);
    },

    // All checks in one place
    fullChecks: function (data, postfix, errorArr) {
        if (!this.checkAuth(postfix)) {
            return this.createReport(errorArr[1], postfix, "toUser");
        }

        if (!this.checkUserStatus(errorArr[0], this.createReport(errorArr[2], postfix, "toLog"))) {
            return this.createReport(errorArr[2], postfix, "toUser");
        }

        if (!this.dataCheck(data, postfix)) {
            return this.createReport(errorArr[3], postfix, "toUser");
        }
        return false;
    },

    // authorization
    auth: function(number, pin) {
        if (this.is_auth) {
            this.addReport(this.reportMessages[0].toLog);
            return this.reportMessages[0].toUser;
        }

        this.current_user = this.users.find(function (element) {
            if (element.number === number.toString() && element.pin === pin.toString()) {
                return element;
            }
        });

        if (this.current_user !== undefined) {
            this.is_auth = true;
            this.current_type = this.current_user.type;
            this.addReport(this.reportMessages[1].toLog, this.current_user.number, this.current_type);
            return this.reportMessages[1].toUser;
        }

        else {
            this.addReport(this.reportMessages[2].toLog);
            return this.reportMessages[2].toUser;
        }

    },
    // check current debet
    check: function() {
        if (!this.checkAuth("check")) {
            return this.createReport(4, "check", "toUser");
        }
        else {
            this.addReport(this.reportMessages[3].toLog, this.current_user.number);
            return this.current_user.debet;
        }
    },
    // get cash - available for user only
    getCash: function(amount) {
        const errorArr = ["user", 4, 5, 6];
        const fullChecks = this.fullChecks(amount, "getCash", errorArr);
        if (fullChecks) {
            return fullChecks;
        }

        const atmAndAccountCash = [this.current_user.debet, this.cash];
        const errorBigCash = [8, 9];
        const bigCash = this.checkBigCash(amount, atmAndAccountCash, errorBigCash);
        if (bigCash) {
            return bigCash;
        }

        this.current_user.debet -= amount;
        this.cash -= amount;
        this.addReport(this.createReport(10, "getCashRes", "toLog"), this.current_user.number, amount);
        return `${this.reportMessages[10].toUser} ${amount}${this.postfix.getCashRes}`;
    },
    // load cash - available for user only
    loadCash: function(amount){
        const errorArr = ["user", 4, 5, 6];
        const fullChecks = this.fullChecks(amount, "loadCash", errorArr);
        if (fullChecks) {
            return fullChecks;
        }

        this.current_user.debet += amount;
        this.cash += amount;
        this.addReport(this.createReport(11, "loadCashRes", "toLog"), this.current_user.number, amount);
        return `${this.reportMessages[11].toUser} ${amount}${this.postfix.loadCashRes}`;
    },
    // load cash to ATM - available for admin only - EXTENDED
    load_cash: function(addition) {
        const errorArr = ["admin", 4, 12, 6];
        const fullChecks = this.fullChecks(addition, "load_cash", errorArr);
        if (fullChecks) {
            return fullChecks;
        }

        this.current_user.debet += addition;
        this.cash += addition;
        this.addReport(this.createReport(11, "load_cashRes", "toLog"), this.current_user.number, addition);
        return `${this.reportMessages[11].toUser} ${addition}${this.postfix.load_cashRes}`;
    },
    // get report about cash actions - available for admin only - EXTENDED
    getReport: function() {
        if (this.checkUserStatus("admin", this.createReport(12, "getReport", "toLog"))) {
            return this.report.reduce((reports, value) => (reports + value + "\n"), "\n");
        }
        else {
            return this.createReport(12, "getReport", "toUser");
        }
    },
    // log out
    logout: function() {
        if (this.current_user) {
            this.addReport(this.reportMessages[13].toLog, this.current_user.number);
            this.is_auth = this.current_user = this.current_type = false;
            return this.reportMessages[13].toUser;
        }
        else {
            this.addReport(this.createReport(4, "logout", "toLog"));
            return this.createReport(4, "logout", "toUser");
        }
    }
};
