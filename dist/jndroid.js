function Animation() {
    var mView;
    var mDuration = 0;
    var mStartTime = 0;
    var mInterval = null;
    var mStartOffset = 0;
    var mFillMode = "backwards";
    var mInterpolator = Interpolator.LINEAR;
    var mEndListener;
    var mStartState;
    var mEndState;

    this.getStartState = function() {

    };

    this.getEndState = function() {

    };

    this.getTransition = function() {

    };

    this.setAnimationEndListener = function(listener) {
        mEndListener = listener;
    };

    this.getEndListener = function() {
        return mEndListener;
    };

    this.getFillMode = function() {
        return mFillMode;
    };

    this.setFillAfter = function(fillAfter) {
        if (fillAfter) {
            mFillMode = "forwards";
        }
    };

    this.getDuration = function() {
        return mDuration;
    };

    this.setDuration = function(duration) {
        mDuration = duration;
    };

    this.getView = function() {
        return mView;
    };

    this.setView = function(view) {
        mView = view;
    };

    this.getStartTime = function() {
        return mStartTime;
    };

    this.start = function() {

    };

    this.clearInterval = function() {
        clearInterval(mInterval);
    };

    this.onTransform = function(animation) {

    };

    this.setStartOffset = function(startOffset){
        mStartOffset = startOffset;
    };

    this.getStartOffset = function(){
        return mStartOffset;
    };

    this.setInterpolator = function(interpolator){
        mInterpolator = interpolator;
    };

    this.getInterpolator = function(){
        return mInterpolator;
    };
}

function TranslateAnimation(fromX, toX, fromY, toY) {
    Animation.apply(this, []);

    var mSelf = this;

    this.getTag = function() {
        return "TranslateAnimation";
    };

    this.getStartState = function() {
        return "translate3d(" +fromX + "px, " + fromY + "px, 0)";
    };

    this.getEndState = function() {
        return "translate3d(" +toX + "px, " + toY + "px, 0)";
    };

    this.getTransition = function() {
        return "-webkit-transform " + mSelf.getDuration() + "ms " + mSelf.getInterpolator();
    };

    this.start = function() {
        if (this.getStartOffset() === 0) {
            this.startInner();
        } else {
            setTimeout(function(){
                mSelf.startInner();
            }, this.getStartOffset());
        }

        setTimeout(this.getEndListener(), this.getDuration() + this.getStartOffset() + 1);
    };

    this.startInner = function() {
        mSelf.getView().getDiv().style.webkitTransform = mSelf.getStartState();
        setTimeout(function() {
            mSelf.getView().getDiv().style.webkitTransition = mSelf.getTransition();
            mSelf.getView().getDiv().style.webkitTransform = mSelf.getEndState();
        }, 1);
    };
}

function AlphaAnimation(fromAlpha,toAlpha) {
    Animation.apply(this, []);

    var mSelf = this;

    this.getTag = function() {
        return "AlphaAnimation";
    };

    this.getStartState = function() {
        return fromAlpha;
    };

    this.getEndState = function() {
        return toAlpha;
    };

    this.getTransition = function() {
        return "opacity " + mSelf.getDuration() + "ms " + mSelf.getInterpolator();
    };

    this.start = function() {
        setTimeout(function(){
            mSelf.getView().getDiv().style.opacity = mSelf.getStartState();
            setTimeout(function(){
                mSelf.getView().getDiv().style.webkitTransition = mSelf.getTransition();
                mSelf.getView().getDiv().style.opacity = mSelf.getEndState();
            }, 1);
        }, this.getStartOffset());

        setTimeout(this.getEndListener(), this.getDuration() + this.getStartOffset() + 1);
    };
}

function RotateAnimation(fromDegrees, toDegrees) {
    Animation.apply(this, []);

    var mSelf = this;

    this.getTag = function() {
        return "RotateAnimation";
    };

    this.getStartState = function() {
        return "rotate(" + fromDegrees + "deg)";
    };

    this.getEndState = function() {
        return "rotate(" + toDegrees + "deg)";
    };

    this.getTransition = function() {
        return "-webkit-transform " + mSelf.getDuration() + "ms " + mSelf.getInterpolator();
    };

    this.start = function() {
        setTimeout(function(){
            mSelf.getView().getDiv().style.webkitTransform = mSelf.getStartState();
            setTimeout(function(){
                mSelf.getView().getDiv().style.webkitTransition = mSelf.getTransition();
                mSelf.getView().getDiv().style.webkitTransform = mSelf.getEndState();
            }, 1);
        }, this.getStartOffset());

        setTimeout(this.getEndListener(), this.getDuration() + this.getStartOffset() + 1);
    };
}

function ScaleAnimation(fromScale, toScale) {
    Animation.apply(this, []);

    var mSelf = this;

    this.getTag = function() {
        return "ScaleAnimation";
    };

    this.getStartState = function() {
        return "scale(" + fromScale + ")";
    };

    this.getEndState = function() {
        return "scale(" + toScale + ")";
    };

    this.getTransition = function() {
        return "all " + mSelf.getDuration() + "ms " + mSelf.getInterpolator();
    };

    this.start = function() {
        mSelf.getView().getDiv().style.webkitTransition = "";
        setTimeout(function(){
            mSelf.getView().getDiv().style.webkitTransform = mSelf.getStartState();
            setTimeout(function(){
                mSelf.getView().getDiv().style.webkitTransition = mSelf.getTransition();
                mSelf.getView().getDiv().style.webkitTransform = mSelf.getEndState();
            }, 30);
        }, this.getStartOffset());

        setTimeout(this.getEndListener(), this.getDuration() + this.getStartOffset() + 1);
    };
}

//function AnimationSet() {
//    Animation.apply(this, new Array());
//
//    var mAnimationList = new Array();
//    var mTotalTime = 0;
//
//    var mSelf = this;
//
//    this.getTag = function() {
//        return "AnimationSet";
//    }
//
//    this.addAnimation = function(animation) {
//        mAnimationList.push(animation);
//        if (animation.getDuration() > this.getDuration()) {
//            this.setDuration(animation.getDuration());
//        }
//        if (animation.getDuration() + animation.getStartOffset() > mTotalTime) {
//            mTotalTime = animation.getDuration() + animation.getStartOffset();
//        }
//    }
//
//    this.start = function() {
//        setTimeout(function(){
//            mSelf.getView().getDiv().style.webkitTransform = "";
//            for (var i = 0; i < mAnimationList.length; i++) {
//                var a = mAnimationList[i];
//                var tag = a.getTag();
//                if (tag == "AlphaAnimation") {
//                    mSelf.getView().getDiv().style.opacity = a.getStartState();
//                } else {
//                    mSelf.getView().getDiv().style.webkitTransform += a.getStartState() + " ";
//                }
//            }
//            log(mSelf.getView().getDiv().style.webkitTransform);
//
//            setTimeout(function(){
//                var transition = "";
//
//                for (var i = 0; i < mAnimationList.length; i++) {
//                    var a = mAnimationList[i];
//                    transition += a.getTransition();
//                    if (i < mAnimationList.length - 1) {
//                        transition += ",";
//                    }
//                }
//                log(transition);
//
//                mSelf.getView().getDiv().style.webkitTransition = transition;
//                log(mSelf.getView().getDiv().style.webkitTransition);
//
//                mSelf.getView().getDiv().style.webkitTransform = "";
//                for (var i = 0; i < mAnimationList.length; i++) {
//                    var a = mAnimationList[i];
//                    var tag = a.getTag();
//                    if (tag == "AlphaAnimation") {
//                        mSelf.getView().getDiv().style.opacity = a.getEndState();
//                    } else {
//                        mSelf.getView().getDiv().style.webkitTransform += a.getEndState();
//                    }
//                }
//                log(mSelf.getView().getDiv().style.webkitTransform);
//            }, 1);
//        }, this.getStartOffset());
//
//        for (var i = 0; i < mAnimationList.length; i++) {
//            var a = mAnimationList[i];
//            var tag = a.getTag();
//            if (tag == "AlphaAnimation") {
//                a.setView(mSelf.getView());
//                a.start();
//            }
//        }
//
//        setTimeout(this.getEndListener(), this.getDuration() + this.getStartOffset() + 1);
//    }
//}

function Interpolator (){}
Object.defineProperty(Interpolator,"LINEAR",{value:"linear"});
Object.defineProperty(Interpolator,"EASE",{value:"ease"});
Object.defineProperty(Interpolator,"EASE_IN",{value:"ease-in"});
Object.defineProperty(Interpolator,"EASE_OUT",{value:"ease-out"});
Object.defineProperty(Interpolator,"EASE_IN_OUT",{value:"ease-in-out"});

function Gravity() {}
Object.defineProperty(Gravity,"TOP",{value:1});
Object.defineProperty(Gravity,"CENTER_VERTICAL",{value:2});
Object.defineProperty(Gravity,"BOTTOM",{value:4});
Object.defineProperty(Gravity,"LEFT",{value:8});
Object.defineProperty(Gravity,"CENTER_HORIZONTAL",{value:16});
Object.defineProperty(Gravity,"RIGHT",{value:32});
Object.defineProperty(Gravity,"CENTER",{value:18});
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

