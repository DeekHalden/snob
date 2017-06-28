// var loader = new type.Loader();
// //.add(fontFamilyName, url)
// loader.add('roboto', './../fonts/Roboto-Regular.ttf');
// // loader.add('roboto', '/snob/fonts/Roboto-Regular.ttf');

// loader.once('loadComplete', init)
// loader.load();




// function init() {
//     function clearAdditions() {
//         moveToRandomPosition = false;
//         moveDiamondToStart = true;
//         logo.decreaseOpacity();
//         text.decreaseOpacity();
//     }
//     const app = new PIXI.Application();
//     app.renderer = PIXI.autoDetectRenderer(256, 256, {antialias: false, transparent: true, resolution: 1})
//     app.renderer.autoResize = true;
//     document.body.appendChild(app.view);

//     app.renderer.resize(window.innerWidth, window.innerHeight);
//     // app.renderer.backgroundColor = "0xffffff";
//     // app.renderer.transparent = true;
//     app.stage.interactive = true;
//     app.view.classList.add('first-part');
//     let innerWidth = window.innerWidth;
//     let innerHeight = window.innerHeight;
//     let centerX = innerWidth / 2;
//     let centerY = innerHeight / 2;

//     if(location.pathname === '/') {
// 	    var texture0 = './../images/big-diamond.svg'
// 	    var texture1 = './../images/big-diamond-start.svg'
// 	    var texture2 = './../images/big-diamond-end.svg'
// 	    var texture3 = './../images/mask.png'
// 	    var texture4 = './../images/dot.png'
// 	    var texture5 = './../images/dot--small.png'
// 	    var texture6 = './../images/snob-b-w.png'
// 	    var texture7 = './../images/diamond-anchor.png'
// 	    var texture8 = './../images/dot-white.png'
// 	    var texture9 = './../images/logo.svg'
    	
//     } else {
// 	    var texture0 = '/snob/images/big-diamond.svg'
// 	    var texture1 = '/snob/images/big-diamond-start.svg'
// 	    var texture2 = '/snob/images/big-diamond-end.svg'
// 	    var texture3 = '/snob/images/mask.png'
// 	    var texture4 = '/snob/images/dot.png'
// 	    var texture5 = '/snob/images/dot--small.png'
// 	    var texture6 = '/snob/images/snob-b-w.png'
// 	    var texture7 = '/snob/images/diamond-anchor.png'
// 	    var texture8 = '/snob/images/dot-white.png'
// 	    var texture9 = '/snob/images/logo.svg'
    	
//     }


//     const diamondTexture = PIXI.Texture.fromImage(texture0);
//     const diamondMaskStart = PIXI.Texture.fromImage(texture1);
//     const diamondMaskEnd = PIXI.Texture.fromImage(texture2);
//     const maskTexture = PIXI.Texture.fromImage(texture3);
//     const dotTexture = PIXI.Texture.fromImage(texture4);
//     const smallDotTexture = PIXI.Texture.fromImage(texture5);
//     const logoTexture = new PIXI.Texture.fromImage(texture9);
//     const anchorTexture = PIXI.Texture.fromImage(texture7);
//     const dotWhiteTexture = PIXI.Texture.fromImage(texture8);

//     const dotsCount = 100;
//     // Variable
//     const dotsArray = [];
//     const smallDots = [];
//     const anchors = [];
//     const timelineDots = [];
//     let moveToRandomPosition;
//     let moveDiamondToStart = false;
//     let freeFall = true;

//     // const arrayOfDots = Array.from({ length: dotsCount }, (i, v) => v)



//     class SuperClass {
//         constructor(image) {
//             this.obj = new PIXI.Sprite(image);
//             this.obj.alpha = 0
//             this.obj.position.x = centerX;
//             this.obj.position.y = centerY;
//             this.obj.anchor.set(.5);

