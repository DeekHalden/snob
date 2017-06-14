var innerWidth = window.innerWidth;
var centerX = innerWidth / 2;
var innerHeight = window.innerHeight;
var centerY = innerHeight / 2;
var diamondWidth = 389;
var diamondHeight = 389;

function randomX() {
    var result = Math.floor((Math.random() * window.innerWidth) + 1);
    console.log(result);
    return result;
};
var randomY = function() {
    return Math.floor((Math.random() * window.innerHeight) + 1)
};

var  randomIntFromInterval = function(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

// Enemies our player must avoid
class Dot{
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    constructor(x, y, xMove, yMove) {
        
        this.sprite = 'images/dot.png';
        this.x = x;
        this.y = y;
        this.radius = 4;
        this.speed = Math.floor(Math.random() * 5);
        this.yMove = xMove;
        this.xMove = yMove;
        this.direction = randomIntFromInterval(0,360);
    }
    update(dt) {
        if(this.xMove) {
            this.x += (10/6)*Math.cos(this.direction) + this.speed
        } else {
            this.x -= (10/6)*Math.cos(this.direction) + this.speed
        }
        if(this.yMove) {
            this.y += (10/6)*Math.sin(this.direction) + this.speed
        } else {
            this.y -= (10/6)*Math.sin(this.direction) + this.speed
            
        }
    }
    bounce() {
        
        if (this.x >= innerWidth - this.radius) {
            console.log(1)
            this.x = -(10/6)*Math.sin(this.direction) + this.speed
        }
        if (this.x <= 0 + this.radius) {
            
            this.x = +(10/6)*Math.sin(this.direction) + this.speed
        }
        if (this.y >= innerHeight - this.radius) {
            this.y = -(10/6)*Math.cos(this.direction) + this.speed
        }
        if (this.y <= 0 + this.radius) {
            this.y = +(10/6)*Math.cos(this.direction) + this.speed
        }
    }
    changeDirection(x, y) {

    }
    render() {
        ctx.beginPath();
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }  
};

class SmallDot extends Dot{
    constructor(x,y, xMove,yMove) {
        super(x, y , xMove, yMove)
        this.sprite = 'images/dot--small.png'
        this.speed = Math.floor(Math.random() * 2) + 2;
    }
    update(dt) {
        super.update(dt);
    }
    render() {
        super.render();
    }  

}
    


class Diamond{
    constructor(x, y) {
        this.sprite = 'images/big-diamond.png';
        this.x = x;
        this.y = y;
    }

    render() {
        // ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        // ctx.rotate(45*Math.PI/180)
        // ctx.globalCompositeOperation = "destination-out";
        // gradient = ctx.createLinearGradient(0, 0, diamondWidth, diamondheight);
        // gradient.addColorStop(0, "rgba(0, 0, 0, 0.5)");
        // gradient.addColorStop(1, "rgba(255, 255, 255, 1.0)");
        // ctx.fillStyle = gradient;
        // ctx.fillRect(0, 0, diamondWidth, diamondHeight);
        // console.log(gradient)
    }
    
}

Diamond.prototype.update = function() {}

Diamond.prototype.render = Dot.prototype.render;

var allDots = []
var smallDots = []
for (var i = 0; i < 100; i++) {
    allDots.push(new Dot(centerX, centerY - 4, Math.random() >= 0.5, Math.random() >= 0.5))
    if(i % 3 === 0) {
        smallDots.push(new SmallDot(centerX, centerY - 4, Math.random() >= 0.5, Math.random() >= 0.5))
    }
}




var diamond = new Diamond(centerX - diamondWidth / 2, centerY - diamondHeight / 2);


// var checkCollisions = function (spriteWidth, spriteHeight) {
//     spriteWidth = 50;
//     spriteHeight = 83;
//     for (var i = 0; i < allEnemies.length; i++)

//         if (player.x < allEnemies[i].x + spriteWidth &&
//         player.x + spriteWidth > allEnemies[i].x &&
//         player.y < allEnemies[i].y + 10 &&
//         player.y + spriteHeight > allEnemies[i].y) {
//         resetGame();      
//     }
// };

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
// document.addEventListener('keyup', function(e) {
//     var allowedKeys = {
//         37: 'left',
//         38: 'up',
//         39: 'right',
//         40: 'down'
//     };

//     player.handleInput(allowedKeys[e.keyCode]);
// });
