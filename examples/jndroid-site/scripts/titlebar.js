/**
 * Created by lency on 4/28/15.
 */

function Titlebar() {
    ViewGroup.apply(this, []);

    var self = this;

    var hamburger = new ImageView();
    hamburger.setImgSrc('images/hamburger.svg');
    hamburger.setImgWidth(24);
    hamburger.setImgHeight(24);

    hamburger.setClickable(true);
    hamburger.setOnClickListener(function(){
        self.getParent().showSideBar();
    });

    this.addView(hamburger);

    var title = new TextView();
    title.setText("Jndroid");
    title.setTextSize(25);
    title.setTextColor(0xFFFFFFFF);

    this.addView(title);

    this.onLayout = function(x, y) {
        hamburger.layout(25, 20);
        title.layout(70, 17);
    };

    this.setBackgroundColor(0xFF009688);
    this.setBoxShadow(0, 2, 5, 0, 0x42000000);
}