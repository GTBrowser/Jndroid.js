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

    this.setTag("LinearLayout");

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

    var TouchState = new _TouchState();
    function _TouchState() {
        this.REST = 0;
        this.SCROLLING = 1;
    }

    var MAX_SCROLL_DURATION = 200;
    var SNAP_VELOCITY = 100;
    var mSelf = this;
    var mCurScreen = 0;
    var mProcessor = new Processor();
    var mListener;
    var mTouchState = TouchState.REST;
    var isXLocked = false;
    var isLockETH = false;
    var mLastMotionX = 0;
    var mLastMotionY = 0;
    var mDownMotionX = 0;
    var mDownMotionY = 0;
    var mTouchSlop = 3;
    var mLeftEdge = 0;
    var mRightEdge = 0;
    var mTotalWidth;
    var mScreenWidth;
    var mRollPadding = 0.4;
    var mVTracker = new VelocityTracker();

    this.setGalleryListener = function(l) {
        mListener = l;
    };

    this.scrollTo = function(x) {
        this.setScrollX(x);
        var transition = "translate3d(" + (-x) + "px,0,0)";
        this.getDiv().style.msTransform = transition;
        this.getDiv().style.webkitTransform = transition;
        this.getDiv().style.mozTransform = transition;
        if (mListener != null && mListener.onXChanged) {
            mListener.onXChanged(x);
        }
    };

    this.checkBounds = function(whichScreen) {
        return (whichScreen < 0 ? 0 : whichScreen > (this.getChildCount() - 1) ? (this.getChildCount() - 1)
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

        if (this.getScrollX() == (this.getChildAt(index).getLeft())) {
            return;
        }

        var delta = computeScrollDistance(index);
        var during = duration;
        if (during == undefined) {
            during = Math.abs(delta);
        }
        during = this.controlScrollDuration(during);
        mProcessor.startProcess(mSelf.getScrollX(), mSelf.getScrollX() + delta, during);

        mCurScreen = index;
        this.invalidate();

        setTimeout(function() {fireScreenChanged();}, during);
    };

    this.snapToScreenWithVelocity = function(index, v) {
        index = this.checkBounds(index);
        var delta = computeScrollDistance(index);
        var duration = Math.abs(delta * 1000 / v) / 3;
        duration = Math.min(duration, MAX_SCROLL_DURATION);
        this.snapToScreen(index, duration);
    };

    this.controlScrollDuration = function(duration) {
        return duration;
    };

    this.lockX = function() {
        isXLocked = true;
        this.lockETH();
    };

    this.lockETH = function() {
        isLockETH = true;
    };

    this.unlockX = function() {
        isXLocked = false;
        isLockETH = false;
    };

    this.isXLocked = function() {
        return isXLocked;
    };

    this.onInterceptTouchEvent = function(ev) {
        var action = ev.getAction();
        if ((action == MotionEvent.ACTION_MOVE) && (mTouchState != TouchState.REST) && !isLockETH && !isXLocked) {
            return true;
        }

        var x = ev.getX();

        switch (action) {
            case MotionEvent.ACTION_DOWN:
                if (this.getParent() != null) {
                    this.getParent().requestDisallowInterceptTouchEvent(true);
                }
                mLastMotionX = x;
                mDownMotionY = ev.getY();
                mTouchState = mProcessor.isFinished() ? TouchState.REST : TouchState.SCROLLING;
                break;
            case MotionEvent.ACTION_MOVE:
                var xDiff =  Math.abs(mLastMotionX - x);
                if (xDiff > mTouchSlop) {
                    mTouchState = TouchState.SCROLLING;
                    mLastMotionX = x;
                    if (xDiff < Math.abs(ev.getY() - mDownMotionY)) {
                        this.lockX();
                        if (this.getParent() != null) {
                            this.getParent().requestDisallowInterceptTouchEvent(false);
                        }
                    }
                }
                break;
            case MotionEvent.ACTION_CANCEL:
            case MotionEvent.ACTION_UP:
                mTouchState = TouchState.REST;
                isLockETH = isXLocked = false;
                break;
            default:
                break;
        }

        if (isLockETH)
            return false;

        return mTouchState != TouchState.REST;
    };

    this.onTouchEvent = function(ev) {
        mVTracker.addMovement(ev);
        var action = ev.getAction();
        var x = ev.getX();

        var w = this.getMeasuredWidth();
        switch (ev.getAction()) {
            case MotionEvent.ACTION_DOWN:
                forceFinishProcessor();

                mDownMotionX = x;
                mLastMotionX = x;
                mLastMotionY = ev.getY();
                break;
            case MotionEvent.ACTION_MOVE:

                if (isXLocked) {
                    break;
                }

                var deltaX = mLastMotionX - x;
                mLastMotionX = x;
                mLastMotionY = ev.getY();

                var dst = this.getScrollX() + deltaX;
                if (dst < 0) {
                    if (mLeftEdge == 0) {
                        deltaX = -this.getScrollX();
                    } else {
                        deltaX = (deltaX * (mLeftEdge - this.getScrollX()) / mLeftEdge);
                    }
                } else if (dst > (mTotalWidth - mScreenWidth)) {
                    if (mRightEdge == 0) {
                        deltaX = mScreenWidth - this.getScrollX();
                    } else {
                        var maxExceed = mRightEdge - mTotalWidth;
                        var realExceed = this.getScrollX() - (mTotalWidth - mScreenWidth);
                        if (realExceed < 0) {
                            deltaX = (-realExceed);
                        } else if (maxExceed == 0){
                            deltaX = (-realExceed);
                        } else {
                            deltaX = deltaX * (1 - realExceed / maxExceed);
                        }
                    }
                }
                this.scrollTo(this.getScrollX() + deltaX);
                break;
            case MotionEvent.ACTION_UP:
                mVTracker.computeCurrentVelocity(1000);
                var vX = mVTracker.getXVelocity();
                if (vX > SNAP_VELOCITY && mCurScreen > 0) { // left
                    touchEndSnap(mCurScreen - 1, vX);
                } else if (vX < -SNAP_VELOCITY && mCurScreen < this.getChildCount() - 1) {
                    touchEndSnap(mCurScreen + 1, vX);
                } else {
                    snapAccordCurrX();
                }
                reset();
                break;
            case MotionEvent.ACTION_CANCEL:
                //console.log("cancel");
                snapAccordCurrX();
                reset();
                break;
        }
        return true;
    };

    this.onMeasure = function(widthMS, heightMS) {
        var w = MeasureSpec.getSize(widthMS);
        var h = MeasureSpec.getSize(heightMS);

        mScreenWidth = w;

        var count = this.getChildCount();
        mTotalWidth = 0;
        for (var i = 0; i < count; i++) {
            this.getChildAt(i).measure(MeasureSpec.makeMeasureSpec(w, MeasureSpec.EXACTLY),
                MeasureSpec.makeMeasureSpec(h, MeasureSpec.EXACTLY));
            var childWidth = this.getChildAt(i).getMeasuredWidth();
            mTotalWidth += childWidth;
        }

        mLeftEdge = -mScreenWidth * mRollPadding;
        mRightEdge = mTotalWidth + mRollPadding * mScreenWidth;

        this.setMeasuredDimension(mTotalWidth, h);

        this.scrollTo(mCurScreen * mScreenWidth, 0);
    };

    this.onLayout = function(x, y) {
        var offsetX = 0;
        var childCount = this.getChildCount();

        for (var i = 0; i < childCount; i++) {
            var childView = this.getChildAt(i);
            if (childView.getVisibility() == View.GONE) {
                continue;
            }

            var childWidth = childView.getMeasuredWidth();
            childView.layout(offsetX, 0, offsetX + childWidth, childView.getMeasuredHeight());
            offsetX += childWidth;
        }
    };

    this.computeScroll = function() {
        if (mProcessor.computeProcessOffset()) {
            var x = mProcessor.getCurrProcess();
            this.scrollTo(x);

            this.postInvalidate();
        }
    };

    function touchEndSnap(index, v) {
        mSelf.snapToScreenWithVelocity(index, v);
    }

    function computeScrollDistance(index) {
        var delta = mSelf.getChildAt(index).getLeft() - mSelf.getScrollX();
        var rightShift = mSelf.getChildAt(index).getLeft() + mScreenWidth - mTotalWidth;
        if (rightShift > 0) {
            delta -= rightShift;
        }
        return delta;
    }

    function reset() {
        mSelf.unlockX();
        mTouchState = TouchState.REST;

        mVTracker.clear();
    }

    function snapAccordCurrX() {
        var destScreen = 0;
        var currentWidth = 0;

        for (destScreen = 0; destScreen < mSelf.getChildCount(); destScreen++) {
            var childWidth = mSelf.getChildAt(destScreen).getMeasuredWidth();
            if (currentWidth + childWidth > mSelf.getScrollX()) {
                break;
            }
            currentWidth += childWidth;
        }
        if (destScreen + 1 < mSelf.getChildCount()
            && mSelf.getScrollX() - currentWidth > mSelf.getChildAt(destScreen).getMeasuredWidth() / 2) {
            destScreen += 1;
        }
        mSelf.snapToScreen(destScreen);
    }

    function forceFinishProcessor() {
        if (!mProcessor.isFinished()) {
            mProcessor.forceFinished(true);
        }
    }

    function fireScreenChanged() {
        if (mListener != null && mListener.onGalleryScreenChanged) {
            mListener.onGalleryScreenChanged(mCurScreen);
        }
    }
}



