const jQuery = require('jquery')
const $ = require('jquery')
import { swiper } from 'swiper'
import * as PIXI from 'pixi.js'
import ionRangeSlider from 'ion-rangeslider'

// $(document).ready(function() {
//     init()
// });

// function init() {
//     function clearAdditions(e) {
//         moveToRandomPosition = false;
//         moveDiamondToStart = true;
//         logo.decreaseOpacity();
//         text.decreaseOpacity();
//         $('.main-text-start').fadeOut();
//         $('.slider-container').css({'visibility':'visible'}).animate({'opacity': 1}, 1500);
        

//     }
//     const app = new PIXI.Application();
//     app.renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerWidth, { transparent: true})

//     document.body.appendChild(app.view);

//     // app.renderer.resize(window.innerWidth, window.innerHeight);
//     // app.renderer.backgroundColor = "0xffffff";
//     // app.renderer.transparent = true;
//     app.stage.interactive = true;
//     app.view.classList.add('first-part');
//     let innerWidth = window.innerWidth;
//     let innerHeight = window.innerHeight;
//     let centerX = innerWidth / 2;
//     let centerY = innerHeight / 2;

//     window.onresize = function (){    
//         if(!disableResize) {
//             location.reload();
//         }
//     }

//     if (location.pathname === '/') {
//         var texture0 = './../images/big-diamond.svg'
//         var texture1 = './../images/big-diamond-start.svg'
//         var texture2 = './../images/big-diamond-end.svg'
//         var texture3 = './../images/mask.png'
//         var texture4 = './../images/dot.png'
//         var texture5 = './../images/dot--small.png'
//         var texture6 = './../images/snob-b-w.png'
//         var texture9 = './../images/Logo2kx2k.png'

//     } else {
//         var texture0 = '/snobV1/images/big-diamond.svg'
//         var texture1 = '/snobV1/images/big-diamond-start.svg'
//         var texture2 = '/snobV1/images/big-diamond-end.svg'
//         var texture3 = '/snobV1/images/mask.png'
//         var texture4 = '/snobV1/images/dot.png'
//         var texture5 = '/snobV1/images/dot--small.png'
//         var texture6 = '/snobV1/images/snob-b-w.png'
//         var texture9 = '/snobV1/images/Logo2kx2k.png'

//     }


//     const diamondTexture = PIXI.Texture.fromImage(texture0);
//     const diamondMaskStart = PIXI.Texture.fromImage(texture1);
//     const diamondMaskEnd = PIXI.Texture.fromImage(texture2);
//     const maskTexture = PIXI.Texture.fromImage(texture3);
//     const dotTexture = PIXI.Texture.fromImage(texture4);
//     const dotSmallTexture = PIXI.Texture.fromImage(texture5);
//     const logoTexture = new PIXI.Texture.fromImage(texture9);

//     const dotsCount = 100;
//     // Variable
//     const dotsArray = [];
//     const smallDots = [];
//     const anchors = [];
//     const timelineDots = [];
//     let moveToRandomPosition;
//     let moveDiamondToStart = false;
//     let freeFall = true;
//     let disableResize = false;

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
//                     $('.main-text-start').fadeIn();
//                     moveToRandomPosition = false;
//                     logo.increaseOpacity();
//                     setTimeout(() => {
//                         self.obj.on('tap', function(mouseData) {
//                             clearAdditions()
//                             $('.main-text-start').fadeOut();
                            
                        
//                         });
//                         self.obj.on('mousedown', function(mouseData) {
//                             clearAdditions()
//                             $('.main-text-start').fadeOut();
                            
                        
//                         });
//                     }, 1500)
//                 });
//                 this.obj.on('tap', function(mouseData) {
//                     $('.main-text-start').fadeIn();
//                     moveToRandomPosition = false;
//                     logo.increaseOpacity();
//                     self.obj.on('tap', function(mouseData) {

//                         clearAdditions()
//                     })
//                     $('.main-text-start').fadeOut();
//                 });
//             }, 1500);
//         }
//         decreaseOpacity() {
//             // rude fadein effect
//             setInterval(() => {
//                 this.obj.alpha -= 1

//             }, 20)
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
                            
