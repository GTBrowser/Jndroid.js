function VSAndroidView() {
    ScrollView.apply(this);

    var CODE_HEIGHT = 1140;
    if (mIsPhone) {
        CODE_HEIGHT = 1900;
    }
    var padding = R.dimen.padding;

    var cnt = new LinearLayout();
    cnt.setPadding(0, 0, 0, R.dimen.paragraph_padding_top);
    this.addView(cnt);

    var codeTitle = new TextView();
    codeTitle.setTextSize(R.dimen.title);
    codeTitle.setTextColor(R.color.theme);
    codeTitle.setText(R.string.to_android_develop);
    var codeTitleLp = new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT);
    codeTitleLp.setMargins(padding, R.dimen.paragraph_padding_top, padding, 0);
    cnt.addView(codeTitle, codeTitleLp);

    var codeArea = new FrameLayout();
    var codeAreaLp = new LayoutParams(LayoutParams.FILL_PARENT, CODE_HEIGHT);
    cnt.addView(codeArea, codeAreaLp);

    var linearLayout = new LinearLayout();
    linearLayout.setOrientation(LinearLayout.HORIZONTAL);
    var linearLayoutLp = new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.FILL_PARENT);
    linearLayoutLp.setMargins(padding, 0, padding, 0);
    codeArea.addView(linearLayout, linearLayoutLp);

    var codeViewLp = new LayoutParams(0, LayoutParams.FILL_PARENT);
    codeViewLp.weight = 1;

    var jndroidView = new CodeView("Jndroid", jndroidCode);
    linearLayout.addView(jndroidView, codeViewLp);

    var androidView = new CodeView("Android", androidCode);
    linearLayout.addView(androidView, codeViewLp);

    var moreTip = new TextView();
    moreTip.setTextSize(R.dimen.title);
    moreTip.setTextColor(R.color.theme);
    moreTip.setText(R.string.more_tips);
    var moreTipLp = new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT);
    moreTipLp.setMargins(padding, R.dimen.paragraph_padding_top - 32, padding, 0);
    cnt.addView(moreTip, moreTipLp);

    var tipLp = new LayoutParams(moreTipLp);
    tipLp.setMargins(padding, padding, padding, 0);
    for (var i = 0; i < tips.length; i++) {
        var tip = new TextView();
        tip.setText(tips[i]);
        tip.setTextSize(R.dimen.text);
        tip.setTextColor(R.color.text);
        cnt.addView(tip, tipLp);
    }

    function CodeView(title, code) {
        ViewGroup.apply(this);

        var codeView = new EditText();
        codeView.setSingleLine(false);
        codeView.setPadding(8);
        codeView.setTextColor(0xff006600);
        codeView.setTextSize(10);
        codeView.setText(code);
        if (title == "Jndroid") {
            codeView.setBorder(1, R.color.dividers);
        } else {
            codeView.setBorderTop(1, R.color.dividers);
            codeView.setBorderRight(1, R.color.dividers);
            codeView.setBorderBottom(1, R.color.dividers);
        }
        this.addView(codeView);

        this.onMeasure = function(wMS) {
            var w = MeasureSpec.getSize(wMS);
            var h = CODE_HEIGHT;

            var cntH = h - padding * 2;
            Utils.measureExactly(codeView, w, cntH);

            this.setMeasuredDimension(w, h);
        };

        this.onLayout = function() {
            codeView.layout(0, R.dimen.padding);
        }
    }
}

var jndroidCode = "" +
    "/**\n" +
    " * Jndroid\n" +
    " */\n\n" +
    "function MyView() {\n" +
    "\t/* use apply instead of extend | 使用apply实现继承 */\n" +
    "\tView.apply(this);\n\n" +
    "\t/* public variable | 公开变量 */\n" +
    "\tthis.WIDTH = 100;\n" +
    "\tthis.HEIGHT = 50;\n" +
    "\tthis.TEXT_SIZE = 16;\n\n" +
    "\t/* private variable | 私有变量 */\n" +
    "\tvar name = \"Click Me\";\n" +
    "\tvar self = this;\n\n" +
    "\t/* no constructor, initiate your code here */\n" +
    "\t/* Jndroid中没有构造函数，直接初始化 */\n" +
    "\tthis.setBackgroundColor(0xff009688);\n" +
    "\tthis.setWillNotDraw(false);\n\n" +
    "\t/* set border, round corner and shadow is very difficult in Android */\n" +
    "\t/* 想要在Android设置边框、圆角和阴影是非常麻烦的，但在Jndroid中却很简单 */\n" +
    "\tthis.setBorder(1, 0x33000000);\n" +
    "\tthis.setCornerSize(2);\n" +
    "\tthis.setBoxShadow(0, 0, 6, 0, 0x33000000);\n\n" +
    "\t/* listener is a function | listener是一个function */\n" +
    "\tthis.setOnClickListener(function() {\n" +
    "\t\tconsole.log(\"clicked\");\n" +
    "\t});\n\n" +
    "\t/* public method | 公开方法 */\n" +
    "\tthis.getName = function() {\n" +
    "\t\treturn name;\n" +
    "\t}\n\n" +
    "\tthis.onMeasure = function(widthMS, heightMS) {\n" +
    "\t\tthis.setMeasuredDimension(this.WIDTH, this.HEIGHT);\n" +
    "\t}\n\n\n\n\n" +
    "\tthis.onDraw = function(canvas) {\n" +
    "\t\t/* this canvas is the context of HTML canvas */\n" +
    "\t\t/* 这里的canvas是HTML canvas的context */\n" +
    "\t\tcanvas.fillStyle = \"#ffffff\";\n" +
    "\t\tcanvas.font = this.TEXT_SIZE + \"px\";\n" +
    "\t\tcanvas.textBaseline = \"middle\";\n" +
    "\t\tvar offsetX = calcXAlignCenter(canvas, name);\n" +
    "\t\tvar offsetY = this.getMeasuredHeight() / 2;\n" +
    "\t\tcanvas.fillText(name, offsetX, offsetY);\n" +
    "\t}\n\n" +
    "\t/* private method | 私有方法 */\n" +
    "\tfunction calcXAlignCenter(canvas, text) {\n" +
    "\t\tvar txtMetrics = canvas.measureText(text);\n" +
    "\t\treturn (self.getMeasuredWidth() - txtMetrics.width) / 2;\n" +
    "\t}\n" +
    "}";

var androidCode = "" +
    "/**\n" +
    " * Android\n" +
    " */\n\n" +
    "public class MyView extends View {\n\n\n" +
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

var tips = ["▪ 在Jndroid中，this的概念与Android中的this类似但不完全相同",
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

