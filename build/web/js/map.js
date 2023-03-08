// Map definition
var map = new OpenLayers.Map("Map");
var mapnik = new OpenLayers.Layer.OSM();
map.addLayer(mapnik);
document.getElementById("Map").style.display = "none";

function checkAddress() {
    event.preventDefault();
    var country = document.getElementById("country").value;
    var city = document.getElementById("city").value;
    var address = document.getElementById("address").value;

    if (country !== "Choose Country" && city !== "" && address !== "") {
        console.log(country);
        console.log(city);
        console.log(address);
        document.getElementById("address_error").style.display = "none";
        loadDoc(country, city, address);
    } else {
        document.getElementById("address_error").style.display = "block";
        if (country === "Choose Country") {
            document.getElementById("address_error").innerHTML = "Input Country!";
        } else if (city === "") {
            document.getElementById("address_error").innerHTML = "Input City!";
        } else if (address === "") {
            document.getElementById("address_error").innerHTML = "Input Address!";
        }

    }
}

function loadDoc(country, city, addressName) {
    const data = null;
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            const obj = JSON.parse(xhr.responseText);
            console.log(obj[0]);
            if (obj[0] === undefined) {
                document.getElementById("address_error").innerHTML = "Address not found!";
                document.getElementById("address_error").style.display = "block";
                if (markers !== null) { // remove marker if address not found
                    markers.removeMarker(mar);
                    map.setCenter(position, 2);
                }
            } else {
                var lat = obj[0].lat;
                var lon = obj[0].lon;
                var text = obj[0].display_name;

                if (text.includes("Crete")) {
                    createMarker(lat, lon);
                } else {
                    if (markers !== null) {
                        markers.removeMarker(mar);
                        map.setCenter(position, 2);
                    }
                    document.getElementById("address_error").innerHTML = "Service available only<br>in Crete at the moment!";
                    document.getElementById("address_error").style.fontSize = "10px";
                    document.getElementById("address_error").style.display = "block";
                }
                console.log(text);
                console.log(lat);
                console.log(lon);
            }

            document.getElementById("Map").style.display = "block";

            document.getElementById("lat").value = lat;

            document.getElementById("lon").value = lon;

        }
    });

    var address = addressName + " " + city + " " + country;

    xhr.open("GET", "https://forward-reverse-geocoding.p.rapidapi.com/v1/search?q=" + address + "&acceptlanguage=en&polygon_threshold=0.0");
    xhr.setRequestHeader("x-rapidapi-host", "forward-reverse-geocoding.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "62f48508a7msh75e168ca12ba2e6p18c7eajsna9518b8500e9");

    xhr.send(data);
}


//Orismos Thesis
function setPosition(lat, lon) {
    var fromProjection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
    var toProjection = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection
    var position = new OpenLayers.LonLat(lon, lat).transform(fromProjection, toProjection);
    return position;
}

//Orismos Handler

function handler(position, message) {
    var popup = new OpenLayers.Popup.FramedCloud("Popup",
            position, null,
            message, null,
            true // <-- true if we want a close (X) button, false otherwise
            );
    map.addPopup(popup);


}
var mar;
var markers;
var position;
function createMarker(lat, lon) {

    //Markers	
    markers = new OpenLayers.Layer.Markers("Markers");
    map.addLayer(markers);

    //Protos Marker	
    position = setPosition(lat, lon);
    //Orismos zoom	
    const zoom = 16;
    map.setCenter(position, zoom);
    mar = new OpenLayers.Marker(position);
    markers.addMarker(mar);
    mar.events.register('mousedown', mar, function (evt) {
        handler(position, 'Your Address');
    }
    );


}

function getLocation() {
    event.preventDefault();
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {

    var lat = position.coords.latitude;
    var lon = position.coords.longitude;

    requestLocation(lat, lon);
}

function requestLocation(lat, lon) {
    const data = null;

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            var obj = JSON.parse(this.responseText);
            if (obj !== undefined) {

                country = obj.address.country;
                city = obj.address.city_district;
                address = obj.address.road;

                document.getElementById("country").value = country;
                if (city.includes("Heraklion")) {
                    document.getElementById("city").value = "Heraklion";
                } else {
                    document.getElementById("city").value = city;
                }

                document.getElementById("address").value = address;
            }

        }
    });

    xhr.open("GET", "https://forward-reverse-geocoding.p.rapidapi.com/v1/reverse?lat=" + lat + "&lon=" + lon + "&accept-language=en&polygon_threshold=0.0");
    xhr.setRequestHeader("x-rapidapi-host", "forward-reverse-geocoding.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "62f48508a7msh75e168ca12ba2e6p18c7eajsna9518b8500e9");

    xhr.send(data);
}







