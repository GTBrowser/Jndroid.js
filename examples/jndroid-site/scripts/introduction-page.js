/**
 * Created by lency on 5/18/15.
 */
function IntroductionPage()
{
    ScrollView.apply(this, []);

    var contentView = new LinearLayout();
    this.addView(contentView);

    var initCode = "var hello = new TextView();\nhello.setText('Hello World!');\nhello.setGravity(Gravity.CENTER_VERTICAL | Gravity.CENTER_HORIZONTAL);\nthis.addView(hello);";
    var playground = new Playground(initCode);
    var lp = new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT);
    lp.topMargin = 20;
    contentView.addView(playground, lp);


}