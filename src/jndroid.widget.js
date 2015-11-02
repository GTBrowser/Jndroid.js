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
    FrameLayout.apply(this);

    this.setTag("ScrollView");

    var self = this;
    var inDragging = false;
    var lastX = 0;
    var lastY = 0;
    var vTracker = null;
    var touchSlop = 5;
    var yProcessor = new FlingProcessor();
    var xProcessor = new FlingProcessor();
    var maxV = 5000;
    var minV = 50;
    var listeners = [];
    var xScrollEnd = true;
    var yScrollEnd = true;
    var scrollEndListener = null;
    var yScrollable = false;
    var xScrollable = false;
    var rollPadding = 0.6;

    var logo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAQAAADZc7J/AAABiUlEQVR4Xu2TMUgCURjHDYIamoJoaGhIgnYHl8BNgkCkxSFsbBPBRcjRRQhcb3QRHG6Q45YHB6/BwcWtIdoccnSKCn3//+tl18OrQ7EpyO/Pwd3w+73ve+9e4t/WuianTP4S5b4+5A5Lent1dJdFNNGCCwdtdaU3V8J1Ch30EECyY0QCkrnVcGFgzyRggQ0ICDqRMfQmL5iNx7lHN8SlumEJ8vOdmTkBL9UA/Wk+ZvUNNEJE0OE1xAz39J0qzwvqCCDQetz6LlCVLxwtVTaoDy/soDYvqM2aFNHz1dushriPNuvsWtwIoh0UMYJAoFORrXMgQ8BFK1zdCqbnkVPGEGMMWWOSBzxhjg0EJhawsP3ifnSvq1p/KMJ5pYXj07MDWMGOGuBlNoi3NIId7v68ImmMjeIe7hLch5ykE3E1zePZKHqLFEt+4+kZnqDQh8tuLC7hM5tYVK9HcKEwQgA3ovEhTZpvx4to24cBRyYP6KMHOXs8NJhZ5QYessA6HTi8VRVmeZD4s7WudxQX9TCBmN2WAAAAAElFTkSuQmCC";

    this.div.style.background = Utils.toCssColor(0xff808080);
    var jndroid = document.createElement("div");
    jndroid.style.width = "100%";
    jndroid.style.height = "80px";
    jndroid.style.fontSize = "14px";
    jndroid.style.color = Utils.toCssColor(0x80ffffff);
    jndroid.style.lineHeight = "80px";
    jndroid.style.textAlign = "center";
    var img = document.createElement("img");
    img.src = logo;
    img.style.width = "20px";
    img.style.height = "20px";
    img.style.verticalAlign = "text-bottom";
    jndroid.appendChild(img);
    jndroid.appendChild(document.createTextNode(" 网页由Jndroid提供技术支持"));

    this.div.appendChild(jndroid);

    this.setBg = function() {};
    this.setBackgroundColor = function() {};

    this.checkScrollable = function() {
        if (this.getChildCount() == 0) {
            yScrollable = true;
            xScrollable = true;
            return;
        }
        yScrollable = true;
        xScrollable = (this.getChildAt(0).getMW() > this.getMW());
    };

    this.setScrollEndListener = function(l) {
        scrollEndListener = l;
    };

    this.addScrollChangedListener = function(l) {
        listeners.push(l);
    };

    this.div.onmousewheel = function(e) {
        self.checkScrollable();

        if (!xProcessor.isFinished()) {
            xProcessor.forceFinished(true);
        }
        if (!yProcessor.isFinished()) {
            yProcessor.forceFinished(true);
        }
        if (yScrollable) {
            var y = self.getScrollY() + e.deltaY;
            y = Math.max(y, 0);
            y = Math.min(y, self.getChildAt(0).getMH() - self.getMH());
            self.scrollTo(self.getScrollX(), y);
        } else {
            var x = self.getScrollX() + e.deltaX;
            x = Math.max(x, 0);
            x = Math.min(x, self.getChildAt(0).getMW() - self.getMW());
            self.scrollTo(x, self.getScrollY());
        }
    };

    this.scrollToWidthRange = function(x, y) {
        var rangeV = getYRange();
        var rangeH = getXRange();
        x = Math.max(0, x);
        x = Math.min(x, rangeV);
        y = Math.max(0, y);
        y = Math.min(y, rangeH);
        this.scrollTo(x, y);
    };

    this.scrollTo = function(x, y) {
        x = Math.round(x);
        if (y == undefined) {
            y = 0;
        }
        y = Math.round(y);
        var oldX, oldY;
        oldX = this.getScrollX();
        oldY = this.getScrollY();
        if (x == oldX && y == oldY) {
            return;
        }
        this.setScrollX(x);
        this.setScrollY(y);
        if (self.getChildCount() > 0) {
            self.getChildAt(0).translate3d(-x, -y);
        }
        for (var i = 0; i < listeners.length; i++) {
            listeners[i].call(self, x, oldX, y, oldY);
        }
    };

    this.scrollBy = function(dx, dy) {
        if (dy == undefined) {
            dy = 0;
        }
        this.scrollTo(this.getScrollX() + dx, this.getScrollY() + dy);
    };

    this.onInterceptTouchEvent = function(e) {
        this.onBeforeInterceptTouchEvent(e);

        this.checkScrollable();

        var action = e.getAction();
        if ((action == ME.ACTION_MOVE) && (inDragging)) {
            return true;
        }

        switch (action) {
            case ME.ACTION_DOWN: {
                this.getParent().requestDisallowInterceptTouchEvent(true);

                lastX = e.getX();
                lastY = e.getY();

                clearVTracker();
                vTracker.addMovement(e);

                inDragging = (!xProcessor.isFinished()) || (!yProcessor.isFinished());
                break;
            }
            case ME.ACTION_MOVE: {
                var x = e.getX();
                var y = e.getY();
                var xDiff = Math.abs(x - lastX);
                var yDiff = Math.abs(y - lastY);

                if (((yDiff > xDiff && yDiff > touchSlop) && yScrollable)
                    || ((xDiff > yDiff && xDiff > touchSlop) && xScrollable)) {
                    inDragging = true;

                    initVTracker();
                    vTracker.addMovement(e);
                    var p = this.getParent();
                    p.requestDisallowInterceptTouchEvent(true);

                    if (this.getScrollX() >= getXRange() && x < lastX) {
                        p.requestDisallowInterceptTouchEvent(false);
                    }
                    if (this.getScrollX() <= 0 && x > lastX) {
                        p.requestDisallowInterceptTouchEvent(false);
                    }
                    lastX = x;
                    lastY = y;
                }

                break;
            }
            case ME.ACTION_CANCEL:
            case ME.ACTION_UP:
                inDragging = false;
                break;
        }
        return inDragging;
    };

    this.onTouchEvent = function(ev) {
        initVTracker();
        vTracker.addMovement(ev);

        if (this.getChildCount() == 0) {
            return false;
        }

        var action = ev.getAction();

        switch (action) {
            case ME.ACTION_DOWN: {
                inDragging = (!xProcessor.isFinished()) || (!yProcessor.isFinished());
                if (inDragging) {
                    this.getParent().requestDisallowInterceptTouchEvent(true);
                }

                if (!xProcessor.isFinished()) {
                    xProcessor.forceFinished(true);
                }
                if (!yProcessor.isFinished()) {
                    yProcessor.forceFinished(true);
                }

                lastX = ev.getX();
                lastY = ev.getY();
                break;
            }
            case ME.ACTION_MOVE:
                var x = ev.getX();
                var y = ev.getY();
                var deltaX = lastX - x;
                var deltaY = lastY - y;

                if (xScrollable) {
                    if (!inDragging && Math.abs(deltaX) > touchSlop) {
                        this.getParent().requestDisallowInterceptTouchEvent(true);
                        inDragging = true;
                        if (deltaX > 0) {
                            deltaX -= touchSlop;
                        } else {
                            deltaX += touchSlop;
                        }
                    }
                } else {
                    deltaX = 0;
                }

                if (yScrollable) {
                    if (!inDragging && Math.abs(deltaY) > touchSlop) {
                        this.getParent().requestDisallowInterceptTouchEvent(true);
                        inDragging = true;
                        if (deltaY > 0) {
                            deltaY -= touchSlop;
                        } else {
                            deltaY += touchSlop;
                        }
                    }
                } else {
                    deltaY = 0;
                }


                if (inDragging) {
                    lastX = x;
                    lastY = y;

                    myScrollBy(deltaX, deltaY);
                }
                break;
            case ME.ACTION_UP:
                if (inDragging) {
                    vTracker.computeCurrentVelocity(1000);

                    var vX = 0;
                    var vY = 0;
                    if (xScrollable) {
                        vX = getVelocityRange(vTracker.getXVelocity());
                        if (this.getScrollX() > 0 && this.getScrollX() < getXRange()) {
                            this.flingX(-vX);
                        }
                    }
                    if (yScrollable) {
                        vY = getVelocityRange(vTracker.getYVelocity());
                        if (this.getScrollY() > 0 && this.getScrollY() < getYRange()) {
                            this.flingY(-vY);
                        }
                    }
                    endDrag();
                }
                break;
            case ME.ACTION_CANCEL:
                if (inDragging && this.getChildCount() > 0) {
                    endDrag();
                }
                break;
            default:
                break;
        }
        return true;

        function getVelocityRange(v) {
            v = Math.min(v, maxV);
            v = Math.max(v, -maxV);
            if (Math.abs(v) <= minV) {
                v = 0;
            }
            return v;
        }
    };

    this.onAfterMeasure = function() {
        if (this.getChildCount() > 0) {
            var c = this.getChildAt(0);
            var h = this.getMH();
            var chMS = MS.makeMS(c.getMH(), MS.EXACTLY);
            var cwMS = MS.makeMS(c.getMW(), MS.EXACTLY);
            if (c.getMH() < h) {
                h -= this.getPT();
                h -= this.getPB();
                chMS = MS.makeMS(h, MS.EXACTLY);
            }
            var w = this.getMW();
            if (c.getMW() < w) {
                w -= this.getPL();
                w -= this.getPR();
                cwMS = MS.makeMS(w, MS.EXACTLY);
            }
            c.measure(cwMS, chMS);
        }
    };

    this.computeScroll = function() {
        var xResult = xProcessor.computeProcessOffset();
        var yResult = yProcessor.computeProcessOffset();
        var x = this.getScrollX();
        var y = this.getScrollY();
        if (yResult || xResult) {
            if (xResult) {
                x = xProcessor.getCurrProcess();
            }
            if (yResult) {
                y = yProcessor.getCurrProcess();
            }
            this.scrollTo(x, y);
            this.postInvalidate();
        }
    };

    function myScrollBy(dx, dy) {
        var xRange = getXRange();
        if (self.getScrollX() < 0 || self.getScrollX() > xRange) {
            dx = dx * rollPadding;
        }
        var yRange = getYRange();
        if (self.getScrollY() < 0 || self.getScrollY() > yRange) {
            dy = dy * rollPadding;
        }

        var x = self.getScrollX() + dx;
        var xRollPadding = self.getMW() * rollPadding;
        x = Math.min(x, xRange + xRollPadding);
        x = Math.max(x, -xRollPadding);

        var y = self.getScrollY() + dy;
        var yRollPadding = self.getMH() * rollPadding;
        y = Math.min(y, yRange + yRollPadding);
        y = Math.max(y, -yRollPadding);

        self.scrollTo(x, y);
    }

    function getYRange() {
        var range = 0;
        if (self.getChildCount() > 0) {
            range = Math.max(0, self.getChildAt(0).getHeight() - (self.getHeight() - self.getPB() - self.getPT()));
        }
        return range;
    }

    function getXRange() {
        var range = 0;
        if (self.getChildCount() > 0) {
            range = Math.max(0, self.getChildAt(0).getWidth() - (self.getWidth() - self.getPL() - self.getPR()));
        }
        return range;
    }

    function initVTracker() {
        if (vTracker == null) {
            vTracker = new VelocityTracker();
        }
    }

    function clearVTracker() {
        initVTracker();
        vTracker.clear();
    }

    this.flingX = function(vX) {
        if (self.getChildCount() > 0) {
            if (xScrollable && vX != 0) {
                var w = self.getWidth() - self.getPR() - self.getPL();
                var right = self.getChildAt(0).getWidth() - w;

                xProcessor.fling(self.getScrollX(), vX / 500, 0, right);
                xScrollEnd = false;
                xProcessor.setEndListener(function() {
                    xScrollEnd = true;
                    endScroll();
                });
            }
            self.postInvalidate();
        }
    };

    this.flingY = function(vY) {
        if (self.getChildCount() > 0) {
            if (yScrollable && vY != 0) {
                var height = self.getHeight() - self.getPaddingBottom() - self.getPT();
                var bottom = self.getChildAt(0).getHeight() - height;

                yProcessor.fling(self.getScrollY(), vY / 500, 0, bottom);
                yScrollEnd = false;
                yProcessor.setEndListener(function() {
                    yScrollEnd = true;
                    endScroll();
                });
            }
            self.postInvalidate();
        }
    };

    function endScroll() {
        if (scrollEndListener) {
            if (xScrollEnd && yScrollEnd) {
                scrollEndListener.call(self);
            }
        }
    }

    function endDrag() {
        inDragging = false;

        var scrollEnd = true;
        var maxScroll = Math.min(self.getMW(), self.getMH()) * rollPadding;
        if (xScrollable) {
            var xRange = getXRange();
            var scrollX = self.getScrollX();
            if (scrollX < 0) {
                xProcessor.flingDistance(scrollX, scrollX, -maxScroll, 0);
                xScrollEnd = false;
                xProcessor.setEndListener(function() {
                    xScrollEnd = true;
                    endScroll();
                });
                scrollEnd = false;
            } else if (scrollX > xRange) {
                xProcessor.flingDistance(scrollX, (scrollX - xRange), xRange, xRange + maxScroll);
                xScrollEnd = false;
                xProcessor.setEndListener(function() {
                    xScrollEnd = true;
                    endScroll();
                });
                scrollEnd = false;
            }
        }

        if (yScrollable) {
            var yRange = getYRange();
            var scrollY = self.getScrollY();
            if (scrollY < 0) {
                yProcessor.flingDistance(scrollY, scrollY, -maxScroll, 0);
                yScrollEnd = false;
                yProcessor.setEndListener(function() {
                    yScrollEnd = true;
                    endScroll();
                });
                scrollEnd = false;
            } else if (scrollY > yRange) {
                yProcessor.flingDistance(scrollY, (scrollY - yRange), yRange, yRange + maxScroll);
                yScrollEnd = false;
                yProcessor.setEndListener(function() {
                    yScrollEnd = true;
                    endScroll();
                });
                scrollEnd = false;
            }
        }
        if (scrollEnd) {
            if (xProcessor.isFinished() && yProcessor.isFinished()) {
                xScrollEnd = true;
                yScrollEnd = true;
                endScroll();
            }
        } else {
            self.postInvalidate();
        }
    }

    function FlingProcessor() {
        Processor.apply(this);

        var a = 0.0015;
        var isFinished = true;
        var startTime = 0;
        var start;
        var v = 0;
        var absV = 0;
        var absCurV = 0;
        var maxTime = 0;
        var min = 0;
        var max = 0;
        var cur = 0;

        var listener = null;

        this.flingDistance = function(start, distance, min, max) {
            var v = 0;
            if (distance < 0) {
                v = Math.sqrt(2 * -distance * a);
            } else {
                v = -Math.sqrt(2 * distance * a);
            }
            this.fling(start, v, min, max);
        };

        this.fling = function(_start, _v, _min, _max) {
            isFinished = false;
            startTime = (new Date()).getTime();

            start = _start;
            v = _v;
            absV = Math.abs(v);
            maxTime = absV / a;
            min = _min;
            max = _max;
            cur = _start;
        };

        this.computeProcessOffset = function() {
            if (isFinished) {
                return false;
            }

            var t = (new Date()).getTime() - startTime;
            t = Math.min(t, maxTime);
            t = Math.max(t, 1);
            var d = absV * t - a * t * t / 2;
            if (v > 0) {
                cur = start + d;
            } else {
                cur = start - d;
            }
            absCurV = absV - a * t;
            if (absCurV <= 0 || cur >= max || cur <= min) {
                if (cur > max) {
                    cur = max;
                } else if (cur < min) {
                    cur = min;
                }
                isFinished = true;
                this.fireProcessEnd();
            }
            return true;
        };

        this.forceFinished = function(finished) {
            isFinished = finished;
        };

        this.isFinished = function() {
            return isFinished;
        };

        this.setEndListener = function(l) {
            listener = l;
        };

        this.fireProcessEnd = function() {
            if (listener != null) {
                if (v > 0) {
                    listener.call(this, absCurV);
                } else {
                    listener.call(this, -absCurV);
                }
            }
        };

        this.getCurrProcess = function() {
            return cur;
        };
    }
}

