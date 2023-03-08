function checkPassword() {
    password1 = document.getElementById("password").value;
    password2 = document.getElementById("password2").value;
    if (password1 === "" && password2 === "") {
        document.getElementById("password").style.backgroundColor = "WHITE";
        document.getElementById("password2").style.backgroundColor = "WHITE";
        document.getElementById("error_unmatched").innerHTML = "";
        return false;
    }

    if (password1.localeCompare(password2) === 0) {
        document.getElementById("password").style.backgroundColor = "#C1E1C1";
        document.getElementById("password2").style.backgroundColor = "#C1E1C1";
        document.getElementById("error_unmatched").style.color = "GREEN";
        document.getElementById("error_unmatched").style.fontSize = "13px";
        document.getElementById("error_unmatched").style.fontWeight = "bolder";
        document.getElementById("error_unmatched").innerHTML = "Passwords matching!";
        return true;
    } else {
        document.getElementById("password").style.backgroundColor = "#ff6961";
        document.getElementById("password2").style.backgroundColor = "#ff6961";
        document.getElementById("error_unmatched").style.color = "RED";
        document.getElementById("error_unmatched").style.fontSize = "13px";
        document.getElementById("error_unmatched").style.fontWeight = "bolder";
        document.getElementById("error_unmatched").innerHTML = "Passwords not matching!";
        return false;
    }
}

function passwordStrength() {
    password = document.getElementById("password").value;
    var number_counter = 0;
    var password_length = password.length;
    var character_repeat = "False";
    var unique_characters = 0;
    // check if password length is at least 8 characters in order to begin evaluation
    if (password_length >= 8) {
        for (let i = 0; i < password_length; i++) {
            if (!isNaN(password[i])) { // check if password character is a number
                number_counter++;
            }
        }

        for (let i = 0; i < password_length; i++) {
            number_of_repeats = 1;
            character_to_check = password[i];
            for (let j = i + 1; j < password_length; j++) {
                if (character_to_check === password[j]) {
                    number_of_repeats++;
                    if (number_of_repeats >= (password_length / 2)) { // check if character repeats are above the 50% of the password
                        character_repeat = "True";
                        break;
                    }
                }
            }
            if (number_of_repeats === 1) { // calculate the number of unique characters 
                unique_characters++;
            }
//console.log(character_to_check + "-" + number_of_repeats);
            if (character_repeat === "True") {
                break;
            }
        }

        if (number_counter >= (password_length / 2)) { // check if 50% and above are numbers
            document.getElementById("short_password").style.display = "none";
            document.getElementById("weak_password").style.display = "block";
            document.getElementById("medium_password").style.display = "none";
            document.getElementById("strong_password").style.display = "none";
        } else if (character_repeat === "True") {
            document.getElementById("short_password").style.display = "none";
            document.getElementById("weak_password").style.display = "block";
            document.getElementById("medium_password").style.display = "none";
            document.getElementById("strong_password").style.display = "none";
        } else if (unique_characters >= (password_length * 0.8)) { // check if 80% and above are unique characters
//console.log(unique_characters);
            document.getElementById("short_password").style.display = "none";
            document.getElementById("weak_password").style.display = "none";
            document.getElementById("medium_password").style.display = "none";
            document.getElementById("strong_password").style.display = "block";
        } else { // in any other case 
            document.getElementById("short_password").style.display = "none";
            document.getElementById("weak_password").style.display = "none";
            document.getElementById("medium_password").style.display = "block";
            document.getElementById("strong_password").style.display = "none";
        }
    } else if (password_length < 8 && password_length > 0) { // less than 8 character long
        document.getElementById("short_password").style.display = "block";
        document.getElementById("weak_password").style.display = "none";
        document.getElementById("medium_password").style.display = "none";
        document.getElementById("strong_password").style.display = "none";
    } else if (password_length === 0) { // empty input box 
        document.getElementById("short_password").style.display = "none";
        document.getElementById("weak_password").style.display = "none";
        document.getElementById("medium_password").style.display = "none";
        document.getElementById("strong_password").style.display = "none";
    }

}

function hidePassword() {
    event.preventDefault();
    input1 = document.getElementById("password");
    input2 = document.getElementById("password2");
    if (input1.type === "password" && input2.type === "password") {
        input1.type = "text";
        input2.type = "text";
        document.getElementById("password_eye").style.textShadow = "3px 3px #5a8cff";
    } else {
        input1.type = "password";
        input2.type = "password";
        document.getElementById("password_eye").style.textShadow = "none";
    }
}

function doctorExtra() {
    document.getElementById("doctor_specialty").style.display = "block";
    document.getElementById("doctor_info_container").style.display = "block";
    document.getElementById("certified_container").style.display = "block";
    document.getElementById("doctor_info").disabled = false;
    document.getElementsByName("specialty")[0].disabled = false;
    document.getElementsByName("specialty")[1].disabled = false;
    document.getElementsByName("certified")[0].disabled = false;
    document.getElementsByName("certified")[1].disabled = false;
    document.getElementById("address_label").innerHTML = "Office Address:";
}

