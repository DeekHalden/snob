const jQuery = require('jquery')
const $ = require('jquery')
const autosize = require('autosize')
import { swiper } from 'swiper'
import * as PIXI from 'pixi.js'
import ionRangeSlider from 'ion-rangeslider'
import { validate, validator } from 'jquery-validation'


function init() {
    function clearAdditions(e) {
        moveToRandomPosition = false
        moveDiamondToStart = true
        logo.decreaseOpacity()
        text.decreaseOpacity()
        $('.main-text-start').fadeOut()
        


    }
    console.log(window.innerWidth)
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

    window.onresize = function() {
        if (!disableResize) {
            location.reload()
        }
    }

    if (!!window.MSInputMethodContext && !!document.documentMode) {
        if (location.pathname === '/' || location.pathname === '/index.tablet.html') {
            var texture0 = './../images/big-diamond.png'
            var texture1 = './../images/big-diamond-start.png'
            var texture2 = './../images/big-diamond-end.png'
        } else {
            var texture0 = '/snobart/images/big-diamond.png'
            var texture1 = '/snobart/images/big-diamond-start.png'
            var texture2 = '/snobart/images/big-diamond-end.png'
        }

    } else {
        if (location.pathname === '/' || location.pathname === '/index.tablet.html') {
            var texture0 = './../images/big-diamond.svg'
            var texture1 = './../images/big-diamond-start.svg'
            var texture2 = './../images/big-diamond-end.svg'

        } else {
            var texture0 = '/snobart/images/big-diamond.svg'
            var texture1 = '/snobart/images/big-diamond-start.svg'
            var texture2 = '/snobart/images/big-diamond-end.svg'

        }

    }

    if (location.pathname === '/' || location.pathname === '/index.tablet.html') {
        var texture3 = './../images/mask.png'
        var texture4 = './../images/dot2x.png'
        var texture5 = './../images/dot--small.png'
        var texture6 = './../images/snob-b-w.png'
        var texture9 = './../images/Logo2kx2k.png'
    } else {
        var texture3 = '/snobart/images/mask.png'
        var texture4 = '/snobart/images/dot2x.png'
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
            this.obj.scale.x = .5
            this.obj.scale.y = .5

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
            this.obj.alpha = 0
            this.obj.rotation = -Math.PI / 180 * 45
            this.obj.interactive = true
            this.obj.buttonMode = true
            this.obj.defaultCursor = 'pointer'
            this.scaleTick = .1
            this.dragging
            this.moving = true
            this.direction = ''
            let self = this
            this.interval
            this.fadeIn = true
            setTimeout(() => {
                this.obj.on('mouseover', function(mouseData) {
                    if (self.fadeIn === true) {
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
                    if (self.fadeIn === true) {
                       $('.main-text-start').fadeIn()
                    }
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
            if (this.obj.position.y >= y + 10) {
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
                    duration = duration / 7
                }
                if (dist <= 10) {
                    $('.main-container').addClass('main-container--active')
                    $('.intro').delay(1000).fadeIn(1000)
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
            if (this.obj.scale.x >= .01) {
                this.obj.scale.x -= .01
                this.obj.scale.y -= .01
                // $(".dots-wrapper").addClass('dots-wrapper--active')
                // $(".dots-wrapper .dot").each(function(i) {
                //     $(this).delay(15 * i).addClass('dot--active').css('display', 'block')
                // });
            } else {
                this.moveTo(centerX, innerHeight - 80, 20000)
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
                $('.main-container').css('visibility', 'visible')
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
        constructor(image, direction = 45, speed = .5) {
            super(image)

            this.obj.x = centerX /*this.generateRandomDirection(0, innerWidth)*/
            this.obj.y = centerY /*this.generateRandomDirection(0, innerHeight)*/
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
            let distance = Math.sqrt(dx * dx + dy * dy)

            let angle = arad(Math.acos(dx / distance))
            if (y > innerHeight / 2) {
                this.obj.initialDirection = this.obj.direction = -(rad(angle))
            } else {
                this.obj.initialDirection = this.obj.direction = rad(angle)
            }
            this.obj.initialSpeed = this.obj.speed = distance / duration
        }
    }


    class SmallDot extends Dot {
        constructor(image, direction, speed = 1.5) {
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
            let distance = Math.sqrt(dx * dx + dy * dy)

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
        var smallDot = new SmallDot(dotTexture, randomDirection);

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
        if (freemove) {
            dotsArray.forEach(dot => {
                dot.moveDot( /*smallDot.randomX, smallDot.randomY*/ )
                dot.obj.alpha = 1
            });
            smallDots.forEach(dot => {
                dot.moveDot( /*smallDot.randomX, smallDot.randomY*/ )
                dot.obj.alpha = 1
                dot.collide(app.renderer.plugins.interaction.mouse.global.x, app.renderer.plugins.interaction.mouse.global.y, 120)
            });
            setTimeout(() => {
                freemove = false
            }, 2500)
        }

        setTimeout(() => {
            changeDirection = true

        }, 2000)

        if (changeDirection) {
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

        if (!moveToRandomPosition) {
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

function initSecondPart() {
    const swiperH = new Swiper('.main-container', {
        paginationClickable: true,
        parallax: true,
        onlyExternal: true,
        effect: 'slide',
        onInit: function(swiper) {
            let text = $('.swiper-slide--horizontal.swiper-slide-active').data('name')
            $('.text p').text(text)
        },
        onTransitionStart: function(swiper) {
            let text = $('.swiper-slide--horizontal.swiper-slide-active').data('name')
            $('.text p').text(text)
        }
    });
    const swiperPagination = new Swiper('.swiper-pagination', {
        slideToClickedSlide: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        touchRatio: 0.2,
        paginationClickable: true,
        // onlyExternal: true,
        effect: 'slide',
        
    });
    $('.intro__enter').on('click', function(e) {
        e.preventDefault()
        swiperH.slideTo(0,1500)
        $(this).parent().fadeOut()
        $('.swiper-wrapper').fadeIn()
        $('.swiper-pagination').addClass('swiper-pagination--active')
    });

    $('.swiper-slide__goto-wrapper').click(function(e) {
        console.log(1)
    })
    swiperH.params.control = swiperPagination;
    swiperPagination.params.control = swiperH;
    $('.swiper-slide__goto,  .text__goto').on('click', function(event){
        event.preventDefault()
        $('html, body').animate({
            scrollTop: $( $.attr(this, 'href') ).offset().top - 35
        }, 500)
    });
    
    // console.log($(window).scrollTop())
    $(window).scroll(function() {
        let el = $('.swiper-slide__additional-wrapper')[1];
        if($(window).scrollTop() >= $(el).offset().top - 80) {
            $('.swiper-slide__text-wrapper').addClass('swiper-slide__text-wrapper--active')
            $('.text').addClass('text--active')
            $('.swiper-slide').addClass('swiper-slide--active')
            $('.swiper-slide__additional-wrapper').addClass('swiper-slide__additional-wrapper--active')
            $('.text__left').fadeIn(100)
        } else {
            $('.text').removeClass('text--active')
            $('.swiper-slide__text-wrapper').removeClass('swiper-slide__text-wrapper--active')
            $('.swiper-slide').removeClass('swiper-slide--active')
            $('.swiper-slide__additional-wrapper').removeClass('swiper-slide__additional-wrapper--active')
            $('.text__left').fadeOut()
        }
        if($(window).scrollTop() >= $($('.swiper-slide__additional-wrapper')[0]).offset().top + 40) {
            $('.text__goto').fadeIn()
        } else {
            $('.text__goto').fadeOut()
            
        }
    })
    if($(window).scrollTop() >= $($('.swiper-slide__additional-wrapper')[0]).offset().top + 40) {
            $('.text__goto').fadeIn()
        } else {
            $('.text__goto').fadeOut()
            
        }

}


$(document).ready(function() {
    // init()
    initSecondPart()
})