const metricSection = document.getElementById('metric-section')
const imperialSection = document.getElementById('imperial-section')
const allInputs = document.querySelectorAll("input[type='text']");

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

function resetValues() {
    Array.prototype.forEach.call(allInputs, function (input) {
        input.value = "0";
    });
}

function showMetric() {
    imperialSection.style.display = 'none';
    metricSection.style.display = 'block';
    resetValues();
}

function showImperial() {
    metricSection.style.display = 'none';
    imperialSection.style.display = 'block';
    resetValues();
}

function unitChangeHandler() {
    if (this.value === 'metric') {
        showMetric();
    } else {
        showImperial();
    }
}



for (let i = 0; i < allInputs.length; i++) {
    allInputs[i].addEventListener('keydown', validate)
}

const allRadioButtons = document.querySelectorAll("input[name='bmi_radio']");

Array.prototype.forEach.call(allRadioButtons, function (radio) {
    radio.addEventListener('change', unitChangeHandler);
});