//         }
//         moveTo(x, y, duration) {
//             var duration;
//             var speed = 0;
//             var x1 = this.obj.position.x;
//             var y1 = this.obj.position.y
//             var x2 = x;
//             var y2 = y;
//             var dx = x2 - x1;
//             var dy = y2 - y1;
//             var dist = Math.abs(Math.sqrt(dx * dx + dy * dy))
//             if (dist < 100) {
//                 duration = 100
//             } else if (dist < 250 && dist >= 100) {
//                 duration = duration / 2

//             } else if (dist >= 250) {
//                 duration = duration
//             }
//             speed = dist / duration
//             this.obj.position.x += (x2 - x1) * speed
//             this.obj.position.y += (y2 - y1) * speed
//         }
//     }
//     class Anchor extends SuperClass {
//         constructor(image, x, y) {
//             super(image)
//             this.obj = new PIXI.Sprite(image);
//             this.obj.position.x = x;
//             this.obj.position.y = y;
//             this.obj.anchor.set(.5)
//             this.obj.alpha = 0
//         }
//         increaseOpacity() {
//             // rude fadein effect
//             if (this.obj.alpha <= 1) {
//                 this.obj.alpha += .05
//             }

//         }
//         decreaseOpacity() {
//             if (this.obj.alpha >= 0) {
//                 this.obj.alpha -= .05

//             }

//         }
//     }
//     // The constructor
//     class Diamond extends SuperClass {
//         constructor(image) {
//             // Just sets up size and assigns the image (through PIXI)
//             super(image)
//                 // this.obj = new PIXI.Sprite(texture);
//             this.oldX = 0;
//             this.obj.alpha = 0
//             this.obj.rotation = -Math.PI / 180 * 45
//             this.obj.interactive = true;
//             this.obj.buttonMode = true;
//             this.obj.defaultCursor = 'pointer';
//             this.scaleTick = .1;
//             this.dragging;
//             this.moving = true;
//             this.oldX = 0;
//             this.direction = '';
//             let self = this;
//             this.interval;
//             setTimeout(() => {
//                 this.obj.on('mouseover', function(mouseData) {
//                     moveToRandomPosition = false;
//                     text.increaseOpacity();
//                     logo.increaseOpacity();
//                     setTimeout(() => {
//                         self.obj.on('tap', function(mouseData) {
//                             clearAdditions()
//                         });
//                         self.obj.on('mousedown', function(mouseData) {
//                             clearAdditions()
//                         });
//                     }, 1500)
//                 });
//                 this.obj.on('tap', function(mouseData) {
//                     moveToRandomPosition = false;
//                     text.increaseOpacity();
//                     logo.increaseOpacity();
//                     clearAdditions()
//                 });
//             }, 1500);
//         }
//         decreaseOpacity() {
//             // rude fadein effect
//             setInterval(()=>{
//                 this.obj.alpha -= 1

//             },20)
//         }
//         increaseOpacity() {
//             // rude fadein effect
//             this.obj.alpha += .05
//         }
//         moveTo(x, y, duration) {
//             if (this.obj.position.x <= x + 10) {
//                 this.moving = false
//             }

//             if (this.moving) {
//                 let speed = 0;
//                 let x1 = this.obj.position.x;
//                 let y1 = this.obj.position.y
//                 let x2 = x;
//                 let y2 = y;
//                 let dx = x2 - x1;
//                 let dy = y2 - y1;

//                 let dist = Math.abs(Math.sqrt(dx * dx + dy * dy))
//                 if (dist < 400) {
//                     duration = duration / 2
//                 }
//                 if (dist < 300) {
//                     duration = duration / 3
//                 }
//                 if (dist < 200) {
//                     duration = duration / 4
//                 }
//                 if (dist < 100) {
//                     duration = duration / 5
//                 }
//                 if (dist <= x) {
//                     setTimeout(() => {
//                         this.decreaseOpacity();
//                         if ($('canvas')) {
//                             $('.slider-container').show();
//                             $('.irs-single').css('opacity', '1', 'important');
//                             $('canvas').css('z-index',0)
//                             app.ticker.remove(create);

//                         }

//                     }, 1000)
//                 }
//                 speed = dist / duration


//                 this.obj.position.x += (x2 - x1) * speed

//                 this.obj.position.y += (y2 - y1) * speed
//             }

