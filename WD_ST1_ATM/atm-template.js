const ATM = {
    is_auth: false, 
    current_user:false,
    current_type:false,

    // for report
    report: [],
    reportMessages: [
        "Authentication attempt then user login",
        "logined as",
        "Error  authentication",
        "checked current debet",
        "Not logged in user trying to check debet",
        "have not access rights to get cash",
        "Not logged in user trying to get cash",
        "entered incorrect data",
        "entered large amount,then account contain",
        "ATM contain little cash to get cash",
        "trying to get negative cash",
        "get",
        "have not access rights to load cash",
        "Not logged in user trying to load cash",
        "trying to load negative cash",
        "load",
        "have not access rights to load cash on ATM",
        "Not logged in as admin user trying to load cash on ATM",
        "trying to load negative cash on ATM",
        "load on ATM",
        "Non admin trying to view report",
        "is log out",
        "Non log in user try to log out"
    ],

    dataOptions: {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric"
    },

    addReport: message => ATM.report.push(`${new Date().toLocaleString("ru", ATM.dataOptions)} - ${message}`),
    createMessage: function (report, user, data) { // Message constructor
        let message = "";
        if (user) message += `"${user}" `;
        message += report;
        if (data) message += ` ${data}`;
        return message;
    },

    checkAuth: function (report) {
        if (!this.is_auth) {
            this.addReport(this.createMessage(report));
        }
        return this.is_auth;
    },

    // all cash of ATM
    cash: 2000,
    // all available users
    users: [
        {number: "0000", pin: "000", debet: 0, type: "admin"}, // EXTENDED
        {number: "0025", pin: "123", debet: 675, type: "user"}
    ],

    // Data check
    num: value => !isNaN(parseFloat(value)) && isFinite(value), // Data is num
    notNegative: value => (value >= 0), // Data is not negative

    dataCheck: function (value, reportNotNum, reportNotPositive) {
        if (!this.num(value)) {
            this.addReport(this.createMessage(reportNotNum, this.current_user.number));
        }

        if (!this.notNegative(value) && this.num(value)) {
            this.addReport(this.createMessage(reportNotPositive, this.current_user.number));
        }
        return (this.num(value)) && (this.notNegative(value));
    },

    bigCash: function (value, reportDebet, reportATM) {
        if (value > this.current_user.debet) {
            this.addReport(this.createMessage(reportDebet, this.current_user.number));
        }
        if (value > this.cash) {
            this.addReport(this.createMessage(reportATM, this.current_user.number));
        }
        return (value > this.current_user.debet) && (value > this.cash);
    },

    checkUserStatus: function (status, report) {
        if (!this.current_type === status) {
            this.addReport(this.createMessage(report));
        }
        return (this.current_type === status);
    },

    // authorization
    auth: function(number, pin) {
        if (this.is_auth) {
            this.addReport(this.createMessage(this.reportMessages[0]));
            return "Please logout";
        }

        this.current_user = this.users.find(function (element) {
            if (element.number === number.toString() && element.pin === pin.toString()) {
                return element;
            }
        });

        if (this.current_user !== undefined) {
            this.is_auth = true;
            this.current_type = this.current_user.type;
            this.addReport(this.createMessage(this.reportMessages[1],
                                              this.current_user.number,
                                              this.current_type));
            return "Login is success";
        }

        else {
            this.current_user = false;
            this.addReport(this.createMessage(this.reportMessages[2]));
            return "Your number and pin not found";
        }

    },
    // check current debet
    check: function() {
        if (!this.checkAuth(this.reportMessages[4])) {
            return "Please, authentication to check debet";
        }
        else {
            this.addReport(this.createMessage(this.reportMessages[3], this.current_user.number));
            return this.current_user.debet;
        }
    },
    // get cash - available for user only
    getCash: function(amount) {
        if (!this.checkAuth(this.reportMessages[6])) {
            return "Please, authentication to get cash";
        }

        if (!this.checkUserStatus("user", this.reportMessages[5])) {
          return "Admin can not get cash";
        }

        if (!this.dataCheck(amount, this.reportMessages[7], this.reportMessages[10])) {
            return "Your data is incorrect";
        }

        if (this.bigCash(amount, this.reportMessages[8], this.reportMessages[9])) {
            return "Insufficient cash";
        }

        this.current_user.debet -= amount;
        this.cash -= amount;
        this.addReport(this.createMessage(this.reportMessages[11], this.current_user.number, amount));
        return `Success, you get ${amount} cash`;
    },
    // load cash - available for user only
    loadCash: function(amount){
        if (!this.checkAuth(this.reportMessages[13])) {
            return "Please, authentication to load cash";
        }

        if (!this.checkUserStatus("user", this.reportMessages[12])) {
            return "Admin can not load cash";
        }

        if (!this.dataCheck(amount, this.reportMessages[7], this.reportMessages[14])) {
            return "Your data is incorrect";
        }

        this.current_user.debet += amount;
        this.cash += amount;
        this.addReport(this.createMessage(this.reportMessages[15], this.current_user.number, amount));
        return `Success, you load ${amount} cash on account`;
    },
    // load cash to ATM - available for admin only - EXTENDED
    load_cash: function(addition) {
        if (!this.checkAuth(this.reportMessages[17])) {
            return "Authentication admin to load cash on ATM";
        }

        if (!this.checkUserStatus("admin", this.reportMessages[16])) {
            return "You can not load cash on ATM";
        }

        if (!this.dataCheck(addition, this.reportMessages[7], this.reportMessages[18])) {
            return "Your data is incorrect";
        }

        this.cash += addition;
        this.addReport(this.createMessage(this.reportMessages[19], this.current_user.number, addition));
        return `You load ${addition} cash on ATM`;
    },
    // get report about cash actions - available for admin only - EXTENDED
    getReport: function() {
        if (this.current_type === "admin") {
            this.report.forEach(function (value) {
                console.log(value);
            })
        }
        else {
            this.addReport(this.createMessage(this.reportMessages[20]));
            return "You do not have access rights to use report";
        }
    },
    // log out
    logout: function() {
        if (this.current_user) {
            this.addReport(this.createMessage(this.reportMessages[21], this.current_user.number));
            this.is_auth = this.current_user = this.current_type = false;
            return "You are log out";
        }
        else {
            this.addReport(this.createMessage(this.reportMessages[22]));
            return "You are not login";
        }
    }
};
