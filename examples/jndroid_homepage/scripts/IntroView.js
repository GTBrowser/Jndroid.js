/**
 * Created by lency on 5/18/15.
 */
function IntroView() {
    ScrollView.apply(this);

    this.setBg(R.color.card_bg);

    var padding = R.dimen.padding;
    var paraPaddingTop = R.dimen.paragraph_padding_top;

    var cnt = new LinearLayout();
    cnt.setPadding(0, 0, 0, R.dimen.title_padding_top);
    this.addView(cnt);

    loadMasterpiece();

    var mIntro = new TextView();
    mIntro.setTextSize(R.dimen.title);
    mIntro.setTextColor(R.color.theme);
    mIntro.setText(R.string.intro);
    var introLp = new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT);
    introLp.setMargins(padding, paraPaddingTop, padding, 0);
    cnt.addView(mIntro, introLp);

    loadSlogan(R.string.intro_content);

    loadGithubView();

    loadGitCafeView();

    loadPlaygrounds();

    function loadSlogan(text) {
        var slogan = new TextView();
        slogan.setTextSize(R.dimen.text);
        slogan.setTextColor(R.color.text);
        slogan.setText(text);

        var sloganLp = new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT);
        sloganLp.setMargins(padding, padding, padding, 0);

        cnt.addView(slogan, sloganLp);
    }

    function loadMasterpiece() {
        var imageView = new ImageView();
        imageView.setImageUri("images/masterpiece.jpg");
        imageView.setScaleType(ScaleType.CENTER_CROP);
        imageView.setBoxShadow(0, 3, 3, 0, R.color.shadow);
        var imgLp = new LayoutParams(LayoutParams.FILL_PARENT, 144);
        cnt.addView(imageView, imgLp);
    }

    function loadGitCafeView() {
        var gitcafe = new TextView();
        gitcafe.setTextSize(R.dimen.title);
        gitcafe.setTextColor(R.color.theme);
        gitcafe.setText("GitCafé");
        var gitcafeLp = new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT);
        gitcafeLp.setMargins(padding, paraPaddingTop, padding, padding);
        cnt.addView(gitcafe, gitcafeLp);

        var gitcafeLayoutlp = new LayoutParams(LayoutParams.FILL_PARENT, 48);
        var cafeLayout = new LinearLayout();
        cafeLayout.setOnClickListener(function() {
            window.open("https://gitcafe.com/GTBrowser/Jndroid.js");
        });
        cafeLayout.setOrientation(LinearLayout.HORIZONTAL);
        cnt.addView(cafeLayout, gitcafeLayoutlp);

        var imgLp = new LayoutParams(64, 24);
        imgLp.gravity = Gravity.CENTER;
        imgLp.leftMargin = padding;
        var urlLp = new LayoutParams(0, LayoutParams.FILL_PARENT);
        urlLp.weight = 1;
        urlLp.leftMargin = padding;
        var cafeImg = new ImageView();
        cafeImg.setImgSrc("images/gitcafe.png");
        cafeImg.setCornerSize(3);
        cafeImg.setBoxShadow(0, 1, 2, 0, R.color.shadow);
        cafeImg.setImgHeight(24);
        cafeLayout.addView(cafeImg, imgLp);
        var cafeLink = new TextView();
        cafeLink.setGravity(Gravity.LEFT | Gravity.CENTER_VERTICAL);
        cafeLink.setText("https://gitcafe.com/GTBrowser/Jndroid.js");
        cafeLink.setTextSize(R.dimen.sub_text);
        cafeLink.setTextColor(R.color.sub_text);
        cafeLayout.addView(cafeLink, urlLp);

    }

    function loadGithubView() {
        var github = new TextView();
        github.setTextSize(R.dimen.title);
        github.setTextColor(R.color.theme);
        github.setText("Github");
        var githubLp = new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT);
        githubLp.setMargins(padding, paraPaddingTop, padding, padding);
        cnt.addView(github, githubLp);

        var githubLayoutlp = new LayoutParams(LayoutParams.FILL_PARENT, 48);
        var starLayout = new LinearLayout();
        starLayout.setOnClickListener(function() {
            window.open("https://github.com/GTBrowser/Jndroid.js");
        });
        starLayout.setOrientation(LinearLayout.HORIZONTAL);
        cnt.addView(starLayout, githubLayoutlp);

        var imgLp = new LayoutParams(96, LayoutParams.FILL_PARENT);
        var urlLp = new LayoutParams(0, LayoutParams.FILL_PARENT);
        urlLp.weight = 1;
        var starImg = new ImageView();
        starImg.setImgSrc("https://img.shields.io/github/stars/GTBrowser/Jndroid.js.svg");
        starImg.setImgHeight(24);
        starLayout.addView(starImg, imgLp);
        var starLink = new TextView();
        starLink.setGravity(Gravity.LEFT | Gravity.CENTER_VERTICAL);
        starLink.setText("https://github.com/GTBrowser/Jndroid.js");
        starLink.setTextSize(R.dimen.sub_text);
        starLink.setTextColor(R.color.sub_text);
        starLayout.addView(starLink, urlLp);

        var forkLayout = new LinearLayout();
        forkLayout.setOnClickListener(function() {
            window.open("https://github.com/GTBrowser/Jndroid.js/fork");
        });
        forkLayout.setOrientation(LinearLayout.HORIZONTAL);
        cnt.addView(forkLayout, githubLayoutlp);

        var forkImg = new ImageView();
        forkImg.setImgSrc("https://img.shields.io/github/forks/GTBrowser/Jndroid.js.svg");
        forkImg.setImgHeight(24);
        forkLayout.addView(forkImg, imgLp);
        var forkLink = new TextView();
        forkLink.setGravity(Gravity.LEFT | Gravity.CENTER_VERTICAL);
        forkLink.setText("https://github.com/GTBrowser/Jndroid.js/fork");
        forkLink.setTextSize(R.dimen.sub_text);
        forkLink.setTextColor(R.color.sub_text);
        forkLayout.addView(forkLink, urlLp);

    }

    function loadPlaygrounds() {
        var getstart = new TextView();
        getstart.setTextSize(R.dimen.title);
        getstart.setTextColor(R.color.theme);
        getstart.setText(R.string.getstart);
        var getstartLp = new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT);
        getstartLp.setMargins(padding, paraPaddingTop, padding, padding);
        cnt.addView(getstart, getstartLp);

        var playground = new Playground("Hello World", "", helloWorldCode, "", true);
        playground.setEditHeight(450);
        var lp = new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT);
        lp.setMargins(16);
        cnt.addView(playground, lp);

        var androidL = new TextView();
        androidL.setTextSize(R.dimen.title);
        androidL.setTextColor(R.color.theme);
        androidL.setText(R.string.material_design);
        var androidLLp = new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT);
        androidLLp.setMargins(padding, paraPaddingTop, padding, padding);
        cnt.addView(androidL, androidLLp);

        playground = new Playground("Widgets", materitalDesignPreCode, materialDesignCode, "");
        playground.setEditHeight(540);
        cnt.addView(playground, lp);

        var apidemos = new TextView();
        apidemos.setTextSize(R.dimen.title);
        apidemos.setTextColor(R.color.theme);
        apidemos.setText("API Demos");
        var apidemosLp = new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT);
        apidemosLp.setMargins(padding, paraPaddingTop, padding, padding);
        cnt.addView(apidemos, apidemosLp);

        playground = new Playground("Widgets", widgetPreCode, widgetCode, "");
        playground.setEditHeight(400);
        cnt.addView(playground, lp);

        playground = new Playground("onMeasure & onLayout", measurePreCode, meausreCode, "");
        playground.setEditHeight(360);
        cnt.addView(playground, lp);

        playground = new Playground("onDraw", drawPreCode, drawCode, "");
        playground.setEditHeight(320);
        cnt.addView(playground, lp);

        playground = new Playground("onTouchEvent", touchPreCode, touchCode, touchAppendCode);
        playground.setEditHeight(480);
        cnt.addView(playground, lp);

        playground = new Playground("Animation", animPreCode, animCode, animAppendCode);
        playground.setEditHeight(480);
        cnt.addView(playground, lp);
    }
}

