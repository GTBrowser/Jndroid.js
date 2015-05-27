/**
 * Created by lency on 4/28/15.
 */

var mTab;
var mMainView;
var mGallery;
var mIntroPage;
var mDocPage;
var mAppPage;
var mQAPage;
var mIntroView = null;
var mDocView = null;
var mAppView = null;
var mQAView = null;

function MainView() {
    ViewGroup.apply(this, []);

    mGallery = new Gallery();
    this.addView(mGallery);

    mTab = new Tab();
    this.addView(mTab);

    mIntroPage = new FrameLayout();
    mDocPage = new FrameLayout();
    mAppPage = new FrameLayout();
    mQAPage = new FrameLayout();
    mGallery.addPage(mIntroPage);
    mGallery.addPage(mDocPage);
    mGallery.addPage(mAppPage);
    mGallery.addPage(mQAPage);

    mIntroView = new IntroductionView();
    mIntroPage.addView(mIntroView);

    this.onMeasure = function(widthMS, heightMS) {
        var width = MeasureSpec.getSize(widthMS);
        var height = MeasureSpec.getSize(heightMS);

        mTab.measure(widthMS, 64);
        mGallery.measure(widthMS, height - 64);

        this.setMeasuredDimension(width, height);
    };

    this.onLayout = function(x, y) {
        var offSetY = 0;
        mTab.layout(0,offSetY);
        offSetY += mTab.getMeasuredHeight();
        mGallery.layout(0, offSetY);
    };
}

window.onload = function(){

    var rootview = new FrameLayout();
    setContentView(rootview);

    mMainView = new MainView();
    mMainView.setStyle("fontFamily", "RobotoDraft, Roboto, sans-serif");
    rootview.addView(mMainView);
};