/**
 * Jndroid core functions
 *
 * 缩写规则：
 * MeasureSpec -> MS
 * MeasuredWidth -> MW
 * MeasuredHeight -> MH
 * MeasuredDimension -> MD
 * LayoutParam -> LP
 * FillParent -> FP
 * MatchParent -> MP
 * WrapContent -> WC
 * PaddingLeft -> PL
 * PaddingTop -> PT
 * PaddingRight -> PR
 * PaddingBottom -> PB
 * MotionEvent -> ME
 *
 */
Array.prototype.add = function(index, val) {
    if (val == undefined) {
        this.push(index);
    } else {
        this.splice(index, 0, val);
    }
};

Array.prototype.set = function(index, val) {
    this.removeAt(index);
    this.add(index, val);
};

Array.prototype.size = function() {
    return this.length;
};

Array.prototype.isEmpty = function() {
    return (this.length === 0);
};

Array.prototype.contains = function(val) {
    return (this.indexOf(val) != -1);
};

Array.prototype.indexOf = function(val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) {
			return i;
		}
    }
    return -1;
};

Array.prototype.removeAt = function(index) {
    if (index > -1) {
        this.splice(index, 1);
    }
};

Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};

Array.prototype.clear = function() {
    this.splice(0, this.length);
};

String.prototype.trim = function() {
    return this.replace(/^[\s| ]*|[\s| ]*$/g, "");
};

String.prototype.startsWith = function(str) {
    return (this.indexOf(str) == 0);
};

String.prototype.endsWith = function(str) {
    return ((this.indexOf(str) + str.length) == this.length);
};

String.prototype.replaceAll = function(searchValue, replaceValue) {
    return this.replace(new RegExp(searchValue,"gm"), replaceValue);
};

Math.numberFixed = function(num, fixedCount) {
    if (fixedCount == undefined) {
        fixedCount = 0;
    }
    var tmp = Math.pow(10, fixedCount);
    return Math.floor(num * tmp) / tmp;
};

function Map() {
    this.keys = [];
    this.data = {};

    this.put = function (key, value) {
        if (this.data[key] === null) {
            this.keys.push(key);
        }
        this.data[key] = value;
    };

    this.get = function (key) {
        return this.data[key];
    };

    this.remove = function (key) {
        this.keys.remove(key);
        this.data[key] = null;
    };
}

var Utils = new _Utils();
function _Utils() {
    this.getRequest = function() {
        var url = location.search;
        if (url.indexOf("/") == url.length - 1) {
            url = url.substring(0, url.length - 1);
        }
        var request = {};
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            var strs = str.split("&");
            for(var i = 0; i < strs.length; i ++) {
                request[strs[i].split("=")[0]]=strs[i].split("=")[1];
            }
        }
        return request;
    };

    this.isArray = function(v) {
        return Object.prototype.toString.call(v) === '[object Array]';
    };

    this.measureExactly = function(v, w, h) {
        v.measure(MS.makeMS(w, MS.EXACTLY), MS.makeMS(h, MS.EXACTLY));
    };

    this.dumpTouchEvent = function(ev, tag) {
        var touch;
        switch (ev.getAction()) {
            case 0:
                touch = "down";
                break;
            case 1:
                touch = "up";
                break;
            case 2:
                touch = "move";
                break;
            case 3:
                touch = "cancel";
                break;
            case 5:
                touch = "pointer_down";
                break;
            case 6:
                touch = "pointer_up";
                break;
        }
        if (tag) {
            console.log(tag + ":" + touch);
        } else {
            console.log(touch);
        }
    };

    this.toCssColor = function(c) {
        if (typeof c == "string") {
            return c;
        } else {
            var a = (c >> 24) & 255;
            var r = (c >> 16) & 255;
            var g = (c >> 8) & 255;
            var b = c & 255;

            return "rgba(" + r + "," + g + "," + b + "," + (a / 255.0) + ")";
        }
    };

    this.getOffset = function(div){
        if (!div) {
            return null;
        }
        if (!this.contains(document.documentElement, div)) {
            return {top: 0, left: 0};
        }
        var obj = div.getBoundingClientRect();
        return {
            left: obj.left + window.pageXOffset,
            top: obj.top + window.pageYOffset,
            width: Math.round(obj.width),
            height: Math.round(obj.height)
        };
    };

    this.findFontFamily = function(htmlNode) {
        var fontFamily = "";
        var node = htmlNode;
        while (node !== null && node != document) {
            fontFamily = node.style.fontFamily;
            if (fontFamily != "") {
                return fontFamily;
            }
            node = node.parentNode;
        }
        return fontFamily;
    };
}

/**
 * Rect holds four integer coordinates for a rectangle. The rectangle is
 * represented by the coordinates of its 4 edges (left, top, right bottom).
 * These fields can be accessed directly. Use width() and height() to retrieve
 * the rectangle's width and height. Note: most methods do not check to see that
 * the coordinates are sorted correctly (i.e. left <= right and top <= bottom).
 * @class Rect
 *
 */
function Rect(l, t, r, b) {
    if (l == undefined || t == undefined || r == undefined || b == undefined) {
        l = 0;
        t = 0;
        r = 0;
        b = 0;
    }
    this.left = l;
    this.top = t;
    this.right = r;
    this.bottom = b;

    /**
     * Set the rectangle's coordinates to the specified values.
     *
     * @method set
     * @param left   The X coordinate of the left side of the rectangle
     * @param top    The Y coordinate of the top of the rectangle
     * @param right  The X coordinate of the right side of the rectangle
     * @param bottom The Y coordinate of the bottom of the rectangle
     */
    this.set = function(l, t, r, b) {
        this.left = l;
        this.top = t;
        this.right = r;
        this.bottom = b;
    };

    /**
     * @method width
     * @return the rectangle's width. This does not check for a valid rectangle
     * (i.e. left <= right) so the result may be negative.
     */
    this.width = function() {
        return (this.right - this.left);
    };

    /**
     * @method height
     * @return the rectangle's height. This does not check for a valid rectangle
     * (i.e. top <= bottom) so the result may be negative.
     */
    this.height = function() {
        return (this.bottom - this.top);
    };

    /**
     * @method centerX
     * @return the horizontal center of the rectangle.
     */
    this.centerX = function() {
        return (this.left + this.right) / 2;
    };


    /**
     * @method centerY
     * @return the vertical center of the rectangle.
     */
    this.centerY = function() {
        return (this.top + this.bottom) / 2;
    };

    /**
     * Returns true if (x,y) is inside the rectangle.
     *
     * @method contains
     * @param x The X coordinate of the point being tested for containment
     * @param y The Y coordinate of the point being tested for containment
     * @return true iff (x,y) are contained by the rectangle, where containment
     *              means left <= x < right and top <= y < bottom
     */
    this.contains = function(x, y) {
        return this.left < this.right && this.top < this.bottom && x >= this.left && x < this.right && y >= this.top && y < this.bottom;
    }
}

function Gravity() {}
Object.defineProperty(Gravity,"TOP",{value:1});
Object.defineProperty(Gravity,"CENTER_VERTICAL",{value:2});
Object.defineProperty(Gravity,"BOTTOM",{value:4});
Object.defineProperty(Gravity,"LEFT",{value:8});
Object.defineProperty(Gravity,"CENTER_HORIZONTAL",{value:16});
Object.defineProperty(Gravity,"RIGHT",{value:32});
Object.defineProperty(Gravity,"CENTER",{value:18});

/**
 * A MeasureSpec encapsulates the layout requirements passed from parent to child.
 * Each MeasureSpec represents a requirement for either the width or the height.
 * A MeasureSpec is comprised of a size and a mode.
 *
 * @class MeasureSpec
 * @static
 */
var MeasureSpec = new _MeasureSpec();
var MS = MeasureSpec;
function _MeasureSpec() {

    /**
     * Creates a measure specification based on the supplied size and mode.
     *
     * @method makeMeasureSpec
     * @param {int} size the size of the measure specification.
     * @param {int} mode the mode of the measure specification.
     * @return {int} the measure specification based on size and mode.
     */
    this.makeMeasureSpec = function(size, mode) {
        return (size & ~MS.MODE_MASK) | (mode & MS.MODE_MASK);
    };

    this.makeMS = function(size, mode) {
        return (size & ~MS.MODE_MASK) | (mode & MS.MODE_MASK);
    };

    /**
     * Extracts the mode from the supplied measure specification.
     *
     * @method getMode
     * @param {int} spec the measure specification to extract the mode from.
     * @return {int} MeasureSpec.UNSPECIFIED, MeasureSpec.AT_MOST or MeasureSpec.EXACTLY.
     */
    this.getMode = function(spec) {
        return (spec & MS.MODE_MASK);
    };

    /**
     * Extracts the size from the supplied measure specification.
     *
     * @method getSize
     * @param {int} spec the measure specification to extract the size from.
     * @return {int} the size in pixels defined in the supplied measure specification.
     */
    this.getSize = function(spec) {
        return (spec & ~MS.MODE_MASK);
    };
}

