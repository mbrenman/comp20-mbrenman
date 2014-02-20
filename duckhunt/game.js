
function draw() {
    canvas = document.getElementById('game');
    // Check if canvas is supported on browser
    if (canvas.getContext) {
        ctx = canvas.getContext('2d');
        //...
    } 
    else {
        alert('Sorry, canvas is not supported on your browser!');
    }
}