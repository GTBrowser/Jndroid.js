/**
 * Created by lency on 5/18/15.
 */
function IntroductionPage()
{
    ScrollView.apply(this, []);

    var contentView = new LinearLayout();
    this.addView(contentView);

    var initCode = "var hello = new TextView();\nhello.setText('Hello World!');\nhello.setTextSize(50);\nhello.setTextColor(0xFF009688);\nhello.setGravity(Gravity.CENTER);\nvar lp = new LayoutParams(LayoutParams.WRAP_CONTENT,LayoutParams.WRAP_CONTENT);\nlp.gravity = Gravity.CENTER;\nthis.addView(hello, lp);";
    var playground = new Playground(initCode);
    var lp = new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT);
    lp.topMargin = 20;
    contentView.addView(playground, lp);


}