function Rect(l, t, r, b) {
    this.left = l;
    this.top = t;
    this.right = r;
    this.bottom = b;

    this.set = function(l, t, r, b) {
        this.left = l;
        this.top = t;
        this.right = r;
        this.bottom = b;
    };

    this.width = function() {
        return (this.right - this.left);
    };

    this.height = function() {
        return (this.bottom - this.top);
    };

    this.centerX = function() {
        return (this.left + this.right) / 2;
    };

    this.centerY = function() {
        return (this.top + this.bottom) / 2;
    };
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

    /**
     * Returns the X coordinate of this event.
     *
     * @method getX
     * @return {float} X coordinate.
     */
    this.getX = function() {
        var div = this.realView.getDiv();
        var offset = Utils.getOffset(div);
        return this.getTouches().pageX - offset.left;
    };

    /**
     * Returns the Y coordinate of this event.
     *
     * @method getY
     * @return {float} Y coordinate.
     */
    this.getY = function() {
        var div = this.realView.getDiv();
        var offset = Utils.getOffset(div);
        return this.getTouches().pageY - offset.top;
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
        return this.getTouches().pageX;
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
        return this.getTouches().pageY;
    };

    this.getTouches = function() {
        if ("ontouchstart" in document.documentElement) {
            if (rawEv.type == "touchstart" || rawEv.type == "touchmove") {
                return rawEv.touches[0];
            } else {
                return rawEv.changedTouches[0];
            }
        } else {
            return rawEv;
        }
    };

    /**
     * Return the kind of action being performed.
     *
     * @method getAction
     * @return {int} the action.
     */
    this.getAction = function() {
        if (rawEv.type == "touchstart" || rawEv.type == "mousedown") {
            return MotionEvent.ACTION_DOWN;
        } else if (rawEv.type == "touchmove" || rawEv.type == "mousemove") {
            return MotionEvent.ACTION_MOVE;
        } else if (rawEv.type == "touchend" || rawEv.type == "mouseup") {
            return MotionEvent.ACTION_UP;
        } else if (rawEv.type == "touchcancel") {
            return MotionEvent.ACTION_CANCEL;
        } else if (rawEv.type == "mouseout") {
            var div = rawEv.target;
            var offset = Utils.getOffset(div);
            if (this.getRawX() < offset.left || this.getRawX() > (offset.left + offset.width) || this.getRawY() < offset.top || this.getRawY() > (offset.top + offset.height)) {
                return MotionEvent.ACTION_CANCEL;
            }
        }
    };
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
    var mX = 0;
    var mY = 0;
    var mWidth = 0;
    var mHeight = 0;
    var mWidthMS = 0;
    var mHeightMS = 0;
    var mBackground = 0;
    var mPaddingLeft = 0;
    var mPaddingTop = 0;
    var mPaddingRight = 0;
    var mPaddingBottom = 0;
    var mLayoutParams = null;
    var mWillNotDraw = true;
    var mVisibility = View.VISIBLE;
    var mClickable = false;
    var mLongClickable = true;
    var mClickListener = null;
    var mLongClickListener = null;
    var mTag = "View";
    var mHTMLCanvas = null;
    var canvas = null;
    var mInTouch = false;
    var mTouchCanceled = false;

    var mDownX, mDownY;
    var mHasPerformedLongPress = false;


    var mRunQueue = new Map();

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
	* @return {ViewGroup.LayoutParams} Returns the LayoutParams associated with this view, or null if no parameters have been set yet.
	*/
    this.getLayoutParams = function() {
        return mLayoutParams;
    };

	/**
	* Set the layout parameters associated with this view. These supply parameters to the parent of this view specifying how it should be arranged. There are many subclasses of ViewGroup.LayoutParams, and these correspond to the different subclasses of ViewGroup that are responsible for arranging their children.
	*
	* @method setLayoutParams
	* @params {ViewGroup.LayoutParams}  lp The layout parameters for this view, cannot be null.
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
        return mX;
    };

	/**
	* Top position of this view relative to its parent.
	*
	* @method getTop
	* @return {int} Returns the top of this view, in pixels.
	*/
    this.getTop = function() {
        return mY;
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

	/**
	* The visual x position of this view, in pixels.
	*
	* @method getX
	* @return {int} Returns the visual x position of this view, in pixels.
	*/
    this.getX = function() {
        return mX;
    };

	/**
	* The visual y position of this view, in pixels.
	*
	* @method getY
	* @return {int} Returns the visual y position of this view, in pixels.
	*/
    this.getY = function() {
        return mY;
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

        }
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
        mX = x;
        mY = y;
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
                        canvas.width = this.getMeasuredWidth();
                        canvas.height = this.getMeasuredHeight();
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
        if (clickable) {
            this.setStyle("cursor", "pointer");
            addTouchListener(this);
            if ("ontouchstart" in document.documentElement) {
                this.getDiv().addEventListener("touchstart", this.touch, false);
                this.getDiv().addEventListener("touchmove", this.touch, false);
                this.getDiv().addEventListener("touchend", this.touch, false);
                this.getDiv().addEventListener("touchcancel", this.touch, false);
            } else {
                this.getDiv().addEventListener("mousedown", this.touch, false);
                this.getDiv().addEventListener("mousemove", this.touch, false);
                this.getDiv().addEventListener("mouseup", this.touch, false);
                this.getDiv().addEventListener("mouseout", this.touch, false);
            }

            this.getDiv().style.pointerEvents = "auto";
        } else {
            this.setStyle("cursor", "auto");
            removeTouchListener(this);
            if ("ontouchstart" in document.documentElement) {
                this.getDiv().removeEventListener("touchstart", this.touch, false);
                this.getDiv().removeEventListener("touchmove", this.touch, false);
                this.getDiv().removeEventListener("touchend", this.touch, false);
                this.getDiv().removeEventListener("touchcancel", this.touch, false);
            } else {
                this.getDiv().removeEventListener("mousedown", this.touch, false);
                this.getDiv().removeEventListener("mouseup", this.touch, false);
                this.getDiv().removeEventListener("mousemove", this.touch, false);
                this.getDiv().removeEventListener("mouseout", this.touch, false);
            }

            this.getDiv().style.pointerEvents = "none";
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
            this.layout(mX, mY);
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
    this.touch = function(e) {
        e.stopPropagation();

        if (e.type == "mousemove" && !mInTouch) {
            return;
        }

        var view = findTouchObject(this);
        if (mClickable) {
            var ev = new MotionEvent(e);
            ev.realView = view;

            if (ev.getAction() == MotionEvent.ACTION_CANCEL && mTouchCanceled == true) {
                return;
            }
            if (ev.getAction() == MotionEvent.ACTION_CANCEL && !mInTouch) {
                return;
            }
            if (ev.getAction() == MotionEvent.ACTION_UP && !mInTouch) {
                return;
            }

            view.onTouchEvent(ev);


            switch (ev.getAction()) {
                case MotionEvent.ACTION_DOWN:
                    mInTouch = true;
                    mTouchCanceled = false;
                    mHasPerformedLongPress = false;
                    mDownX = ev.getRawX();
                    mDownY = ev.getRawY();
                    view.checkForLongClick();
                    break;
                case MotionEvent.ACTION_MOVE:
                    mInTouch = true;
                    mTouchCanceled = false;
                    var offset = Utils.getOffset(view.getDiv());
                    var x = ev.getRawX();
                    var y = ev.getRawY();
                    if (x < offset.left || x > (offset.left + offset.width) || y < offset.top || y > (offset.top + offset.height)) {
                        view.removeCallbacks(view.checkLongPress);
                    }
                    break;
                case MotionEvent.ACTION_UP:
                    mInTouch = false;
                    if (!mHasPerformedLongPress) {
                        view.removeCallbacks(view.checkLongPress);

                        var deltaX = Math.abs(mDownX - ev.getRawX());
                        var deltaY = Math.abs(mDownY - ev.getRawY());
                        if (deltaX < 30 && deltaY < 30) {
                            view.performClick();
                        }
                    }
                    break;
                case MotionEvent.ACTION_CANCEL:
                    mInTouch = false;
                    mTouchCanceled = true;
                    view.removeCallbacks(view.checkLongPress);
                    break;
            }
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

        if(typeof(blur) != "undefined")
        {
            styleString = styleString + " " + blur + "px";
        }

        if(typeof(spread) != "undefined")
        {
            styleString = styleString + " " + spread + "px";
        }

        if(typeof(color) != "undefined")
        {
            styleString = styleString + " " + Utils.toCssColor(color);
        }

        this.getDiv().style.webkitBoxShadow =  styleString;
    };
}
Object.defineProperty(View,"VISIBLE",{value:0});
Object.defineProperty(View,"INVISIBLE",{value:4});
Object.defineProperty(View,"GONE",{value:8});
Object.defineProperty(View,"VIEW_STATE_ENABLED",{value:(1 << 3)});
Object.defineProperty(View,"VIEW_STATE_PRESSED",{value:(1 << 4)});

function ViewGroup() {
    View.apply(this, []);
    var mChildren = [];
    var mTag = "ViewGroup";

    this.getChildCount = function() {
        return mChildren.length;
    };

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

    this.removeView = function(view) {
        if (view !== null && mChildren.contains(view)) {
            view.setParent(null);
            mChildren.remove(view);
            this.getDiv().removeChild(view.getDiv());

            this.requestLayout();
        }
    };

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

var mTopMargin = 0;

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
    mRootNode.style.PADDING = "0";
    mRootNode.style.margin = "0";
    mRootNode.appendChild(mHideDiv);

    mDecorView = new FrameLayout();
    mDecorView.setTag("decorview");

    mRootView = view;
    mRootView.setTag("rootview");
    mDecorView.addView(mRootView);

    mRootNode.appendChild(mDecorView.getDiv());
    mRootNode.style.overflow = "hidden";

    forceReLayout();

    var css = document.createElement("style");
    css.innerHTML = "*{-webkit-user-select:none;} ::-webkit-scrollbar {width: 0px; height: 0px} input{outline:none}";
    document.head.appendChild(css);
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
        log("gyy: mDecorView is null");
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

// 为解决touch回调的临时方案
var mTouchListerners = [];
function addTouchListener(listener) {
    mTouchListerners.push(listener);
}

function removeTouchListener(listener) {
    mTouchListerners.remove(listener);
}

function findTouchObject(aDiv) {
    for (var i = 0; i < mTouchListerners.length; i++) {
        if (mTouchListerners[i].getDiv() == aDiv) {
            return mTouchListerners[i];
        }
    }
    return null;
}

function log(str) {
    console.log(str);
}

function DialogButton() {
    ViewGroup.apply(this, []);

    var mSelf = this;

    var mText = new TextView();
    mText.setTextSize(15);
    mText.setTextColor("#333333");
    mText.setGravity(Gravity.CENTER);
    this.addView(mText);

    this.setBackgroundColor("#fafafa");

    this.setText = function(text) {
        mText.setText(text);
    };

    this.onMeasure = function(width,height) {
        mText.measure(width, height);
        this.setMeasuredDimension(width, height);
    };

    this.onLayout = function(x, y) {
        var offsetX = 0;
        var offsetY = 0;
        mText.layout(offsetX, offsetY);
    };

    this.touchStart = function(event) {
        mSelf.setBackgroundColor("#efefef");
    };

    this.getDiv().addEventListener("touchstart", this.touchStart, false);

    this.touchEnd = function(event) {
        mSelf.setBackgroundColor("#fafafa");
    };

    this.getDiv().addEventListener("touchend", this.touchEnd, false);

    this.touchCancel = function(event) {
        mSelf.setBackgroundColor("#fafafa");
    };

    this.getDiv().addEventListener("touchcancel", this.touchCancel, false);
}

function Dialog() {
    this.DIALOG_WIDTH = 296;
    this.TITLE_HEIGHT = 72;
    this.BUTTON_HEIGHT = 52;
    this.CONTENT_PADDING_X = 20;
    this.MSG_PADDING_BOTTOM = 28;
    this.CORNER_SIZE = 3;
    this.LINE_WIDTH = 1;

    var mSelf = this;
    var mHasCancelButton = false;

    ViewGroup.apply(this, []);

    var mTitle = new TextView();
    mTitle.setGravity(Gravity.CENTER);
    mTitle.setTextSize(17);
    mTitle.setTextColor("#191919");
    this.addView(mTitle);

    var mMsgView = new TextView();
    mMsgView.setTextSize(14);
    mMsgView.setLineHeight(20);
    mMsgView.setTextColor("#666666");
    this.addView(mMsgView);

    mOkButton = new DialogButton();
    mOkButton.setText("ok");
    mOkButton.setCornerSize(0, 0, this.CORNER_SIZE, 0);
    this.addView(mOkButton);

    this.setWillNotDraw(false);
    this.setBackgroundColor("#f5f5f5");
    this.setCornerSize(this.CORNER_SIZE, this.CORNER_SIZE, this.CORNER_SIZE, this.CORNER_SIZE);

    this.setTitle = function(title) {
        mTitle.setText(title);
    };

    this.setMessage = function(msg) {
        mMsgView.setText(msg);
    };

    this.getMsgView = function() {
        return mMsgView;
    };

    this.getPositiveButton = function() {
        return mOkButton;
    };

    this.setPositiveButton = function(btnText, clickListener) {
        mOkButton.setText(btnText);
        mOkButton.setOnClickListener(clickListener);
    };

    this.setNegativeButton = function(btnText, clickListener) {
        mHasCancelButton = true;

        mCancelButton = new DialogButton();
        mCancelButton.setText(btnText);
        mCancelButton.setOnClickListener(clickListener);
        mCancelButton.setText("cancel");
        mCancelButton.setCornerSize(0, 0, 0, this.CORNER_SIZE);
        this.addView(mCancelButton);
    };

    this.onMeasure = function(widthSpec, heightSpec){
        mTitle.measure(this.DIALOG_WIDTH, MeasureSpec.makeMeasureSpec(this.TITLE_HEIGHT, MeasureSpec.EXACTLY));

        var contentWidth = this.DIALOG_WIDTH - this.CONTENT_PADDING_X * 2;
        mMsgView.measure(contentWidth, 0);

        if (mHasCancelButton) {
            var buttonWidth = (this.DIALOG_WIDTH - this.LINE_WIDTH) / 2;
            mOkButton.measure(buttonWidth, this.BUTTON_HEIGHT);
            mCancelButton.measure(buttonWidth, this.BUTTON_HEIGHT);
        } else {
            mOkButton.measure(this.DIALOG_WIDTH, this.BUTTON_HEIGHT);
        }

        var height = this.TITLE_HEIGHT + mMsgView.getMeasuredHeight() + this.MSG_PADDING_BOTTOM + this.BUTTON_HEIGHT;
        this.setMeasuredDimension(this.DIALOG_WIDTH, height);
    };

    this.onLayout = function(x,y) {
        var offsetX = 0;
        var offsetY = 0;
        mTitle.layout(offsetX, offsetY);

        offsetX = this.CONTENT_PADDING_X;
        offsetY += mTitle.getMeasuredHeight();
        mMsgView.layout(offsetX, offsetY);

        if (mHasCancelButton) {
            offsetX = 0;
            offsetY += mMsgView.getMeasuredHeight() + this.MSG_PADDING_BOTTOM;
            mCancelButton.layout(offsetX, offsetY);

            offsetX += mCancelButton.getMeasuredWidth() + this.LINE_WIDTH;
            mOkButton.layout(offsetX, offsetY);
        } else {
            offsetX = 0;
            offsetY += mMsgView.getMeasuredHeight() + this.MSG_PADDING_BOTTOM;
            mOkButton.layout(offsetX, offsetY);
        }
    };

    this.onDraw = function(canvas) {
        var width = this.getMeasuredWidth();
        var height = this.getMeasuredHeight();

        var offsetY = height - this.BUTTON_HEIGHT;
        canvas.strokeStyle = "rgb(234,234,234)";
        canvas.moveTo(0, offsetY);
        canvas.lineTo(width,offsetY);
        canvas.stroke();

        if (mHasCancelButton) {
            var offsetX = mCancelButton.getMeasuredWidth();
            canvas.moveTo(offsetX, offsetY);
            canvas.lineTo(offsetX, height);
            canvas.stroke();
        }
    };

    this.show = function(){
        showDialog(this);
    };

    this.dismiss = function() {
        dismissDialog(this);
    };
}

function WaitingDialog() {
    Dialog.apply(this, []);

    this.UI_WIDTH = 160;
    this.UI_HEIGHT = 100;
    this.ICON_WIDTH = 60;

    this.setWillNotDraw(true);
    this.setBackgroundColor(0x00000000);

    this.removeView(this.getPositiveButton());
    var mIcon = new ImageView();
    this.addView(mIcon);

    var rotate = new RotateAnimation(0, 7200);
    rotate.setDuration(10000);
    mIcon.setAnimation(rotate);
    rotate.start();

    var mText = this.getMsgView();
    mText.setGravity(Gravity.LEFT | Gravity.CENTER_VERTICAL);
    mText.setTextColor(0xffffffff);

    this.setIconSrc = function(src) {
        mIcon.setImgSrc(src);
    };

    this.onMeasure = function(widthMS, heightMS) {
        mIcon.measure(this.ICON_WIDTH, this.UI_HEIGHT);
        mText.measure(this.UI_WIDTH - this.ICON_WIDTH, MeasureSpec.makeMeasureSpec(this.UI_HEIGHT, MeasureSpec.EXACTLY));
        this.setMeasuredDimension(this.UI_WIDTH, this.UI_HEIGHT);
    };

    this.onLayout = function(x, y) {
        var offsetX = 0;
        var offsetY = 0;
        mIcon.layout(offsetX, offsetY);

        offsetX += this.ICON_WIDTH;
        mText.layout(offsetX, offsetY);
    };

    this.show = function() {
        showDialogWithoutAnim(this);
    };
}

function DialogLayout() {
    ViewGroup.apply(this, []);

    this.setBackgroundColor(0x66191919);

    this.onMeasure = function(widthMS, heightMS) {
        var width = MeasureSpec.getSize(widthMS);
        var height = MeasureSpec.getSize(heightMS);
        if (this.getChildCount() !== 0) {
            var child = this.getChildAt(0);
            child.measure(widthMS, heightMS);
        }
        this.setMeasuredDimension(width, height);
    };

    this.onLayout = function(x,y) {
        if (this.getChildCount() === 0) {
            return;
        }

        var child = this.getChildAt(0);
        var offsetX = (this.getMeasuredWidth() - child.getMeasuredWidth()) / 2;
        var offsetY = (this.getMeasuredHeight() - child.getMeasuredHeight()) / 2;
        child.layout(offsetX, offsetY);

    };

    //this.onDraw = function(canvas) {
    //    canvas.fillStyle = "rgba(0,0,0,0.2)";
    //    canvas.fillRect(0,0, this.getMeasuredWidth(), this.getMeasuredHeight());
    //}
}

var mDialogLayout = new DialogLayout();

function showDialogWithoutAnim(dialog) {
    mDialogLayout.addView(dialog);
    mDialogLayout.setVisibility(View.VISIBLE);
}

function showDialog(dialog) {
    mDialogLayout.addView(dialog);
    mDialogLayout.setVisibility(View.VISIBLE);

    var offsetY = (mDialogLayout.getMeasuredHeight() - dialog.getMeasuredHeight()) / 2;
    var translate = new TranslateAnimation(0,0,(mDialogLayout.getMeasuredHeight() - offsetY - dialog.getMeasuredHeight()),0);
    translate.setFillAfter(true);
    translate.setDuration(200);
    dialog.setAnimation(translate);
    translate.start();
}

function dismissDialog() {
    mDialogLayout.removeAllViews();
    mDialogLayout.setVisibility(View.GONE);
}

/**
 * LayoutParams are used by views to tell their parents how they want to be
 * laid out.
 *
 * @class LayoutParams
 */
function LayoutParams(widthOrParams, height) {
    if ((typeof widthOrParams) == "number") {
        this.width = widthOrParams;
        this.height = height;
    } else {
        this.width = widthOrParams.width;
        this.height = widthOrParams.height;
    }
    this.leftMargin = 0;
    this.topMargin = 0;
    this.rightMargin = 0;
    this.bottomMargin = 0;
    this.gravity = -1;
    this.weight = 0;

    /**
     * Sets the margins, in pixels.
     *
     * @method setMargins
     * @param {int} l the left margin size
     * @param {int} t the top margin size
     * @param {int} r the right margin size
     * @param {int} b the bottom margin size
     */
    this.setMargins = function(l, t, r, b) {
        if (t == undefined && r == undefined && b == undefined) {
            t = l;
            r = l;
            b = l;
        }
        this.leftMargin = l;
        this.topMargin = t;
        this.rightMargin = r;
        this.bottomMargin = b;
    };
}

/**
 * Special value for the height or width requested by a View.
 * FILL_PARENT means that the view wants to be as big as its parent,
 * minus the parent's padding, if any.
 *
 * @property FILL_PARENT
 * @type int
 * @static
 * @final
 */
Object.defineProperty(LayoutParams,"FILL_PARENT",{value:-1});

/**
 * Special value for the height or width requested by a View.
 * MATCH_PARENT means that the view wants to be as big as its parent,
 * minus the parent's padding, if any.
 *
 * @property MATCH_PARENT
 * @type int
 * @static
 * @final
 */
Object.defineProperty(LayoutParams,"MATCH_PARENT",{value:-1});

/**
 * Special value for the height or width requested by a View.
 * WRAP_CONTENT means that the view wants to be just large enough to fit
 * its own internal content, taking its own padding into account.
 *
 * @property WRAP_CONTENT
 * @type int
 * @static
 * @final
 */
Object.defineProperty(LayoutParams,"WRAP_CONTENT",{value:-2});

function getDefaultLayoutParams() {
    return new LayoutParams(LayoutParams.WRAP_CONTENT, LayoutParams.WRAP_CONTENT);
}

function getLayoutParams(view) {
    var lp = view.getLayoutParams();
    if (lp == null) {
        lp = getDefaultLayoutParams();
    }
    return lp;
}

function makeSpec(childDimen, lpDimen) {
    var spec;
    if (lpDimen == LayoutParams.FILL_PARENT) {
        spec = MeasureSpec.makeMeasureSpec(childDimen, MeasureSpec.EXACTLY);
    } else if (lpDimen == LayoutParams.WRAP_CONTENT) {
        spec = MeasureSpec.makeMeasureSpec(childDimen, MeasureSpec.UNSPECIFIED);
    } else {
        spec = MeasureSpec.makeMeasureSpec(lpDimen, MeasureSpec.EXACTLY);
    }
    return spec;
}

function calcOffsetXByGravity(parent, child) {
    var lp = getLayoutParams(child);
    var pl = parent.getPaddingLeft();
    var pr = parent.getPaddingRight();
    var offsetX = pl + lp.leftMargin;
    if (lp.gravity != -1) {
        if (lp.gravity & Gravity.CENTER_HORIZONTAL) {
            var contentWidth = parent.getMeasuredWidth() - pl - pr - lp.leftMargin - lp.rightMargin;
            offsetX = pl + lp.leftMargin + (contentWidth - child.getMeasuredWidth()) / 2;
        } else if (lp.gravity & Gravity.RIGHT) {
            offsetX = parent.getMeasuredWidth() - pr - lp.rightMargin - child.getMeasuredWidth();
        }
    }
    return offsetX;
}

function calcOffsetYByGravity(parent, child) {
    var lp = getLayoutParams(child);
    var pt = parent.getPaddingTop();
    var pb = parent.getPaddingBottom();
    var offsetY = pt + lp.topMargin;
    if (lp.gravity != -1) {
        if (lp.gravity & Gravity.CENTER_VERTICAL) {
            var contentHeight = parent.getMeasuredHeight() - pt - pb - lp.topMargin - lp.bottomMargin;
            offsetY = pt + lp.topMargin + (contentHeight - child.getMeasuredHeight()) / 2;
        } else if (lp.gravity & Gravity.BOTTOM) {
            offsetY = parent.getMeasuredHeight() - pb - lp.bottomMargin - child.getMeasuredHeight();
        }
    }
    return offsetY;
}

/**
 * A Layout that arranges its children in a single column or a single row. The direction of
 * the row can be set by calling setOrientation().
 *
 * @class LinearLayout
 * @extends ViewGroup
 */
function LinearLayout() {
    ViewGroup.apply(this, []);

    var mOrientation = LinearLayout.VERTICAL;

    /**
     * Should the layout be a column or a row.
     * @method setOrientation
     * @param {int} o Pass HORIZONTAL or VERTICAL. Default
     * value is VERTICAL.
     */
    this.setOrientation = function(o) {
        mOrientation = o;
        this.requestLayout();
    };

    this.getTotalWeight = function() {
        var totalWeight = 0;
        for (var i = 0; i < this.getChildCount(); i++) {
            var child = this.getChildAt(i);
            var clp = getLayoutParams(child);
            totalWeight += clp.weight;
        }
        return totalWeight;
    };

    this.getAvailableWidth = function(totalWidth) {
        var width = totalWidth - this.getPaddingLeft() - this.getPaddingRight();
        for (var i = 0; i < this.getChildCount(); i++) {
            var child = this.getChildAt(i);
            if (child.getVisibility() == View.GONE) {
                continue;
            }
            var lp = getLayoutParams(child);
            width -= (lp.leftMargin + lp.rightMargin);
            if (lp.width > 0) {
                width -= lp.width;
            } else if (lp.width == LayoutParams.WRAP_CONTENT) {
                if (child.getMeasuredWidth() == 0 && child.getMeasuredHeight() == 0) {
                    child.measure(0, 0);
                }
                width -= child.getMeasuredWidth();
            }
        }
        return width;
    };

    this.getAvailableHeight = function(totalHeight) {
        var height = totalHeight - this.getPaddingTop() - this.getPaddingBottom();
        for (var i = 0; i < this.getChildCount(); i++) {
            var child = this.getChildAt(i);
            if (child.getVisibility() == View.GONE) {
                continue;
            }
            var lp = getLayoutParams(child);
            height -= (lp.topMargin + lp.bottomMargin);
            if (lp.height > 0) {
                height -= lp.height;
            } else if (lp.height == LayoutParams.WRAP_CONTENT) {
                if (child.getMeasuredWidth() == 0 && child.getMeasuredHeight() == 0) {
                    child.measure(0, 0);
                }
                height -= child.getMeasuredHeight();
            }
        }
        return height;
    };

    this.onMeasure = function(widthMS, heightMS) {
        if (mOrientation == LinearLayout.VERTICAL) {
            this.measureVertical(widthMS, heightMS);
        } else {
            this.measureHorizontal(widthMS, heightMS);
        }
    };

    this.measureVertical = function(widthMS, heightMS) {
        var width = MeasureSpec.getSize(widthMS);
        var height = MeasureSpec.getSize(heightMS);
        var pl = this.getPaddingLeft();
        var pt = this.getPaddingTop();
        var pr = this.getPaddingRight();
        var pb = this.getPaddingBottom();
        var contentHeight = pt + pb;
        var totalWeight = this.getTotalWeight();
        var lp = getLayoutParams(this);
        for (var i = 0; i < this.getChildCount(); i++) {
            var child = this.getChildAt(i);
            if (child.getVisibility() == View.GONE) {
                continue;
            }
            var clp = getLayoutParams(child);
            var childWidth = width - pl - pr - clp.leftMargin - clp.rightMargin;
            var childHeight = height - pt - pb - clp.topMargin - clp.bottomMargin;
            var cWidthSpec = makeSpec(childWidth, clp.width);
            var cHeightSpec = makeSpec(childHeight, clp.height);
            if (totalWeight != 0 && !(clp.weight == 0 && clp.height > 0)) {
                var cHeight = this.getAvailableHeight(height) * clp.weight / totalWeight;
                cHeightSpec = MeasureSpec.makeMeasureSpec(cHeight, MeasureSpec.EXACTLY);
            }
            child.measure(cWidthSpec, cHeightSpec);
            contentHeight += child.getMeasuredHeight() + clp.topMargin + clp.bottomMargin;
        }
        var hMode = MeasureSpec.getMode(heightMS);
        if (hMode != MeasureSpec.EXACTLY) {
            if (lp.height == LayoutParams.WRAP_CONTENT) {
                height = contentHeight;
            }
        }

        this.setMeasuredDimension(width, height);
    };

    this.measureHorizontal = function(widthMS, heightMS) {
        var width = MeasureSpec.getSize(widthMS);
        var height = MeasureSpec.getSize(heightMS);
        var hMode = MeasureSpec.getMode(heightMS);
        var pl = this.getPaddingLeft();
        var pt = this.getPaddingTop();
        var pr = this.getPaddingRight();
        var pb = this.getPaddingBottom();
        var contentWidth = pl + pr;
        var totalWeight = this.getTotalWeight();
        var lp = getLayoutParams(this);
        if (hMode != MeasureSpec.EXACTLY && lp.height == LayoutParams.WRAP_CONTENT) {
            height = pt + pb;
        }
        for (var i = 0; i < this.getChildCount(); i++) {
            var child = this.getChildAt(i);
            if (child.getVisibility() == View.GONE) {
                continue;
            }
            var clp = getLayoutParams(child);
            var childWidth = width - pl - pr - clp.leftMargin - clp.rightMargin;
            var childHeight = height - pt - pb - clp.topMargin - clp.bottomMargin;
            var cWidthSpec = makeSpec(childWidth, clp.width);
            var cHeightSpec = makeSpec(childHeight, clp.height);
            if (totalWeight != 0 && !(clp.weight == 0 && clp.width > 0)) {
                var cWidth = this.getAvailableWidth(width) * clp.weight / totalWeight;
                cWidthSpec = MeasureSpec.makeMeasureSpec(cWidth, MeasureSpec.EXACTLY);
            }
            child.measure(cWidthSpec, cHeightSpec);
            contentWidth += child.getMeasuredWidth() + clp.leftMargin + clp.rightMargin;

            if (hMode != MeasureSpec.EXACTLY && lp.height == LayoutParams.WRAP_CONTENT) {
                var ch = pt + pb + clp.topMargin + clp.bottomMargin + child.getMeasuredHeight();
                if (ch > height) {
                    height = ch;
                }
            }
        }

        var wMode = MeasureSpec.getMode(widthMS);
        if (wMode != MeasureSpec.EXACTLY) {
            if (lp.width == LayoutParams.WRAP_CONTENT) {
                width = contentWidth;
            }
        }

        this.setMeasuredDimension(width, height);
    };

    this.onLayout = function(x, y) {
        if (mOrientation == LinearLayout.VERTICAL) {
            this.layoutVertical(x, y);
        } else {
            this.layoutHorizontal(x, y);
        }
    };

    this.layoutVertical = function(x, y) {
        var offsetX = this.getPaddingLeft();
        var offsetY = this.getPaddingTop();
        for (var i = 0; i < this.getChildCount(); i++) {
            var child = this.getChildAt(i);
            if (child.getVisibility() == View.GONE) {
                continue;
            }
            var clp = getLayoutParams(child);
            offsetX = calcOffsetXByGravity(this, child);
            offsetY += clp.topMargin;
            child.layout(offsetX, offsetY);
            offsetY += child.getMeasuredHeight();
            offsetY += clp.bottomMargin;
        }
    };

    this.layoutHorizontal = function(x, y) {
        var offsetX = this.getPaddingLeft();
        var offsetY = this.getPaddingTop();
        for (var i = 0; i < this.getChildCount(); i++) {
            var child = this.getChildAt(i);
            if (child.getVisibility() == View.GONE) {
                continue;
            }
            var clp = getLayoutParams(child);
            offsetX += clp.leftMargin;
            offsetY = calcOffsetYByGravity(this, child);
            child.layout(offsetX, offsetY);
            offsetX += child.getMeasuredWidth();
            offsetX += clp.rightMargin;
        }
    };
}

/**
 * for horizontal linear layouts.
 *
 * @property HORIZONTAL
 * @type int
 * @static
 * @final
 */
Object.defineProperty(LinearLayout,"HORIZONTAL",{value:0});

/**
 * for vertical linear layouts.
 *
 * @property VERTICAL
 * @type int
 * @static
 * @final
 */
Object.defineProperty(LinearLayout,"VERTICAL",{value:1});

/**
 * FrameLayout is designed to block out an area on the screen to display
 * a single item. Generally, FrameLayout should be used to hold a single child view, because it can
 * be difficult to organize child views in a way that's scalable to different screen sizes without
 * the children overlapping each other.
 *
 * @class FrameLayout
 * @extends ViewGroup
 */
function FrameLayout() {
    ViewGroup.apply(this, []);

    this.onMeasure = function(widthMS, heightMS) {
        var width = MeasureSpec.getSize(widthMS);
        var height = MeasureSpec.getSize(heightMS);
        var childWidth = width - this.getPaddingLeft() - this.getPaddingRight();
        var childHeight = height - this.getPaddingTop() - this.getPaddingBottom();
        for (var i = 0; i < this.getChildCount(); i++) {
            var child = this.getChildAt(i);
            if (child.getVisibility() != View.VISIBLE) {
                continue;
            }
            var lp = getLayoutParams(child);
            var cw = childWidth - lp.leftMargin - lp.rightMargin;
            var ch = childHeight - lp.topMargin - lp.bottomMargin;
            var cWidthSpec = makeSpec(cw, lp.width);
            var cHeightSpec = makeSpec(ch, lp.height);
            child.measure(cWidthSpec, cHeightSpec);
        }
        this.setMeasuredDimension(width, height);
    };

    this.onLayout = function(x, y) {
        for (var i = 0; i < this.getChildCount(); i++) {
            var child = this.getChildAt(i);
            if (child.getVisibility() != View.VISIBLE) {
                continue;
            }
            var offsetX = calcOffsetXByGravity(this, child);
            var offsetY = calcOffsetYByGravity(this, child);
            child.layout(offsetX, offsetY);
        }
    };
}

/**
 * A view that shows items in a center-locked, horizontally scrolling list.
 *
 * @class Gallery
 * @extends ViewGroup
 */
function Gallery() {
    ViewGroup.apply(this, []);

    this.setTag("Gallery");

    var mCurScreen = 0;
    var mCurX;
    var mProcessor = new Processor();
    var mDownX = 0;
    var mListener;

    var content = new GalleryContent();
    this.addView(content);

    this.setGalleryListener = function(l) {
        mListener = l;
    };

    this.getPageCount = function() {
        return content.getChildCount();
    };

    this.addPage = function(view) {
        content.addView(view);
    };

    this.removeAllPages = function() {
        content.removeAllViews();
    };

    this.scrollTo = function(x) {
        mCurX = x;
        content.getDiv().style.webkitTransform="translate3d(-" + x + "px,0,0)";
        if (mListener != null && mListener.onXChanged) {
            mListener.onXChanged(x);
        }
    };

    this.getCurX = function() {
        return mCurX;
    };

    this.checkBounds = function(whichScreen) {
        return (whichScreen < 0 ? 0 : whichScreen > (content.getChildCount() - 1) ? (content.getChildCount() - 1)
            : whichScreen);
    };

    this.setToScreen = function(index) {
        index = this.checkBounds(index);
        mCurScreen = index;
        this.scrollTo(index * this.getMeasuredWidth());
        fireScreenChanged();
    };

    this.snapToScreen = function(index, duration) {
        index = this.checkBounds(index);
        if (index == mCurScreen) {
            return;
        }
        var startX = mCurScreen * this.getMeasuredWidth();
        var endX = index * this.getMeasuredWidth();
        if (duration == undefined) {
            duration = Math.abs(endX - startX);
        }
        mProcessor.startProcess(startX, endX, duration);
        this.invalidate();

        mCurScreen = index;
        setTimeout(function() {forceReLayout();fireScreenChanged();}, duration);
    };

    this.onTouchEvent = function(ev) {
        var w = this.getMeasuredWidth();
        switch (ev.getAction()) {
            case MotionEvent.ACTION_DOWN:
                mDownX = ev.getX();
                break;
            case MotionEvent.ACTION_MOVE:
                var x = mCurScreen * w - (ev.getX() - mDownX);
                x = Math.max(0, x);
                x = Math.min(x, (content.getChildCount() - 1) * w);
                this.scrollTo(x);
                break;
            case MotionEvent.ACTION_UP:
            case MotionEvent.ACTION_CANCEL:
                var isNext = (this.getCurX() % w) > (w / 2);
                mCurScreen = Math.floor(this.getCurX() / w);
                if (isNext) {
                    mCurScreen = mCurScreen + 1;
                }
                var endX = mCurScreen * w;
                var d = Math.abs(this.getCurX() - endX);
                mProcessor.startProcess(this.getCurX(), endX, d);
                this.invalidate();
                setTimeout(function() {fireScreenChanged();}, d);
                break;
        }
    };

    this.onMeasure = function(widthMS, heightMS) {
        var width = MeasureSpec.getSize(widthMS);
        var height = MeasureSpec.getSize(heightMS);

        content.measure(width, height);

        this.setMeasuredDimension(width, height);

        this.setToScreen(mCurScreen);
    };

    this.onLayout = function(x, y) {
        content.layout(0, 0);
    };

    this.computeScroll = function() {
        if (mProcessor.computeProcessOffset()) {
            var x = mProcessor.getCurrProcess();
            this.scrollTo(x);

            this.postInvalidate();
        }
    };

    function GalleryContent() {
        ViewGroup.apply(this, []);

        this.onMeasure = function(widthMS, heightMS) {
            var width = MeasureSpec.getSize(widthMS);
            var height = MeasureSpec.getSize(heightMS);

            for (var i = 0; i < this.getChildCount(); i++) {
                var c = this.getChildAt(i);
                c.measure(MeasureSpec.makeMeasureSpec(width, MeasureSpec.EXACTLY),
                    MeasureSpec.makeMeasureSpec(height, MeasureSpec.EXACTLY));
            }

            this.setMeasuredDimension(width * this.getChildCount(), height);
        };

        this.onLayout = function(x, y) {
            var offsetX = 0;
            var offsetY = 0;

            for (var i = 0; i < this.getChildCount(); i++) {
                var c = this.getChildAt(i);
                c.layout(offsetX, offsetY);
                offsetX += c.getMeasuredWidth();
            }
        };
    }

    function fireScreenChanged() {
        if (mListener != null && mListener.onGalleryScreenChanged) {
            mListener.onGalleryScreenChanged(mCurScreen);
        }
    }
}




function LProgressBar() {
    View.apply(this, []);

    var HORIZONTAL_HEIGHT = 3;
    var SMALL_SIZE = 30;
    var LARGE_SIZE = 45;

    var mSelf = this;
    var mStyle = LProgressBar.Horizontal;
    var mColor = 0xff4688f5;
    var mSecondaryColor = 0xffb3d3ea;
    var mBeginDegree = 0;
    var mEndDegree = Math.PI * 2;
    var mOffsetDegree = 0;
    var mFinish = false;
    var mProcessor = new Processor();
    mProcessor.startProcess(0, 1, 2000);
    mProcessor.setProcessListener(function() {
        if (mFinish == false) {
            mOffsetDegree += Math.PI;
            mProcessor.startProcess(0, 1, 2000);
        }
    });

    this.setWillNotDraw(false);

    this.setStyle = function(style) {
        mStyle = style;
        this.requestLayout();
    };

    this.setProgressColor = function(c) {
        mColor = c;
    };

    this.setSecondaryProgressColor = function(c) {

    };

    this.stopAnimation = function() {
        mFinish = true;
        mProcessor.forceFinished(true);
    };

    this.onMeasure = function (widthMS, heightMS) {
        var width, height;
        if (mStyle == LProgressBar.Horizontal) {
            width = MeasureSpec.getSize(widthMS);
            height = HORIZONTAL_HEIGHT;
        } else if (mStyle == LProgressBar.Small) {
            width = SMALL_SIZE;
            height = SMALL_SIZE;
        } else if (mStyle == LProgressBar.Large) {
            width = LARGE_SIZE;
            height = LARGE_SIZE;
        }
        this.setMeasuredDimension(width, height);
    };

    this.onDraw = function(canvas) {
        if (mStyle == LProgressBar.Horizontal) {
            drawLine(canvas);
        } else {
            drawCircle(canvas);
        }
    };

    function drawLine(canvas) {
        var w = mSelf.getMeasuredWidth();
        var h = mSelf.getMeasuredHeight();
        var distance = w * 1.1;
        var p = mProcessor.getCurrProcess();
        var p1 = f2(p);
        var p2 = f1(p);
        var begin = distance * p1;
        var end = distance * p2;

        canvas.lineWidth = h;
        canvas.beginPath();
        canvas.moveTo(0, h / 2);
        canvas.lineTo(w, h / 2);
        canvas.closePath();
        canvas.strokeStyle = Utils.toCssColor(mSecondaryColor);
        canvas.stroke();

        canvas.beginPath();
        canvas.moveTo(begin - 0.05 * w, h / 2);
        canvas.lineTo(end, h / 2);
        canvas.closePath();
        canvas.strokeStyle = Utils.toCssColor(mColor);
        canvas.stroke();

        computeProcessOffset();
    }

    function drawCircle(canvas) {
        var x = mSelf.getMeasuredWidth() / 2;
        var y = mSelf.getMeasuredHeight() / 2;
        var lineWidth = x / 5;
        var radius = mSelf.getMeasuredWidth() / 2;
        var distance = Math.PI * 3;
        var p = mProcessor.getCurrProcess();
        var p1 = f1(p);
        var p2 = f2(p);
        mBeginDegree = mOffsetDegree + distance * p2;
        mEndDegree = mOffsetDegree + Math.PI * 0.1 + distance * p1;
        canvas.arc(x, y, radius - lineWidth / 2, mBeginDegree, mEndDegree);
        canvas.lineWidth = lineWidth;
        canvas.strokeStyle = Utils.toCssColor(mColor);
        canvas.stroke();

        computeProcessOffset();
    }

    function f1(x) {
        if (x < 0.25) {
            return x * 0.5 + 4 * x * x;
        } else if (x < 0.5) {
            return 0.75 - (0.5 - x) * 0.5 - 4 * (0.5 - x) * (0.5 - x);
        } else {
            return 1 - (1 - x) * 0.5;
        }
    }

    function f2(x) {
        if (x < 0.5) {
            return 0.5 * x;
        } else if (x < 0.75) {
            return 0.25 + (x - 0.5) * 0.5 + 4 * (x - 0.5) * (x - 0.5);
        } else {
            return 1 - (1 - x) * 0.5 - 4 * (1 - x) * (1 - x);
        }
    }

    function computeProcessOffset() {
        if (mProcessor.computeProcessOffset()) {
            mSelf.postInvalidate();
        }
    }
}
Object.defineProperty(LProgressBar,"Horizontal",{value:0});
Object.defineProperty(LProgressBar,"Small",{value:1});
Object.defineProperty(LProgressBar,"Large",{value:2});

function LButton() {
    TextView.apply(this, []);
    var mId;

    var mBgDrawable = new WaveDrawable();
    mBgDrawable.setCallback(this);

    this.setWillNotDraw(false);
    this.setTextSize(16);
    this.setGravity(Gravity.CENTER);

    this.setCornerSize(2, 2, 2, 2);
    this.setBoxShadow(0, 0, 2, 0, 0x33000000);

    this.getId = function() {
        return mId;
    };

    this.setId = function(i) {
        mId = i;
    };

    this.setDimBg = function(dimBg) {
        mBgDrawable.setDimBg(dimBg);
    };

    this.setWaveColor = function(color) {
        mBgDrawable.setWaveColor(color);
    };

    this.onTouchEvent = function(ev) {
        switch (ev.getAction()) {
            case MotionEvent.ACTION_DOWN:
                mBgDrawable.setState(View.VIEW_STATE_PRESSED);
                mBgDrawable.setX(ev.getX());
                mBgDrawable.setY(ev.getY());
                break;
            case MotionEvent.ACTION_CANCEL:
            case MotionEvent.ACTION_UP:
                mBgDrawable.setState(View.VIEW_STATE_ENABLED);
                break;
        }
    };

    this.onDraw = function(canvas) {
        mBgDrawable.setBounds(0, 0, this.getMeasuredWidth(), this.getMeasuredHeight());
        mBgDrawable.draw(canvas);
    };
}

function LImageButton() {
    ImageButton.apply(this, []);
    var mId;

    var mBgDrawable = new WaveDrawable();
    mBgDrawable.setCallback(this);

    this.setWillNotDraw(false);

    this.setDimBg = function(dimBg) {
        mBgDrawable.setDimBg(dimBg);
    };

    this.onTouchEvent = function(ev) {
        switch (ev.getAction()) {
            case MotionEvent.ACTION_DOWN:
                mBgDrawable.setState(View.VIEW_STATE_PRESSED);
                mBgDrawable.setX(ev.getX());
                mBgDrawable.setY(ev.getY());
                break;
            case MotionEvent.ACTION_CANCEL:
            case MotionEvent.ACTION_UP:
                mBgDrawable.setState(View.VIEW_STATE_ENABLED);
                break;
        }
    };

    this.onDraw = function(canvas) {
        mBgDrawable.setBounds(0, 0, this.getMeasuredWidth(), this.getMeasuredHeight());
        mBgDrawable.draw(canvas);
    };
}

var LDialog = new _LDialog();
function _LDialog() {
    LinearLayout.apply(this, []);

    this.setTag("LDialog");
    this.setBackgroundColor(0xffffffff);
    this.setCornerSize(2);
    this.setBoxShadow(0, 4, 16, 8, 0x33000000);
    this.setPadding(24);

    var mSelf = this;
    var mOkAction = null;
    var mCancelAction = null;

    var mMask = new View();
    mMask.setBackgroundColor(0x66000000);

    var mTitle = new TextView();
    mTitle.setTextColor(0xff212121);
    mTitle.setTextSize(24);
    var titleLp = new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT);
    titleLp.bottomMargin = 20;

    var mMsg = new TextView();
    mMsg.setTextColor(0xff424242);
    mMsg.setTextSize(14);
    this.addView(mMsg);

    var mButtonarea = new LinearLayout();
    mButtonarea.setOrientation(LinearLayout.HORIZONTAL);
    var buttonareaLp = new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT);
    buttonareaLp.setMargins(0, 24, -16, -16);
    this.addView(mButtonarea, buttonareaLp);

    var paddingView = new View();
    var paddingLp = new LayoutParams(0, 36);
    paddingLp.weight = 1;
    mButtonarea.addView(paddingView, paddingLp);

    var btnLp = new LayoutParams(80, 36);

    var mCancel = new LButton();
    mCancel.setText("cancel");
    mCancel.setBoxShadow(0, 0, 0, 0, 0);
    mCancel.setDimBg(false);
    mCancel.setOnClickListener(function() {
        mSelf.hide();
        if (mCancelAction) {
            mCancelAction.call(this);
        }
    });
    mButtonarea.addView(mCancel, btnLp);

    var mOk = new LButton();
    mOk.setBoxShadow(0, 0, 0, 0, 0);
    mOk.setText("ok");
    mOk.setDimBg(false);
    mOk.setOnClickListener(function() {
        mSelf.hide();
        if (mOkAction) {
            mOkAction.call(this);
        }
    });
    mButtonarea.addView(mOk, btnLp);

    this.setOkText = function(t) {
        mOk.setText(t);
        return this;
    };

    this.setCancelText = function(t) {
        mCancel.setText(t);
        return this;
    };

    this.setTitle = function(t) {
        mTitle.setText(t);
        this.addView(mTitle, 0, titleLp);
        return this;
    };

    this.setMsg = function(msg) {
        mMsg.setText(msg);
        return this;
    };

    this.setOkAction = function(action) {
        mOkAction = action;
        return this;
    };

    this.setCancelAction = function(action) {
        mCancelAction = action;
        return this;
    };

    this.show = function() {
        var maskLp = new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.FILL_PARENT);
        mRootView.addView(mMask, maskLp);

        var lp = new LayoutParams(336, LayoutParams.WRAP_CONTENT);
        lp.gravity = Gravity.CENTER;
        mRootView.addView(this, lp);

        mMask.setAlpha(0);
        var a = new AlphaAnimation(0, 1);
        a.setDuration(200);
        mMask.startAnimation(a);

        this.setAlpha(0);
        var a2 = new AlphaAnimation(0, 1);
        a2.setDuration(200);
        this.startAnimation(a2);
    };

    this.hide = function() {
        var a = new AlphaAnimation(1, 0);
        a.setDuration(200);
        mMask.startAnimation(a);

        var a2 = new AlphaAnimation(1, 0);
        a2.setDuration(200);
        a2.setAnimationEndListener(function() {
            mRootView.removeView(mMask);
            mRootView.removeView(mSelf);
            mSelf.removeView(mTitle);
            mOkAction = null;
            mCancelAction = null;
        });
        this.startAnimation(a2);
    };
}

function LEditText() {
    ViewGroup.apply(this, []);

    this.LABEL_SIZE = 12;
    this.TEXT_SIZE = 16;
    this.PADDING = 16;
    this.ERROR_SIZE = 12;
    this.GAP = 8;
    this.TEXT_AREA_HEIGHT = 100;

    var self = this;
    var hint = "";
    var focused;
    var disabled = false;
    var textsize = this.TEXT_SIZE;
    var isError = false;
    var isSingleLine = true;
    var focusListener = null;
    var textChangeListener = null;
    var highlightColor = 0xFF2196F2;
    var textColor = 0xff212121;
    var maxCount = 0;

    this.setTag("LEditText");

    var makeEditText = function() {
        edittext.setHintText(hint);
        edittext.setTextSize(textsize);
        edittext.setHintColor(0xffbcbcbc);
    };

    var updateCountView = function() {
        var curCount = edittext.getText().length;
        countView.setText(curCount + "/" + maxCount);
        if (maxCount > 0 && curCount > maxCount) {
            self.setError(true);
        } else {
            self.setError(false);
        }
    };

    var updateLine = function() {
        if (disabled) {
            line.setStyle("border-top", "#bcbcbc 1px dashed");
        } else if (isError) {
            line.setStyle("border-top", "#dd3226 2px solid");
        } else if (focused) {
            line.setStyle("border-top", Utils.toCssColor(highlightColor) + " 2px solid");
        } else {
            line.setStyle("border-top", "#bcbcbc 1px solid");
        }
    };

    var updateTextColor = function() {
        if (isError) {
            label.setTextColor(0xffdd3226);
            countView.setTextColor(0xffdd3226);
        } else if (disabled) {
            label.setTextColor(0xffbcbcbc);
            edittext.setTextColor(0xffbcbcbc);
            countView.setTextColor(0xffbcbcbc);
        } else if (focused) {
            label.setTextColor(highlightColor);
            countView.setTextColor(0xff757575);
        } else {
            label.setTextColor(0xff757575);
            countView.setTextColor(0xff757575);
            edittext.setTextColor(textColor);
        }
    };

    this.isError = function() {
        return isError;
    };

    this.setMaxCount = function(count) {
        if (count > 0) {
            maxCount = count;
            countView.setVisibility(View.VISIBLE);
            updateCountView();
        }
    };

    this.setHighlightColor = function(c) {
        highlightColor = c;
    };

    this.setDisabled = function(d) {
        disabled = d;
        edittext.setDisabled(d);
        updateLine();
        updateTextColor();
    };

    this.setText = function(t) {
        edittext.setText(t);
        label.setText(hint);
        updateCountView();
    };

    this.setOnFocusChangeListener = function(l) {
        focusListener = l;
    };

    this.setTextChangedListener = function(l) {
        textChangeListener = l;
    };

    this.setPassword = function(isPassword) {
        edittext.setPassword(isPassword);
    };

    this.setTextSize = function(ts) {
        textsize = ts;
        edittext.setTextSize(ts);
    };

    this.setHint = function(t) {
        this.setHintText(t);
    };

    this.setHintText = function(t) {
        hint = t;
        edittext.setHintText(t);
    };

    this.setError = function(iserror, msg) {
        if (disabled) {
            return;
        }
        isError = iserror;
        if (isError && msg != undefined) {
            errorMsg.setText(msg);
        } else {
            errorMsg.setText("");
        }
        updateLine();
        updateTextColor();
        this.requestLayout();
    };

    this.setSingleLine = function(s) {
        isSingleLine  = s;
        edittext.setSingleLine(s);
        edittext.setText("");
        makeEditText();
    };

    var label = new TextView();
    label.setTextSize(12);
    this.addView(label);

    var t = null;

    var edittext = new EditText();
    makeEditText();
    edittext.setOnFocusChangeListener(function(f) {
        if (focusListener != null) {
            focusListener.call(this, f);
        }
        focused = f;
        if (f) {
            if (edittext.getText() == "") {
                edittext.setHintText("");
                label.setText(hint);
                t = new TranslateAnimation(0, 0, 8, 0);
                t.setDuration(100);
                t.setAnimationEndListener(function() {
                    updateTextColor();
                    label.setText(hint);
                });
                label.startAnimation(t);
            }
        } else {
            if (edittext.getText() == "") {
                t = new TranslateAnimation(0, 0, 0, 8);
                t.setDuration(100);
                t.setAnimationEndListener(function(){
                    edittext.setHintText(hint);
                    label.setText("");
                });
                label.startAnimation(t);
            }
        }
        updateLine();
        updateTextColor();
        self.requestLayout();
    });
    edittext.setTextChangedListener(function() {
        updateCountView();
        if (textChangeListener != null) {
            textChangeListener.call(this);
        }
    });
    this.addView(edittext);

    var errorMsg = new TextView();
    errorMsg.setTextSize(12);
    errorMsg.setTextColor(0xFFDD3226);
    this.addView(errorMsg);

    var countView = new TextView();
    countView.setTextSize(12);
    countView.setVisibility(View.GONE);
    countView.setGravity(Gravity.RIGHT);
    this.addView(countView);

    var line = new View();
    this.addView(line);

    updateLine();
    updateTextColor();

    this.getText = function() {
        return edittext.getText();
    };

    this.onMeasure = function(widthMS, heightMS) {
        var width = MeasureSpec.getSize(widthMS);
        var contentWidth = width;

        measureTextView(label, contentWidth, this.LABEL_SIZE);
        measureTextView(errorMsg, contentWidth, this.LABEL_SIZE);
        measureTextView(countView, contentWidth, this.LABEL_SIZE);

        var height = 0;
        if (isSingleLine) {
            height = this.PADDING * 2 + this.GAP * 2 + this.ERROR_SIZE + this.LABEL_SIZE + 2 + textsize + 2;
            edittext.measure(MeasureSpec.makeMeasureSpec(contentWidth, MeasureSpec.EXACTLY),
                MeasureSpec.makeMeasureSpec(height, MeasureSpec.EXACTLY));
        } else {
            height = this.PADDING * 2 + this.GAP * 2 + this.ERROR_SIZE + this.LABEL_SIZE + 2 + this.TEXT_AREA_HEIGHT + 2;
            edittext.measure(MeasureSpec.makeMeasureSpec(contentWidth, MeasureSpec.EXACTLY),
                MeasureSpec.makeMeasureSpec(this.TEXT_AREA_HEIGHT, MeasureSpec.EXACTLY));
        }

        line.measure(contentWidth, 2);

        this.setMeasuredDimension(width, height);
    };

    this.onLayout = function(x, y) {
        var offsetX = 0;
        var offsetY = this.PADDING;
        label.layout(offsetX, offsetY - 2);

        offsetY = this.PADDING + 10 + this.GAP;
        if (isSingleLine) {
            edittext.layout(offsetX, 0);
        } else {
            edittext.layout(offsetX, offsetY);
        }
        offsetY = this.getMeasuredHeight() - this.ERROR_SIZE - this.GAP;
        errorMsg.layout(offsetX, offsetY - 2);
        countView.layout(offsetX, offsetY - 2);

        offsetY = this.getMeasuredHeight() - this.ERROR_SIZE - this.GAP * 2 - line.getMeasuredHeight();
        line.layout(offsetX, offsetY);
    };

    function measureTextView(view, width, height) {
        view.measure(MeasureSpec.makeMeasureSpec(width, MeasureSpec.EXACTLY),
            MeasureSpec.makeMeasureSpec(height, MeasureSpec.AT_MOST));
    }
}

function LSelectionButton() {
    LinearLayout.apply(this, []);

    this.setTag("LSelectionButton");

    this.WIDTH = 160;
    this.HEIGHT = 48;

    var self = this;
    var width = this.WIDTH;
    var isMenuShow = false;
    var mask = new View();
    var menuPanel = new MenuPanel();
    var items = [];
    var selectIndex = 0;

    var selectedItem = new SelectedItem();
    selectedItem.setOnClickListener(function(){
        self.showMenu();
    });
    this.addView(selectedItem);

    var line = new View();
    line.setBackgroundColor(0xffbcbcbc);
    this.addView(line);

    this.addMenuItem = function(text) {
        items.push(text);
        menuPanel.makeMenu();
        this.setSelect(selectIndex);
    };

    this.setSelect = function(index) {
        selectIndex = index;
        selectedItem.setText(items[index]);
    };

    this.setWidth = function(w) {
        width = w;
    };

    this.showMenu = function() {
        if (isMenuShow) {
            return;
        }

        mask.setOnClickListener(function(){
            self.hideMenu();
        });
        var maskLp = new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.FILL_PARENT);
        mRootView.addView(mask, maskLp);

        var lp = new LayoutParams(width, LayoutParams.WRAP_CONTENT);
        var offset = Utils.getOffset(this.getDiv());
        menuPanel.makeMenu();
        menuPanel.setAlpha(0);
        lp.leftMargin = offset.left;
        lp.topMargin = offset.top - 8;
        mRootView.addView(menuPanel, lp);
        isMenuShow = true;

        var a = new AlphaAnimation(0, 1);
        a.setDuration(100);
        menuPanel.startAnimation(a);
    };

    this.hideMenu = function() {
        var a = new AlphaAnimation(1, 0);
        a.setDuration(100);
        a.setAnimationEndListener(function() {
            mRootView.removeView(mask);
            mRootView.removeView(menuPanel);
            isMenuShow = false;
        });
        menuPanel.startAnimation(a);
    };

    this.onMeasure = function(widthMS, heightMS) {
        selectedItem.measure(MeasureSpec.makeMeasureSpec(width, MeasureSpec.EXACTLY),
            MeasureSpec.makeMeasureSpec(this.HEIGHT, MeasureSpec.EXACTLY));
        line.measure(MeasureSpec.makeMeasureSpec(width, MeasureSpec.EXACTLY),
            MeasureSpec.makeMeasureSpec(1, MeasureSpec.EXACTLY));
        this.setMeasuredDimension(width, this.HEIGHT);
    };

    this.onLayout = function() {
        var offsetX = 0;
        var offsetY = 0;
        selectedItem.layout(offsetX, offsetY);

        offsetY = this.getMeasuredHeight() - line.getMeasuredHeight();
        line.layout(offsetX, offsetY);
    };

    function SelectedItem() {
        LinearLayout.apply(this, []);

        this.setWillNotDraw(false);

        var content = new LinearLayout();
        content.setOrientation(LinearLayout.HORIZONTAL);
        var contentLp = new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.FILL_PARENT);
        this.addView(content, contentLp);

        var textView = new TextView();
        textView.setTextSize(textSize);
        textView.setTextColor(textColor);
        textView.setPadding(padding, 0, 0, 0);
        textView.setGravity(Gravity.LEFT | Gravity.CENTER_VERTICAL);
        var textLp = new LayoutParams(0, LayoutParams.FILL_PARENT);
        textLp.weight = 1;
        content.addView(textView, textLp);

        this.setText = function(text) {
            textView.setText(text);
        };

        this.onDraw = function(canvas) {
            var w = this.getMeasuredWidth();
            var h = this.getMeasuredHeight();
            var s = 6;
            var x = (w - h) + (h / 2) - 10;
            var y = (h - s) / 2;
            canvas.fillStyle = "#bcbcbc";
            canvas.beginPath();
            canvas.moveTo(x, y);
            canvas.lineTo(x + s * 2, y);
            canvas.lineTo(x + s, y + s);
            canvas.closePath();
            canvas.fill();
        };
    }

    function MenuPanel() {
        LinearLayout.apply(this, []);

        this.setBackgroundColor(0xffffffff);
        this.setBoxShadow(0, 1, 2, 1, 0x33000000);
        this.setPadding(0, 8, 0, 8);

        var buttonView = new LinearLayout();
        buttonView.setOrientation(LinearLayout.VERTICAL);
        var buttonViewLp = new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT);
        this.addView(buttonView, buttonViewLp);

        var buttonLp = new LayoutParams(LayoutParams.FILL_PARENT, buttonHeight);

        this.makeMenu = function() {
            buttonView.removeAllViews();
            this.addMenuItem(selectIndex);
            for (var i = 0; i < items.length; i++) {
                if (i != selectIndex) {
                    this.addMenuItem(i);
                }
            }
        };

        this.addMenuItem = function(index) {
            var buttonLp = new LayoutParams(LayoutParams.FILL_PARENT, 48);
            var button = createButton(items[index]);
            button.setId(index);
            button.setOnClickListener(function () {
                self.setSelect(this.getId());
                self.hideMenu();
            });
            buttonView.addView(button, buttonLp);
        };

        var createButton = function(text) {
            var b = new LButton();
            b.setText(text);
            b.setTextColor(textColor);
            b.setTextSize(textSize);
            b.setBoxShadow(0,0,0,0);
            b.setPadding(padding, 0, 0, 0);
            b.setGravity(Gravity.LEFT | Gravity.CENTER_VERTICAL);
            b.setBackgroundColor(0x00000000);
            b.setCornerSize(0);
            return b;
        };
    }
}