function regularUser() {
    document.getElementById("doctor_specialty").style.display = "none";
    document.getElementById("doctor_info_container").style.display = "none";
    document.getElementById("certified_container").style.display = "none";
    document.getElementById("doctor_info").disabled = true;
    document.getElementsByName("specialty")[0].disabled = true;
    document.getElementsByName("specialty")[1].disabled = true;
    document.getElementsByName("certified")[0].disabled = true;
    document.getElementsByName("certified")[1].disabled = true;
    document.getElementById("address_label").innerHTML = "Home Address:";
}

function getDate() {
    var six_figures = [];
    var six_figure_date = [];
    var j = 0;
    full_date = ((document.getElementById("birthdate").value).replace('-', '')).replace('-', ''); //gettind rid of all the "-"

    for (let i = 0; i < 8; i++) {
        if (i === 0 || i === 1) {
            continue;
        }
        six_figures[j] = full_date[i];
        j++;
    }

// reversing date string
    six_figure_date[0] = six_figures[4];
    six_figure_date[1] = six_figures[5];
    six_figure_date[2] = six_figures[2];
    six_figure_date[3] = six_figures[3];
    six_figure_date[4] = six_figures[0];
    six_figure_date[5] = six_figures[1];
    return six_figure_date;
}

function getAMKA() {
    AMKA = document.getElementById("amka").value;
    return AMKA;
}

function checkAMKA() {
    var date = getDate();
    var AMKA = getAMKA();
    var correct = "False";
    if (AMKA.length >= 6) {

        for (let i = 0; i < 6; i++) {
            if (AMKA[i] === date[i]) {
                correct = "True";
            } else {
                correct = "False";
                break;
            }
        }

        if (correct === "True") {
            document.getElementById("amka").style.backgroundColor = "#C1E1C1";
            document.getElementById("amka_message").style.color = "GREEN";
            document.getElementById("amka_message").style.fontWeight = "bolder";
            document.getElementById("amka_message").innerHTML = "Valid AMKA!";
            return true;
        } else if (correct === "False") {
            document.getElementById("amka").style.backgroundColor = "#ff6961";
            document.getElementById("amka_message").style.color = "RED";
            document.getElementById("amka_message").style.fontWeight = "bolder";
            document.getElementById("amka_message").innerHTML = "Invalid AMKA!";
            return false;
        }

    } else {
        document.getElementById("amka").style.backgroundColor = "white";
        document.getElementById("amka_message").innerHTML = "";
        return false;
    }
}

function submitCheck() {

    if (document.getElementById("checkbox").checked) {
        document.getElementById("checkbox_message").style.display = "none";
    } else {
        document.getElementById("checkbox_message").style.display = "block";
    }

    if (checkAMKA() === false && checkPassword() === false) {
        document.getElementById('submit_error').style.display = "block";
        document.getElementById('submit_error').style.color = "red";
        document.getElementById('submit_error').innerHTML = "ERROR submitting form! Invalid AMKA and Passwords not matching!";
        return false;
    } else if (checkAMKA() === true && checkPassword() === true) {
        document.getElementById('submit_error').style.display = "none";
        return true;
    } else if (checkAMKA() === false) {
        document.getElementById('submit_error').style.display = "block";
        document.getElementById('submit_error').style.color = "red";
        document.getElementById('submit_error').innerHTML = "ERROR submitting form! Invalid AMKA!";
        return false;
    } else if (checkPassword() === false) {
        document.getElementById('submit_error').style.display = "block";
        document.getElementById('submit_error').style.color = "red";
        document.getElementById('submit_error').innerHTML = "ERROR submitting form! Passwords not matching!";
        return false;
    }

}


function RegisterPOST() {

    event.preventDefault();

    if (submitCheck() === false) {
        console.log("submitCheck false");
        return false;
    }

    let myForm = document.getElementById('myForm');
    let formData = new FormData(myForm);
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {

        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.status);
            document.getElementById('submit_error').style.display = "block";
            document.getElementById('submit_error').style.color = "green";
            document.getElementById('submit_error').innerHTML = "Registration Successful!";
        } else if (xhr.status === 403) { //USERNAME CHECK
            console.log(xhr.status);
            document.getElementById('submit_error').style.display = "block";
            document.getElementById('submit_error').style.color = "red";
            document.getElementById('submit_error').innerHTML = "ERROR submitting form! Username already taken!";
        } else if (xhr.status === 405) { //EMAIL CHECK
            console.log(xhr.status);
            document.getElementById('submit_error').style.display = "block";
            document.getElementById('submit_error').style.color = "red";
            document.getElementById('submit_error').innerHTML = "ERROR submitting form! Email already taken!";
        } else if (xhr.status === 406) { //AMKA CHECK
            console.log(xhr.status);
            document.getElementById('submit_error').style.display = "block";
            document.getElementById('submit_error').style.color = "red";
            document.getElementById('submit_error').innerHTML = "ERROR submitting form! AMKA already taken!";
        }
    };
    const data = {};
    formData.forEach((value, key) => (data[key] = value));
    xhr.open('POST', 'Register');
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify(data));
    console.log(data);
}