Object.defineProperty(MS,"MODE_MASK",{value:(0x3 << 30)});

/**
 * Measure specification mode: The parent has not imposed any constraint
 * on the child. It can be whatever size it wants.
 *
 * @property UNSPECIFIED
 * @type int
 * @static
 * @final
 */
Object.defineProperty(MS,"UNSPECIFIED",{value:(0x0 << 30)});

/**
 * Measure specification mode: The parent has determined an exact size
 * for the child. The child is going to be given those bounds regardless
 * of how big it wants to be.
 *
 * @property EXACTLY
 * @type int
 * @static
 * @final
 */
Object.defineProperty(MS,"EXACTLY",{value:(0x1 << 30)});

/**
 * Measure specification mode: The child can be as large as it wants up
 * to the specified size.
 *
 * @property AT_MOST
 * @type int
 * @static
 * @final
 */
Object.defineProperty(MS,"AT_MOST",{value:(0x2 << 30)});

/**
 * Object used to report movement (mouse, pen, finger, trackball) events.
 * Motion events may hold either absolute or relative movements and
 * other data, depending on the type of device.
 *
 * @class MotionEvent
 */
var ME = MotionEvent;
function MotionEvent(rawEv) {

    this.rawEv = rawEv;

    var pointerCount = 1;

    var touches = getTouches();
    var xs = [];
    var ys = [];
    for (var i = 0; i < touches.length; i++) {
        xs.push(touches[i].pageX);
        ys.push(touches[i].pageY);
    }

    var action = 3;

    if ((rawEv.type == "touchstart" || rawEv.type == "mousedown")) {
        if (pointerCount == 1) {
            action = 0;
        } else {
            action = 5;
        }
    } else if (rawEv.type == "touchmove" || rawEv.type == "mousemove") {
        action = 2;
    } else if ((rawEv.type == "touchend" || rawEv.type == "mouseup")) {
        if (pointerCount == 1) {
            action = 1;
        } else {
            action = 6;
        }
    } else if (rawEv.type == "touchcancel") {
        action = 3;
    }

    if (rawEv.type == "mouseout") {
        if (rawEv.x <= 0 || rawEv.x >= window.innerWidth
            || rawEv.y <= 0 || rawEv.y >= window.innerHeight) {
            action = 3;
        } else {
            action = 2;
        }
    }

    this.needCompleteActionUp = function() {
        return (action == ME.ACTION_POINTER_UP);
    };

    this.setAction = function(a) {
        action = a;
    };

    this.setPointerCount = function(c) {
        pointerCount = c;
    };

    this.getPointerCount = function() {
        return pointerCount;
    };

    /**
     * Returns the X coordinate of this event.
     *
     * @method getX
     * @return {float} X coordinate.
     */
    this.getX = function(index) {
        if (index == undefined) {
            index = 0;
        }
        return xs[index];
    };

    /**
     * Returns the Y coordinate of this event.
     *
     * @method getY
     * @return {float} Y coordinate.
     */
    this.getY = function(index) {
        if (index == undefined) {
            index = 0
        }
        return ys[index];
    };

    this.setLocation = function(x, y) {
        var dX = x - xs[0];
        var dY = y - ys[0];
        for (var i = 0; i < xs.length; i++) {
            xs[i] += dX;
            ys[i] += dY;
        }
    };

    this.getPointerId = function(index) {
        if (index == undefined) {
            index = 0;
        }
        return touches[index].identifier;
    };

    /**
     * Returns the original raw X coordinate of this event.  For touch
     * events on the screen, this is the original location of the event
     * on the screen, before it had been adjusted for the containing window
     * and views.
     *
     * @method getRawX
     * @return {float} original raw X coordinate.
     */
    this.getRawX = function(index) {
        if (index == undefined) {
            index = 0;
        }
        return touches[index].pageX;
    };

    /**
     * Returns the original raw X coordinate of this event.  For touch
     * events on the screen, this is the original location of the event
     * on the screen, before it had been adjusted for the containing window
     * and views.
     *
     * @method getRawY
     * @return {float} original raw Y coordinate.
     */
    this.getRawY = function(index) {
        if (index == undefined) {
            index = 0;
        }
        return touches[index].pageY;
    };

    /**
     * Return the kind of action being performed.
     *
     * @method getAction
     * @return {int} the action.
     */
    this.getAction = function() {
        return action;
    };

    function getTouches() {
        var touches = [];
        if (rawEv.type.indexOf("touch") == 0) {
            for (var i = 0; i < rawEv.touches.length; i++) {
                addTouch(touches, rawEv.touches[i]);
            }
            for (var i = 0; i < rawEv.changedTouches.length; i++) {
                addTouch(touches, rawEv.changedTouches[i]);
            }
            pointerCount = touches.length;
        } else {
            touches.push(rawEv);
        }
        return touches;
    }

    function addTouch(touches, touch) {
        for (var i = 0; i < touches.length; i++) {
            if (touches[i].identifier == touch.identifier) {
                return;
            }
        }
        touches.push(touch);
    }
}

/**
 * Constant for : A pressed gesture has started, the
 * motion contains the initial starting location.
 *
 * @property ACTION_DOWN
 * @type int
 * @static
 * @final
 */
Object.defineProperty(ME,"ACTION_DOWN",{value:0});

/**
 * Constant for : A pressed gesture has finished, the
 * motion contains the final release location as well as any intermediate
 * points since the last down or move event.
 *
 * @property ACTION_UP
 * @type int
 * @static
 * @final
 */
Object.defineProperty(ME,"ACTION_UP",{value:1});

/**
 * Constant for : A change has happened during a
 * press gesture (between MotionEvent.ACTION_DOWN and MotionEvent.ACTION_UP).
 * The motion contains the most recent point, as well as any intermediate
 * points since the last down or move event.
 *
 * @property ACTION_MOVE
 * @type int
 * @static
 * @final
 */
Object.defineProperty(ME,"ACTION_MOVE",{value:2});

/**
 * Constant for : The current gesture has been aborted.
 * You will not receive any more points in it.  You should treat this as
 * an up event, but not perform any action that you normally would.
 *
 * @property ACTION_CANCEL
 * @type int
 * @static
 * @final
 */
Object.defineProperty(ME,"ACTION_CANCEL",{value:3});


Object.defineProperty(ME,"ACTION_POINTER_DOWN",{value:5});
Object.defineProperty(ME,"ACTION_POINTER_UP",{value:6});

/**
 * Helper for tracking the velocity of touch events, for implementing
 * flinging and other such gestures.
 * @class VelocityTracker
 */
function VelocityTracker() {
    var scope = 10;
    var x = [];
    var y = [];
    var t = [];
    var vx = 0;
    var vy = 0;
    var id = -1;

    this.clear = function() {
        x.clear();
        y.clear();
        t.clear();
        id = -1;
    };

    /**
     * Add a user's movement to the tracker.
     * @method addMovement
     * @param e The MotionEvent you received and would like to track.
     */
    this.addMovement = function(e) {
        var _id = e.getPointerId();
        if (id == -1) {
            id = _id;
        }
        if (id != _id) {
            return;
        }
        if (x.length >= scope) {
            x.shift();
        }
        x.push(e.getRawX());
        if (y.length >= scope) {
            y.shift();
        }
        y.push(e.getRawY());
        if (t.length >= scope) {
            t.shift();
        }
        t.push(e.rawEv.timeStamp);
    };

    /**
     * Compute the current velocity based on the points that have been
     * collected.  Only call this when you actually want to retrieve velocity
     * information, as it is relatively expensive.  You can then retrieve
     *
     * @method computeCurrentVelocity
     * @param unit The units you would like the velocity in.  A value of 1
     * provides pixels per millisecond, 1000 provides pixels per second, etc.
     */
    this.computeCurrentVelocity = function(unit) {
        if (x.length < 2) {
            vx = 0;
            vy = 0;
            return;
        }
        var dt = t[t.length - 1] - t[0];
        if (dt == 0) {
            vx = 0;
            vy = 0;
            return;
        }
        if (unit == undefined) {
            unit = 1;
        }
        vx = (x[x.length - 1] - x[0]) / dt * unit;
        vy = (y[x.length - 1] - y[0]) / dt * unit;
    };

    /**
     * Retrieve the last computed X velocity.  You must first call
     * @method getXVelocity
     * @return The previously computed X velocity.
     */
    this.getXVelocity = function() {
        return vx;
    };

    /**
     * Retrieve the last computed Y velocity.  You must first call
     * @method getYVelocity
     * @return The previously computed Y velocity.
     */
    this.getYVelocity = function() {
        return vy;
    }
}

