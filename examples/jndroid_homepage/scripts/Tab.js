function Tab () {
    ViewGroup.apply(this, []);
    this.setBackgroundColor(THEME_COLOR);
    this.setBoxShadow(0, 6, 6, 0, 0x42000000);

    var mScrollView = new HorizontalScrollView();
    mScrollView.setPadding(0);
    //this.postDelayed(function() {
    //    mScrollView.scrollTo(100);
    //}, 1000);
    this.addView(mScrollView);
    var mTabContent = new TabContent();
    mScrollView.addView(mTabContent);

    this.onMeasure = function(widthMS, heightMS) {
        var width = MeasureSpec.getSize(widthMS);
        var height = MeasureSpec.getSize(heightMS);

        mScrollView.measure(widthMS, heightMS);

        this.setMeasuredDimension(width, height);
    };

    this.onLayout = function(x, y) {
        var offSetY = 0;
        mScrollView.layout(0, 0);
    };

}

function TabContent() {
    ViewGroup.apply(this, []);

    var mSelf = this;
    var mItems = [];
    var buttonWidth = 240;
    var mSelectIndex = 0;

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
    this.addView(mIntroductionButton);

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
    this.addView(mDocumentationButton);

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
    this.addView(mApplicationsButton);

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
    this.addView(mQAButton);

    var mIndicator = new Indicator();
    mIndicator.setStyle(Indicator.Line);
    mIndicator.setIndicatorCount(4);
    mIndicator.setIndicatorColor(0xfff3ffa3);
    mIndicator.INDICATOR_SIZE = buttonWidth;
    mIndicator.GAP = 0;
    this.addView(mIndicator);

    this.setSelectIndex = function(index) {
        mSelectIndex = index;
        mIndicator.onXChanged(index / 3);
        for (var i = 0; i < mItems.length;i++) {
            if (i == mSelectIndex) {
                mItems[i].setTextColor(0xffffffff);
            } else {
                mItems[i].setTextColor(0xff96E9F1);
            }
        }
    };

    this.setSelectIndex(0);

    this.onMeasure = function(widthMS, heightMS) {
        var height = MeasureSpec.getSize(heightMS);
        for (var i = 0; i < mItems.length; i++) {
            mItems[i].measure(buttonWidth, MeasureSpec.makeMeasureSpec(height, MeasureSpec.EXACTLY));
        }
        var width = mItems[0].getMeasuredWidth() * mItems.length;
        mIndicator.measure(width, 2);
        this.setMeasuredDimension(width + PADDING * 2, height);
    };

    this.onLayout = function(x, y) {
        var offsetX = PADDING;
        var offsetY = 0;
        for (var i = 0; i < mItems.length; i++) {
            mItems[i].layout(offsetX, offsetY);
            offsetX += mItems[i].getMeasuredWidth();
        }
        offsetX = PADDING;
        offsetY = this.getMeasuredHeight() - mIndicator.getMeasuredHeight();
        mIndicator.layout(offsetX, offsetY);
    };
}
