function VSAndroidView() {
    ScrollView.apply(this);

    this.setBackgroundColor(R.color.bg);

    var padding = R.dimen.padding;

    var scrollCnt = new ViewGroup();
    scrollCnt.onMeasure = function(wMS) {
        var w = MeasureSpec.getSize(wMS);
        var cntW = Math.min(w, Manifest.maxWidth);
        cnt.measure(cntW, 0);
        this.setMeasuredDimension(w, cnt.getMH());
    };
    scrollCnt.onLayout = function() {
        var x = (this.getMW() - cnt.getMW()) / 2;
        cnt.layout(x, 0);
    };
    this.addView(scrollCnt);

    var cnt = new LinearLayout();
    cnt.setPadding(0, 0, 0, R.dimen.paragraph_padding_top);
    scrollCnt.addView(cnt);

    var codeTitle = Theme.createThemeTitle(R.string.to_android_develop);
    cnt.addView(codeTitle);

    var compare = new CompareView();
    var compareLp = new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT);
    cnt.addView(compare, compareLp);

    var moreTip = Theme.createThemeTitle(R.string.more_tips);
    cnt.addView(moreTip);

    var tipLp = new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT);
    tipLp.setMargins(padding, padding, padding, 0);
    for (var i = 0; i < tips.length; i++) {
        var tip = Theme.createText(tips[i]);
        cnt.addView(tip, tipLp);
    }

    function CompareView() {
        ViewGroup.apply(this);

        var jndroid = createCodoView(jndroidCode);
        jndroid.setBorder(1, R.color.dividers);
        this.addView(jndroid);

        var android = createCodoView(androidCode);
        android.setBorderRight(1, R.color.dividers);
        android.setBorderBottom(1, R.color.dividers);
        this.addView(android);

        var btn = new View();
        btn.setText("VS");
        btn.setTextSize(R.dimen.title);
        btn.setTextColor(R.color.sub_text);
        btn.setCornerSize(24);
        btn.setBackgroundColor(0xfffffffff);
        btn.setStyle("textAlign", "center");
        btn.setStyle("lineHeight", "48px");
        btn.setBorder(1, R.color.dividers);
        btn.setBoxShadow(0, 6, 6, 0, 0x66000000);
        this.addView(btn);

        this.onMeasure = function(wMS) {
            var w = MeasureSpec.getSize(wMS);
            var h;
            var cntW;
            var cntH;
            if (Manifest.isPhone) {
                cntW = w - padding * 2;
                cntH = 1140;
                Utils.measureExactly(jndroid, cntW, cntH);
                Utils.measureExactly(android, cntW, cntH);
                h = jndroid.getMH() * 2;

                android.setBorderLeft(1, R.color.dividers);
                android.setBorderTop(0, 0);
            } else {
                cntW = w / 2 - padding;
                cntH = 1080;
                Utils.measureExactly(jndroid, cntW, cntH);
                Utils.measureExactly(android, cntW, cntH);
                h = jndroid.getMH();

                android.setBorderLeft(0, 0);
                android.setBorderTop(1, R.color.dividers);
            }
            btn.measure(48, 48);
            this.setMeasuredDimension(w, h);
        };

        this.onLayout = function() {
            var x = padding;
            var y = 0;
            jndroid.layout(x, y);

            if (Manifest.isPhone) {
                y += jndroid.getMH();
                android.layout(x, y);
            } else {
                x += jndroid.getMW();
                android.layout(x, y);
            }

            x = (this.getMW() - btn.getMW()) / 2;
            y = (this.getMH() - btn.getMH()) / 2;
            btn.layout(x, y);
        };

        function createCodoView(code) {
            var v = new EditText();
            v.setSingleLine(false);
            v.setPadding(8);
            v.setTextColor(0xff006600);
            v.setTextSize(10);
            v.setText(code);
            return v;
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
    "\tthis.onMeasure = function(wMS, hMS) {\n" +
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

