/**
 * Created by lency on 5/18/15.
 */
function ApplicationsPage() {
    ScrollView.apply(this, []);

    var content = new LinearLayout();
    content.setOrientation(LinearLayout.VERTICAL);
    var contentLp = new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT);
    this.addView(content, contentLp);

    var appsList = [];
    appsList.push(new AppData("标题1", "描述1", "http://localhost:63342/Jndroid/examples/jndroid-site/index.html"));
    appsList.push(new AppData("标题2", "描述2", "http://localhost:63342/Jndroid/examples/searchbar/index.html"));

    var appItemLp = new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT);
    appItemLp.setMargins(16,0,16,0);

    for (var i = 0; i< appsList.length; i++) {
        var appItem = new AppItem();
        appItem.setTitle(appsList[i].mTitle);
        appItem.setScript(appsList[i].mScript);
        appItem.setWebSrc(appsList[i].mUrl);
        content.addView(appItem, appItemLp);
    }

    this.postDelayed(function() {
        this.requestLayout();
    }, 1000);

    function AppData(title, script, url) {
        this.mTitle = title;
        this.mScript = script;
        this.mUrl = url;
    }

    function AppItem () {
        LinearLayout.apply(this,[]);

        var contentView = new LinearLayout();
        contentView.setOrientation(LinearLayout.VERTICAL);
        var contentViewLp = new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT);
        contentViewLp.setMargins(16,16,16,16);
        this.addView(contentView, contentViewLp);

        var titleView = new TextView();
        titleView.setTextSize(20);
        titleView.setTextColor(0xFF009688);
        var titleViewLp = new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT);
        contentView.addView(titleView, titleViewLp);

        var scripView = new TextView();
        var scripViewLp = new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT);
        scripViewLp.topMargin = 8;
        contentView.addView(scripView, scripViewLp);

        var app = new LinearLayout();
        app.setOrientation(LinearLayout.HORIZONTAL);
        var lp = new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT);
        lp.topMargin = 16;
        contentView.addView(app, lp);

        var webView = new WebView();
        webView.setBoxShadow(0, 2, 12, 2, 0x66000000);
        var webViewLp = new LayoutParams(LayoutParams.FILL_PARENT, 300);
        webViewLp.setMargins(8,8,8,8);
        contentView.addView(webView, webViewLp);

        this.setTitle = function(title) {
            titleView.setText(title);
        }

        this.setScript = function(script) {
            scripView.setText(script);
        }

        this.setWebSrc = function(src) {
            webView.setSrc(src);
        }
    }
}