//         }
//         scale() {
//             if (this.obj.scale.x >= .07) {
//                 this.obj.scale.x -= .01
//                 this.obj.scale.y -= .01
//             } else {
//                 this.moveTo(135, centerY, 10000)
//             }
//         }
//     }

//     class Mask extends SuperClass {
//         constructor(image) {
//             super(image);
//             this.obj.alpha = 1
//                 // Just sets up size and assigns the image (through PIXI)
//         }
//     }

//     class GradientMaskStart extends Mask {
//         constructor(image) {
//             super(image);
//             // Just sets up size and assigns the image (through PIXI)
//             this.obj.rotation = -Math.PI / 180 * 45
//             this.obj.position.x = centerX;
//             this.obj.position.y = centerY;
//             this.obj.alpha = 0
//             this.obj.anchor.set(.5)
//             this.add = true
//         }
//         increaseOpacity() {
//             // rude fadein effect+
//             if (this.obj.alpha <= 1 && this.add) {
//                 let self = this
//                 let interval = setInterval(() => {
//                     this.obj.alpha += .05
//                     if (this.obj.alpha >= 1) {
//                         clearInterval(interval);
//                         diamondMaskObjEnd.increaseOpacity();
//                         diamondMaskObjStart.decreaseOpacity();
//                     }
//                 }, 50)
//                 this.add = false
//             }
//         }
//         decreaseOpacity() {
//             // rude fadein effect
//             if (this.obj.alpha >= 0 && !this.add) {
//                 let self = this
//                 let interval = setInterval(() => {
//                     this.obj.alpha -= .05
//                     if (this.obj.alpha <= 0) {
//                         clearInterval(interval);
//                         diamondMaskObjEnd.decreaseOpacity();
//                     }
//                 }, 50)
//                 this.add = true
//             }
//         }
//     }
//     class GradientMaskEnd extends GradientMaskStart {
//         constructor(image) {
//             super(image)
//             this.obj.rotation = -Math.PI / 180 * 45

//         }
//         increaseOpacity() {
//             // rude fadein effect+
//             if (this.obj.alpha <= 1 && this.add) {
//                 let self = this;
//                 let interval = setInterval(() => {
//                     this.obj.alpha += .05
//                     if (this.obj.alpha >= 1) {
//                         diamondMaskObjEnd.decreaseOpacity();
//                         clearInterval(interval);
//                     }
//                 }, 50)
//                 this.add = false
//             }

//         }
//         decreaseOpacity() {
//             // rude fadein effect
//             if (this.obj.alpha >= 0 && !this.add) {
//                 let self = this;
//                 let interval = setInterval(() => {
//                     this.obj.alpha -= .05
//                     if (this.obj.alpha <= 0) {
//                         clearInterval(interval);
//                     }
//                 }, 50)
//                 this.add = true
//             }
//         }
//     }




//     class Dot extends SuperClass {
//         constructor() {
//             super()
//             this.obj = new PIXI.Sprite(dotTexture);
//             this.obj.alpha = 0
//             this.obj.randomX = this.generateRandomDirection(0, innerWidth)
//             this.obj.randomY = this.generateRandomDirection(0, innerHeight)
//             this.obj.position.x = centerX;
//             this.obj.position.y = centerY;
//             this.obj.speed = this.randomSpeed();
//             this.obj.xMove = Math.random() >= .5;
//             this.obj.yMove = Math.random() >= .5;
//             this.obj.size = 4
//             this.randomX = Math.floor(Math.random() * (innerWidth - 1) + 1);
//             this.randomY = Math.floor(Math.random() * (innerHeight - 1) + 1);
//             this.randomDirection = this.generateRandomDirection(0, 360)
//         }
//         generateRandomDirection(min, max) {
//             return Math.floor(Math.random() * (max - min + 1) + min);
//         }

//         randomSpeed() {
//             return Math.floor(Math.random() * 2) + 1.5;
//         }
//         moveDot(randomX, randomY) {

