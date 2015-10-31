function IntroView() {
    ScrollView.apply(this);

    this.setBg(R.color.card_bg);

    var padding = R.dimen.padding;

    var cnt = new LinearLayout();
    cnt.onMeasure = function(wMS) {
        var w = MeasureSpec.getSize(wMS);
        cntHeader.measure(w, 0);
        cntBody.measure(Math.min(w, Manifest.maxWidth), 0);
        var h = cntHeader.getMH() + cntBody.getMH();
        this.setMeasuredDimension(w, h);
    };
    cnt.onLayout = function() {
        var x = 0;
        var y = 0;
        cntHeader.layout(x, y);

        x = (this.getMW() - cntBody.getMW()) / 2;
        y += cntHeader.getMH();
        cntBody.layout(x, y);
    };
    this.addView(cnt);

    var cntHeader = new IntroHeader();
    cnt.addView(cntHeader);

    var cntBody = new LinearLayout();
    cntBody.setPadding(0, 0, 0, R.dimen.content_padding_bottom);
    cnt.addView(cntBody);

    loadGithubView();

    loadGitCafeView();

    loadPlaygrounds();

    function loadGitCafeView() {
        var gitcafe = Theme.createThemeTitle("GitCafé");
        cntBody.addView(gitcafe);

        var gitcafeLayoutlp = new LayoutParams(LayoutParams.FILL_PARENT, 48);
        var cafeLayout = new LinearLayout();
        cafeLayout.setOnClickListener(function() {
            window.open("https://gitcafe.com/GTBrowser/Jndroid.js");
        });
        cafeLayout.setOrientation(LinearLayout.HORIZONTAL);
        cntBody.addView(cafeLayout, gitcafeLayoutlp);

        var imgLp = new LayoutParams(64, 24);
        imgLp.gravity = Gravity.CENTER;
        imgLp.leftMargin = padding;

        var cafeImg = new ImageView();
        cafeImg.setImgSrc("images/gitcafe.png");
        cafeImg.setCornerSize(3);
        cafeImg.setBoxShadow(0, 1, 2, 0, R.color.shadow);
        cafeImg.setImgHeight(24);
        cafeLayout.addView(cafeImg, imgLp);

        var urlLp = new LayoutParams(0, LayoutParams.FILL_PARENT);
        urlLp.weight = 1;
        urlLp.leftMargin = padding;

        var cafeLink = Theme.createSubText("https://gitcafe.com/GTBrowser/Jndroid.js");
        cafeLayout.addView(cafeLink, urlLp);

    }

    function loadGithubView() {
        var github = Theme.createThemeTitle("Github");
        cntBody.addView(github);

        var githubLayoutlp = new LayoutParams(LayoutParams.FILL_PARENT, 48);
        var starLayout = new LinearLayout();
        starLayout.setOnClickListener(function() {
            window.open("https://github.com/GTBrowser/Jndroid.js");
        });
        starLayout.setOrientation(LinearLayout.HORIZONTAL);
        cntBody.addView(starLayout, githubLayoutlp);

        var imgLp = new LayoutParams(96, LayoutParams.FILL_PARENT);
        var urlLp = new LayoutParams(0, LayoutParams.FILL_PARENT);
        urlLp.weight = 1;
        var starImg = new ImageView();
        starImg.setImgSrc("https://img.shields.io/github/stars/GTBrowser/Jndroid.js.svg");
        starImg.setImgHeight(24);
        starLayout.addView(starImg, imgLp);

        var starLink = Theme.createSubText("https://github.com/GTBrowser/Jndroid.js");
        starLayout.addView(starLink, urlLp);

        var forkLayout = new LinearLayout();
        forkLayout.setOnClickListener(function() {
            window.open("https://github.com/GTBrowser/Jndroid.js/fork");
        });
        forkLayout.setOrientation(LinearLayout.HORIZONTAL);
        cntBody.addView(forkLayout, githubLayoutlp);

        var forkImg = new ImageView();
        forkImg.setImgSrc("https://img.shields.io/github/forks/GTBrowser/Jndroid.js.svg");
        forkImg.setImgHeight(24);
        forkLayout.addView(forkImg, imgLp);

        var forkLink = Theme.createSubText("https://github.com/GTBrowser/Jndroid.js/fork");
        forkLayout.addView(forkLink, urlLp);

    }

    function loadPlaygrounds() {
        var getstart = Theme.createThemeTitle(R.string.getstart);
        cntBody.addView(getstart);

        var playground = new Playground("Hello World", "", helloWorldCode, "", true);
        playground.setEditHeight(410);
        var lp = new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT);
        lp.setMargins(padding);
        cntBody.addView(playground, lp);

        var androidL = Theme.createThemeTitle(R.string.material_design);
        cntBody.addView(androidL);

        playground = new Playground("Widgets", materitalDesignPreCode, materialDesignCode, "");
        playground.setEditHeight(510);
        cntBody.addView(playground, lp);

        var apidemos = Theme.createThemeTitle("API Demos");
        cntBody.addView(apidemos);

        playground = new Playground("ListView", "", listViewCode, "");
        playground.setEditHeight(510);
        cntBody.addView(playground, lp);

        playground = new Playground("Widgets", widgetPreCode, widgetCode, "");
        playground.setEditHeight(350);
        cntBody.addView(playground, lp);

        playground = new Playground("onMeasure & onLayout", measurePreCode, meausreCode, "");
        playground.setEditHeight(320);
        cntBody.addView(playground, lp);

        playground = new Playground("onDraw", drawPreCode, drawCode, "");
        playground.setEditHeight(280);
        cntBody.addView(playground, lp);

        playground = new Playground("onTouchEvent", touchPreCode, touchCode, touchAppendCode);
        playground.setEditHeight(405);
        cntBody.addView(playground, lp);

        playground = new Playground("Animation", animPreCode, animCode, animAppendCode);
        playground.setEditHeight(420);
        cntBody.addView(playground, lp);
    }

    function IntroHeader() {
        ViewGroup.apply(this);

        var imageView = new ImageView();
        imageView.setImageUri("images/masterpiece.jpg");
        imageView.setScaleType(ScaleType.CENTER_CROP);
        imageView.setBoxShadow(0, 3, 3, 0, R.color.shadow);
        this.addView(imageView);

        var mask = new View();
        mask.setBg(0x45000000);
        this.addView(mask);

        var jndroid = new TextView();
        jndroid.setTextSize(R.dimen.supTitle);
        jndroid.setTextColor(0xffffffff);
        jndroid.setText("Jndroid 1.0.0");
        jndroid.setStyle("font-weight", "100");
        this.addView(jndroid);

        var slogan = Theme.createText(R.string.intro_content);
        slogan.setLineHeight(28);
        slogan.setTextColor(0xffffffff);
        this.addView(slogan);

        this.onMeasure = function(wMS) {
            var w = MeasureSpec.getSize(wMS);
            var h = 320;
            imageView.measure(w, h);

            var cntW = w - padding * 2;
            if (w > Manifest.maxWidth) {
                cntW = Manifest.maxWidth - padding * 2;
            }
            jndroid.measure(cntW / 3, 0);
            var sloganW = Math.max(jndroid.getMW(), cntW / 3);
            slogan.measure(MeasureSpec.makeMeasureSpec(sloganW, MeasureSpec.EXACTLY), 0);
            mask.measure(Math.max(jndroid.getMW(), slogan.getMW()) + padding * 2, h);

            this.setMeasuredDimension(w, h);
        };

        this.onLayout = function() {
            var x = 0;
            var y = 0;
            imageView.layout(x, y);

            var w = this.getMW();
            var cntW = w - padding * 2;
            if (w > Manifest.maxWidth) {
                cntW = Manifest.maxWidth - padding * 2;
            }
            x = (w - cntW) / 2 - padding;
            y = 0;
            mask.layout(x, y);

            x = (w - cntW) / 2;
            y = 60;
            jndroid.layout(x, y);

            y += jndroid.getMH() + padding;
            slogan.layout(x, y);
        }
    }
}