/**
 * The Color class defines methods for creating and converting color ints.
 * Colors are represented as packed ints, made up of 4 bytes: alpha, red,
 * green, blue. The values are unpremultiplied, meaning any transparency is
 * stored solely in the alpha component, and not in the color components. The
 * components are stored as follows (alpha << 24) | (red << 16) |
 * (green << 8) | blue. Each component ranges between 0..255 with 0
 * meaning no contribution for that component, and 255 meaning 100%
 * contribution. Thus opaque-black would be 0xFF000000 (100% opaque but
 * no contributions from red, green, or blue), and opaque-white would be
 * 0xFFFFFFFF
 * @class Color
 * @static
 */
var Color = new _Color();
function _Color() {
    /**
     * Return the alpha component of a color int. This is the same as saying
     * color >>> 24
     *
     * @method alpha
     * @return {int}
     */
    this.alpha = function (c) {
        return c >>> 24;
    };

    /**
     * Return the red component of a color int. This is the same as saying
     * (color >> 16) & 0xFF
     *
     * @method red
     * @return {int}
     */
    this.red = function (c) {
        return (c >> 16) & 0xFF;
    };

    /**
     * Return the green component of a color int. This is the same as saying
     * (color >> 8) & 0xFF
     *
     * @method green
     * @return {int}
     */
    this.green = function (c) {
        return (c >> 8) & 0xFF;
    };

    /**
     * Return the blue component of a color int. This is the same as saying
     * color & 0xFF
     *
     * @method blue
     * @return {int}
     */
    this.blue = function (c) {
        return c & 0xFF;
    };

    /**
     * Return a color-int from red, green, blue components.
     * The alpha component is implicity 255 (fully opaque).
     * These component values should be [0..255], but there is no
     * range check performed, so if they are out of range, the
     * returned color is undefined.
     *
     * @method rgb
     * @param r  Red component [0..255] of the color
     * @param g Green component [0..255] of the color
     * @param b  Blue component [0..255] of the color
     * @return {int}
     */
    this.rgb = function (r, g, b) {
        return (0xFF << 24) | (r << 16) | (g << 8) | b;
    };

    /**
     * Return a color-int from alpha, red, green, blue components.
     * These component values should be [0..255], but there is no
     * range check performed, so if they are out of range, the
     * returned color is undefined.
     * @method argb
     * @param a Alpha component [0..255] of the color
     * @param r   Red component [0..255] of the color
     * @param g Green component [0..255] of the color
     * @param b  Blue component [0..255] of the color
     * @return {int}
     */
    this.argb = function (a, r, g, b) {
        return (a << 24) | (r << 16) | (g << 8) | b;
    };
}
Object.defineProperty(Color,"BLACK",{value:0xFF000000});
Object.defineProperty(Color,"DKGRAY",{value:0xFF444444});
Object.defineProperty(Color,"GRAY",{value:0xFF888888});
Object.defineProperty(Color,"LTGRAY",{value:0xFFCCCCCC});
Object.defineProperty(Color,"WHITE",{value:0xFFFFFFFF});
Object.defineProperty(Color,"RED",{value:0xFFFF0000});
Object.defineProperty(Color,"GREEN",{value:0xFF00FF00});
Object.defineProperty(Color,"BLUE",{value:0xFF0000FF});
Object.defineProperty(Color,"YELLOW",{value:0xFFFFFF00});
Object.defineProperty(Color,"CYAN",{value:0xFF00FFFF});
Object.defineProperty(Color,"MAGENTA",{value:0xFFFF00FF});
Object.defineProperty(Color,"TRANSPARENT",{value:0});

/**
 * A structure describing general information about a display, such as its
 * size and density of canvas.
 * To access the DisplayMetrics members, initialize an object like this:
 * DisplayMetrics.density;
 */
var DisplayMetrics = new _DisplayMetrics();
function _DisplayMetrics() {
    this.density = window.devicePixelRatio;
}

/**
 * A Drawable is a general abstraction for "something that can be drawn."  Most
 * often you will deal with Drawable as the type of resource retrieved for
 * drawing things to the screen; the Drawable class provides a generic API for
 * dealing with an underlying visual resource that may take a variety of forms.
 *
 * @class Drawable
 */
function Drawable() {
    var bounds = new Rect(0, 0, 0, 0);
    var callback = null;

    /**
     * Draw in its bounds (set via setBounds) respecting optional effects such
     * as alpha (set via setAlpha) and color filter (set via setColorFilter).
     *
     * @method draw
     * @param {canvas} canvas The canvas to draw into.
     */
    this.draw = function(canvas) {
    };

    /**
     * Return the drawable's bounds Rect.
     *
     * @method getBounds
     * @return {Rect} The bounds of the drawable.
     */
    this.getBounds = function() {
        return bounds;
    };

    /**
     * Specify a bounding rectangle for the Drawable. This is where the drawable
     * will draw when its draw() method is called.
     *
     * @method setBounds
     */
    this.setBounds = function(l, t, r, b) {
        if (bounds.left != l || bounds.top != t || bounds.right != r || bounds.bottom != b) {
            bounds.set(l, t, r, b);
        }
    };

    /**
     * Bind a object to this Drawable.  Required for clients
     * that want to support animated drawables.
     *
     * @method setCallback
     * @param {cb} cb The client's Callback implementation.
     */
    this.setCallback = function(cb) {
        callback = cb;
    };

    /**
     * Use the current implementation to have this Drawable
     * redrawn. Does nothing if there is no Callback attached to the
     * Drawable.
     *
     * @method invalidateSelf
     */
    this.invalidateSelf = function() {
        if (callback != null) {
            callback.invalidateDrawable(this);
        }
    };

    /**
     * Specify a set of states for the drawable. These are use-case specific,
     * so see the relevant documentation.
     *
     * @method setState
     * @param {int[]} s The new set of states to be displayed.
     */
    this.setState = function(s) {
        this.onStateChange(s);
    };

    /**
     * Override this in your subclass to change appearance if you recognize the
     * specified state.
     *
     * @method onStateChange
     * @param {int[]} s The new set of states to be displayed.
     * @return {boolean} Returns true if the state change has caused the appearance of
     * the Drawable to change (that is, it needs to be drawn), else false
     * if it looks the same and there is no need to redraw it since its
     * last state.
     */
    this.onStateChange = function(s) {
    };

    /**
     * Return the intrinsic width of the underlying drawable object.
     * @method getIntrinsicWidth
     * @return {int} Returns -1 if it has no intrinsic width, such as with a solid color.
     */
    this.getIntrinsicWidth = function() {
        return -1;
    };

    /**
     * Return the intrinsic height of the underlying drawable object.
     * @method getIntrinsicHeight
     * @return {int} Returns -1 if it has no intrinsic height, such as with a solid color.
     */
    this.getIntrinsicHeight = function() {
        return -1;
    };
}

function Processor() {
    var start;
    var end;
    var delta;

    var cur;
    var startTime;
    var duration;
    var durationReciprocal;
    var isFinished = true;

    var listener;

    this.startProcess = function(_start, _end, _duration) {
        isFinished = false;
        duration = _duration;
        startTime = (new Date()).getTime();
        start = _start;
        end = _end;
        delta = _end - _start;
        durationReciprocal = 1.0 / duration;
        cur = _start;
    };

    this.computeProcessOffset = function() {
        if (isFinished) {
            return false;
        }

        var  timePassed = (new Date()).getTime() - startTime;

        if (timePassed < duration - 10) {
            var x = timePassed * durationReciprocal;
            cur = start + x * delta;
        } else {
            cur = end;
            isFinished = true;
            this.fireProcessEnd();
        }
        return true;
    };

    this.isFinished = function() {
        return isFinished;
    };

    this.forceFinished = function(f) {
        isFinished = f;
        this.fireProcessEnd();
    };

    this.getDuration = function() {
        return duration;
    };

    this.getCurrProcess = function() {
        return cur;
    };

    this.setCurrProcess = function(p) {
        cur = p;
    };

    this.setEndListener = function(l) {
        listener = l;
    };

    this.fireProcessEnd = function() {
        if (listener != null) {
            listener.call(this);
        }
    };
}

