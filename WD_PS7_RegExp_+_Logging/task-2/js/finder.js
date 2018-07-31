const regElem = $("#regex");

function findMatches() {
    const userReg = regElem.val();
    const userRegLength = userReg.length;
    const flags = [];
    let regRightLength;

    for (let i = userRegLength - 1; i >= 0; i--) {
        if (userReg[i] === "/") {
            regRightLength = i;
            break;
        }
        else {
            flags.push(userReg[i]);
        }
    }

    const result = $("#result");

    try {
        const regex = new RegExp(userReg.slice(1, regRightLength), flags.join(""));
        result.html($("#text").val().replace(regex, "<mark>$&</mark>"));
    } catch {
        result.html("Invalid regex");
    }
}

$("#btn").on("click", findMatches);

regElem.on("keypress", function (e) {
    if (e.which === 13) {
        e.preventDefault();
        findMatches();
    }
});