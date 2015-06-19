/**
 * Jndroid core functions
 */
Array.prototype.add = function(index, val) {
    if (val == undefined) {
        this.push(index);
    } else {
        this.splice(index, 0, val);
    }
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
        }
        if (tag) {
            console.log(tag + ":" + touch);
        } else {
            console.log(touch);
        }
    };

    this.toCssColor = function(color) {
        if (typeof color == "string") {
            return color;
        } else {
            var a = (color >> 24) & 255;
            var r = (color >> 16) & 255;
            var g = (color >> 8) & 255;
            var b = color & 255;

            return "rgba(" + r + "," + g + "," + b + "," + (a / 255.0) + ")";
        }
    };

    this.contains = document.documentElement.contains ?
        function(parent, node) {
            return parent !== node && parent.contains(node);
        } :
        function(parent, node) {
            while (node && (node = node.parentNode)) {
                if (node === parent) {
                    return true;
                }
            }
            return false;
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

    this.includeJs = function(path, callback) {
        var sobj = document.createElement('script');
        sobj.type = 'text/javascript';
        sobj.src = path;
        if (callback != undefined) {
            sobj.onload = sobj.onreadystatechange = function () {
                if (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete') {
                    callback.call();
                    sobj.onload = sobj.onreadystatechange = null;
                }
            };
        }
        var headobj = document.getElementsByTagName('head')[0];
        headobj.appendChild(sobj)
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

/**
 * A MeasureSpec encapsulates the layout requirements passed from parent to child.
 * Each MeasureSpec represents a requirement for either the width or the height.
 * A MeasureSpec is comprised of a size and a mode.
 *
 * @class MeasureSpec
 * @static
 */
var MeasureSpec = new _MeasureSpec();
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
        return (size & ~MeasureSpec.MODE_MASK) | (mode & MeasureSpec.MODE_MASK);
    };

    /**
     * Extracts the mode from the supplied measure specification.
     *
     * @method getMode
     * @param {int} measureSpec the measure specification to extract the mode from.
     * @return {int} MeasureSpec.UNSPECIFIED, MeasureSpec.AT_MOST or MeasureSpec.EXACTLY.
     */
    this.getMode = function(measureSpec) {
        return (measureSpec & MeasureSpec.MODE_MASK);
    };

    /**
     * Extracts the size from the supplied measure specification.
     *
     * @method getSize
     * @param {int} measureSpec the measure specification to extract the size from.
     * @return {int} the size in pixels defined in the supplied measure specification.
     */
    this.getSize = function(measureSpec) {
        return (measureSpec & ~MeasureSpec.MODE_MASK);
    };
}

Object.defineProperty(MeasureSpec,"MODE_MASK",{value:(0x3 << 30)});

/**
 * Measure specification mode: The parent has not imposed any constraint
 * on the child. It can be whatever size it wants.
 *
 * @property UNSPECIFIED
 * @type int
 * @static
 * @final
 */
Object.defineProperty(MeasureSpec,"UNSPECIFIED",{value:(0x0 << 30)});

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
Object.defineProperty(MeasureSpec,"EXACTLY",{value:(0x1 << 30)});

/**
 * Measure specification mode: The child can be as large as it wants up
 * to the specified size.
 *
 * @property AT_MOST
 * @type int
 * @static
 * @final
 */
Object.defineProperty(MeasureSpec,"AT_MOST",{value:(0x2 << 30)});

/**
 * Object used to report movement (mouse, pen, finger, trackball) events.
 * Motion events may hold either absolute or relative movements and
 * other data, depending on the type of device.
 *
 * @class MotionEvent
 */