var helloWorldCode = "<!DOCTYPE html>\n" +
    "<html>\n" +
    "<head>\n" +
    "\t<!-- you only need to import jndroid.js -->\n" +
    "\t<!-- 你仅需引入jndroid.js便可进行开发了 -->\n" +
    "\t<script src=\"http://file.gtbrowser.cn/jndroid/0.9.0/jndroid.js\"></script>\n" +
    "</head>\n" +
    "<body>\n" +
    "<script>\n" +
    "\t/* your code here */\n" +
    "\t/* 在这里编写你的代码 */\n" +
    "\tvar layout = new FrameLayout();\n\n" +
    "\t/* no activity here, setContentView is enough */\n" +
    "\t/* 没有Activity，直接setContentView就可以了 */\n" +
    "\tsetContentView(layout);\n\n" +
    "\tvar textView = new TextView();\n" +
    "\ttextView.setText(\"helle world\");\n" +
    "\tlayout.addView(textView);\n" +
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
    "\twindow.alert(\"Material Design\");\n" +
    "});\n" +
    "layout.addView(btn, lp);\n\n" +
    "var group = new MRadioGroup();\n" +
    "for (var i = 0; i < 3; i++) {\n" +
    "\tvar item = new MRadioButton();\n" +
    "\titem.setId(i);\n" +
    "\titem.setColor(0xff673ab7);\n" +
    "\titem.setText(\"RadioButton \" + i);\n" +
    "\tgroup.addChild(item);\n" +
    "}\n" +
    "layout.addView(group);\n\n" +
    "var editText = new MEditText();\n" +
    "editText.setHint(\"input text here\");\n" +
    "editText.setHighlightColor(0xff673ab7);\n" +
    "layout.addView(editText, lp);\n\n" +
    "var progress = new MProgressBar();\n" +
    "progress.setProgressColor(0xff673ab7);\n" +
    "progress.setStyle(MProgressBar.Small);\n" +
    "layout.addView(progress, lp);\n\n" +
    "var toggleButton = new MToggleButton();\n" +
    "toggleButton.setColor(0xff673ab7);\n" +
    "layout.addView(toggleButton, lp);\n" +
    "";

