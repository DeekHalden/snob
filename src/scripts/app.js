var innerWidth = window.innerWidth;
var centerX = innerWidth / 2;
var innerHeight = window.innerHeight;
var centerY = innerHeight / 2;
var diamondWidth = 275;
var diamondHeight = 275;

function randomX() {
    var result = Math.floor((Math.random() * window.innerWidth) + 1);

    return result;
};
var randomY = function() {
    return Math.floor((Math.random() * window.innerHeight) + 1)
};

var randomIntFromInterval = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

class Dot {
    constructor(x, y, xMove, yMove) {

        this.sprite = 'images/dot.png';
        this.x = x;
        this.y = y;
        this.radius = 4;
        this.speed = Math.floor(Math.random() * 5);
        this.yMove = xMove;
        this.xMove = yMove;
        this.direction = randomIntFromInterval(0, 360);
    }
    update(dt) {
        if (this.xMove) {
            this.x += (10 / 6) * Math.cos(this.direction) + this.speed
        } else {
            this.x -= (10 / 6) * Math.cos(this.direction) + this.speed
        }
        if (this.yMove) {
            this.y += (10 / 6) * Math.sin(this.direction) + this.speed
        } else {
            this.y -= (10 / 6) * Math.sin(this.direction) + this.speed

        }
        this.reRender()

        
    }
    reRender() {
        if (this.x >= innerWidth - this.radius) {
            this.x = (10 / 6) * Math.cos(this.direction) + this.speed
        }
        if (this.x <= 0 + this.radius) {
            this.xMove = !this.xMove
            this.x += 1 + (10 / 6) * Math.cos(this.direction) + this.speed
            this.y += 1 + (10 / 6) * Math.sin(this.direction) + this.speed
        }
        if (this.y >= innerHeight - this.radius) {
            this.y = (10 / 6) * Math.sin(this.direction) + this.speed
        }
        if (this.y <= 0 + this.radius) {
            this.yMove = !this.yMove
            this.x += 1 + (10 / 6) * Math.cos(this.direction) + this.speed
            this.y += 1 + (10 / 6) * Math.sin(this.direction) + this.speed
        }
    }

    moveToCursor(x, y) {
        var dx = this.x - x
        var dy = this.y - y
        var dist = Math.abs(Math.sqrt( dx * dx + dy + dy))
        console.log(dist)
    }
    render() {
        ctx.beginPath();
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        
    }
};

class SmallDot extends Dot {
    constructor(x, y, xMove, yMove) {
        super(x, y, xMove, yMove)
        this.sprite = 'images/dot--small.png'
        this.speed = Math.floor(Math.random() * 2) + 2;
    }
    update(dt) {
        super.update(dt);
    }
    render() {
        super.render();
    }
    changeDirection(x, y) {
        var dx = (this.x + this.radius / 2) - (x + 275 / 2)
        var dy = (this.y + this.radius / 2) - (y + 275 / 2)
        var width = (this.radius + 275) / 2;
        var height = (this.radius + 275) / 2;
        var crossWidth = width * dy;
        var crossHeight = height * dx;
        var collision = 'none';
        if (Math.abs(dx) <= width && Math.abs(dy) <= height) {
            if (crossWidth > crossHeight) {
                collision = (crossWidth > (-crossHeight)) ? 'bottom' : 'left';
            } else {
                collision = (crossWidth > -(crossHeight)) ? 'right' : 'top';
            }

        }
        if (collision === 'top') {
            this.y -= (10 / 6) * Math.sin(this.direction) + this.speed
        }
        if (collision === 'right') {
            this.x += (10 / 6) * Math.sin(this.direction) + this.speed

        }
        if (collision === 'bottom') {
            this.y += (10 / 6) * Math.sin(this.direction) + this.speed

        }
        if (collision === 'left') {
            this.x -= (10 / 6) * Math.sin(this.direction) + this.speed

        }
        return (collision);
    }

}



class Diamond {
    constructor(x, y) {
        this.sprite = 'images/big-diamond.png';
        this.x = x;
        this.y = y;
        this.angle = 45 * Math.PI / 180
        this.width = 275;
        this.height = 275;
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y, this.width, this.height);
        // ctx.globalCompositeOperation = "destination-out";
        // var gradient = ctx.createLinearGradient(0, 0, diamondWidth, diamondHeight);
        // gradient.addColorStop(0, "rgba(53,54,56, 0.45)");
        // gradient.addColorStop(1, "rgba(0,0,0, 0.45)");
        // ctx.fillStyle = gradient;
        // ctx.fillRect(centerX - (diamondWidth / 2),centerY - (diamondHeight / 2), diamondWidth, diamondHeight);
        ctx.closePath();
    }
    update() {
    }
    checkCollision(x, y) {
        if ((x >= this.x && x <= this.x + 275) && (y >= this.y && y <= this.y + 275)) {
            allDots.forEach(dot => dot.moveToCursor(x, y))
            smallDots.forEach(dot => dot.moveToCursor(x, y))
        }
    }

}

var allDots = []
var smallDots = []
for (var i = 0; i < 100; i++) {
    allDots.push(new Dot(centerX, centerY - 4, Math.random() >= 0.5, Math.random() >= 0.5))
    if (i % 3 === 0) {
        smallDots.push(new SmallDot(centerX, centerY - 4, Math.random() >= 0.5, Math.random() >= 0.5))
    }
}

var diamond = new Diamond(centerX - diamondWidth / 2, centerY - diamondHeight / 2);