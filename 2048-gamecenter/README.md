Assignment 4 - 2048 Gamecenter
Comp 20 Web Programming
Matt Brenman
============
- All aspects of the assignment have been correctly implemented
- No collaboration
- Approx 7 hours spent on this project
- The score and the grid are stored in the game_manager.js file in the original 2048 game, in the GameManager object
 - Accessible by this.score and this.grid
- In order to send the data to my app, I needed to execute a jQuery post command when the game ended
 - I did this from the GameManager.prototype.isGameTerminated function by creating a boolean variable called sent (initially set to false), and only sending if the sent var was false and we were inside the (this.over || (this.won && !this.keepPlaying)) if-statement. 
 -After sending the data, I set the sent var to true to avoid resending multiple times
 -In the HTMLActuator.prototype.continueGame function in html_actuator.js file, I set the sent variable to false, so that a new game (by hitting the 'Try Again' button) would resend the data upon completion even if the user did not refresh the window
 -The post call that I used is is $.post( "http://gamecenter2048.herokuapp.com/submit.json", {score: this.score, grid: JSON.stringify(this.grid), username: 'matt'});