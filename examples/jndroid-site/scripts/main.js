/**
 * Created by lency on 4/28/15.
 */
function MainView() {
    ViewGroup.apply(this, []);

    var titlebar = new TitleBar();
    this.addView(titlebar);

    this.setBackgroundColor(0xFFFFCC00);

    this.onMeasure = function(widthMS, heightMS) {
        var width = MeasureSpec.getSize(widthMS);
        var height = MeasureSpec.getSize(heightMS);

        titlebar.measure(widthMS, 52);

        this.setMeasuredDimension(width, height);
    };

    this.onLayout = function(x, y) {
        titlebar.layout(0, 0);
    }
}

window.onload = function(){

    var rootview = new FrameLayout();
    rootview.setBackgroundColor(0x33ff0000);
    setContentView(rootview);

    var mainView = new MainView();
    rootview.addView(mainView);
};