var helloWorldCode = "<!DOCTYPE html>\n" +
    "<html>\n" +
    "<head>\n" +
    "    <!-- you only need to import jndroid.js -->\n" +
    "    <!-- 你仅需引入jndroid.js便可进行开发了 -->\n" +
    "    <script src=\"http://file.gtbrowser.cn/jndroid/0.9.0/jndroid.js\"></script>\n" +
    "</head>\n" +
    "<body>\n" +
    "<script>\n" +
    "    /* your code here */\n" +
    "    /* 在这里编写你的代码 */\n" +
    "    var layout = new FrameLayout();\n\n" +
    "    /* no activity here, setContentView is enough */\n" +
    "    /* 没有Activity，直接setContentView就可以了 */\n" +
    "    setContentView(layout);\n\n" +
    "    var textView = new TextView();\n" +
    "    textView.setText(\"hello world\");\n" +
    "    layout.addView(textView);\n" +
    "</script>\n" +
    "</body>\n" +
    "</html>";

var materitalDesignPreCode = "" +
    "var layout = new LinearLayout();\n" +
    "this.addView(layout);\n\n" +
    "var lp = new LayoutParams(LayoutParams.FILL_PARENT, 48);\n" +
    "lp.setMargins(8);\n\n";

var materialDesignCode = "" +
    "var btn = new MButton();\n" +
    "btn.setText(\"button\");\n" +
    "btn.setOnClickListener(function() {\n" +
    "    window.alert(\"Material Design\");\n" +
    "});\n" +
    "layout.addView(btn, lp);\n\n" +
    "var group = new MRadioGroup();\n" +
    "for (var i = 0; i < 3; i++) {\n" +
    "    var item = new MRadioButton();\n" +
    "    item.setId(i);\n" +
    "    item.setColor(0xff0091ea);\n" +
    "    item.setText(\"RadioButton \" + i);\n" +
    "    group.addChild(item);\n" +
    "}\n" +
    "layout.addView(group);\n\n" +
    "var editText = new MEditText();\n" +
    "editText.setHint(\"input text here\");\n" +
    "editText.setHighlightColor(0xff0091ea);\n" +
    "layout.addView(editText, lp);\n\n" +
    "var progress = new MProgressBar();\n" +
    "progress.setProgressColor(0xff0091ea);\n" +
    "progress.setStyle(MProgressBar.Small);\n" +
    "layout.addView(progress, lp);\n\n" +
    "var toggleButton = new MToggleButton();\n" +
    "toggleButton.setColor(0xff0091ea);\n" +
    "layout.addView(toggleButton, lp);\n" +
    "";