//                             $('canvas').css('z-index', 0)
//                             app.ticker.remove(create);
//                             $('.main-text').fadeIn();
//                             $('canvas').remove();
//                             disableResize = true;
//                             $('.menu-toggler').fadeIn()
//                             $('.irs-single').css('opacity', '1', 'important');
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
//         constructor(image) {
//             super(image)
//             // this.obj = new PIXI.Graphics();
//             // this.obj.beginFill(0x000000)
//             // this.obj.lineStyle(0, 0x000000);
//             // this.obj.drawRect(0, 0, 3, 3);
//             this.obj.alpha = 0
//             this.obj.randomX = this.generateRandomDirection(0, innerWidth)
//             this.obj.randomY = this.generateRandomDirection(0, innerHeight)
//             this.obj.position.x = centerX;
//             this.obj.position.y = centerY;
//             this.obj.speed = this.randomSpeed();
//             this.obj.xMove = Math.random() >= .5;
//             this.obj.yMove = Math.random() >= .5;
//             this.obj.size = 4
//             this.randomX = Math.floor(Math.random() * (innerWidth - 1) );
//             this.randomY = Math.floor(Math.random() * (innerHeight - 1) );
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
//         constructor(image) {
//             super(image)
//             // this.obj = new PIXI.Graphics();
//             // this.obj.beginFill(0x000000)
//             // this.obj.lineStyle(0, 0x000000);
//             // this.obj.drawRect(0, 0, 1, 1);
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

//             let dx = (this.obj.position.x + 200 / 2) - (x + 100 / 2);
//             let dy = (this.obj.position.y + 200 / 2) - (y + 100 / 2);
//             let width = (4 + 200) / 2;
//             let height = (4 + 200) / 2;
//             let crossWidth = width * dy;
//             let crossHeight = height * dx;
//             let collision = 'none';
//             //
//             if (Math.abs(dx) >= width && Math.abs(dy) >= height) {
//                 if (crossWidth > crossHeight) {
//                     collision = (crossWidth > (-crossHeight)) ? 'bottom' : 'left';

//                 } else {
//                     collision = (crossWidth > -(crossHeight)) ? 'right' : 'top';
//                 }
//             }
//             if (collision == 'top') {
//                 this.obj.position.x += (10 / 6) * Math.sin(this.randomDirection) + this.obj.speed;
//                 this.obj.position.y += (10 / 6) * Math.cos(this.randomDirection) + this.obj.speed;
//             }
//             if (collision == 'bottom') {
//                 this.obj.position.x -= (20 / 6) * Math.sin(this.randomDirection) + this.obj.speed;
//                 this.obj.position.y -= (20 / 6) * Math.cos(this.randomDirection) + this.obj.speed;
//             }
//             if (collision == 'right') {
//                 this.obj.position.x -= (20 / 6) * Math.sin(this.randomDirection) + this.obj.speed;
//                 this.obj.position.y -= (20 / 6) * Math.cos(this.randomDirection) + this.obj.speed;
//             }
//             if (collision == 'left') {
//                 this.obj.position.x += (10 / 6) * Math.sin(this.randomDirection) + this.obj.speed;
//                 this.obj.position.y += (10 / 6) * Math.cos(this.randomDirection) + this.obj.speed;
//             }
//             return (collision);
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
//                 fill: 0xFFFFFF,
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
//                 clearAdditions();
//                 $('.main-text-start').fadeOut();
//             });
//             this.obj.on('mousedown', function() {
//                 clearAdditions();
//                 $('.main-text-start').fadeOut();
//                 $('.slider-container').css('visibility','visible');
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

//     let logo = new Logo(logoTexture);

//     var index = innerWidth / 4
//     for (var i = 0; i < 100; i++) {
//         var dot = new Dot(dotTexture);
//         if (i % 3 === 0) {
//             var smallDot = new SmallDot(dotSmallTexture);
//             smallDots.push(smallDot)
//             app.stage.addChild(smallDot.obj);

//         }
//         dotsArray.push(dot);
//         app.stage.addChild(dot.obj);
//     }
   
//     app.stage.addChild(mask.obj);
//     app.stage.addChild(diamond.obj);
//     app.stage.addChild(diamondMaskObjStart.obj);
//     app.stage.addChild(diamondMaskObjEnd.obj);
//     app.stage.addChild(text.obj);
//     app.stage.addChild(logo.obj);

