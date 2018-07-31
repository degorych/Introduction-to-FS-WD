const regex = {
    ip: /^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$/,
    url: /^(https?:\/\/)?([\da-z-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
    email: /^([a-z0-9_\.-]+)@([a-z0-9]+)\.([a-z]{2,6})$/,
    date: /^(0\d|1[0-2])\/([0-2]\d|3[01])\/([01]\d{3}|20[01][0-8])$/,
    time: /^([01]\d|2[0-3])(:[0-5]\d){2}$/
};

const form = $("#form");
const trueClasses = "fa-check goodAnswer";
const falseClasses = "fa-times badAnswer";

form.on("input", "input", function () {
    const currentInput = $(this);
    const name = currentInput.attr("name");
    const classes = (regex[name].test(currentInput.val())) ?
        [falseClasses, trueClasses] : [trueClasses, falseClasses];
    $(`#${name}`).find("i")
        .removeClass(classes[0])
        .addClass(classes[1]);
});

form.on("submit", function (event) {
    event.preventDefault();
    const responseElem = $(".result");
    $.ajax({
        url: "./php/validate.php",
        method: "POST",
        data: $(this).serialize(),
        dataType: "json",
        success: function (response) {
            let result = "";
            responseElem.val("");
            for (let key in response) {
                result += `
                    <p>
                        ${key}: 
                        <i class="fas ${(response[key]) ? trueClasses : falseClasses}"></i>
                    </p>`;
            }
            responseElem.append(result);
        }
    })
});