/**
* This class represents the basic building block for user interface components. A View occupies a rectangular area on the screen and is responsible for drawing and event handling. View is the base class for widgets, which are used to create interactive UI components (buttons, text fields, etc.). The ViewGroup subclass is the base class for layouts, which are invisible containers that hold other Views (or other ViewGroups) and define their layout properties.
*
* @class View
* @constructor
*/
function View() {

    this.div = document.createElement("div");

    var self = this;

    var parent;
    var left = 0;
    var top = 0;
    var right = 0;
    var bottom = 0;
    var width = 0;
    var height = 0;
    var wMS = 0x80000000;
    var hMS = 0x80000000;
    var bg = 0;
    var pL = 0;
    var pT = 0;
    var pR = 0;
    var pB = 0;
    var scrollX = 0;
    var scrollY = 0;
    var lp = null;
    var willNotDraw = true;
    var visibility = View.VISIBLE;
    var clickable = false;
    var longClickable = false;
    var clickListener = null;
    var longClickListener = null;
    var tag = "View";
    var id = View.NO_ID;
    var HTMLCanvas = null;
    var canvas = null;
    var preventHtmlTouchEvent = true;
    var forceLayout = false;
    var layoutRequired = false;
    var isPressed = false;
    var prePressed = false;

    var downX, downY;
    var hasPerformedLongPress = false;

    var runQueue = new Map();

    /**
     * Returns this view's identifier.
     *
     * @return a positive integer used to identify the view or NO_ID
     *         if the view has no ID

     */
    this.getId = function() {
        return id;
    };

    /**
     * Sets the identifier for this view. The identifier does not have to be
     * unique in this view's hierarchy. The identifier should be a positive
     * number.
     *
     * @param _id a number used to identify the view
     */
    this.setId = function(_id) {
        id = _id;
    };

	/**
	* Returns this view's tag.
	*
	* @method getTag
	* @return {Object} Returns the object stored in this view as a tag, or null if not set.
	*/
    this.getTag = function() {
        return tag;
    };

	/**
	* Sets the tag associated with this view.
	*
	* @method setTag
	* @params {Object} tag An Object to tag the view with
	*/
    this.setTag = function(t) {
        tag = t;
        this.div.setAttribute("Tag", t);
    };

	/**
	* Gets the parent of this view. Note that the parent is a ViewParent and not necessarily a View.
	*
	* @method getParent
	* @return {} Returns the parent of this view.
	*/
    this.getParent = function() {
        return parent;
    };

	/**
	* Sets the parent.
	*
	* @method setParent
	* @params {View} parent The parent.
	*/
    this.setParent = function(p) {
        parent = p;
    };


	/**
	* Returns the left padding of this view. If there are inset and enabled scrollbars, this value may include the space required to display the scrollbars as well.
	*
	* @method getPaddingLeft
	* @return {int} Returns the left padding in pixels.
	*/
    this.getPaddingLeft = function() {
        return pL;
    };

    this.getPL = function() {
        return pL;
    };

	/**
	* Returns the top padding of this view.
	*
	* @method getPaddingTop
	* @return {int} Returns the top padding in pixels.
	*/
    this.getPaddingTop = function() {
        return pT;
    };

    this.getPT = function() {
        return pT;
    };

	/**
	* Returns the right padding of this view. If there are inset and enabled scrollbars, this value may include the space required to display the scrollbars as well.
	*
	* @method getPaddingRight
	* @return {int} Returns the right padding in pixels.
	*/
    this.getPaddingRight = function() {
        return pR;
    };

    this.getPR = function() {
        return pR;
    };

	/**
	* Returns the bottom padding of this view. If there are inset and enabled scrollbars, this value may include the space required to display the scrollbars as well.
	*
	* @method getPaddingBottom
	* @return {int} Returns the bottom padding in pixels.
	*/
    this.getPaddingBottom = function() {
        return pB;
    };

    this.getPB = function() {
        return pB;
    };

	/**
	* Sets the padding. The view may add on the space required to display the scrollbars, depending on the style and visibility of the scrollbars. So the values returned from getPaddingLeft(), getPaddingTop(), getPaddingRight() and getPaddingBottom() may be different from the values set in this call.
	*
	* @method setPadding
	* @params {int} left The left padding in pixels
	* @params {int} top The top padding in pixels
	* @params {int} right The right padding in pixels
	* @params {int} bottom The bottom padding in pixels
	*/
    this.setPadding = function(l, t, r, b) {
        if (t == undefined && r == undefined && b == undefined) {
            t = l;
            r = l;
            b = l;
        }
        pL = l;
        pT = t;
        pR = r;
        pB = b;
    };

	/**
	* Get the LayoutParams associated with this view. All views should have layout parameters. These supply parameters to the parent of this view specifying how it should be arranged. There are many subclasses of ViewGroup.LayoutParams, and these correspond to the different subclasses of ViewGroup that are responsible for arranging their children. This method may return null if this View is not attached to a parent ViewGroup or setLayoutParams(ViewGroup.LayoutParams) was not invoked successfully. When a View is attached to a parent ViewGroup, this method must not return null.
	*
	* @method getLayoutParams
	* @return {LayoutParams} Returns the LayoutParams associated with this view, or null if no parameters have been set yet.
	*/
    this.getLayoutParams = function() {
        return lp;
    };

    this.setLP = function(_lp) {
        lp = _lp;
    };

	/**
	* Set the layout parameters associated with this view. These supply parameters to the parent of this view specifying how it should be arranged. There are many subclasses of ViewGroup.LayoutParams, and these correspond to the different subclasses of ViewGroup that are responsible for arranging their children.
	*
	* @method setLayoutParams
	* @params {LayoutParams}  lp The layout parameters for this view, cannot be null.
	*/
    this.setLayoutParams = this.setLP;

	/**
	* Left position of this view relative to its parent.
	*
	* @method getLeft
	* @return {int} Returns the left edge of this view, in pixels.
	*/
    this.getLeft = function() {
        return left;
    };

    this.getRight = function() {
        return left + this.getMW();
    };

	/**
	* Top position of this view relative to its parent.
	*
	* @method getTop
	* @return {int} Returns the top of this view, in pixels.
	*/
    this.getTop = function() {
        return top;
    };

    this.getBottom = function() {
        return top + this.getMH();
    };

	/**
	* Return the width of the your view.
	*
	* @method getWidth
	* @return {int} Returns the width of your view, in pixels.
	*/
    this.getWidth = function() {
        return width;
    };

	/**
	* Return the height of your view.
	*
	* @method getHeight
	* @return {int} Returns the height of your view, in pixels.
	*/
    this.getHeight = function() {
        return height;
    };

	/**
	* Returns the raw measured width of this view.
	*
	* @method getMeasuredWidth
	* @return {int} Returns the raw measured width of this view.
	*/
    this.getMeasuredWidth = function() {
        return width;
    };

    this.getMW = function() {
        return width;
    };

	/**
	* Returns the raw measured height of this view.
	*
	* @method getMeasuredHeight
	* @return {int} Returns the raw measured height of this view.
	*/
    this.getMeasuredHeight = function() {
        return height;
    };

    this.getMH = function() {
        return height;
    };

    this.getScrollX = function() {
        return scrollX;
    };

    this.setScrollX = function(x) {
        scrollX = x;
    };

    this.getScrollY = function() {
        return scrollY;
    };

    this.setScrollY = function(y) {
        scrollY = y;
    };

    this.getHitRect = function(outRect) {
        outRect.set(left, top, right, bottom);
    };

	/**
	* The visual left position of this view, in pixels.
	*
	* @method getLeft
	* @return {int} Returns the visual x position of this view, in pixels.
	*/
    this.getLeft = function() {
        return left;
    };

	/**
	* The visual top position of this view, in pixels.
	*
	* @method getTop
	* @return {int} Returns the visual y position of this view, in pixels.
	*/
    this.getTop = function() {
        return top;
    };

	/**
	* This is called to find out how big a view should be. The parent supplies constraint information in the width and height parameters.

	The actual measurement work of a view is performed in onMeasure(int, int), called by this method. Therefore, only onMeasure(int, int) can and must be overridden by subclasses.
	*
	* @method measure
	* @params {int} widthMS Horizontal space requirements as imposed by the parent.
	* @params {int} heightMS Vertical space requirements as imposed by the parent.
	*/
    this.measure = function(_wMS, _hMS) {
        if (forceLayout || _wMS != wMS || _hMS != hMS) {

            //var replaceNode = document.createElement("div");
            //var parentNode = this.div.parentNode;
            //if (parentNode != null) {
            //    parentNode.replaceChild(replaceNode, this.div);
            //}

            wMS = _wMS;
            hMS = _hMS;

            this.onBeforeMeasure(_wMS, _hMS);
            this.onMeasure(_wMS, _hMS);
            this.onAfterMeasure(_wMS, _hMS);

            //if (parentNode != null) {
            //    parentNode.replaceChild(this.div, replaceNode);
            //}

            layoutRequired = true;
        }
    };

	/**
	* Measure the view and its content to determine the measured width and the measured height. This method is invoked by measure(int, int) and should be overriden by subclasses to provide accurate and efficient measurement of their contents.

	CONTRACT: When overriding this method, you must call setMeasuredDimension(int, int) to store the measured width and height of this view.
	*
	* @method onMeasure
	* @params {int} widthMS horizontal space requirements as imposed by the parent. The requirements are encoded with View.MeasureSpec.
	* @params {int} vertical space requirements as imposed by the parent. The requirements are encoded with View.MeasureSpec.
	*/
    this.onMeasure = function(wMS, hMS) {
        this.setMD(MS.getSize(wMS), MS.getSize(hMS));
    };

    this.onBeforeMeasure = function(wMS, hMS) {

    };

    this.onAfterMeasure = function(wMS, hMS) {
    };

    this.setMD = function(w, h) {
        if (width == w && height == h) {
            return;
        }
        width = w;
        height = h;
        this.div.style.width = w + "px";
        this.div.style.height = h + "px";
        if (HTMLCanvas !== null) {
            HTMLCanvas.width = w;
            HTMLCanvas.height = h;
            changeDensity(HTMLCanvas);
        }
    };

	/**
	* This method must be called by onMeasure(int, int) to store the measured width and measured height.
	*
	* @method setMeasuredDimension
	* @params {int} width The measured width of this view.
	* @params {int} height The measured height of this view.
	*/
    this.setMeasuredDimension = this.setMD;

    this.applyDimen = function(wMS, hMS) {
        this.setMD(MS.getSize(wMS), MS.getSize(hMS));
    };

    function changeDensity(c) {
        if (c.width == 0 || c.height == 0) {
            return;
        }
        var wPx = c.width + 'px';
        var hPx = c.height + 'px';
        if (c.style.width != wPx) {
            c.style.width = wPx;
        }
        if (c.style.height != hPx) {
            c.style.height = hPx;
        }

        var density = DisplayMetrics.density;
        c.width = Math.ceil(c.width * density);
        c.height = Math.ceil(c.height * density);
        var ctx = c.getContext('2d');
        ctx.scale(density, density);
    }

    this.onAfterLayout = function() {

    };

	/**
	* Assign a size and position to a view and all of its descendants

	This is the second phase of the layout mechanism. (The first is measuring). In this phase, each parent calls layout on all of its children to position them. This is typically done using the child measurements that were stored in the measure pass().

	Derived classes should not override this method. Derived classes with children should override onLayout. In that method, they should call layout on each of their children.
	*
	* @method layout
	* @params {int} x Left position, relative to parent.
	* @params {int} y Top position, relative to parent.
	*/
    this.layout = function(x, y) {
        if (layoutRequired || left != x || top != y || right != (x + this.getMW()) || bottom != (y + this.getMH())) {
            //var replaceNode = document.createElement("div");
            //var parentNode = this.div.parentNode;
            //if (parentNode != null) {
            //    parentNode.replaceChild(replaceNode, this.div);
            //}

            left = x;
            top = y;
            right = x + width;
            bottom = y + height;

            this.div.style.left = x + "px";
            this.div.style.top = y + "px";

            this.onLayout(x, y);
            this.onAfterLayout();
            this.invalidate();
            layoutRequired = false;

            //if (parentNode != null) {
            //    parentNode.replaceChild(this.div, replaceNode);
            //}
        }
        forceLayout = false;
    };

    this.layoutByTransform = function(x, y) {
        if (layoutRequired || left != x || top != y || right != (x + this.getMW()) || bottom != (y + this.getMH())) {
            left = x;
            top = y;
            right = x + width;
            bottom = y + height;

            this.translate3d(x, y);

            this.onLayout(x, y);
            this.onAfterLayout();
            this.invalidate();
            layoutRequired = false;
        }
        forceLayout = false;
    };

    this.translate3d = function(x, y) {
        var t = "translate3d(" + x + "px," + y + "px, 0)";
        this.div.style.msTransform = t;
        this.div.style.webkitTransform = t;
        this.div.style.mozTransform = t;
    };

	/**
	* Called from layout when this view should assign a size and position to each of its children. Derived classes with children should override this method and call layout on each of their children.
	*
	* @method onLayout
	*/
    this.onLayout = function() {

    };

    this.onAfterLayout = function() {

    };

	/**
	* Invalidates the specified Drawable.
	*
	* @method invalidateDrawable
	*/
    this.invalidateDrawable = function() {
        this.postInvalidate();
    };

	/**
	* Cause an invalidate to happen on a subsequent cycle through the event loop. Use this to invalidate the View from a non-UI thread.

	This method can be invoked from outside of the UI thread only when this View is attached to a window.
	*
	* @method postInvalidate
	*/
    this.postInvalidate = function() {
        requestAnimationFrame(this.invalidate);
    };

	/**
	* Called by a parent to request that a child update its values for mScrollX and mScrollY if necessary. This will typically be done if the child is animating a scroll using a Scroller object.
	*
	* @method computeScroll
	*/
    this.computeScroll = function() {

    };

	/**
	* Invalidate the whole view. If the view is visible, will be called at some point in the future.

	This must be called from a UI thread. To call from a non-UI thread, call postInvalidate().
	*
	* method invalidate
	*/
    this.invalidate = function() {
        self.draw();
    };

	/**
	* Manually render this view (and all of its children). The view must have already done a full layout before this function is called. When implementing a view, implement onDraw(android.graphics.Canvas) instead of overriding this method. If you do need to override this method, call the superclass version.
	*
	* @method draw
	*/
    this.draw = function() {
        this.computeScroll();

        if (willNotDraw == false) {
            if (HTMLCanvas != null) {
                HTMLCanvas.width = HTMLCanvas.width;
                if (HTMLCanvas.getContext) {
                    if (canvas == null) {
                        canvas = HTMLCanvas.getContext("2d");
                    }
                    this.onDraw(canvas);
                }
            }
        } else {
            this.onDraw();
        }
    };

	//TODO
    this.onDraw = function(canvas) {

    };

	/*
	* Returns whether or not this View draw on its own.
	*
	* @method getWillNotDraw
	* @return {boolean} Returns whether or not this View draw on its own.
	*/
    this.getWillNotDraw = function() {
        return willNotDraw;
    };

	/**
	* If this view doesn't do any drawing on its own, set this flag to allow further optimizations. By default, this flag is not set on View, but could be set on some View subclasses such as ViewGroup. Typically, if you override onDraw(Canvas) you should clear this flag.
	*
	* @method setWillNotDraw
	* @params {boolean} willnotdraw Whether or not this View draw on its own.
	*/
    this.setWillNotDraw = function(willnotdraw) {
        willNotDraw = willnotdraw;
        if (willNotDraw === false) {
            HTMLCanvas = document.createElement("canvas");
            HTMLCanvas.style.position = "absolute";
            HTMLCanvas.style.left = 0;
            HTMLCanvas.style.top = 0;
            this.div.appendChild(HTMLCanvas);
            this.div.style.overflow = "hidden";
            if (this.getMW() != 0 || this.getMH() != 0) {
                this.requestLayout();
            }
        } else {
            if (HTMLCanvas !== null) {
                this.div.removeChild(HTMLCanvas);
            }
        }
    };

    this.getBackground = function() {
        return bg;
    };

	/**
	* Sets the background color for this view.
	*
	* @method setBackgroundColor
	* @params {int} color The color of the background.
	*/
    this.setBackgroundColor = function(c) {
        bg = c;
        this.div.style.background = Utils.toCssColor(c);
    };

    this.setBg = function(c) {
        bg = c;
        this.div.style.background = Utils.toCssColor(c);
    };

	/**
	* Register a callback to be invoked when this view is clicked. If this view is not clickable, it becomes clickable.
	*
	* @method setOnClickListener
	* @params {View.OnClickListener} l The callback that will run.
	*/
    this.setOnClickListener = function(l) {
        if (!clickable) {
            this.setClickable(true);
        }
        clickListener = l;
    };

    this.setHoverEnterListener = function(l) {
        this.div.onmouseover = function() {
            l.call(self);
        };
    };

    this.setHoverExitListener = function(l) {
        this.div.onmouseout = function() {
            l.call(self);
        };
    };

	/**
	* Register a callback to be invoked when this view is clicked and held. If this view is not long clickable, it becomes long clickable.
	*
	* @method setOnLongClickListener
	* @params {View.OnLongClickListener} l The callback that will run.
	*
	*/
    this.setOnLongClickListener = function(l) {
        if (!longClickable) {
            this.setLongClickable(true);
        }
        longClickListener = l;
    };

	/**
	* Enables or disables click events for this view. When a view is clickable it will change its state to "pressed" on every click. Subclasses should set the view clickable to visually react to user's clicks.
	*
	* @method setClickable
	* @params {boolean} clickable True to make the view clickable, false otherwise.
	*/
    this.setClickable = function(c) {
        clickable = c;
        if (clickable) {
            this.setStyle("cursor", "pointer");
        }
    };

	/**
	* Enables or disables long click events for this view. When a view is long clickable it reacts to the user holding down the button for a longer duration than a tap. This event can either launch the listener or a context menu.
	*
	* @method setLongClickable
	* @params {boolean} longClickable True to make the view long clickable, false otherwise.
	*/
    this.setLongClickable = function(longClickable) {
        longClickable = longClickable;
    };

	/**
	* Call this when something has changed which has invalidated the layout of this view. This will schedule a layout pass of the view tree. This should not be called while the view hierarchy is currently in a layout pass. If layout is happening, the request may be honored at the end of the current layout pass (and then layout will run again) or after the current frame is drawn and the next layout occurs.

	Subclasses which override this method should call the superclass method to handle possible request-during-layout errors correctly.
	*
	* @method requestLayout
	*/
    this.requestLayout = function() {
        forceLayout = true;
        if (this.getParent() != null && (!this.getParent().isLayoutRequested())) {
            this.getParent().requestLayout();
        }
    };

    this.isLayoutRequested = function() {
        return forceLayout;
    };

	/**
	* Call this to try to give focus to a specific view or to one of its descendants. A view will not actually take focus if it is not focusable, or if it is focusable and it is not focusable in touch mode while the device is in touch mode.
	*
	* @method requestFocus
	*/
    this.requestFocus = function() {

    };

    this.isPressed = function() {
        return isPressed;
    };

    this.setPressed = function(p) {
        isPressed = p;
        this.invalidate();
    };

    this.checkPressed = function(e) {
        switch (e.getAction()) {
            case ME.ACTION_DOWN:
                var inScroll = this.isInScrollingContainer();
                if (inScroll) {
                    prePressed = true;
                    this.postDelayed(this.checkForTap, 100);
                } else {
                    this.setPressed(true);
                }
                break;
            case ME.ACTION_MOVE:
                if (!this.pointInView(e.getX(), e.getY(), 5)) {
                    this.removeCallbacks(this.checkForTap);
                }
                break;
            case ME.ACTION_UP:
                this.removeCallbacks(this.checkForTap);
                if (prePressed) {
                    this.setPressed(true);
                    this.postDelayed(function() {
                        this.setPressed(false);
                    }, 50)
                } else {
                    this.setPressed(false);
                }
                break;
            case ME.ACTION_CANCEL:
                this.removeCallbacks(this.checkForTap);
                this.setPressed(false);
                break;
        }
    };

    this.isInScrollingContainer = function() {
        var p = this.getParent();
        while (p != null) {
            if (p.shouldDelayChildPressedState()) {
                return true;
            }
            p = p.getParent();
        }
        return false;
    };

    this.shouldDelayChildPressedState = function() {
        return false;
    };

    this.pointInView = function(x, y, slop) {
        return x >= -slop && y >= -slop && x < ((right - left) + slop) &&
            y < ((bottom - top) + slop);
    };

    this.checkClick = function(e) {
        switch (e.getAction()) {
            case ME.ACTION_DOWN:
                hasPerformedLongPress = false;
                downX = e.getRawX();
                downY = e.getRawY();
                this.checkForLongClick();
                break;
            case ME.ACTION_MOVE:
                var x = e.getX();
                var y = e.getY();
                if (x < left || x > right || y < top || y > bottom) {
                    this.removeCallbacks(this.checkLongPress);
                }
                break;
            case ME.ACTION_UP:
                if (!hasPerformedLongPress) {
                    this.removeCallbacks(this.checkLongPress);

                    var deltaX = Math.abs(downX - e.getRawX());
                    var deltaY = Math.abs(downY - e.getRawY());
                    if (deltaX < 30 && deltaY < 30) {
                        this.performClick();
                    }
                }
                break;
            case ME.ACTION_CANCEL:
                this.removeCallbacks(this.checkLongPress);
                break;
        }
    };

    this.setPreventHtmlTouchEvent = function(prevent) {
        preventHtmlTouchEvent = prevent;
    };

    this._onTouchEvent = function(e) {
        if (preventHtmlTouchEvent) {
            e.rawEv.preventDefault();
        }
        if (clickable || longClickable) {
            this.checkPressed(e);
            this.checkClick(e);
        }
        if (preventHtmlTouchEvent == false) {
            return true;
        }
        var result = this.onTouchEvent(e);
        if (result == undefined) {
            result = true;
        }
        return result;
    };

	/**
	* Implement this method to handle touch screen motion events.

	If this method is used to detect click actions, it is recommended that the actions be performed by implementing and calling performClick(). This will ensure consistent system behavior, including:

	obeying click sound preferences
	dispatching OnClickListener calls
	handling ACTION_CLICK when accessibility features are enabled
	*
	* @method onTouchEvent
	* @params {MotionEvent} e The motion event.
	*/
    this.onTouchEvent = function(e) {
        return (clickable || longClickable);
    };

    /**
     * Pass the touch screen motion event down to the target view, or this
     * view if it is the target.
     *
     * @param event The motion event to be dispatched.
     * @return True if the event was handled by the view, false otherwise.
     */
    this.dispatchTouchEvent = function(e) {
        return this._onTouchEvent(e);
    };

	/**
	* Sets the opacity of the view. This is a value from 0 to 1, where 0 means the view is completely transparent and 1 means the view is completely opaque.

	Note that setting alpha to a translucent value (0 < alpha < 1) can have significant performance implications, especially for large views. It is best to use the alpha property sparingly and transiently, as in the case of fading animations.
	*
	* @method setAlpha
	* @params {float} a The opacity of the view.
	*/
    this.setAlpha = function(a) {
        this.div.style.opacity = a;
    };

	/**
	* Returns the visibility status for this view.
	*
	* @method getVisibility
	* @return {int} Return one of VISIBLE, INVISIBLE, or GONE.
	*/
    this.getVisibility = function() {
        return visibility;
    };

	/**
	* Set the enabled state of this view.
	*
	* @method setVisibility
	* @params {int} visibility
	*/
    this.setVisibility = function(v) {
        if (visibility == v) {
            return;
        }
        visibility = v;
        if (visibility == View.VISIBLE) {
            this.div.style.display = "block";
        } else {
            this.div.style.display = "none";
        }
    };

	/**
	* Sets the next animation to play for this view. If you want the animation to play immediately, use startAnimation(Animation) instead. This method provides allows fine-grained control over the start time and invalidation, but you must make sure that 1) the animation has a start time set, and 2) the view's parent (which controls animations on its children) will be invalidated when the animation is supposed to start.
	*
	* @method setAnimation
	* @params {Animation} animation The next animation, or null.
	*/
    this.setAnimation = function(a) {
        a.setView(this);
    };

	/**
	* Start the specified animation now.
	*
	* @method startAnimation
	* @params {Animation} animation The animation to start now.
	*/
    this.startAnimation = function(a) {
        a.setView(this);
        a.start();
    };

    this.clearAnimation = function() {
        this.div.style.webkitTransition = "";
        this.div.style.transition = "";
        //this.div.style.opacity = 0;
    };

	/**
	* Causes the Runnable to be added to the message queue, to be run after the specified amount of time elapses. The runnable will be run on the user interface thread.
	*
	* @method postDelayed
	* @params {Runnable} r The Runnable that will be executed.
	* @params {long} delay The delay (in milliseconds) until the Runnable will be executed.
	*/
    this.postDelayed = function(r, delay) {
        var mSelf = this;
        var id = setTimeout(function() {
            r.call(mSelf);
        }, delay);
        runQueue.put(r, id);
    };

	/**
	* Removes the specified Runnable from the message queue.
	*
	* @method removeCallbacks
	* @params {Runnable} r The Runnable to remove from the message handling queue.
	*/
    this.removeCallbacks = function(r) {
        var id = runQueue.get(r);
        runQueue.remove(r);
        if (id !== undefined) {
            clearTimeout(id);
        }
    };

	/**
	* Call this view's OnClickListener, if it is defined. Performs all normal actions associated with clicking: reporting accessibility event, playing a sound, etc.
	*
	* @method performClick
	*/
    this.performClick = function() {
        if (clickListener !== null) {
            clickListener.call(this);
        }
    };

	/**
	* Call this view's OnLongClickListener, if it is defined. Invokes the context menu if the OnLongClickListener did not consume the event.
	*
	* @method performLongClick
	*/
    this.perfermLongClick = function() {
        if (longClickListener !== null) {
            longClickListener();
        }
        return true;
    };

	//TODO
    this.checkForLongClick = function() {
        if (longClickable) {
            hasPerformedLongPress = false;

            this.postDelayed(this.checkLongPress, 500);
        }
    };

	//TODO
    this.checkLongPress = function() {
        if (this.perfermLongClick()) {
            hasPerformedLongPress = true;
        }
    };

	//TODO
    this.setCornerSize = function(tl, tr, br, bl) {
        if (tr == undefined && br == undefined && bl == undefined) {
            tr = tl;
            br = tl;
            bl = tl;
        }
        this.div.style.borderRadius = tl + "px " + tr + "px " + br + "px " + bl + "px";
    };

	//TODO
    this.setStyle = function(attr, css) {
        this.div.style[attr] = css;
    };

	//TODO
    this.setBorder = function(thick, color) {
        this.div.style.border = thick + "px solid " + Utils.toCssColor(color);
    };

	//TODO
    this.setBorderLeft = function(thick, color) {
        this.div.style.borderLeft = thick + "px solid " + Utils.toCssColor(color);
    };

	//TODO
    this.setBorderTop = function(thick, color) {
        this.div.style.borderTop = thick + "px solid " + Utils.toCssColor(color);
    };

	//TODO
    this.setBorderRight = function(thick, color) {
        this.div.style.borderRight = thick + "px solid " + Utils.toCssColor(color);
    };

	//TODO
    this.setBorderBottom = function(thick, color) {
        this.div.style.borderBottom = thick + "px solid " + Utils.toCssColor(color);
    };

	//TODO
    this.setBoxShadow = function(x, y, blur, spread, color) {
        var styleString = x + "px " + y + "px";

        if(typeof(blur) != "undefined") {
            styleString = styleString + " " + blur + "px";
        }
        if(typeof(spread) != "undefined") {
            styleString = styleString + " " + spread + "px";
        }
        if(typeof(color) != "undefined") {
            styleString = styleString + " " + Utils.toCssColor(color);
        }

        this.div.style.webkitBoxShadow =  styleString;
    };

    this.setFontFamily = function(fontFamily) {
        this.div.style.fontFamily = fontFamily;
    };

    this.setText = function(t) {
        this.div.innerHTML = t;
        this.div.style.whiteSpace = "nowrap";
    };

    this.setTextColor = function(c) {
        this.div.style.color = Utils.toCssColor(c);
    };

    this.setTextSize = function(ts) {
        this.div.style.fontSize = ts + "px";
    };

    /**
     * Look for a child view with the given id.  If this view has the given
     * id, return this view.
     *
     * @param id The id to search for.
     * @return The view that has the given id in the hierarchy or null
     */
    this.findViewById = function(id) {
        if (id < 0) {
            return null;
        }
        return this.findViewTraversal(id);
    };

    this.findViewTraversal = function(_id) {
        if (id == _id) {
            return this;
        }
        return null;
    }
}
Object.defineProperty(View,"NO_ID",{value:-1});
Object.defineProperty(View,"VISIBLE",{value:0});
Object.defineProperty(View,"INVISIBLE",{value:4});
Object.defineProperty(View,"GONE",{value:8});
Object.defineProperty(View,"VIEW_STATE_ENABLED",{value:(1 << 3)});
Object.defineProperty(View,"VIEW_STATE_PRESSED",{value:(1 << 4)});