//     var diamondInterval = setInterval(() => {
//         diamond.increaseOpacity()
//     }, 50);
//     if (diamond.obj.alpha >= 1) {
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
//                 $('.slider-container').fadeIn('slow');
//                 clearInterval(interval);
//                 app.stage.removeChild(dot.obj);
//                 app.stage.removeChild(mask.obj);
//                 app.stage.removeChild(diamondMaskObjStart.obj);
//                 app.stage.removeChild(diamondMaskObjEnd.obj);
//                 app.stage.removeChild(logo.obj);
//                 app.stage.removeChild(text.obj);

//                 diamond.scale();
//             }, 1500)
//         }
//     }

//     setTimeout(function() {
//         moveToRandomPosition = true
//         app.ticker.add(create);
//     }, 1000)
// }





// GLOBALS
let globalIn = false;
let offset = 110;
let anchorSize = 32 / 4
let anchors = $('.range-slider__anchor');
let firstBreakpoint = $(anchors[1]).offset().left - offset - anchorSize;
let secondBreakpoint = $(anchors[2]).offset().left - offset - anchorSize;
let thirdBreakpoint = $(anchors[3]).offset().left - offset - anchorSize;
let slides = $('.slide');
// GLOBALS


// 1ST SLIDE TEXT SMOOTH MIVING
function slideText(element, startValue, endValue, computedNow, valueNow) {
    let percent = 0
    percent = (computedNow * 2.4) * 100 / endValue;
    let value = -100;
    value += percent * 2;
    // if(valueNow <= )
    translateText(element, value);
}
function translateText(element, value) {
    $(element).children('.text').css('right', value + '%')
}
// 1ST SLIDE TEXT SMOOTH MIVING



// SWIPER 2-6
const swiperV = new Swiper('.swiper-container-v', {
    direction: 'vertical',
    pagination: '.swiperV-pagination',
    mousewheelControl: true,
    parallax: true,
    nested: true,
    speed: 1500,
    onlyExternal: true,
    shortSwipes: false,
    longSwipes: false,
    onSlidePrevEnd(swiper) {
        if(swiper.activeIndex === 0) {
            $('.swiper-container').removeClass('swiper-container--active')
        }
        
    },
    onSlidePrevStart(swiper) {
        if(swiper.activeIndex === 0) {
            $('.swiperV-pagination').removeClass('swiperV-pagination--active');
        }

    },
    onSlideNextStart(swiper) {
        $('.swiper-container').addClass('swiper-container--active')
    },

    onSlideChangeStart(swiper) {
        // console.log(swiper)
        if(swiper.activeIndex >= 1 && swiper.activeIndex < 5) {
            $('.menu-toggler').removeClass('menu-toggler--active')
        } else {
            $('.menu-toggler').addClass('menu-toggler--active')
            $('.wrapper').removeClass('wrapper--black-active')
        }
        $('.swiperV-pagination').addClass('swiperV-pagination--active');
        
        let contentNotActive = $('.swiper-slide--horizontal.swiper-slide-active .swiper-slide').find('.swiper-slide__content');
        // setTimeout(function() {
        $(contentNotActive).delay(1000).queue(function(next) {
            $(this).removeClass('swiper-slide__content--active').removeClass('swiper-slide__content--active-top')
            next()
        })
        if(swiper.activeIndex === 1) {
            console.log(swiper.activeIndex)
        }
        $('.swiper-slide-active .swiper-slide-active .swiper-slide-active .wrapper--black').addClass('wrapper--black-active')
        // },1000)

    },
    onSlideChangeEnd(swiper) {
        let content = $('.swiper-slide--horizontal.swiper-slide-active .swiper-slide-active').find('.swiper-slide__content');
        if (swiper.activeIndex >= 1 && swiper.activeIndex <= 6) {
            
            $('.swiper-pagination-bullet').delay(1000).queue(function(next) {
                $(content).addClass('swiper-slide__content--active')
                $(this).addClass('swiper-pagination-bullet--active')  
                next()
            })
            
        }  else {
            $('.swiper-pagination-bullet').removeClass('swiper-pagination-bullet--active')
        }
        
    }
    

});
// SWIPER 2-6


