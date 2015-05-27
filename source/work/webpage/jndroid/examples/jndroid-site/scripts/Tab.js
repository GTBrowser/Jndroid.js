function Tab () {
    ViewGroup.apply(this, []);
    this.setBackgroundColor(THEME_COLOR);
    this.setBoxShadow(0, 5, 5, 0, 0x42000000);

    var mScrollView = new HorizontalScrollView();
    this.addView(mScrollView);
    var mTabContent = new TabContent();
    mScrollView.addView(mTabContent);

    var mIndicator = new Indicator();
    mIndicator.setStyle(Indicator.Line);
    mIndicator.setIndicatorCount(4);
    mIndicator.setIndicatorColor(0xfff3ffa3);
    mIndicator.INDICATOR_SIZE = 240;
    mIndicator.GAP = 0;
    this.addView(mIndicator);

    mTabContent.setTabListener(this);

    this.onTabButtonSelect = function(index) {
        mIndicator.onXChanged(index / 3);
    };

    this.onMeasure = function(widthMS, heightMS) {
        var width = MeasureSpec.getSize(widthMS);
        var height = MeasureSpec.getSize(heightMS);

        mScrollView.measure(widthMS, heightMS);
        mIndicator.measure(widthMS, 2);

        this.setMeasuredDimension(width, height);
    };

    this.onLayout = function(x, y) {
        var offSetY = 0;
        mScrollView.layout(0, 0);
        mIndicator.layout(16,this.getMeasuredHeight() - mIndicator.getMeasuredHeight());
    };

}

function TabContent() {
    LinearLayout.apply(this, []);

    var mSelf = this;
    var mListener;
    var mItems = [];
    var buttonWidth = 240;
    var mSelectIndex = 0;

    var mContent = new LinearLayout();
    mContent.setOrientation(LinearLayout.HORIZONTAL);
    var mContentLp = new LayoutParams( LayoutParams.FILL_PARENT, LayoutParams.FILL_PARENT);
    mContentLp.leftMargin = 16;
    this.addView(mContent, mContentLp);

    var mButtonLp = new LayoutParams(buttonWidth, LayoutParams.FILL_PARENT);

    var createButton = function (text) {
        var button = new LButton();
        button.setText(text);
        button.setTextColor(0xffffffff);
        button.setDimBg(false);
        button.setWaveColor(0x33ffffff);
        button.setBoxShadow(0, 0, 0, 0, 0);
        button.setTextSize(24);
        return button;
    };

    var mIntroductionButton = createButton("Introduction");
    mIntroductionButton.setOnClickListener(function() {
        mSelf.setSelectIndex(0);
        mGallery.snapToScreen(0, 300);
    });
    mItems.push(mIntroductionButton);
    mContent.addView(mIntroductionButton, mButtonLp);

    var mDocumentationButton = createButton("Documentation");
    mDocumentationButton.setOnClickListener(function() {
        mSelf.setSelectIndex(1);
        mGallery.snapToScreen(1, 300);
        this.postDelayed(function() {
            if (mDocView == null) {
                mDocView = new DocumentationView();
                mDocPage.addView(mDocView);
            }
        }, 300);
    });
    mItems.push(mDocumentationButton);
    mContent.addView(mDocumentationButton, mButtonLp);

    var mApplicationsButton = createButton("Applications");
    mApplicationsButton.setOnClickListener(function() {
        mGallery.snapToScreen(2, 300);
        mSelf.setSelectIndex(2);
        this.postDelayed(function() {
            if (mAppView == null) {
                mAppView = new ApplicationsView();
                mAppPage.addView(mAppView);
            }
        }, 300);
    });
    mItems.push(mApplicationsButton);
    mContent.addView(mApplicationsButton, mButtonLp);

    var mQAButton = createButton("Q&A");
    mQAButton.setOnClickListener(function() {
        mGallery.snapToScreen(3, 300);
        mSelf.setSelectIndex(3);
        this.postDelayed(function() {
            if (mQAView == null) {
                mQAView = new QAView();
                mQAPage.addView(mQAView);
            }
        }, 300);
    });
    mItems.push(mQAButton);
    mContent.addView(mQAButton, mButtonLp);


    this.setTabListener = function(listener) {
        mListener = listener;
    };

    this.setSelectIndex = function(index) {
        mSelectIndex = index;
        if (mListener != null) {
            mListener.onTabButtonSelect(index);
        }
        for (var i = 0; i < mItems.length;i++) {
            if (i == mSelectIndex) {
                mItems[i].setTextColor(0xffffffff);
            } else {
                mItems[i].setTextColor(0xff96E9F1);
            }
        }
    };

    this.setSelectIndex(0);
}
