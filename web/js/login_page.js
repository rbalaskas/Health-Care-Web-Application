var username;

$(document).ready(function () {
    isLoggedIn();
    isLoggedInDoctor();

});

function isLoggedIn() {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) { //welcome
            document.getElementById('login_error').style.display = "block";
            document.getElementById('login_error').style.color = "green";
            document.getElementById('login_error').innerHTML = "<br><br>Login Successful!";

            document.getElementById('login_box').style.display = "none";
            document.getElementById('personal_info_box').style.display = "block";
            document.getElementById('bmi_box').style.display = "block";
            document.getElementById('ideal_weight_box').style.display = "block";
            document.getElementById('attack_check').style.display = "block";
            document.getElementById('edit_profile_button').style.display = "inline-block";
            document.getElementById('home_button').style.display = "inline-block";
            document.getElementById('certified_doctors_button').style.display = "inline-block";
            document.getElementById('Randevouz').style.display = "none";
            document.getElementById('logout_button').style.display = "inline-block";
            document.querySelector('footer').style.position = "fixed";

            const Obj = JSON.parse(xhr.responseText);
            
            responseTextToForm(Obj);

        } else if (xhr.status !== 200) {

        }
    };
    xhr.open('GET', 'Login');
    xhr.send();
}


function isLoggedInDoctor() {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) { //welcome
            document.getElementById('login_error').style.display = "block";
            document.getElementById('login_error').style.color = "green";
            document.getElementById('login_error').innerHTML = "<br><br>Login Successful!";

            document.getElementById('login_box').style.display = "none";
            document.getElementById('personal_info_box').style.display = "block";
            document.getElementById('bmi_box').style.display = "block";
            document.getElementById('ideal_weight_box').style.display = "block";
            document.getElementById('attack_check').style.display = "block";
            document.getElementById('edit_profile_button').style.display = "inline-block";
            document.getElementById('home_button').style.display = "inline-block";
            document.getElementById('certified_doctors_button').style.display = "inline-block";
            document.getElementById('Randevouz').style.display = "inline-block";
            document.getElementById('logout_button').style.display = "inline-block";
            document.querySelector('footer').style.position = "fixed";

            const Obj = JSON.parse(xhr.responseText);

            responseTextToForm(Obj);

        } else if (xhr.status !== 200) {

        }
    };
    xhr.open('GET', 'Edit_Doctor');
    xhr.send();
}


function LoginPOST() {

    event.preventDefault();

    let Form = document.getElementById('Form');
    let formData = new FormData(Form);
    var xhr = new XMLHttpRequest();
    
    xhr.onload = function () {
        console.log(xhr.status);
        if (xhr.readyState === 4 && xhr.status === 200) { //USER FOUND
            
            if( document.getElementById('user_login').value === "admin" && document.getElementById('password_login').value === "admin12*"){
                window.location.href = 'admin_page.html';
                return;
                
            }
            
            document.getElementById('login_error').style.display = "block";
            document.getElementById('login_error').style.color = "green";
            document.getElementById('login_error').innerHTML = "<br><br>Login Successful!";

            document.getElementById('login_box').style.display = "none";
            document.getElementById('personal_info_box').style.display = "block";
            document.getElementById('bmi_box').style.display = "block";
            document.getElementById('ideal_weight_box').style.display = "block";
            document.getElementById('attack_check').style.display = "block";
            document.getElementById('edit_profile_button').style.display = "inline-block";
            document.getElementById('home_button').style.display = "inline-block";
            document.getElementById('certified_doctors_button').style.display = "inline-block";
            document.getElementById('Randevouz').style.display = "none";
            document.getElementById('logout_button').style.display = "inline-block";
            //document.querySelector('footer').style.position = "fixed";

            getUser(); // Load User Info on home page


        } 
        if (xhr.readyState === 4 && xhr.status === 201) { //DOCTOR FOUND
            
            if( document.getElementById('user_login').value === "admin" && document.getElementById('password_login').value === "admin12*"){
                window.location.href = 'admin_page.html';
                return;
                
            }
            
            console.log(xhr.status);
            document.getElementById('login_error').style.display = "block";
            document.getElementById('login_error').style.color = "green";
            document.getElementById('login_error').innerHTML = "<br><br>Login Successful!";

            document.getElementById('login_box').style.display = "none";
            document.getElementById('personal_info_box').style.display = "block";
            document.getElementById('bmi_box').style.display = "block";
            document.getElementById('ideal_weight_box').style.display = "block";
            document.getElementById('attack_check').style.display = "block";
            document.getElementById('edit_profile_button').style.display = "inline-block";
            document.getElementById('home_button').style.display = "inline-block";
            document.getElementById('certified_doctors_button').style.display = "inline-block";
            document.getElementById('Randevouz').style.display = "inline-block";
            document.getElementById('logout_button').style.display = "inline-block";
            //document.querySelector('footer').style.position = "fixed";
            
            getDoctor();
           


        }else if (xhr.status === 405) { //USERNAME NOT FOUND
            document.getElementById('login_error').style.display = "block";
            document.getElementById('login_error').style.color = "red";
            document.getElementById('login_error').innerHTML = "<br><br>Unable to login!<br>Wrong username or password!";
        }
        else if (xhr.status === 402) { //USERNAME NOT FOUND
            document.getElementById('login_error').style.display = "block";
            document.getElementById('login_error').style.color = "red";
            document.getElementById('login_error').innerHTML = "<br><br>Unable to login!<br>You are not certified wait<br>for admin to certified you!!";
        }

    };
    const data = {};
    formData.forEach((value, key) => (data[key] = value));
    xhr.open('POST', 'Login');
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify(data));


}


