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
            mListener.onProcessEnd();
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

    this.setBorderStyle = function(cssString) {
        this.getDiv().style.border = cssString;
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
