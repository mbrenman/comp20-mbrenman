var orangeLine = [[["Oak Grove", "42.43668", "-71.07109699999999"], ["Malden Center", "42.426632", "-71.07411"], ["Wellington", "42.40237", "-71.077082"], ["Sullivan", "42.383975", "-71.076994"], ["Community College", "42.373622", "-71.06953300000001"], ["North Station", "42.365577", "-71.06129"], ["Haymarket", "42.363021", "-71.05829"], ["State Street", "42.358978", "-71.057598"], ["Downtown Crossing", "42.355518", "-71.060225"], ["Chinatown", "42.352547", "-71.062752"], ["Tufts Medical", "42.349662", "-71.063917"], ["Back Bay", "42.34735", "-71.075727"], ["Mass Ave", "42.341512", "-71.083423"], ["Ruggles", "42.336377", "-71.088961"], ["Roxbury Crossing", "42.331397", "-71.095451"], ["Jackson Square", "42.323132", "-71.099592"], ["Stony Brook", "42.317062", "-71.104248"], ["Green Street", "42.310525", "-71.10741400000001"], ["Forest Hills", "42.300523", "-71.113686"]]];
var blueLine = [[["Bowdoin", "42.361365", "-71.062037"], ["Government Center", "42.359705", "-71.05921499999999"], ["State Street", "42.358978", "-71.057598"], ["Aquarium", "42.359784", "-71.051652"], ["Maverick", "42.36911856", "-71.03952958000001"], ["Airport", "42.374262", "-71.030395"], ["Wood Island", "42.3796403", "-71.02286539000001"], ["Orient Heights", "42.386867", "-71.00473599999999"], ["Suffolk Downs", "42.39050067", "-70.99712259"], ["Beachmont", "42.39754234", "-70.99231944"], ["Revere Beach", "42.40784254", "-70.99253321"], ["Wonderland", "42.41342", "-70.991648"]]]
var redLine = [[["Alewife", "42.395428", "-71.142483"], ["Davis", "42.39674", "-71.121815"], ["Porter Square", "42.3884", "-71.11914899999999"], ["Harvard Square", "42.373362", "-71.118956"], ["Central Square", "42.365486", "-71.103802"], ["Kendall/MIT", "42.36249079", "-71.08617653"], ["Charles/MGH", "42.361166", "-71.070628"], ["Park Street", "42.35639457", "-71.0624242"], ["Downtown Crossing", "42.355518", "-71.060225"], ["South Station", "42.352271", "-71.05524200000001"], ["Broadway", "42.342622", "-71.056967"], ["Andrew", "42.330154", "-71.057655"], ["JFK/UMass", "42.320685", "-71.052391"], ["North Quincy", "42.275275", "-71.029583"], ["Wollaston", "42.2665139", "-71.0203369"], ["Quincy Center", "42.251809", "-71.005409"], ["Quincy Adams", "42.233391", "-71.007153"], ["Braintree", "42.2078543", "-71.0011385"]], [["JFK/UMass", "42.320685", "-71.052391"], ["Savin Hill", "42.31129", "-71.053331"], ["Fields Corner", "42.300093", "-71.061667"], ["Shawmut", "42.29312583", "-71.06573796000001"], ["Ashmont", "42.284652", "-71.06448899999999"]]]

var tlines = {
	"red"    : redLine,
	"blue"   : blueLine,
	"orange" : orangeLine
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
	getScheduleData();
}

function getScheduleData(){
	xhr = new XMLHttpRequest();
	xhr.open("get", "http://mbtamap.herokuapp.com/mapper/rodeo.json", true); // this is possible because of cross-origin resource sharing (CORS) enabled for web application
	xhr.onreadystatechange = dataReady;
	xhr.send(null); // Go! Execute!
}