/**
 * A ViewGroup is a special view that can contain other views
 * (called children.) The view group is the base class for layouts and views
 * containers.
 *
 * @class ViewGroup
 * @extends View
 */
function ViewGroup() {
    View.apply(this, []);
    var children = [];

    var motionTarget = null;
    var tempRect = new Rect();
    var disallowIntercept = false;

    /**
     * Returns the number of children in the group.
     *
     * @method getChildCount
     * @return {int} a positive integer representing the number of children in
     *         the group
     */
    this.getChildCount = function() {
        return children.length;
    };

    /**
     * Returns the view at the specified position in the group.
     *
     * @method getChildAt
     * @param {int} i the position at which to get the view from
     * @return {int} the view at the specified position or null if the position
     *         does not exist within the group
     */
    this.getChildAt = function(i) {
        return children[i];
    };

    this.indexOfChild = function(c) {
        return children.indexOf(c);
    };

    /**
     * Adds a child view with the specified layout parameters.
     *
     * @method addView
     * @param {View} v the child view to add
     * @param {int} index the position at which to add the child,
     *          or {LayoutParams} params the layout parameters to set on the child
     * @param {LayoutParams} params the layout parameters to set on the child
     */
    this.addView = function(v, indexOrParams, params) {
        if (v.getParent() != null) {
            console.log("IllegalStateException: " + v.getTag() + " 只能拥有一个父节点");
            return;
        }
        v.setParent(this);
        if (indexOrParams == undefined) {
            children.add(v);
        } else {
            if ((typeof indexOrParams) == "number") {
                children.add(indexOrParams, v);
                if (params != undefined) {
                    v.setLayoutParams(params);
                }
            } else {
                children.add(v);
                v.setLayoutParams(indexOrParams);
            }
        }
        this.div.appendChild(v.div);
        this.requestLayout();
    };

    /**
     * Removes a view from the group.
     *
     * @method removeView
     * @param {View} v the view to remove from the group.
     */
    this.removeView = function(v) {
        if (v !== null && children.contains(v)) {
            v.setParent(null);
            children.remove(v);
            this.div.removeChild(v.div);
            this.requestLayout();
        }
    };

    /**
     * Call this method to remove all child views from the
     * ViewGroup.
     *
     * @method removeAllViews
     */
    this.removeAllViews = function() {
        for (var i = 0; i < children.length; i++) {
            children[i].setParent(null);
        }
        children.clear();
        this.div.innerHTML = "";
        if (this.getParent()) {
            this.getParent().requestLayout();
        }
    };

    this.findViewTraversal = function(id) {
        if (id == this.getId()) {
            return this;
        }

        for (var i = 0; i < children.length; i++) {
            var v = children[i];
            v = v.findViewById(id);
            if (v != null) {
                return v;
            }
        }
        return null;
    };

    /**
     * Implement this method to intercept all touch screen motion events.  This
     * allows you to watch events as they are dispatched to your children, and
     * take ownership of the current gesture at any point.
     *
     * @method onInterceptTouchEvent
     * @param e The motion event being dispatched down the hierarchy.
     * @return Return true to steal motion events from the children and have
     * them dispatched to this ViewGroup through onTouchEvent().
     * The current target will receive an ACTION_CANCEL event, and no further
     * messages will be delivered here.
     *
     */
    this.onInterceptTouchEvent = function(e) {
        return false;
    };

    this.onBeforeInterceptTouchEvent = function(e) {

    };

    /**
     * Pass the touch screen motion event down to the target view, or this
     * view if it is the target.
     *
     * @param e The motion event to be dispatched.
     * @return True if the event was handled by the view, false otherwise.
     */
    this.dispatchTouchEvent = function(e) {
        var xf = e.getX();
        var yf = e.getY();
        var scrolledX = xf + this.getScrollX();
        var scrolledY = yf + this.getScrollY();
        var frame = tempRect;

        var action = e.getAction();
        if (action == ME.ACTION_DOWN) {
            if (motionTarget != null) {
                motionTarget = null;
            }
            if (disallowIntercept || !this.onInterceptTouchEvent(e)) {
                e.setAction(ME.ACTION_DOWN);
                var count = children.length;
                for (var i = count - 1; i >= 0; i--) {
                    var child = children[i];
                    if (child.getVisibility() == View.VISIBLE) {
                        child.getHitRect(frame);
                        if (frame.contains(scrolledX, scrolledY)) {
                            var xc = scrolledX - child.getLeft();
                            var yc = scrolledY - child.getTop();
                            e.setLocation(xc, yc);
                            if (child.dispatchTouchEvent(e))  {
                                motionTarget = child;
                                return true;
                            }
                        }
                    }
                }
            }
        }

        var isUpOrCancel = (action == ME.ACTION_UP) || (action == ME.ACTION_CANCEL);
        if (isUpOrCancel) {
            disallowIntercept = false;
        }

        var target = motionTarget;
        if (target == null) {
            e.setLocation(xf, yf);
            return this._onTouchEvent(e);
        }

        if (!disallowIntercept && this.onInterceptTouchEvent(e)) {
            var xc = scrolledX - target.getLeft();
            var yc = scrolledY - target.getTop();
            e.setAction(ME.ACTION_CANCEL);
            e.setLocation(xc, yc);
            if (!target.dispatchTouchEvent(e)) {
            }
            motionTarget = null;
            return true;
        }

        if (isUpOrCancel) {
            motionTarget = null;
        }

        var xc = scrolledX - target.getLeft();
        var yc = scrolledY - target.getTop();
        e.setLocation(xc, yc);

        return target.dispatchTouchEvent(e);
    };

    this.requestDisallowInterceptTouchEvent = function(d) {
        if (d == disallowIntercept) {
            return;
        }
        disallowIntercept = d;
        if (this.getParent() != null) {
            this.getParent().requestDisallowInterceptTouchEvent(d);
        }
    }
}

