/**
 * Created by lency on 5/18/15.
 */
function IntroductionView() {
    ScrollView.apply(this, []);

    this.setBackgroundColor(CARD_BG_COLOR);

    var contentView = new LinearLayout();
    this.addView(contentView);

    var initCode = "<!DOCTYPE html>\n<html>\n<body>\n<script>\n\tvar mTextView = new TextView();\n\n</script>\n</body>\n</html>";
    var playground = new Playground("Hello World", initCode, true);
    var lp = new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT);
    contentView.addView(playground, lp);

    initCode = "var hello = new TextView();\nhello.setText('Hello World!');\nhello.setTextSize(50);\nhello.setTextColor(0xFF009688);\nhello.setGravity(Gravity.CENTER);\nvar lp = new LayoutParams(LayoutParams.WRAP_CONTENT,LayoutParams.WRAP_CONTENT);\nlp.gravity = Gravity.CENTER;\nthis.addView(hello, lp);";
    playground = new Playground("Widgets", initCode);
    lp.setMargins(8);
    contentView.addView(playground, lp);



    //var progressbar = new LProgressBar();
    //progressbar.setStyle(LProgressBar.Large);
    //contentView.addView(progressbar);
}