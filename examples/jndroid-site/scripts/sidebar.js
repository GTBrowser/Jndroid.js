/**
 * Created by lency on 5/5/15.
 */
function SideBar()
{
    ViewGroup.apply(this, []);

    this.setBackgroundColor(0xFFFFFFFF);

    var animationShow = new TranslateAnimation(0,240,0,0);
    animationShow.setInterpolator(Interpolator.EASE_IN_OUT);
    animationShow.setDuration(300);

    var animationHide = new TranslateAnimation(0,-240,0,0);
    animationHide.setInterpolator(Interpolator.EASE_IN_OUT);
    animationHide.setDuration(300);

    var container = new ScrollView();
    this.addView(container);

    var contentView = new LinearLayout();
    container.addView(contentView);

    var navItemHeader = new NavItemHeader();
    contentView.addView(navItemHeader);

    var intro = new NavItem("Introduction");
    contentView.addView(intro);

    var doc = new NavItem("Documentation");
    contentView.addView(doc);

    this.onMeasure = function(widthMS, heightMS){
        container.measure(widthMS, heightMS);

        var width = MeasureSpec.getSize(widthMS);
        var height = MeasureSpec.getSize(heightMS);
        this.setMeasuredDimension(width, height);
    };

    this.onLayout = function(x, y){
        container.layout(0,0);
    };

    this.show = function(){
        this.setAnimation(animationShow);
        animationShow.start();
    };

    this.hide = function(){
        this.setAnimation(animationHide);
        animationHide.start();
    };
}

function NavItemHeader()
{
    ViewGroup.apply(this, []);

    var titleWrapper = new ViewGroup();
    titleWrapper.setBorderBottom(1, 0xFFDDDDDD);
    this.addView(titleWrapper);

    var title = new TextView();
    title.setText("Jndroid");
    title.setTextSize(25);
    title.setTextColor(0xFF999999);

    titleWrapper.addView(title);

    this.onMeasure = function(widthMS, heightMS){
        titleWrapper.measure(widthMS, 64);

        var width = MeasureSpec.getSize(widthMS);
        this.setMeasuredDimension(width, 64);
    };

    this.onLayout = function(x, y){
        titleWrapper.layout(0,0);
        title.layout(30,17);
    };
}

function NavItem(text)
{
    ViewGroup.apply(this, []);


    var textView = new TextView();

    textView.setText(text);
    textView.setTextColor(0xFF000000);
    textView.setTextSize(16);

    this.addView(textView);

    this.onMeasure = function(widthMS, heightMS){
        var width = MeasureSpec.getSize(widthMS);
        this.setMeasuredDimension(width, 40);
    };

    this.onLayout = function(x, y){
       textView.layout(30, 10);
    };

}