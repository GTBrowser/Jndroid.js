function VSAndroidView() {
    ScrollView.apply(this, []);

    var CODE_HEIGHT = 1100;
    if (mIsPhone) {
        CODE_HEIGHT = 1900;
    }

    var contentView = new LinearLayout();
    contentView.setPadding(0, 0, 0, PARAGRAPH_PADDING_TOP);
    this.addView(contentView);

    var codeArea = new FrameLayout();
    var codeAreaLp = new LayoutParams(LayoutParams.FILL_PARENT, CODE_HEIGHT);
    contentView.addView(codeArea, codeAreaLp);

    var linearLayout = new LinearLayout();
    linearLayout.setOrientation(LinearLayout.HORIZONTAL);
    var linearLayoutLp = new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.FILL_PARENT);
    linearLayoutLp.setMargins(PADDING, 0, PADDING, 0);
    codeArea.addView(linearLayout, linearLayoutLp);

    var codeViewLp = new LayoutParams(0, LayoutParams.FILL_PARENT);
    codeViewLp.weight = 1;

    var jndroidView = new CodeView("Jndroid", mJndroidCode);
    linearLayout.addView(jndroidView, codeViewLp);

    var androidView = new CodeView("Android", mAndroidCode);
    linearLayout.addView(androidView, codeViewLp);

    var moreTip = new TextView();
    moreTip.setTextSize(TITLE_SIZE);
    moreTip.setTextColor(THEME_COLOR);
    moreTip.setText("More tips");
    var moreTipLp = new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT);
    moreTipLp.setMargins(PADDING, PARAGRAPH_PADDING_TOP - 32, PADDING, 0);
    contentView.addView(moreTip, moreTipLp);

    var tipLp = new LayoutParams(moreTipLp);
    tipLp.setMargins(PADDING, PADDING, PADDING, 0);
    for (var i = 0; i < mTips.length; i++) {
        var tip = new TextView();
        tip.setText(mTips[i]);
        tip.setTextSize(TEXT_SIZE);
        tip.setTextColor(TEXT_COLOR);
        contentView.addView(tip, tipLp);
    }

    function CodeView(title, code) {
        ViewGroup.apply(this, []);

        var mTitle = new TextView();
        mTitle.setTextSize(TITLE_SIZE);
        mTitle.setTextColor(THEME_COLOR);
        mTitle.setText(title);
        mTitle.setGravity(Gravity.CENTER);
        this.addView(mTitle);

        var mCode;
        if (mIsPhone) {
            mCode = new EditText();
            mCode.setTextSize(10);
            mCode.setSingleLine(false);
        } else {
            mCode = new CodeMirrorView();
        }
        mCode.setText(code);
        if (title == "Jndroid") {
            mCode.setBorder(1, DIVIDERS_COLOR);
        } else {
            mCode.setBorderTop(1, DIVIDERS_COLOR);
            mCode.setBorderRight(1, DIVIDERS_COLOR);
            mCode.setBorderBottom(1, DIVIDERS_COLOR);
        }
        this.addView(mCode);

        this.postDelayed(this.requestLayout, 100);
        this.postDelayed(this.requestLayout, 5000);

        this.onMeasure = function(widthMS, heightMS) {
            var width = MeasureSpec.getSize(widthMS);
            var height = CODE_HEIGHT;

            mTitle.measure(width, TITLE_SIZE);

            var contentHeight = height - PARAGRAPH_PADDING_TOP - TITLE_SIZE - PADDING * 4;
            mCode.measure(MeasureSpec.makeMeasureSpec(width, MeasureSpec.EXACTLY),
                MeasureSpec.makeMeasureSpec(contentHeight, MeasureSpec.EXACTLY));

            this.setMeasuredDimension(width, height);
        };

        this.onLayout = function(x, y) {
            var offsetX = 0;
            var offsetY = PARAGRAPH_PADDING_TOP;
            mTitle.layout(offsetX, offsetY);

            offsetY += PADDING + mTitle.getMeasuredHeight();
            mCode.layout(offsetX, offsetY);
        }
    }
}

