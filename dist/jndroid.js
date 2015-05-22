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

    this.getTag = function() {
        return mTag;
    };

    this.setTag = function(tag) {
        mTag = tag;
        mDiv.setAttribute("Tag", mTag);
    };

    this.getParent = function() {
        return mParent;
    };

    this.setParent = function(parent) {
        mParent = parent;
    };

    this.getDiv = function() {
        return mDiv;
    };

    this.getPaddingLeft = function() {
        return mPaddingLeft;
    };

    this.getPaddingTop = function() {
        return mPaddingTop;
    };

    this.getPaddingRight = function() {
        return mPaddingRight;
    };

    this.getPaddingBottom = function() {
        return mPaddingBottom;
    };

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

    this.getLayoutParams = function() {
        return mLayoutParams;
    };

    this.setLayoutParams = function(lp) {
        mLayoutParams = lp;
    };

    this.getLeft = function() {
        return mX;
    };

    this.getTop = function() {
        return mY;
    };

    this.getWidth = function() {
        return mWidth;
    };

    this.getHeight = function() {
        return mHeight;
    };

    this.getMeasuredWidth = function() {
        return mWidth;
    };

    this.getMeasuredHeight = function() {
        return mHeight;
    };

    this.getX = function() {
        return mX;
    };

    this.getY = function() {
        return mY;
    };

    this.measure = function(widthMS, heightMS) {
        mWidthMS = widthMS;
        mHeightMS = heightMS;
        this.onMeasure(widthMS, heightMS);
    };

    this.onMeasure = function(widthMS, heightMS) {
        this.setMeasuredDimension(MeasureSpec.getSize(widthMS), MeasureSpec.getSize(heightMS));
    };

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

    this.layout = function(x, y) {
        mX = x;
        mY = y;
        mDiv.style.left = x + "px";
        mDiv.style.top = y + "px";
        this.onLayout(x, y);
        this.invalidate();
    };

    this.onLayout = function(x, y) {

    };

    this.invalidateDrawable = function() {
        this.postInvalidate();
    };

    this.postInvalidate = function() {
        requestAnimationFrame(this.invalidate);
    };

    this.computeScroll = function() {

    };

    this.invalidate = function() {
        mSelf.draw();
    };

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

    this.onDraw = function(canvas) {

    };

    this.getWillNotDraw = function() {
        return mWillNotDraw;
    };

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

    this.setBackgroundColor = function(color) {
        mDiv.style.background = Utils.toCssColor(color);
    };

    this.setOnClickListener = function(l) {
        if (!mClickable) {
            this.setClickable(true);
        }
        mClickListener = l;
    };

    this.setOnLongClickListener = function(l) {
        if (!mLongClickable) {
            this.setLongClickable(true);
        }
        mLongClickListener = l;
    };

    this.setClickable = function(clickable) {
        mClickable = clickable;
        if (clickable) {
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

    this.setLongClickable = function(longClickable) {
        mLongClickable = longClickable;
    };

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

    this.requestFocus = function() {

    };

    this.onTouchEvent = function(ev) {

    };

    this.setAlpha = function(a) {
        mDiv.style.opacity = a;
    };

    this.getVisibility = function() {
        return mVisibility;
    };

    this.setVisibility = function(visibility) {
        mVisibility = visibility;
        if (mVisibility == View.VISIBLE) {
            this.getDiv().style.display = "block";
        } else {
            this.getDiv().style.display = "none";
        }
    };

    this.setAnimation = function(animation) {
        animation.setView(this);
    };

    this.startAnimation = function(animation) {
        animation.setView(this);
        animation.start();
    };

    this.postDelayed = function(r, delay) {
        var mSelf = this;
        var id = setTimeout(function() {
            r.call(mSelf);
        }, delay);
        mRunQueue.put(r, id);
    };

    this.removeCallbacks = function(r) {
        var id = mRunQueue.get(r);
        mRunQueue.remove(r);
        if (id !== undefined) {
            clearTimeout(id);
        }
    };

    this.performClick = function() {
        if (mClickListener !== null) {
            mClickListener.call(this);
        }
    };

    this.perfermLongClick = function() {
        if (mLongClickListener !== null) {
            mLongClickListener();
        }
        return true;
    };

    this.checkForLongClick = function() {
        if (mLongClickable) {
            mHasPerformedLongPress = false;

            this.postDelayed(this.checkLongPress, 500);
        }
    };

    this.checkLongPress = function() {
        if (this.perfermLongClick()) {
            mHasPerformedLongPress = true;
        }
    };

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

    this.setCornerSize = function(tlSize, trSize, brSize, blSize) {
        if (trSize == undefined && brSize == undefined && blSize == undefined) {
            trSize = tlSize;
            brSize = tlSize;
            blSize = tlSize;
        }
        this.getDiv().style.borderRadius = tlSize + "px " + trSize + "px " + brSize + "px " + blSize + "px";
    };

    this.setStyle = function(attr, cssString) {
        this.getDiv().style[attr] = cssString;
    };

    this.setBorder = function(thick, color) {
        this.getDiv().style.border = thick + "px solid " + Utils.toCssColor(color);
    };

    this.setBorderLeft = function(thick, color) {
        this.getDiv().style.borderLeft = thick + "px solid " + Utils.toCssColor(color);
    };

    this.setBorderTop = function(thick, color) {
        this.getDiv().style.borderTop = thick + "px solid " + Utils.toCssColor(color);
    };

    this.setBorderRight = function(thick, color) {
        this.getDiv().style.borderRight = thick + "px solid " + Utils.toCssColor(color);
    };

    this.setBorderBottom = function(thick, color) {
        this.getDiv().style.borderBottom = thick + "px solid " + Utils.toCssColor(color);
    };

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

function LayoutParams(width, height) {
    this.width = width;
    this.height = height;
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
        setTimeout(function() {fireScreenChanged();}, duration);
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
    var mIsPassword = false;
    var mTextListener = null;

    var initInput = function() {
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
        mInput.onfocus = function() {
            mSelf.onFocusChanged(true);
        };
        mInput.onblur = function() {
            mSelf.onFocusChanged(false);
        };
        if (mTextListener != null) {
            mInput.oninput = mTextListener;
        }
    };

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
    }

    this.setText = function(text) {
        mInput.value = text;
    };

    this.setTextSize = function(size) {
        mInput.style.fontSize = size + "px";
    };

    this.setTextColor = function(color) {
        mInput.style.color = Utils.toCssColor(color);
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

        var contentWidth = width - this.getPaddingLeft() - this.getPaddingRight();
        var contentHeight = height - this.getPaddingTop() - this.getPaddingBottom();
        mInput.style.fontFamily = Utils.findFontFamily(mInput);
        mInput.style.width = contentWidth + "px";
        mInput.style.height = contentHeight + "px";

        this.setMeasuredDimension(width, height);
    };

    this.onLayout = function(x, y) {
        mInput.style.top = this.getPaddingTop() + "px";
        mInput.style.left = this.getPaddingLeft() + "px";
    }
}

function WebView() {
    ViewGroup.apply(this, []);

    this.setBackgroundColor("#ffffff");

    var mFrame = document.createElement("iframe");
    mFrame.style.border = "none";
    this.getDiv().appendChild(mFrame);

    this.setSrc = function(src){
        mFrame.src = src;
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
