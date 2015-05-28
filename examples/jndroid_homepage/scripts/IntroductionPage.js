/**
 * Created by lency on 5/18/15.
 */
function IntroductionView() {
    ScrollView.apply(this, []);

    this.setBackgroundColor(CARD_BG_COLOR);

    var contentView = new LinearLayout();
    this.addView(contentView);

    loadMasterpiece();

    var tips = new TextView();
    tips.setTextSize(TITLE_SIZE);
    tips.setTextColor(TEXT_COLOR);
    tips.setText("Tips: this site is still in developing.");
    tips.setTextColor(0xffdd3226);
    var tipLp = new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT);
    tipLp.setMargins(PADDING, TITLE_PADDING_TOP, PADDING, 0);
    contentView.addView(tips, tipLp);

    var intro = new TextView();
    intro.setTextSize(TITLE_SIZE);
    intro.setTextColor(THEME_COLOR);
    intro.setText("Introduction");
    var introLp = new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT);
    introLp.setMargins(PADDING, PARAGRAPH_PADDING_TOP, PADDING, 0);
    contentView.addView(intro, introLp);

    var sloganLp = new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT);
    sloganLp.setMargins(PADDING, PADDING, PADDING, 0);

    var slogan = new TextView();
    slogan.setTextSize(TEXT_SIZE);
    slogan.setTextColor(TEXT_COLOR);
    slogan.setText("Jndroid is a JavaScript framework to write WebApp in Android way.");
    contentView.addView(slogan, sloganLp);

    var slogan2 = new TextView();
    slogan2.setTextSize(TEXT_SIZE);
    slogan2.setTextColor(TEXT_COLOR);
    slogan2.setText("Jndroid est un framework JavaScript pour écrire de manière WebApp Android .");
    contentView.addView(slogan2, sloganLp);

    var sloganG = new TextView();
    sloganG.setTextSize(TEXT_SIZE);
    sloganG.setTextColor(TEXT_COLOR);
    sloganG.setText("Jndroid ist ein JavaScript-Framework an WebApp in Android Weg zu schreiben.");
    contentView.addView(sloganG, sloganLp);

    var sloganR = new TextView();
    sloganR.setTextSize(TEXT_SIZE);
    sloganR.setTextColor(TEXT_COLOR);
    sloganR.setText("Jndroid этооснова JavaScript , чтобы написать веб-приложение в Android образом ");
    contentView.addView(sloganR, sloganLp);

    var sloganJ = new TextView();
    sloganJ.setTextSize(TEXT_SIZE);
    sloganJ.setTextColor(TEXT_COLOR);
    sloganJ.setText("Jndroidは、Androidの方法でのWebAppを書くためのJavaScriptフレームワークです。");
    contentView.addView(sloganJ, sloganLp);

    var sloganC = new TextView();
    sloganC.setTextSize(TEXT_SIZE);
    sloganC.setTextColor(TEXT_COLOR);
    sloganC.setText("Jndroid是一個JavaScript框架，使用Android的方式編寫Web應用程序。");
    contentView.addView(sloganC, sloganLp);

    loadGithubView();

    var getstart = new TextView();
    getstart.setTextSize(TITLE_SIZE);
    getstart.setTextColor(THEME_COLOR);
    getstart.setText("Getting Started");
    var getstartLp = new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT);
    getstartLp.setMargins(PADDING, PARAGRAPH_PADDING_TOP, PADDING, PADDING);
    contentView.addView(getstart, getstartLp);

    var playground = new Playground("Hello World", mHelloWorldCode, true);
    playground.setEditHeight(280);
    var lp = new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT);
    lp.setMargins(16);
    contentView.addView(playground, lp);

    var apidemos = new TextView();
    apidemos.setTextSize(TITLE_SIZE);
    apidemos.setTextColor(THEME_COLOR);
    apidemos.setText("API Demos");
    var apidemosLp = new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT);
    apidemosLp.setMargins(PADDING, PARAGRAPH_PADDING_TOP, PADDING, PADDING);
    contentView.addView(apidemos, apidemosLp);

    playground = new Playground("Widgets", mWidgetCode);
    playground.setEditHeight(450);
    contentView.addView(playground, lp);

    playground = new Playground("onMeasure & onLayout", mMeausreCode);
    playground.setEditHeight(400);
    contentView.addView(playground, lp);

    playground = new Playground("onDraw", mDrawCode);
    playground.setEditHeight(300);
    contentView.addView(playground, lp);

    playground = new Playground("onTouchEvent", mTouchCode);
    playground.setEditHeight(480);
    contentView.addView(playground, lp);

    playground = new Playground("Animation", mAnimationCode);
    playground.setAppendCode(mAnimatonAppendCode);
    playground.setEditHeight(500);
    contentView.addView(playground, lp);

    function loadMasterpiece() {
        var imageView = new ImageView();
        imageView.setImageUri("images/masterpiece.jpg");
        imageView.setScaleType(ScaleType.CENTER_CROP);
        imageView.setBoxShadow(0, 0, 3, 3, 0x33000000);
        var imgLp = new LayoutParams(LayoutParams.FILL_PARENT, 128);
        contentView.addView(imageView, imgLp);
    }

    function loadGithubView() {
        var github = new TextView();
        github.setTextSize(TITLE_SIZE);
        github.setTextColor(THEME_COLOR);
        github.setText("Github");
        var githubLp = new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT);
        githubLp.setMargins(PADDING, PARAGRAPH_PADDING_TOP, PADDING, PADDING);
        contentView.addView(github, githubLp);

        var githubLayoutlp = new LayoutParams(LayoutParams.FILL_PARENT, 48);
        var starLayout = new LinearLayout();
        starLayout.setOnClickListener(function() {
            window.open("https://github.com/GTBrowser/Jndroid.js");
        });
        starLayout.setOrientation(LinearLayout.HORIZONTAL);
        contentView.addView(starLayout, githubLayoutlp);

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
        starLink.setTextSize(SUB_TEXT_SIZE);
        starLink.setTextColor(SUB_TEXT_COLOR);
        starLayout.addView(starLink, urlLp);

        var githubLayoutlp = new LayoutParams(LayoutParams.FILL_PARENT, 48);
        var forkLayout = new LinearLayout();
        forkLayout.setOnClickListener(function() {
            window.open("https://github.com/GTBrowser/Jndroid.js/fork");
        });
        forkLayout.setOrientation(LinearLayout.HORIZONTAL);
        contentView.addView(forkLayout, githubLayoutlp);

        var forkImg = new ImageView();
        forkImg.setImgSrc("https://img.shields.io/github/forks/GTBrowser/Jndroid.js.svg");
        forkImg.setImgHeight(24);
        forkLayout.addView(forkImg, imgLp);
        var forkLink = new TextView();
        forkLink.setGravity(Gravity.LEFT | Gravity.CENTER_VERTICAL);
        forkLink.setText("https://github.com/GTBrowser/Jndroid.js/fork");
        forkLink.setTextSize(SUB_TEXT_SIZE);
        forkLink.setTextColor(SUB_TEXT_COLOR);
        forkLayout.addView(forkLink, urlLp);

    }
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
    "var lp = new LayoutParams(LayoutParams.FILL_PARENT, 48);\n" +
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

