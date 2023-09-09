const metricSection = document.getElementById('metric-section')
const imperialSection = document.getElementById('imperial-section')
const allRadioButtons = document.querySelectorAll("input[name='bmi_radio']");
const allInputs = document.querySelectorAll("input[type='text']");
const metricInputs = document.querySelectorAll("input[class='metric_input']");
const imperialInputs = document.querySelectorAll("input[class='imperial_input']");
const resultsSection = document.querySelectorAll(".results");
const welcomeSection = document.querySelectorAll(".welcome");

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
            || event.which == 8 || event.which == 46 || event.which == 190)) {
            event.returnValue = false;
        }
    }
}

function resetValues() {
    Array.prototype.forEach.call(allInputs, function (input) {
        input.value = "0";
    });
    showResult();
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

function validInput(string) {
    const given = Number(string);
    return given !== NaN && given > 0;
}

function showResult(value) {
    if (value) {
        Array.prototype.forEach.call(welcomeSection, function (input) {
            input.style.display = 'none';
        });
        Array.prototype.forEach.call(resultsSection, function (input) {
            input.style.display = 'block';
        });

        document.getElementById('current_bmi').innerText = value;
    } else {
        Array.prototype.forEach.call(resultsSection, function (input) {
            input.style.display = 'none';
        });
        Array.prototype.forEach.call(welcomeSection, function (input) {
            input.style.display = 'block';
        });
    }

}


function calculateMetricBMI() {
    const height = document.getElementById('metric_height').value;
    const weight = document.getElementById('metric_weight').value;

    if (height && weight) {
        if (validInput(weight) && validInput(height)) {
            // (kg / height ^ 2) * 10000
            const bmi = Number((weight / (height * height)) * 10000).toFixed(1)
            showResult(bmi)
        } else {
            showResult()
        }
    } else {
        showResult()
    }
}

function calculateImperialBMI() {
    const feet = document.getElementById('imperial_ft').value;
    const inch = document.getElementById('imperial_in').value;
    const stone = document.getElementById('imperial_st').value;
    const pound = document.getElementById('imperial_lbs').value;

    let height = 0;
    let weight = 0;

    if (validInput(stone)) {
        weight += stone * 14;
    }

    if (validInput(pound)) {
        weight += Number(pound);
    }

    if (validInput(feet)) {
        height += feet * 12;
    }

    if (validInput(inch)) {
        height += Number(inch);
    }

    if (height && weight) {
        if (validInput(weight) && validInput(height)) {
            // (kg / height ^ 2) * 10000
            const bmi = Number(((weight / height) / height) * 703).toFixed(2)
            showResult(bmi)
        } else {
            showResult()
        }
    } else {
        showResult()
    }
}



for (let i = 0; i < allInputs.length; i++) {
    allInputs[i].addEventListener('keydown', validate)
}



Array.prototype.forEach.call(allRadioButtons, function (radio) {
    radio.addEventListener('change', unitChangeHandler);
});

Array.prototype.forEach.call(metricInputs, function (input) {
    input.addEventListener('keyup', calculateMetricBMI);
});


Array.prototype.forEach.call(imperialInputs, function (input) {
    input.addEventListener('keyup', calculateImperialBMI);
});


