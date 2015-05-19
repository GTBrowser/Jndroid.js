/**
 * Created by lency on 4/28/15.
 */

var titlebar;
var sidebar;
var mainView;
var mask;
var gallery;

function MainView() {
    ViewGroup.apply(this, []);

    gallery = new GalleryLayout();
    this.addView(gallery);

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

    var introPage = new IntroductionPage();
    var docPage = new DocumentationPage();
    gallery.addPage(introPage);
    gallery.addPage(docPage);

    this.onMeasure = function(widthMS, heightMS) {
        var width = MeasureSpec.getSize(widthMS);
        var height = MeasureSpec.getSize(heightMS);

        titlebar.measure(widthMS, 64);
        sidebar.measure(240, heightMS);
        mask.measure(widthMS, heightMS);
        gallery.measure(widthMS, height - 64);

        this.setMeasuredDimension(width, height);
    };

    this.onLayout = function(x, y) {
        titlebar.layout(0, 0);
        sidebar.layout(-240, 0);
        mask.layout(0, 0);
        gallery.layout(0, 64);
    };

    this.showSideBar = function(){
        mask.setVisibility(View.VISIBLE);
        sidebar.show();
    };

    this.hideSidebar = function(){
        mask.setVisibility(View.GONE);
        sidebar.hide();
    };

    this.setTitleText = function(text){
        titlebar.setTitleText(text);
    }
}

window.onload = function(){

    var rootview = new FrameLayout();
    setContentView(rootview);

    mainView = new MainView();
    rootview.addView(mainView);
};