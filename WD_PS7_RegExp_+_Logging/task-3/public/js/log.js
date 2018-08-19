function log(response) {

    const dataOptions = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric"
    };

    if (!Array.isArray(response)) {
        response = [response];
    }

    response.forEach((errorObj) => {
        console.log(`${new Date(errorObj.timestamp * 1000).toLocaleString("ru", dataOptions)} level=${errorObj.level}, message=${errorObj.message}, service=${errorObj.service}, customerId=${errorObj.customerId}, ip=${errorObj.ip}`);
    });
}