const regElem = $("#regex");

function findMatches() {
    const userReg = regElem.val();
    let flags = "";
    let regRightLength = 0;

    for (let i = userReg.length - 1; i >= 0; i--) {
        if (userReg[i] === "/") {
            regRightLength = i;
            break;
        } else {
            flags += userReg[i];
        }
    }

    const result = $("#result");

    try {
        const regex = new RegExp(userReg.slice(1, regRightLength), flags);
        result.html($("#text")
            .val()
            .replace(regex, "<mark>$&</mark>"));
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