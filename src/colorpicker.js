
(function ($) {
    $.fn.ColorPicker = function () {
        // extend the options from pre-defined values:
        var options = $.extend({
            callback: function () { }
        }, arguments[0] || {});

        // Utility functions (ignore mostly)
        function hsv2rgb(h, s, v) {
            var c = v * s;
            var h1 = h / 60;
            var x = c * (1 - Math.abs((h1 % 2) - 1));
            var m = v - c;
            var rgb;

            if (typeof h == 'undefined') rgb = [0, 0, 0];
            else if (h1 < 1) rgb = [c, x, 0];
            else if (h1 < 2) rgb = [x, c, 0];
            else if (h1 < 3) rgb = [0, c, x];
            else if (h1 < 4) rgb = [0, x, c];
            else if (h1 < 5) rgb = [x, 0, c];
            else if (h1 <= 6) rgb = [c, 0, x];

            return [255 * (rgb[0] + m), 255 * (rgb[1] + m), 255 * (rgb[2] + m)];
        }
        function hsv2rgbString(h, s, v) {
            var rgb = hsv2rgb(h, s, v);
            rgb = rgb.map(Math.round);
            return "rgb(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ")";
        }
        function findPos(obj) {
            var curleft = 0, curtop = 0;
            if (obj.offsetParent) {
                do {
                    curleft += obj.offsetLeft;
                    curtop += obj.offsetTop;
                } while (obj = obj.offsetParent);
                return { x: curleft, y: curtop };
            }
            return undefined;
        }

        function rgbToHex(r, g, b) {
            if (r > 255 || g > 255 || b > 255)
                throw "Invalid color component";
            return ((r << 16) | (g << 8) | b).toString(16);
        }
        function uniqueID() {
            function chr4() {
                return Math.random().toString(16).slice(-4);
            }
            return chr4() + chr4() +
                '-' + chr4() +
                '-' + chr4() +
                '-' + chr4() +
                '-' + chr4() + chr4() + chr4();
        }
        var Color;
        function ChangeColor(element, hex) {
            Color = hex;

            options.callback.call(this, hex);
            $(element).css('background-color', hex);
        }
        // Code
        var container = $(this);
        container.addClass("colorpicker");
        var randomid = "canvas_" + uniqueID();
        container.html("<canvas id=\"" + randomid + "\" class=\"picker\">nothing</canvas><br /><div class=\"picked\"><button class=\"setwhite\"><i class=\"far fa-sun\"></i></button><div class=\"selectedbox\"></div><button class=\"off\"><i class=\"fas fa-power-off\"></i></button></div>");
      
        
        var canvas = document.getElementById(randomid);

        var offsetWidth = canvas.offsetWidth;
        canvas.setAttribute("width", offsetWidth);
        canvas.setAttribute("height", offsetWidth);

        $('#' + randomid).click(function (e) {
            var that = this;
            var pos = findPos(that);
            var x = e.pageX - pos.x;
            var y = e.pageY - pos.y;
            var coord = "x=" + x + ", y=" + y;

            var c = that.getContext('2d');
            var p = c.getImageData(x, y, 1, 1).data;
            var hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
            var element = container.find(".selectedbox");
            ChangeColor(element, hex);
        });
        var whiteButton = container.find("button.setwhite");
        whiteButton.click(function (e) {
            var element = container.find(".selectedbox");
            ChangeColor(element, "#fff");
        });
        var offButton = container.find("button.off");
        offButton.click(function (e) {

            var element = container.find(".selectedbox");
            ChangeColor(element, "#000");
        });
        var context = $(canvas)[0].getContext("2d");
        var x = canvas.width / 2;
        var y = canvas.height / 2;
        var borderWidth = 0;
        var totalRadius = canvas.width / 2 - borderWidth - 5;
        var type = "hsv";

        // To trigger anti aliasing, performance is poor even without it
        context.moveTo(x, y);

        var drawPicker = function (rValue) {

            context.clearRect(0, 0, canvas.offsetWidth, canvas.offsetWidth);
            context.lineWidth = 1;
            var t2 = totalRadius/2;
            for (var i = totalRadius/2; i <= totalRadius; i++) {
                var radius = totalRadius - i;
                var saturation = Math.floor(radius / totalRadius *200) / 100;

                if (type == "hsl") {
                    var lightness = 1;
                    lightness = rValue;
                } else if (type == "hsv") {
                    var value =  rValue;
                }
                for (var angle = 0; angle <= 360; angle += 1) {
                    var startAngle = (angle - 1) * Math.PI / 180;
                    var endAngle = (angle + 1) * Math.PI / 180;
                    context.beginPath();
                    context.arc(x, y, radius, startAngle, endAngle, false);
                    context.closePath();
                    if (type == "hsl") {
                        context.strokeStyle =  'hsl(' + angle + ', ' + saturation * 100 + '%, ' + lightness * 100 + '%)';
                    } else if (type == "hsv") {         
                        context.strokeStyle =  hsv2rgbString(angle, saturation, value);   
                    }
                    context.stroke();
                }
            }
            for (var i = 0; i <= totalRadius/2; i++) {
                var radius = totalRadius - i;
                var saturation = Math.floor(radius / totalRadius *200) / 100;

                if (type == "hsl") {
                    var lightness = 1;
                    lightness = rValue;
                } else if (type == "hsv") {
                    var value = rValue * i/(totalRadius/2);
                }

                for (var angle = 0; angle <= 360; angle += 1) {
                    var startAngle = (angle - 1) * Math.PI / 180;
                    var endAngle = (angle + 1) * Math.PI / 180;
                    context.beginPath();
                    context.arc(x, y, radius, startAngle, endAngle, false);
                    context.closePath();
                    if (type == "hsl") {
                        context.strokeStyle =  'hsl(' + angle + ', ' + saturation * 100 + '%, ' + lightness * 100 + '%)';
                    } else if (type == "hsv") {
                        context.strokeStyle =  hsv2rgbString(angle, saturation, value);                      
                    }
                    context.stroke();
                }
            }
            // Draw the final black borders
            context.strokeStyle = "#7f8c8d";
            context.lineWidth = borderWidth;
            context.beginPath();
            var borderRadius = totalRadius + borderWidth / 2;
            context.arc(x, y, borderRadius, 0, 2 * Math.PI, false);
            context.closePath();
            context.stroke();
        }

        drawPicker(1);

    }
}(jQuery));

