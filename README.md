# ColorPicker

Colorpicker is a simple jQuery plugin for color picking, it's built for my SmartHome software (controlling RGB LedStrip)
# New Features:
  - Can choose a color
  - When picked it, a CallBack run with the color value. 
  - Black and White buttons

> The overriding design goal for Markdown's
> formatting syntax is to make it as readable
> as possible. The idea is that a
> Markdown-formatted document should be
> publishable as-is, as plain text, without
> looking like it's been marked up with tags
> or formatting instructions.

This text you see here is *actually* written in Markdown! To get a feel for Markdown's syntax, type some text into the left window and watch the results in the right.

### Tech

Dillinger uses a number of open source projects to work properly:

* [AngularJS] - HTML enhanced for web apps!
* [Ace Editor] - awesome web-based text editor
* [markdown-it] - Markdown parser done right. Fast and easy to extend.
* [Twitter Bootstrap] - great UI boilerplate for modern web apps
* [node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework [@tjholowaychuk]
* [Gulp] - the streaming build system
* [Breakdance](http://breakdance.io) - HTML to Markdown converter
* [jQuery] - duh

And of course Dillinger itself is open source with a [public repository][dill]
 on GitHub.

### How to use?

It's simple, just see the following html: 

```
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>The HTML5 colorpicker</title>
    <meta name="description" content="The HTML5 colorpicker">
    <meta name="author" content="maros">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="colorpicker.css">
</head>
<body>
    <br/>
    <div class="pickerarea" style="display: inline-block">
    </div>
    <div class="pickerarea2" style="display: inline-block">
    </div>
    <div class="pickerarea3" style="display: inline-block">
    </div>
    <script src="https://code.jquery.com/jquery-3.4.1.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
    <script src="https://kit.fontawesome.com/02bc8a7f79.js" crossorigin="anonymous"></script>
    <script src="colorpicker.js"></script>
    <script>
        $(document).ready(function () {
            $(".pickerarea").ColorPicker(
                {
                    callback: function(color){
                        console.log("Color is: "+color);
                    }
                }
            );
            $(".pickerarea2").ColorPicker(
                {
                    callback: function(color){
                        console.log("Color is: "+color);
                    }
                }
            );
            $(".pickerarea3").ColorPicker(
                {
                    callback: function(color){
                        console.log("Color is: "+color);
                    }
                }
            );
        });
    </script>
</body>
</html>
```

License
----

MIT


**Free Software, Hell Yeah!**

