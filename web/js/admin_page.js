/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function getDoctors() {
    event.preventDefault();
    var xhr = new XMLHttpRequest();
    
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            
            document.getElementById('Delete_User_div').style.display = "none";
            document.getElementById('user_table').style.display = "none";
            document.getElementById('doctor_table').style.display = "block";
            
            
            console.log(xhr.responseText);
            let text = "";
            const myObj = JSON.parse(this.responseText);

            text += "<tr><th>Doctor id</th><th>Firstname</th><th>Lastname</th><th>Address</th><th>City</th><th>Doctor Info</th><th>Amka</th><th>Certified</th></tr>";
            for (let x in myObj) {

                text += "<tr><td>" + myObj[x].doctor_id + "</td><td>" + myObj[x].firstname + "</td><td>" + myObj[x].lastname + "</td><td>" + myObj[x].address + "</td><td>" + myObj[x].city + "</td><td>" + myObj[x].doctor_info + "</td><td>" + myObj[x].amka + "</td><td>" + myObj[x].certified + "</td></tr>";
            }
            
            document.getElementById("doctor_table").innerHTML = text;
            document.getElementById('Certified_Doctor_div').style.display = "block";
            document.getElementById('Delete_Doctor_div').style.display = "block";

        } else if (xhr.status !== 200) {
            console.log(xhr.status);
        }
    };
    xhr.open('GET', 'Admin');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send();

}



function certifieddoctor() {

    event.preventDefault();

    let Form = document.getElementById('certifieForm');
    let formData = new FormData(Form);
    var xhr = new XMLHttpRequest();
    
    xhr.onload = function () {
        console.log(xhr.status);
        if (xhr.readyState === 4 && xhr.status === 200) { 
            
            document.getElementById("save_message").innerHTML = "Doctor Certified Succesffuly!";
            document.getElementById("save_message").style.color = "green";
        } 
        else if (xhr.status === 405) { 
            document.getElementById("save_message").innerHTML = "Doctor not Certified!";
            document.getElementById("save_message").style.color = "red";
        }

    };
    const data = {};
    formData.forEach((value, key) => (data[key] = value));
    xhr.open('POST', 'Admin');
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify(data));

}


function deletedoctor() {
    event.preventDefault();

    let Form = document.getElementById('deleteadoctor');
    let formData = new FormData(Form);
    var xhr = new XMLHttpRequest();
    
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) { 
            
            document.getElementById("_save_message").innerHTML = "Doctor Deleted Succesffuly!";
            document.getElementById("_save_message").style.color = "green";
        } 
       
        else if (xhr.status !== 200) { 
            document.getElementById("_save_message").innerHTML = "Doctor not Deleted!";
            document.getElementById("_save_message").style.color = "red";
        }

    };
    const data = {};
    formData.forEach((value, key) => (data[key] = value));
    xhr.open('POST', 'CertifiedDoctors');
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify(data));
    console.log(data);
}



function getUsers_admin() {
    event.preventDefault();
    
    var xhr = new XMLHttpRequest();
    
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            
            document.getElementById("doctor_table").style.display = "none";
            document.getElementById('Certified_Doctor_div').style.display = "none";
            document.getElementById('Delete_Doctor_div').style.display = "none";
            document.getElementById('Delete_User_div').style.display = "block";
            document.getElementById('user_table').style.display = "block";
            
            
            
            console.log(xhr.responseText);
            let text = "";
            const myObj = JSON.parse(this.responseText);

            text += "<tr><th>User id</th><th>Firstname</th><th>Lastname</th><th>Address</th><th>City</th><th>Amka</th></tr>";
            for (let x in myObj) {

                text += "<tr> <td>" + myObj[x].user_id + "</td><td>" + myObj[x].firstname + "</td><td>" + myObj[x].lastname + "</td><td>" + myObj[x].address + "</td><td>" + myObj[x].city + "</td><td>" + myObj[x].amka + "</td></tr>";
            }
            
            document.getElementById("user_table").innerHTML = text;
            //document.getElementById('Certified_Doctor_div').style.display = "block";
            //document.getElementById('Delete_Doctor_div').style.display = "block";

        } else if (xhr.status !== 200) {
            console.log(xhr.status);
        }
    };
    xhr.open('GET', 'Edit');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send();
}


function deleteaUser() {
    event.preventDefault();

    let Form = document.getElementById('deleteaUser');
    let formData = new FormData(Form);
    var xhr = new XMLHttpRequest();
    
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) { 
            
            document.getElementById("save_message__").innerHTML = "User Deleted Succesffuly!";
            document.getElementById("save_message__").style.color = "green";
        } 
        else if (xhr.status !== 200) { 
            document.getElementById("save_message__").innerHTML = "User not Deleted!";
            document.getElementById("save_message__").style.color = "red";
        }

    };
    const data = {};
    formData.forEach((value, key) => (data[key] = value));
    xhr.open('POST', 'Delete_User');
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify(data));
}

function logout() {

    event.preventDefault();

    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) { // SUCCESSFUL LOGOUT
            window.location.href = 'login_page.html';
            
        } else if (xhr.status !== 200) {
            alert('Unable to logout. Returned status of ' + xhr.status);

        }
    };
    xhr.open('POST', 'Logout');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send();
}