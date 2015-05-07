/**
 * Created by lency on 4/28/15.
 */

function TitleBar() {
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
    title.setTextSize(30);
    title.setTextColor(0xFFFFFFFF);

    this.addView(title);

    this.onLayout = function(x, y) {
        hamburger.layout(10, 20);
        title.layout(50, 13);
    };

    this.setBackgroundColor(0xFF009688);
    this.setBoxShadow(0, 0, 5, 0, 0xFF555555);
}