var widgetPreCode = "" +
    "var layout = new LinearLayout();\n" +
    "this.addView(layout);\n\n" +
    "var lp = new LayoutParams(LayoutParams.FILL_PARENT, 48);\n" +
    "lp.setMargins(8);\n\n";

var widgetCode = "" +
    "var btn = new Button();\n" +
    "btn.setText(\"button\");\n" +
    "btn.setOnClickListener(function() {\n" +
    "\twindow.alert(\"button click\");\n" +
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
    "\tViewGroup.apply(this);\n\n" +
    "\tvar child = new View();\n" +
    "\tchild.setBackgroundColor(0xff673ab7);\n" +
    "\tthis.addView(child);\n\n" +
    "\tthis.onMeasure = function(wMS, hMS) {\n" +
    "\t\tvar w = MeasureSpec.getSize(wMS);\n" +
    "\t\tvar h = MeasureSpec.getSize(hMS);\n" +
    "\t\tchild.measure(w / 4, h / 4);\n" +
    "\t\tthis.setMeasuredDimension(w, h);\n" +
    "\t}\n\n" +
    "\tthis.onLayout = function() {\n" +
    "\t\tchild.layout(50, 100);\n" +
    "\t}\n" +
    "}";

var drawPreCode = "" +
    "var mView = new MyView();\n" +
    "this.addView(mView);\n\n";


