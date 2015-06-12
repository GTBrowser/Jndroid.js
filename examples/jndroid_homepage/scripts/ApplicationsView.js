/**
 * Created by lency on 5/18/15.
 */
function ApplicationsView() {
    ScrollView.apply(this, []);

    this.setBackgroundColor(R.color.card_bg);

    var mSelf = this;
    var mPadding = R.dimen.padding;

    var content = new LinearLayout();
    content.setOrientation(LinearLayout.VERTICAL);
    content.setPadding(0, 0, 0, R.dimen.content_padding_bottom);
    var contentLp = new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT);
    this.addView(content, contentLp);

    var intro = new TextView();
    intro.setText("This page shows Web Apps which developing by Jndroid, including this website.");
    intro.setTextColor(R.color.text);
    intro.setTextSize(R.color.text);
    var introlp = new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT);
    introlp.setMargins(mPadding, R.dimen.paragraph_padding_top, mPadding, mPadding);
    //content.addView(intro, introlp);

    var appsList = [];
    appsList.push(new AppData(R.string.jndroid_home, "http://jndroid.com", true));
    appsList.push(new AppData(R.string.calculator, "http://lite.mb.lenovomm.com/rcalc/", false));
    //appsList.push(new AppData("Delivery Search", "http://testbrowser.cn/kuaidi.html", false));

    var appItemTopLp = new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT);
    appItemTopLp.gravity = Gravity.CENTER;
    appItemTopLp.setMargins(R.dimen.half_padding);
    appItemTopLp.topMargin = R.dimen.paragraph_padding_top;

    var appItemLp = new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT);
    appItemLp.gravity = Gravity.CENTER;
    appItemLp.setMargins(R.dimen.padding);

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
        this.setCornerSize(R.dimen.corner);
        this.setBoxShadow(0, 1, 2, 0, R.color.shadow);
        this.setPadding(16);

        var MAX_WIDTH = 800;

        var mTitle = new TextView();
        mTitle.setText(appData.mTitle);
        mTitle.setTextSize(R.dimen.title);
        mTitle.setTextColor(R.color.text);
        mTitle.setGravity(Gravity.LEFT | Gravity.CENTER_VERTICAL);
        this.addView(mTitle);

        var mUrl = new TextView();
        mUrl.setText(appData.mUrl);
        mUrl.setTextSize(R.dimen.sub_text);
        mUrl.setTextColor(R.color.sub_text);
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
                contentWidth = width - mPadding * 2;
                contentHeight = contentWidth / 16 * 9;
            } else {
                if (MeasureSpec.getSize(widthMS) > height) {
                    contentHeight = height * 3 / 4;
                    contentWidth = contentHeight * 5 / 8;
                } else {
                    contentWidth = (width - mPadding * 2) * 3 / 4;
                    contentHeight = contentWidth * 8 / 5;
                }
            }

            mWebView.measure(MeasureSpec.makeMeasureSpec(contentWidth, MeasureSpec.EXACTLY),
                MeasureSpec.makeMeasureSpec(contentHeight, MeasureSpec.EXACTLY));
            height = R.dimen.title_padding_top + mTitle.getMeasuredHeight() + mPadding + mUrl.getMeasuredHeight() + mPadding + contentHeight + mPadding;

            this.setMeasuredDimension(width, height);
        };

        this.onLayout = function(x, y) {
            var offsetX = mPadding;
            var offsetY = R.dimen.title_padding_top;
            mTitle.layout(offsetX, offsetY);

            offsetY += mTitle.getMeasuredHeight() + mPadding;
            mUrl.layout(offsetX, offsetY);

            offsetX = (this.getMeasuredWidth() - mWebView.getMeasuredWidth()) / 2;
            offsetY += mPadding + mUrl.getMeasuredHeight();
            mWebView.layout(offsetX, offsetY);
        }
    }
}
