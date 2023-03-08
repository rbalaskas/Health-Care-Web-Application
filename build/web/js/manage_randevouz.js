/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Home_Page(){
   window.location.href = 'login_page.html';
}


function Randevouz(){
   window.location.href = 'manage_randevous.html';
}

function add_randevou_div(){
        document.getElementById("Add_Randevouz_div").style.display = "block";
        document.getElementById("Get_Doctor_Randevou").style.display = "block";
        
    
        document.getElementById("done_table").style.display = "none";
        document.getElementById("free_table").style.display = "none";
         
        document.getElementById("randevouz_table_done").style.display = "none";
        document.getElementById("randevouz_table_free").style.display = "none";
        document.getElementById("Update_Randevou_div").style.display = "none";
        document.getElementById("Delete_Randevou_div").style.display = "none";
        document.getElementById('Get_User_Bloodtest').style.display = "none";
        document.getElementById('Add_Treatment_div').style.display = "none";
        document.getElementById("Get_User_Message").style.display = "none";
        document.getElementById("Send_Messages_div").style.display = "none";
        document.getElementById('treatment_table').style.display = "none";
        document.getElementById('bloodtest_table').style.display = "none";
        document.getElementById('messages_table').style.display = "none";
        document.getElementById('user_table').style.display = "none";
        
}


function get_randevouz_fordoctor(){
    
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {

        if (xhr.readyState === 4 && xhr.status === 200) {
            
            console.log(data);
            let text = "";
            const myObj = JSON.parse(this.responseText);

            
            text += "<tr><th>Randevouz ID</th><th>User ID</th><th>Randevouz Date</th><th>Price</th><th>User info</th><th>Status</th></tr>";
            for (let x in myObj) {

                
                text += "</td><td>" + myObj[x].randevouz_id +
                        "</td><td>" + myObj[x].user_id +
                        "</td><td>" + myObj[x].date_time +
                        "</td><td>" + myObj[x].price +
                        "</td><td>" + myObj[x].user_info +
                        "</td><td>" + myObj[x].status +
                        "</td></tr>";
                
            }

            document.getElementById("doctor_randevouz_table").innerHTML = text;
            document.getElementById("doctor_randevouz_table").style.display = "block";

        } 
        else if (xhr.status !== 200) {
            document.getElementById("doctor_randevouz_table").style.display = "none";
        }
    };
    var data = $('#get_randevouz_form').serialize();
    xhr.open('GET', 'Edit_Randevou?' + data);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send();
}


function seerandevouz(){
    
    event.preventDefault();
    document.getElementById("Get_Doctor_Randevou").style.display = "none";
    var xhr = new XMLHttpRequest();
    
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
           
           document.getElementById("randevouz_table_done").style.display = "block";
           document.getElementById("randevouz_table_free").style.display = "block";
           document.getElementById("Update_Randevou_div").style.display = "block";
           document.getElementById("Delete_Randevou_div").style.display = "block";
           document.getElementById("Add_Randevouz_div").style.display = "none";
           document.getElementById('Get_User_Bloodtest').style.display = "none";
           document.getElementById('Add_Treatment_div').style.display = "none";
           document.getElementById("Get_User_Message").style.display = "none";
            document.getElementById("Send_Messages_div").style.display = "none";
            document.getElementById('treatment_table').style.display = "none";
            document.getElementById('bloodtest_table').style.display = "none";
            document.getElementById('messages_table').style.display = "none";
           
            let text = "";
            let text_1 = "";
            const myObj = JSON.parse(this.responseText);

            text += "<tr><th>Randevouz id</th><th>Doctor id</th><th>User id</th><th>Date & Time</th><th>Price</th><th>User Info</th><th>Status</th></tr>";
            text_1 += "<tr><th>Randevouz id</th><th>Doctor id</th><th>User id</th><th>Date & Time</th><th>Price</th><th>User Info</th><th>Status</th></tr>";
            
            for (let x in myObj) {
                if(myObj[x].status === "done" || myObj[x].status === "selected"){
                    text += "<tr><td>" + myObj[x].randevouz_id + "</td><td>" + myObj[x].doctor_id + "</td><td>" + myObj[x].user_id + "</td><td>" + myObj[x].date_time + "</td><td>" + myObj[x].price + "</td><td>" + myObj[x].user_info + "</td><td>" + myObj[x].status + "</td></tr>";
                }
                else  if(myObj[x].status === "free" || myObj[x].status === "cancelled"){
                    text_1 += "<tr><td>" + myObj[x].randevouz_id + "</td><td>" + myObj[x].doctor_id + "</td><td>" + myObj[x].user_id + "</td><td>" + myObj[x].date_time + "</td><td>" + myObj[x].price + "</td><td>" + myObj[x].user_info + "</td><td>" + myObj[x].status + "</td></tr>";
                }
            }
            
            document.getElementById("done_table").style.display = "block";
            document.getElementById("free_table").style.display = "block";
            document.getElementById("randevouz_table_done").innerHTML = text;
            document.getElementById("randevouz_table_free").innerHTML = text_1;
            

        } else if (xhr.status !== 200) {
            console.log(xhr.status);
        }
    };
    xhr.open('GET', 'Randevou');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send();
}


