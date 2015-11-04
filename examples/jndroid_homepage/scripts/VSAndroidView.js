function VSAndroidView() {
    ScrollView.apply(this);

    var padding = R.dimen.padding;

    var scrollCnt = new ViewGroup();
    scrollCnt.setBackgroundColor(R.color.bg);
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
        jndroid.setBg(0xffffffff);
        jndroid.setBorder(1, R.color.dividers);
        this.addView(jndroid);

        var android = createCodoView(androidCode);
        android.setBg(0xffffffff);
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
        btn.setBoxShadow(0, 1, 2, 0, 0x66000000);
        this.addView(btn);

        this.onMeasure = function(wMS) {
            var w = MeasureSpec.getSize(wMS);
            var h;
            var cntW;
            var cntH;
            if (Manifest.isPhone) {
                cntW = w - padding * 2;
                cntH = 720;
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
            var v = new CodeEditor();
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
    "    /* use apply instead of extend | 使用apply实现继承 */\n" +
    "    View.apply(this);\n\n" +
    "    /* public variable | 公开变量 */\n" +
    "    this.WIDTH = 100;\n" +
    "    this.HEIGHT = 50;\n" +
    "    this.TEXT_SIZE = 16;\n\n" +
    "    /* private variable | 私有变量 */\n" +
    "    var name = \"Click Me\";\n" +
    "    var self = this;\n\n" +
    "    /* no constructor, initiate your code here */\n" +
    "    /* Jndroid中没有构造函数，直接初始化 */\n" +
    "    this.setBackgroundColor(0xff009688);\n" +
    "    this.setWillNotDraw(false);\n\n" +
    "    /* set border, round corner and shadow is very difficult in Android */\n" +
    "    /* 想要在Android设置边框、圆角和阴影是非常麻烦的，但在Jndroid中却很简单 */\n" +
    "    this.setBorder(1, 0x33000000);\n" +
    "    this.setCornerSize(2);\n" +
    "    this.setBoxShadow(0, 0, 6, 0, 0x33000000);\n\n" +
    "    /* listener is a function | listener是一个function */\n" +
    "    this.setOnClickListener(function() {\n" +
    "        console.log(\"clicked\");\n" +
    "    });\n\n" +
    "    /* public method | 公开方法 */\n" +
    "    this.getName = function() {\n" +
    "        return name;\n" +
    "    }\n\n" +
    "    this.onMeasure = function(wMS, hMS) {\n" +
    "        this.setMeasuredDimension(this.WIDTH, this.HEIGHT);\n" +
    "    }\n\n\n\n\n" +
    "    this.onDraw = function(canvas) {\n" +
    "        /* this canvas is the context of HTML canvas */\n" +
    "        /* 这里的canvas是HTML canvas的context */\n" +
    "        canvas.fillStyle = \"#ffffff\";\n" +
    "        canvas.font = this.TEXT_SIZE + \"px\";\n" +
    "        canvas.textBaseline = \"middle\";\n" +
    "        var offsetX = calcXAlignCenter(canvas, name);\n" +
    "        var offsetY = this.getMeasuredHeight() / 2;\n" +
    "        canvas.fillText(name, offsetX, offsetY);\n" +
    "    }\n\n" +
    "    /* private method | 私有方法 */\n" +
    "    function calcXAlignCenter(canvas, text) {\n" +
    "        var txtMetrics = canvas.measureText(text);\n" +
    "        return (self.getMeasuredWidth() - txtMetrics.width) / 2;\n" +
    "    }\n" +
    "}";

var androidCode = "" +
    "/**\n" +
    " * Android\n" +
    " */\n\n" +
    "public class MyView extends View {\n\n\n" +
    "    /* public variable | 公开变量 */\n" +
    "    public static final int UI_WIDTH = 100;\n" +
    "    public static final int UI_HEIGHT = 50;\n" +
    "    public static final int UI_TEXT_SIZE = 16;\n\n" +
    "    /* private variable | 私有变量 */\n" +
    "    private String mName = \"Click Me\";\n\n" +
    "    public MyView(Context context){\n" +
    "        super(context);\n\n" +
    "        setBackgroundColor(0xff009688);\n" +
    "        setWillNotDraw(false);\n\n" +
    "        setOnClickListener(new OnClickListener(){\n\n" +
    "            @Override\n" +
    "            public void onClick(View v){\n" +
    "                Log.v(\"tag\", \"clicked\");\n" +
    "            }\n" +
    "        });\n" +
    "    }\n\n\n\n" +
    "    /* public method | 公开方法 */\n" +
    "    public String getName() {\n" +
    "        return mName;\n" +
    "    }\n\n" +
    "    @Override\n" +
    "    public void onMeasure(int widthMeasureSpec, int heightMeasureSpec){\n" +
    "        float density = getResources().getDisplayMetrics().density;\n" +
    "        int width = (int)(UI_WIDTH * density);\n" +
    "        int height = (int)(UI_HEIGHT * density);\n" +
    "        setMeasuredDimension(width, height);\n" +
    "    }\n\n" +
    "    @Override\n" +
    "    public void onDraw(Canvas canvas){\n" +
    "        Paint paint = new Paint();\n" +
    "        paint.setAntiAlias(true);\n" +
    "        paint.setTextSize(UI_TEXT_SIZE * getResources().getDisplayMetrics().density);\n" +
    "        float offsetX = calcXAlignCenter(mPaint, mName);\n" +
    "        FontMetrics fm = paint.getFontMetrics();\n" +
    "        float offsetY = getMeasuredHeight() / 2 - fm.descent + (fm.bottom - fm.top) / 2;\n" +
    "        canvas.drawText(mName, offsetX, offsetY, paint);\n" +
    "    }\n\n" +
    "    /* private method | 私有方法 */\n" +
    "    private float calcXAlignCenter(Paint paint, String text){\n" +
    "        float textWidth = paint.measureText(text);\n" +
    "        return (float)(getMeasuredWidth() - textWidth) / 2;\n" +
    "    }\n" +
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