function dataReady() {
	if (xhr.readyState == 4 && xhr.status == 200) {
		scheduleData = JSON.parse(xhr.responseText);
		getMyLocation(); //Start making the map only after we know what line we should render
	}
	else if (xhr.readyState == 4 && xhr.status == 500) {
		getScheduleData(); //Try again and never have an error
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

	renderTLine(scheduleData["line"]);

	// Open info window on click of marker
	google.maps.event.addListener(marker, 'click', function() {
		infowindow.setContent(displayClosestStation());
		infowindow.open(map, marker);
	});
}

function displayClosestStation()
{
	line = tlines[scheduleData["line"]];
	shortestDist = 9999999;
	closestStation = ""
	for (b in line) {
		branch = line[b];
		for (s in branch) {
			stop = branch[s];
			dist = haversine(myLat,myLng,stop[1],stop[2]);
			if (dist < shortestDist) {
				shortestDist = dist;
				closestStation = stop[0];
			}
		}
	}
	return "<h2>You are here</h2><div>The closest station to you is <strong>" + closestStation + "</strong>, which is ~" + shortestDist + " miles away from you.</div>";
}

function haversine(lat1, lon1, lat2, lon2){
	//From: http://www.movable-type.co.uk/scripts/latlong.html
	var R = 6371; // km
	var dLat = toRad((lat2-lat1));
	var dLon = toRad((lon2-lon1));
	var lat1 = toRad(lat1);
	var lat2 = toRad(lat2);

	var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	var d = R * c;
	return d / 1.609344; //To be miles
}

function toRad(num)
{
	return num * Math.PI / 180;
}

function renderTLine(color)
{
	lineColor = chooseColor(color);
	tstationline = tlines[color]
	for (i in tstationline) {
		line = tstationline[i];
		stopLatLngArr = new Array();
		for (s in line) {
			station = line[s];
			name = station[0];
			loc = new google.maps.LatLng(station[1], station[2]);
			stopLatLngArr.push(loc);
			addTStation(name, loc, map);
		}
		addPolyLine(stopLatLngArr, map, lineColor)
	}
}

function addTStation(name, loc, map){
	t_icon = 'images/stop.png';
	stationMarker = new google.maps.Marker({
		position: loc,
		title: name, // Station name
		icon: t_icon
	});
	stationMarker.setMap(map);
	google.maps.event.addListener(stationMarker, 'click', (function(m) {
		return function() {
			infowindow.setContent(makeScheduleTable(m.title));
			infowindow.open(map, m);
		}
	})(stationMarker));
}

function makeScheduleTable(stop)
{
	tbl = "<table style='border: 1px solid black;'>"
			+	"<tr style='border: 1px solid black;'>"
			+		"<td style='border: 1px solid black; font-weight:bold;'>Stop</td>"
			+		"<td style='border: 1px solid black; font-weight:bold;'>Time Remaining</td>" 
			+		"<td style='border: 1px solid black; font-weight:bold;'>Destination</td>" 
			+		"<td style='border: 1px solid black; font-weight:bold;'>Trip ID</td>"
			+	"</tr>";
	trains = scheduleData["schedule"];
	tableElems = pullStopPredictionData(stop);
	tableElems = tableElems.sort(function(a,b){ return a[1] - b[1] });
	for (t in tableElems){
		row = tableElems[t];
		tbl += "<tr style='border: 1px solid black;'>";
		for (i in row) {
			tbl += "<td style='border: 1px solid black;'>" + row[i] + "</td>";
		}
		tbl += "</tr>";
	}
	tbl += "</table>";
	return tbl;
}

function pullStopPredictionData(stop)
{
	tableElems = [];
	for (t in trains) {
		train = trains[t];
		dest = train["Destination"];
		predicts = train["Predictions"];
		
		for (p in predicts) {
			stationData = predicts[p];
			if (stationData["Stop"] == stop) {
				pred = [stop, stationData["Seconds"], dest, train["TripID"]];
				tableElems.push(pred);
			}
		}
	}
	return tableElems;
}

function addPolyLine(stopLatLngArr, map, lineColor){
	var pLine = new google.maps.Polyline({
	  path: stopLatLngArr,
	  geodesic: true,
	  strokeColor: lineColor,
	  strokeOpacity: 1.0,
	  strokeWeight: 7
	});
	pLine.setMap(map);	
}

function chooseColor(color)
{
	if (color == "orange"){
		return "#ffa500"
	} else if (color == "red"){
		return "ff0000"
	} else if (color == "blue"){
		return "#0000ff"
	}
}

function createMarker(place)
{
	var placeLoc = place.geometry.location;
	var image = 'stop.png'
	var marker = new google.maps.Marker({
		map: map,
		position: placeLoc,
		icon: image
	});

	google.maps.event.addListener(marker, 'click', function() {
		infowindow.close();
		infowindow.setContent(place.name);
		infowindow.open(map, this);
	});
}