function ScrollBar(scrollView) {
    ViewGroup.apply(this);

    var width = 16;

    var self = this;

    var thumbH = 0;

    var scrollChild = scrollView.getChildAt(0);

    var thumb = new View();
    thumb.setBg(0x45000000);
    thumb.setCornerSize(2);
    thumb.setBorder(1, 0x99ffffff);
    this.addView(thumb);

    this.setBg(0x10000000);

    scrollView.addScrollChangedListener(function(t, oldt) {
        var h = this.getMH();

        this.postDelayed(updateThumbSize, 1000);
        updateThumbSize();

        var process = t / (scrollChild.getMH() - h);
        var y = process * (h - thumbH);
        thumb.layout(0, y);
    });

    this.onTouchEvent = function(e) {
        var trackLength = this.getMH() - thumbH;
        var y = e.getY() - thumbH / 2;
        y = Math.max(y, 0);
        y = Math.min(y, trackLength);
        thumb.layout(0, y);

        var processor = scrollView.getProcessor();
        if (!processor.isFinished()) {
            processor.forceFinished(true);
        }

        var p = y / trackLength;
        var t = (scrollChild.getMH() - this.getMH()) * p;
        scrollView.scrollTo(t);
    };

    this.onMeasure = function(wMS, hMS) {
        this.setMD(width, MS.getSize(hMS));
    };

    this.onLayout = function() {
        thumb.layout(0, 0);
    };

    function updateThumbSize() {
        var h = self.getMH();
        thumbH = h / scrollChild.getMH() * h;
        thumbH = Math.max(32, thumbH);
        thumb.measure(width, thumbH);

        if (thumbH >= h) {
            self.setVisibility(View.INVISIBLE);
        } else {
            self.setVisibility(View.VISIBLE);
        }
    }
}

