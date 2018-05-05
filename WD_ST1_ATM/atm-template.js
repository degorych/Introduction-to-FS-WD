const ATM = {
    is_auth: false, 
    current_user:false,
    current_type:false,

    // for report
    report: [],
     
    // all cash of ATM
    cash: 2000,
    // all available users
    users: [
        {number: "0000", pin: "000", debet: 0, type: "admin"}, // EXTENDED
        {number: "0025", pin: "123", debet: 675, type: "user"}
    ],

    num: function(value) {
        return !isNaN(parseFloat(value)) && isFinite(value);
    },

    dataOptions: {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric"
    },

    // authorization
    auth: function(number, pin) {
        if (this.is_auth) {
            this.report.push(`${new Date().toLocaleString("ru", this.dataOptions)}: Authentication attempt then user login`);
            return "Please logout";
        }

        this.current_user = this.users.find(function (element) {
            if (element.number === number.toString().padStart(4, "0") && element.pin === pin.toString().padStart(3, "0")) {
                return element;
            }
        });

        if (this.current_user !== undefined) {
            this.is_auth = true;
            this.current_type = this.current_user.type;
            this.report.push(`${new Date().toLocaleString("ru", this.dataOptions)}: "${this.current_user.number}" logined as ${this.current_type}`);
            return "Login is success";
        }

        if (!this.is_auth) {
            this.report.push(`${new Date().toLocaleString("ru", this.dataOptions)}: Error  authentication with Number: "${number}", Pin: "${pin}"`);
            return "Error  authentication";
        }

    },
    // check current debet
    check: function() {
        if (this.is_auth) {
            this.report.push(`${new Date().toLocaleString("ru", this.dataOptions)}: "${this.current_user.number}" checked current debet`);
            return this.current_user.debet;
        }
        else {
            this.report.push(`${new Date().toLocaleString("ru", this.dataOptions)}: Not logged in user trying to check debet`);
            return "Please, authentication to check debet";
        }
    },
    // get cash - available for user only
    getCash: function(amount) {
        if (this.current_type === "admin") {
          this.report.push(`${new Date().toLocaleString("ru", this.dataOptions)}: "${this.current_user.number}" trying to get cash`);
          return "Admin can not get cash";
        }

        if (!this.is_auth) {
            this.report.push(`${new Date().toLocaleString("ru", this.dataOptions)}: Not logged in user trying to get cash`);
            return "Please, authentication to get cash";
        }

        if (!this.num(amount)) {
            this.report.push(`${new Date().toLocaleString("ru", this.dataOptions)}: "${this.current_user.number}" entered incorrect data`);
            return "Your data is incorrect";
        }

        if (amount > this.current_user.debet) {
            this.report.push(`${new Date().toLocaleString("ru", this.dataOptions)}: "${this.current_user.number}" entered large amount,then account contain`);
            return "Insufficient cash on the account";
        }

        if (amount > this.cash) {
            this.report.push(`${new Date().toLocaleString("ru", this.dataOptions)}: ATM contain little cash to get cash`);
            return "Insufficient cash on the ATM";
        }

        if (amount < 0) {
            this.report.push(`${new Date().toLocaleString("ru", this.dataOptions)}: "${this.current_user.number}" trying to get negative cash`);
            return "Your data can not be negative";
        }

        this.current_user.debet -= amount;
        this.cash -= amount;
        this.report.push(`${new Date().toLocaleString("ru", this.dataOptions)}: "${this.current_user.number}" get ${amount} cash`);
        return `Success, get ${amount} cash`;
    },
    // load cash - available for user only
    loadCash: function(amount){
        if (this.current_type === "admin") {
            this.report.push(`${new Date().toLocaleString("ru", this.dataOptions)}: "${this.current_user.number}" trying to load cash`);
            return "Admin can not load cash";
        }

        if (!this.current_user)  {
            this.report.push(`${new Date().toLocaleString("ru", this.dataOptions)}: Not logged in user trying to load cash`);
            return "Please, authentication to load cash";
        }

        if (!this.num(amount)) {
            this.report.push(`${new Date().toLocaleString("ru", this.dataOptions)}: "${this.current_user.number}" entered incorrect data`);
            return "Your data is incorrect";
        }

        if (amount < 0) {
            this.report.push(`${new Date().toLocaleString("ru", this.dataOptions)}: "${this.current_user.number}" trying to load negative cash`);
            return "Your data can not be negative";
        }

        this.current_user.debet += amount;
        this.cash += amount;
        this.report.push(`${new Date().toLocaleString("ru", this.dataOptions)}: "${this.current_user.number}" load ${amount} cash`);
        return `Success, load ${amount} cash`;
    },
    // load cash to ATM - available for admin only - EXTENDED
    load_cash: function(addition) {
        if (this.current_type === "user") {
            this.report.push(`${new Date().toLocaleString("ru", this.dataOptions)}: "${this.current_user.number}" trying to load cash to ATM`);
            return "You can not load cash to ATM";
        }

        if (!this.current_user) {
            this.report.push(`${new Date().toLocaleString("ru", this.dataOptions)}: Not logged in as admin user trying to load cash`);
            return "Authentication admin to load cash to ATM";
        }

        if (!this.num(addition)) {
            this.report.push(`${new Date().toLocaleString("ru", this.dataOptions)}: "${this.current_user.number}" entered incorrect data`);
            return "Your data is incorrect";
        }

        if (addition < 0) {
            this.report.push(`${new Date().toLocaleString("ru", this.dataOptions)}: "${this.current_user.number}" trying to load negative cash`);
            return "Your data can not be negative";
        }

        this.cash += addition;
        this.report.push(`${new Date().toLocaleString("ru", this.dataOptions)}: "${this.current_user.number}" load ${addition} to ATM`);
        return `You load ${addition} to ATM`;
    },
    // get report about cash actions - available for admin only - EXTENDED
    getReport: function() {
        if (this.current_type === "admin") {
            this.report.forEach(function (value) {
                console.log(value);
            })
        }
        else {
            this.report.push(`${new Date().toLocaleString("ru", this.dataOptions)}: Non admin trying to view report`);
            return "You do not have access to use report";
        }
    },
    // log out
    logout: function() {
        this.report.push(`${new Date().toLocaleString("ru", this.dataOptions)}: "${this.current_user.number}" is log out`);
        this.is_auth = false;
        this.current_user = false;
        this.current_type = false;
        return "You are log out";
    }
};
