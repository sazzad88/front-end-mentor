// in all text input only number is allowed to be inserted

function validate(event) {


    // Handle paste
    if (event.type === 'paste') {
        key = event.clipboardData.getData('text/plain');
        var regex = /[0-9]|\./;
        if (!regex.test(key)) {
            event.returnValue = false;
            if (event.preventDefault) event.preventDefault();
        }
    } else {
        if (!((event.which >= 48 && event.which <= 57)
            || event.which == 8 || event.which == 46)) {
            event.returnValue = false;
        }

    }

}

const allInputs = document.querySelectorAll("input[type='text']");

for (let i = 0; i < allInputs.length; i++) {
    allInputs[i].addEventListener('keydown', validate)
}
