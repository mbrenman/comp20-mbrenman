console.log("in js file");

var blueLine = [["Blue", "Airport", "42.374262", "-71.030395"], ["Blue", "Aquarium", "42.359784", "-71.051652"], ["Blue", "Beachmont", "42.39754234", "-70.99231944"], ["Blue", "Bowdoin", "42.361365", "-71.062037"], ["Blue", "Government Center", "42.359705", "-71.05921499999999"], ["Blue", "Maverick", "42.36911856", "-71.03952958000001"], ["Blue", "Orient Heights", "42.386867", "-71.00473599999999"], ["Blue", "Revere Beach", "42.40784254", "-70.99253321"], ["Blue", "State Street", "42.358978", "-71.057598"], ["Blue", "Suffolk Downs", "42.39050067", "-70.99712259"], ["Blue", "Wonderland", "42.41342", "-70.991648"], ["Blue", "Wood Island", "42.3796403", "-71.02286539000001"]]

var myLat = 0;
var myLng = 0;
var request = new XMLHttpRequest();
var me = new google.maps.LatLng(myLat, myLng);
var myOptions = {
			zoom: 13, // The larger the zoom number, the bigger the zoom
			center: me,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
var map;
var marker;
var infowindow = new google.maps.InfoWindow();
var places;

function init()
{
	console.log("in init");
	map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
	getMyLocation();
}

function getMyLocation()
{
	if (navigator.geolocation) { // the navigator.geolocation object is supported on your browser
		navigator.geolocation.getCurrentPosition(function(position) {
			myLat = position.coords.latitude;
			myLng = position.coords.longitude;
			renderMap();
		});
	}
	else {
		alert("Geolocation is not supported by your web browser.  What a shame!");
	}
}

function renderMap()
{
	me = new google.maps.LatLng(myLat, myLng);

	// Update map and go there...
	map.panTo(me);

	// Create a marker
	marker = new google.maps.Marker({
		position: me,
		title: "Here I Am!"
	});
	marker.setMap(map);

	for (i in blueLine) {
		station = blueLine[i];
		console.log(station);
		stationMarker = new google.maps.Marker({
			position: new google.maps.LatLng(station[2], station[3]),
			title: station[1] // Station name
		});
		stationMarker.setMap(map);
	}

	// Open info window on click of marker
	google.maps.event.addListener(marker, 'click', function() {
		infowindow.setContent(marker.title);
		infowindow.open(map, marker);
	});
	alert ("should be rendered!")
}

function createMarker(place)
{
	var placeLoc = place.geometry.location;
	var marker = new google.maps.Marker({
		map: map,
		position: place.geometry.location
	});

	google.maps.event.addListener(marker, 'click', function() {
		infowindow.close();
		infowindow.setContent(place.name);
		infowindow.open(map, this);
	});
}