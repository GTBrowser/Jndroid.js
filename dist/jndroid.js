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
}

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
        while (node != document) {
            fontFamily = node.style.fontFamily;
            if (fontFamily != "") {
                return fontFamily;
            }
            node = node.parentNode;
        }
        return fontFamily;
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

var MeasureSpec = new _MeasureSpec();
function _MeasureSpec() {
    this.makeMeasureSpec = function(size, mode) {
        return (size & ~MeasureSpec.MODE_MASK) | (mode & MeasureSpec.MODE_MASK);
    };

    this.getMode = function(measureSpec) {
        return (measureSpec & MeasureSpec.MODE_MASK);
    };

    this.getSize = function(measureSpec) {
        return (measureSpec & ~MeasureSpec.MODE_MASK);
    };
}
Object.defineProperty(MeasureSpec,"MODE_MASK",{value:(0x3 << 30)});
Object.defineProperty(MeasureSpec,"UNSPECIFIED",{value:(0x0 << 30)});
Object.defineProperty(MeasureSpec,"EXACTLY",{value:(0x1 << 30)});
Object.defineProperty(MeasureSpec,"AT_MOST",{value:(0x2 << 30)});

function MotionEvent(rawEv) {

    this.getX = function() {
        var div = this.realView.getDiv();
        var offset = Utils.getOffset(div);
        return this.getTouches().pageX - offset.left;
    };

    this.getY = function() {
        var div = this.realView.getDiv();
        var offset = Utils.getOffset(div);
        return this.getTouches().pageY - offset.top;
    };

    this.getRawX = function() {
        return this.getTouches().pageX;
    };

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
            if (this.getRawX() < offset.left || this.getRawX() > (offset.left + offset.width)
                || this.getRawY() < offset.top || this.getRawY() > (offset.top + offset.height)) {
                return MotionEvent.ACTION_CANCEL;
            }
        }
    };
}

Object.defineProperty(MotionEvent,"ACTION_DOWN",{value:0});
Object.defineProperty(MotionEvent,"ACTION_UP",{value:1});
Object.defineProperty(MotionEvent,"ACTION_MOVE",{value:2});
Object.defineProperty(MotionEvent,"ACTION_CANCEL",{value:3});

