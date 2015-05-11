/**
 * Created by lency on 4/28/15.
 */

var titlebar;
var sidebar;
var mask;

function MainView() {
    ViewGroup.apply(this, []);

    titlebar = new Titlebar();
    this.addView(titlebar);

    mask = new ViewGroup();
    mask.setBackgroundColor(0x99000000);
    mask.setOnClickListener(function(){
        mask.setVisibility(View.GONE);
        sidebar.hide();
    });
    mask.setVisibility(View.GONE);
    this.addView(mask);

    sidebar = new Sidebar();
    this.addView(sidebar);

    this.onMeasure = function(widthMS, heightMS) {
        var width = MeasureSpec.getSize(widthMS);
        var height = MeasureSpec.getSize(heightMS);

        titlebar.measure(widthMS, 64);
        sidebar.measure(240, heightMS);
        mask.measure(widthMS, heightMS);

        this.setMeasuredDimension(width, height);
    };

    this.onLayout = function(x, y) {
        titlebar.layout(0, 0);
        sidebar.layout(-240, 0);
        mask.layout(0, 0);
    };

    this.showSideBar = function(){
        mask.setVisibility(View.VISIBLE);
        sidebar.show();
    };
}

window.onload = function(){

    var rootview = new FrameLayout();
    setContentView(rootview);

    var mainView = new MainView();
    rootview.addView(mainView);
};