function WaveDrawable() {
    Drawable.apply(this, []);

    this.waveDuration = 500;

    var mWaveProcessor = new Processor();

    var mCurrentState = View.VIEW_STATE_ENABLED;
    var mX = 0;
    var mY = 0;
    var mDimBg = true;
    var maxRadius = 9999;
    var mWaveColor = 0x25191919;

    this.onStateChange = function(state) {
        if (mCurrentState != View.VIEW_STATE_PRESSED && state == View.VIEW_STATE_PRESSED) {
            mWaveProcessor.startProcess(0, 1, this.waveDuration);
        }
        mCurrentState = state;
        this.invalidateSelf();
    };

    this.setX = function(x) {
        mX = x;
    };

    this.setY = function(y) {
        mY = y;
    };

    this.setDimBg = function(isDimBg) {
        mDimBg = isDimBg;
    };

    this.setWaveColor = function(color) {
        mWaveColor = color;
    };

    this.setMaxRadius = function(r) {
        maxRadius = r;
    };

    this.draw = function(canvas) {
        if (mCurrentState == View.VIEW_STATE_PRESSED) {
            this.drawPress(canvas);
        } else if (mCurrentState == View.VIEW_STATE_ENABLED) {
            this.drawEnable(canvas);
        }
        this.computeAnimation();
    };

    this.computeAnimation = function() {
        if (mWaveProcessor.computeProcessOffset()) {
            this.invalidateSelf();
        }
    };

    this.drawPress = function(canvas) {
        var b = this.getBounds();

        if (mDimBg) {
            canvas.fillStyle = Utils.toCssColor(0x33191919);
            canvas.fillRect(b.left, b.top, b.width(), b.height());
        }

        var offsetX = mX;
        var offsetY = mY;
        var radius = b.height() + b.width() * mWaveProcessor.getCurrProcess() * 2;
        radius = radius / 2;
        radius = Math.min(radius, maxRadius);
        canvas.beginPath();
        canvas.arc(offsetX, offsetY, radius, 0, Math.PI * 2, true);
        canvas.closePath();
        canvas.fillStyle = Utils.toCssColor(mWaveColor);
        canvas.fill();
    };

    this.drawEnable = function(canvas) {

    };
}


