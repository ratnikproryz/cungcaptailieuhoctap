
        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");
        
        var holderCanvas = document.getElementById('holderCanvas');
        var cs = getComputedStyle(holderCanvas);
        var width = parseInt(cs.getPropertyValue('width'), 10);
        var height = parseInt(cs.getPropertyValue('height'), 10);
        
        canvas.width = width;
        canvas.height = height;
        
        var canvasWidth = canvas.width;
        var canvasHeight = canvas.height;
        
        var dots = [];
        var r = Math.floor(Math.random() * 255) + 50;
        var g = Math.floor(Math.random() * 255) + 50;
        var b = Math.floor(Math.random() * 255) + 50;
        var radius = Math.floor(Math.random() * 50) + 10;
        
        function Dot(xCoordinate, yCoordinate, radiusValue, rValue, gValue, bValue, aValue) {
            this.x = xCoordinate;
            this.y = yCoordinate;
            this.radius = radiusValue;
            this.r = rValue;
            this.g = gValue;
            this.b = bValue;
            this.a = aValue;
        }
        
        function dotFilter(element) {
            return element.y >= 0 && element.a >= 0;
        }
        
        function drawDots() {
            ctx.fillStyle = "rgb(0,0,0)";
            ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        
            if (dots.length === 0) {
                return;
            }
        
            dots = dots.filter(dotFilter);
        
            for (i = 0; i < dots.length; i = i + 1) {
                dots[i].y = dots[i].y - 1;
                dots[i].a = dots[i].a - 0.05;
        
                ctx.save();
                ctx.beginPath();
                ctx.arc(dots[i].x, dots[i].y, dots[i].radius, 0, 2 * Math.PI, true);
                ctx.fillStyle = "rgba(" + dots[i].r + "," + dots[i].g + "," + dots[i].b + "," + dots[i].a + ")";
                ctx.fill();
                ctx.restore();
            }
        }
        
        canvas.onmousemove = function(e) {
            var mouseX, mouseY;
        
            if (e.offsetX) {
                mouseX = e.offsetX;
                mouseY = e.offsetY;
            }
            else if (e.layerX) {
                mouseX = e.layerX;
                mouseY = e.layerY;
            }
        
            r = Math.floor(Math.random() * 255) + 50;
            g = Math.floor(Math.random() * 255) + 50;
            b = Math.floor(Math.random() * 255) + 50;
            radius = Math.floor(Math.random() * 50) + 10;
        
            dots.push(new Dot(mouseX - 4, mouseY - 4, radius, r, g, b, 1));
        };
        
        function clearScreen() {
            ctx.fillStyle = "rgb(0,0,0)";
            ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        }
        
        ctx.fillStyle = "rgb(0, 0, 0)";
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        
        window.setInterval(drawDots, 1100);