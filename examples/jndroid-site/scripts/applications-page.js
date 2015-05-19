/**
 * Created by lency on 5/18/15.
 */
function ApplicationsPage()
{
    ViewGroup.apply(this, []);

    var webView = new WebView();
    webView.setBoxShadow(0, 2, 12, 6, 0x66000000);
    webView.setSrc("http://localhost:63342/Jndroid/examples/jndroid-site/index.html");
    this.addView(webView);

    this.onMeasure = function(widthMS, heightMS) {
        var width = MeasureSpec.getSize(widthMS);
        var height = MeasureSpec.getSize(heightMS);
        webView.measure(MeasureSpec.makeMeasureSpec(width * 3/ 4, MeasureSpec.EXACTLY),
            MeasureSpec.makeMeasureSpec(height * 3/ 4, MeasureSpec.EXACTLY));

        this.setMeasuredDimension(width, height);
    }

    this.onLayout = function(x, y) {
        var offsetX = (this.getMeasuredWidth() - webView.getMeasuredWidth()) / 2;
        var offsetY = (this.getMeasuredHeight() - webView.getMeasuredHeight()) / 2;
        webView.layout(offsetX, offsetY);
    }
}
