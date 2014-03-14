var blueLine = [["Airport", "42.374262", "-71.030395"], ["Aquarium", "42.359784", "-71.051652"], ["Beachmont", "42.39754234", "-70.99231944"], ["Bowdoin", "42.361365", "-71.062037"], ["Government Center", "42.359705", "-71.05921499999999"], ["Maverick", "42.36911856", "-71.03952958000001"], ["Orient Heights", "42.386867", "-71.00473599999999"], ["Revere Beach", "42.40784254", "-70.99253321"], ["State Street", "42.358978", "-71.057598"], ["Suffolk Downs", "42.39050067", "-70.99712259"], ["Wonderland", "42.41342", "-70.991648"], ["Wood Island", "42.3796403", "-71.02286539000001"]];
var redLine = [["Alewife", "42.395428", "-71.142483"], ["Andrew", "42.330154", "-71.057655"], ["Ashmont", "42.284652", "-71.06448899999999"], ["Braintree", "42.2078543", "-71.0011385"], ["Broadway", "42.342622", "-71.056967"], ["Central Square", "42.365486", "-71.103802"], ["Charles/MGH", "42.361166", "-71.070628"], ["Davis", "42.39674", "-71.121815"], ["Downtown Crossing", "42.355518", "-71.060225"], ["Fields Corner", "42.300093", "-71.061667"], ["Harvard Square", "42.373362", "-71.118956"], ["JFK/UMass", "42.320685", "-71.052391"], ["Kendall/MIT", "42.36249079", "-71.08617653"], ["North Quincy", "42.275275", "-71.029583"], ["Park Street", "42.35639457", "-71.0624242"], ["Porter Square", "42.3884", "-71.11914899999999"], ["Quincy Adams", "42.233391", "-71.007153"], ["Quincy Center", "42.251809", "-71.005409"], ["Savin Hill", "42.31129", "-71.053331"], ["Shawmut", "42.29312583", "-71.06573796000001"], ["South Station", "42.352271", "-71.05524200000001"], ["Wollaston", "42.2665139", "-71.0203369"]];
var orangeLine = [["Back Bay", "42.34735", "-71.075727"], ["Chinatown", "42.352547", "-71.062752"], ["Community College", "42.373622", "-71.06953300000001"], ["Downtown Crossing", "42.355518", "-71.060225"], ["Forest Hills", "42.300523", "-71.113686"], ["Green Street", "42.310525", "-71.10741400000001"], ["Haymarket", "42.363021", "-71.05829"], ["Jackson Square", "42.323132", "-71.099592"], ["Malden Center", "42.426632", "-71.07411"], ["Mass Ave", "42.341512", "-71.083423"], ["North Station", "42.365577", "-71.06129"], ["Oak Grove", "42.43668", "-71.07109699999999"], ["Roxbury Crossing", "42.331397", "-71.095451"], ["Ruggles", "42.336377", "-71.088961"], ["State Street", "42.358978", "-71.057598"], ["Stony Brook", "42.317062", "-71.104248"], ["Sullivan", "42.383975", "-71.076994"], ["Tufts Medical", "42.349662", "-71.063917"], ["Wellington", "42.40237", "-71.077082"]];
var tlines = {
	"Red"    : redLine,
	"Blue"   : blueLine,
	"Orange" : orangeLine
};

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

var xhr;
var scheduleData;

function init()
{
	map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
	getMyLocation();
}

function getScheduleData(){
	xhr = new XMLHttpRequest();
	xhr.open("get", "http://mbtamap.herokuapp.com/mapper/rodeo.json", true); // this is possible because of cross-origin resource sharing (CORS) enabled for web application

	// onreadystatechange has to be set to a...
	// ...function when request is completed, to...
	// ...handle the response
	xhr.onreadystatechange = dataReady;
	xhr.send(null); // Go! Execute!
}

function dataReady() {
	// The readyState numbers:
	// 0 = not initialized
	// 1 = Set up
	// 2 = Sent
	// 3 = In progress
	// 4 = Complete
	if (xhr.readyState == 4 && xhr.status == 200) {
		scheduleData = JSON.parse(xhr.responseText);
		console.log(scheduleData);
	}
	else if (xhr.readyState == 4 && xhr.status == 500) {
		console.log("HIT AN ERROR");
		getScheduleData();
	}
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

	renderTLine("Red");
	renderTLine("Blue");
	renderTLine("Orange");

	// Open info window on click of marker
	google.maps.event.addListener(marker, 'click', function() {
		infowindow.setContent(marker.title);
		infowindow.open(map, marker);
	});
	alert ("should be rendered!")
}

function renderTLine(color)
{
	tstationline = tlines[color]
	for (i in tstationline) {
		station = tstationline[i];
		name = station[0];
		loc = new google.maps.LatLng(station[1], station[2]);
		stationMarker = new google.maps.Marker({
			position: loc,
			title: name // Station name
		});
		// console.log(name);
		stationMarker.setMap(map);

		// console.log("new");

		google.maps.event.addListener(stationMarker, 'click', (function(m) {
			return function() {
				infowindow.setContent(m.title);
				infowindow.open(map, m);
			}
		})(stationMarker));
	}
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