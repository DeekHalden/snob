const jQuery = require('jquery')
const $ = require('jquery')
const autosize = require('autosize')
import { swiper } from 'swiper'
import * as PIXI from 'pixi.js'
import ionRangeSlider from 'ion-rangeslider'
import { validate, validator } from 'jquery-validation'

$(document).ready(function() {
    init()
});

function init() {
    function clearAdditions(e) {
        moveToRandomPosition = false
        moveDiamondToStart = true
        logo.decreaseOpacity()
        text.decreaseOpacity()
        $('.main-text-start').fadeOut()
        $('.slider-container').css({'visibility':'visible'}).animate({'opacity': 1}, 1500)
        

    }
    const app = new PIXI.Application()
    app.renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerWidth, { transparent: true})

    document.body.appendChild(app.view)

    app.renderer.resize(window.innerWidth, window.innerHeight)
    // app.renderer.backgroundColor = "0xffffff"
    // app.renderer.transparent = true
    app.stage.interactive = true
    app.view.classList.add('first-part')
    let innerWidth = window.innerWidth
    let innerHeight = window.innerHeight
    let centerX = innerWidth / 2
    let centerY = innerHeight / 2

    window.onresize = function (){    
        if(!disableResize) {
            location.reload()
        }
    }

    if (location.pathname === '/') {
        var texture0 = './../images/big-diamond.svg'
        var texture1 = './../images/big-diamond-start.svg'
        var texture2 = './../images/big-diamond-end.svg'
        var texture3 = './../images/mask.png'
        var texture4 = './../images/dot.png'
        var texture5 = './../images/dot--small.png'
        var texture6 = './../images/snob-b-w.png'
        var texture9 = './../images/Logo2kx2k.png'

    } else {
        var texture0 = '/snobart/images/big-diamond.svg'
        var texture1 = '/snobart/images/big-diamond-start.svg'
        var texture2 = '/snobart/images/big-diamond-end.svg'
        var texture3 = '/snobart/images/mask.png'
        var texture4 = '/snobart/images/dot.png'
        var texture5 = '/snobart/images/dot--small.png'
        var texture6 = '/snobart/images/snob-b-w.png'
        var texture9 = '/snobart/images/Logo2kx2k.png'

    }


    const diamondTexture = PIXI.Texture.fromImage(texture0)
    const diamondMaskStart = PIXI.Texture.fromImage(texture1)
    const diamondMaskEnd = PIXI.Texture.fromImage(texture2)
    const maskTexture = PIXI.Texture.fromImage(texture3)
    const dotTexture = PIXI.Texture.fromImage(texture4)
    const dotSmallTexture = PIXI.Texture.fromImage(texture5)
    const logoTexture = new PIXI.Texture.fromImage(texture9)

    const dotsCount = 100
    // Variable
    const dotsArray = []
    const smallDots = []
    const anchors = []
    const timelineDots = []
    let moveToRandomPosition
    let moveDiamondToStart = false
    let freeFall = true
    let disableResize = false

    // const arrayOfDots = Array.from({ length: dotsCount }, (i, v) => v)



    class SuperClass {
        constructor(image) {
            this.obj = new PIXI.Sprite(image)
            this.obj.alpha = 0
            this.obj.position.x = centerX
            this.obj.position.y = centerY
            this.obj.anchor.set(.5)

        }
        moveTo(x, y, duration) {
            var duration
            var speed = 0
            var x1 = this.obj.position.x
            var y1 = this.obj.position.y
            var x2 = x
            var y2 = y
            var dx = x2 - x1
            var dy = y2 - y1
            var dist = Math.abs(Math.sqrt(dx * dx + dy * dy))
            if (dist < 100) {
                duration = 100
            } else if (dist < 250 && dist >= 100) {
                duration = duration / 2

            } else if (dist >= 250) {
                duration = duration
            }
            speed = dist / duration
            this.obj.position.x += (x2 - x1) * speed
            this.obj.position.y += (y2 - y1) * speed
        }
    }
    class Anchor extends SuperClass {
        constructor(image, x, y) {
            super(image)
            this.obj = new PIXI.Sprite(image)
            this.obj.position.x = x
            this.obj.position.y = y
            this.obj.anchor.set(.5)
            this.obj.alpha = 0
        }
        increaseOpacity() {
            // rude fadein effect
            if (this.obj.alpha <= 1) {
                this.obj.alpha += .05
            }

        }
        decreaseOpacity() {
            if (this.obj.alpha >= 0) {
                this.obj.alpha -= .05

            }

        }
    }
    // The constructor
    class Diamond extends SuperClass {
        constructor(image) {
            // Just sets up size and assigns the image (through PIXI)
            super(image)
                // this.obj = new PIXI.Sprite(texture)
            this.oldX = 0
            this.obj.alpha = 0
            this.obj.rotation = -Math.PI / 180 * 45
            this.obj.interactive = true
            this.obj.buttonMode = true
            this.obj.defaultCursor = 'pointer'
            this.scaleTick = .1
            this.dragging
            this.moving = true
            this.oldX = 0
            this.direction = ''
            let self = this
            this.interval
            this.fadeIn = true
            setTimeout(() => {
                this.obj.on('mouseover', function(mouseData) {
                    if(self.fadeIn === true) {
                        $('.main-text-start').fadeIn()
                    }
                    moveToRandomPosition = false
                    logo.increaseOpacity()
                    freeFall = false
                    setTimeout(() => {
                        self.obj.on('tap', function(mouseData) {
                            clearAdditions()
                            $('.main-text-start').fadeOut()
                            moveDiamondToStart = true
                        })
                        self.obj.on('mousedown', function(mouseData) {
                            clearAdditions()
                            $('.main-text-start').fadeOut()
                            moveDiamondToStart = true
                        })
                        self.fadeIn = false
                    }, 1500)

                })
                this.obj.on('tap', function(mouseData) {
                    $('.main-text-start').fadeIn()
                    moveToRandomPosition = false
                    logo.increaseOpacity()
                    freeFall = false
                    self.obj.on('tap', function(mouseData) {

                        clearAdditions()
                        moveDiamondToStart = true
                        $('.main-text-start').fadeOut()
                    })
                    self.fadeIn = false
                })
            }, 5000)
        }
        decreaseOpacity() {
            // rude fadein effect
            setInterval(() => {
                this.obj.alpha -= 1

            }, 20)
        }
        increaseOpacity() {
            // rude fadein effect
            this.obj.alpha += .05
        }
        moveTo(x, y, duration) {
            if (this.obj.position.x <= x + 10) {
                this.moving = false
            }

            if (this.moving) {
                let speed = 0
                let x1 = this.obj.position.x
                let y1 = this.obj.position.y
                let x2 = x
                let y2 = y
                let dx = x2 - x1
                let dy = y2 - y1

                let dist = Math.abs(Math.sqrt(dx * dx + dy * dy))
                if (dist < 400) {
                    duration = duration / 2
                }
                if (dist < 300) {
                    duration = duration / 3
                }
                if (dist < 200) {
                    duration = duration / 4
                }
                if (dist < 100) {
                    duration = duration / 5
                }
                if (dist <= x) {
                    setTimeout(() => {
                        this.decreaseOpacity()
                        if ($('canvas')) {
                            
                            $('canvas').css('z-index', 0)
                            app.ticker.remove(create)
                            $('.main-text').fadeIn()
                            $('canvas').remove()
                            disableResize = true
                            $('.menu-toggler').fadeIn()
                            $('.irs-single').css('opacity', '1', 'important')
                        }

                    }, 1000)
                }
                speed = dist / duration


                this.obj.position.x += (x2 - x1) * speed

                this.obj.position.y += (y2 - y1) * speed
            }

        }
        scale() {
            if (this.obj.scale.x >= .07) {
                this.obj.scale.x -= .01
                this.obj.scale.y -= .01
                $(".dots-wrapper").addClass('dots-wrapper--active')
                $(".dots-wrapper .dot").each(function(i) {
                    $(this).delay(15 * i).addClass('dot--active').css('display', 'block')
                });
            } else {
                this.moveTo(135, centerY, 10000)
            }
        }
    }

    class Mask extends SuperClass {
        constructor(image) {
            super(image)
            this.obj.alpha = 1
                // Just sets up size and assigns the image (through PIXI)
        }
    }

    class GradientMaskStart extends Mask {
        constructor(image) {
            super(image)
            // Just sets up size and assigns the image (through PIXI)
            this.obj.rotation = -Math.PI / 180 * 45
            this.obj.position.x = centerX
            this.obj.position.y = centerY
            this.obj.alpha = 0
            this.obj.anchor.set(.5)
            this.add = true
        }
        increaseOpacity() {
            // rude fadein effect+
            if (this.obj.alpha <= 1 && this.add) {
                let self = this
                let interval = setInterval(() => {
                    this.obj.alpha += .05
                    if (this.obj.alpha >= 1) {
                        clearInterval(interval)
                        diamondMaskObjEnd.increaseOpacity()
                        diamondMaskObjStart.decreaseOpacity()
                    }
                }, 50)
                this.add = false
            }
        }
        decreaseOpacity() {
            // rude fadein effect
            if (this.obj.alpha >= 0 && !this.add) {
                let self = this
                let interval = setInterval(() => {
                    this.obj.alpha -= .05
                    if (this.obj.alpha <= 0) {
                        clearInterval(interval)
                        diamondMaskObjEnd.decreaseOpacity()
                    }
                }, 50)
                this.add = true
            }
        }
    }
    class GradientMaskEnd extends GradientMaskStart {
        constructor(image) {
            super(image)
            this.obj.rotation = -Math.PI / 180 * 45

        }
        increaseOpacity() {
            // rude fadein effect+
            if (this.obj.alpha <= 1 && this.add) {
                let self = this
                let interval = setInterval(() => {
                    this.obj.alpha += .05
                    if (this.obj.alpha >= 1) {
                        diamondMaskObjEnd.decreaseOpacity()
                        clearInterval(interval)
                    }
                }, 50)
                this.add = false
            }

        }
        decreaseOpacity() {
            // rude fadein effect
            if (this.obj.alpha >= 0 && !this.add) {
                let self = this
                let interval = setInterval(() => {
                    this.obj.alpha -= .05
                    if (this.obj.alpha <= 0) {
                        clearInterval(interval)
                    }
                }, 50)
                this.add = true
            }
        }
    }


    function rad(angle) {
        return angle * Math.PI / 180
    }

    function arad(radians) {
        return radians * 180 / Math.PI
    }

    

    class Logo extends SuperClass {
        constructor(image) {

            super(image)
            this.obj.alpha = 0
            this.add = true
        }
        increaseOpacity() {
            if (this.obj.alpha <= 1 && this.add) {
                let self = this
                let interval = setInterval(() => {
                    this.obj.alpha += .05
                    if (this.obj.alpha >= 1) {
                        clearInterval(interval)
                    }
                }, 50)
                this.add = false
            }
        }

        decreaseOpacity() {
            if (this.obj.alpha >= 1 && !this.add) {
                let self = this
                let interval = setInterval(() => {
                    this.obj.alpha -= .1
                    if (this.obj.alpha >= 1) {
                        clearInterval(interval)
                    }
                }, 50)
                this.add = true
            }
        }
    }

    class Text {
        constructor(text, x, y) {
            this.obj = new PIXI.Text(text, {
                fontFamily: 'roboto',
                fontSize: 24,
                fill: 0xFFFFFF,
                align: 'center'
            })
            this.obj.alpha = 0
            this.obj.interactive = true
            this.obj.buttonMode = true
            this.obj.defaultCursor = 'pointer'
            this.obj.position.x = x
            this.obj.position.y = y
            this.obj.anchor.set(.5, .5)
            this.add = true
            this.obj.on('tap', function() {
                clearAdditions()
                $('.main-text-start').fadeOut().css('display', 'none')
            })
            this.obj.on('mousedown', function() {
                clearAdditions()
                $('.main-text-start').fadeOut()
                $('.slider-container').css('visibility','visible')
            })
            // this.obj.alpha = 0
        }

        increaseOpacity() {
            if (this.obj.alpha <= 1 && this.add) {
                let self = this
                let interval = setInterval(() => {
                    this.obj.alpha += .05
                    if (this.obj.alpha >= 1) {
                        clearInterval(interval)
                    }
                }, 50)
                this.add = false
            }
        }

        decreaseOpacity() {
            if (this.obj.alpha >= 1 && !this.add) {
                let self = this
                let interval = setInterval(() => {
                    this.obj.alpha -= .1
                    if (this.obj.alpha >= 1) {
                        clearInterval(interval)
                    }
                }, 50)
                this.add = true
            }
        }
    }

    class Dot extends SuperClass {
        constructor(image, direction=45, speed=2) {
            super(image)
           
            this.obj.x = centerX/*this.generateRandomDirection(0, innerWidth)*/
            this.obj.y = centerY/*this.generateRandomDirection(0, innerHeight)*/
            this.obj.initialSpeed = speed + Math.random()
            this.obj.speed = this.obj.initialSpeed
            this.obj.initialDirection = rad(direction)
            this.obj.direction = this.obj.initialDirection
            this.obj.normalizeSpeed = .3
            this.obj.normalizeDirection = rad(2)
     
        }
        generateRandomDirection(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min)
        }

        randomSpeed() {
            return Math.floor(Math.random() * 2) + 1.5
        }
        changeInitialDirection(value) {
            return this.obj.initialDirection = rad(45)
        }
        moveDot() {
            let {
                x,
                y,
                speed,
                direction,
                initialSpeed,
                initialDirection,
                normalizeSpeed,
                normalizeDirection
            } = this.obj

            function closest(fr, to, shift) {
                let res
                if (fr > to) {
                    res = fr - shift

                    return res < to ? to : res
                }

                if (fr < to) {
                    res = fr + shift

                    return res > to ? to : res
                }
            }

            if (speed != initialSpeed) {
                speed = this.obj.speed = closest(speed, initialSpeed, normalizeSpeed)
            }

            if (direction != initialDirection) {
                let [sa, ea, na] = [arad(direction), arad(initialDirection), arad(normalizeDirection)]
                if (!(sa > ea + 180 || sa < ea)) na = 0 - na
                // let [lg, lw] = [Math.abs(ea - sa), 360 - Math.abs(ea - sa)]
                // let current = (lg > lw ? sa + na : sa - na) % 360
                let current = (sa + na) % 360

                // console.log(inc, dec, current, sa, ea)
                direction = this.obj.direction = rad(Math.abs(current - ea) > na ? current : ea)
            }

            let x2 = Math.cos(direction) * speed
            let y2 = Math.sin(direction) * speed

            x = this.obj.x = x + x2
            y = this.obj.y = y + y2

            if (x > innerWidth) {
                this.obj.x = x - innerWidth
            }

            if (x <= 0) {
                this.obj.x = innerWidth
            }

            if (y > innerHeight) {
                this.obj.y = y - innerHeight
            }

            if (y <= 0) {
                this.obj.y = innerHeight
            }


        }

        moveTo(cx, cy, duration) {
            // if (!this.collidable) return

            let {
                x,
                y,
                speed,
                direction,
                initialSpeed,
                initialDirection,
                normalizeSpeed,
                normalizeDirection
            } = this.obj
            let dx = cx - x
            let dy = cy - y
            let distance = Math.sqrt(dx*dx + dy*dy)

            let angle = arad(Math.acos(dx / distance))
            if(y > innerHeight / 2) {
                this.obj.initialDirection = this.obj.direction = -(rad(angle))
            } else {
                this.obj.initialDirection = this.obj.direction = rad(angle)
            }
            this.obj.initialSpeed = this.obj.speed = distance / duration
        }
    }


    class SmallDot extends Dot {
        constructor(image, direction, speed=3.5) {
            super(image, direction, speed)
            
            this.collidable = true
        }
        // randomSpeed() {
        //     return Math.floor(Math.random() * 1) + 1
        // }
        collide(cx, cy, radius) {
            if (!this.collidable) return

            let {
                x,
                y,
                speed,
                direction,
                initialSpeed,
                initialDirection,
                normalizeSpeed,
                normalizeDirection
            } = this.obj
            let dx = cx - x
            let dy = cy - y
            let distance = Math.sqrt(dx*dx + dy*dy)

            if (distance <= radius && dy > 0) {
                let angle = arad(Math.acos(dx / distance))
                if (angle < 0) {
                    angle = 360 + angle
                }

                let dir = arad(this.obj.direction)

                // if (!(dir + 30 > angle && dir - 30 < angle)) {
                // }
                this.obj.direction = rad((angle + 180) % 360)
            }

            if (distance <= radius) {
                this.obj.speed += this.obj.normalizeSpeed * 2
            }
        }
    }
    let rand = () => {
        return Math.floor(Math.random() * (360 - 1)) + 1   
    }
    let diamond = new Diamond(diamondTexture)
    let mask = new Mask(maskTexture);
    let diamondMaskObjStart = new GradientMaskStart(diamondMaskStart);
    let diamondMaskObjEnd = new GradientMaskEnd(diamondMaskEnd);
    // let gradientMask = new GradientMask(diamondMaskEnd);
    let text = new Text('CLICK TO ENTER WEBSITE', centerX, centerY + 255);

    let logo = new Logo(logoTexture);
   

    for (var i = 0; i < 100; i++) {
        let randomDirection = rand()
        var smallDot = new SmallDot(dotTexture,randomDirection);

        if (i % 3 === 0) {
            var dot = new Dot(dotSmallTexture, randomDirection);
            dotsArray.push(dot);
            app.stage.addChild(dot.obj);
        }
        smallDots.push(smallDot)
        app.stage.addChild(smallDot.obj);
    }
    app.stage.addChild(mask.obj);
    app.stage.addChild(diamond.obj);
    app.stage.addChild(diamondMaskObjStart.obj);
    app.stage.addChild(diamondMaskObjEnd.obj);
    app.stage.addChild(text.obj);
    app.stage.addChild(logo.obj);

    var diamondInterval = setInterval(() => {
        diamond.increaseOpacity()
    }, 35);
    if (diamond.obj.alpha >= 1) {
        clearInterval(diamondInterval);
    }
    
    const interval = setInterval(() => {
        if (diamondMaskObjStart.add) {
            diamondMaskObjStart.increaseOpacity()
        } else {
            diamondMaskObjStart.decreaseOpacity()
        }
    }, 10000);
    let changeDirection = false
    let freemove = true
    function create() {
        if(freemove) {
            dotsArray.forEach(dot => {
                dot.moveDot( /*smallDot.randomX, smallDot.randomY*/ )
                dot.obj.alpha = 1
            });
            smallDots.forEach(dot => {
                dot.moveDot( /*smallDot.randomX, smallDot.randomY*/ )
                dot.obj.alpha = 1
                dot.collide(app.renderer.plugins.interaction.mouse.global.x, app.renderer.plugins.interaction.mouse.global.y, 120)
            });
            setTimeout(()=> {
                freemove = false
            },2500)
        }
        
        setTimeout( () => {
            changeDirection = true 
        
        }, 2000)

        if(changeDirection) {
            dotsArray.forEach(dot => {
                dot.moveDot( /*smallDot.randomX, smallDot.randomY*/ )
                dot.changeInitialDirection(45)
           
            });
            smallDots.forEach(dot => {
                dot.moveDot( /*smallDot.randomX, smallDot.randomY*/ )
                dot.changeInitialDirection(45)
                dot.collide(app.renderer.plugins.interaction.mouse.global.x, app.renderer.plugins.interaction.mouse.global.y, 120)
            });   
        }

        if (!moveToRandomPosition ) {
            dotsArray.forEach(dot => {
                dot.moveTo(centerX, centerY, 50)
            })
            smallDots.forEach(dot => {
                dot.moveTo(centerX, centerY, 50)   
            })
            setTimeout(function() {
                dotsArray.forEach(dot => app.stage.removeChild(dot.obj));
                smallDots.forEach(dot => app.stage.removeChild(dot.obj));
                
            }, 1500)
            
        }
        if (!moveToRandomPosition && moveDiamondToStart) {
            setTimeout(function() {
                $('.slider-container').fadeIn('slow');
                clearInterval(interval);
                app.stage.removeChild(dot.obj);
                app.stage.removeChild(mask.obj);
                app.stage.removeChild(diamondMaskObjStart.obj);
                app.stage.removeChild(diamondMaskObjEnd.obj);
                app.stage.removeChild(logo.obj);
                app.stage.removeChild(text.obj);

                diamond.scale();
            }, 1500)
        }
    }

    setTimeout(function() {
        moveToRandomPosition = true
        app.ticker.add(create);
    }, 1000)
}





