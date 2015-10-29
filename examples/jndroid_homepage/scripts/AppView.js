/**
 * Created by lency on 5/18/15.
 */
function AppView() {
    ScrollView.apply(this);

    this.setBackgroundColor(R.color.card_bg);

    var padding = R.dimen.padding;

    var cnt = new LinearLayout();
    cnt.setOrientation(LinearLayout.VERTICAL);
    cnt.setPadding(0, R.dimen.paragraph_padding_top, 0, R.dimen.content_padding_bottom);
    var cntLp = new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT);
    this.addView(cnt, cntLp);

    setTimeout(function() {
        addItem(R.string.lestore, "http://app.gtbrowser.cn", false);
        addItem(R.string.excel_demo, "http://playground.jndroid.cn/excel", false);
        addItem(R.string.calculator, "http://jsq.jndroid.com/", false);
    }, 500);


    function addItem(title, url, isPc) {
        var appItemLp = new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT);
        appItemLp.gravity = Gravity.CENTER;
        appItemLp.setMargins(padding)

        var appItem = new AppItem(title, url, isPc);
        cnt.addView(appItem, appItemLp);
    }

    function AppItem(title, url, isPc) {
        ViewGroup.apply(this);

        this.setBackgroundColor(0xffffffff);
        this.setCornerSize(R.dimen.corner);
        this.setBoxShadow(0, 1, 2, 0, R.color.shadow);
        this.setPadding(padding);

        var maxWidth = 1024;

        var titleView = Theme.createTitle(title);
        this.addView(titleView);

        var urlView = Theme.createSubText(url);
        urlView.setTextIsSelectable(true);
        this.addView(urlView);

        var webView = new WebView();
        webView.loadUrl(url);
        webView.setBorder(1, 0x66000000);
        this.addView(webView);

        this.onMeasure = function(wMS) {
            var w = MeasureSpec.getSize(wMS);
            if (w > maxWidth) {
                w = maxWidth;
            }
            w = w - 32;
            titleView.measure(MeasureSpec.makeMeasureSpec(w, MeasureSpec.EXACTLY), 0);
            urlView.measure(MeasureSpec.makeMeasureSpec(w, MeasureSpec.EXACTLY), 0);

            var cntW = 0;
            var cntH = 0;
            if (isPc) {
                cntW = w - padding * 2;
                cntH = cntW / 16 * 9;
            } else {
                cntW = Math.min(360, w - padding * 2);
                cntH = cntW / 360 * 640;
            }

            Utils.measureExactly(webView, cntW, cntH);
            var h = R.dimen.title_padding_top + titleView.getMeasuredHeight() + padding + urlView.getMeasuredHeight() + padding + cntH + padding;

            this.setMeasuredDimension(w, h);
        };

        this.onLayout = function() {
            var x = padding;
            var y = R.dimen.title_padding_top;
            titleView.layout(x, y);

            y += titleView.getMeasuredHeight() + padding;
            urlView.layout(x, y);

            x = (this.getMeasuredWidth() - webView.getMeasuredWidth()) / 2;
            y += padding + urlView.getMeasuredHeight();
            webView.layout(x, y);
        }
    }
}