// SWIPER 1
const swiperH = new Swiper('.swiper-container-h', {
    mousewheelForceToAxis: true,
    effect: 'fade',
    shortSwipes: false,
    onlyExternal: true,
    longSwipes: false,
    parallax: true,
    
    onSlideChangeStart(swiper) {
        setTimeout(function() {
            $('.swiper-container-h .swiper-slide--horizontal video')[0].currentTime = 0;
            $('.swiper-container-h .swiper-slide--horizontal video')[0].pause();
        },200)
        let index = $($('.swiper-container-h .swiper-container-v .swiper-slide-active'))
        index.find('.swiper-slide__text--active')
            .removeClass('swiper-slide__text--active')

    },
    onTransitionEnd(swiper) {
        if($('.swiper-container-h .swiper-slide--horizontal.swiper-slide-active video').length) {
            $('.swiper-container-h .swiper-slide--horizontal.swiper-slide-active video').fadeIn();
            $('.swiper-container-h .swiper-slide--horizontal.swiper-slide-active video')[0].play();
        }
        $('.swiper-container-h .swiper-slide--horizontal.swiper-slide-active .swiper-slide-active .swiper-slide__text')
            .addClass('swiper-slide__text--active')
    },
    onTransitionStart(swiper) {
        $('.swiper-container-h .swiper-slide--horizontal.swiper-slide-active .swiper-slide__text')
            .removeClass('swiper-slide__text--active')        
    }
    
});
// SWIPER 1


// MENU SWIPER
 const swiperV1 = new Swiper('.swiper-container-vertical1', {
    direction: 'vertical',
    mousewheelControl: false,
    parallax: true,
    nested: true,
    speed: 1500,
    onlyExternal: true,
    shortSwipes: false,
    longSwipes: false,
    onSlidePrevStart(swiper) {
        if(swiper.activeIndex === 0) {
            $('.swiper-container-vertical1').addClass('swiper-container--active')
            $('.menu-toggler').addClass('menu-toggler--close')
            
        }
    },
    onInit(swiper) {
        swiper.slideTo(2, 0)
    },
    onSlidePrevEnd(swiper) {
        // $('.swiper-container').removeClass('swiper-container--active')
    },
    onSlideNextStart(swiper) {
        // $('.swiper-container').addClass('swiper-container--active')
        
    },
    onSlideChangeEnd(swiper) {
    }
});
// MENU SWIPER


// MENU ACTIONS
$('.menu-toggler').on('click',function() {
    
    swiperV1.slideTo(0);
    $('.swiper-container-vertical1').addClass('swiper-container--active')
    $(this).fadeOut('fast');
    $('.menu-close').fadeIn();
});

$('.menu-close').on('click', function() {
    
    swiperV1.slideTo(2);

    if(swiperV[0].activeIndex === 0 || swiperV[1].activeIndex === 0 || swiperV[2].activeIndex === 0) {
        $('.swiper-container-vertical1').removeClass('swiper-container--active')
    } 
    if(swiperV[0].activeIndex >= 1 || swiperV[1].activeIndex >= 1 || swiperV[2].activeIndex >= 1) {
        $('.swiper-container-vertical1').addClass('swiper-container--active')
    }

    $('.menu-close').fadeOut();
    $('.menu-toggler').fadeIn();
});

$('.swiper-slide__goto').on('click',function() {
    let index = $(this).closest('.swiper-container-v').attr('class').split(' ')[1].split('--')[1] 
    
    swiperV[index].slideNext();
});

// MENU ACTIONS

// RANGE HANDLERS

