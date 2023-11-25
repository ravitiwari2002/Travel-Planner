var myLatLng = { lat: 36.966428, lng: -95.844032 };    //default coordinates
var mapOptions = {
  center: myLatLng,
  zoom: 5,
  mapTypeId: google.maps.MapTypeId.ROADMAP
};

document.getElementById("output").style.display = "none";

var map = new google.maps.Map(document.getElementById('google-map'), mapOptions);

var directionsService = new google.maps.DirectionsService();
var directionsDisplay = new google.maps.DirectionsRenderer();
directionsDisplay.setMap(map);

function calcRoute() {
  var request = {
    origin: document.getElementById("origin").value,
    destination: document.getElementById("dest").value,
    travelMode: google.maps.TravelMode.DRIVING,
    unitSystem: google.maps.UnitSystem.Imperial
  }

  directionsService.route(request, function(result, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      $("#output").html("<div class='result-table'> Distance: " + result.routes[0].legs[0].distance.text + "<br />ETA: " + result.routes[0].legs[0].duration.text + "</div>");
      document.getElementById("output").style.display = "block";

      directionsDisplay.setDirections(result);
    } else {
      directionsDisplay.setDirections({ routes: [] });
      map.setCenter(myLatLng);

      alert("Can't find road! Please try again!");
      clearRoute();
    }
  });
}

function clearRoute() {
  document.getElementById("output").style.display = "none";
  document.getElementById("origin").value = "";
  document.getElementById("dest").value = "";
  directionsDisplay.setDirections({ routes: [] });
}

var options = {
  types: ['(cities)']
}

var input1 = document.getElementById("origin");
var autocomplete1 = new google.maps.places.Autocomplete(input1, options);

var input2 = document.getElementById("dest");
var autocomplete2 = new google.maps.places.Autocomplete(input2, options);