//             if (moveToRandomPosition && freeFall) {
//                 var duration = 2000;
//                 var speed = 0;
//                 var x1 = this.obj.x;
//                 var y1 = this.obj.y
//                 var x2 = this.obj.randomX;
//                 var y2 = this.obj.randomY;


//                 var dx = this.obj.randomX - x1;
//                 var dy = this.obj.randomY - y1;

//                 var dist = Math.abs(Math.sqrt(dx * dx + dy * dy))

//                 speed = dist / duration
//                 this.obj.position.x += (this.obj.randomX - x1) * speed

//                 this.obj.position.y += (this.obj.randomY - y1) * speed
//                 if ((this.obj.position.x >= this.obj.randomX - 2 && this.obj.position.x <= this.obj.randomX + 10) && (this.obj.position.y >= this.obj.randomY - 2 && this.obj.position.y <= this.obj.randomY + 10)) {
//                     freeFall = false;
//                 }


//             }
//             if (!freeFall) {
//                 this.obj.position.x += 10 / 6 * Math.atan(this.randomDirection) * this.obj.speed / 2;
//                 this.obj.position.y += 10 / 6 * Math.atan(this.randomDirection) * this.obj.speed / 2;
//                 if (this.obj.position.x >= innerWidth - this.obj.size) {
//                     this.obj.position.x = (10 / 6) * Math.cos(this.randomDirection) + this.obj.speed / 2;
//                 }
//                 if (this.obj.position.y >= innerHeight - this.obj.size) {
//                     this.obj.position.y = (10 / 6) * Math.sin(this.randomDirection) + this.obj.speed / 2;
//                 }
//             }
//         }
//         moveTo(centerX, centerY, duration) {
//             super.moveTo(centerX, centerY, duration)
//         }
//     }


//     class SmallDot extends Dot {
//         constructor() {
//             super()
//             this.obj = new PIXI.Sprite(smallDotTexture);
//             // this.obj = new PIXI.Graphics();
//             // this.obj.lineStyle(1, 0x000000);  //(thickness, color)
//             // this.obj.drawCircle(0, 0, 1);   //(x,y,radius)
//             // this.obj.endFill(); 
//             this.obj.alpha = 0
//             this.obj.direction = this.generateRandomDirection(0, 360)
//             this.obj.position.x = centerX;
//             this.obj.position.y = centerY;
//             this.obj.randomX = this.generateRandomDirection(0, innerWidth)
//             this.obj.randomY = this.generateRandomDirection(0, innerHeight)
//             this.obj.speed = this.randomSpeed();
//             this.obj.xMove = Math.random() >= .5;
//             this.obj.yMove = Math.random() >= .5;
//             this.obj.size = 4
//             this.magnet = true
//             this.obj.interactive = true;
//             this.obj.hitArea = new PIXI.Rectangle(0, 0, 200, 200);
//         }
//         randomSpeed() {
//             return Math.floor(Math.random() * 1) + 1;
//         }
//         changeDirection(x, y) {
//             if (this.magnet) {
//                 var dx = (this.obj.position.x + 200 / 2) - (x + 100 / 2);
//                 var dy = (this.obj.position.y + 200 / 2) - (y + 100 / 2);
//                 var width = (4 + 200) / 2;
//                 var height = (4 + 200) / 2;
//                 var crossWidth = width * dy;
//                 var crossHeight = height * dx;
//                 var collision = 'none';
//                 //
//                 if (Math.abs(dx) >= width && Math.abs(dy) >= height) {
//                     if (crossWidth > crossHeight) {
//                         collision = (crossWidth > (-crossHeight)) ? 'bottom' : 'left';