var drawCode = "" +
    "function MyView() {\n" +
    "\tView.apply(this);\n" +
    "\tthis.setWillNotDraw(false);\n\n" +
    "\tthis.onDraw = function(canvas) {\n" +
    "\t\tvar density = DisplayMetrics.density;\n" +
    "\t\tvar x = 100 * density;\n" +
    "\t\tvar y = 100 * density;\n" +
    "\t\tvar r = 50 * density;\n" +
    "\t\tcanvas.beginPath();\n" +
    "\t\tcanvas.arc(x, y, r, 0, Math.PI * 2, true);\n" +
    "\t\tcanvas.closePath();\n" +
    "\t\tcanvas.fillStyle = \"#673ab7\";\n" +
    "\t\tcanvas.fill();\n" +
    "\t}\n" +
    "}";

var touchPreCode = "" +
    "var mView = new MyView();\n" +
    "var lp = new LayoutParams(200, 100);" +
    "this.addView(mView, lp);\n\n" +
    "function MyView() {\n" +
    "\tTextView.apply(this);\n\n" +
    "\tthis.setText(\"Drag Me\");\n" +
    "\tthis.setTextColor(0xffffffff);\n" +
    "\tthis.setGravity(Gravity.CENTER);\n" +
    "\tthis.setBackgroundColor(0xff673ab7);\n" +
    "\tthis.setClickable(true);\n\n";

var touchCode = "" +
    "var lastX = 0;\n" +
    "var lastY = 0;\n\n" +
    "this.onTouchEvent = function(e) {\n" +
    "\tswitch (e.getAction()) {\n" +
    "\tcase MotionEvent.ACTION_DOWN:\n" +
    "\t\tthis.getParent().requestDisallowInterceptTouchEvent(true);\n" +
    "\t\tlastX = e.getRawX();\n" +
    "\t\tlastY = e.getRawY();\n" +
    "\t\tthis.setBackgroundColor(0xcc673ab7);\n" +
    "\tbreak;\n" +
    "\tcase MotionEvent.ACTION_MOVE:\n" +
    "\t\tvar dx = e.getRawX() - lastX;\n" +
    "\t\tvar dy = e.getRawY() - lastY;\n" +
    "\t\tthis.layout(this.getLeft() + dx, this.getTop() + dy);\n" +
    "\t\tlastX = e.getRawX();\n" +
    "\t\tlastY = e.getRawY();\n" +
    "\tbreak;\n" +
    "\tcase MotionEvent.ACTION_UP:\n" +
    "\tcase MotionEvent.ACTION_CANCEL:\n" +
    "\t\tthis.setBackgroundColor(0xff673ab7);\n" +
    "\tbreak;\n" +
    "\t}\n" +
    "}\n";
var touchAppendCode = "}";

var animPreCode = "" +
    "var target = new View();\n" +
    "target.setBackgroundColor(0xff673ab7);\n" +
    "var targetlp = new LayoutParams(100, 50);\n" +
    "targetlp.gravity = Gravity.CENTER;\n" +
    "this.addView(target, targetlp);\n\n" +
    "";

var animCode = "" +
    "var duration = 500;\n\n" +
    "" +
    "function translate() {\n" +
    "\tvar anim = new TranslateAnimation(0, 100, 0, 50);\n" +
    "\tanim.setDuration(duration);\n" +
    "\ttarget.startAnimation(anim);\n" +
    "}\n\n" +
    "" +
    "function alpha() {\n" +
    "\tvar anim = new AlphaAnimation(1, 0.5);\n" +
    "\tanim.setDuration(duration);\n" +
    "\ttarget.startAnimation(anim);\n" +
    "}\n\n" +
    "" +
    "function rotate() {\n" +
    "\tvar anim = new RotateAnimation(0, 90);\n" +
    "\tanim.setDuration(duration);\n" +
    "\ttarget.startAnimation(anim);\n" +
    "}\n\n" +
    "" +
    "function scale() {\n" +
    "\tvar anim = new ScaleAnimation(1, 2);\n" +
    "\tanim.setDuration(duration);\n" +
    "\ttarget.startAnimation(anim);\n" +
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
