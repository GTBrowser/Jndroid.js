/**
 * Created by lency on 4/28/15.
 */

var TitleBarInstance;
var SideBarInstance;


function MainView() {
    ViewGroup.apply(this, []);

    TitleBarInstance = new TitleBar();
    this.addView(TitleBar);

    SideBarInstance = new Sidebar();

    this.onMeasure = function(widthMS, heightMS) {
        var width = MeasureSpec.getSize(widthMS);
        var height = MeasureSpec.getSize(heightMS);

        TitleBarInstance.measure(widthMS, 64);

        this.setMeasuredDimension(width, height);
    };

    this.onLayout = function(x, y) {
        TitleBarInstance.layout(0, 0);
    }
}

window.onload = function(){

    var rootview = new FrameLayout();
    setContentView(rootview);

    var mainView = new MainView();
    rootview.addView(mainView);
};