/**
 * Layout container for a view hierarchy that can be scrolled by the user,
 * allowing it to be larger than the physical display.  A child that is often used
 * is a LinearLayout in a vertical orientation, presenting a vertical
 * array of top-level items that the user can scroll through.
 *
 * ScrollView only supports vertical scrolling. For horizontal scrolling,
 * use HorizontalScrollView.
 *
 * @class ScrollView
 */
function ScrollView() {
    ViewGroup.apply(this, []);

    this.setTag("ScrollView");
    this.setStyle("overflow", "auto");

    this.onMeasure = function(widthMS, heightMS) {
        var width = MeasureSpec.getSize(widthMS);
        var height = MeasureSpec.getSize(heightMS);
        if (this.getChildCount() > 0) {
            var child = this.getChildAt(0);
            var contentWidth = width - this.getPaddingLeft() - this.getPaddingRight();
            child.measure(contentWidth, height);
        }
        this.setMeasuredDimension(width, height);
    };

    this.onLayout = function(x, y) {
        var offsetX = this.getPaddingLeft();
        var offsetY = this.getPaddingTop();
        if (this.getChildCount() > 0) {
            var child = this.getChildAt(0);
            child.layout(offsetX, offsetY);
        }
    };
}

/**
 * Layout container for a view hierarchy that can be scrolled by the user,
 * allowing it to be larger than the physical display.  A child that is often used
 * is a LinearLayout in a horizontal orientation, presenting a horizontal
 * array of top-level items that the user can scroll through.
 *
 * HorizontalScrollView only supports horizontal scrolling. For vertical scrolling,
 * use ScrollView.
 *
 * @class HorizontalScrollView
 */