function updaterandevouz(){
    event.preventDefault();


    let Form = document.getElementById('update_randevou');
    let formData = new FormData(Form);
    var xhr = new XMLHttpRequest();
    
    xhr.onload = function () {
        console.log(xhr.status);
        if (xhr.readyState === 4 && xhr.status === 200) { // EMAIL NOT TAKEN 
            console.log(xhr.status);
            document.getElementById("save_message").innerHTML = "Randevou Updated Succesffuly!";
            document.getElementById("save_message").style.color = "green";

        } else if (xhr.status === 405) { // EMAIL TAKEN
            document.getElementById("save_message").innerHTML = "Randevou not updated!";
            document.getElementById("save_message").style.color = "red";
        }
        else if (xhr.status === 404) { // EMAIL TAKEN
            document.getElementById("save_message").innerHTML = "Doctor not Exist!";
            document.getElementById("save_message").style.color = "red";
        }
        else if (xhr.status === 409) { // EMAIL TAKEN
            document.getElementById("save_message").innerHTML = "The randevou is not available!";
            document.getElementById("save_message").style.color = "red";
        }
        

    };
    const data = {};
    formData.forEach((value, key) => (data[key] = value));
    xhr.open('POST', 'Edit_Randevou');
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify(data));
}



function deleterandevouz(){
 
    event.preventDefault();

    let Form = document.getElementById('delete_randevou');
    let formData = new FormData(Form);
    var xhr = new XMLHttpRequest();
    
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) { 
            
            document.getElementById("save_message").innerHTML = "Randevou Deleted Succesffuly!";
            document.getElementById("save_message").style.color = "green";
        } 
        else if (xhr.status !== 200) { 
            document.getElementById("save_message").innerHTML = "Randevou not Deleted!";
            document.getElementById("save_message").style.color = "red";
        }

    };
    const data = {};
    formData.forEach((value, key) => (data[key] = value));
    xhr.open('POST', 'Delete_Randevou');
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify(data));
    
}




function check_time(){
    event.preventDefault();
    
    var test_date = document.getElementById("datetime").value;
    
    var hour = test_date[11]+test_date[12];
    console.log(hour);
    var minutes = test_date[14]+test_date[15];
    console.log(minutes);
    
    if(hour >= '08' && hour <= '20' && (minutes === '00') || (minutes === '30')){
        document.getElementById('message').innerHTML = '';
    }
    else if(hour < '08' || hour > '20' && (minutes !== '00') || (minutes !== '30')){
        console.log("hour is: "+ hour);
        document.getElementById('message').innerHTML = 'Request failed. You cannot give time out of range 08:00 - 20:30!<br> The appointment must be 30 minutes of length and start from :00 or :30<br>';
        document.getElementById('message').style.color="red";
        document.getElementById('add_randevou_button').disabled = true;
    }
}

function check_doctorid(){
    if((document.getElementById('doctor_id').value === "") || (document.getElementById('doctor_id').value === "0" )){
        document.getElementById('message').innerHTML = 'Request failed. You must give Doctor id!';
        document.getElementById('message').style.color="orange";
        document.getElementById('add_randevou_button').disabled = true;
        document.getElementById('datetime').disabled = true;
    }
    else{
        document.getElementById('message').innerHTML = '';
        document.getElementById('add_randevou_button').disabled = true;
        document.getElementById('datetime').disabled = false;
    }
}



