
function draw() {
    canvas = document.getElementById('game');
    // Check if canvas is supported on browser
    if (canvas.getContext) {
        ctx = canvas.getContext('2d');
        var sprite_sheet = new Image();
        sprite_sheet.onload = function(){
        	var x = 0;
        	var y = 0;
        	sizex = 60;
        	sizey = 57;
        	ctx.drawImage(sprite_sheet, x*sizex, y*sizey, sizex, sizey, 0, 0, sizex, sizey);

        };
        sprite_sheet.src = 'assets/duckhunt.png';
    } 
    else {
        alert('Sorry, canvas is not supported on your browser!');
    }
}