/**
 * Displays an arbitrary icon.The ImageView class provides scaling display options.
 *
 * @class ImageView
 */
function ImageView() {
    ViewGroup.apply(this);

    var self = this;
    var src = null;
    var img = null;
    var scaleType = ScaleType.CENTER;
    var customWidth = 0;
    var customHeight = 0;
    var scaleTimeout = 0;
    var loadedListener = null;

    this.setLoadedListener = function(l) {
        loadedListener = l;
    };

    /**
     * Set the scale type of image.
     *
     * @method setScaleType
     * @param {int} ScaleType.CENTER,ScaleType.FIT_XY,ScaleType.CENTER_INSIDE,ScaleType.FIT_CENTER or ScaleType.CENTER_CROP.
     */
    this.setScaleType = function(st) {
        scaleType = st;
    };

    /**
     * Sets the content of this ImageView to the specified Uri.
     *
     * @method setImageUri
     * @param {string} The Uri of an image
     */
    this.setImageUri = function(uri) {
        this.setImgSrc(uri);
    };

    this.setImgSrc = function(_src) {
        this.setVisibility(View.VISIBLE);
        src = _src;

        if (img == null) {
            img = document.createElement("img");
        }
        img.src = src;
        img.style.verticalAlign = "middle";
        img.style.position = "absolute";
        img.style.top = 0;
        img.style.left = 0;
        img.onerror = function() {
            self.setVisibility(View.INVISIBLE);
        };
        this.div.appendChild(img);
        if (this.getMW() != 0 && this.getMH() != 0) {
            this.requestLayout();
        }
    };

    this.setStyleWidth = function(w) {
        img.style.width = w + "px";
        img.style.left = (this.getMW() - w) / 2 + "px";
    };

    this.setStyleHeight = function(h) {
        img.style.height = h + "px";
        img.style.top = (this.getMH() - h) / 2 + "px";
    };

    this.setImgWidth = function(w) {
        this.setStyleWidth(w);
        customWidth = w;
    };

    this.setImgHeight = function(h) {
        this.setStyleHeight(h);
        customHeight = h;
    };

    this.onMeasure = function (wMS, hMS) {
        this.div.style.lineHeight = MS.getSize(hMS) + "px";

        this.applyDimen(wMS, hMS);

        this.scale();
    };

    this.scale = function() {
        if (img != null) {
            var nw = img.naturalWidth;
            var nh = img.naturalHeight;
            if (nw == 0 || nh == 0) {
                scaleTimeout = setTimeout(this.scale, 200);
                img.onload = self.scaleInner;
                self.setStyleWidth(self.getMW());
            } else {
                clearTimeout(scaleTimeout);
                self.scaleInner();
            }
        }
    };

    this.scaleInner = function() {
        var nw = img.naturalWidth;
        var nh = img.naturalHeight;
        var width = self.getWidth();
        var height = self.getHeight();
        if (customWidth != 0) {
            var h = customWidth * nh / nw;
            self.setStyleWidth(customWidth);
            self.setStyleHeight(h);
        } else if (customHeight != 0) {
            var w = customHeight * nw / nh;
            self.setStyleWidth(w);
            self.setStyleHeight(customHeight);
        } else if (scaleType == ScaleType.CENTER) {
            self.setStyleWidth(nw);
            self.setStyleHeight(nh);
        } else if (scaleType == ScaleType.FIT_XY) {
            self.setStyleWidth(width);
            self.setStyleHeight(height);
        } else if (scaleType == ScaleType.CENTER_INSIDE) {
            if (nw > width || nh > height) {
                self.fitCenter(nw, nh, width, height);
            }
        } else if (scaleType == ScaleType.FIT_CENTER) {
            self.fitCenter(nw, nh, width, height);
        } else if (scaleType == ScaleType.CENTER_CROP) {
            self.cropCenter(nw, nh, width, height);
        }

        if (loadedListener) {
            loadedListener.call(this);
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

function LiteImageView() {
    View.apply(this);

    this.div = document.createElement("img");
    this.div.style.verticalAlign = "middle";
    this.div.style.position = "absolute";

    var self = this;
    var src = null;

    this.setImageUri = function(src) {
        this.setImgSrc(src);
    };

    this.setImgSrc = function(_src) {
        this.setVisibility(View.VISIBLE);
        src = _src;

        this.div.src = src;
        this.div.onerror = function() {
            self.setVisibility(View.INVISIBLE);
        };
    };

    this.onMeasure = function(wMS, hMS) {
        var w = MS.getSize(wMS);
        var h = MS.getSize(hMS);

        this.div.style.width = w + "px";
        this.div.style.height = h + "px";

        this.setMD(w, h);
    };
}

/**
 * Displays a button with an image (instead of text) that can be pressed
 * or clicked by the user.
 *
 * @class ImageButton
 */
function ImageButton() {
    ImageView.apply(this);
}

/**
 * Displays text to the user and not allows editing.
 *
 * @class TextView
 */
function TextView() {
    ViewGroup.apply(this);

    var gravity = 0;
    var textSize = 12;
    var singleLine = false;
    var cnt = document.createElement("div");
    cnt.style.overflow = "auto";
    cnt.style.whiteSpace = "normal";
    cnt.style.position = "absolute";
    this.div.appendChild(cnt);

    /**
     * Return the text that TextView is displaying.
     *
     * @method getText
     * @return {string} The text in the TextView.
     */
    this.getText = function() {
        return cnt.innerHTML;
    };

    /**
     * Sets the string value of the TextView.
     *
     * @method setText
     * @param {string} t Sets the string value.
     */
    this.setText = function(t) {
        cnt.innerHTML = t;
    };

    /**
     * Sets whether the content of this view is selectable by the user.
     *
     * @method setTextIsSelectable
     * @param {boolean} s Whether the content of this TextView should be selectable.
     */
    this.setTextIsSelectable = function(s) {
        if (s) {
            this.setPreventHtmlTouchEvent(false);
            cnt.style["-webkit-user-select"] = "text";
        } else {
            this.setPreventHtmlTouchEvent(true);
            cnt.style["-webkit-user-select"] = "none";
        }
    };

    /**
     * Sets the text color.
     *
     * @method setTextColor
     * @param {int} c The text color.
     */
    this.setTextColor = function(c) {
        cnt.style.color = Utils.toCssColor(c);
    };

    /**
     * Set the default text size to the given value.
     *
     * @method setTextSize
     * @param {int} ts The default text size.
     */
    this.setTextSize = function(ts) {
        textSize = ts;
        cnt.style.fontSize = ts + "px";
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
        cnt.style.textShadow = dx + "px " + dy + "px " + radius + "px " + Utils.toCssColor(color);
    };

    /**
     * Set the line height.
     *
     * @method setLineHeight
     * @param {int} h the line height.
     */
    this.setLineHeight = function(h) {
        cnt.style.lineHeight = h + "px";
    };

    /**
     * Sets whether the line is single.
     *
     * @method setSingleLine
     * @param {boolean} s Whether the line is single.
     */
    this.setSingleLine = function(s) {
        if (singleLine != s) {
            singleLine = s;
            if (singleLine) {
                cnt.style.whiteSpace = "nowrap";
            } else {
                cnt.style.whiteSpace = "normal";
            }
            if (this.getMW() != 0 && this.getMH() != 0) {
                this.requestLayout();
            }
        }
    };

    this.onMeasure = function(wMS, hMS) {
        var w = MS.getSize(wMS);
        var h = MS.getSize(hMS);
        var hMode = MS.getMode(hMS);
        var wMode = MS.getMode(wMS);

        cnt.style.width = (w - this.getPL() - this.getPR()) + "px";
        cnt.style.height = "100%";
        cnt.style.left = this.getPL() + "px";

        var measureDiv = document.createElement("div");
        if (wMode == MS.UNSPECIFIED) {
            measureDiv.style.width = "auto";
            measureDiv.style.display = "inline-block";
        } else {
            measureDiv.style.width = cnt.style.width;
        }
        measureDiv.style.height = "100%";
        measureDiv.style.fontFamily = Utils.findFontFamily(cnt);
        measureDiv.style.lineHeight = cnt.style.lineHeight;
        measureDiv.style.fontSize = cnt.style.fontSize;
        measureDiv.style.whiteSpace = cnt.style.whiteSpace;
        if (cnt.innerHTML != "") {
            measureDiv.innerHTML = cnt.innerHTML;
        } else {
            measureDiv.innerHTML = "　";
        }
        mHideDiv.appendChild(measureDiv);

        if (measureDiv.clientHeight !== 0) {
            var measureH = measureDiv.clientHeight;
            var measureW = measureDiv.clientWidth;
            if (wMode == MS.UNSPECIFIED) {
                w = measureW + this.getPL() + this.getPR() + 1;
                cnt.style.width = w + "px";
            }
            if (hMode == MS.UNSPECIFIED) {
                h = measureH;
            } else {
                if (hMode != MS.EXACTLY && h < measureH) {
                    h = measureH;
                } else {
                    if (h > measureH) {
                        cnt.style.clientHeight = measureH + "px";
                        cnt.style.height = "auto";
                        cnt.style.position = "absolute";
                        if (gravity & Gravity.CENTER_VERTICAL) {
                            cnt.style.top = (h - measureH) / 2 + "px";
                        } else if (gravity & Gravity.BOTTOM) {
                            cnt.style.top = (h - measureH) + "px";
                        } else {
                            cnt.style.top = 0 + "px";
                        }
                    }
                }
            }
        }
        mHideDiv.removeChild(measureDiv);

        mHideDiv.style.width = "auto";
        mHideDiv.style.height = "auto";

        this.setMD(w, h);

    };

    /**
     * Sets the horizontal alignment of the text and the
     * vertical gravity that will be used when there is extra space
     * in the TextView beyond what is required for the text itself.
     *
     * @method setGravity
     * @param {int} g
     */
    this.setGravity = function(g) {
        gravity = g;

        if (g & Gravity.CENTER_HORIZONTAL) {
            this.div.style.textAlign = "center";
        } else if (g & Gravity.RIGHT) {
            this.div.style.textAlign = "right";
        } else {
            this.div.style.textAlign = "left";
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
    View.apply(this);

    var bg = 0x00ffffff;
    var pressBg = 0x1a000000;

    var textColor = 0xff333333;
    var pressTextColor = 0xffffffff;

    var borderT = 0;
    var borderB = 0;

    this.div.style.textAlign = "center";
    this.setBorder(1, 0x1a000000);

    this.setNormalBg = function(c) {
        bg = c;
    };

    this.setPressBg = function(c) {
        pressBg = c;
    };

    this.setNormalTextColor = function(c) {
        textColor = c;
    };

    this.setPressTextColor = function(c) {
        pressTextColor = c;
    };

    this.onDraw = function() {
        if (this.isPressed()) {
            this.setBg(pressBg);
            this.setTextColor(pressTextColor);
        } else {
            this.setBg(bg);
            this.setTextColor(textColor);
        }
    };

    this.onAfterMeasure = function() {
        this.div.style.lineHeight = (this.getMH() - borderT - borderB) + "px";
    };

    this.setBorder = function(t, c) {
        borderT = borderB = t;
        this.div.style.border = borderCss(t, c);
    };

    this.setBorderTop = function(t, c) {
        borderT = t;
        this.div.style.borderTop = borderCss(t, c);
    };

    this.setBorderBottom = function(t, c) {
        borderB = t;
        this.div.style.borderBottom = borderCss(t, c);
    };

    function borderCss(t, c) {
        return t + "px solid " + Utils.toCssColor(c);
    }
}

/**
 *
 * @class EditText
 */
function EditText() {
    ViewGroup.apply(this);

    var tag = "EditText" + (new Date()).getTime();

    var self = this;
    var focusListener = null;
    var input;
    var textSize = 12;
    var isPassword = false;
    var textListener = null;
    var isFocused;

    this.setPreventHtmlTouchEvent(false);

    this.setDisabled = function(bool) {
        if (bool) {
            input.disabled = "disabled";
        } else {
            input.disabled = "";
        }
    };

    /**
     * Sets whether the text of this EditText is password.
     *
     * @method setPassword
     * @param {boolean} bool
     */
    this.setPassword = function(bool) {
        isPassword = bool;
        input.type = "password";
    };

    this.getInput = function() {
        return input;
    };

    this.addInput = function() {
        this.div.innerHTML = "";
        input = document.createElement("input");
        init();
        this.div.appendChild(input);
    };
    this.addInput();

    this.addTextArea = function() {
        this.div.innerHTML = "";
        input = document.createElement("textarea");
        init();
        this.div.appendChild(input);
    };

    this.isFocused = function() {
        return isFocused;
    };

    this.setOnFocusChangeListener = function(l) {
        focusListener = l;
    };

    this.onFocusChanged = function(bool) {
        isFocused = bool;
        if (focusListener != null) {
            focusListener.call(this, bool);
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
        input.selectionStart = start;
        if (end == undefined) {
            input.selectionEnd = start;
        } else {
            input.selectionEnd = end;
        }
    };

    /**
     * Return the offset of the selection anchor or cursor.
     *
     * @method getSelectionStart
     * @return {int} The offset.
     */
    this.getSelectionStart = function() {
        return input.selectionStart;
    };

    /**
     * Return the offset of the selection edge or cursor.
     *
     * @method getSelectionEnd
     * @return {int} The offset.
     */
    this.getSelectionEnd = function() {
        return input.selectionEnd;
    };

    /**
     * set a listener to whose methods are called whenever this EditText's text changes.
     *
     * @method setTextChangedListener
     * @param l.
     */
    this.setTextChangedListener = function(l) {
        textListener = l;
        input.oninput = l;
    };

    /**
     * Return the text that EditText is displaying.
     *
     * @method getText
     * @return {string} The text in the EditText.
     */
    this.getText = function() {
        return input.value;
    };

    /**
     * Sets the string value of the EditText.
     *
     * @method setText
     * @param {string} t Sets the string value.
     */
    this.setText = function(t) {
        input.value = t;
    };

    /**
     * Sets the text size of the EditText.
     *
     * @method setTextSize
     * @param {int} s Sets the text size.
     */
    this.setTextSize = function(s) {
        textSize = s;
        input.style.fontSize = s + "px";
    };

    /**
     * Sets the text color of the EditText.
     *
     * @method setTextColor
     * @param {int} c Sets the text color.
     */
    this.setTextColor = function(c) {
        input.style.color = Utils.toCssColor(c);
    };

    /**
     * Sets the text to be displayed when the text of the EditText is empty.
     *
     * @method setHint
     * @param {string} t Sets the hint text.
     */
    this.setHint = function(t) {
        input.placeholder = t;
    };

    this.setHintText = function(t) {
        input.placeholder = t;
    };

    /**
     * Sets the color of the hint text for this EditText.
     *
     * @method setHintColor
     * @param {int} c Sets the hint text's color.
     */
    this.setHintColor = function(c) {
        var css = document.createElement("style");
        css.innerHTML = "." + tag + "::-webkit-input-placeholder{ color:" + Utils.toCssColor(c) + "}";
        document.head.appendChild(css);
        input.className += tag + " ";
    };

    /**
     * To get this EditText to take focus.
     *
     * @method requestFocus
     */
    this.requestFocus = function() {
        input.focus();
    };

    this.onMeasure = function(wMS, hMS) {
        var w = MS.getSize(wMS);
        var h = MS.getSize(hMS);
        var hMode = MS.getMode(hMS);

        var border = parseFloat(this.div.style.border.replace(/^(.*)px.*$/, '$1')) * 2 || 0;

        var cntW = w - this.getPL() - this.getPR();
        var cntH = h - this.getPT() - this.getPB() - border;
        if (hMode != MS.EXACTLY) {
            cntH = textSize * 1.5;
            h = cntH + this.getPT() + this.getPB();
        }
        input.style.fontFamily = Utils.findFontFamily(input);
        input.style.width = cntW + "px";
        input.style.height = cntH + "px";

        this.setMD(w, h);
    };

    this.onLayout = function() {
        input.style.top = this.getPT() + "px";
        input.style.left = this.getPL() + "px";
    };

    function init() {
        if (isPassword) {
            input.type = "password";
        } else {
            input.type = "text";
        }
        input.style["-webkit-user-select"] = "text";
        input.style.boxSizing = "border-box";
        input.style.position = "absolute";
        input.style.background = "none";
        input.style.border = "0";
        input.style.outline = "none";
        input.style.padding = 0;
        input.style.fontSize = textSize;
        input.onfocus = function() {
            self.onFocusChanged(true);
        };
        input.onblur = function() {
            self.onFocusChanged(false);
        };
        if (textListener != null) {
            input.oninput = textListener;
        }
    }
}

/**
 * @class WebView
 */
function WebView() {
    ViewGroup.apply(this);

    this.setPreventHtmlTouchEvent(true);
    this.setBg("#ffffff");

    var frame = document.createElement("iframe");
    frame.style.border = "none";
    this.div.appendChild(frame);

    var finishListener;
    var outTimeId = 0;

    this.getWindow = function() {
        return frame.contentWindow;
    };

    this.getDom = function() {
        return frame.contentWindow.document;
    };

    this.setOnPageFinishListener = function(l, outTime) {
        //mFrame.onload = l;

        finishListener = l;
        frame.onload = function() {
            if (finishListener) {
                finishListener.call(this);
                if (outTime) {
                    finishListener = null;
                    clearTimeout(outTimeId);
                }
            }
        };
        if (outTime) {
            outTimeId = setTimeout(function() {
                if (finishListener) {
                    finishListener.call(this);
                    finishListener = null;
                }
            }, outTime)
        }
    };

    this.loadUrl = function(url) {
        frame.src = url;
    };

    this.loadService = function(data) {
        frame.srcdoc = data;
    };

    this.loadDataWithBaseURL = function(data) {
        frame.srcdoc = data;
    };

    this.setSrc = function(src){
        this.loadUrl(src);
    };

    this.setSrcDoc = function(srcdoc) {
        frame.srcdoc = srcdoc;
    };

    this.getFrame = function() {
        return frame;
    };

    this.onMeasure = function(wMS, hMS) {
        var w = MS.getSize(wMS);
        var h = MS.getSize(hMS);
        frame.style.width = w + "px";
        frame.style.height = h + "px";
        this.setMD(w, h);
    };
}
