/**
 * Created by lency on 4/28/15.
 */

function Titlebar() {
    ViewGroup.apply(this, []);

    var toggleButton = new ToggleButton();
    this.addView(toggleButton);

    toggleButton.setOnClickListener(function(){
        mainView.showSideBar();
    });

    var title = new TextView();
    title.setText("Jndroid");
    title.setTextSize(25);
    title.setTextColor(0xFFFFFFFF);

    this.addView(title);

   this.setTitleText = function (text) {
        title.setText(text);
    }

    this.onLayout = function(x, y) {
        toggleButton.layout(0, 0);
        title.layout(70, 17);
    };

    this.onMeasure = function(widthMS, heightMS){

        var width = MeasureSpec.getSize(widthMS);

        toggleButton.measure(64, 64);

        this.setMeasuredDimension(width, 64);
    };

    this.setBackgroundColor(0xFF009688);
    this.setBoxShadow(0, 2, 5, 0, 0x42000000);
}

function ToggleButton()
{
    ImageView.apply(this, []);

    this.setImgSrc('images/hamburger.svg');
    this.setImgWidth(24);
    this.setImgHeight(24);

    var bgDrawable = new WaveDrawable();
    bgDrawable.setDimBg(false);
    bgDrawable.setCallback(this);

    this.setClickable(true);
    this.setWillNotDraw(false);

    this.onDraw = function(canvas) {
        bgDrawable.setBounds(0, 0, this.getMeasuredWidth(), this.getMeasuredHeight());
        bgDrawable.draw(canvas);
    };

    this.onTouchEvent = function(ev) {
        switch (ev.getAction()) {
            case MotionEvent.ACTION_DOWN:
                bgDrawable.setState(View.VIEW_STATE_PRESSED);
                var w = this.getMeasuredWidth();
                bgDrawable.setX(w / 4);
                bgDrawable.setY(this.getMeasuredHeight() / 2);
                bgDrawable.setMaxRadius(w / 4 * 3);
                break;
            case MotionEvent.ACTION_CANCEL:
            case MotionEvent.ACTION_UP:
                bgDrawable.setState(View.VIEW_STATE_ENABLED);
                break;
        }
    };
}