function check_date(){
    event.preventDefault();
    
    var test_date = new Date(document.getElementById("datetime").value)
    console.log(test_date);
    var current_date = new Date();
    
    if (test_date >= current_date) {
        document.getElementById('message').innerHTML = '';
        document.getElementById('add_randevou_button').disabled = false;
        check_time();
    }
    else{
        document.getElementById('message').innerHTML = 'Request failed. You cannot give old date!';
        document.getElementById('message').style.color="red";
        document.getElementById('add_randevou_button').disabled = true; /* CHANGED*/
        return false;
    }
}



function addrandevouz(){

    event.preventDefault();

    let myForm = document.getElementById('add_randevouz_form');
    let formData = new FormData(myForm);
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {

        console.log(xhr.status);
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById('message').style.color = "green";
            document.getElementById('message').innerHTML = "Added Randevou Successfully!";
        
        } else if (xhr.status === 405 || xhr.status === 403 ) { //ERROR
            document.getElementById('message').style.color = "red";
            document.getElementById('message').innerHTML = "ERROR to add randevou form!";
        }
    };
    const data = {};
    formData.forEach((value, key) => (data[key] = value));
    xhr.open('POST', 'Randevou');
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify(data));
}



        /* FOR UPDATE RANDEVOUS*/




function check_doctorid_(){
    if((document.getElementById('doctor_id_').value === "") || (document.getElementById('doctor_id').value === "0" )){
        document.getElementById('save_message').innerHTML = 'Request failed. You must give Doctor id!';
        document.getElementById('save_message').style.color="orange";
        document.getElementById('update_randevou_button').disabled = true;
        document.getElementById('datetime_').disabled = true;
    }
    else{
        document.getElementById('save_message').innerHTML = '';
        document.getElementById('update_randevou_button').disabled = true;
        document.getElementById('datetime_').disabled = false;
    }
}



function check_time_(){
    event.preventDefault();
    
    var test_date = document.getElementById("datetime_").value;
    
    var hour = test_date[11]+test_date[12];
    console.log(hour);
    var minutes = test_date[14]+test_date[15];
    console.log(minutes);
    
    if(hour >= '08' && hour <= '20' && (minutes === '00') || (minutes === '30')){
        document.getElementById('save_message').innerHTML = '';
    }
    else if(hour < '08' || hour > '20' && (minutes !== '00') || (minutes !== '30')){
        console.log("hour is: "+ hour);
        document.getElementById('save_message').innerHTML = 'Request failed. You cannot give time out of range 08:00 - 20:30!<br> The appointment must be 30 minutes of length and start from :00 or :30<br>';
        document.getElementById('save_message').style.color="red";
        document.getElementById('update_randevou_button').disabled = true;
    }
}



function check_date_(){
    event.preventDefault();
    
    var test_date = new Date(document.getElementById("datetime_").value)
    console.log(test_date);
    var current_date = new Date();
    
    if (test_date >= current_date) {
        document.getElementById('save_message').innerHTML = '';
        document.getElementById('update_randevou_button').disabled = false;
        check_time_();
    }
    else{
        document.getElementById('save_message').innerHTML = 'Request failed. You cannot give old date!';
        document.getElementById('save_message').style.color="red";
        document.getElementById('update_randevou_button').disabled = false; /* CHANGED*/
        return false;
    }
}


function check_randevouzid_(){
    if((document.getElementById('randevouz_id').value === "") || (document.getElementById('randevouz_id').value === "0" )){
        document.getElementById('save_message').innerHTML = 'Request failed. You must give Randevouz id!';
        document.getElementById('save_message').style.color="red";
        document.getElementById('delete_randevou_button').disabled = true;
    }
    else{
        document.getElementById('save_message').innerHTML = '';
        document.getElementById('delete_randevou_button').disabled = false;
    }
}



