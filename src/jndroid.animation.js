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