var mJndroidCode = "" +
    "function MyView() {\n" +
    "\t/* in Jndroid, we use apply instead of extend | 在Jndroid中，使用apply来实现继承 */\n" +
    "\tView.apply(this, []);\n\n" +
    "\t/* public variable | 公开变量 */\n" +
    "\tthis.WIDTH = 100;\n" +
    "\tthis.HEIGHT = 50;\n" +
    "\tthis.TEXT_SIZE = 16;\n\n" +
    "\t/* private variable | 私有变量 */\n" +
    "\tvar mName = \"Click Me\";\n" +
    "\tvar mSelf = this;\n\n" +
    "\t/* no constructor in Jndroid, initiate your code here */\n" +
    "\t/* Jndroid中没有构造函数，直接在这里进行初始化 */\n" +
    "\tthis.setBackgroundColor(0xff009688);\n" +
    "\tthis.setWillNotDraw(false);\n\n" +
    "\t/* set border, round corner and shadow is very difficult in Android */\n" +
    "\t/* 想要在Android设置边框、圆角和阴影是非常困难的，但在Jndroid中却很简单 */\n" +
    "\tthis.setBorder(1, 0x33000000);\n" +
    "\tthis.setCornerSize(2);\n" +
    "\tthis.setBoxShadow(0, 0, 6, 0, 0x33000000);\n\n" +
    "\t/* listener is a function, no need to new | listener是一个function，不需要new */\n" +
    "\tthis.setOnClickListener(function() {\n" +
    "\t\tconsole.log(\"clicked\");\n" +
    "\t});\n\n" +
    "\t/* public method | 公开方法 */\n" +
    "\tthis.getName = function() {\n" +
    "\t\treturn mName;\n" +
    "\t}\n\n\n" +
    "\tthis.onMeasure = function(widthMS, heightMS) {\n" +
    "\t\tvar width = this.WIDTH;\n" +
    "\t\tvar height = this.HEIGHT;\n" +
    "\t\tthis.setMeasuredDimension(width, height);\n" +
    "\t}\n\n\n" +
    "\tthis.onDraw = function(canvas) {\n" +
    "\t\t/* this canvas is the context of HTML canvas */\n" +
    "\t\t/* 这里的canvas是HTML canvas的context */\n" +
    "\t\tcanvas.fillStyle = \"#ffffff\";\n" +
    "\t\tcanvas.font = this.TEXT_SIZE + \"px\";\n" +
    "\t\tcanvas.textBaseline = \"middle\";\n" +
    "\t\tvar offsetX = calcXAlignCenter(canvas, mName);\n" +
    "\t\tvar offsetY = this.getMeasuredHeight() / 2;\n" +
    "\t\tcanvas.fillText(mName, offsetX, offsetY);\n" +
    "\t}\n\n" +
    "\t/* private method | 私有方法 */\n" +
    "\tfunction calcXAlignCenter(canvas, text) {\n" +
    "\t\tvar txtMetrics = canvas.measureText(text);\n" +
    "\t\treturn (mSelf.getMeasuredWidth() - txtMetrics.width) / 2;\n" +
    "\t}\n" +
    "}";

var mAndroidCode = "" +
    "public class MyView extends View {\n\n\n\n" +
    "\t/* public variable | 公开变量 */\n" +
    "\tpublic static final int UI_WIDTH = 100;\n" +
    "\tpublic static final int UI_HEIGHT = 50;\n" +
    "\tpublic static final int UI_TEXT_SIZE = 16;\n\n" +
    "\t/* private variable | 私有变量 */\n" +
    "\tprivate String mName = \"Click Me\";\n\n" +
    "\tpublic MyView(Context context){\n" +
    "\t\tsuper(context);\n\n" +
    "\t\tsetBackgroundColor(0xff009688);\n" +
    "\t\tsetWillNotDraw(false);\n\n" +
    "\t\tsetOnClickListener(new OnClickListener(){\n\n" +
    "\t\t\t@Override\n" +
    "\t\t\tpublic void onClick(View v){\n" +
    "\t\t\t\tLog.v(\"tag\", \"clicked\");\n" +
    "\t\t\t}\n" +
    "\t\t});\n" +
    "\t}\n\n\n\n" +
    "\t/* public method | 公开方法 */\n" +
    "\tpublic String getName() {\n" +
    "\t\treturn mName;\n" +
    "\t}\n\n" +
    "\t@Override\n" +
    "\tpublic void onMeasure(int widthMeasureSpec, int heightMeasureSpec){\n" +
    "\t\tfloat density = getResources().getDisplayMetrics().density;\n" +
    "\t\tint width = (int)(UI_WIDTH * density);\n" +
    "\t\tint height = (int)(UI_HEIGHT * density);\n" +
    "\t\tsetMeasuredDimension(width, height);\n" +
    "\t}\n\n" +
    "\t@Override\n" +
    "\tpublic void onDraw(Canvas canvas){\n" +
    "\t\tPaint paint = new Paint();\n" +
    "\t\tpaint.setAntiAlias(true);\n" +
    "\t\tpaint.setTextSize(UI_TEXT_SIZE * getResources().getDisplayMetrics().density);\n" +
    "\t\tfloat offsetX = calcXAlignCenter(mPaint, mName);\n" +
    "\t\tFontMetrics fm = paint.getFontMetrics();\n" +
    "\t\tfloat offsetY = getMeasuredHeight() / 2 - fm.descent + (fm.bottom - fm.top) / 2;\n" +
    "\t\tcanvas.drawText(mName, offsetX, offsetY, paint);\n" +
    "\t}\n\n" +
    "\t/* private method | 私有方法 */\n" +
    "\tprivate float calcXAlignCenter(Paint paint, String text){\n" +
    "\t\tfloat textWidth = paint.measureText(text);\n" +
    "\t\treturn (float)(getMeasuredWidth() - textWidth) / 2;\n" +
    "\t}\n" +
    "}";

var mTips = ["▪ 在Jndroid中，this的概念与Android中的this类似但不完全相同",
    "▪ 在Jndroid中，this一般指向调用它的那个东西",
    "▪ 在Jndroid中，定义一个变量并需要指明它的类型",
    "▪ 在Jndroid中，用var定义的变量和方法，在该类的代码中可以直接调用，外部不可调用",
    "▪ 在Jndroid中，用this定义的变量和方法，在外部可以通过对象.变量和对象.方法的方式调用，在该类的代码中，通过this.变量和this.方法的方式调用",
    "▪ 在Jndroid中，没有Context",
    "▪ 在Jndroid中，尺寸的密度都是1",
    "▪ 在Jndroid中，目前还没有办法在一个方法中完美地调用父类的方法，使用组合方式吧",
    "▪ 在Jndroid中，图片与View大小一样时，图片会有锯齿，可以使用更大的图片，放缩后就没有锯齿了",
    "▪ 在Jndorid中，没有重载（overload），不过好在Jndroid中方法的参数个数是没有限制的"];

