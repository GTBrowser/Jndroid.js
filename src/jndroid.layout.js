/**
 * LayoutParams are used by views to tell their parents how they want to be
 * laid out.
 *
 * @class LayoutParams
 */
var LP = LayoutParams;
function LayoutParams(wOrParams, h) {
    if ((typeof wOrParams) == "number") {
        this.width = wOrParams;
        this.height = h;
    } else {
        this.width = wOrParams.width;
        this.height = wOrParams.height;
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
Object.defineProperty(LP,"FILL_PARENT",{value:-1});
Object.defineProperty(LP,"FP",{value:-1});
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
Object.defineProperty(LP,"MATCH_PARENT",{value:-1});
Object.defineProperty(LP,"MP",{value:-1});
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
Object.defineProperty(LP,"WRAP_CONTENT",{value:-2});
Object.defineProperty(LP,"WC",{value:-2});

function getDefaultLP() {
    return new LP(LP.WC, LP.WC);
}

function getLp(view) {
    var lp = view.getLayoutParams();
    if (lp == null) {
        lp = getDefaultLP();
    }
    return lp;
}

function makeSpec(cDimen, lpDimen) {
    var spec;
    if (lpDimen == LP.FP) {
        spec = MS.makeMS(cDimen, MS.EXACTLY);
    } else if (lpDimen == LP.WC) {
        spec = MS.makeMS(cDimen, MS.UNSPECIFIED);
    } else {
        spec = MS.makeMS(lpDimen, MS.EXACTLY);
    }
    return spec;
}

function calcX(p, c) {
    var lp = getLp(c);
    var pl = p.getPL();
    var pr = p.getPR();
    var x = pl + lp.leftMargin;
    if (lp.gravity != -1) {
        if (lp.gravity & Gravity.CENTER_HORIZONTAL) {
            var cntW = p.getMW() - pl - pr - lp.leftMargin - lp.rightMargin;
            x = pl + lp.leftMargin + (cntW - c.getMW()) / 2;
        } else if (lp.gravity & Gravity.RIGHT) {
            x = p.getMW() - pr - lp.rightMargin - c.getMW();
        }
    }
    return x;
}

function calcY(p, c) {
    var lp = getLp(c);
    var pt = p.getPT();
    var pb = p.getPB();
    var y = pt + lp.topMargin;
    if (lp.gravity != -1) {
        if (lp.gravity & Gravity.CENTER_VERTICAL) {
            var cntH = p.getMH() - pt - pb - lp.topMargin - lp.bottomMargin;
            y = pt + lp.topMargin + (cntH - c.getMH()) / 2;
        } else if (lp.gravity & Gravity.BOTTOM) {
            y = p.getMH() - pb - lp.bottomMargin - c.getMH();
        }
    }
    return y;
}

/**
 * A Layout that arranges its children in a single column or a single row. The direction of
 * the row can be set by calling setOrientation().
 *
 * @class LinearLayout
 * @extends ViewGroup
 */
function LinearLayout() {
    ViewGroup.apply(this);

    this.setTag("LinearLayout");

    var orientation = LinearLayout.VERTICAL;

    /**
     * Should the layout be a column or a row.
     * @method setOrientation
     * @param {int} o Pass HORIZONTAL or VERTICAL. Default
     * value is VERTICAL.
     */
    this.setOrientation = function(o) {
        orientation = o;
        this.requestLayout();
    };

    this.getTotalWeight = function() {
        var w = 0;
        for (var i = 0; i < this.getChildCount(); i++) {
            var c = this.getChildAt(i);
            var clp = getLp(c);
            w += clp.weight;
        }
        return w;
    };

    this.getAvailableWidth = function(totalWidth) {
        var w = totalWidth - this.getPL() - this.getPR();
        for (var i = 0; i < this.getChildCount(); i++) {
            var c = this.getChildAt(i);
            if (c.getVisibility() == View.GONE) {
                continue;
            }
            var lp = getLp(c);
            w -= (lp.leftMargin + lp.rightMargin);
            if (lp.width > 0) {
                w -= lp.width;
            } else if (lp.width == LP.WC) {
                if (c.getMW() == 0 && c.getMH() == 0) {
                    c.measure(0, 0);
                }
                w -= c.getMW();
            }
        }
        return w;
    };

    this.getAvailableHeight = function(totalHeight) {
        var h = totalHeight - this.getPT() - this.getPB();
        for (var i = 0; i < this.getChildCount(); i++) {
            var c = this.getChildAt(i);
            if (c.getVisibility() == View.GONE) {
                continue;
            }
            var lp = getLp(c);
            h -= (lp.topMargin + lp.bottomMargin);
            if (lp.height > 0) {
                h -= lp.height;
            } else if (lp.height == LP.WC) {
                if (c.getMW() == 0 && c.getMH() == 0) {
                    c.measure(0, 0);
                }
                h -= c.getMH();
            }
        }
        return h;
    };

    this.onMeasure = function(wMS, hMS) {
        if (orientation == LinearLayout.VERTICAL) {
            this.measureVertical(wMS, hMS);
        } else {
            this.measureHorizontal(wMS, hMS);
        }
    };

    this.measureVertical = function(wMS, hMS) {
        var w = MS.getSize(wMS);
        var h = MS.getSize(hMS);
        var pl = this.getPL();
        var pt = this.getPT();
        var pr = this.getPR();
        var pb = this.getPB();
        var cntH = pt + pb;
        var totalWeight = this.getTotalWeight();
        var lp = getLp(this);
        for (var i = 0; i < this.getChildCount(); i++) {
            var c = this.getChildAt(i);
            if (c.getVisibility() == View.GONE) {
                continue;
            }
            var clp = getLp(c);
            var cW = w - pl - pr - clp.leftMargin - clp.rightMargin;
            var cH = h - pt - pb - clp.topMargin - clp.bottomMargin;
            var cWS = makeSpec(cW, clp.width);
            var cHS = makeSpec(cH, clp.height);
            if (totalWeight != 0 && !(clp.weight == 0 && clp.height > 0)) {
                var ch = this.getAvailableHeight(h) * clp.weight / totalWeight;
                cHS = MS.makeMeasureSpec(ch, MS.EXACTLY);
            }
            c.measure(cWS, cHS);
            cntH += c.getMH() + clp.topMargin + clp.bottomMargin;
        }
        var hMode = MS.getMode(hMS);
        if (hMode != MS.EXACTLY) {
            if (lp.height == LP.WC) {
                h = cntH;
            }
        }

        this.setMD(w, h);
    };

    this.measureHorizontal = function(wMS, hMS) {
        var w = MS.getSize(wMS);
        var h = MS.getSize(hMS);
        var hMode = MS.getMode(hMS);
        var pl = this.getPL();
        var pt = this.getPT();
        var pr = this.getPR();
        var pb = this.getPB();
        var cntW = pl + pr;
        var totalWeight = this.getTotalWeight();
        var lp = getLp(this);
        if (hMode != MS.EXACTLY && lp.height == LP.WC) {
            h = pt + pb;
        }
        for (var i = 0; i < this.getChildCount(); i++) {
            var c = this.getChildAt(i);
            if (c.getVisibility() == View.GONE) {
                continue;
            }
            var clp = getLp(c);
            var cW = w - pl - pr - clp.leftMargin - clp.rightMargin;
            var cH = h - pt - pb - clp.topMargin - clp.bottomMargin;
            var cWS = makeSpec(cW, clp.width);
            var cHS = makeSpec(cH, clp.height);
            if (totalWeight != 0 && !(clp.weight == 0 && clp.width > 0)) {
                var cWidth = this.getAvailableWidth(w) * clp.weight / totalWeight;
                cWS = MS.makeMeasureSpec(cWidth, MS.EXACTLY);
            }
            c.measure(cWS, cHS);
            cntW += c.getMW() + clp.leftMargin + clp.rightMargin;

            if (hMode != MS.EXACTLY && lp.height == LP.WC) {
                var ch = pt + pb + clp.topMargin + clp.bottomMargin + c.getMH();
                if (ch > h) {
                    h = ch;
                }
            }
        }

        var wMode = MS.getMode(wMS);
        if (wMode != MS.EXACTLY) {
            if (lp.width == LP.WC) {
                w = cntW;
            }
        }

        this.setMD(w, h);
    };

    this.onLayout = function() {
        if (orientation == LinearLayout.VERTICAL) {
            this.layoutVertical();
        } else {
            this.layoutHorizontal();
        }
    };

    this.layoutVertical = function() {
        var x = this.getPL();
        var y = this.getPT();
        for (var i = 0; i < this.getChildCount(); i++) {
            var c = this.getChildAt(i);
            if (c.getVisibility() == View.GONE) {
                continue;
            }
            var clp = getLp(c);
            x = calcX(this, c);
            y += clp.topMargin;
            c.layout(x, y);
            y += c.getMH();
            y += clp.bottomMargin;
        }
    };

    this.layoutHorizontal = function() {
        var x = this.getPL();
        var y = this.getPT();
        for (var i = 0; i < this.getChildCount(); i++) {
            var child = this.getChildAt(i);
            if (child.getVisibility() == View.GONE) {
                continue;
            }
            var clp = getLp(child);
            x += clp.leftMargin;
            y = calcY(this, child);
            child.layout(x, y);
            x += child.getMW();
            x += clp.rightMargin;
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
    ViewGroup.apply(this);

    this.onMeasure = function(wMS, hMS) {
        var w = MS.getSize(wMS);
        var h = MS.getSize(hMS);
        var cW = w - this.getPL() - this.getPR();
        var cH = h - this.getPT() - this.getPB();
        for (var i = 0; i < this.getChildCount(); i++) {
            var c = this.getChildAt(i);
            if (c.getVisibility() != View.VISIBLE) {
                continue;
            }
            var lp = getLp(c);
            var cw = cW - lp.leftMargin - lp.rightMargin;
            var ch = cH - lp.topMargin - lp.bottomMargin;
            c.measure(makeSpec(cw, lp.width), makeSpec(ch, lp.height));
        }
        this.setMD(w, h);
    };

    this.onLayout = function() {
        for (var i = 0; i < this.getChildCount(); i++) {
            var c = this.getChildAt(i);
            if (c.getVisibility() != View.VISIBLE) {
                continue;
            }
            var x = calcX(this, c);
            var y = calcY(this, c);
            c.layout(x, y);
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
    ViewGroup.apply(this);

    this.setTag("Gallery");

    var maxDuration = 200;
    var snapV = 100;
    var self = this;
    var curScreen = 0;
    var processor = new Processor();
    var inScrolling = false;
    var isXLocked = false;
    var lastX = 0;
    var lastY = 0;
    var downX = 0;
    var downY = 0;
    var touchSlop = 10;
    var leftEdge = 0;
    var rightEdge = 0;
    var totalWidth;
    var screenWidth;
    var rollPadding = 0.4;
    var vTracker = new VelocityTracker();
    var xChangedListener = null;
    var screenChangedListener = null;

    this.setOnXChangedListener = function(l) {
        xChangedListener = l;
    };

    this.setOnScreenChangedListener = function(l) {
        screenChangedListener = l;
    };

    processor.setEndListener(function() {
        setTimeout(fireScreenChanged, 10);
    });

    this.scrollTo = function(x) {
        x = Math.floor(x);
        if (x == this.getScrollX()) {
            return;
        }
        this.setScrollX(x);
        this.translate3d(-x, 0);
        if (xChangedListener) {
            xChangedListener.call(this, x);
        }
    };

    this.checkBounds = function(i) {
        return (i < 0 ? 0 : i > (this.getChildCount() - 1) ? (this.getChildCount() - 1) : i);
    };

    this.setToScreen = function(i) {
        i = this.checkBounds(i);
        curScreen = i;
        this.scrollTo(i * this.getMW());
        fireScreenChanged();
    };

    this.snapToScreen = function(index, duration) {
        index = this.checkBounds(index);

        if (this.getScrollX() == (this.getChildAt(index).getLeft())) {
            return;
        }

        var delta = calcDist(index);
        var during = duration;
        if (during == undefined) {
            during = Math.abs(delta);
        }
        during = this.controlScrollDuration(during);
        processor.startProcess(self.getScrollX(), self.getScrollX() + delta, during);

        curScreen = index;

        this.invalidate();
    };

    this.snapByV = function(index, v) {
        index = this.checkBounds(index);
        var delta = calcDist(index);
        var duration = Math.abs(delta * 1000 / v) / 3;
        duration = Math.min(duration, maxDuration);
        this.snapToScreen(index, duration);
    };

    this.controlScrollDuration = function(d) {
        return d;
    };

    this.lockX = function() {
        isXLocked = true;
    };

    this.unlockX = function() {
        isXLocked = false;
    };

    this.isXLocked = function() {
        return isXLocked;
    };

    this.onInterceptTouchEvent = function(e) {
        var action = e.getAction();
        if ((action == MotionEvent.ACTION_MOVE) && inScrolling && !isXLocked) {
            return true;
        }

        var x = e.getX();

        switch (action) {
            case MotionEvent.ACTION_DOWN:
                this.getParent().requestDisallowInterceptTouchEvent(true);
                lastX = x;
                downY = e.getY();
                inScrolling = !processor.isFinished();
                break;
            case MotionEvent.ACTION_MOVE:
                var xDiff =  Math.abs(lastX - x);
                if (xDiff > touchSlop) {
                    inScrolling = true;
                    lastX = x;
                    if (xDiff < Math.abs(e.getY() - downY)) {
                        this.lockX();
                        this.getParent().requestDisallowInterceptTouchEvent(false);
                    }
                }
                break;
            case MotionEvent.ACTION_CANCEL:
            case MotionEvent.ACTION_UP:
                inScrolling = false;
                isXLocked = false;
                break;
            default:
                break;
        }
        return inScrolling;
    };

    this.onTouchEvent = function(ev) {
        vTracker.addMovement(ev);
        var x = ev.getX();

        switch (ev.getAction()) {
            case MotionEvent.ACTION_DOWN:
                forceEnd();

                downX = x;
                lastX = x;
                lastY = ev.getY();
                break;
            case MotionEvent.ACTION_MOVE:

                if (isXLocked) {
                    break;
                }

                var dX = lastX - x;
                lastX = x;
                lastY = ev.getY();

                var dst = this.getScrollX() + dX;
                if (dst < 0) {
                    if (leftEdge == 0) {
                        dX = -this.getScrollX();
                    } else {
                        dX = (dX * (leftEdge - this.getScrollX()) / leftEdge);
                    }
                } else if (dst > (totalWidth - screenWidth)) {
                    if (rightEdge == 0) {
                        dX = screenWidth - this.getScrollX();
                    } else {
                        var maxExceed = rightEdge - totalWidth;
                        var realExceed = this.getScrollX() - (totalWidth - screenWidth);
                        if (realExceed < 0) {
                            dX = (-realExceed);
                        } else if (maxExceed == 0){
                            dX = (-realExceed);
                        } else {
                            dX = dX * (1 - realExceed / maxExceed);
                        }
                    }
                }
                this.scrollTo(this.getScrollX() + dX);
                break;
            case MotionEvent.ACTION_UP:
                vTracker.computeCurrentVelocity(1000);
                var vX = vTracker.getXVelocity();
                if (vX > snapV && curScreen > 0) { // left
                    touchEnd(curScreen - 1, vX);
                } else if (vX < -snapV && curScreen < this.getChildCount() - 1) {
                    touchEnd(curScreen + 1, vX);
                } else {
                    snap();
                }
                reset();
                break;
            case MotionEvent.ACTION_CANCEL:
                snap();
                reset();
                break;
        }
        return true;
    };

    this.onMeasure = function(wMS, hMS) {
        var w = MS.getSize(wMS);
        var h = MS.getSize(hMS);

        screenWidth = w;

        var count = this.getChildCount();
        totalWidth = 0;
        for (var i = 0; i < count; i++) {
            this.getChildAt(i).measure(MS.makeMS(w, MS.EXACTLY),
                MS.makeMS(h, MS.EXACTLY));
            totalWidth += this.getChildAt(i).getMW();
        }

        leftEdge = -screenWidth * rollPadding;
        rightEdge = totalWidth + rollPadding * screenWidth;

        this.setMD(totalWidth, h);

        this.scrollTo(curScreen * screenWidth, 0);
    };


    this.onLayout = function() {
        var x = 0;
        for (var i = 0; i < this.getChildCount(); i++) {
            var c = this.getChildAt(i);
            if (c.getVisibility() == View.GONE) {
                continue;
            }

            var cWidth = c.getMW();
            c.layout(x, 0);
            x += cWidth;
        }
    };

    this.computeScroll = function() {
        if (processor.computeProcessOffset()) {
            var x = processor.getCurrProcess();
            this.scrollTo(x);

            this.postInvalidate();
        } else {
            var x = this.getScrollX();
            this.translate3d(-x, 0);
        }
    };

    function touchEnd(index, v) {
        self.snapByV(index, v);
    }

    function calcDist(index) {
        var d = self.getChildAt(index).getLeft() - self.getScrollX();
        var rightShift = self.getChildAt(index).getLeft() + screenWidth - totalWidth;
        if (rightShift > 0) {
            d -= rightShift;
        }
        return d;
    }

    function reset() {
        self.unlockX();
        inScrolling = false;
        vTracker.clear();
    }

    function snap() {
        var index;
        var currentWidth = 0;

        for (index = 0; index < self.getChildCount(); index++) {
            var cWidth = self.getChildAt(index).getMW();
            if (currentWidth + cWidth > self.getScrollX()) {
                break;
            }
            currentWidth += cWidth;
        }
        if (index + 1 < self.getChildCount() && self.getScrollX() - currentWidth > self.getChildAt(index).getMW() / 2) {
            index += 1;
        }
        self.snapToScreen(index);
    }

    function forceEnd() {
        if (!processor.isFinished()) {
            processor.forceFinished(true);
        }
    }

    function fireScreenChanged() {
        if (screenChangedListener) {
            screenChangedListener.call(this, curScreen);
        }
    }
}