function getUsers() {
    document.getElementById("Get_Doctor_Randevou").style.display = "none";
    document.getElementById("done_table").style.display = "none";
    document.getElementById("free_table").style.display = "none";
    event.preventDefault();
    var xhr = new XMLHttpRequest();
    
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            
            document.getElementById("Add_Randevouz_div").style.display = "none";
            document.getElementById('randevouz_table_done').style.display = "none";
            document.getElementById('randevouz_table_free').style.display = "none";
            document.getElementById('Update_Randevou_div').style.display = "none";
            document.getElementById('Delete_Randevou_div').style.display = "none";
            document.getElementById('user_table').style.display = "block";
            document.getElementById('Get_User_Bloodtest').style.display = "block";
            document.getElementById('Add_Treatment_div').style.display = "block";
            document.getElementById("Get_User_Message").style.display = "none";
            document.getElementById("Send_Messages_div").style.display = "none";
            document.getElementById('treatment_table').style.display = "none";
            document.getElementById('messages_table').style.display = "none";
            document.getElementById('bloodtest_table').style.display = "none";
            
            console.log(xhr.responseText);
            let text = "";
            const myObj = JSON.parse(this.responseText);

            text += "<tr><th>User id</th><th>Firstname</th><th>Lastname</th><th>Address</th><th>City</th><th>Amka</th></tr>";
            for (let x in myObj) {

                text += "<tr><td>" + myObj[x].user_id + "</td><td>" + myObj[x].firstname + "</td><td>" + myObj[x].lastname + "</td><td>" + myObj[x].address + "</td><td>" + myObj[x].city + "</td><td>" + myObj[x].amka + "</td></tr>";
            }
            
            document.getElementById("user_table").innerHTML = text;

        } else if (xhr.status !== 200) {
            console.log(xhr.status);
        }
    };
    xhr.open('GET', 'Edit');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send();
}



function google_charts(){
    document.getElementById('columnchart_values').style.display = "block";
    
    
    google.charts.load("current", {packages:['corechart']});
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
      var data = google.visualization.arrayToDataTable([
        ["Element", "Density", { role: "style" } ],
        ["Copper", 8.94, "#b87333"],
        ["Silver", 10.49, "silver"],
        ["Gold", 19.30, "gold"],
        ["Platinum", 131.45, "color: #e5e4e2"]
      ]);

      var view = new google.visualization.DataView(data);
      view.setColumns([0, 1,
                       { calc: "stringify",
                         sourceColumn: 1,
                         type: "string",
                         role: "annotation" },
                       2]);

      var options = {
        title: "Density of Precious Metals, in g/cm^3",
        width: 600,
        height: 400,
        bar: {groupWidth: "95%"},
        legend: { position: "none" },
      };
      var chart = new google.visualization.ColumnChart(document.getElementById("columnchart_values"));
      chart.draw(view, options);
  }
}

