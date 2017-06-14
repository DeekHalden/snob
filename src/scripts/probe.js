(function() {
    var total = 100,
        blobs = new Array(total),
        myfps = 60,
        updateTime = 1000 / myfps,
        mouse_pos = { x: 0, y: 0 },
        canvas = this.__canvas = new fabric.Canvas('c', {
            renderOnAddRemove: false,
            selection: false,
            width: window.innerWidth,
            height: window.innerHeight,
            backgroundImage: '../images/bkg.jpg'
        }),
        maxx = canvas.width,
        maxy = canvas.height,
        msg, startTime, prevTime, ms, frames;

    // canvas.setBackgroundImage('../images/bkg.jpg');
    fabric.Image.fromURL('../images/blob.png', blobLoaded);

    canvas.on('mouse:move', function(options) {
        mouse_pos = canvas.getPointer(options.e);
    });

    function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function getSpeed() {
        return Math.floor(Math.random() * 2);
    }

    function getRandomMove() {
        return Math.random() >= 0.5
    }

    function blobLoaded(img) {
        for (var i = 0; i < total; i++) {
            var img = new fabric.Image(img.getElement(), {
                left: window.innerWidth / 2,
                top: window.innerHeight / 2,
                selectable: false
            });
            img.vx = 0;
            img.vy = 0;
            canvas.add(img);
            blobs[i] = img;
        }

        msg = new fabric.Text('FPS: 0/' + myfps, {
            fontFamily: 'Arial',
            fontSize: 12,
            fill: 'white',
            fontWeight: 'bold',
            left: 50,
            top: 35,
            selectable: false
        });
        canvas.add(msg);

        frames = 0;
        startTime = Date.now(), prevTime = startTime;
        animate();
    }

    function animate() {
        for (var i = 0; i < total; i++) {
            var blob = blobs[i];
            var dx = blob.left - mouse_pos.x;
            var dy = blob.top - mouse_pos.y;
            var vx = blob.vx;
            var vy = blob.vy;
            var direction = randomIntFromInterval(0, 360);
            var xMove = getRandomMove();
            var yMove = getRandomMove();

            // if (dx * dx + dy * dy <= 10000) {
            //     vx += dx * 0.01;
            //     vy += dy * 0.01;
            // }
            // vx *= 0.95;
            // vy *= 0.95;

            if (xMove) {
              vx += (4 / 6) * Math.cos(direction) + getSpeed();
            } else if(!xMove){
              vx -= (4 / 6) * Math.cos(direction) + getSpeed();
            } 
            if(yMove) {
              vy += (4 / 6) * Math.cos(direction) + getSpeed();
            } else if(!yMove) {
              
              vy -= (4 / 6) * Math.cos(direction) + getSpeed();
            }

            var x = blob.left += vx;
            var y = blob.top += vy;

            if (x < 0 || x > maxx || y < 0 || y > maxy) {
                var r = Math.atan2(y - maxy / 2, x - maxx / 2);
                vx = -Math.cos(r);
                vy = -Math.sin(r);
            }

            blob.vx = vx;
            blob.vy = vy;
        }

        var time = Date.now();
        frames++;

        if (time > prevTime + 1000) {
            fps = Math.round((frames * 1000) / (time - prevTime));
            prevTime = time;
            frames = 0;

            msg.setText("FPS: " + fps + "/" + myfps);
        }

        fabric.util.requestAnimFrame(animate, canvas.getElement());
        canvas.renderAll();
    }
})();