// GLOBALS
let globalIn = false;
let offset = 110;
let anchorSize = 26
let anchors = $('.range-slider__anchor');
let firstBreakpoint = $(anchors[1]).offset().left - offset - anchorSize /2;
let secondBreakpoint = $(anchors[2]).offset().left - offset - anchorSize/ 2;
let thirdBreakpoint = $(anchors[3]).offset().left - offset - anchorSize /2;
let breakpoints = [firstBreakpoint, secondBreakpoint, thirdBreakpoint]
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
    paginationClickable: true,
    onlyExternal: true,
    shortSwipes: false,
    longSwipes: false,
    breakpoints: {
        1367: {
            onlyExternal: false,
            longSwipes: true,
            shortSwipes: true,
            mousewheelForceToAxis: false,
            parallax: false
            
        },  
    },   
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
        
        if(swiper.activeIndex >= 1 && swiper.activeIndex < 5) {
            $('.menu-toggler').removeClass('menu-toggler--active')
            $('.map-container').fadeOut(1000)
            $('.swiper-slide--map').removeClass('swiper-slide--map-active')
            $('.swiper-slide-active .wrapper--black').removeClass('wrapper--black-active')
            $(".swiper-slide-active .map-container__dot").each(function(i) {
                $(this).delay(500 * i).fadeOut()
            });
        } else {
            $('.menu-toggler').addClass('menu-toggler--active')
            $('.wrapper').removeClass('wrapper--white-active')
        }
        $('.swiperV-pagination').addClass('swiperV-pagination--active');
        
        let contentNotActive = $('.swiper-slide--horizontal.swiper-slide-active .swiper-slide').find('.swiper-slide__content');
        // setTimeout(function() {
        $(contentNotActive).delay(1000).queue(function(next) {
            $(this).removeClass('swiper-slide__content--active').removeClass('swiper-slide__content--active-top')
            next()
        })
        if(swiper.activeIndex === 1) {
        }
        $('.swiper-slide-active .swiper-slide-active .swiper-slide-active .wrapper--white').addClass('wrapper--white-active')
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
        
    },
    onTransitionEnd(swiper) {
        if(swiper.activeIndex === 5) {
            $('.swiper-slide-active .swiper-slide-active .swiper-slide-active .wrapper--black').addClass('wrapper--black-active')
            $('.swiper-slide--map').addClass('swiper-slide--map-active')
            $('.map-container').fadeIn(4000)
            setTimeout(function() {
                $(".swiper-slide-active .swiper-slide-active .map-container__dot").each(function(i) {
                    $(this).delay(500 * i).fadeIn(500)
                })
            },4000)
            let lastIndex = 0
            $('.swiper-slide-active .swiper-slide-active .map-container__dot').hover(function(e) {
                let id = $(this).data('id')
                if(id === lastIndex) return
                $('.swiper-slide__dot-description p').css('display', 'none')
                $('.swiper-slide__dot-description p[data-id='+id+']').fadeIn(500)
                lastIndex = id
            })
        } 

    }
    

});
// SWIPER 2-6