$("#controls").ionRangeSlider({
    type: "single",
    min: 0,
    max: window.innerWidth - 280,
    from: 0,
    keyboard: true,
    hide_min_max: true,
    onStart: function(data) {},
    onChange: function(data) {
        $('.main-text').fadeOut();
        let computedNow = data.from
        $('.range-slider__anchors').addClass('range-slider__anchors--important');
        if (data.from < firstBreakpoint) {
            slideText($('.swiper-slide--horizontal')[0], data.min, firstBreakpoint, data.from, data.from);
        }
        if (data.from >= firstBreakpoint - firstBreakpoint / 2) {
            $('.menu-toggler').addClass('menu-toggler--active')
            $('.range-slider__anchor').addClass('range-slider__anchor--bordered')
            $('body').animate({'background-color':'#000'}, 5000);
            $('.slider-container').addClass('slider-container--light');
        }
        if (data.from >= firstBreakpoint - 10 && data.from <= firstBreakpoint + 10) {
            
            swiperH.slideTo(1, 1500)
            
            
        }
        if (data.from >= secondBreakpoint - 10 && data.from <= secondBreakpoint + 10) {
            swiperH.slideTo(3, 1500)
            
            
        }
        if (data.from >= thirdBreakpoint - 10 && data.from <= thirdBreakpoint + 10) {
            swiperH.slideTo(5, 1500)
            
        }
        if (data.from >= firstBreakpoint + 10 && data.from < secondBreakpoint - 10) {
            swiperH.slideTo(2, 0)

        } else if (data.from >= secondBreakpoint + 10 && data.from < thirdBreakpoint - 10) {
            swiperH.slideTo(4, 0)
        } else if (data.from >= thirdBreakpoint + 20) {
            swiperH.slideTo(7, 0)
        } else if (data.from < firstBreakpoint - 10) {
            swiperH.slideTo(0, 0)
        }

        if ((data.from <= firstBreakpoint - firstBreakpoint / 2)) {
            $('body').animate({'background-color':'#ffffff'}, 5000);
            $('.menu-toggler').removeClass('menu-toggler--active')
            $('.slider-container').removeClass('slider-container--light');
            $('.range-slider__anchor').addClass('range-slider__anchor--bordered')
        }
    },
    onFinish: function(data) {
        $('.range-slider__anchors').removeClass('range-slider__anchors--important')
        if(data.from <= firstBreakpoint / 2) {
            $('.menu').removeClass('menu--active')
            $('.irs-single').css('left', 0)
            slider.update({from : 0})
            $('.text').addClass('text--active')
            setTimeout(function (){
                $('.text').removeClass('text--active').css('right', -100+'%')
            },1000)
            $('.irs-single').addClass('active')
        } else if( (data.from >= firstBreakpoint / 2 && data.from <= firstBreakpoint) || 
                   (data.from > firstBreakpoint && data.from <= firstBreakpoint + ((secondBreakpoint - firstBreakpoint) / 2)) ) { 
            slider.update({from : firstBreakpoint - 1})
            swiperH.slideTo(1, 1500)
          $('.irs-single').addClass('active')
        } else if ( (data.from >= firstBreakpoint + ((secondBreakpoint - firstBreakpoint) / 2) && data.from < secondBreakpoint ) || 
                (data.from > secondBreakpoint && data.from <= secondBreakpoint + ((thirdBreakpoint - secondBreakpoint) / 2)) ) {
            slider.update({from : secondBreakpoint + 5})
            swiperH.slideTo(3, 1500)
          $('.irs-single').addClass('active')
        } else if (  data.from > secondBreakpoint + ( (thirdBreakpoint - secondBreakpoint) / 2) ) {
            slider.update({from : thirdBreakpoint + 15})
            swiperH.slideTo(5, 1500)
          $('.irs-single').addClass('active')
        }
        $('.irs-single')
            .hover(function() {
                $('.range-slider__anchors').addClass('range-slider__anchors--important');
                globalIn = true;
            })

        .on('mouseout', function() {
            $('.range-slider__anchors').removeClass('range-slider__anchors--important');

        });
    },
    onUpdate: function(data) {

    }
});

let slider = $("#controls").data("ionRangeSlider");

$('.irs-single')
    .hover(function() {
        $('.range-slider__anchors').addClass('range-slider__anchors--important');
        globalIn = true;
    })

.on('mouseout', function() {
    $('.range-slider__anchors').removeClass('range-slider__anchors--important');

});

// RANGE HANDLERS


window.$ = $
window.jQuery = jQuery


// var directionX;
// document.addEventListener('mousemove', function(event) {
//     directionX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
// });
// var lastX;
// $(document).bind('touchmove', function(e) {
//     var currentX = e.originalEvent.touches[0].clientX;
//     if (currentX > lastX) {
//         directionX = 1;
//     } else if (currentX < lastX) {
//         // moved up
//         directionX = -1;
//     }
//     lastX = currentX;
// });