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
    var buttonWidth = 160;
    var mSelectIndex = 0;

    addTabItem("Jndroid", 0);
    addTabItem("vs Android", 1, function() {
        if (mVSView == null) {
            mVSView = new VSAndroidView();
            mVSPage.addView(mVSView);
        }
    });
    addTabItem("Documentation", 2, function() {
        if (mDocView == null) {
            mDocView = new DocumentationView();
            mDocPage.addView(mDocView);
        }
    });
    addTabItem("Applications", 3, function() {
        if (mAppView == null) {
            mAppView = new ApplicationsView();
            mAppPage.addView(mAppView);
        }
    });
    addTabItem("About", 4, function() {
        if (mQAView == null) {
            mQAView = new AboutView();
            mQAPage.addView(mQAView);
        }
    });

    var mIndicator = new Indicator();
    mIndicator.setStyle(Indicator.Line);
    mIndicator.setIndicatorCount(5);
    mIndicator.setIndicatorColor(0xfff3ffa3);
    mIndicator.INDICATOR_SIZE = buttonWidth;
    mIndicator.GAP = 0;
    this.addView(mIndicator);

    this.setSelectIndex = function(index) {
        mSelectIndex = index;
        mIndicator.onXChanged(index / 4);
        for (var i = 0; i < mItems.length;i++) {
            if (i == mSelectIndex) {
                mItems[i].setTextColor(0xffffffff);
            } else {
                mItems[i].setTextColor(0x99ffffff);
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

    function addTabItem(text, index, action) {
        var button = createButton(text);
        button.setOnClickListener(function() {
            mSelf.setSelectIndex(index);
            var curPage = mPages[mCurrentIndex];
            var newPage = mPages[index];
            curPage.setVisibility(View.GONE);
            newPage.setVisibility(View.VISIBLE);
            if (action != undefined) {
                action.call(this);
            }
            mCurrentIndex = index;
        });
        mItems.push(button);
        mSelf.addView(button);
    }

    function createButton(text) {
        var button = new LButton();
        button.setText(text);
        button.setTextColor(0xffffffff);
        button.setDimBg(false);
        button.setWaveColor(0x33ffffff);
        button.setBoxShadow(0, 0, 0, 0, 0);
        button.setTextSize(16);
        return button;
    }
}
