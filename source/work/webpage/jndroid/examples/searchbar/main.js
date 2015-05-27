/**
 * Created by lency on 4/23/15.
 */
function MainView() {
    ViewGroup.apply(this, []);

    var searchbar = new SearchBar();
    this.addView(searchbar);

    this.setBackgroundColor(0xFFFFFFFF);

    this.onMeasure = function(widthMS, heightMS) {
        var width = MeasureSpec.getSize(widthMS);
        var height = MeasureSpec.getSize(heightMS);

        searchbar.measure(widthMS, 52);

        this.setMeasuredDimension(width, height);
    };

    this.onLayout = function(x, y) {
        var offsetX = 0;
        var offsetY = 0;
        searchbar.layout(offsetX, offsetY);
    }
}

function SearchBar() {
    ViewGroup.apply(this, []);
    this.setBackgroundColor(0xFF999999);

    this.paddingX = 16;
    this.paddingY = 8;

    this.setClickable(true);

    var searchIcon = new ImageView();
    searchIcon.setImgSrc("search_icon.png");
    searchIcon.setImgWidth(38);
    searchIcon.setImgHeight(38);
    this.addView(searchIcon);

    var edittext = new EditText();
    edittext.setTextColor(0xFFFFFFFF);
    this.addView(edittext);

    this.setWillNotDraw(false);

    this.onMeasure = function(widthMS, heightMS) {
        var width = MeasureSpec.getSize(widthMS);
        var height = MeasureSpec.getSize(heightMS);

        searchIcon.measure(38, 38);
        var editWidth = width - this.paddingX * 2 - 38;
        edittext.measure(editWidth, 38);

        this.setMeasuredDimension(width, height);
    };

    this.onLayout = function(x, y) {
        var offsetX = this.paddingX;
        var offsetY = this.paddingY;
        searchIcon.layout(offsetX, offsetY);

        offsetX += 38;
        edittext.layout(offsetX, offsetY);
    };

    this.onDraw = function(canvas) {
        var width = this.getMeasuredWidth() - this.paddingX * 2;
        var height = this.getMeasuredHeight() - this.paddingY * 2;

        canvas.strokeStyle = Utils.toCssColor(0xFFFFFFFF);
        canvas.roundRect(this.paddingX, this.paddingY, width, height, 5);
        canvas.stroke();
    }
}

window.onload = function(){
    var rootview = new FrameLayout();
    rootview.setBackgroundColor(0x33ff0000);
    setContentView(rootview);

    var mainView = new MainView();
    rootview.addView(mainView);
};