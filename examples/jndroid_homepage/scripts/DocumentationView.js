/**
 * Created by lency on 5/18/15.
 */
function DocumentationView() {
    FrameLayout.apply(this, []);

    var webView = new WebView();
    webView.loadUrl("http://jndroid.com/documentation");
    //webView.loadUrl("../../src/out/index.html");
    this.addView(webView);
}
