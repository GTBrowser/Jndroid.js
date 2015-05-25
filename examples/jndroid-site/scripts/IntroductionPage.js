/**
 * Created by lency on 5/18/15.
 */
function IntroductionView() {
    ScrollView.apply(this, []);

    this.setBackgroundColor(CARD_BG_COLOR);

    var contentView = new LinearLayout();
    this.addView(contentView);

    var playground = new Playground("Hello World", mHelloWorldCode, true);
    playground.setEditHeight(280);
    var lp = new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT);
    contentView.addView(playground, lp);

    playground = new Playground("Widgets", mWidgetCode);
    playground.setEditHeight(450);
    lp.setMargins(8);
    contentView.addView(playground, lp);

    playground = new Playground("onMeasure & onLayout", mMeausreCode);
    playground.setEditHeight(400);
    lp.setMargins(8);
    contentView.addView(playground, lp);

    playground = new Playground("onDraw", mDrawCode);
    playground.setEditHeight(300);
    lp.setMargins(8);
    contentView.addView(playground, lp);

    playground = new Playground("onTouchEvent", mTouchCode);
    playground.setEditHeight(480);
    lp.setMargins(8);
    contentView.addView(playground, lp);
}

var mHelloWorldCode = "<!DOCTYPE html>\n" +
    "<html>\n" +
    "<head>\n" +
    "\t<script src=\"http://file.gtbrowser.cn/jndroid/jndroid.min.js\"></script>\n" +
    "</head>\n" +
    "<body>\n" +
    "<script>\n" +
    "\tvar mTextView = new TextView();\n" +
    "\tmTextView.setText(\"hello world\");\n\n" +
    "\tsetContentView(mTextView);\n" +
    "</script>\n" +
    "</body>\n" +
    "</html>";

var mWidgetCode = "" +
    "var mLinearLayout = new LinearLayout();\n" +
    "this.addView(mLinearLayout);\n\n" +
    "var lp = new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT);\n" +
    "lp.setMargins(8);\n\n" +
    "var mButton = new Button();\n" +
    "mButton.setText(\"button\");\n" +
    "mButton.setOnClickListener(function() {\n" +
    "\twindow.alert(\"button click\");\n" +
    "});\n" +
    "mLinearLayout.addView(mButton, lp);\n\n" +
    "var mTextView = new TextView();\n" +
    "mTextView.setText(\"textview\");\n" +
    "mLinearLayout.addView(mTextView, lp);\n\n" +
    "var mEditText = new EditText();\n" +
    "mEditText.setHintText(\"edittext\");\n" +
    "mLinearLayout.addView(mEditText, lp);\n\n" +
    "var mImageView = new ImageView();\n" +
    "mImageView.setImageUri(\"images/ic_launcher.png\")\n" +
    "mImageView.setScaleType(ScaleType.FIT_CENTER);\n" +
    "var imgLp = new LayoutParams(LayoutParams.FILL_PARENT, 108);\n" +
    "mLinearLayout.addView(mImageView, imgLp);"

var mMeausreCode = "" +
    "var mView = new MyView();\n" +
    "this.addView(mView);\n\n" +
    "function MyView() {\n" +
    "\tViewGroup.apply(this, []);\n" +
    "\tthis.setBackgroundColor(0x1a000000);\n\n" +
    "\tvar mChild = new View();\n" +
    "\tmChild.setBackgroundColor(0xff009688);\n" +
    "\tthis.addView(mChild);\n\n" +
    "\tthis.onMeasure = function(widthMS, heightMS) {\n" +
    "\t\tvar width = MeasureSpec.getSize(widthMS);\n" +
    "\t\tvar height = MeasureSpec.getSize(heightMS);\n" +
    "\t\tmChild.measure(MeasureSpec.makeMeasureSpec(width / 4, MeasureSpec.Exactly), \n" +
    "\t\t\tMeasureSpec.makeMeasureSpec(height / 4, MeasureSpec.Exactly));\n" +
    "\t\tthis.setMeasuredDimension(width, height);\n" +
    "\t}\n\n" +
    "\tthis.onLayout = function(x, y) {\n" +
    "\t\tmChild.layout(50, 100);\n" +
    "\t}\n" +
    "}";

var mDrawCode = "" +
    "var mView = new MyView();\n" +
    "this.addView(mView);\n\n" +
    "function MyView() {\n" +
    "\tView.apply(this, []);\n" +
    "\tthis.setBackgroundColor(0x1a000000);\n" +
    "\tthis.setWillNotDraw(false);\n\n" +
    "\tthis.onDraw = function(canvas) {\n" +
    "\t\t// here we use html canvas to draw\n" +
    "\t\tcanvas.beginPath();\n" +
    "\t\tcanvas.arc(100, 100, 50, 0, Math.PI * 2, true);\n" +
    "\t\tcanvas.closePath();\n" +
    "\t\tcanvas.fillStyle = \"#009688\";\n" +
    "\t\tcanvas.fill();" +
    "\t}\n" +
    "}";

var mTouchCode = "" +
    "var mView = new MyView();\n" +
    "var lp = new LayoutParams(200, 100);" +
    "this.addView(mView, lp);\n\n" +
    "function MyView() {\n" +
    "\tTextView.apply(this, []);\n\n" +
    "\tthis.setText(\"Drag Me\");\n" +
    "\tthis.setTextColor(0xffffffff);\n" +
    "\tthis.setGravity(Gravity.CENTER);\n" +
    "\tthis.setBackgroundColor(0xff009688);\n" +
    "\tthis.setClickable(true);\n\n" +
    "\tvar mLastX = 0;\n" +
    "\tvar mLastY = 0;\n" +
    "\tthis.onTouchEvent = function(e) {\n" +
    "\t\tswitch (e.getAction()) {\n" +
    "\t\t\tcase MotionEvent.ACTION_DOWN:\n" +
    "\t\t\t\tmLastX = e.getRawX();\n" +
    "\t\t\t\tmLastY = e.getRawY();\n" +
    "\t\t\t\tthis.setBackgroundColor(0xcc009688);\n" +
    "\t\t\tbreak;\n" +
    "\t\t\tcase MotionEvent.ACTION_MOVE:\n" +
    "\t\t\t\tvar dx = e.getRawX() - mLastX;\n" +
    "\t\t\t\tvar dy = e.getRawY() - mLastY;\n" +
    "\t\t\t\tthis.layout(this.getLeft() + dx, this.getTop() + dy);\n" +
    "\t\t\t\tmLastX = e.getRawX();\n" +
    "\t\t\t\tmLastY = e.getRawY();\n" +
    "\t\t\tbreak;\n" +
    "\t\t\tcase MotionEvent.ACTION_UP:\n" +
    "\t\t\tcase MotionEvent.ACTION_CANCEL:\n" +
    "\t\t\t\tthis.setBackgroundColor(0xff009688);\n" +
    "\t\t\tbreak;\n" +
    "\t\t}\n" +
    "\t}" +
    "}";