//                     } else {
//                         collision = (crossWidth > -(crossHeight)) ? 'right' : 'top';
//                     }
//                 }
//                 if (collision == 'top') {
//                     this.obj.position.x -= (20 / 6) * Math.sin(this.randomDirection) + this.obj.speed;
//                     this.obj.position.y -= (20 / 6) * Math.cos(this.randomDirection) + this.obj.speed;
//                 }
//                 if (collision == 'bottom') {
//                     this.obj.position.x += (10 / 6) * Math.sin(this.randomDirection) + this.obj.speed;
//                     this.obj.position.y += (10 / 6) * Math.cos(this.randomDirection) + this.obj.speed;
//                 }
//                 if (collision == 'right') {
//                     this.obj.position.x += (10 / 6) * Math.sin(this.randomDirection) + this.obj.speed;
//                     this.obj.position.y += (10 / 6) * Math.cos(this.randomDirection) + this.obj.speed;
//                 }
//                 if (collision == 'left') {
//                     this.obj.position.x -= (20 / 6) * Math.sin(this.randomDirection) + this.obj.speed;
//                     this.obj.position.y -= (20 / 6) * Math.cos(this.randomDirection) + this.obj.speed;
//                 }
//                 return (collision);
//             } else {
//                 return false
//             }
//         }
//     }

//     class Logo extends SuperClass {
//         constructor(image) {

//             super(image)
//             this.obj.alpha = 0
//             this.add = true
//         }
//         increaseOpacity() {
//             if (this.obj.alpha <= 1 && this.add) {
//                 let self = this
//                 let interval = setInterval(() => {
//                     this.obj.alpha += .05
//                     if (this.obj.alpha >= 1) {
//                         clearInterval(interval);
//                     }
//                 }, 50)
//                 this.add = false
//             }
//         }

//         decreaseOpacity() {
//             if (this.obj.alpha >= 1 && !this.add) {
//                 let self = this;
//                 let interval = setInterval(() => {
//                     this.obj.alpha -= .1
//                     if (this.obj.alpha >= 1) {
//                         clearInterval(interval);
//                     }
//                 }, 50)
//                 this.add = true
//             }
//         }
//     }

//     class Text {
//         constructor(text, x, y) {
//             this.obj = new PIXI.Text(text, {
//                 fontFamily: 'roboto',
//                 fontSize: 24,
//                 fill: 0x000000,
//                 align: 'center'
//             });
//             this.obj.alpha = 0
//             this.obj.interactive = true;
//             this.obj.buttonMode = true;
//             this.obj.defaultCursor = 'pointer';
//             this.obj.position.x = x;
//             this.obj.position.y = y;
//             this.obj.anchor.set(.5, .5)
//             this.add = true
//             this.obj.on('tap', function() {
//                 clearAdditions()
//             });
//             this.obj.on('mousedown', function() {
//                 clearAdditions()
//             });
//             // this.obj.alpha = 0
//         }

//         increaseOpacity() {
//             if (this.obj.alpha <= 1 && this.add) {
//                 let self = this
//                 let interval = setInterval(() => {
//                     this.obj.alpha += .05
//                     if (this.obj.alpha >= 1) {
//                         clearInterval(interval);
//                     }
//                 }, 50)
//                 this.add = false
//             }
//         }

//         decreaseOpacity() {
//             if (this.obj.alpha >= 1 && !this.add) {
//                 let self = this
//                 let interval = setInterval(() => {
//                     this.obj.alpha -= .1
//                     if (this.obj.alpha >= 1) {
//                         clearInterval(interval);
//                     }
//                 }, 50)
//                 this.add = true
//             }
//         }
//     }
//     let diamond = new Diamond(diamondTexture);
//     let mask = new Mask(maskTexture);
//     let diamondMaskObjStart = new GradientMaskStart(diamondMaskStart);
//     let diamondMaskObjEnd = new GradientMaskEnd(diamondMaskEnd);
//     // let gradientMask = new GradientMask(diamondMaskEnd);
//     let text = new Text('CLICK TO ENTER WEBSITE', centerX, centerY + 255);
//     let hint = new Text('DRAG THE DIAMOND RIGHT', centerX, centerY)
//     let logo = new Logo(logoTexture);

//     var index = innerWidth / 4
//     for (var i = 0; i < 100; i++) {
//         var dot = new Dot();
//         if (i % 3 === 0) {
//             var smallDot = new SmallDot();
//             smallDots.push(smallDot)
//             app.stage.addChild(smallDot.obj);

