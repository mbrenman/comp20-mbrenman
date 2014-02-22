

function draw() {
    canvas = document.getElementById('game');
    var width = canvas.getAttribute('width');
    var height = canvas.getAttribute('height');
    // Check if canvas is supported on browser
    if (canvas.getContext) {
        ctx = canvas.getContext('2d');
        var sprite_sheet = new Image();
        sprite_sheet.onload = function dog(){
            // if (x == 4) {return;};
        	//clear background
            // alert('aaa');
        	ctx.fillStyle = "#87CEEB";
        	ctx.fillRect(0,0,width,height);

        	console.log(x);
        	var x = 0;
        	var y = 0;
        	var sizex = 0;
        	var sizey = 0;

            x = 0
            sizex = 77
            y = 273
            sizey = 122
            //Draw tree
            ctx.drawImage(sprite_sheet, x, y, sizex, sizey, width/3, height-sizey-180, 1.7*sizex, 1.7*sizey);

            x = 0
            sizex = 900
            y = 715
            sizey = 185
            //Draw ground
            ctx.drawImage(sprite_sheet, x, y, sizex, sizey, 0, height-sizey, sizex, sizey);

            x = 0;
            y = 0;
            sizex = 60;
            sizey = 57;
            //Draw dog
            ctx.drawImage(sprite_sheet, x*sizex, y*sizey, sizex, sizey, 100, height-(1.5*sizey), 1.5*sizex, 1.5*sizey);

            x = 130;
            y = 118;
            sizex = 34;
            sizey = 24;
            //Draw duck1
            ctx.drawImage(sprite_sheet, x, y, sizex, sizey, 200, 400, sizex, sizey);

            x = 341;
            y = 118;
            sizex = 32;
            sizey = 30;
            //Draw duck2
            ctx.drawImage(sprite_sheet, x, y, sizex, sizey, 600, 200, sizex, sizey);

            x = 341;
            y = 198;
            sizex = 32;
            sizey = 30;
            //Draw duck3
            ctx.drawImage(sprite_sheet, x, y, sizex, sizey, 400, 100, sizex, sizey);

            x = 4;
            y = 157;
            sizex = 25;
            sizey = 31;
            //Draw duck4
            ctx.drawImage(sprite_sheet, x, y, sizex, sizey, 100, 50, sizex, sizey);

            x = 170;
            y = 118;
            sizex = 34;
            sizey = 24;
            //Draw duck5
            ctx.drawImage(sprite_sheet, x, y, sizex, sizey, 550, 400, sizex, sizey);
        };
        sprite_sheet.src = 'assets/duckhunt.png';
    } 
    else {
        alert('Sorry, canvas is not supported on your browser!');
    }
}

