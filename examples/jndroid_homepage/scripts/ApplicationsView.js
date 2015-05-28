/**
 * Created by lency on 5/18/15.
 */
function ApplicationsView() {
    ScrollView.apply(this, []);

    this.setBackgroundColor(CARD_BG_COLOR);

    var mSelf = this;

    var content = new LinearLayout();
    content.setOrientation(LinearLayout.VERTICAL);
    var contentLp = new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT);
    this.addView(content, contentLp);

    var intro = new TextView();
    intro.setText("This page shows Web Apps which developing by Jndroid, including this website.");
    intro.setTextColor(TEXT_COLOR);
    intro.setTextSize(TEXT_SIZE);
    var introlp = new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT);
    introlp.setMargins(PADDING, PARAGRAPH_PADDING_TOP, PADDING, PADDING);
    //content.addView(intro, introlp);

    var appsList = [];
    appsList.push(new AppData("Jndroid Homepage", "http://jndroid.com", true));
    appsList.push(new AppData("Relationship Calculator", "http://lite.mb.lenovomm.com/rcalc/", false));
    appsList.push(new AppData("Delivery Search", "http://testbrowser.cn/kuaidi.html", false));

    var appItemTopLp = new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT);
    appItemTopLp.gravity = Gravity.CENTER;
    appItemTopLp.setMargins(8);
    appItemTopLp.topMargin = PARAGRAPH_PADDING_TOP;

    var appItemLp = new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT);
    appItemLp.gravity = Gravity.CENTER;
    appItemLp.setMargins(8, 0, 8, 8);

    for (var i = 0; i< appsList.length; i++) {
        var appItem = new AppItem(appsList[i]);
        if (i == 0) {
            content.addView(appItem, appItemTopLp);
        } else {
            content.addView(appItem, appItemLp);
        }
    }

    this.postDelayed(function() {
        this.requestLayout();
    }, 1000);

    function AppData(title, url, isPC) {
        this.mTitle = title;
        this.mUrl = url;
        this.mIsPC = isPC;
    }

    function AppItem(appData) {
        LinearLayout.apply(this,[]);

        this.setBackgroundColor(0xffffffff);
        this.setCornerSize(2, 2, 2, 2);
        this.setBoxShadow(0, 1, 2, 0, 0x66000000);
        this.setPadding(16);

        var MAX_WIDTH = 800;

        var mTitle = new TextView();
        mTitle.setText(appData.mTitle);
        mTitle.setTextSize(TITLE_SIZE);
        mTitle.setTextColor(TEXT_COLOR);
        mTitle.setGravity(Gravity.LEFT | Gravity.CENTER_VERTICAL);
        this.addView(mTitle);

        var mUrl = new TextView();
        mUrl.setText(appData.mUrl);
        mUrl.setTextSize(SUB_TEXT_SIZE);
        mUrl.setTextColor(SUB_TEXT_COLOR);
        mUrl.setGravity(Gravity.LEFT | Gravity.CENTER_VERTICAL);
        mUrl.setTextIsSelectable(true);
        this.addView(mUrl);

        var mWebView = new WebView();
        mWebView.loadUrl(appData.mUrl);
        mWebView.setBorder(1, 0x66000000);
        this.addView(mWebView);

        this.onMeasure = function(widthMS, heightMS) {
            var width = MeasureSpec.getSize(widthMS);
            var height = MeasureSpec.getSize(heightMS);
            if (width > MAX_WIDTH) {
                width = MAX_WIDTH;
            }
            mTitle.measure(MeasureSpec.makeMeasureSpec(width, MeasureSpec.EXACTLY), 0);
            mUrl.measure(MeasureSpec.makeMeasureSpec(width, MeasureSpec.EXACTLY), 0);

            var contentWidth = 0;
            var contentHeight = 0;
            if (appData.mIsPC) {
                contentWidth = width - PADDING * 2;
                contentHeight = contentWidth / 16 * 9;
            } else {
                if (MeasureSpec.getSize(widthMS) > height) {
                    contentHeight = height * 3 / 4;
                    contentWidth = contentHeight * 5 / 8;
                } else {
                    contentWidth = (width - PADDING * 2) * 3 / 4;
                    contentHeight = contentWidth * 8 / 5;
                }
            }

            mWebView.measure(MeasureSpec.makeMeasureSpec(contentWidth, MeasureSpec.EXACTLY),
                MeasureSpec.makeMeasureSpec(contentHeight, MeasureSpec.EXACTLY));
            height = TITLE_PADDING_TOP + mTitle.getMeasuredHeight() + PADDING + mUrl.getMeasuredHeight() + PADDING + contentHeight + PADDING;

            this.setMeasuredDimension(width, height);
        };

        this.onLayout = function(x, y) {
            var offsetX = PADDING;
            var offsetY = TITLE_PADDING_TOP;
            mTitle.layout(offsetX, offsetY);

            offsetY += mTitle.getMeasuredHeight() + PADDING;
            mUrl.layout(offsetX, offsetY);

            offsetX = (this.getMeasuredWidth() - mWebView.getMeasuredWidth()) / 2;
            offsetY += PADDING + mUrl.getMeasuredHeight();
            mWebView.layout(offsetX, offsetY);
        }
    }
}
