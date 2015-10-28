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
    this.vendors = { Webkit: 'webkit', Moz: 'Moz', O: 'o', Ms:'ms'};

    this.getStartState = function() {

    };

    this.getEndState = function() {

    };

    this.getTransition = function() {

    };

    this.setAnimationEndListener = function(listener) {
        mEndListener = listener;
    };

    this.fireEnd = function() {
        if (mEndListener != null) {
            mEndListener.call(mView);
        }
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

    var mSelfPropertes = "transform";

    var mResetState = "translate3d(0px, 0px, 0)";

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
        return  mSelf.getDuration() + "ms " + mSelf.getInterpolator();
    };

    this.getSelfPropertes = function() {
        return mSelfPropertes;
    };

    this.initState = function(_view) {
        _view.div.style.transform = mSelf.getStartState();
        for (var i in mSelf.vendors) {
            _view.div.style[mSelf.vendors[i] + "Transform"] = mSelf.getStartState();
        }
    };

    this.stopState = function(_view) {
        _view.div.style.transform = mSelf.getEndState();
        for (var i in mSelf.vendors) {
            _view.div.style[mSelf.vendors[i] + "Transform"] = mSelf.getEndState();;
        }
    };

    this.resetState = function(_view) {
        // _view.div.style.transform = mResetState;
        for (var i in mSelf.vendors) {
            _view.div.style[mSelf.vendors[i] + "Transition"] = "";
            _view.div.style[mSelf.vendors[i] + "Transform"] = mResetState;
        }
    }

    this.isTransform = function() {
        return true;
    }

    this.start = function() {
        if (this.getStartOffset() === 0) {
            this.startInner();
        } else {
            setTimeout(function(){
                mSelf.startInner();
            }, this.getStartOffset());
        }

        setTimeout(this.fireEnd, this.getDuration() + this.getStartOffset() + 1);
    };

    this.startInner = function() {
        mSelf.initState(mSelf.getView());
        setTimeout(function() {
            mSelf.getView().div.style.translation = "transform " + mSelf.getTransition();
            for (var i in mSelf.vendors) {
                mSelf.getView().div.style[mSelf.vendors[i] + "Transition"] = "-" + mSelf.vendors[i] + "-transform " + mSelf.getTransition();
            }
            mSelf.stopState(mSelf.getView());

            // mSelf.getView().div.style.webkitTransitionProperty = mSelf.getSelfPropertes();
            // mSelf.getView().div.style.webkitTransitionDuration =mSelf.getDuration() + "ms";
            // mSelf.getView().div.style.webkitTransitionDelay = mSelf.getStartOffset() + "ms";
            // mSelf.getView().div.style.webkitTransitionTimingFunction =mSelf.getInterpolator();

            //   	mSelf.stopState(mSelf.getView());

        }, 1);
        if (mSelf.getFillMode() == "backwards") {
            setTimeout(function() {
                mSelf.resetState(mSelf.getView());
            }, mSelf.getDuration() + 1);
        }
    };
}

function AlphaAnimation(fromAlpha,toAlpha) {
    Animation.apply(this, []);

    var mSelf = this;

    var mSelfPropertes = "opacity";

    var mResetState = "";

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

    this.getSelfPropertes = function() {
        return mSelfPropertes;
    };

    this.initState = function(_view) {
        resetAlpha = _view.div.style.opacity;
        _view.div.style.opacity = mSelf.getStartState();
    };

    this.stopState = function(_view) {
        _view.div.style.opacity = mSelf.getEndState();
    };

    this.resetState = function(_view) {
        for (var i in mSelf.vendors) {
            _view.div.style[mSelf.vendors[i] + "Transition"] = "";
            // console.log(mSelf.getView().div.style[mSelf.vendors[i] + "Transition"]);
        }
        _view.div.style.opacity = mResetState;
    };

    this.isTransform = function() {
        return false;
    }

    this.startInner = function() {
        mSelf.initState(mSelf.getView());
        setTimeout(function(){
            for (var i in mSelf.vendors) {
                mSelf.getView().div.style[mSelf.vendors[i] + "Transition"] = mSelf.getTransition();
                // console.log(mSelf.getView().div.style[mSelf.vendors[i] + "Transition"]);
            }
            // mSelf.getView().div.style.webkitTransition = mSelf.getTransition();
            mSelf.stopState(mSelf.getView());
        }, 1);

        if (mSelf.getFillMode() == "backwards") {
            setTimeout(function() {
                mSelf.resetState(mSelf.getView());
            }, mSelf.getDuration() + 1);
        }
    };

    this.start = function() {
        if (this.getStartOffset() === 0) {
            this.startInner();
        } else {
            setTimeout(function(){
                mSelf.startInner();
            }, this.getStartOffset());
        }

        setTimeout(this.fireEnd, this.getDuration() + this.getStartOffset() + 1);
    };
}