function get_bloodtest() {
    event.preventDefault();
    
    let myForm = document.getElementById('get_bloodtest');
    let formData = new FormData(myForm);
    var xhr = new XMLHttpRequest();
    
    
    
    
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            
            const myObj = JSON.parse(this.responseText);
            console.log(myObj);
            let text = "";
            let first_test = true; //flag

            let bs_cmp = 0.0;
            let chol_cmp = 0.0;
            let iron_cmp = 0.0;
            let d3_cmp = 0.0;
            let b12_cmp = 0.0;
            let bs_tmp = 0.0;
            let chol_tmp = 0.0;
            let iron_tmp = 0.0;
            let d3_tmp = 0.0;
            let b12_tmp = 0.0;
            text += "<tr><th>Bloodtest ID</th><th>AMKA</th><th>Test Date</th><th>Medical Center</th><th>Blood Sugar</th><th>*</th><th>Cholesterol</th><th>*</th><th>Iron</th><th>*</th><th>Vitamin D3</th><th>*</th><th>Vitamin B12</th><th>*</th></tr>";
            
            for (let x in myObj) {

                if (first_test === false) {
                    bs_cmp = myObj[x].blood_sugar - bs_tmp;
                    chol_cmp = myObj[x].cholesterol - chol_tmp;
                    iron_cmp = myObj[x].iron - iron_tmp;
                    d3_cmp = myObj[x].vitamin_d3 - d3_tmp;
                    b12_cmp = myObj[x].vitamin_b12 - b12_tmp;
                }

                text += "<tr><td>" + myObj[x].bloodtest_id + "</td><td>" + myObj[x].amka +
                        "</td><td>" + myObj[x].test_date + "</td><td>" + myObj[x].medical_center +
                        "</td><td>" + myObj[x].blood_sugar +
                        "</td><td>" + bs_cmp.toFixed(2) +
                        "</td><td>" + myObj[x].cholesterol +
                        "</td><td>" + chol_cmp.toFixed(2) +
                        "</td><td>" + myObj[x].iron +
                        "</td><td>" + iron_cmp.toFixed(2) +
                        "</td><td>" + myObj[x].vitamin_d3 +
                        "</td><td>" + d3_cmp.toFixed(2) +
                        "</td><td>" + myObj[x].vitamin_b12 +
                        "</td><td>" + b12_cmp.toFixed(2) +
                        "</td></tr>";
                bs_tmp = myObj[x].blood_sugar;
                chol_tmp = myObj[x].cholesterol;
                iron_tmp = myObj[x].iron;
                d3_tmp = myObj[x].vitamin_d3;
                b12_tmp = myObj[x].vitamin_b12;
                first_test = false;
            }
            
            
            document.getElementById("Add_Randevouz_div").style.display = "none";
            document.getElementById('randevouz_table_done').style.display = "none";
            document.getElementById('randevouz_table_free').style.display = "none";
            document.getElementById('Update_Randevou_div').style.display = "none";
            document.getElementById('Delete_Randevou_div').style.display = "none";
            document.getElementById('user_table').style.display = "block";
            
            document.getElementById('bloodtest_table').style.display = "block";
            
            
            document.getElementById("bloodtest_table").innerHTML = text;
            document.getElementById("save_message__").innerHTML = "Successfully request for bloodtests and treatments";
            document.getElementById("save_message__").style.color = "green";
            getTreatment();
            
        } else if (xhr.status === 405 || xhr.status === 409) {
            document.getElementById("save_message__").innerHTML = "Bad request for bloodtests";
            document.getElementById('treatment_table').style.display = "none";
            document.getElementById('bloodtest_table').style.display = "none";
            document.getElementById("save_message__").style.color = "red";
        }
        else if (xhr.status === 404) {
            document.getElementById("save_message__").innerHTML = "This user id or amka dont have bloodtest analysis yet";
            document.getElementById('treatment_table').style.display = "none";
            document.getElementById('bloodtest_table').style.display = "none";
            document.getElementById("save_message__").style.color = "red";
        }
    };
    
    const data = {};
    formData.forEach((value, key) => (data[key] = value));
    xhr.open('POST', 'Get_BloodTests');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send(JSON.stringify(data));
}


function getTreatment() {
    event.preventDefault();
    
    let myForm = document.getElementById('get_bloodtest');
    let formData = new FormData(myForm);
    var xhr = new XMLHttpRequest();
    
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            
            document.getElementById('treatment_table').style.display = "block";
            
            console.log(xhr.responseText);
            let text = "";
            const myObj = JSON.parse(this.responseText);

            text += "<tr><th>Doctor id</th><th>User id</th><th>start date</th><th>end date</th><th>treatment text</th><th>bloodtest id</th></tr>";
            
            for (let x in myObj) {
                text += "<tr><td>" + myObj[x].doctor_id + "</td><td>" + myObj[x].user_id + "</td><td>" + myObj[x].start_date + "</td><td>" + myObj[x].end_date + "</td><td>" + myObj[x].treatment_text + "</td><td>" + myObj[x].bloodtest_id + "</td></tr>";
            }
            
            document.getElementById("treatment_table").innerHTML = text;

        } else if (xhr.status !== 200) {
            document.getElementById('treatment_table').style.display = "none";
            console.log(xhr.status);
        }
    };
    const data = {};
    formData.forEach((value, key) => (data[key] = value));
    xhr.open('POST', 'Get_Treatment');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send(JSON.stringify(data));
}