function hidePasswordLoginPage() {
    input1 = document.getElementById("password_login");

    if (input1.type === "password") {
        input1.type = "text";
        document.getElementById("password_eye_login").style.textShadow = "3px 3px #5a8cff";
    } else {
        input1.type = "password";
        document.getElementById("password_eye_login").style.textShadow = "none";
    }
}



function createTableFromJSON(data) {
    var html = "<table><tr><th>Category</th><th>Value</th></tr>";
    for (const x in data) {
        var category = x;
        var value = data[x];
        html += "<tr><td>" + category + "</td><td>" + value + "</td></tr>";
    }
    html += "</table>";
    return html;

}

function logout() {

    event.preventDefault();


    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) { // SUCCESSFUL LOGOUT
            disableEdit();
            document.getElementById('doctor_table').style.display = "none";
            document.getElementById('personal_info_box').style.display = "none";
            document.getElementById('ideal_weight_box').style.display = "none";
            document.getElementById('attack_check').style.display = "none";
            document.getElementById('bmi_box').style.display = "none";
            document.getElementById("save_message").innerHTML = "";
            document.getElementById('login_box').style.display = "block";
            document.getElementById('save_message').innerHTML = "";
            document.getElementById('edit_profile_button').style.display = "none";
            document.getElementById('home_button').style.display = "none";
            document.getElementById('certified_doctors_button').style.display = "none";
            document.getElementById('Randevouz').style.display = "none";
            document.getElementById('logout_button').style.display = "none";
            document.getElementById('header_message').innerHTML = "User Login";
            document.getElementById('login_error').style.display = "none";
            document.getElementById('user_login').value = "";
            document.getElementById('password_login').value = "";
        } else if (xhr.status !== 200) {
            alert('Unable to logout. Returned status of ' + xhr.status);

        }
    };
    xhr.open('POST', 'Logout');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send();
}

function responseTextToForm(Obj) {
    
    username = Obj.username;
    
    document.getElementById('header_message').innerHTML = "Welcome back " + username + "!";
    document.getElementById("username").value = Obj.username;
    document.getElementById("username").readOnly = true;
    document.getElementById("email").value = Obj.email;
    document.getElementById("password").value = Obj.password;
    document.getElementById("password2").value = Obj.password;
    document.getElementById("firstname").value = Obj.firstname;
    document.getElementById("lastname").value = Obj.lastname;
    document.getElementById("birthdate").value = Obj.birthdate;
    if (Obj.gender === "Male") {
        document.getElementsByName("gender")[0].checked = true;
    } else if (Obj.gender === "Female") {
        document.getElementsByName("gender")[1].checked = true;
    } else if (Obj.gender === "Other") {
        document.getElementsByName("gender")[2].checked = true;
    }
    document.getElementById("amka").innerHTML = Obj.amka;

    document.getElementById("city").value = Obj.city;
    document.getElementById("address").value = Obj.address;
    //ATTACK//
    document.getElementById("attack_check").innerHTML = Obj.address;
    //////////
    document.getElementById("telephone").value = Obj.telephone;
    document.getElementById("height").value = Obj.height;
    document.getElementById("weight").value = Obj.weight;

    document.getElementById("country").value = Obj.country;

    document.getElementById("bloodtype").value = Obj.bloodtype;

    if (Obj.blooddonor === 1) { //YES
        document.getElementsByName("blooddonor")[0].checked = true;
    } else if (Obj.blooddonor === 0) { //NO
        document.getElementsByName("blooddonor")[1].checked = true;

    }
}



function getDoctor() {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const Obj = JSON.parse(xhr.responseText);

            responseTextToForm(Obj);

        } else if (xhr.status !== 200) {

        }
    };
    var data = $('#Form').serialize();
    xhr.open('GET', 'Edit_Doctor?' + data);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send();
}



function getUser() {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const Obj = JSON.parse(xhr.responseText);

            responseTextToForm(Obj);

        } else if (xhr.status !== 200) {

        }
    };
    var data = $('#Form').serialize();
    xhr.open('GET', 'Login?' + data);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send();
}