// SWIPER 1
const swiperH = new Swiper('.swiper-container-h', {
    mousewheelForceToAxis: true,
    pagination: '.swiperH-pagination',
    effect: 'fade',
    paginationClickable: true,
    shortSwipes: false,
    onlyExternal: true,
    longSwipes: false,
    parallax: true,
    breakpoints: {
        1367: {
            onlyExternal: false,
            longSwipes: true,
            shortSwipes: true,
            mousewheelForceToAxis: false,
            parallax: false
            
        }
    },
    onInit() {
        
    },
    onSlideChangeStart(swiper) {
        setTimeout(function() {
            // $('.swiper-container-h .swiper-slide--horizontal video')[0].currentTime = 0;
            $('.swiper-container-h .swiper-slide--horizontal video').each(function() {
                $(this)[0].pause()
            })
        },200)
        let index = $($('.swiper-container-h .swiper-container-v .swiper-slide-active'))
        index.find('.swiper-slide__text--active')
            .removeClass('swiper-slide__text--active')
        if( ($('.swiper-container-h .swiper-slide--horizontal video').duration === 
             $('.swiper-container-h .swiper-slide--horizontal video').currentTime ) && 
             $('.swiper-container-h .swiper-slide--horizontal.swiper-slide-active video').length > 0 ) {
                
                
                 $('.swiper-container-h .swiper-slide--horizontal.swiper-slide-active video')[0].currentTime = 0
            }
    },
    onTransitionEnd(swiper) {
        if($('.swiper-container-h .swiper-slide--horizontal.swiper-slide-active video').length) {
            $('.swiper-container-h .swiper-slide--horizontal.swiper-slide-active video').fadeIn();
            $('.swiper-container-h .swiper-slide--horizontal.swiper-slide-active video')[0].play()
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
        
    },
    onSlideNextStart(swiper) {
        
    },
    onSlideChangeEnd(swiper) {
    }
});
// MENU SWIPER


// MENU ACTIONS
$('.menu-toggler').on('click',function() {
    
    swiperV1.slideTo(0);
    $('.swiper-container-vertical1').addClass('swiper-container--active')
    $(this).fadeOut(1);
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

    $('.menu-close').fadeOut(1);
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
            $('.body').addClass('body--active')
            $('.dot').addClass('dot--light')
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
            $('.body').removeClass('body--active')
            $('.menu-toggler').removeClass('menu-toggler--active')
            $('.dot').removeClass('dot--light');
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
// $(window).resize(function() {
//     if($(window).width() < 1366) {
//         slider.destroy()
//     }
// })

// if($(window).width() < 1366) {
//     slider.destroy()
// }

$('.irs-single')
    .hover(function() {
        $('.range-slider__anchors').addClass('range-slider__anchors--important');
        globalIn = true;
    })

.on('mouseout', function() {
    $('.range-slider__anchors').removeClass('range-slider__anchors--important');

});


$('#contact__name, #contact__email').on('keydown keyup', function(e) {
    var max = 50
    if (e.which < 0x20) {
        // e.which < 0x20, then it's not a printable character
        // e.which === 0 - Not a character
        return // Do nothing
    }
    if (this.value.length == max) {
        e.preventDefault()
    } else if (this.value.length > max) {
        // Maximum exceeded
        this.value = this.value.substring(0, max)
    }
})

$('#contact__message').on('keydown keyup', function(e) {
    var max = 500
    // this.style.height = (25+this.scrollHeight)+"px"
    if (e.which < 0x20) {
        // e.which < 0x20, then it's not a printable character
        // e.which === 0 - Not a character
        return // Do nothing
    }
    if (this.value.length == max) {
        e.preventDefault()
    } else if (this.value.length > max) {
        // Maximum exceeded
        this.value = this.value.substring(0, max)
    }
});

autosize($('#contact__message'))

$.validator.addMethod("alpha", function(value, element) {
    return this.optional(element) || value == value.match(/^[a-zA-Zа-яА-Я ]+$/);
});

$.validator.addMethod("emailMethod", function(value, element) {
    let isEmail = this.optional(element) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(value);
    return isEmail
});

$('#contact-form').validate({
    debug: true,
    rules: {
        contact__name: {
            required: true,
            alpha: true
        },
        contact__email: {
            required: true,
            emailMethod: true
        },
        contact__message: {
            required: true
        }
    },
    messages: {
        contact__name: "",
        contact__email: "",
        contact__message: ""
    },
    submitHandler(form) {
        let data = $(form).serialize();
            $.ajax({
                    url: '',
                    type: 'POST',
                    data: data,
                })
                .done(function() {
                    form.reset();
                    console.log("success");
                })
                .fail(function() {
                    console.log("error");
                })
                .always(function() {
                    console.log("complete");
                });
    }
});

$("#contact__name, #contact__email, #contact__message").on('keydown keyup mouseup',function () {
    if ($(this).valid() == true ) {
        $(this).addClass('swiper-slide__input--active')
    } else {
        $(this).removeClass('swiper-slide__input--active')
    }
    if($('#contact-form').valid()) {
        $('.swiper-slide__input--submit').fadeIn()
    } else {
        $('.swiper-slide__input--submit').fadeOut()

    }
})
let createTags = (function () {
    const bullets = $('.swiperH-pagination.swiper-pagination-clickable.swiper-pagination-bullets .swiper-pagination-bullet:nth-child(2),'+
                      '.swiperH-pagination.swiper-pagination-clickable.swiper-pagination-bullets .swiper-pagination-bullet:nth-child(4),'+
                      '.swiperH-pagination.swiper-pagination-clickable.swiper-pagination-bullets .swiper-pagination-bullet:nth-child(6)')
    const pagslides = $('.swiper-slide--horizontal:nth-child(2),'+
                     ' .swiper-slide--horizontal:nth-child(4),'+
                     ' .swiper-slide--horizontal:nth-child(6)')
    let names = []
    pagslides.each(function(i) {
        names.push($(this).data('name'))
    })
    bullets.each(function(i){
        $(this).text(names[i])
        $(this).attr('id',  i)

    })
    
    bullets.click(function(e) {
        $('.menu-toggler').addClass('menu-toggler--active')
        $('.dot').addClass('dot--light')
        let target = e.target
        let id = target.id
        
        
        if(+id === $('.swiper-container-h .swiper-slide--horizontal.swiper-slide-active').data('id')) return   
        if(id === '0') {
            slider.update({from : breakpoints[id] - 1 })
        } 
        if(id === '1') {

            slider.update({from : breakpoints[id]  + 5 })
        } 
        if(id === '2') {
            slider.update({from : breakpoints[id]  + 15 })
        }
        for(let i =0; i < swiperV.length; i++) {
            swiperV[i].slideTo(0, 0)
        }
        $('.irs-single').css('opacity', '1', 'important')
        $('.menu-close').trigger('click')
    })
})();

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