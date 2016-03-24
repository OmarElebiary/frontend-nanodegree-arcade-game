// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed *dt;
    //make enemies move again after reaching canvas.width
    if (this.x >= 505) {
        this.x = 0;
    }
    //Check for collision
    checkCollision(this);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y,speed){
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = "images/char-boy.png";
};
Player.prototype.update = function(){}
//Draw the Player on screen
Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite),this.x,this.y);
};
Player.prototype.handleInput = function(keyPress){
    if (keyPress == 'left') {
        player.x -= player.speed;
    } else if (keyPress == 'right') {
        player.x += player.speed;
    } else if (keyPress == 'up') {
        player.y -= player.speed;
    } else if (keyPress == 'down') {
        player.y += player.speed;
    }
};

//Gems (not Working)
var Gems = function(x,y){
    this.x = x;
    this.y = y;
    this.sprite = "images/gem-blue.png";
};
//Update
Gems.prototype.update = function(){
    
};
//Render Gems
Gems.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite),this.x,this.y); 
};

//Check for collision
var checkCollision = function(anEnemy) {
    if (player.y+131 >= anEnemy.y+90 && player.x+25 <= anEnemy.x+88 && player.y+73 <= anEnemy.y+135 && player.x+76>=anEnemy.x+11) {
        player.x = 202.5;
        player.y = 383;
        console.log('collision');
    }
    //check if player reached the end of canvas
    if (player.y+63 <= 0) {
        player.x = 202.5;
        player.y = 383;
        score++;
        console.log(score); 

        ctx.fillStyle = 'white';
        ctx.fillRect(0,0,505,171);

        increaseDifficulty(score);
    }
    //Prevent player from exceeding wall boundry
    if (player.y > 383) {player.y = 383;}
    if (player.x > 402.5) {player.x = 402.5;}
    if (player.x < 2.5) {player.x = 2.5;}
};


//increase Diffculty by increase number of bugs
var increaseDifficulty = function(numEnemies){
    allEnemies.length = 0;
    for (var i = 0; i <= numEnemies; i++) {
       var enemy = new Enemy(0, Math.random() * 184 + 50, Math.random() * 256);
        allEnemies.push(enemy);
    }
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new Player(202.5,383,50);
var score = 0;
var enemy = new Enemy(0, Math.random() * 184 + 50, Math.random() * 256);
allEnemies.push(enemy);



var allGems = [];
var gems = new Gems(Math.random() * 180, Math.random() * 200);
allGems.push(gems);
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
