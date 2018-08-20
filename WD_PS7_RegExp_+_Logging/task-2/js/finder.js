const regElem = $("#regex");
const symbols = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;'
};

function escapeHtml (userText) {
    return userText.replace(/[&<>"'`=\/]/g, function (s) {
        return symbols[s];
    });
}

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
        const regex = new RegExp(escapeHtml(userReg.slice(1, regRightLength)), flags);
        result.html(escapeHtml($("#text").val()).replace(regex, "<mark>$&</mark>"));
    } catch {
        result.html(`Invalid regex: regex mast be like this 
            <span class="bold-text">"/test/"</span> 
            or this 
            <span class="bold-text">"/test/gi"</span> 
            if you want use the flags`);
    }
}

$("#btn").on("click", findMatches);

regElem.on("keypress", function (e) {
    if (e.which === 13) {
        e.preventDefault();
        findMatches();
    }
});