/**
 * Created by lency on 5/5/15.
 */
function Sidebar()
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

    var sidebarHeader = new SidebarHeader();
    contentView.addView(sidebarHeader);

    var sidebarContent = new SidebarContent();
    contentView.addView(sidebarContent);

    var sidebarFooter = new SidebarFooter();
    contentView.addView(sidebarFooter);

    contentView.onMeasure = function(widthMS, heightMS){
        var width = MeasureSpec.getSize(widthMS);
        var height = MeasureSpec.getSize(heightMS);

        sidebarHeader.measure(widthMS, heightMS);
        sidebarFooter.measure(widthMS, heightMS);

        var headerHeight = sidebarHeader.getMeasuredHeight();
        var footerHeight = sidebarFooter.getMeasuredHeight();

        sidebarContent.measure(widthMS, height - headerHeight - footerHeight);

        var contentHeight = sidebarContent.getMeasuredHeight();

        contentView.setMeasuredDimension(width, headerHeight + footerHeight + contentHeight);
    };

    var intro = new NavItem("Introduction");
    sidebarContent.addView(intro);

    var doc = new NavItem("Documentation");
    sidebarContent.addView(doc);

    var app = new NavItem("Applications");
    sidebarContent.addView(app);

    this.onMeasure = function(widthMS, heightMS){

        var width = MeasureSpec.getSize(widthMS);
        var height = MeasureSpec.getSize(heightMS);

        container.measure(widthMS, heightMS);

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

function SidebarContent()
{
    LinearLayout.apply(this, []);

    this.onMeasure = function(widthMS, heightMS){
        var width = MeasureSpec.getSize(widthMS);
        var height = MeasureSpec.getSize(heightMS);

        var contentTotalHeight = 0;
        var i, cnt = this.getChildCount();

        for(i=0; i<cnt; i++)
        {
            this.getChildAt(i).measure(widthMS, heightMS);
            contentTotalHeight += this.getChildAt(i).getMeasuredHeight();
        }

        if(contentTotalHeight > height)
        {
            this.setMeasuredDimension(width, contentTotalHeight);
        }else{
            this.setMeasuredDimension(width, height);
        }
    };
}

function SidebarHeader()
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

    var mBgDrawable = new WaveDrawable();
    mBgDrawable.setCallback(this);

    this.setWillNotDraw(false);
    this.setClickable(true);

    var textView = new TextView();

    textView.setText(text);
    textView.setTextColor(0xFF000000);
    textView.setTextSize(16);

    this.addView(textView);

    this.onMeasure = function(widthMS, heightMS){
        var width = MeasureSpec.getSize(widthMS);
        this.setMeasuredDimension(width, 50);
    };

    this.onLayout = function(x, y){
       textView.layout(30, 16);
    };

    this.onTouchEvent = function(ev) {
        switch (ev.getAction()) {
            case MotionEvent.ACTION_DOWN:
                mBgDrawable.setState(View.VIEW_STATE_PRESSED);
                mBgDrawable.setX(ev.getX());
                mBgDrawable.setY(ev.getY());
                break;
            case MotionEvent.ACTION_CANCEL:
            case MotionEvent.ACTION_UP:
                mBgDrawable.setState(View.VIEW_STATE_ENABLED);
                break;
        }
    };

    this.onDraw = function(canvas) {
        mBgDrawable.setBounds(0, 0, this.getMeasuredWidth(), this.getMeasuredHeight());
        mBgDrawable.draw(canvas);
    }
}

function SidebarFooter()
{
    ViewGroup.apply(this, []);

    var copyright = new TextView();
    copyright.setText("Copyright &copy; 2015<br/>Powered by Jndroid");
    copyright.setTextSize(15);
    copyright.setTextColor(0xFF999999);

    this.addView(copyright);

    this.setBorderTop(1, 0xFFDDDDDD);

    this.onMeasure = function(widthMS, heightMS){
        var width = MeasureSpec.getSize(widthMS);

        this.setMeasuredDimension(width, 70);
    };

    this.onLayout = function(x, y){
        copyright.layout(30, 15);
    };
}