function add_treatment() {
    event.preventDefault();

    let myForm = document.getElementById('add_treatment_form');
    let formData = new FormData(myForm);
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {

        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById('success_message').style.color = "green";
            document.getElementById('success_message').innerHTML = "Added Treatment Successfully!";
        
        } else if (xhr.status === 405 || xhr.status === 403 ) { //ERROR
            document.getElementById('success_message').style.color = "red";
            document.getElementById('success_message').innerHTML = "ERROR to add Treatment form!";
        }
    };
    const data = {};
    formData.forEach((value, key) => (data[key] = value));
    xhr.open('POST', 'Add_Treatment');
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify(data));
}


function take_datetime(){
    console.log("geia sas paidia!");
    
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    
    var date_time = date +" "+ time;
    document.getElementById('_datetime').value = date_time;
    console.log(date_time);
    
}


function for_get_messages_div(){
    event.preventDefault();
    document.getElementById("Get_Doctor_Randevou").style.display = "none";
    
    document.getElementById("Get_User_Message").style.display = "block";
    document.getElementById("Send_Messages_div").style.display = "block";
    document.getElementById("Add_Randevouz_div").style.display = "none";
    document.getElementById('randevouz_table_done').style.display = "none";
    document.getElementById('randevouz_table_free').style.display = "none";
    document.getElementById('Update_Randevou_div').style.display = "none";
    document.getElementById('Delete_Randevou_div').style.display = "none";
    document.getElementById('user_table').style.display = "none";
    document.getElementById('Get_User_Bloodtest').style.display = "none";
    document.getElementById('Add_Treatment_div').style.display = "none";
    document.getElementById('messages_table').style.display = "none";
    document.getElementById('bloodtest_table').style.display = "none";
    document.getElementById('treatment_table').style.display = "none";
    
    
}


function seeMessages(){
    event.preventDefault();
    
    let myForm = document.getElementById('get_all_messages_form');
    let formData = new FormData(myForm);
    var xhr = new XMLHttpRequest();
    
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            
            document.getElementById("Add_Randevouz_div").style.display = "none";
            document.getElementById('randevouz_table_done').style.display = "none";
            document.getElementById('randevouz_table_free').style.display = "none";
            document.getElementById('Update_Randevou_div').style.display = "none";
            document.getElementById('Delete_Randevou_div').style.display = "none";
            document.getElementById('user_table').style.display = "none";
            document.getElementById('Get_User_Bloodtest').style.display = "none";
            document.getElementById('Add_Treatment_div').style.display = "none";
            document.getElementById('messages_table').style.display = "block";
            
            
            console.log(xhr.responseText);
            let text = "";
            const myObj = JSON.parse(this.responseText);

            text += "<tr><th>Doctor id</th><th>User id</th><th>Date & Time</th><th>Message</th><th>Sender</th><th>Blood Doonor</th><th>Blood Type</th></tr>";
            for (let x in myObj) {
                text += "<tr><td>" + myObj[x].doctor_id + "</td><td>" + myObj[x].user_id + "</td><td>" + myObj[x].date_time + "</td><td>" + myObj[x].message + "</td><td>" + myObj[x].sender+ "</td><td>" + myObj[x].blood_donation + "</td><td>" + myObj[x].bloodtype + "</td></tr>";
            }
            document.getElementById('_save_message__').style.color = "green";
            document.getElementById('_save_message__').innerHTML = "See Messages Successfully!";
            
            
            document.getElementById("messages_table").innerHTML = text;

        } else if (xhr.status !== 200) {
            document.getElementById('messages_table').style.display = "none";
            document.getElementById('_save_message__').style.color = "red";
            document.getElementById('_save_message__').innerHTML = "ERROR to get Messages!";
        }
    };
    const data = {};
    formData.forEach((value, key) => (data[key] = value));
    xhr.open('POST', 'See_Messages');
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify(data));
}


function send_message(){
    event.preventDefault();

    let myForm = document.getElementById('send_message_form');
    let formData = new FormData(myForm);
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {

        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById('_success_message').style.color = "green";
            document.getElementById('_success_message').innerHTML = "Message Sended Successfully!";
        
        } else if (xhr.status !== 200) { //ERROR
            document.getElementById('_success_message').style.color = "red";
            document.getElementById('_success_message').innerHTML = "Send Message Failed!";
        }
    };
    const data = {};
    formData.forEach((value, key) => (data[key] = value));
    xhr.open('POST', 'Send_Message');
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify(data));
}