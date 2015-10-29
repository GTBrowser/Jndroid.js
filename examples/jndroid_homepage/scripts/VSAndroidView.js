function VSAndroidView() {
    ScrollView.apply(this, []);

    var CODE_HEIGHT = 1100;
    if (mIsPhone) {
        CODE_HEIGHT = 1900;
    }
    var mPadding = R.dimen.padding;

    var contentView = new LinearLayout();
    contentView.setPadding(0, 0, 0, R.dimen.paragraph_padding_top);
    this.addView(contentView);

    var codeTitle = new TextView();
    codeTitle.setTextSize(R.dimen.title);
    codeTitle.setTextColor(R.color.theme);
    codeTitle.setText(R.string.to_android_develop);
    var codeTitleLp = new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT);
    codeTitleLp.setMargins(mPadding, R.dimen.paragraph_padding_top, mPadding, 0);
    contentView.addView(codeTitle, codeTitleLp);

    var codeArea = new FrameLayout();
    var codeAreaLp = new LayoutParams(LayoutParams.FILL_PARENT, CODE_HEIGHT);
    contentView.addView(codeArea, codeAreaLp);

    var linearLayout = new LinearLayout();
    linearLayout.setOrientation(LinearLayout.HORIZONTAL);
    var linearLayoutLp = new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.FILL_PARENT);
    linearLayoutLp.setMargins(mPadding, 0, mPadding, 0);
    codeArea.addView(linearLayout, linearLayoutLp);

    var codeViewLp = new LayoutParams(0, LayoutParams.FILL_PARENT);
    codeViewLp.weight = 1;

    var jndroidView = new CodeView("Jndroid", mJndroidCode);
    linearLayout.addView(jndroidView, codeViewLp);

    var androidView = new CodeView("Android", mAndroidCode);
    linearLayout.addView(androidView, codeViewLp);

    var moreTip = new TextView();
    moreTip.setTextSize(R.dimen.title);
    moreTip.setTextColor(R.color.theme);
    moreTip.setText(R.string.more_tips);
    var moreTipLp = new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT);
    moreTipLp.setMargins(mPadding, R.dimen.paragraph_padding_top - 32, mPadding, 0);
    contentView.addView(moreTip, moreTipLp);

    var tipLp = new LayoutParams(moreTipLp);
    tipLp.setMargins(mPadding, mPadding, mPadding, 0);
    for (var i = 0; i < mTips.length; i++) {
        var tip = new TextView();
        tip.setText(mTips[i]);
        tip.setTextSize(R.dimen.text);
        tip.setTextColor(R.color.text);
        contentView.addView(tip, tipLp);
    }

    function CodeView(title, code) {
        ViewGroup.apply(this, []);

        var mCode;
        mCode = new EditText();
        mCode.setTextSize(10);
        mCode.setSingleLine(false);
        mCode.setText(code);
        if (title == "Jndroid") {
            mCode.setBorder(1, R.color.dividers);
        } else {
            mCode.setBorderTop(1, R.color.dividers);
            mCode.setBorderRight(1, R.color.dividers);
            mCode.setBorderBottom(1, R.color.dividers);
        }
        this.addView(mCode);

        this.postDelayed(this.requestLayout, 100);
        this.postDelayed(this.requestLayout, 5000);

        this.onMeasure = function(widthMS, heightMS) {
            var width = MeasureSpec.getSize(widthMS);
            var height = CODE_HEIGHT;

            var contentHeight = height - mPadding * 2;
            mCode.measure(MeasureSpec.makeMeasureSpec(width, MeasureSpec.EXACTLY),
                MeasureSpec.makeMeasureSpec(contentHeight, MeasureSpec.EXACTLY));

            this.setMeasuredDimension(width, height);
        };

        this.onLayout = function(x, y) {
            var offsetX = 0;
            var offsetY = R.dimen.padding;
            mCode.layout(offsetX, offsetY);
        }
    }
}

var mJndroidCode = "" +
    "/**\n" +
    " *\n" +
    " * Jndroid Code\n" +
    " * Jndroid 代码\n" +
    " *\n" +
    " */\n\n" +
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
    "/**\n" +
    " *\n" +
    " * Android Code\n" +
    " * Android 代码\n" +
    " *\n" +
    " */\n\n" +
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
    "▪ 在Jndroid中，用this定义的变量和方法，在外部可以通过\"对象.变量\"和\"对象.方法\"的方式调用，在该类的代码中，通过this.变量和this.方法的方式调用",
    "▪ 在Jndroid中，没有Context",
    "▪ 在Jndroid中，尺寸的密度都是1，除了在onDraw方法中，onDraw方法中需要考虑密度，否则在高分辨率屏幕上会模糊",
    "▪ 在Jndroid中，onDraw方法中的canvas其实是html canvas中的context",
    "▪ 在Jndroid中，目前还没有办法在一个方法中完美地调用父类的方法，使用组合方式吧",
    "▪ 在Jndroid中，图片与View大小一样时，图片会有锯齿，可以使用更大的图片，放缩后就没有锯齿了",
    "▪ 在Jndorid中，没有重载（overload），不过好在Jndroid中方法的参数个数是没有限制的"];