function RotateAnimation(fromDegrees, toDegrees) {
    Animation.apply(this, []);

    var mSelfPropertes = "-webkit-transform";

    var mSelf = this;

    var mResetState = "rotate(0deg)";

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
        return mSelf.getDuration() + "ms " + mSelf.getInterpolator();
    };

    this.getSelfPropertes = function() {
        return mSelfPropertes;
    };

    this.resetState = function(_view) {
        // _view.div.style.transform = mResetState;
        for (var i in mSelf.vendors) {
            _view.div.style[mSelf.vendors[i] + "Transition"] = "";
            _view.div.style[mSelf.vendors[i] + "Transform"] = mResetState;
        }
    }

    this.initState = function(_view) {
        _view.div.style.transform = mSelf.getStartState();
        for (var i in mSelf.vendors) {
            _view.div.style[mSelf.vendors[i] + "Transform"] = mSelf.getStartState();
        }
    }

    this.stopState = function(_view) {
        _view.div.style.transform = mSelf.getEndState();
        for (var i in mSelf.vendors) {
            _view.div.style[mSelf.vendors[i] + "Transform"] = mSelf.getEndState();;
        }
    }

    this.isTransform = function() {
        return true;
    }

    this.start = function() {
        setTimeout(function(){
            mSelf.initState(mSelf.getView());
            setTimeout(function(){
                // mSelf.getView().div.style.webkitTransition = mSelf.getTransition();
                for (var i in mSelf.vendors) {
                    mSelf.getView().div.style[mSelf.vendors[i] + "Transition"] = "-" + mSelf.vendors[i] + "-transform " + mSelf.getTransition();
                    // console.log(mSelf.getView().div.style[mSelf.vendors[i] + "Transition"]);
                }
                mSelf.stopState(mSelf.getView());
            }, 1);

            if (mSelf.getFillMode() == "backwards") {
                setTimeout(function() {
                    console.log("start reset!!");
                    mSelf.resetState(mSelf.getView());
                    console.log("zyb reset!!");
                }, mSelf.getDuration() + 1);
            }
        }, this.getStartOffset());

        setTimeout(this.fireEnd, this.getDuration() + this.getStartOffset() + 1);
    };
}

function ScaleAnimation(fromScale, toScale) {
    Animation.apply(this, []);

    var mSelfPropertes = "-webkit-transform";

    var mSelf = this;

    var mResetState = "scale(1)";

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
        return mSelf.getDuration() + "ms " + mSelf.getInterpolator();
    };

    this.getSelfPropertes = function() {
        return mSelfPropertes;
    };

    this.resetState = function(_view) {
        _view.div.style.transform = mResetState;
        for (var i in mSelf.vendors) {
            _view.div.style[mSelf.vendors[i] + "Transition"] = "";
            _view.div.style[mSelf.vendors[i] + "Transform"] = mResetState;
        }

    };

    this.initState = function(_view) {
        // _view.div.style.transform = mSelf.getStartState();
        for (var i in mSelf.vendors) {
            _view.div.style[mSelf.vendors[i] + "Transform"] = mSelf.getStartState();
        }
    }

    this.stopState = function(_view) {
        _view.div.style.transform = mSelf.getEndState();
        for (var i in mSelf.vendors) {
            _view.div.style[mSelf.vendors[i] + "Transform"] = mSelf.getEndState();;
        }
    }

    this.isTransform = function() {
        return true;
    }

    this.start = function() {
        setTimeout(function(){
            mSelf.initState(mSelf.getView());
            // mSelf.initState(mSelf.getView());
            setTimeout(function() {
                // mSelf.getView().div.style.webkitTransition = mSelf.getTransition();
                for (var i in mSelf.vendors) {
                    mSelf.getView().div.style[mSelf.vendors[i] + "Transition"] = "-" + mSelf.vendors[i] + "-transform " + mSelf.getTransition();
                    // console.log(mSelf.getView().div.style[mSelf.vendors[i] + "Transition"]);
                }
                mSelf.stopState(mSelf.getView());
            }, 30);

            if (mSelf.getFillMode() == "backwards") {
                setTimeout(function() {
                    console.log("start reset!!");
                    mSelf.resetState(mSelf.getView());
                    console.log("zyb reset!!");
                }, mSelf.getDuration() + 100);
            }

        }, this.getStartOffset());

        setTimeout(this.fireEnd, this.getDuration() + this.getStartOffset() + 1);
    };
}