function HorizontalScrollView() {
    ViewGroup.apply(this, []);

    this.setStyle("overflow", "auto");

        this.scrollTo = function(x) {
        this.getDiv().scrollLeft = x;
        console.log("this.getDiv().scrollLeft:" + this.getDiv().scrollLeft);
    };

    this.onMeasure = function(widthMS, heightMS) {
        var width = MeasureSpec.getSize(widthMS);
        var height = MeasureSpec.getSize(heightMS);
        if (this.getChildCount() > 0) {
            var child = this.getChildAt(0);
            var contentHeight = height - this.getPaddingTop() - this.getPaddingBottom();
            child.measure(width, contentHeight);
        }
        this.setMeasuredDimension(width, height);
    };

    this.onLayout = function(x, y) {
        var offsetX = this.getPaddingLeft();
        var offsetY = this.getPaddingTop();
        if (this.getChildCount() > 0) {
            var child = this.getChildAt(0);
            child.layout(offsetX, offsetY);
        }
    };
}

/**
 * Displays an arbitrary icon.The ImageView class provides scaling display options.
 *
 * @class ImageView
 */
function ImageView() {
    ViewGroup.apply(this, []);

    var mSelf = this;
    var mSrc = null;
    var mImg = null;
    var mScaleType = ScaleType.CENTER;
    var mCustomWidth = 0;
    var mCustomHeight = 0;
    var scaleTimeout = 0;

    /**
     * Set the scale type of image.
     *
     * @method setScaleType
     * @param {int} ScaleType.CENTER,ScaleType.FIT_XY,ScaleType.CENTER_INSIDE,ScaleType.FIT_CENTER or ScaleType.CENTER_CROP.
     */
    this.setScaleType = function(st) {
        mScaleType = st;
    };

    /**
     * Sets the content of this ImageView to the specified Uri.
     *
     * @method setImageUri
     * @param {string} The Uri of an image
     */
    this.setImageUri = function(src) {
        this.setImgSrc(src);
    };

    this.setImgSrc = function(src) {
        this.setVisibility(View.VISIBLE);
        mSrc = src;

        if (mImg == null) {
            mImg = document.createElement("img");
        }
        mImg.src = src;
        mImg.style.verticalAlign = "middle";
        mImg.style.position = "absolute";
        mImg.style.top = 0;
        mImg.style.left = 0;
        mImg.onerror = function() {
            mSelf.setVisibility(View.INVISIBLE);
        };
        this.getDiv().appendChild(mImg);
        this.requestLayout();
    };

    this.setStyleWidth = function(w) {
        mImg.style.width = w + "px";
        mImg.style.left = (this.getMeasuredWidth() - w) / 2 + "px";
    };

    this.setStyleHeight = function(h) {
        mImg.style.height = h + "px";
        mImg.style.top = (this.getMeasuredHeight() - h) / 2 + "px";
    };

    this.setImgWidth = function(width) {
        this.setStyleWidth(width);
        mCustomWidth = width;
    };

    this.setImgHeight = function(height) {
        this.setStyleHeight(height);
        mCustomHeight = height;
    };

    this.onMeasure = function (widthMS, heightMS) {
        var width = MeasureSpec.getSize(widthMS);
        var height = MeasureSpec.getSize(heightMS);
        this.getDiv().style.lineHeight = height + "px";

        this.setMeasuredDimension(width, height);

        this.scale();
    };

    this.scale = function() {
        if (mImg != null) {
            var nw = mImg.naturalWidth;
            var nh = mImg.naturalHeight;
            if (nw == 0 || nh == 0) {
                scaleTimeout = setTimeout(this.scale, 200);
                mImg.onload = mSelf.scaleInner;
                mSelf.setStyleWidth(mSelf.getMeasuredWidth());
            } else {
                clearTimeout(scaleTimeout);
                mSelf.scaleInner();
            }
        }
    };

    this.scaleInner = function() {
        var nw = mImg.naturalWidth;
        var nh = mImg.naturalHeight;
        var width = mSelf.getWidth();
        var height = mSelf.getHeight();
        if (mCustomWidth != 0) {
            var h = mCustomWidth * nh / nw;
            mSelf.setStyleWidth(mCustomWidth);
            mSelf.setStyleHeight(h);
        } else if (mCustomHeight != 0) {
            var w = mCustomHeight * nw / nh;
            mSelf.setStyleWidth(w);
            mSelf.setStyleHeight(mCustomHeight);
        } else if (mScaleType == ScaleType.CENTER) {
            mSelf.setStyleWidth(nw);
            mSelf.setStyleHeight(nh);
        } else if (mScaleType == ScaleType.FIT_XY) {
            mSelf.setStyleWidth(width);
            mSelf.setStyleHeight(height);
        } else if (mScaleType == ScaleType.CENTER_INSIDE) {
            if (nw > width || nh > height) {
                mSelf.fitCenter(nw, nh, width, height);
            }
        } else if (mScaleType == ScaleType.FIT_CENTER) {
            mSelf.fitCenter(nw, nh, width, height);
        } else if (mScaleType == ScaleType.CENTER_CROP) {
            mSelf.cropCenter(nw, nh, width, height);
        }
    };

    this.fitCenter = function(nw, nh, width, height) {
        if (nw / nh > width / height) {
            this.setStyleWidth(width);
            this.setStyleHeight(width * nh / nw);
        } else {
            this.setStyleWidth(height * nw / nh);
            this.setStyleHeight(height);
        }
    };

    this.cropCenter = function(nw, nh, width, height) {
        if (nw / nh < width / height) {
            this.setStyleWidth(width);
            this.setStyleHeight(width * nh / nw);
        } else {
            this.setStyleWidth(height * nw / nh);
            this.setStyleHeight(height);
        }
    };
}