//         }
//         dotsArray.push(dot);
//         app.stage.addChild(dot.obj);
//     }
//     for (var i = 0; i < 4; i++) {
//         if (i === 0) {
//             var anchor = new Anchor(anchorTexture, i + 145, centerY);

//         } else if (i === 1) {


//             anchor = new Anchor(anchorTexture, centerX - centerX / 2.5, centerY);
//         } else if (i === 2) {

//             anchor = new Anchor(anchorTexture, centerX + centerX / 2.5, centerY);

//         } else if (i === 3) {
//             anchor = new Anchor(anchorTexture, innerWidth - 145, centerY)
//         }


//         anchors.push(anchor);
//         app.stage.addChild(anchor.obj);
//     }
//     app.stage.addChild(mask.obj);
//     app.stage.addChild(hint.obj);
//     app.stage.addChild(diamond.obj);
//     app.stage.addChild(diamondMaskObjStart.obj);
//     app.stage.addChild(diamondMaskObjEnd.obj);
//     app.stage.addChild(text.obj);
//     app.stage.addChild(logo.obj);


//     var diamondInterval = setInterval(() => {
//         diamond.increaseOpacity()
//     }, 50);
//     if(diamond.obj.alpha >= 1) {
//         clearInterval(diamondInterval);
//     }




//     const interval = setInterval(() => {
//         if (diamondMaskObjStart.add) {
//             diamondMaskObjStart.increaseOpacity()
//         } else {
//             diamondMaskObjStart.decreaseOpacity()
//         }
//     }, 10000);

//     function create() {
//         app.renderer.plugins.interaction.mouse.global
//         if (moveToRandomPosition) {
//             dotsArray.forEach(dot => {
//                 dot.moveDot( /*smallDot.randomX, smallDot.randomY*/ )
//                 dot.obj.alpha = 1

//             });
//             smallDots.forEach(dot => {
//                 dot.moveDot( /*smallDot.randomX, smallDot.randomY*/ )
//                 dot.obj.alpha = 1
//                 dot.changeDirection(app.renderer.plugins.interaction.mouse.global.x, app.renderer.plugins.interaction.mouse.global.x)
//             });
//         } else if (!moveToRandomPosition && !moveDiamondToStart) {
//             dotsArray.forEach(dot => dot.moveTo(diamond.obj.position.x, diamond.obj.position.y, 10000))
//             smallDots.forEach(dot => dot.moveTo(diamond.obj.position.x, diamond.obj.position.y, 10000))
//             setTimeout(function() {
//                 dotsArray.forEach(dot => app.stage.removeChild(dot.obj));
//                 smallDots.forEach(dot => app.stage.removeChild(dot.obj));
//             }, 1500)
//         }
//         if (!moveToRandomPosition && moveDiamondToStart) {
//             setTimeout(function() {
//                 var index = 6;
//                 var i = 0;

//                 // timelineDots.forEach(dot => {
//                 //     dot.moveTo(i, centerY - 8, 1000)
//                 //     i += index
//                 // });
//                 $('.slider-container').fadeIn('slow');
//                 clearInterval(interval);
//                 app.stage.removeChild(dot.obj);
//                 app.stage.removeChild(mask.obj);
//                 app.stage.removeChild(diamondMaskObjStart.obj);
//                 app.stage.removeChild(diamondMaskObjEnd.obj);
//                 app.stage.removeChild(logo.obj);
//                 app.stage.removeChild(text.obj);

//                 diamond.scale();
//                 setTimeout(function() {
//                     hint.increaseOpacity()
//                 }, 1000)
//             }, 1500)
//         }
//     }

//     setTimeout(function() {
//         moveToRandomPosition = true
//         app.ticker.add(create);
//     }, 1000)
// }

var directionX;
document.addEventListener('mousemove', function(event) {
    directionX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
});

function slideText(startValue, endValue, computedNow, element, valueNow) {
    let percent = 0
    if ($(element).hasClass('slide--0')) {
        percent = (computedNow * 2.4) * 100 / endValue;
    } else {
        percent = (computedNow * 2.3) * 100 / endValue;
        percent -= 10;
    }
    let value = -100;
    value += percent;
    translateText(element, value);
    fade(startValue, endValue, computedNow, element, valueNow, directionX);
}


