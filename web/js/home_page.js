function calculateBMI() {
    event.preventDefault();
    const data = null;

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            console.log(this.responseText);
            const Obj = JSON.parse(this.responseText);
            if (Obj !== undefined) {
                document.getElementById("calculated_bmi").innerHTML = Obj.data.bmi;
                document.getElementById("calculated_health").innerHTML = Obj.data.health;
                if (Obj.data.health === "Overweight") {
                    document.getElementById("calculated_health").style.color = "Red";
                } else if (Obj.data.health === "Normal") {
                    document.getElementById("calculated_health").style.color = "Green";
                } else {
                    document.getElementById("calculated_health").style.color = "aliceblue";
                }
            }
        }
    });

    age = getAge();

    document.getElementById("height").disabled = false;

    height = document.getElementById("height").value;

    document.getElementById("height").disabled = true;

    document.getElementById("weight").disabled = false;

    weight = document.getElementById("weight").value;

    document.getElementById("weight").disabled = true;

    xhr.open("GET", "https://fitness-calculator.p.rapidapi.com/bmi?age=" + age + "&weight=" + weight + "&height=" + height);
    xhr.setRequestHeader("x-rapidapi-host", "fitness-calculator.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "62f48508a7msh75e168ca12ba2e6p18c7eajsna9518b8500e9");

    xhr.send(data);
}

function getIdealWeight() {
    event.preventDefault();
    const data = null;

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            console.log(this.responseText);
            const Obj = JSON.parse(this.responseText);
            if (Obj !== undefined) {
                document.getElementById("calculated_ideal_weight").innerHTML = Obj.data.Devine;

            }
        }
    });

    document.getElementsByName("gender")[0].disabled = false;

    document.getElementsByName("gender")[1].disabled = false;


    if (document.getElementsByName("gender")[0].checked === true) {
        gender = "male";
    } else if (document.getElementsByName("gender")[1].checked === true) {
        gender = "female";
    } else if (document.getElementsByName("gender")[2].checked === true) { //OTHER
        return false;
    }

    document.getElementsByName("gender")[0].disabled = true;

    document.getElementsByName("gender")[1].disabled = true;

    document.getElementById("height").disabled = false;

    height = document.getElementById("height").value;

    document.getElementById("height").disabled = true;


    xhr.open("GET", "https://fitness-calculator.p.rapidapi.com/idealweight?gender=" + gender + "&height=" + height);
    xhr.setRequestHeader("x-rapidapi-host", "fitness-calculator.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "62f48508a7msh75e168ca12ba2e6p18c7eajsna9518b8500e9");

    xhr.send(data);
}

function getAge() {
    var Bdate = document.getElementById('birthdate').value;
    var Bday = +new Date(Bdate);
    var age = ~~((Date.now() - Bday) / (31557600000));
    console.log(age);
    return age;
}

function getCertifiedDoctors() {
    event.preventDefault();
    console.log("In getCertifiedDoctors();");
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById('personal_info_box').style.display = "none";
            document.getElementById('ideal_weight_box').style.display = "none";
            document.getElementById('attack_check').style.display = "none";
            document.getElementById('bmi_box').style.display = "none";
            document.getElementById("save_message").innerHTML = "";

            console.log(xhr.responseText);
            let text = "";
            const myObj = JSON.parse(this.responseText);

            text += "<tr><th>Firstname</th><th>Lastname</th><th>Address</th><th>City</th><th>Doctor Info</th><th>Specialty</th><th>Phone Number</th></tr>";
            for (let x in myObj) {

                text += "<tr><td>" + myObj[x].firstname + "</td><td>" + myObj[x].lastname + "</td><td>" + myObj[x].address + "</td><td>" + myObj[x].city + "</td><td>" + myObj[x].doctor_info + "</td><td>" + myObj[x].specialty + "</td><td>" + myObj[x].telephone + "</td></tr>";


            }

            document.getElementById("doctor_table").innerHTML = text;

            document.getElementById('doctor_table').style.display = "block";

            document.querySelector('footer').style.position = "fixed";



        } else if (xhr.status !== 200) {
            console.log(xhr.status);
        }
    };
    xhr.open('GET', 'CertifiedDoctors');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send();

}