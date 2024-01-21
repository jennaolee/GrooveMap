
const x = document.getElementById("demo");
const y = document.getElementById("demo2");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    x.innerHTML = "Latitude: " + lat + 
    "<br>Longitude: " + long;
    getISO(lat, long);

}

function showError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      x.innerHTML = "User denied the request for Geolocation."
      break;
    case error.POSITION_UNAVAILABLE:
      x.innerHTML = "Location information is unavailable."
      break;
    case error.TIMEOUT:
      x.innerHTML = "The request to get user location timed out."
      break;
    case error.UNKNOWN_ERROR:
      x.innerHTML = "An unknown error occurred."
      break;
  }
}

async function getISO(lat, long) {
    let ISOData
    let iso = await fetch('http://api.geonames.org/countryCodeJSON?lat=' + lat + '&lng=' + long + '&username=jolee') .then(response => response.json()) .then(data => ISOData = data) .catch(error => console.error(error)); 
    // let json = JSON.parse(iso);
    y.innerHTML = "ISO:" + ISOData["countryCode"];
    console.log(ISOData);
}