function MotionEvent(rawEv) {

    this.rawEv = rawEv;

    var touch = getTouches();
    var mX = touch.pageX;
    var mY = touch.pageY;

    var mAction = 3;
    if (rawEv.type == "touchstart" || rawEv.type == "mousedown") {
        mAction = 0;
    } else if (rawEv.type == "touchmove" || rawEv.type == "mousemove") {
        mAction = 2;
    } else if (rawEv.type == "touchend" || rawEv.type == "mouseup") {
        mAction = 1;
    } else if (rawEv.type == "touchcancel") {
        mAction = 3;
    }

    /**
     * Returns the X coordinate of this event.
     *
     * @method getX
     * @return {float} X coordinate.
     */
    this.getX = function() {
        return mX;
    };

    /**
     * Returns the Y coordinate of this event.
     *
     * @method getY
     * @return {float} Y coordinate.
     */
    this.getY = function() {
        return mY;
    };

    this.setLocation = function(x, y) {
        mX = x;
        mY = y;
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
    this.getRawX = function() {
        return touch.pageX;
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
    this.getRawY = function() {
        return touch.pageY;
    };

    /**
     * Return the kind of action being performed.
     *
     * @method getAction
     * @return {int} the action.
     */
    this.getAction = function() {
        return mAction;
    };

    this.setAction = function(action) {
        mAction = action;
    };

    function getTouches() {
        if (rawEv.type == "touchstart" || rawEv.type == "touchmove") {
            return rawEv.touches[0];
        } else if (rawEv.type == "touchend" || rawEv.type == "touchcancel") {
            return rawEv.changedTouches[0];
        } else {
            return rawEv;
        }
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
Object.defineProperty(MotionEvent,"ACTION_DOWN",{value:0});

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
Object.defineProperty(MotionEvent,"ACTION_UP",{value:1});

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
Object.defineProperty(MotionEvent,"ACTION_MOVE",{value:2});

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
Object.defineProperty(MotionEvent,"ACTION_CANCEL",{value:3});

/**
 * Helper for tracking the velocity of touch events, for implementing
 * flinging and other such gestures.
 * @class VelocityTracker
 */
function VelocityTracker() {
    var mScope = 10;
    var mX = [];
    var mY = [];
    var mTime = [];
    var mVx = 0;
    var mVy = 0;

    this.clear = function() {
        mX.clear();
        mY.clear();
        mTime.clear();
    };

    /**
     * Add a user's movement to the tracker.
     * @method addMovement
     * @param event The MotionEvent you received and would like to track.
     */
     this.addMovement = function(event) {
        if (mX.length >= mScope) {
            mX.removeAt(0);
        }
        mX.add(event.getRawX());
        if (mY.length >= mScope) {
            mY.removeAt(0);
        }
        mY.add(event.getRawY());
        if (mTime.length >= mScope) {
            mTime.removeAt(0);
        }
        mTime.add(event.rawEv.timeStamp);
    };

    /**
     * Compute the current velocity based on the points that have been
     * collected.  Only call this when you actually want to retrieve velocity
     * information, as it is relatively expensive.  You can then retrieve
     *
     * @method computeCurrentVelocity
     * @param units The units you would like the velocity in.  A value of 1
     * provides pixels per millisecond, 1000 provides pixels per second, etc.
     * @param maxVelocity The maximum velocity that can be computed by this method.
     * This value must be declared in the same unit as the units parameter. This value
     * must be positive.
     */
    this.computeCurrentVelocity = function(unit) {
        if (mX.length < 2) {
            mVx = 0;
            mVy = 0;
            return;
        }
        var t = mTime[mTime.length - 1] - mTime[0];
        if (t == 0) {
            mVx = 0;
            mVy = 0;
            return;
        }
        if (unit == undefined) {
            unit = 1;
        }
        mVx = (mX[mX.length - 1] - mX[0]) / t * unit;
        mVy = (mY[mX.length - 1] - mY[0]) / t * unit;
    };

    /**
     * Retrieve the last computed X velocity.  You must first call
     * @method getXVelocity
     * @return The previously computed X velocity.
     */
    this.getXVelocity = function() {
        return mVx;
    };

    /**
     * Retrieve the last computed Y velocity.  You must first call
     * @method getYVelocity
     * @return The previously computed Y velocity.
     */
    this.getYVelocity = function() {
        return mVy;
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
    this.alpha = function (color) {
        return color >>> 24;
    };

    /**
     * Return the red component of a color int. This is the same as saying
     * (color >> 16) & 0xFF
     *
     * @method red
     * @return {int}
     */
    this.red = function (color) {
        return (color >> 16) & 0xFF;
    };

    /**
     * Return the green component of a color int. This is the same as saying
     * (color >> 8) & 0xFF
     *
     * @method green
     * @return {int}
     */
    this.green = function (color) {
        return (color >> 8) & 0xFF;
    };

    /**
     * Return the blue component of a color int. This is the same as saying
     * color & 0xFF
     *
     * @method blue
     * @return {int}
     */
    this.blue = function (color) {
        return color & 0xFF;
    };

    /**
     * Return a color-int from red, green, blue components.
     * The alpha component is implicity 255 (fully opaque).
     * These component values should be [0..255], but there is no
     * range check performed, so if they are out of range, the
     * returned color is undefined.
     *
     * @method rgb
     * @param red  Red component [0..255] of the color
     * @param green Green component [0..255] of the color
     * @param blue  Blue component [0..255] of the color
     * @return {int}
     */
    this.rgb = function (red, green, blue) {
        return (0xFF << 24) | (red << 16) | (green << 8) | blue;
    };

    /**
     * Return a color-int from alpha, red, green, blue components.
     * These component values should be [0..255], but there is no
     * range check performed, so if they are out of range, the
     * returned color is undefined.
     * @method argb
     * @param alpha Alpha component [0..255] of the color
     * @param red   Red component [0..255] of the color
     * @param green Green component [0..255] of the color
     * @param blue  Blue component [0..255] of the color
     * @return {int}
     */
    this.argb = function (alpha, red, green, blue) {
        return (alpha << 24) | (red << 16) | (green << 8) | blue;
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
    var mBounds = new Rect(0, 0, 0, 0);
    var mCallback = null;

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
        return mBounds;
    };

    /**
     * Specify a bounding rectangle for the Drawable. This is where the drawable
     * will draw when its draw() method is called.
     *
     * @method setBounds
     */
    this.setBounds = function(l, t, r, b) {
        if (mBounds.left != l || mBounds.top != t || mBounds.right != r || mBounds.bottom != b) {
            mBounds.set(l, t, r, b);
        }
    };

    /**
     * Bind a object to this Drawable.  Required for clients
     * that want to support animated drawables.
     *
     * @method setCallback
     * @param {Callback} cb The client's Callback implementation.
     */
    this.setCallback = function(cb) {
        mCallback = cb;
    };

    /**
     * Use the current implementation to have this Drawable
     * redrawn. Does nothing if there is no Callback attached to the
     * Drawable.
     *
     * @method invalidateSelf
     */
    this.invalidateSelf = function() {
        if (mCallback != null) {
            mCallback.invalidateDrawable(this);
        }
    };

    /**
     * Specify a set of states for the drawable. These are use-case specific,
     * so see the relevant documentation.
     *
     * @method setState
     * @param {int[]} state The new set of states to be displayed.
     */
    this.setState = function(state) {
        this.onStateChange(state);
    };

    /**
     * Override this in your subclass to change appearance if you recognize the
     * specified state.
     *
     * @method onStateChange
     * @param {int[]} state The new set of states to be displayed.
     * @return {boolean} Returns true if the state change has caused the appearance of
     * the Drawable to change (that is, it needs to be drawn), else false
     * if it looks the same and there is no need to redraw it since its
     * last state.
     */
    this.onStateChange = function(state) {
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
    var mStartProcess;
    var mFinalProcess;
    var mDeltaProcess;

    var mCurrProcess;
    var mStartTime;
    var mDuration;
    var mDurationReciprocal;
    var mIsFinished = true;

    var mListener;

    this.startProcess = function(startProcess, finalProcess, duration) {
        mIsFinished = false;
        mDuration = duration;
        mStartTime = (new Date()).getTime();
        mStartProcess = startProcess;
        mFinalProcess = finalProcess;
        mDeltaProcess = finalProcess - startProcess;
        mDurationReciprocal = 1.0 / mDuration;
        mCurrProcess = startProcess;
    };

    this.computeProcessOffset = function() {
        if (mIsFinished) {
            return false;
        }

        var  timePassed = (new Date()).getTime() - mStartTime;

        if (timePassed < mDuration - 10) {
            var x = timePassed * mDurationReciprocal;
            mCurrProcess = mStartProcess + x * mDeltaProcess;
        } else {
            mCurrProcess = mFinalProcess;
            mIsFinished = true;
            this.fireProcessEnd();
        }
        return true;
    };

    this.isFinished = function() {
        return mIsFinished;
    };

    this.forceFinished = function(finished) {
        mIsFinished = finished;
        this.fireProcessEnd();
    };

    this.getDuration = function() {
        return mDuration;
    };

    this.getCurrProcess = function() {
        return mCurrProcess;
    };

    this.setCurrProcess = function(process) {
        mCurrProcess = process;
    };

    this.setProcessListener = function(listener) {
        mListener = listener;
    };

    this.fireProcessEnd = function() {
        if (mListener != null) {
            mListener.call(this);
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
    var mSelf = this;

    var mDiv = document.createElement("div");
    mDiv.style.position = "absolute";
    mDiv.style.boxSizing = "border-box";
    mDiv.style.overflow = "hidden";
    mDiv.addEventListener("touchstart", function(){}, false);

    var mParent;
    var mLeft = 0;
    var mTop = 0;
    var mRight = 0;
    var mBottom = 0;
    var mWidth = 0;
    var mHeight = 0;
    var mWidthMS = 0;
    var mHeightMS = 0;
    var mBackground = 0;
    var mPaddingLeft = 0;
    var mPaddingTop = 0;
    var mPaddingRight = 0;
    var mPaddingBottom = 0;
    var mScrollX = 0;
    var mScrollY = 0;
    var mLayoutParams = null;
    var mWillNotDraw = true;
    var mVisibility = View.VISIBLE;
    var mClickable = false;
    var mLongClickable = false;
    var mClickListener = null;
    var mLongClickListener = null;
    var mTag = "View";
    var mID = View.NO_ID;
    var mHTMLCanvas = null;
    var canvas = null;
    var mPreventHtmlTouchEvent = true;

    var mDownX, mDownY;
    var mHasPerformedLongPress = false;

    var mRunQueue = new Map();

    /**
     * Returns this view's identifier.
     *
     * @return a positive integer used to identify the view or NO_ID
     *         if the view has no ID

     */
    this.getId = function() {
        return mID;
    };

    /**
     * Sets the identifier for this view. The identifier does not have to be
     * unique in this view's hierarchy. The identifier should be a positive
     * number.
     *
     * @param id a number used to identify the view
     */
    this.setId = function(id) {
        mID = id;
    };

	/**
	* Returns this view's tag.
	*
	* @method getTag
	* @return {Object} Returns the object stored in this view as a tag, or null if not set.
	*/
    this.getTag = function() {
        return mTag;
    };

	/**
	* Sets the tag associated with this view.
	*
	* @method setTag
	* @params {Object} tag An Object to tag the view with
	*/
    this.setTag = function(tag) {
        mTag = tag;
        mDiv.setAttribute("Tag", mTag);
    };

	/**
	* Gets the parent of this view. Note that the parent is a ViewParent and not necessarily a View.
	*
	* @method getParent
	* @return {} Returns the parent of this view.
	*/
    this.getParent = function() {
        return mParent;
    };

	/**
	* Sets the parent.
	*
	* @method setParent
	* @params {View} parent The parent.
	*/
    this.setParent = function(parent) {
        mParent = parent;
    };

	//TODO
    this.getDiv = function() {
        return mDiv;
    };
	
	/**
	* Returns the left padding of this view. If there are inset and enabled scrollbars, this value may include the space required to display the scrollbars as well.
	*
	* @method getPaddingLeft
	* @return {int} Returns the left padding in pixels.
	*/
    this.getPaddingLeft = function() {
        return mPaddingLeft;
    };

	/**
	* Returns the top padding of this view.
	*
	* @method getPaddingTop
	* @return {int} Returns the top padding in pixels.
	*/
    this.getPaddingTop = function() {
        return mPaddingTop;
    };

	/**
	* Returns the right padding of this view. If there are inset and enabled scrollbars, this value may include the space required to display the scrollbars as well.
	*
	* @method getPaddingRight
	* @return {int} Returns the right padding in pixels.
	*/
    this.getPaddingRight = function() {
        return mPaddingRight;
    };

	/**
	* Returns the bottom padding of this view. If there are inset and enabled scrollbars, this value may include the space required to display the scrollbars as well.
	*
	* @method getPaddingBottom
	* @return {int} Returns the bottom padding in pixels.
	*/
    this.getPaddingBottom = function() {
        return mPaddingBottom;
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
    this.setPadding = function(left, top, right, bottom) {
        if (top === undefined && right === undefined && bottom === undefined) {
            top = left;
            right = left;
            bottom = left;
        }
        mPaddingLeft = left;
        mPaddingTop = top;
        mPaddingRight = right;
        mPaddingBottom = bottom;
    };

	/**
	* Get the LayoutParams associated with this view. All views should have layout parameters. These supply parameters to the parent of this view specifying how it should be arranged. There are many subclasses of ViewGroup.LayoutParams, and these correspond to the different subclasses of ViewGroup that are responsible for arranging their children. This method may return null if this View is not attached to a parent ViewGroup or setLayoutParams(ViewGroup.LayoutParams) was not invoked successfully. When a View is attached to a parent ViewGroup, this method must not return null.
	*
	* @method getLayoutParams
	* @return {LayoutParams} Returns the LayoutParams associated with this view, or null if no parameters have been set yet.
	*/
    this.getLayoutParams = function() {
        return mLayoutParams;
    };

	/**
	* Set the layout parameters associated with this view. These supply parameters to the parent of this view specifying how it should be arranged. There are many subclasses of ViewGroup.LayoutParams, and these correspond to the different subclasses of ViewGroup that are responsible for arranging their children.
	*
	* @method setLayoutParams
	* @params {LayoutParams}  lp The layout parameters for this view, cannot be null.
	*/
    this.setLayoutParams = function(lp) {
        mLayoutParams = lp;
    };

	/**
	* Left position of this view relative to its parent.
	*
	* @method getLeft
	* @return {int} Returns the left edge of this view, in pixels.
	*/
    this.getLeft = function() {
        return mLeft;
    };

    this.getRight = function() {
        return mLeft + this.getMeasuredWidth();
    };

	/**
	* Top position of this view relative to its parent.
	*
	* @method getTop
	* @return {int} Returns the top of this view, in pixels.
	*/
    this.getTop = function() {
        return mTop;
    };

    this.getBottom = function() {
        return mTop + this.getMeasuredHeight();
    };

	/**
	* Return the width of the your view.
	*
	* @method getWidth
	* @return {int} Returns the width of your view, in pixels.
	*/
    this.getWidth = function() {
        return mWidth;
    };

	/**
	* Return the height of your view.
	*
	* @method getHeight
	* @return {int} Returns the height of your view, in pixels.
	*/
    this.getHeight = function() {
        return mHeight;
    };

	/**
	* Returns the raw measured width of this view.
	*
	* @method getMeasuredWidth
	* @return {int} Returns the raw measured width of this view.
	*/
    this.getMeasuredWidth = function() {
        return mWidth;
    };

	/**
	* Returns the raw measured height of this view.
	*
	* @method getMeasuredHeight
	* @return {int} Returns the raw measured height of this view.
	*/
    this.getMeasuredHeight = function() {
        return mHeight;
    };

    this.getScrollX = function() {
        return mScrollX;
    };

    this.setScrollX = function(x) {
        mScrollX = x;
    };

    this.getScrollY = function() {
        return mScrollY;
    };

    this.setScrollY = function(y) {
        mScrollY = y;
    };

    this.getHitRect = function(outRect) {
        outRect.set(mLeft, mTop, mRight, mBottom);
    };

	/**
	* The visual left position of this view, in pixels.
	*
	* @method getLeft
	* @return {int} Returns the visual x position of this view, in pixels.
	*/
    this.getLeft = function() {
        return mLeft;
    };

	/**
	* The visual top position of this view, in pixels.
	*
	* @method getTop
	* @return {int} Returns the visual y position of this view, in pixels.
	*/
    this.getTop = function() {
        return mTop;
    };

	/**
	* This is called to find out how big a view should be. The parent supplies constraint information in the width and height parameters.

	The actual measurement work of a view is performed in onMeasure(int, int), called by this method. Therefore, only onMeasure(int, int) can and must be overridden by subclasses.
	*
	* @method measure
	* @params {int} widthMS Horizontal space requirements as imposed by the parent.
	* @params {int} heightMS Vertical space requirements as imposed by the parent.
	*/
    this.measure = function(widthMS, heightMS) {
        mWidthMS = widthMS;
        mHeightMS = heightMS;
        this.onMeasure(widthMS, heightMS);
    };

	/**
	* Measure the view and its content to determine the measured width and the measured height. This method is invoked by measure(int, int) and should be overriden by subclasses to provide accurate and efficient measurement of their contents.

	CONTRACT: When overriding this method, you must call setMeasuredDimension(int, int) to store the measured width and height of this view.
	*
	* @method onMeasure
	* @params {int} widthMS horizontal space requirements as imposed by the parent. The requirements are encoded with View.MeasureSpec.
	* @params {int} vertical space requirements as imposed by the parent. The requirements are encoded with View.MeasureSpec.
	*/
    this.onMeasure = function(widthMS, heightMS) {
        this.setMeasuredDimension(MeasureSpec.getSize(widthMS), MeasureSpec.getSize(heightMS));
    };

	/**
	* This method must be called by onMeasure(int, int) to store the measured width and measured height.
	*
	* @method setMeasuredDimension
	* @params {int} width The measured width of this view.
	* @params {int} height The measured height of this view.
	*/
    this.setMeasuredDimension = function(width, height) {
        if (mWidth == width && mHeight == height) {
            return;
        }
        mWidth = width;
        mHeight = height;
        mDiv.style.width = width + "px";
        mDiv.style.height = height + "px";
        if (mHTMLCanvas !== null) {
            mHTMLCanvas.width = width;
            mHTMLCanvas.height = height;
            changeDensity(mHTMLCanvas);
        }
    };

    function changeDensity(canvas) {
        if (!canvas.style.width)
            canvas.style.width = canvas.width + 'px';
        if (!canvas.style.height)
            canvas.style.height = canvas.height + 'px';

        var density = DisplayMetrics.density;
        canvas.width = Math.ceil(canvas.width * density);
        canvas.height = Math.ceil(canvas.height * density);
        var ctx = canvas.getContext('2d');
        ctx.scale(density, density);
    }

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
        mLeft = x;
        mTop = y;
        mRight = x + this.getMeasuredWidth();
        mBottom = y + this.getMeasuredHeight();

        mDiv.style.left = x + "px";
        mDiv.style.top = y + "px";
        this.onLayout(x, y);
        this.invalidate();
    };

	/**
	* Called from layout when this view should assign a size and position to each of its children. Derived classes with children should override this method and call layout on each of their children.
	*
	* @method onLayout
	* @params {int} x Left position, relative to parent.
	* @params {int} y Top position, relative to parent.
	*/
    this.onLayout = function(x, y) {

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
        mSelf.draw();
    };

	/**
	* Manually render this view (and all of its children). The view must have already done a full layout before this function is called. When implementing a view, implement onDraw(android.graphics.Canvas) instead of overriding this method. If you do need to override this method, call the superclass version.
	*
	* @method draw
	*/
    this.draw = function() {
        this.computeScroll();

        if (mWillNotDraw == false) {
            if (mHTMLCanvas != null) {
                mHTMLCanvas.width = mHTMLCanvas.width;
                if (mHTMLCanvas.getContext) {
                    if (canvas == null) {
                        canvas = mHTMLCanvas.getContext("2d");
                    }
                    this.onDraw(canvas);
                }
            }
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
        return mWillNotDraw;
    };

	/**
	* If this view doesn't do any drawing on its own, set this flag to allow further optimizations. By default, this flag is not set on View, but could be set on some View subclasses such as ViewGroup. Typically, if you override onDraw(Canvas) you should clear this flag.
	*
	* @method setWillNotDraw
	* @params {boolean} willnotdraw Whether or not this View draw on its own.
	*/
    this.setWillNotDraw = function(willnotdraw) {
        mWillNotDraw = willnotdraw;
        if (mWillNotDraw === false) {
            mHTMLCanvas = document.createElement("canvas");
            mHTMLCanvas.style.position = "absolute";
            mHTMLCanvas.style.left = 0;
            mHTMLCanvas.style.top = 0;
            mDiv.appendChild(mHTMLCanvas);
            mDiv.style.overflow = "hidden";
            if (this.getMeasuredWidth() != 0 || this.getMeasuredHeight() != 0) {
                this.requestLayout();
            }
        } else {
            if (mHTMLCanvas !== null) {
                mDiv.removeChild(mHTMLCanvas);
            }
        }
    };

    this.getBackground = function() {
        return mBackground;
    };

	/**
	* Sets the background color for this view.
	*
	* @method setBackgroundColor
	* @params {int} color The color of the background.
	*/
    this.setBackgroundColor = function(color) {
        mBackground = color;
        mDiv.style.background = Utils.toCssColor(color);
    };

	/**
	* Register a callback to be invoked when this view is clicked. If this view is not clickable, it becomes clickable.
	*
	* @method setOnClickListener
	* @params {View.OnClickListener} l The callback that will run.
	*/
    this.setOnClickListener = function(l) {
        if (!mClickable) {
            this.setClickable(true);
        }
        mClickListener = l;
    };

	/**
	* Register a callback to be invoked when this view is clicked and held. If this view is not long clickable, it becomes long clickable.
	*
	* @method setOnLongClickListener
	* @params {View.OnLongClickListener} l The callback that will run.
	*
	*/
    this.setOnLongClickListener = function(l) {
        if (!mLongClickable) {
            this.setLongClickable(true);
        }
        mLongClickListener = l;
    };

	/**
	* Enables or disables click events for this view. When a view is clickable it will change its state to "pressed" on every click. Subclasses should set the view clickable to visually react to user's clicks.
	*
	* @method setClickable
	* @params {boolean} clickable True to make the view clickable, false otherwise.
	*/
    this.setClickable = function(clickable) {
        mClickable = clickable;
        if (mClickable) {
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
        mLongClickable = longClickable;
    };

	/**
	* Call this when something has changed which has invalidated the layout of this view. This will schedule a layout pass of the view tree. This should not be called while the view hierarchy is currently in a layout pass. If layout is happening, the request may be honored at the end of the current layout pass (and then layout will run again) or after the current frame is drawn and the next layout occurs.

	Subclasses which override this method should call the superclass method to handle possible request-during-layout errors correctly.
	*
	* @method requestLayout
	*/
    this.requestLayout = function() {
        if (this.getParent() === null) {
            return;
        }
        if (mWidth !== 0 && mHeight !== 0) {
            this.measure(mWidthMS, mHeightMS);
            this.layout(mLeft, mTop);
        } else {
            forceReLayout();
        }
    };

	/**
	* Call this to try to give focus to a specific view or to one of its descendants. A view will not actually take focus if it is not focusable, or if it is focusable and it is not focusable in touch mode while the device is in touch mode.
	*
	* @method requestFocus
	*/
    this.requestFocus = function() {

    };

    this.checkClick = function(ev) {
        switch (ev.getAction()) {
            case MotionEvent.ACTION_DOWN:
                mHasPerformedLongPress = false;
                mDownX = ev.getRawX();
                mDownY = ev.getRawY();
                this.checkForLongClick();
                break;
            case MotionEvent.ACTION_MOVE:
                var x = ev.getX();
                var y = ev.getY();
                if (x < mLeft || x > mRight || y < mTop || y > mBottom) {
                    this.removeCallbacks(this.checkLongPress);
                }
                break;
            case MotionEvent.ACTION_UP:
                if (!mHasPerformedLongPress) {
                    this.removeCallbacks(this.checkLongPress);

                    var deltaX = Math.abs(mDownX - ev.getRawX());
                    var deltaY = Math.abs(mDownY - ev.getRawY());
                    if (deltaX < 30 && deltaY < 30) {
                        this.performClick();
                    }
                }
                break;
            case MotionEvent.ACTION_CANCEL:
                this.removeCallbacks(this.checkLongPress);
                break;
        }
    };

    this.setPreventHtmlTouchEvent = function(prevent) {
        mPreventHtmlTouchEvent = prevent;
    };

    this._onTouchEvent = function(ev) {
        if (mPreventHtmlTouchEvent) {
            ev.rawEv.preventDefault();
        }
        if (mClickable || mLongClickable) {
            this.checkClick(ev);
        }
        if (mPreventHtmlTouchEvent == false) {
            return true;
        }
        var result = this.onTouchEvent(ev);
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
	* @params {MotionEvent} ev The motion event.
	*/
    this.onTouchEvent = function(ev) {
        if (mClickable || mLongClickable) {
            return true;
        }
        return false;
    };

    /**
     * Pass the touch screen motion event down to the target view, or this
     * view if it is the target.
     *
     * @param event The motion event to be dispatched.
     * @return True if the event was handled by the view, false otherwise.
     */
    this.dispatchTouchEvent = function(ev) {
        return this._onTouchEvent(ev);
    };

	/**
	* Sets the opacity of the view. This is a value from 0 to 1, where 0 means the view is completely transparent and 1 means the view is completely opaque.

	Note that setting alpha to a translucent value (0 < alpha < 1) can have significant performance implications, especially for large views. It is best to use the alpha property sparingly and transiently, as in the case of fading animations.
	*
	* @method setAlpha
	* @params {float} a The opacity of the view.
	*/
    this.setAlpha = function(a) {
        mDiv.style.opacity = a;
    };

	/**
	* Returns the visibility status for this view.
	*
	* @method getVisibility
	* @return {int} Return one of VISIBLE, INVISIBLE, or GONE.
	*/
    this.getVisibility = function() {
        return mVisibility;
    };

	/**
	* Set the enabled state of this view.
	*
	* @method setVisibility
	* @params {int} visibility
	*/
    this.setVisibility = function(visibility) {
        mVisibility = visibility;
        if (mVisibility == View.VISIBLE) {
            this.getDiv().style.display = "block";
        } else {
            this.getDiv().style.display = "none";
        }
    };

	/**
	* Sets the next animation to play for this view. If you want the animation to play immediately, use startAnimation(Animation) instead. This method provides allows fine-grained control over the start time and invalidation, but you must make sure that 1) the animation has a start time set, and 2) the view's parent (which controls animations on its children) will be invalidated when the animation is supposed to start.
	*
	* @method setAnimation
	* @params {Animation} animation The next animation, or null.
	*/
    this.setAnimation = function(animation) {
        animation.setView(this);
    };

	/**
	* Start the specified animation now.
	*
	* @method startAnimation
	* @params {Animation} animation The animation to start now.
	*/
    this.startAnimation = function(animation) {
        animation.setView(this);
        animation.start();
    };

    this.clearAnimation = function() {
        this.getDiv().style.webkitTransition = "";
        this.getDiv().style.transition = "";
        this.getDiv().style.opacity = 0;
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
        mRunQueue.put(r, id);
    };

	/**
	* Removes the specified Runnable from the message queue.
	*
	* @method removeCallbacks
	* @params {Runnable} r The Runnable to remove from the message handling queue.
	*/
    this.removeCallbacks = function(r) {
        var id = mRunQueue.get(r);
        mRunQueue.remove(r);
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
        if (mClickListener !== null) {
            mClickListener.call(this);
        }
    };

	/**
	* Call this view's OnLongClickListener, if it is defined. Invokes the context menu if the OnLongClickListener did not consume the event.
	*
	* @method performLongClick
	*/
    this.perfermLongClick = function() {
        if (mLongClickListener !== null) {
            mLongClickListener();
        }
        return true;
    };

	//TODO
    this.checkForLongClick = function() {
        if (mLongClickable) {
            mHasPerformedLongPress = false;

            this.postDelayed(this.checkLongPress, 500);
        }
    };

	//TODO
    this.checkLongPress = function() {
        if (this.perfermLongClick()) {
            mHasPerformedLongPress = true;
        }
    };

	//TODO
    this.setCornerSize = function(tlSize, trSize, brSize, blSize) {
        if (trSize == undefined && brSize == undefined && blSize == undefined) {
            trSize = tlSize;
            brSize = tlSize;
            blSize = tlSize;
        }
        this.getDiv().style.borderRadius = tlSize + "px " + trSize + "px " + brSize + "px " + blSize + "px";
    };

	//TODO
    this.setStyle = function(attr, cssString) {
        this.getDiv().style[attr] = cssString;
    };

	//TODO
    this.setBorder = function(thick, color) {
        this.getDiv().style.border = thick + "px solid " + Utils.toCssColor(color);
    };

	//TODO
    this.setBorderLeft = function(thick, color) {
        this.getDiv().style.borderLeft = thick + "px solid " + Utils.toCssColor(color);
    };

	//TODO
    this.setBorderTop = function(thick, color) {
        this.getDiv().style.borderTop = thick + "px solid " + Utils.toCssColor(color);
    };

	//TODO
    this.setBorderRight = function(thick, color) {
        this.getDiv().style.borderRight = thick + "px solid " + Utils.toCssColor(color);
    };

	//TODO
    this.setBorderBottom = function(thick, color) {
        this.getDiv().style.borderBottom = thick + "px solid " + Utils.toCssColor(color);
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

        this.getDiv().style.webkitBoxShadow =  styleString;
    };

    this.setFontFamily = function(fontFamily) {
        this.getDiv().style.fontFamily = fontFamily;
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

    this.findViewTraversal = function(id) {
        if (id == mID) {
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
    var mChildren = [];
    var mTag = "ViewGroup";

    var mMotionTarget = null;
    var mTempRect = new Rect();
    var mDisallowIntercept = false;

    /**
     * Returns the number of children in the group.
     *
     * @method getChildCount
     * @return {int} a positive integer representing the number of children in
     *         the group
     */
    this.getChildCount = function() {
        return mChildren.length;
    };

    /**
     * Returns the view at the specified position in the group.
     *
     * @method getChildAt
     * @param {int} index the position at which to get the view from
     * @return {int} the view at the specified position or null if the position
     *         does not exist within the group
     */
    this.getChildAt = function(index) {
        return mChildren[index];
    };

    this.indexOfChild = function(child) {
        return mChildren.indexOf(child);
    };

    this.onMeasure = function(widthMS, heightMS) {
        var width = MeasureSpec.getSize(widthMS);
        var height = MeasureSpec.getSize(heightMS);
        this.setMeasuredDimension(width, height);
    };

    /**
     * Adds a child view with the specified layout parameters.
     *
     * @method addView
     * @param {View} child the child view to add
     * @param {int} index the position at which to add the child,
     *          or {LayoutParams} params the layout parameters to set on the child
     * @param {LayoutParams} params the layout parameters to set on the child
     */
    this.addView = function(view, indexOrParams, params) {
        if (view.getParent() != null) {
            console.log("IllegalStateException: " + view.getTag() + " 只能拥有一个父节点");
            return;
        }
        view.setParent(this);
        if (indexOrParams == undefined) {
            mChildren.add(view);
        } else {
            if ((typeof indexOrParams) == "number") {
                mChildren.add(indexOrParams, view);
                if (params != undefined) {
                    view.setLayoutParams(params);
                }
            } else {
                mChildren.add(view);
                view.setLayoutParams(indexOrParams);
            }
        }
        this.getDiv().appendChild(view.getDiv());

        if (this.getMeasuredWidth() != 0 && this.getMeasuredHeight() != 0) {
            this.requestLayout();
        }
    };

    /**
     * Removes a view from the group.
     *
     * @method removeView
     * @param {View} view the view to remove from the group.
     */
    this.removeView = function(view) {
        if (view !== null && mChildren.contains(view)) {
            view.setParent(null);
            mChildren.remove(view);
            this.getDiv().removeChild(view.getDiv());

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
        for (var i = 0; i < mChildren.length; i++) {
            mChildren[i].setParent(null);
        }
        mChildren.clear();
        this.getDiv().innerHTML = "";
        if (this.getParent()) {
            this.getParent().requestLayout();
        }
    };

    this.findViewTraversal = function(id) {
        if (id == this.getId()) {
            return this;
        }

        for (var i = 0; i < mChildren.length; i++) {
            var v = mChildren[i];
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
     * @param ev The motion event being dispatched down the hierarchy.
     * @return Return true to steal motion events from the children and have
     * them dispatched to this ViewGroup through onTouchEvent().
     * The current target will receive an ACTION_CANCEL event, and no further
     * messages will be delivered here.
     *
     */
    this.onInterceptTouchEvent = function(ev) {
        return false;
    };

    /**
     * Pass the touch screen motion event down to the target view, or this
     * view if it is the target.
     *
     * @param event The motion event to be dispatched.
     * @return True if the event was handled by the view, false otherwise.
     */
    this.dispatchTouchEvent = function(ev) {
        var xf = ev.getX();
        var yf = ev.getY();
        var scrolledX = xf + this.getScrollX();
        var scrolledY = yf + this.getScrollY();
        var frame = mTempRect;

        var action = ev.getAction();
        if (action == MotionEvent.ACTION_DOWN) {
            if (mMotionTarget != null) {
                mMotionTarget = null;
            }
            if (mDisallowIntercept || !this.onInterceptTouchEvent(ev)) {
                ev.setAction(MotionEvent.ACTION_DOWN);
                var count = mChildren.length;
                for (var i = count - 1; i >= 0; i--) {
                    var child = mChildren[i];
                    if (child.getVisibility() == View.VISIBLE) {
                        child.getHitRect(frame);
                        if (frame.contains(scrolledX, scrolledY)) {
                            var xc = scrolledX - child.getLeft();
                            var yc = scrolledY - child.getTop();
                            ev.setLocation(xc, yc);
                            if (child.dispatchTouchEvent(ev))  {
                                mMotionTarget = child;
                                return true;
                            }
                        }
                    }
                }
            }
        }

        var isUpOrCancel = (action == MotionEvent.ACTION_UP) || (action == MotionEvent.ACTION_CANCEL);
        if (isUpOrCancel) {
            mDisallowIntercept = false;
        }

        var target = mMotionTarget;
        if (target == null) {
            ev.setLocation(xf, yf);
            return this._onTouchEvent(ev);
        }

        if (!mDisallowIntercept && this.onInterceptTouchEvent(ev)) {
            var xc = scrolledX - target.getLeft();
            var yc = scrolledY - target.getTop();
            ev.setAction(MotionEvent.ACTION_CANCEL);
            ev.setLocation(xc, yc);
            if (!target.dispatchTouchEvent(ev)) {
            }
            mMotionTarget = null;
            return true;
        }

        if (isUpOrCancel) {
            mMotionTarget = null;
        }

        var xc = scrolledX - target.getLeft();
        var yc = scrolledY - target.getTop();
        ev.setLocation(xc, yc);

        return target.dispatchTouchEvent(ev);
    };

    this.requestDisallowInterceptTouchEvent = function(disallowIntercept) {
        if (disallowIntercept == mDisallowIntercept) {
            return;
        }
        mDisallowIntercept = disallowIntercept;
        if (this.getParent() != null) {
            this.getParent().requestDisallowInterceptTouchEvent(disallowIntercept);
        }
    }
}

// 以下为Canvas方法
CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
    if (w < 2 * r) {
		r = w / 2;
	}
    if (h < 2 * r) {
		r = h / 2;
	}
    this.beginPath();
    this.moveTo(x + r, y);
    this.arcTo(x + w, y, x + w, y + h, r);
    this.arcTo(x + w, y + h, x, y + h, r);
    this.arcTo(x, y + h, x, y, r);
    this.arcTo(x, y, x + w, y, r);
    this.closePath();
    return this;
};

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

    mDecorView = new FrameLayout();
    mDecorView.setTag("decorview");

    mRootView = view;
    mRootView.setTag("rootview");
    mDecorView.addView(mRootView);

    mRootNode.appendChild(mDecorView.getDiv());
    mRootNode.style.overflow = "hidden";

    document.body.style.pointerEvents = "auto";
    var events = ["touchstart", "touchmove", "touchend", "touchcancel", "mousedown", "mousemove", "mouseup"];
    for (var i = 0; i < events.length; i++) {
        document.body.addEventListener(events[i], touch, false);
    }

    forceReLayout();

    var css = document.createElement("style");
    css.innerHTML = "*{-webkit-user-select:none;} ::-webkit-scrollbar {width: 0px; height: 0px} input{outline:none}";
    document.head.appendChild(css);
}

var _mInTouch = false;

function touch(e) {
    e.stopPropagation();

    if (e.type == "mousemove" && _mInTouch == false) {
        return;
    }
    if (e.type == "mouseout" && _mInTouch == false) {
        return;
    }
    var ev = new MotionEvent(e);
    ev.realDiv = this;

    switch (ev.getAction()) {
        case MotionEvent.ACTION_DOWN:
            _mInTouch = true;
            break;
        case MotionEvent.ACTION_UP:
            _mInTouch = false;
            break;
        case MotionEvent.ACTION_CANCEL:
            _mInTouch = false;
            break;
    }
    mDecorView.dispatchTouchEvent(ev);
}

/* statistics code start, you can replace to your own code. www.clicki.cn is good to use.*/
var c = document.createElement('script');
c.type = 'text/javascript';
c.async = true;
c.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'www.clicki.cn/boot/52027';
var h = document.getElementsByTagName('script')[0];
h.parentNode.insertBefore(c, h);
/* statistics code end */

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

var supportsOrientationChange = "onorientationchange" in window,
    orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";

function addOrientationListener(listener) {
    window.addEventListener("resize", listener);
}

function throwException(msg) {
    log(msg);
}