var mAnimationCode = "" +
    "var target = new View();\n" +
    "target.setBackgroundColor(0xff009688);\n" +
    "var targetlp = new LayoutParams(100, 50);\n" +
    "targetlp.gravity = Gravity.CENTER;\n" +
    "this.addView(target, targetlp);\n\n" +
    "" +
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

var mAnimatonAppendCode = "" +
    "var controlBar = new LinearLayout();\n" +
    "controlBar.setOrientation(LinearLayout.Horizontal);\n" +
    "var barlp = new LayoutParams(LayoutParams.FILL_PARENT, 56);\n" +
    "this.addView(controlBar, barlp);\n" +
    "var btnlp = new LayoutParams(0, 48);\n" +
    "btnlp.setMargins(4);\n" +
    "btnlp.weight = 1;\n" +
    "var translateBtn = new Button();\n" +
    "translateBtn.setText(\"translate\");\n" +
    "translateBtn.setOnClickListener(function() {translate();});" +
    "controlBar.addView(translateBtn, btnlp);\n" +
    "var alphaBtn = new Button();\n" +
    "alphaBtn.setText(\"alpha\");\n" +
    "alphaBtn.setOnClickListener(function() {alpha();});" +
    "controlBar.addView(alphaBtn, btnlp);\n" +
    "var rotateBtn = new Button();\n" +
    "rotateBtn.setOnClickListener(function() {rotate();});" +
    "rotateBtn.setText(\"rotate\");\n" +
    "controlBar.addView(rotateBtn, btnlp);\n" +
    "var scaleBtn = new Button();" +
    "scaleBtn.setText(\"scale\");\n" +
    "scaleBtn.setOnClickListener(function() {scale();});" +
    "controlBar.addView(scaleBtn, btnlp);" +
    "";
