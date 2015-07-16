//geolocation.js

var map = null;
var BostonCoords =  {latitude: 42.3599723,longitude: -71.0600867};

//create anonymous function here which uses the Modernizr JavaScript library to detect browser support for geolocation
	


//create a function called showLocation that takes position as a parameter	




function displayMap(coords)
{
	var googleLatAndLong = new google.maps.LatLng(coords.latitude, coords.longitude);
	var mapOptions = {
		zoom: 10,
		center: googleLatAndLong,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var mapDiv = document.getElementById("map");
	map = new google.maps.Map(mapDiv, mapOptions);

	var title = "You are here";
	var content = "You are here: " + coords.latitude + ", " + coords.longitude;
	addMarker(map, googleLatAndLong, title, content);

}

function addMarker(map, latlong, title, content)
{
	var markerOptions = {
		position: latlong,
		map: map,
		title: title,
		clickable: true
	};
	var marker = new google.maps.Marker(markerOptions);

	var infoWindowOptions = {
		content: content,
		position: latlong
	};

	var infoWindow = new google.maps.InfoWindow(infoWindowOptions);

	google.maps.event.addListener(marker, 'click', function() {
		infoWindow.open(map);
	});
}

//***************error handling callback function
function displayError(error)
{
	var errorTypes = {0: "Unknown error",1: "Permission denied",2: "Position is not available",3: "Request timeout"};
	var errorMessage = errorTypes[error.code];
	if (error.code == 0 || error.code == 2)
	{
		errorMessage = errorMessage + " " + error.message;
	}	
	
	var loc = document.getElementById("location");
	loc.innerHTML = errorMessage;
}


//*************** Use Spherical Law of Cosines to find the distance between two lat/long points (since Earth is curved)

function findDistance(begCoords, endCoords)
{
	var begLatRads = degreesToRadians(begCoords.latitude);
	var begLongRads = degreesToRadians(begCoords.longitude);
	var endLatRads = degreesToRadians(endCoords.latitude);
	var endLongRads = degreesToRadians(endCoords.longitude);

	var Radius = 3959; // radius of Earth in miles
	var distance = Math.acos(Math.sin(begLatRads) * Math.sin(endLatRads) + 
					Math.cos(begLatRads) * Math.cos(endLatRads) *
					Math.cos(begLongRads - endLongRads)) * Radius;

	return distance;
}

function degreesToRadians(degrees)
{
	radians = (degrees * Math.PI)/180;
	return radians;
}