// 以下为Activity方法
var mRootNode;
var mLastOffset = null;

var mDecorView = null;
var mRootView = null;


var mHideDiv = null;

var meta = document.createElement("meta");
meta.name = "viewport";
meta.content = "width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no";
document.head.appendChild(meta);

meta = document.createElement("meta");
meta.name = "apple-mobile-web-app-capable";
meta.content = "yes";
document.head.appendChild(meta);

meta = document.createElement("meta");
meta.name = "mobile-web-app-capable";
meta.content = "yes";
document.head.appendChild(meta);

function setContentView(view, htmlnode) {
    addOrientationListener(function() {
        onOrientationChanged();
    });

    mRootNode = htmlnode;
    if (mRootNode == undefined) {
        mRootNode = document.body;
    } else {
        setInterval(forceReLayout, 250);
    }

    mHideDiv = document.createElement("div");
    mHideDiv.style.height = "100%";
    mHideDiv.style.width = "100%";

    mRootNode.innerHTML = "";
    mRootNode.style.padding = "0";
    mRootNode.style.margin = "0";
    mRootNode.appendChild(mHideDiv);

    mDecorView = new DecorView();
    mDecorView.setTag("decorview");

    mRootView = view;
    mRootView.setTag("rootview");
    mDecorView.addView(mRootView);

    mRootNode.appendChild(mDecorView.div);
    mRootNode.style.overflow = "hidden";

    document.body.style.pointerEvents = "auto";
    var events = ["touchstart", "touchmove", "touchend", "touchcancel", "mousedown", "mousemove", "mouseup", "mouseout"];
    for (var i = 0; i < events.length; i++) {
        document.body.addEventListener(events[i], touch, false);
    }

    var css = document.createElement("style");
    var divCss = "position:absolute; box-sizing:border-box; overflow:hidden; text-overflow:ellipsis;";
    css.innerHTML = "body > div[tag='decorview']{" + divCss + "} body > div[tag='decorview'] div{" + divCss + "} "
    + "*{-webkit-user-select:none;} ::-webkit-scrollbar {width: 0px; height: 0px} input{outline:none}";
    document.head.appendChild(css);
}