function goHome() {
    event.preventDefault();
    document.getElementById("doctor_table").style.display = "none";

    document.getElementById('personal_info_box').style.display = "block";
    document.getElementById('bmi_box').style.display = "block";
    document.getElementById('ideal_weight_box').style.display = "block";
    document.getElementById('attack_check').style.display = "block";

    document.getElementById("save_box").style.display = "none";

    document.getElementById("username").disabled = true;
    document.getElementById("email").disabled = true;
    document.getElementById("password").disabled = true;
    document.getElementById("password2").disabled = true;
    document.getElementById("firstname").disabled = true;
    document.getElementById("lastname").disabled = true;
    document.getElementById("birthdate").disabled = true;

    document.getElementsByName("gender")[0].disabled = true;

    document.getElementsByName("gender")[1].disabled = true;

    document.getElementsByName("gender")[2].disabled = true;
    document.getElementById("country").disabled = true;
    document.getElementById("city").disabled = true;
    document.getElementById("address").disabled = true;
    document.getElementById("telephone").disabled = true;
    document.getElementById("height").disabled = true;
    document.getElementById("weight").disabled = true;


    document.getElementsByName("blooddonor")[0].disabled = true;

    document.getElementsByName("blooddonor")[1].disabled = true;

    document.getElementById("bloodtype").disabled = true;

    document.getElementById("save_message").innerHTML = "";
}

function editUser() {

    event.preventDefault();

    document.getElementById("doctor_table").style.display = "none";

    document.getElementById('personal_info_box').style.display = "block";
    document.getElementById('bmi_box').style.display = "block";
    document.getElementById('ideal_weight_box').style.display = "block";
    document.getElementById('attack_check').style.display = "block";

    document.getElementById("save_box").style.display = "block";

    document.getElementById("username").disabled = false;
    document.getElementById("email").disabled = false;
    document.getElementById("password").disabled = false;
    document.getElementById("password2").disabled = false;
    document.getElementById("firstname").disabled = false;
    document.getElementById("lastname").disabled = false;
    document.getElementById("birthdate").disabled = false;

    document.getElementsByName("gender")[0].disabled = false;

    document.getElementsByName("gender")[1].disabled = false;

    document.getElementsByName("gender")[2].disabled = false;
    document.getElementById("country").disabled = false;
    document.getElementById("city").disabled = false;
    document.getElementById("address").disabled = false;
    document.getElementById("telephone").disabled = false;
    document.getElementById("height").disabled = false;
    document.getElementById("weight").disabled = false;


    document.getElementsByName("blooddonor")[0].disabled = false;

    document.getElementsByName("blooddonor")[1].disabled = false;

    document.getElementById("bloodtype").disabled = false;

    document.getElementById("save_message").innerHTML = "";

}

function disableEdit() {
    document.getElementById("save_box").style.display = "none";

    document.getElementById("username").disabled = true;

    document.getElementById("email").disabled = true;
    document.getElementById("password").disabled = true;
    document.getElementById("password2").disabled = true;
    document.getElementById("firstname").disabled = true;
    document.getElementById("lastname").disabled = true;
    document.getElementById("birthdate").disabled = true;

    document.getElementsByName("gender")[0].disabled = true;

    document.getElementsByName("gender")[1].disabled = true;

    document.getElementsByName("gender")[2].disabled = true;
    document.getElementById("country").disabled = true;
    document.getElementById("city").disabled = true;
    document.getElementById("address").disabled = true;
    document.getElementById("telephone").disabled = true;
    document.getElementById("height").disabled = true;
    document.getElementById("weight").disabled = true;


    document.getElementsByName("blooddonor")[0].disabled = true;

    document.getElementsByName("blooddonor")[1].disabled = true;

    document.getElementById("bloodtype").disabled = true;

    //document.getElementById("submit_error").innerHTML = "";
}

function cancelEdit() {
    event.preventDefault();
    getUser();
    disableEdit();
}

function EditPOST() {

    event.preventDefault();


    let Form = document.getElementById('editForm');
    let formData = new FormData(Form);
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        console.log(xhr.status);
        if (xhr.readyState === 4 && xhr.status === 200) { // EMAIL NOT TAKEN 
            console.log(xhr.status);
            document.getElementById("save_message").innerHTML = "Profile Edited Succesffuly!";
            document.getElementById("save_message").style.color = "green";

            getUser();
            getDoctor();
            disableEdit();


        } else if (xhr.status === 405) { // EMAIL TAKEN
            console.log(xhr.status);
            document.getElementById("save_message").innerHTML = "Email taken!";
            document.getElementById("save_message").style.color = "red";

        }

    };
    const data = {};
    formData.forEach((value, key) => (data[key] = value));
    xhr.open('POST', 'Edit');
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify(data));

}

function EditPOSTDoctor() {

    event.preventDefault();


    let Form = document.getElementById('editForm');
    let formData = new FormData(Form);
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        console.log(xhr.status);
        if (xhr.readyState === 4 && xhr.status === 200) { // EMAIL NOT TAKEN 
            console.log(xhr.status);
            document.getElementById("save_message").innerHTML = "Profile Edited Succesffulyyyyy!";
            document.getElementById("save_message").style.color = "green";

            getUser();
            getDoctor();
            disableEdit();


        } else if (xhr.status === 405) { // EMAIL TAKEN
            console.log(xhr.status);
            document.getElementById("save_message").innerHTML = "Email taken!";
            document.getElementById("save_message").style.color = "red";

        }

    };
    const data = {};
    formData.forEach((value, key) => (data[key] = value));
    xhr.open('POST', 'Edit_Doctor');
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify(data));

}

