function StateFrameLayout(getViewCallback) {
    ViewGroup.apply(this);

    this.setTag("StateFrameLayout");

    var self = this;

    var frames = [];
    var inAnimation = false;
    var step = 0;
    var mFromRemove = false;

    this.addFragment = function(view, urlParam) {
        if (inAnimation) {
            return;
        }
        add(view);

        step++;
        var p = "?step=" + step;
        if (urlParam) {
            p += "&" + urlParam;
        }
        history.pushState(null, "", p);
    };

    this.removeFragment = function() {
        if (inAnimation) {
            return;
        }
        if (frames.length <= 1) {
            history.go(-1);
            return;
        }
        remove();
        mFromRemove = true;
        history.go(-1);
    };

    this.onMeasure = function(wMS, hMS) {
        var w = MeasureSpec.getSize(wMS);
        var h = MeasureSpec.getSize(hMS);
        for (var i = 0; i < this.getChildCount(); i++) {
            Utils.measureExactly(this.getChildAt(i), w, h);
        }
        this.setMeasuredDimension(w, h);
    };

    this.onLayout = function() {
        for (var i = 0; i < this.getChildCount(); i++) {
            this.getChildAt(i).layout(0, 0);
        }
    };

    function addWithoutAnimation(view) {
        self.removeAllViews();
        self.addView(view);
    }

    function add(view) {
        self.addView(view);
        frames.push(view);
        if (frames.length > 1) {
            var topView = frames[frames.length - 2];
            var animation = new AnimationSet();
            animation.setDuration(200);
            animation.setInterpolator(Interpolator.EASE);
            animation.setAnimationEndListener(function() {
                inAnimation = false;
                self.removeView(topView);
            });

            var alpha = new AlphaAnimation(0, 1);
            animation.addAnimation(alpha);

            view.startAnimation(animation);
            inAnimation = true;
        }
    }

    function removeWithoutAnimation(lastView) {
        self.removeAllViews();
        self.addView(lastView, 0);
    }

    function remove() {
        if (step >= 1) {
            var topView = frames[frames.length - 2];
            self.addView(topView, 0);

            var view = frames.pop();
            var translate = new TranslateAnimation(0, self.getMW(), 0, 0);
            translate.setDuration(500);
            translate.setInterpolator(Interpolator.EASE);
            translate.setAnimationEndListener(function() {
                inAnimation = false;
                self.removeView(view);
            });
            view.startAnimation(translate);
            inAnimation = true;
        }
    }

    var request = Utils.getRequest();
    if (request["step"]) {
        step = request["step"];
    } else {
        step = 0;
    }
    if (getViewCallback) {
        var view = getViewCallback.call(window, request);
        add(view);
    }

    window.onpopstate = function (e) {
        var request = Utils.getRequest();

        var _step = 0;
        if (request["step"]) {
            _step = request["step"];
        }
        if (_step > step) {
            if (getViewCallback) {
                var view = getViewCallback.call(this, request);
                addWithoutAnimation(view);
            }
        } else {
            if (mFromRemove) {
                mFromRemove = false;
            } else {
                if (getViewCallback) {
                    var lastView = getViewCallback.call(this, request);
                    removeWithoutAnimation(lastView);
                }
            }
        }
        step = _step;
    }
}