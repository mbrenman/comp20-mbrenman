console.log("in js file");

var blueLine = [["Blue", "Airport", "42.374262", "-71.030395"], ["Blue", "Aquarium", "42.359784", "-71.051652"], ["Blue", "Beachmont", "42.39754234", "-70.99231944"], ["Blue", "Bowdoin", "42.361365", "-71.062037"], ["Blue", "Government Center", "42.359705", "-71.05921499999999"], ["Blue", "Maverick", "42.36911856", "-71.03952958000001"], ["Blue", "Orient Heights", "42.386867", "-71.00473599999999"], ["Blue", "Revere Beach", "42.40784254", "-70.99253321"], ["Blue", "State Street", "42.358978", "-71.057598"], ["Blue", "Suffolk Downs", "42.39050067", "-70.99712259"], ["Blue", "Wonderland", "42.41342", "-70.991648"], ["Blue", "Wood Island", "42.3796403", "-71.02286539000001"]];
var redLine = [["Red", "Alewife", "42.395428", "-71.142483"], ["Red", "Andrew", "42.330154", "-71.057655"], ["Red", "Ashmont", "42.284652", "-71.06448899999999"], ["Red", "Braintree", "42.2078543", "-71.0011385"], ["Red", "Broadway", "42.342622", "-71.056967"], ["Red", "Central Square", "42.365486", "-71.103802"], ["Red", "Charles/MGH", "42.361166", "-71.070628"], ["Red", "Davis", "42.39674", "-71.121815"], ["Red", "Downtown Crossing", "42.355518", "-71.060225"], ["Red", "Fields Corner", "42.300093", "-71.061667"], ["Red", "Harvard Square", "42.373362", "-71.118956"], ["Red", "JFK/UMass", "42.320685", "-71.052391"], ["Red", "Kendall/MIT", "42.36249079", "-71.08617653"], ["Red", "North Quincy", "42.275275", "-71.029583"], ["Red", "Park Street", "42.35639457", "-71.0624242"], ["Red", "Porter Square", "42.3884", "-71.11914899999999"], ["Red", "Quincy Adams", "42.233391", "-71.007153"], ["Red", "Quincy Center", "42.251809", "-71.005409"], ["Red", "Savin Hill", "42.31129", "-71.053331"], ["Red", "Shawmut", "42.29312583", "-71.06573796000001"], ["Red", "South Station", "42.352271", "-71.05524200000001"], ["Red", "Wollaston", "42.2665139", "-71.0203369"]];
var orangeLine = [["Orange", "Back Bay", "42.34735", "-71.075727"], ["Orange", "Chinatown", "42.352547", "-71.062752"], ["Orange", "Community College", "42.373622", "-71.06953300000001"], ["Orange", "Downtown Crossing", "42.355518", "-71.060225"], ["Orange", "Forest Hills", "42.300523", "-71.113686"], ["Orange", "Green Street", "42.310525", "-71.10741400000001"], ["Orange", "Haymarket", "42.363021", "-71.05829"], ["Orange", "Jackson Square", "42.323132", "-71.099592"], ["Orange", "Malden Center", "42.426632", "-71.07411"], ["Orange", "Mass Ave", "42.341512", "-71.083423"], ["Orange", "North Station", "42.365577", "-71.06129"], ["Orange", "Oak Grove", "42.43668", "-71.07109699999999"], ["Orange", "Roxbury Crossing", "42.331397", "-71.095451"], ["Orange", "Ruggles", "42.336377", "-71.088961"], ["Orange", "State Street", "42.358978", "-71.057598"], ["Orange", "Stony Brook", "42.317062", "-71.104248"], ["Orange", "Sullivan", "42.383975", "-71.076994"], ["Orange", "Tufts Medical", "42.349662", "-71.063917"], ["Orange", "Wellington", "42.40237", "-71.077082"]];

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

	tstationline = redLine
	for (i in tstationline) {
		station = tstationline[i];
		console.log(station);
		stationMarker = new google.maps.Marker({
			position: new google.maps.LatLng(station[2], station[3]),
			title: "Red line test" // Station name
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