function translateText(element, value) {
    $(element).children('h2').css('right', value + '%')
}

function fade(startValue, endValue, computedNow, element, valueNow, direction) {
	var firstClassName = $(element).attr('class').split(' ')[0]
    var secondClassName = $(element).attr('class').split(' ')[1]
    if (direction > 0) {
        if (computedNow >= endValue - 10 && computedNow <= endValue) {
            var el = $(element).children('video').fadeIn();
            $(el)[0].play();
            $(element).children('p').addClass('active--left');
        } else if (computedNow >= endValue / 1.5) {
            
            $(element).parent().find('.' + firstClassName + '--' + (secondClassName.slice(-1) - 1)).children('p').removeClass('active--left').addClass('active--right');
        } else if (computedNow >= endValue / 2) {
            $('video').fadeOut();
        } 
    } else {
    	if (computedNow >= endValue - 10 && computedNow <= endValue) {
            $(element).children('p').removeClass('active--right').removeClass('active--left');
            $('video').fadeOut();

            // $(element).parent().find('.' + firstClassName + '--' + (secondClassName.slice(-1) + 1)).children('p').removeClass('active--right').addClass('active--left');
            // $(element).children('p').removeClass('active--right');
    	} else if (computedNow <= endValue / 1.5 && computedNow >= endValue / 1.55) {
        	console.log(1)
            
            $(element).parent().find('.' + firstClassName + '--' + (secondClassName.slice(-1) - 1)).children('p').removeClass('active--right').addClass('active--left');
        } else if (computedNow <= endValue / 2) {
        	console.log(1)
            $(element).parent().find('.' + firstClassName + '--' + (secondClassName.slice(-1) - 1)).children('video').fadeIn();
        }
    }
}

let globalIn = false;
$(document).ready(function() {

    $("#controls").ionRangeSlider({
        type: "single",
        min: 0,
        max: window.innerWidth - 280,
        from: 0,
        keyboard: true,
        onStart: function(data) {

        },
        onChange: function(data) {

            $('.range-slider__anchors').addClass('range-slider__anchors--important');
            $('.first-part').fadeOut();
            let firstBreakpoint = $('.range-slider__anchor')[1].x - 110;
            let secondBreakpoint = $('.range-slider__anchor')[2].x - 110;
            let thirdBreakpoint = $('.range-slider__anchor')[3].x - 110;

            if (data.from < firstBreakpoint) {
                slideText(data.min, firstBreakpoint, data.from, $('.slide.slide--0'), data.from);

            }
            if (data.from >= firstBreakpoint - 100) {
                $('body').addClass('body--dark');
                $('.slider-container').addClass('slider-container--light');
            }
            if (data.from >= firstBreakpoint && data.from < secondBreakpoint) {
                slideText(firstBreakpoint, secondBreakpoint - firstBreakpoint, data.from - firstBreakpoint, $('.slide.slide--1'), data.from);

            }
            if (data.from >= secondBreakpoint && data.from <= thirdBreakpoint) {
                slideText(secondBreakpoint, thirdBreakpoint - secondBreakpoint, data.from - secondBreakpoint, $('.slide.slide--2'), data.from);

            }
            if ((data.from <= firstBreakpoint - 10)) {
                $('body').removeClass('body--dark')
                $('.slider-container').removeClass('slider-container--light');

            }
        },
        onFinish: function(data) {


            $('.range-slider__anchors').removeClass('range-slider__anchors--important');
        },
        onUpdate: function(data) {

        }
    });
    $('.irs-single')
        .hover(function() {
            $('.range-slider__anchors').addClass('range-slider__anchors--important');
            globalIn = true;
        })

    // .on('mousedown', function() {
    //     $('.range-slider__anchors').fadeIn();
    //     globalIn = false;
    // })
    .on('mouseout', function() {
        $('.range-slider__anchors').removeClass('range-slider__anchors--important');

    })


    // .on('mouseout', function() {

    //             $('.range-slider__anchors').fadeOut();

    //     })



})