function ScaleType(){}
Object.defineProperty(ScaleType,"FIT_XY",{value:1});
Object.defineProperty(ScaleType,"FIT_CENTER",{value:3});
Object.defineProperty(ScaleType,"CENTER",{value:5});
Object.defineProperty(ScaleType,"CENTER_CROP",{value:6});
Object.defineProperty(ScaleType,"CENTER_INSIDE",{value:7});

/**
 * Displays a button with an image (instead of text) that can be pressed
 * or clicked by the user.
 *
 * @class ImageButton
 */
function ImageButton() {
    ImageView.apply(this, []);
}

/**
 * Displays text to the user and not allows editing.
 *
 * @class TextView
 */
function TextView() {
    ViewGroup.apply(this, []);

    var mGravity = 0;
    var mTextSize = 12;
    var mSingleLine = false;
    var mContent = document.createElement("div");
    mContent.style.overflow = "auto";
    mContent.style.whiteSpace = "normal";
    this.getDiv().appendChild(mContent);

    /**
     * Return the text that TextView is displaying.
     *
     * @method getText
     * @return {string} The text in the TextView.
     */
    this.getText = function() {
        return mContent.innerHTML;
    };

    /**
     * Sets the string value of the TextView.
     *
     * @method setText
     * @param {string} text Sets the string value.
     */
    this.setText = function(text) {
        mContent.innerHTML = text;

        this.requestLayout();
        this.getDiv().scrollTop = "100px";
    };

    /**
     * Sets whether the content of this view is selectable by the user.
     *
     * @method setTextIsSelectable
     * @param {boolean} selectable Whether the content of this TextView should be selectable.
     */
    this.setTextIsSelectable = function(selectable) {
        if (selectable) {
            mContent.style["-webkit-user-select"] = "text";
        } else {
            mContent.style["-webkit-user-select"] = "none";
        }
    };

    /**
     * Sets the text color.
     *
     * @method setTextColor
     * @param {int} color The text color.
     */
    this.setTextColor = function(color) {
        mContent.style.color = Utils.toCssColor(color);
    };

    /**
     * Set the default text size to the given value.
     *
     * @method setTextSize
     * @param {int} textsize The default text size.
     */
    this.setTextSize = function(textsize) {
        mTextSize = textsize;
        mContent.style.fontSize = textsize + "px";
    };

    /**
     * Gives the text a shadow of the specified blur radius and color, the specified
     * distance from its drawn position.
     *
     * @method setShadowLayer
     * @param {int} radius If radius is 0, then the shadow layer is removed.
     * @param {int} dx Specified offset of X.
     * @param {int} dy Specified offset of Y.
     * @param {int} color Specified color.
     */
    this.setShadowLayer = function(radius, dx, dy, color) {
        mContent.style.textShadow = dx + "px " + dy + "px " + radius + "px " + Utils.toCssColor(color);
    };

    /**
     * Set the line height.
     *
     * @method setLineHeight
     * @param {int} lineHeight the line height.
     */
    this.setLineHeight = function(lineHeight) {
        mContent.style.lineHeight = lineHeight + "px";
    };

    /**
     * Sets whether the line is single.
     *
     * @method setSingleLine
     * @param {boolean} singleLine Whether the line is single.
     */
    this.setSingleLine = function(singleLine) {
        mSingleLine = singleLine;
        if (mSingleLine) {
            mContent.style.whiteSpace = "nowrap";
        } else {
            mContent.style.whiteSpace = "normal";
        }
        this.requestLayout();
    };

    this.onMeasure = function(widthMS, heightMS) {
        var width = MeasureSpec.getSize(widthMS);
        var height = MeasureSpec.getSize(heightMS);
        var mode = MeasureSpec.getMode(heightMS);

        mContent.style.width = (width - this.getPaddingLeft() - this.getPaddingRight()) + "px";
        mContent.style.height = "100%";
        mContent.style.left = this.getPaddingLeft() + "px";

        var measureDiv = document.createElement("div");
        measureDiv.style.width = mContent.style.width;
        measureDiv.style.height = "100%";
        measureDiv.style.fontFamily = Utils.findFontFamily(mContent);
        measureDiv.style.lineHeight = mContent.style.lineHeight;
        measureDiv.style.fontSize = mContent.style.fontSize;
        measureDiv.style.whiteSpace = mContent.style.whiteSpace;
        measureDiv.innerHTML = mContent.innerHTML;
        mHideDiv.appendChild(measureDiv);

        if (measureDiv.clientHeight !== 0) {
            var measureHeight = measureDiv.clientHeight;
            if (mode == MeasureSpec.UNSPECIFIED) {
                height = measureHeight;
            } else {
                if (mode != MeasureSpec.EXACTLY && height < measureHeight) {
                    height = measureHeight;
                } else {
                    if (height > measureHeight) {
                        mContent.style.clientHeight = measureHeight + "px";
                        mContent.style.height = "auto";
                        mContent.style.position = "absolute";
                        if (mGravity & Gravity.CENTER_VERTICAL) {
                            mContent.style.top = (height - measureHeight) / 2 + "px";
                        } else if (mGravity & Gravity.BOTTOM) {
                            mContent.style.top = (height - measureHeight) + "px";
                        } else {
                            mContent.style.top = 0 + "px";
                        }
                    }
                }
            }
        }
        mHideDiv.removeChild(measureDiv);

        mHideDiv.style.width = "auto";
        mHideDiv.style.height = "auto";

        this.setMeasuredDimension(width, height);

    };

    /**
     * Sets the horizontal alignment of the text and the
     * vertical gravity that will be used when there is extra space
     * in the TextView beyond what is required for the text itself.
     *
     * @method setGravity
     * @param {int} gravity
     */
    this.setGravity = function(gravity) {
        mGravity = gravity;

        if (gravity & Gravity.CENTER_HORIZONTAL) {
            this.getDiv().style.textAlign = "center";
        } else if (gravity & Gravity.RIGHT) {
            this.getDiv().style.textAlign = "right";
        } else {
            this.getDiv().style.textAlign = "left";
        }

    };
}