var listViewCode = "" +
    "var listView = new ListView(ListItem);\n" +
    "listView.setBorder(1, 0x33000000);\n" +
    "this.addView(listView);\n\n" +
    "/* 构造models */\n" +
    "var models = [];\n" +
    "for (var i = 0; i < 100000; i++) {\n" +
    "    models.add(i);\n" +
    "}\n\n" +
    "/* 加载models */\n" +
    "listView.add(models);\n\n" +
    "/* 自定义ListView中item的实现 */\n" +
    "function ListItem() {\n" +
    "    Button.apply(this);\n\n" +
    "    var model;\n" +
    "    this.setOnClickListener(function() {\n" +
    "        alert(model);\n" +
    "    });\n" +
    "    var lp = new LayoutParams(LayoutParams.FILL_PARENT, 48);\n" +
    "    this.setLayoutParams(lp);\n\n" +
    "    /* ListView的item通过实现setModel来更新自身数据 */\n" +
    "    this.setModel = function(m) {\n" +
    "        model = m;\n" +
    "        this.setText(m);\n" +
    "    }\n" +
    "}";

var widgetPreCode = "" +
    "var layout = new LinearLayout();\n" +
    "this.addView(layout);\n\n" +
    "var lp = new LayoutParams(LayoutParams.FILL_PARENT, 48);\n" +
    "lp.setMargins(8);\n\n";

var widgetCode = "" +
    "var btn = new Button();\n" +
    "btn.setText(\"button\");\n" +
    "btn.setOnClickListener(function() {\n" +
    "    window.alert(\"button click\");\n" +
    "});\n" +
    "layout.addView(btn, lp);\n\n" +
    "var text = new TextView();\n" +
    "text.setText(\"textview\");\n" +
    "layout.addView(text, lp);\n\n" +
    "var editText = new EditText();\n" +
    "editText.setHintText(\"edittext\");\n" +
    "layout.addView(editText, lp);\n\n" +
    "var image = new ImageView();\n" +
    "image.setImageUri(\"images/ic_launcher.png\")\n" +
    "image.setScaleType(ScaleType.FIT_CENTER);\n" +
    "var imgLp = new LayoutParams(108, 108);\n" +
    "layout.addView(image, imgLp);";

var measurePreCode = "" +
    "var view = new MyView();\n" +
    "this.addView(view);\n\n";

var meausreCode = "" +
    "function MyView() {\n" +
    "    ViewGroup.apply(this);\n\n" +
    "    var child = new View();\n" +
    "    child.setBackgroundColor(0xff0091ea);\n" +
    "    this.addView(child);\n\n" +
    "    this.onMeasure = function(wMS, hMS) {\n" +
    "        var w = MeasureSpec.getSize(wMS);\n" +
    "        var h = MeasureSpec.getSize(hMS);\n" +
    "        child.measure(w / 4, h / 4);\n" +
    "        this.setMeasuredDimension(w, h);\n" +
    "    }\n\n" +
    "    this.onLayout = function() {\n" +
    "        child.layout(50, 100);\n" +
    "    }\n" +
    "}";

var drawPreCode = "" +
    "var mView = new MyView();\n" +
    "this.addView(mView);\n\n";


var drawCode = "" +
    "function MyView() {\n" +
    "    View.apply(this);\n" +
    "    this.setWillNotDraw(false);\n\n" +
    "    this.onDraw = function(canvas) {\n" +
    "        var density = DisplayMetrics.density;\n" +
    "        var x = 100 * density;\n" +
    "        var y = 100 * density;\n" +
    "        var r = 50 * density;\n" +
    "        canvas.beginPath();\n" +
    "        canvas.arc(x, y, r, 0, Math.PI * 2, true);\n" +
    "        canvas.closePath();\n" +
    "        canvas.fillStyle = \"#0091ea\";\n" +
    "        canvas.fill();\n" +
    "    }\n" +
    "}";