function Drawable() {
    var mBounds = new Rect(0, 0, 0, 0);
    var mCallback = null;

    this.draw = function(canvas) {
    };

    this.getBounds = function() {
        return mBounds;
    };

    this.setBounds = function(l, t, r, b) {
        if (mBounds.left != l || mBounds.top != t || mBounds.right != r || mBounds.bottom != b) {
            mBounds.set(l, t, r, b);
        }
    };

    this.setCallback = function(cb) {
        mCallback = cb;
    };

    this.invalidateSelf = function() {
        if (mCallback != null) {
            mCallback.invalidateDrawable(this);
        }
    };

    this.setState = function(state) {
        this.onStateChange(state);
    };

    this.onStateChange = function(state) {
    };

    this.getIntrinsicWidth = function() {
        return -1;
    };

    this.getIntrinsicHeight = function() {
        return -1;
    }
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
    var mPaddingLeft = 0;
    var mPaddingTop = 0;
    var mPaddingRight = 0;
    var mPaddingBottom = 0;
    var mLayoutParams = null;
    var mWillNotDraw = true;
    var mVisibility = true;
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
                        canvas = mHTMLCanvas.getContext('2d');
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
            this.requestLayout();
        } else {
            if (mHTMLCanvas !== null) {
                mDiv.removeChild(mHTMLCanvas);
            }
        }
    };

	/**
	* Sets the background color for this view.
	*
	* @method setBackgroundColor
	* @params {int} color The color of the background.
	*/
    this.setBackgroundColor = function(color) {
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
                    if (x < offset.left || x > (offset.left + offset.width)
                        || y < offset.top || y > (offset.top + offset.height)) {
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

        var styleString = x + 'px ' + y + 'px';

        if(typeof(blur) != 'undefined')
        {
            styleString = styleString + ' ' + blur + 'px';
        }

        if(typeof(spread) != 'undefined')
        {
            styleString = styleString + ' ' + spread + 'px';
        }

        if(typeof(color) != 'undefined')
        {
            styleString = styleString + ' ' + Utils.toCssColor(color);
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
            if (indexOrParams.constructor.name == "Number") {
                mChildren.add(indexOrParams, view);
                if (params != undefined) {
                    view.setLayoutParams(params);
                }
            } else if (indexOrParams.constructor.name == "LayoutParams") {
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
        if (this.getParent() !== null) {
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

function setContentView(view) {
    //if (window.screen.height > document.body.scrollHeight) {
    //    mTopMargin = window.screen.height - document.body.scrollHeight;


    //}

    addOrientationListener(function() {
        onOrientationChanged();
    });


    mHideDiv = document.createElement("div");
    mHideDiv.style.height = "100%";
    mHideDiv.style.width = "100%";

    document.body.innerHTML = "";
    document.body.style.PADDING = "0";
    document.body.style.margin = "0";
    document.body.appendChild(mHideDiv);

    mDecorView = new FrameLayout();
    mDecorView.setTag("decorview");

    mRootView = view;
    mRootView.setTag("rootview");
    mDecorView.addView(mRootView);

    mDecorView.addView(mDialogLayout);
    mDialogLayout.setVisibility(View.GONE);
    mDialogLayout.setTag("dialoglayout");


    document.body.appendChild(mDecorView.getDiv());
    document.body.style.overflow = "hidden";

    forceReLayout();

    var css = document.createElement("style");
    css.innerHTML = "*{-webkit-user-select:none;} ::-webkit-scrollbar {width: 0px;} input{outline:none}";
    document.head.appendChild(css);
}

function getRootView() {
    return mRootView;
}

function forceReLayout() {
    if (mDecorView === null || mDecorView === undefined) {
        log("gyy: mDecorView is null");
        return;
    }
    mDecorView.measure(window.innerWidth, window.innerHeight);
    mDecorView.layout(0, 0);
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

function LayoutParams(widthOrParams, height) {
    if (widthOrParams.constructor.name == "LayoutParams") {
        this.width = widthOrParams.width;
        this.height = widthOrParams.height;
    } else {
        this.width = widthOrParams;
        this.height = height;
    }
    this.leftMargin = 0;
    this.topMargin = 0;
    this.rightMargin = 0;
    this.bottomMargin = 0;
    this.gravity = -1;
    this.weight = 0;

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
Object.defineProperty(LayoutParams,"FILL_PARENT",{value:-1});
Object.defineProperty(LayoutParams,"MATCH_PARENT",{value:-1});
Object.defineProperty(LayoutParams,"WRAP_CONTENT",{value:-2});

function getDefaultLayoutParams() {
    return new LayoutParams(LayoutParams.WRAP_CONTENT, LayoutParams.WRAP_CONTENT);
};

function getLayoutParams(view) {
    var lp = view.getLayoutParams();
    if (lp == null) {
        lp = getDefaultLayoutParams();
    }
    return lp;
};

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
};

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

function LinearLayout() {
    ViewGroup.apply(this, []);

    var mOrientation = LinearLayout.VERTICAL;

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
Object.defineProperty(LinearLayout,"HORIZONTAL",{value:0});
Object.defineProperty(LinearLayout,"VERTICAL",{value:1});

function FrameLayout() {
    ViewGroup.apply(this, []);

    this.onMeasure = function(widthMS, heightMS) {
        var width = MeasureSpec.getSize(widthMS);
        var height = MeasureSpec.getSize(heightMS);
        var childWidth = width - this.getPaddingLeft() - this.getPaddingRight();
        var childHeight = height - this.getPaddingTop() - this.getPaddingBottom();
        for (var i = 0; i < this.getChildCount(); i++) {
            var child = this.getChildAt(i);
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
            var offsetX = calcOffsetXByGravity(this, child);
            var offsetY = calcOffsetYByGravity(this, child);
            child.layout(offsetX, offsetY);
        }
    };
}
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
                setTimeout(function() {fireScreenChanged()}, d);
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
            LeUI.measureExactly(edittext, contentWidth, height);
        } else {
            height = this.PADDING * 2 + this.GAP * 2 + this.ERROR_SIZE + this.LABEL_SIZE + 2 + this.TEXT_AREA_HEIGHT + 2;
            LeUI.measureExactly(edittext, contentWidth, this.TEXT_AREA_HEIGHT);
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
        }
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
        canvas.fillStyle = Utils.toCssColor(0x25191919);
        canvas.fill();
    };

    this.drawEnable = function(canvas) {

    };
}


function ScrollView() {
    ViewGroup.apply(this, []);

    this.getDiv().style.overflow = "auto";

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

function Button() {
    ViewGroup.apply(this, []);

    this.setWillNotDraw(false);
    this.setBackgroundColor("#cccccc");

    this.getDiv().style.textAlign = "center";

    //var mInterval = null;
    //var mPressRadius = 5;
    //
    //this.onInterval = function(obj) {
    //    mPressRadius += 10;
    //    obj.invalidate();
    //}

    addTouchListener(this);

    this.registerTouchEvent = function() {
        this.getDiv().addEventListener("touchstart", this.touchStart, false);
        this.getDiv().addEventListener("touchend", this.touchEnd, false);
        this.getDiv().addEventListener("touchcancel", this.touchCancel, false);
    };

    this.registerTouchEvent();

    this.touchStart = function(event) {
        this.style.background = "#999999";
        //var button = findTouchObject(this);
        //mInterval = setInterval(button.onInterval, 100, button);
    };

    this.touchEnd = function(event) {
        this.style.background = "#cccccc";
    };

    this.touchCancel = function(event) {
        this.style.background = "#cccccc";
    };

    this.setText = function(text) {
        var div = document.createElement("div");
        div.style.width = "100%";
        div.style.lineHeight = "36px";
        div.style.position = "absolute";
        div.style.textAlign = "center";
        div.style.left = 0;
        div.style.top = 0;
        div.innerHTML = text;
        this.getDiv().appendChild(div);
    };

    this.onMeasure = function(width, height) {
        this.setMeasuredDimension(120, 36);
    };

    this.onDraw = function(canvas) {
        //canvas.beginPath();
        //canvas.arc(20, 15, mPressRadius, 0, Math.PI * 2, true);
        //canvas.closePath();
        //canvas.fillStyle = 'rgba(0,255,0,0.25)';
        //canvas.fill();
    };
}

function ImageView() {
    ViewGroup.apply(this, []);

    var mSelf = this;
    var mSrc = null;
    var mImg = null;
    var mScaleType = ScaleType.CENTER;
    var mCustomWidth = 0;
    var mCustomHeight = 0;
    var scaleTimeout = 0;

    this.setScaleType = function(st) {
        mScaleType = st;
    };

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

function ImageButton() {
    ImageView.apply(this, []);
}

function TextView() {
    ViewGroup.apply(this, []);

    var mGravity = 0;
    var mTextSize = 12;
    var mSingleLine = false;
    var mContent = document.createElement("div");
    mContent.style.overflow = "auto";
    mContent.style.whiteSpace = "normal";
    this.getDiv().appendChild(mContent);

    this.getText = function() {
        return mContent.innerHTML;
    };

    this.setText = function(text) {
        mContent.innerHTML = text;

        this.requestLayout();
        this.getDiv().scrollTop = "100px";
    };

    this.setTextIsSelectable = function(selectable) {
        if (selectable) {
            mContent.style["-webkit-user-select"] = "text";
        } else {
            mContent.style["-webkit-user-select"] = "none";
        }
    };

    this.setTextColor = function(color) {
        mContent.style.color = Utils.toCssColor(color);
    };

    this.setTextSize = function(textsize) {
        mTextSize = textsize;
        mContent.style.fontSize = textsize + "px";
    };

    this.setShadowLayer = function(radius, dx, dy, color) {
        mContent.style.textShadow = dx + "px " + dy + "px " + radius + "px " + Utils.toCssColor(color);
    };

    this.setLineHeight = function(lineHeight) {
        //mContent.style.lineHeight = lineHeight + "px";
    };

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

function EditText() {
    ViewGroup.apply(this, []);

    var mTag = "EditText" + (new Date()).getTime();

    var mSelf = this;
    var mFocusListener = null;
    var mInput;
    var mTextSize = 12;
    var mIsPassword = false;
    var mTextListener = null;

    this.setDisabled = function(disabled) {
        if (disabled) {
            mInput.disabled = "disabled";
        } else {
            mInput.disabled = "";
        }
    };

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

    this.setOnFocusChangeListener = function(l) {
        mFocusListener = l;
    };

    this.onFocusChanged = function(focused) {
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

    this.setSelection = function(start, end) {
        mInput.selectionStart = start;
        if (end == undefined) {
            mInput.selectionEnd = start;
        } else {
            mInput.selectionEnd = end;
        }
    };

    this.getSelectionStart = function() {
        return mInput.selectionStart;
    };

    this.getSelectionEnd = function() {
        return mInput.selectionEnd;
    };

    this.setTextChangedListener = function(listener) {
        mTextListener = listener;
        mInput.oninput = listener;
    };

    this.getText = function() {
        return mInput.value;
    };

    this.setText = function(text) {
        mInput.value = text;
    };

    this.setTextSize = function(size) {
        mTextSize = size;
        mInput.style.fontSize = size + "px";
    };

    this.setTextColor = function(color) {
        mInput.style.color = Utils.toCssColor(color);
    };

    this.setHint = function(text) {
        this.setHintText(text);
    };

    this.setHintText = function(text) {
        mInput.placeholder = text;
    };

    this.setHintColor = function(color) {
        var css = document.createElement("style");
        css.innerHTML = "." + mTag + "::-webkit-input-placeholder{ color:" + Utils.toCssColor(color) + "}";
        document.head.appendChild(css);
        mInput.className += mTag + " ";
    };

    this.requestFocus = function() {
        mInput.focus();
    };

    this.onMeasure = function(widthMS, heightMS) {
        var width = MeasureSpec.getSize(widthMS);
        var height = MeasureSpec.getSize(heightMS);
        var hMode = MeasureSpec.getMode(height);

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

YUI.add("yuidoc-meta", function(Y) {
   Y.YUIDoc = { meta: {
    "classes": [
        "View"
    ],
    "modules": [],
    "allModules": []
} };
});
YUI.add('api-filter', function (Y) {

Y.APIFilter = Y.Base.create('apiFilter', Y.Base, [Y.AutoCompleteBase], {
    // -- Initializer ----------------------------------------------------------
    initializer: function () {
        this._bindUIACBase();
        this._syncUIACBase();
    },
    getDisplayName: function(name) {

        Y.each(Y.YUIDoc.meta.allModules, function(i) {
            if (i.name === name && i.displayName) {
                name = i.displayName;
            }
        });

        return name;
    }

}, {
    // -- Attributes -----------------------------------------------------------
    ATTRS: {
        resultHighlighter: {
            value: 'phraseMatch'
        },

        // May be set to "classes" or "modules".
        queryType: {
            value: 'classes'
        },

        source: {
            valueFn: function() {
                var self = this;
                return function(q) {
                    var data = Y.YUIDoc.meta[self.get('queryType')],
                        out = [];
                    Y.each(data, function(v) {
                        if (v.toLowerCase().indexOf(q.toLowerCase()) > -1) {
                            out.push(v);
                        }
                    });
                    return out;
                };
            }
        }
    }
});

}, '3.4.0', {requires: [
    'autocomplete-base', 'autocomplete-highlighters', 'autocomplete-sources'
]});

YUI.add('api-list', function (Y) {

var Lang   = Y.Lang,
    YArray = Y.Array,

    APIList = Y.namespace('APIList'),

    classesNode    = Y.one('#api-classes'),
    inputNode      = Y.one('#api-filter'),
    modulesNode    = Y.one('#api-modules'),
    tabviewNode    = Y.one('#api-tabview'),

    tabs = APIList.tabs = {},

    filter = APIList.filter = new Y.APIFilter({
        inputNode : inputNode,
        maxResults: 1000,

        on: {
            results: onFilterResults
        }
    }),

    search = APIList.search = new Y.APISearch({
        inputNode : inputNode,
        maxResults: 100,

        on: {
            clear  : onSearchClear,
            results: onSearchResults
        }
    }),

    tabview = APIList.tabview = new Y.TabView({
        srcNode  : tabviewNode,
        panelNode: '#api-tabview-panel',
        render   : true,

        on: {
            selectionChange: onTabSelectionChange
        }
    }),

    focusManager = APIList.focusManager = tabviewNode.plug(Y.Plugin.NodeFocusManager, {
        circular   : true,
        descendants: '#api-filter, .yui3-tab-panel-selected .api-list-item a, .yui3-tab-panel-selected .result a',
        keys       : {next: 'down:40', previous: 'down:38'}
    }).focusManager,

    LIST_ITEM_TEMPLATE =
        '<li class="api-list-item {typeSingular}">' +
            '<a href="{rootPath}{typePlural}/{name}.html">{displayName}</a>' +
        '</li>';

// -- Init ---------------------------------------------------------------------

// Duckpunch FocusManager's key event handling to prevent it from handling key
// events when a modifier is pressed.
Y.before(function (e, activeDescendant) {
    if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) {
        return new Y.Do.Prevent();
    }
}, focusManager, '_focusPrevious', focusManager);

Y.before(function (e, activeDescendant) {
    if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) {
        return new Y.Do.Prevent();
    }
}, focusManager, '_focusNext', focusManager);

// Create a mapping of tabs in the tabview so we can refer to them easily later.
tabview.each(function (tab, index) {
    var name = tab.get('label').toLowerCase();

    tabs[name] = {
        index: index,
        name : name,
        tab  : tab
    };
});

// Switch tabs on Ctrl/Cmd-Left/Right arrows.
tabviewNode.on('key', onTabSwitchKey, 'down:37,39');

// Focus the filter input when the `/` key is pressed.
Y.one(Y.config.doc).on('key', onSearchKey, 'down:83');

// Keep the Focus Manager up to date.
inputNode.on('focus', function () {
    focusManager.set('activeDescendant', inputNode);
});

// Update all tabview links to resolved URLs.
tabview.get('panelNode').all('a').each(function (link) {
    link.setAttribute('href', link.get('href'));
});

// -- Private Functions --------------------------------------------------------
function getFilterResultNode() {
    return filter.get('queryType') === 'classes' ? classesNode : modulesNode;
}

// -- Event Handlers -----------------------------------------------------------
function onFilterResults(e) {
    var frag         = Y.one(Y.config.doc.createDocumentFragment()),
        resultNode   = getFilterResultNode(),
        typePlural   = filter.get('queryType'),
        typeSingular = typePlural === 'classes' ? 'class' : 'module';

    if (e.results.length) {
        YArray.each(e.results, function (result) {
            frag.append(Lang.sub(LIST_ITEM_TEMPLATE, {
                rootPath    : APIList.rootPath,
                displayName : filter.getDisplayName(result.highlighted),
                name        : result.text,
                typePlural  : typePlural,
                typeSingular: typeSingular
            }));
        });
    } else {
        frag.append(
            '<li class="message">' +
                'No ' + typePlural + ' found.' +
            '</li>'
        );
    }

    resultNode.empty(true);
    resultNode.append(frag);

    focusManager.refresh();
}

function onSearchClear(e) {

    focusManager.refresh();
}

function onSearchKey(e) {
    var target = e.target;

    if (target.test('input,select,textarea')
            || target.get('isContentEditable')) {
        return;
    }

    e.preventDefault();

    inputNode.focus();
    focusManager.refresh();
}

function onSearchResults(e) {
    var frag = Y.one(Y.config.doc.createDocumentFragment());

    if (e.results.length) {
        YArray.each(e.results, function (result) {
            frag.append(result.display);
        });
    } else {
        frag.append(
            '<li class="message">' +
                'No results found. Maybe you\'ll have better luck with a ' +
                'different query?' +
            '</li>'
        );
    }


    focusManager.refresh();
}

function onTabSelectionChange(e) {
    var tab  = e.newVal,
        name = tab.get('label').toLowerCase();

    tabs.selected = {
        index: tab.get('index'),
        name : name,
        tab  : tab
    };

    switch (name) {
    case 'classes': // fallthru
    case 'modules':
        filter.setAttrs({
            minQueryLength: 0,
            queryType     : name
        });

        search.set('minQueryLength', -1);

        // Only send a request if this isn't the initially-selected tab.
        if (e.prevVal) {
            filter.sendRequest(filter.get('value'));
        }
        break;

    case 'everything':
        filter.set('minQueryLength', -1);
        search.set('minQueryLength', 1);

        if (search.get('value')) {
            search.sendRequest(search.get('value'));
        } else {
            inputNode.focus();
        }
        break;

    default:
        // WTF? We shouldn't be here!
        filter.set('minQueryLength', -1);
        search.set('minQueryLength', -1);
    }

    if (focusManager) {
        setTimeout(function () {
            focusManager.refresh();
        }, 1);
    }
}

function onTabSwitchKey(e) {
    var currentTabIndex = tabs.selected.index;

    if (!(e.ctrlKey || e.metaKey)) {
        return;
    }

    e.preventDefault();

    switch (e.keyCode) {
    case 37: // left arrow
        if (currentTabIndex > 0) {
            tabview.selectChild(currentTabIndex - 1);
            inputNode.focus();
        }
        break;

    case 39: // right arrow
        if (currentTabIndex < (Y.Object.size(tabs) - 2)) {
            tabview.selectChild(currentTabIndex + 1);
            inputNode.focus();
        }
        break;
    }
}

}, '3.4.0', {requires: [
    'api-filter', 'api-search', 'event-key', 'node-focusmanager', 'tabview'
]});

YUI.add('api-search', function (Y) {

var Lang   = Y.Lang,
    Node   = Y.Node,
    YArray = Y.Array;

Y.APISearch = Y.Base.create('apiSearch', Y.Base, [Y.AutoCompleteBase], {
    // -- Public Properties ----------------------------------------------------
    RESULT_TEMPLATE:
        '<li class="result {resultType}">' +
            '<a href="{url}">' +
                '<h3 class="title">{name}</h3>' +
                '<span class="type">{resultType}</span>' +
                '<div class="description">{description}</div>' +
                '<span class="className">{class}</span>' +
            '</a>' +
        '</li>',

    // -- Initializer ----------------------------------------------------------
    initializer: function () {
        this._bindUIACBase();
        this._syncUIACBase();
    },

    // -- Protected Methods ----------------------------------------------------
    _apiResultFilter: function (query, results) {
        // Filter components out of the results.
        return YArray.filter(results, function (result) {
            return result.raw.resultType === 'component' ? false : result;
        });
    },

    _apiResultFormatter: function (query, results) {
        return YArray.map(results, function (result) {
            var raw  = Y.merge(result.raw), // create a copy
                desc = raw.description || '';

            // Convert description to text and truncate it if necessary.
            desc = Node.create('<div>' + desc + '</div>').get('text');

            if (desc.length > 65) {
                desc = Y.Escape.html(desc.substr(0, 65)) + ' &hellip;';
            } else {
                desc = Y.Escape.html(desc);
            }

            raw['class'] || (raw['class'] = '');
            raw.description = desc;

            // Use the highlighted result name.
            raw.name = result.highlighted;

            return Lang.sub(this.RESULT_TEMPLATE, raw);
        }, this);
    },

    _apiTextLocator: function (result) {
        return result.displayName || result.name;
    }
}, {
    // -- Attributes -----------------------------------------------------------
    ATTRS: {
        resultFormatter: {
            valueFn: function () {
                return this._apiResultFormatter;
            }
        },

        resultFilters: {
            valueFn: function () {
                return this._apiResultFilter;
            }
        },

        resultHighlighter: {
            value: 'phraseMatch'
        },

        resultListLocator: {
            value: 'data.results'
        },

        resultTextLocator: {
            valueFn: function () {
                return this._apiTextLocator;
            }
        },

        source: {
            value: '/api/v1/search?q={query}&count={maxResults}'
        }
    }
});

}, '3.4.0', {requires: [
    'autocomplete-base', 'autocomplete-highlighters', 'autocomplete-sources',
    'escape'
]});

YUI().use(
    'yuidoc-meta',
    'api-list', 'history-hash', 'node-screen', 'node-style', 'pjax',
function (Y) {

var win          = Y.config.win,
    localStorage = win.localStorage,

    bdNode = Y.one('#bd'),

    pjax,
    defaultRoute,

    classTabView,
    selectedTab;

// Kill pjax functionality unless serving over HTTP.
if (!Y.getLocation().protocol.match(/^https?\:/)) {
    Y.Router.html5 = false;
}

// Create the default route with middleware which enables syntax highlighting
// on the loaded content.
defaultRoute = Y.Pjax.defaultRoute.concat(function (req, res, next) {
    prettyPrint();
    bdNode.removeClass('loading');

    next();
});

pjax = new Y.Pjax({
    container      : '#docs-main',
    contentSelector: '#docs-main > .content',
    linkSelector   : '#bd a',
    titleSelector  : '#xhr-title',

    navigateOnHash: true,
    root          : '/',
    routes        : [
        // -- / ----------------------------------------------------------------
        {
            path     : '/(index.html)?',
            callbacks: defaultRoute
        },

        // -- /classes/* -------------------------------------------------------
        {
            path     : '/classes/:class.html*',
            callbacks: [defaultRoute, 'handleClasses']
        },

        // -- /files/* ---------------------------------------------------------
        {
            path     : '/files/*file',
            callbacks: [defaultRoute, 'handleFiles']
        },

        // -- /modules/* -------------------------------------------------------
        {
            path     : '/modules/:module.html*',
            callbacks: defaultRoute
        }
    ]
});

// -- Utility Functions --------------------------------------------------------

pjax.checkVisibility = function (tab) {
    tab || (tab = selectedTab);

    if (!tab) { return; }

    var panelNode = tab.get('panelNode'),
        visibleItems;

    // If no items are visible in the tab panel due to the current visibility
    // settings, display a message to that effect.
    visibleItems = panelNode.all('.item,.index-item').some(function (itemNode) {
        if (itemNode.getComputedStyle('display') !== 'none') {
            return true;
        }
    });

    panelNode.all('.no-visible-items').remove();

    if (!visibleItems) {
        if (Y.one('#index .index-item')) {
            panelNode.append(
                '<div class="no-visible-items">' +
                    '<p>' +
                    'Some items are not shown due to the current visibility ' +
                    'settings. Use the checkboxes at the upper right of this ' +
                    'page to change the visibility settings.' +
                    '</p>' +
                '</div>'
            );
        } else {
            panelNode.append(
                '<div class="no-visible-items">' +
                    '<p>' +
                    'This class doesn\'t provide any methods, properties, ' +
                    'attributes, or events.' +
                    '</p>' +
                '</div>'
            );
        }
    }

    // Hide index sections without any visible items.
    Y.all('.index-section').each(function (section) {
        var items        = 0,
            visibleItems = 0;

        section.all('.index-item').each(function (itemNode) {
            items += 1;

            if (itemNode.getComputedStyle('display') !== 'none') {
                visibleItems += 1;
            }
        });

        section.toggleClass('hidden', !visibleItems);
        section.toggleClass('no-columns', visibleItems < 4);
    });
};

pjax.initClassTabView = function () {
    if (!Y.all('#classdocs .api-class-tab').size()) {
        return;
    }

    if (classTabView) {
        classTabView.destroy();
        selectedTab = null;
    }

    classTabView = new Y.TabView({
        srcNode: '#classdocs',

        on: {
            selectionChange: pjax.onTabSelectionChange
        }
    });

    pjax.updateTabState();
    classTabView.render();
};

pjax.initLineNumbers = function () {
    var hash      = win.location.hash.substring(1),
        container = pjax.get('container'),
        hasLines, node;

    // Add ids for each line number in the file source view.
    container.all('.linenums>li').each(function (lineNode, index) {
        lineNode.set('id', 'l' + (index + 1));
        lineNode.addClass('file-line');
        hasLines = true;
    });

    // Scroll to the desired line.
    if (hasLines && /^l\d+$/.test(hash)) {
        if ((node = container.getById(hash))) {
            win.scroll(0, node.getY());
        }
    }
};

pjax.initRoot = function () {
    var terminators = /^(?:classes|files|modules)$/,
        parts       = pjax._getPathRoot().split('/'),
        root        = [],
        i, len, part;

    for (i = 0, len = parts.length; i < len; i += 1) {
        part = parts[i];

        if (part.match(terminators)) {
            // Makes sure the path will end with a "/".
            root.push('');
            break;
        }

        root.push(part);
    }

    pjax.set('root', root.join('/'));
};

pjax.updateTabState = function (src) {
    var hash = win.location.hash.substring(1),
        defaultTab, node, tab, tabPanel;

    function scrollToNode() {
        if (node.hasClass('protected')) {
            Y.one('#api-show-protected').set('checked', true);
            pjax.updateVisibility();
        }

        if (node.hasClass('private')) {
            Y.one('#api-show-private').set('checked', true);
            pjax.updateVisibility();
        }

        setTimeout(function () {
            // For some reason, unless we re-get the node instance here,
            // getY() always returns 0.
            var node = Y.one('#classdocs').getById(hash);
            win.scrollTo(0, node.getY() - 70);
        }, 1);
    }

    if (!classTabView) {
        return;
    }

    if (src === 'hashchange' && !hash) {
        defaultTab = 'index';
    } else {
        if (localStorage) {
            defaultTab = localStorage.getItem('tab_' + pjax.getPath()) ||
                'index';
        } else {
            defaultTab = 'index';
        }
    }

    if (hash && (node = Y.one('#classdocs').getById(hash))) {
        if ((tabPanel = node.ancestor('.api-class-tabpanel', true))) {
            if ((tab = Y.one('#classdocs .api-class-tab.' + tabPanel.get('id')))) {
                if (classTabView.get('rendered')) {
                    Y.Widget.getByNode(tab).set('selected', 1);
                } else {
                    tab.addClass('yui3-tab-selected');
                }
            }
        }

        // Scroll to the desired element if this is a hash URL.
        if (node) {
            if (classTabView.get('rendered')) {
                scrollToNode();
            } else {
                classTabView.once('renderedChange', scrollToNode);
            }
        }
    } else {
        tab = Y.one('#classdocs .api-class-tab.' + defaultTab);

        // When the `defaultTab` node isn't found, `localStorage` is stale.
        if (!tab && defaultTab !== 'index') {
            tab = Y.one('#classdocs .api-class-tab.index');
        }

        if (classTabView.get('rendered')) {
            Y.Widget.getByNode(tab).set('selected', 1);
        } else {
            tab.addClass('yui3-tab-selected');
        }
    }
};

pjax.updateVisibility = function () {
    var container = pjax.get('container');

    container.toggleClass('hide-inherited',
            !Y.one('#api-show-inherited').get('checked'));

    container.toggleClass('show-deprecated',
            Y.one('#api-show-deprecated').get('checked'));

    container.toggleClass('show-protected',
            Y.one('#api-show-protected').get('checked'));

    container.toggleClass('show-private',
            Y.one('#api-show-private').get('checked'));

    pjax.checkVisibility();
};

// -- Route Handlers -----------------------------------------------------------

pjax.handleClasses = function (req, res, next) {
    var status = res.ioResponse.status;

    // Handles success and local filesystem XHRs.
    if (res.ioResponse.readyState === 4 && (!status || (status >= 200 && status < 300))) {
        pjax.initClassTabView();
    }

    next();
};

pjax.handleFiles = function (req, res, next) {
    var status = res.ioResponse.status;

    // Handles success and local filesystem XHRs.
    if (res.ioResponse.readyState === 4 && (!status || (status >= 200 && status < 300))) {
        pjax.initLineNumbers();
    }

    next();
};

// -- Event Handlers -----------------------------------------------------------

pjax.onNavigate = function (e) {
    var hash         = e.hash,
        originTarget = e.originEvent && e.originEvent.target,
        tab;

    if (hash) {
        tab = originTarget && originTarget.ancestor('.yui3-tab', true);

        if (hash === win.location.hash) {
            pjax.updateTabState('hashchange');
        } else if (!tab) {
            win.location.hash = hash;
        }

        e.preventDefault();
        return;
    }

    // Only scroll to the top of the page when the URL doesn't have a hash.
    this.set('scrollToTop', !e.url.match(/#.+$/));

    bdNode.addClass('loading');
};

pjax.onOptionClick = function (e) {
    pjax.updateVisibility();
};

pjax.onTabSelectionChange = function (e) {
    var tab   = e.newVal,
        tabId = tab.get('contentBox').getAttribute('href').substring(1);

    selectedTab = tab;

    // If switching from a previous tab (i.e., this is not the default tab),
    // replace the history entry with a hash URL that will cause this tab to
    // be selected if the user navigates away and then returns using the back
    // or forward buttons.
    if (e.prevVal && localStorage) {
        localStorage.setItem('tab_' + pjax.getPath(), tabId);
    }

    pjax.checkVisibility(tab);
};

// -- Init ---------------------------------------------------------------------

pjax.on('navigate', pjax.onNavigate);

pjax.initRoot();
pjax.upgrade();
pjax.initClassTabView();
pjax.initLineNumbers();
pjax.updateVisibility();

Y.APIList.rootPath = pjax.get('root');

Y.one('#api-options').delegate('click', pjax.onOptionClick, 'input');

Y.on('hashchange', function (e) {
    pjax.updateTabState('hashchange');
}, win);

});

YUI().use('node', function(Y) {
    var code = Y.all('.prettyprint.linenums');
    if (code.size()) {
        code.each(function(c) {
            var lis = c.all('ol li'),
                l = 1;
            lis.each(function(n) {
                n.prepend('<a name="LINENUM_' + l + '"></a>');
                l++;
            });
        });
        var h = location.hash;
        location.hash = '';
        h = h.replace('LINE_', 'LINENUM_');
        location.hash = h;
    }
});

window.PR_SHOULD_USE_CONTINUATION=true;var prettyPrintOne;var prettyPrint;(function(){var O=window;var j=["break,continue,do,else,for,if,return,while"];var v=[j,"auto,case,char,const,default,double,enum,extern,float,goto,int,long,register,short,signed,sizeof,static,struct,switch,typedef,union,unsigned,void,volatile"];var q=[v,"catch,class,delete,false,import,new,operator,private,protected,public,this,throw,true,try,typeof"];var m=[q,"alignof,align_union,asm,axiom,bool,concept,concept_map,const_cast,constexpr,decltype,dynamic_cast,explicit,export,friend,inline,late_check,mutable,namespace,nullptr,reinterpret_cast,static_assert,static_cast,template,typeid,typename,using,virtual,where"];var y=[q,"abstract,boolean,byte,extends,final,finally,implements,import,instanceof,null,native,package,strictfp,super,synchronized,throws,transient"];var T=[y,"as,base,by,checked,decimal,delegate,descending,dynamic,event,fixed,foreach,from,group,implicit,in,interface,internal,into,is,let,lock,object,out,override,orderby,params,partial,readonly,ref,sbyte,sealed,stackalloc,string,select,uint,ulong,unchecked,unsafe,ushort,var,virtual,where"];var s="all,and,by,catch,class,else,extends,false,finally,for,if,in,is,isnt,loop,new,no,not,null,of,off,on,or,return,super,then,throw,true,try,unless,until,when,while,yes";var x=[q,"debugger,eval,export,function,get,null,set,undefined,var,with,Infinity,NaN"];var t="caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END";var J=[j,"and,as,assert,class,def,del,elif,except,exec,finally,from,global,import,in,is,lambda,nonlocal,not,or,pass,print,raise,try,with,yield,False,True,None"];var g=[j,"alias,and,begin,case,class,def,defined,elsif,end,ensure,false,in,module,next,nil,not,or,redo,rescue,retry,self,super,then,true,undef,unless,until,when,yield,BEGIN,END"];var I=[j,"case,done,elif,esac,eval,fi,function,in,local,set,then,until"];var B=[m,T,x,t+J,g,I];var f=/^(DIR|FILE|vector|(de|priority_)?queue|list|stack|(const_)?iterator|(multi)?(set|map)|bitset|u?(int|float)\d*)\b/;var D="str";var A="kwd";var k="com";var Q="typ";var H="lit";var M="pun";var G="pln";var n="tag";var F="dec";var K="src";var R="atn";var o="atv";var P="nocode";var N="(?:^^\\.?|[+-]|[!=]=?=?|\\#|%=?|&&?=?|\\(|\\*=?|[+\\-]=|->|\\/=?|::?|<<?=?|>>?>?=?|,|;|\\?|@|\\[|~|{|\\^\\^?=?|\\|\\|?=?|break|case|continue|delete|do|else|finally|instanceof|return|throw|try|typeof)\\s*";function l(ab){var af=0;var U=false;var ae=false;for(var X=0,W=ab.length;X<W;++X){var ag=ab[X];if(ag.ignoreCase){ae=true}else{if(/[a-z]/i.test(ag.source.replace(/\\u[0-9a-f]{4}|\\x[0-9a-f]{2}|\\[^ux]/gi,""))){U=true;ae=false;break}}}var aa={b:8,t:9,n:10,v:11,f:12,r:13};function ad(aj){var ai=aj.charCodeAt(0);if(ai!==92){return ai}var ah=aj.charAt(1);ai=aa[ah];if(ai){return ai}else{if("0"<=ah&&ah<="7"){return parseInt(aj.substring(1),8)}else{if(ah==="u"||ah==="x"){return parseInt(aj.substring(2),16)}else{return aj.charCodeAt(1)}}}}function V(ah){if(ah<32){return(ah<16?"\\x0":"\\x")+ah.toString(16)}var ai=String.fromCharCode(ah);return(ai==="\\"||ai==="-"||ai==="]"||ai==="^")?"\\"+ai:ai}function Z(an){var ar=an.substring(1,an.length-1).match(new RegExp("\\\\u[0-9A-Fa-f]{4}|\\\\x[0-9A-Fa-f]{2}|\\\\[0-3][0-7]{0,2}|\\\\[0-7]{1,2}|\\\\[\\s\\S]|-|[^-\\\\]","g"));var ah=[];var ap=ar[0]==="^";var ao=["["];if(ap){ao.push("^")}for(var at=ap?1:0,al=ar.length;at<al;++at){var aj=ar[at];if(/\\[bdsw]/i.test(aj)){ao.push(aj)}else{var ai=ad(aj);var am;if(at+2<al&&"-"===ar[at+1]){am=ad(ar[at+2]);at+=2}else{am=ai}ah.push([ai,am]);if(!(am<65||ai>122)){if(!(am<65||ai>90)){ah.push([Math.max(65,ai)|32,Math.min(am,90)|32])}if(!(am<97||ai>122)){ah.push([Math.max(97,ai)&~32,Math.min(am,122)&~32])}}}}ah.sort(function(aw,av){return(aw[0]-av[0])||(av[1]-aw[1])});var ak=[];var aq=[];for(var at=0;at<ah.length;++at){var au=ah[at];if(au[0]<=aq[1]+1){aq[1]=Math.max(aq[1],au[1])}else{ak.push(aq=au)}}for(var at=0;at<ak.length;++at){var au=ak[at];ao.push(V(au[0]));if(au[1]>au[0]){if(au[1]+1>au[0]){ao.push("-")}ao.push(V(au[1]))}}ao.push("]");return ao.join("")}function Y(an){var al=an.source.match(new RegExp("(?:\\[(?:[^\\x5C\\x5D]|\\\\[\\s\\S])*\\]|\\\\u[A-Fa-f0-9]{4}|\\\\x[A-Fa-f0-9]{2}|\\\\[0-9]+|\\\\[^ux0-9]|\\(\\?[:!=]|[\\(\\)\\^]|[^\\x5B\\x5C\\(\\)\\^]+)","g"));var aj=al.length;var ap=[];for(var am=0,ao=0;am<aj;++am){var ai=al[am];if(ai==="("){++ao}else{if("\\"===ai.charAt(0)){var ah=+ai.substring(1);if(ah){if(ah<=ao){ap[ah]=-1}else{al[am]=V(ah)}}}}}for(var am=1;am<ap.length;++am){if(-1===ap[am]){ap[am]=++af}}for(var am=0,ao=0;am<aj;++am){var ai=al[am];if(ai==="("){++ao;if(!ap[ao]){al[am]="(?:"}}else{if("\\"===ai.charAt(0)){var ah=+ai.substring(1);if(ah&&ah<=ao){al[am]="\\"+ap[ah]}}}}for(var am=0;am<aj;++am){if("^"===al[am]&&"^"!==al[am+1]){al[am]=""}}if(an.ignoreCase&&U){for(var am=0;am<aj;++am){var ai=al[am];var ak=ai.charAt(0);if(ai.length>=2&&ak==="["){al[am]=Z(ai)}else{if(ak!=="\\"){al[am]=ai.replace(/[a-zA-Z]/g,function(aq){var ar=aq.charCodeAt(0);return"["+String.fromCharCode(ar&~32,ar|32)+"]"})}}}}return al.join("")}var ac=[];for(var X=0,W=ab.length;X<W;++X){var ag=ab[X];if(ag.global||ag.multiline){throw new Error(""+ag)}ac.push("(?:"+Y(ag)+")")}return new RegExp(ac.join("|"),ae?"gi":"g")}function b(aa,Y){var W=/(?:^|\s)nocode(?:\s|$)/;var ab=[];var Z=0;var X=[];var V=0;function U(ac){switch(ac.nodeType){case 1:if(W.test(ac.className)){return}for(var af=ac.firstChild;af;af=af.nextSibling){U(af)}var ae=ac.nodeName.toLowerCase();if("br"===ae||"li"===ae){ab[V]="\n";X[V<<1]=Z++;X[(V++<<1)|1]=ac}break;case 3:case 4:var ad=ac.nodeValue;if(ad.length){if(!Y){ad=ad.replace(/[ \t\r\n]+/g," ")}else{ad=ad.replace(/\r\n?/g,"\n")}ab[V]=ad;X[V<<1]=Z;Z+=ad.length;X[(V++<<1)|1]=ac}break}}U(aa);return{sourceCode:ab.join("").replace(/\n$/,""),spans:X}}function C(U,W,Y,V){if(!W){return}var X={sourceCode:W,basePos:U};Y(X);V.push.apply(V,X.decorations)}var w=/\S/;function p(U){var X=undefined;for(var W=U.firstChild;W;W=W.nextSibling){var V=W.nodeType;X=(V===1)?(X?U:W):(V===3)?(w.test(W.nodeValue)?U:X):X}return X===U?undefined:X}function h(W,V){var U={};var X;(function(){var af=W.concat(V);var aj=[];var ai={};for(var ad=0,ab=af.length;ad<ab;++ad){var aa=af[ad];var ae=aa[3];if(ae){for(var ag=ae.length;--ag>=0;){U[ae.charAt(ag)]=aa}}var ah=aa[1];var ac=""+ah;if(!ai.hasOwnProperty(ac)){aj.push(ah);ai[ac]=null}}aj.push(/[\0-\uffff]/);X=l(aj)})();var Z=V.length;var Y=function(aj){var ab=aj.sourceCode,aa=aj.basePos;var af=[aa,G];var ah=0;var ap=ab.match(X)||[];var al={};for(var ag=0,at=ap.length;ag<at;++ag){var ai=ap[ag];var ar=al[ai];var ak=void 0;var ao;if(typeof ar==="string"){ao=false}else{var ac=U[ai.charAt(0)];if(ac){ak=ai.match(ac[1]);ar=ac[0]}else{for(var aq=0;aq<Z;++aq){ac=V[aq];ak=ai.match(ac[1]);if(ak){ar=ac[0];break}}if(!ak){ar=G}}ao=ar.length>=5&&"lang-"===ar.substring(0,5);if(ao&&!(ak&&typeof ak[1]==="string")){ao=false;ar=K}if(!ao){al[ai]=ar}}var ad=ah;ah+=ai.length;if(!ao){af.push(aa+ad,ar)}else{var an=ak[1];var am=ai.indexOf(an);var ae=am+an.length;if(ak[2]){ae=ai.length-ak[2].length;am=ae-an.length}var au=ar.substring(5);C(aa+ad,ai.substring(0,am),Y,af);C(aa+ad+am,an,r(au,an),af);C(aa+ad+ae,ai.substring(ae),Y,af)}}aj.decorations=af};return Y}function i(V){var Y=[],U=[];if(V.tripleQuotedStrings){Y.push([D,/^(?:\'\'\'(?:[^\'\\]|\\[\s\S]|\'{1,2}(?=[^\']))*(?:\'\'\'|$)|\"\"\"(?:[^\"\\]|\\[\s\S]|\"{1,2}(?=[^\"]))*(?:\"\"\"|$)|\'(?:[^\\\']|\\[\s\S])*(?:\'|$)|\"(?:[^\\\"]|\\[\s\S])*(?:\"|$))/,null,"'\""])}else{if(V.multiLineStrings){Y.push([D,/^(?:\'(?:[^\\\']|\\[\s\S])*(?:\'|$)|\"(?:[^\\\"]|\\[\s\S])*(?:\"|$)|\`(?:[^\\\`]|\\[\s\S])*(?:\`|$))/,null,"'\"`"])}else{Y.push([D,/^(?:\'(?:[^\\\'\r\n]|\\.)*(?:\'|$)|\"(?:[^\\\"\r\n]|\\.)*(?:\"|$))/,null,"\"'"])}}if(V.verbatimStrings){U.push([D,/^@\"(?:[^\"]|\"\")*(?:\"|$)/,null])}var ab=V.hashComments;if(ab){if(V.cStyleComments){if(ab>1){Y.push([k,/^#(?:##(?:[^#]|#(?!##))*(?:###|$)|.*)/,null,"#"])}else{Y.push([k,/^#(?:(?:define|e(?:l|nd)if|else|error|ifn?def|include|line|pragma|undef|warning)\b|[^\r\n]*)/,null,"#"])}U.push([D,/^<(?:(?:(?:\.\.\/)*|\/?)(?:[\w-]+(?:\/[\w-]+)+)?[\w-]+\.h(?:h|pp|\+\+)?|[a-z]\w*)>/,null])}else{Y.push([k,/^#[^\r\n]*/,null,"#"])}}if(V.cStyleComments){U.push([k,/^\/\/[^\r\n]*/,null]);U.push([k,/^\/\*[\s\S]*?(?:\*\/|$)/,null])}if(V.regexLiterals){var aa=("/(?=[^/*])(?:[^/\\x5B\\x5C]|\\x5C[\\s\\S]|\\x5B(?:[^\\x5C\\x5D]|\\x5C[\\s\\S])*(?:\\x5D|$))+/");U.push(["lang-regex",new RegExp("^"+N+"("+aa+")")])}var X=V.types;if(X){U.push([Q,X])}var W=(""+V.keywords).replace(/^ | $/g,"");if(W.length){U.push([A,new RegExp("^(?:"+W.replace(/[\s,]+/g,"|")+")\\b"),null])}Y.push([G,/^\s+/,null," \r\n\t\xA0"]);var Z=/^.[^\s\w\.$@\'\"\`\/\\]*/;U.push([H,/^@[a-z_$][a-z_$@0-9]*/i,null],[Q,/^(?:[@_]?[A-Z]+[a-z][A-Za-z_$@0-9]*|\w+_t\b)/,null],[G,/^[a-z_$][a-z_$@0-9]*/i,null],[H,new RegExp("^(?:0x[a-f0-9]+|(?:\\d(?:_\\d+)*\\d*(?:\\.\\d*)?|\\.\\d\\+)(?:e[+\\-]?\\d+)?)[a-z]*","i"),null,"0123456789"],[G,/^\\[\s\S]?/,null],[M,Z,null]);return h(Y,U)}var L=i({keywords:B,hashComments:true,cStyleComments:true,multiLineStrings:true,regexLiterals:true});function S(W,ah,aa){var V=/(?:^|\s)nocode(?:\s|$)/;var ac=/\r\n?|\n/;var ad=W.ownerDocument;var ag=ad.createElement("li");while(W.firstChild){ag.appendChild(W.firstChild)}var X=[ag];function af(am){switch(am.nodeType){case 1:if(V.test(am.className)){break}if("br"===am.nodeName){ae(am);if(am.parentNode){am.parentNode.removeChild(am)}}else{for(var ao=am.firstChild;ao;ao=ao.nextSibling){af(ao)}}break;case 3:case 4:if(aa){var an=am.nodeValue;var ak=an.match(ac);if(ak){var aj=an.substring(0,ak.index);am.nodeValue=aj;var ai=an.substring(ak.index+ak[0].length);if(ai){var al=am.parentNode;al.insertBefore(ad.createTextNode(ai),am.nextSibling)}ae(am);if(!aj){am.parentNode.removeChild(am)}}}break}}function ae(al){while(!al.nextSibling){al=al.parentNode;if(!al){return}}function aj(am,at){var ar=at?am.cloneNode(false):am;var ap=am.parentNode;if(ap){var aq=aj(ap,1);var ao=am.nextSibling;aq.appendChild(ar);for(var an=ao;an;an=ao){ao=an.nextSibling;aq.appendChild(an)}}return ar}var ai=aj(al.nextSibling,0);for(var ak;(ak=ai.parentNode)&&ak.nodeType===1;){ai=ak}X.push(ai)}for(var Z=0;Z<X.length;++Z){af(X[Z])}if(ah===(ah|0)){X[0].setAttribute("value",ah)}var ab=ad.createElement("ol");ab.className="linenums";var Y=Math.max(0,((ah-1))|0)||0;for(var Z=0,U=X.length;Z<U;++Z){ag=X[Z];ag.className="L"+((Z+Y)%10);if(!ag.firstChild){ag.appendChild(ad.createTextNode("\xA0"))}ab.appendChild(ag)}W.appendChild(ab)}function E(af){var X=/\bMSIE\s(\d+)/.exec(navigator.userAgent);X=X&&+X[1]<=8;var ao=/\n/g;var an=af.sourceCode;var ap=an.length;var Y=0;var ad=af.spans;var V=ad.length;var aj=0;var aa=af.decorations;var ab=aa.length;var ac=0;aa[ab]=ap;var av,at;for(at=av=0;at<ab;){if(aa[at]!==aa[at+2]){aa[av++]=aa[at++];aa[av++]=aa[at++]}else{at+=2}}ab=av;for(at=av=0;at<ab;){var aw=aa[at];var ae=aa[at+1];var Z=at+2;while(Z+2<=ab&&aa[Z+1]===ae){Z+=2}aa[av++]=aw;aa[av++]=ae;at=Z}ab=aa.length=av;var au=af.sourceNode;var ak;if(au){ak=au.style.display;au.style.display="none"}try{var ah=null;while(aj<V){var ai=ad[aj];var U=ad[aj+2]||ap;var ar=aa[ac+2]||ap;var Z=Math.min(U,ar);var am=ad[aj+1];var W;if(am.nodeType!==1&&(W=an.substring(Y,Z))){if(X){W=W.replace(ao,"\r")}am.nodeValue=W;var al=am.ownerDocument;var aq=al.createElement("span");aq.className=aa[ac+1];var ag=am.parentNode;ag.replaceChild(aq,am);aq.appendChild(am);if(Y<U){ad[aj+1]=am=al.createTextNode(an.substring(Z,U));ag.insertBefore(am,aq.nextSibling)}}Y=Z;if(Y>=U){aj+=2}if(Y>=ar){ac+=2}}}finally{if(au){au.style.display=ak}}}var u={};function d(W,X){for(var U=X.length;--U>=0;){var V=X[U];if(!u.hasOwnProperty(V)){u[V]=W}else{if(O.console){console.warn("cannot override language handler %s",V)}}}}function r(V,U){if(!(V&&u.hasOwnProperty(V))){V=/^\s*</.test(U)?"default-markup":"default-code"}return u[V]}d(L,["default-code"]);d(h([],[[G,/^[^<?]+/],[F,/^<!\w[^>]*(?:>|$)/],[k,/^<\!--[\s\S]*?(?:-\->|$)/],["lang-",/^<\?([\s\S]+?)(?:\?>|$)/],["lang-",/^<%([\s\S]+?)(?:%>|$)/],[M,/^(?:<[%?]|[%?]>)/],["lang-",/^<xmp\b[^>]*>([\s\S]+?)<\/xmp\b[^>]*>/i],["lang-js",/^<script\b[^>]*>([\s\S]*?)(<\/script\b[^>]*>)/i],["lang-css",/^<style\b[^>]*>([\s\S]*?)(<\/style\b[^>]*>)/i],["lang-in.tag",/^(<\/?[a-z][^<>]*>)/i]]),["default-markup","htm","html","mxml","xhtml","xml","xsl"]);d(h([[G,/^[\s]+/,null," \t\r\n"],[o,/^(?:\"[^\"]*\"?|\'[^\']*\'?)/,null,"\"'"]],[[n,/^^<\/?[a-z](?:[\w.:-]*\w)?|\/?>$/i],[R,/^(?!style[\s=]|on)[a-z](?:[\w:-]*\w)?/i],["lang-uq.val",/^=\s*([^>\'\"\s]*(?:[^>\'\"\s\/]|\/(?=\s)))/],[M,/^[=<>\/]+/],["lang-js",/^on\w+\s*=\s*\"([^\"]+)\"/i],["lang-js",/^on\w+\s*=\s*\'([^\']+)\'/i],["lang-js",/^on\w+\s*=\s*([^\"\'>\s]+)/i],["lang-css",/^style\s*=\s*\"([^\"]+)\"/i],["lang-css",/^style\s*=\s*\'([^\']+)\'/i],["lang-css",/^style\s*=\s*([^\"\'>\s]+)/i]]),["in.tag"]);d(h([],[[o,/^[\s\S]+/]]),["uq.val"]);d(i({keywords:m,hashComments:true,cStyleComments:true,types:f}),["c","cc","cpp","cxx","cyc","m"]);d(i({keywords:"null,true,false"}),["json"]);d(i({keywords:T,hashComments:true,cStyleComments:true,verbatimStrings:true,types:f}),["cs"]);d(i({keywords:y,cStyleComments:true}),["java"]);d(i({keywords:I,hashComments:true,multiLineStrings:true}),["bsh","csh","sh"]);d(i({keywords:J,hashComments:true,multiLineStrings:true,tripleQuotedStrings:true}),["cv","py"]);d(i({keywords:t,hashComments:true,multiLineStrings:true,regexLiterals:true}),["perl","pl","pm"]);d(i({keywords:g,hashComments:true,multiLineStrings:true,regexLiterals:true}),["rb"]);d(i({keywords:x,cStyleComments:true,regexLiterals:true}),["js"]);d(i({keywords:s,hashComments:3,cStyleComments:true,multilineStrings:true,tripleQuotedStrings:true,regexLiterals:true}),["coffee"]);d(h([],[[D,/^[\s\S]+/]]),["regex"]);function e(X){var W=X.langExtension;try{var U=b(X.sourceNode,X.pre);var V=U.sourceCode;X.sourceCode=V;X.spans=U.spans;X.basePos=0;r(W,V)(X);E(X)}catch(Y){if(O.console){console.log(Y&&Y.stack?Y.stack:Y)}}}function z(Y,X,W){var U=document.createElement("pre");U.innerHTML=Y;if(W){S(U,W,true)}var V={langExtension:X,numberLines:W,sourceNode:U,pre:1};e(V);return U.innerHTML}function c(aj){function ab(al){return document.getElementsByTagName(al)}var ah=[ab("pre"),ab("code"),ab("xmp")];var V=[];for(var ae=0;ae<ah.length;++ae){for(var ac=0,Y=ah[ae].length;ac<Y;++ac){V.push(ah[ae][ac])}}ah=null;var Z=Date;if(!Z.now){Z={now:function(){return +(new Date)}}}var aa=0;var U;var af=/\blang(?:uage)?-([\w.]+)(?!\S)/;var ak=/\bprettyprint\b/;var W=/\bprettyprinted\b/;var ag=/pre|xmp/i;var ai=/^code$/i;var ad=/^(?:pre|code|xmp)$/i;function X(){var ar=(O.PR_SHOULD_USE_CONTINUATION?Z.now()+250:Infinity);for(;aa<V.length&&Z.now()<ar;aa++){var at=V[aa];var au=at.className;if(ak.test(au)&&!W.test(au)){var aw=false;for(var ao=at.parentNode;ao;ao=ao.parentNode){var ax=ao.tagName;if(ad.test(ax)&&ao.className&&ak.test(ao.className)){aw=true;break}}if(!aw){at.className+=" prettyprinted";var aq=au.match(af);var am;if(!aq&&(am=p(at))&&ai.test(am.tagName)){aq=am.className.match(af)}if(aq){aq=aq[1]}var ap;if(ag.test(at.tagName)){ap=1}else{var an=at.currentStyle;var al=(an?an.whiteSpace:(document.defaultView&&document.defaultView.getComputedStyle)?document.defaultView.getComputedStyle(at,null).getPropertyValue("white-space"):0);ap=al&&"pre"===al.substring(0,3)}var av=at.className.match(/\blinenums\b(?::(\d+))?/);av=av?av[1]&&av[1].length?+av[1]:true:false;if(av){S(at,av,ap)}U={langExtension:aq,sourceNode:at,numberLines:av,pre:ap};e(U)}}}if(aa<V.length){setTimeout(X,250)}else{if(aj){aj()}}}X()}var a=O.PR={createSimpleLexer:h,registerLangHandler:d,sourceDecorator:i,PR_ATTRIB_NAME:R,PR_ATTRIB_VALUE:o,PR_COMMENT:k,PR_DECLARATION:F,PR_KEYWORD:A,PR_LITERAL:H,PR_NOCODE:P,PR_PLAIN:G,PR_PUNCTUATION:M,PR_SOURCE:K,PR_STRING:D,PR_TAG:n,PR_TYPE:Q,prettyPrintOne:O.prettyPrintOne=z,prettyPrint:O.prettyPrint=c};if(typeof define==="function"&&define.amd){define("google-code-prettify",[],function(){return a})}})();PR.registerLangHandler(PR.createSimpleLexer([],[[PR.PR_DECLARATION,/^<!\w[^>]*(?:>|$)/],[PR.PR_COMMENT,/^<\!--[\s\S]*?(?:-\->|$)/],[PR.PR_PUNCTUATION,/^(?:<[%?]|[%?]>)/],["lang-",/^<\?([\s\S]+?)(?:\?>|$)/],["lang-",/^<%([\s\S]+?)(?:%>|$)/],["lang-",/^<xmp\b[^>]*>([\s\S]+?)<\/xmp\b[^>]*>/i],["lang-handlebars",/^<script\b[^>]*type\s*=\s*['"]?text\/x-handlebars-template['"]?\b[^>]*>([\s\S]*?)(<\/script\b[^>]*>)/i],["lang-js",/^<script\b[^>]*>([\s\S]*?)(<\/script\b[^>]*>)/i],["lang-css",/^<style\b[^>]*>([\s\S]*?)(<\/style\b[^>]*>)/i],["lang-in.tag",/^(<\/?[a-z][^<>]*>)/i],[PR.PR_DECLARATION,/^{{[#^>/]?\s*[\w.][^}]*}}/],[PR.PR_DECLARATION,/^{{&?\s*[\w.][^}]*}}/],[PR.PR_DECLARATION,/^{{{>?\s*[\w.][^}]*}}}/],[PR.PR_COMMENT,/^{{![^}]*}}/]]),["handlebars","hbs"]);PR.registerLangHandler(PR.createSimpleLexer([[PR.PR_PLAIN,/^[ \t\r\n\f]+/,null," \t\r\n\f"]],[[PR.PR_STRING,/^\"(?:[^\n\r\f\\\"]|\\(?:\r\n?|\n|\f)|\\[\s\S])*\"/,null],[PR.PR_STRING,/^\'(?:[^\n\r\f\\\']|\\(?:\r\n?|\n|\f)|\\[\s\S])*\'/,null],["lang-css-str",/^url\(([^\)\"\']*)\)/i],[PR.PR_KEYWORD,/^(?:url|rgb|\!important|@import|@page|@media|@charset|inherit)(?=[^\-\w]|$)/i,null],["lang-css-kw",/^(-?(?:[_a-z]|(?:\\[0-9a-f]+ ?))(?:[_a-z0-9\-]|\\(?:\\[0-9a-f]+ ?))*)\s*:/i],[PR.PR_COMMENT,/^\/\*[^*]*\*+(?:[^\/*][^*]*\*+)*\//],[PR.PR_COMMENT,/^(?:<!--|-->)/],[PR.PR_LITERAL,/^(?:\d+|\d*\.\d+)(?:%|[a-z]+)?/i],[PR.PR_LITERAL,/^#(?:[0-9a-f]{3}){1,2}/i],[PR.PR_PLAIN,/^-?(?:[_a-z]|(?:\\[\da-f]+ ?))(?:[_a-z\d\-]|\\(?:\\[\da-f]+ ?))*/i],[PR.PR_PUNCTUATION,/^[^\s\w\'\"]+/]]),["css"]);PR.registerLangHandler(PR.createSimpleLexer([],[[PR.PR_KEYWORD,/^-?(?:[_a-z]|(?:\\[\da-f]+ ?))(?:[_a-z\d\-]|\\(?:\\[\da-f]+ ?))*/i]]),["css-kw"]);PR.registerLangHandler(PR.createSimpleLexer([],[[PR.PR_STRING,/^[^\)\"\']+/]]),["css-str"]);