function AnimationSet() {

    Animation.apply(this, []);

    var mSelf = this;

    var mTransform = "";

    var mAnimationList = new Array();

    var mMaxDuration = 0;

    this.getTag = function() {
        return "AnimationSet";
    };

    this.getStartState = function() {
        return mSelf.startState;
    };

    this.getEndState = function() {
        return mSelf.endState;
    };

    this.getTransition = function() {
        return "";
    };

    this.start = function() {
        if (this.getStartOffset() === 0) {
            this.startInner();
        } else {
            setTimeout(function(){
                mSelf.startInner();
            }, 	this.getStartOffset());
        }

        setTimeout(this.fireEnd, this.getDuration() + this.getStartOffset() + 1);
    };

    this.addAnimation = function (_animation) {
        mAnimationList.push(_animation);
    };

    this.resetState = function(_view) {
        var n = mAnimationList.length;
        for (var i = 0; i < n; i++) {
            var anim = mAnimationList[i];
            anim.resetState(_view);
        }
        for (var i in mSelf.vendors) {
            _view.div.style[mSelf.vendors[i] + "Transform"] = "";
        }
    };

    this.initState = function(_view) {
        var n = mAnimationList.length;
        var trans = "";
        mMaxDuration = mSelf.getDuration();
        for (var i = 0; i < n; i++) {
            var anim = mAnimationList[i];
            if (anim.isTransform()) {
                if (trans == "") {
                    trans = anim.getStartState();
                } else {
                    trans = trans + " " + anim.getStartState();
                }
            } else {
                anim.initState(_view);
            }
            if (mSelf.getDuration() == 0) {
                mMaxDuration = mMaxDuration < anim.getDuration() ? anim.getDuration() : mMaxDuration;
            }
        }
        for (var i in mSelf.vendors) {
            _view.div.style[mSelf.vendors[i] + "Transform"] = trans;
        }
    }

    this.stopState = function(_view) {
        var n = mAnimationList.length;
        var trans = "";
        for (var i = 0; i < n; i++) {
            var anim = mAnimationList[i];
            if (anim.isTransform()) {
                if (trans == "") {
                    trans = anim.getEndState();
                } else {
                    trans = trans + " " + anim.getEndState();
                }
            } else {
                anim.stopState(_view);
            }
        }
        for (var i in mSelf.vendors) {
            _view.div.style[mSelf.vendors[i] + "Transform"] = trans;
        }
    }

    this.startInner = function() {
        mSelf.initState(mSelf.getView());
        setTimeout(function() {
            for (var i in mSelf.vendors) {

                mSelf.getView().div.style[mSelf.vendors[i] + "TransitionProperty"] = "all";
                mSelf.getView().div.style[mSelf.vendors[i] + "TransitionDuration"] = mMaxDuration + "ms";
                mSelf.getView().div.style[mSelf.vendors[i] + "TransitionTimingFunction"] = mSelf.getInterpolator();
            }

            mSelf.stopState(mSelf.getView());
        }, 1);

        if (mSelf.getFillMode() == "backwards") {
            setTimeout(function() {
                mSelf.resetState(mSelf.getView());
            }, mMaxDuration + 30);
        }
    };
};

function Interpolator (){}
Object.defineProperty(Interpolator,"LINEAR",{value:"linear"});
Object.defineProperty(Interpolator,"EASE",{value:"ease"});
Object.defineProperty(Interpolator,"EASE_IN",{value:"ease-in"});
Object.defineProperty(Interpolator,"EASE_OUT",{value:"ease-out"});
Object.defineProperty(Interpolator,"EASE_IN_OUT",{value:"ease-in-out"});