function DecorView() {
    FrameLayout.apply(this);

    this.requestLayout = function() {
        forceReLayout();
    };

    this.measure = function(wMS, hMS) {
        this.onMeasure(wMS, hMS);
    };

    this.layout = function(x, y) {
        this.onLayout(x, y);
    }
}

var mInTouch = false;

function touch(e) {
    e.stopPropagation();

    if (e.type == "mousemove" && mInTouch == false) {
        return;
    }
    if (e.type == "mouseout" && mInTouch == false) {
        return;
    }
    var ev = new ME(e);
    ev.realDiv = this;

    switch (ev.getAction()) {
        case ME.ACTION_DOWN:
            // solve input text keep focused issues
            var ele = document.getElementsByTagName('input');
            for(var i = 0, l = ele.length; i < l; ++i){
                ele[i].blur();
            }
            mInTouch = true;
            break;
        case ME.ACTION_UP:
            mInTouch = false;
            break;
        case ME.ACTION_CANCEL:
            mInTouch = false;
            break;
    }
    mDecorView.dispatchTouchEvent(ev);

    if (ev.needCompleteActionUp()) {
        var actionUpEv = new ME(e);
        actionUpEv.setAction(1);
        actionUpEv.setPointerCount(1);
        mDecorView.dispatchTouchEvent(actionUpEv);
    }
}
//
///* statistics code start, you can replace to your own code. www.clicki.cn is good to use.*/
//var c = document.createElement('script');
//c.type = 'text/javascript';
//c.async = true;
//c.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'www.clicki.cn/boot/52027';
//var h = document.getElementsByTagName('script')[0];
//h.parentNode.insertBefore(c, h);
///* statistics code end */