/**
 * Represents a push-button widget.Push-buttons can be
 * pressed, or clicked, by the user to perform an action.
 *
 * @class Button
 */
function Button() {
    TextView.apply(this, []);

    var mPressBg = 0x1a000000;
    var mNormalBg = 0;

    this.setGravity(Gravity.CENTER);
    this.setBorder(1, 0x1a000000);

    this.setPressBg = function(c) {
        mPressBg = c;
    };

    this.onTouchEvent = function(e) {
        switch (e.getAction()) {
            case MotionEvent.ACTION_DOWN:
                mNormalBg = this.setBackgroundColor();
                this.setBackgroundColor(mPressBg);
                break;
            case MotionEvent.ACTION_UP:
            case MotionEvent.ACTION_CANCEL:
                this.setBackgroundColor(mNormalBg);
                break;
        }
    };
}

/**
 * EditText is a thin veneer over TextView that configures itself
 * to be editable.
 *
 * @class EditText
 */
function EditText() {
    ViewGroup.apply(this, []);

    var mTag = "EditText" + (new Date()).getTime();

    var mSelf = this;
    var mFocusListener = null;
    var mInput;
    var mTextSize = 12;
    var mIsPassword = false;
    var mTextListener = null;
    var mIsFocused;

    this.setDisabled = function(disabled) {
        if (disabled) {
            mInput.disabled = "disabled";
        } else {
            mInput.disabled = "";
        }
    };

    /**
     * Sets whether the text of this EditText is password.
     *
     * @method setPassword
     * @param {boolean} isPassword
     */
    this.setPassword = function(isPassword) {
        mIsPassword = isPassword;
        mInput.type = "password";
    };

    this.getInput = function() {
        return mInput;
    };

    this.addInput = function() {
        this.getDiv().innerHTML = "";
        mInput = document.createElement("input");
        initInput();
        this.getDiv().appendChild(mInput);
    };
    this.addInput();

    this.addTextArea = function() {
        this.getDiv().innerHTML = "";
        mInput = document.createElement("textarea");
        initInput();
        this.getDiv().appendChild(mInput);
    };

    this.isFocused = function() {
        return mIsFocused;
    };

    this.setOnFocusChangeListener = function(l) {
        mFocusListener = l;
    };

    this.onFocusChanged = function(focused) {
        mIsFocused = focused;
        if (mFocusListener != null) {
            mFocusListener.call(this, focused);
        }
    };

    this.setSingleLine = function(s) {
        if (s) {
            this.addInput();
        } else {
            this.addTextArea();
        }
    };

    /**
     * Set the selection anchor to start and the selection edge to end.
     *
     * @method setSelection
     * @param {int} start Selection anchor to start.
     * @param {int} end Selection anchor to end.
     */
    this.setSelection = function(start, end) {
        mInput.selectionStart = start;
        if (end == undefined) {
            mInput.selectionEnd = start;
        } else {
            mInput.selectionEnd = end;
        }
    };

    /**
     * Return the offset of the selection anchor or cursor.
     *
     * @method getSelectionStart
     * @return {int} The offset.
     */
    this.getSelectionStart = function() {
        return mInput.selectionStart;
    };

    /**
     * Return the offset of the selection edge or cursor.
     *
     * @method getSelectionEnd
     * @return {int} The offset.
     */
    this.getSelectionEnd = function() {
        return mInput.selectionEnd;
    };

    /**
     * set a listener to whose methods are called whenever this EditText's text changes.
     *
     * @method setTextChangedListener
     * @param listener.
     */
    this.setTextChangedListener = function(listener) {
        mTextListener = listener;
        mInput.oninput = listener;
    };

    /**
     * Return the text that EditText is displaying.
     *
     * @method getText
     * @return {string} The text in the EditText.
     */
    this.getText = function() {
        return mInput.value;
    };

    /**
     * Sets the string value of the EditText.
     *
     * @method setText
     * @param {string} text Sets the string value.
     */
    this.setText = function(text) {
        mInput.value = text;
    };

    /**
     * Sets the text size of the EditText.
     *
     * @method setTextSize
     * @param {int} size Sets the text size.
     */
    this.setTextSize = function(size) {
        mTextSize = size;
        mInput.style.fontSize = size + "px";
    };

    /**
     * Sets the text color of the EditText.
     *
     * @method setTextColor
     * @param {int} color Sets the text color.
     */
    this.setTextColor = function(color) {
        mInput.style.color = Utils.toCssColor(color);
    };

    /**
     * Sets the text to be displayed when the text of the EditText is empty.
     *
     * @method setHint
     * @param {string} text Sets the hint text.
     */
    this.setHint = function(text) {
        this.setHintText(text);
    };

    this.setHintText = function(text) {
        mInput.placeholder = text;
    };

    /**
     * Sets the color of the hint text for this EditText.
     *
     * @method setHintColor
     * @param {int} color Sets the hint text's color.
     */
    this.setHintColor = function(color) {
        var css = document.createElement("style");
        css.innerHTML = "." + mTag + "::-webkit-input-placeholder{ color:" + Utils.toCssColor(color) + "}";
        document.head.appendChild(css);
        mInput.className += mTag + " ";
    };

    /**
     * To get this EditText to take focus.
     *
     * @method requestFocus
     */
    this.requestFocus = function() {
        mInput.focus();
    };

    this.onMeasure = function(widthMS, heightMS) {
        var width = MeasureSpec.getSize(widthMS);
        var height = MeasureSpec.getSize(heightMS);
        var hMode = MeasureSpec.getMode(heightMS);

        var contentWidth = width - this.getPaddingLeft() - this.getPaddingRight();
        var contentHeight = height - this.getPaddingTop() - this.getPaddingBottom();
        if (hMode != MeasureSpec.EXACTLY) {
            contentHeight = mTextSize * 1.5;
            height = contentHeight + this.getPaddingTop() + this.getPaddingBottom();
        }
        mInput.style.fontFamily = Utils.findFontFamily(mInput);
        mInput.style.width = contentWidth + "px";
        mInput.style.height = contentHeight + "px";

        this.setMeasuredDimension(width, height);
    };

    this.onLayout = function(x, y) {
        mInput.style.top = this.getPaddingTop() + "px";
        mInput.style.left = this.getPaddingLeft() + "px";
    };

    function initInput() {
        if (mIsPassword) {
            mInput.type = "password";
        } else {
            mInput.type = "text";
        }
        mInput.style.boxSizing = "border-box";
        mInput.style.position = "absolute";
        mInput.style.background = "none";
        mInput.style.border = "0";
        mInput.style.outline = "none";
        mInput.style.padding = 0;
        mInput.style.fontSize = mTextSize;
        mInput.onfocus = function() {
            mSelf.onFocusChanged(true);
        };
        mInput.onblur = function() {
            mSelf.onFocusChanged(false);
        };
        if (mTextListener != null) {
            mInput.oninput = mTextListener;
        }
    }
}

/**
 * @class WebView
 */
function WebView() {
    ViewGroup.apply(this, []);

    this.setBackgroundColor("#ffffff");

    var mFrame = document.createElement("iframe");
    mFrame.style.border = "none";
    this.getDiv().appendChild(mFrame);

    this.loadUrl = function(url) {
        mFrame.src = url;
    };

    this.loadData = function(data) {
        mFrame.srcdoc = data;
    };

    this.loadDataWithBaseURL = function(data) {
        mFrame.srcdoc = data;
    };

    this.setSrc = function(src){
        mFrame.src = src;
    };

    this.setSrcDoc = function(srcdoc) {
        mFrame.srcdoc = srcdoc;
    };

    this.getFrame = function() {
        return mFrame;
    };

    this.onMeasure = function(widthMS, heightMS) {
        var width = MeasureSpec.getSize(widthMS);
        var height = MeasureSpec.getSize(heightMS);
        mFrame.style.width = width + "px";
        mFrame.style.height = height + "px";
        this.setMeasuredDimension(width, height);
    };
}
