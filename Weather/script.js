let weather = {
  apiKey: "4682b4bd9cce2882dede4a30faa5ef27",
  fetchWeather: function(city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&units=imperial&appid=" +
      this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function(data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°F";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " mph";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";
  },
  search: function() {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

let geocode = {
  reverseGeocode: function(latitude, longitude) {
    var apikey = "19d028ce02b7438d8d860c4e4ce9d56d";

    var api_url = "https://api.opencagedata.com/geocode/v1/json";

    var request_url =
      api_url +
      "?" +
      "key=" +
      apikey +
      "&q=" +
      encodeURIComponent(latitude + "," + longitude) +
      "&pretty=1" +
      "&no_annotations=1";

    var request = new XMLHttpRequest();
    request.open("GET", request_url, true);

    request.onload = function() {

      if (request.status == 200) {

        var data = JSON.parse(request.responseText);
        weather.fetchWeather(data.results[0].components.city);
      } else if (request.status <= 500) {
        alert("Unable to find data: " + request.status);
        var data = JSON.parse(request.responseText);
        alert("Something went wrong! " + data.status.message);
      } else {
        alert("Server Error");
      }
    };

    request.onerror = function() {

      alert("Something went wrong!");
    };

    request.send();
  },
  getLocation: function() {
    function success(data) {
      geocode.reverseGeocode(data.coords.latitude, data.coords.longitude);
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, console.error);
    }
    else {
      weather.fetchWeather("Tempe");
    }
  }
};

document.querySelector(".search button").addEventListener("click", function() {
  weather.search();
});
document
  .querySelector(".search-bar")
  .addEventListener("keyup", function(event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });
geocode.getLocation();