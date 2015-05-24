/**
 * Created by lency on 4/28/15.
 */

var mTitlebar;
var mSidebar;
var mMainView;
var mMask;
var mGallery;
var mIntroPage;
var mDocPage;
var mAppPage;
var mIntroView = null;
var mDocView = null;
var mAppView = null;

function MainView() {
    ViewGroup.apply(this, []);

    mGallery = new Gallery();
    this.addView(mGallery);

    mTitlebar = new Titlebar();
    this.addView(mTitlebar);

    mMask = new ViewGroup();
    mMask.setBackgroundColor(0x99000000);
    mMask.setOnClickListener(function(){
        mMask.setVisibility(View.GONE);
        mSidebar.hide();
    });
    mMask.setVisibility(View.GONE);
    this.addView(mMask);

    mSidebar = new Sidebar();
    this.addView(mSidebar);

    mIntroPage = new FrameLayout();
    mDocPage = new FrameLayout();
    mAppPage = new FrameLayout();
    mGallery.addPage(mIntroPage);
    mGallery.addPage(mDocPage);
    mGallery.addPage(mAppPage);

    mIntroView = new IntroductionView();
    mIntroPage.addView(mIntroView);

    this.onMeasure = function(widthMS, heightMS) {
        var width = MeasureSpec.getSize(widthMS);
        var height = MeasureSpec.getSize(heightMS);

        mTitlebar.measure(widthMS, 64);
        mSidebar.measure(240, heightMS);
        mMask.measure(widthMS, heightMS);
        mGallery.measure(widthMS, height - 64);

        this.setMeasuredDimension(width, height);
    };

    this.onLayout = function(x, y) {
        mTitlebar.layout(0, 0);
        mSidebar.layout(-240, 0);
        mMask.layout(0, 0);
        mGallery.layout(0, 64);
    };

    this.showSideBar = function(){
        mMask.setVisibility(View.VISIBLE);
        mSidebar.show();
    };

    this.hideSidebar = function(){
        mMask.setVisibility(View.GONE);
        mSidebar.hide();
    };

    this.setTitleText = function(text){
        mTitlebar.setTitleText(text);
    }
}

window.onload = function(){

    var rootview = new FrameLayout();
    setContentView(rootview);

    mMainView = new MainView();
    mMainView.setStyle("fontFamily", "RobotoDraft, Roboto, sans-serif");
    rootview.addView(mMainView);
};