var touchPreCode = "" +
    "var mView = new MyView();\n" +
    "var lp = new LayoutParams(200, 100);" +
    "lp.gravity = Gravity.CENTER;" +
    "this.addView(mView, lp);\n\n" +
    "function MyView() {\n" +
    "    TextView.apply(this);\n\n" +
    "    this.setText(\"Drag Me\");\n" +
    "    this.setTextColor(0xffffffff);\n" +
    "    this.setGravity(Gravity.CENTER);\n" +
    "    this.setBackgroundColor(0xff0091ea);\n" +
    "    this.setClickable(true);\n\n";

var touchCode = "" +
    "var lastX = 0;\n" +
    "var lastY = 0;\n\n" +
    "this.onTouchEvent = function(e) {\n" +
    "    switch (e.getAction()) {\n" +
    "    case MotionEvent.ACTION_DOWN:\n" +
    "        this.getParent().requestDisallowInterceptTouchEvent(true);\n" +
    "        lastX = e.getRawX();\n" +
    "        lastY = e.getRawY();\n" +
    "        this.setBackgroundColor(0xcc0091ea);\n" +
    "    break;\n" +
    "    case MotionEvent.ACTION_MOVE:\n" +
    "        var dx = e.getRawX() - lastX;\n" +
    "        var dy = e.getRawY() - lastY;\n" +
    "        this.layout(this.getLeft() + dx, this.getTop() + dy);\n" +
    "        lastX = e.getRawX();\n" +
    "        lastY = e.getRawY();\n" +
    "    break;\n" +
    "    case MotionEvent.ACTION_UP:\n" +
    "    case MotionEvent.ACTION_CANCEL:\n" +
    "        this.setBackgroundColor(0xff0091ea);\n" +
    "    break;\n" +
    "    }\n" +
    "}\n";
var touchAppendCode = "}";

var animPreCode = "" +
    "var target = new View();\n" +
    "target.setBackgroundColor(0xff0091ea);\n" +
    "var targetlp = new LayoutParams(100, 50);\n" +
    "targetlp.gravity = Gravity.CENTER;\n" +
    "this.addView(target, targetlp);\n\n" +
    "";

var animCode = "" +
    "var duration = 500;\n\n" +
    "" +
    "function translate() {\n" +
    "    var anim = new TranslateAnimation(0, 100, 0, 50);\n" +
    "    anim.setDuration(duration);\n" +
    "    target.startAnimation(anim);\n" +
    "}\n\n" +
    "" +
    "function alpha() {\n" +
    "    var anim = new AlphaAnimation(1, 0.5);\n" +
    "    anim.setDuration(duration);\n" +
    "    target.startAnimation(anim);\n" +
    "}\n\n" +
    "" +
    "function rotate() {\n" +
    "    var anim = new RotateAnimation(0, 90);\n" +
    "    anim.setDuration(duration);\n" +
    "    target.startAnimation(anim);\n" +
    "}\n\n" +
    "" +
    "function scale() {\n" +
    "    var anim = new ScaleAnimation(1, 2);\n" +
    "    anim.setDuration(duration);\n" +
    "    target.startAnimation(anim);\n" +
    "}\n\n" +
    "";

var animAppendCode = "" +
    "var bar = new LinearLayout();\n" +
    "bar.setOrientation(LinearLayout.Horizontal);\n" +
    "var barlp = new LayoutParams(LayoutParams.FILL_PARENT, 56);\n" +
    "this.addView(bar, barlp);\n" +
    "var btnlp = new LayoutParams(0, 48);\n" +
    "btnlp.setMargins(4);\n" +
    "btnlp.weight = 1;\n" +
    "var translateBtn = new Button();\n" +
    "translateBtn.setText(\"translate\");\n" +
    "translateBtn.setOnClickListener(function() {translate();});" +
    "bar.addView(translateBtn, btnlp);\n" +
    "var alphaBtn = new Button();\n" +
    "alphaBtn.setText(\"alpha\");\n" +
    "alphaBtn.setOnClickListener(function() {alpha();});" +
    "bar.addView(alphaBtn, btnlp);\n" +
    "var rotateBtn = new Button();\n" +
    "rotateBtn.setOnClickListener(function() {rotate();});" +
    "rotateBtn.setText(\"rotate\");\n" +
    "bar.addView(rotateBtn, btnlp);\n" +
    "var scaleBtn = new Button();" +
    "scaleBtn.setText(\"scale\");\n" +
    "scaleBtn.setOnClickListener(function() {scale();});" +
    "bar.addView(scaleBtn, btnlp);" +
    "";