function getRootView() {
    return mRootView;
}

function forceReLayout() {
    if (mDecorView === null || mDecorView === undefined) {
        console.log("gyy: mDecorView is null");
        return;
    }
    if (mRootNode == document.body) {
        mDecorView.measure(window.innerWidth, window.innerHeight);
        mDecorView.layout(0, 0);
    } else {
        var offset = Utils.getOffset(mRootNode);
        if (mLastOffset == null || offset.width != mLastOffset.width
            || offset.height != mLastOffset.height
            || offset.left != mLastOffset.left
            || offset.right != mLastOffset.right) {
            mLastOffset = offset;
            console.log(offset);
            mDecorView.measure(offset.width, offset.height);
            mDecorView.layout(offset.left, offset.top);
        }
    }
}

function onOrientationChanged() {
    forceReLayout();
}

function addOrientationListener(listener) {
    window.addEventListener("resize", listener);
}


var mJSTotal = 0;
var mJSCount = 0;
function includeJs(path) {
    mJSTotal++;
    loadJS(path, function() {
        mJSCount++;
        if (window.onJSProgressChanged) {
            window.onJSProgressChanged.call(this, mJSCount / mJSTotal);
        }
        if (mJSCount == mJSTotal) {
            if (window.onCreate) {
                window.onCreate.call(this);
            }
            mJSTotal = 0;
            mJSCount = 0;
        }
    });
}

function loadJS(path, callback) {
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = path;
    s.onload = s.onreadystatechange = function () {
        if (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete') {
            if (callback) {
                callback.call();
            }
            s.onload = s.onreadystatechange = null;
        }
    };
    var h = document.getElementsByTagName('head')[0];
    h.appendChild(s)
}

function liteAjax(url, callback, method, postBody, _error) {

    method = method ? method.toUpperCase() : "GET";

    var rqst = getRequestObj();
    if (rqst) {
        rqst.onreadystatechange = function() {
            if (rqst.readyState == 4) {
                callback(rqst.responseText);
            }
        };
        rqst.ontimeout = function() {
            console.log('timeout');
        };
        rqst.onerror = function() {
            console.log('error');
        };
        rqst.onabort = function() {
            console.log('abort')
        };

        rqst.open(method, url, true);
        if (method == "POST") {
            rqst.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            rqst.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            rqst.setRequestHeader('Connection', 'close');
        }
        rqst.send(postBody);
    }

    function getRequestObj() {
        if (window.ActiveXObject) {
            return new ActiveXObject('Microsoft.XMLHTTP');
        } else if (window.XMLHttpRequest) {
            return new XMLHttpRequest();
        }
    }
}
