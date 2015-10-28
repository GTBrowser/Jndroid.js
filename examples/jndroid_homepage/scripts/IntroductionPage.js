/**
 * Created by lency on 5/18/15.
 */
function IntroductionView() {
    ScrollView.apply(this, []);

    this.setBackgroundColor(R.color.card_bg);

    var mPadding = R.dimen.padding;
    var mParaPaddingTop = R.dimen.paragraph_padding_top;

    var mContentView = new LinearLayout();
    mContentView.setPadding(0, 0, 0, R.dimen.title_padding_top);
    this.addView(mContentView);

    loadMasterpiece();

    var mIntro = new TextView();
    mIntro.setTextSize(R.dimen.title);
    mIntro.setTextColor(R.color.theme);
    mIntro.setText(R.string.intro);
    var introLp = new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT);
    introLp.setMargins(mPadding, mParaPaddingTop, mPadding, 0);
    mContentView.addView(mIntro, introLp);

    var sloganLp = new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT);
    sloganLp.setMargins(mPadding, mPadding, mPadding, 0);

    loadSlogan(R.string.intro_content);

    loadGithubView();

    loadGitCafeView();

    loadPlaygrounds();

    function loadSlogan(text) {
        var slogan = new TextView();
        slogan.setTextSize(R.dimen.text);
        slogan.setTextColor(R.color.text);
        slogan.setText(text);
        mContentView.addView(slogan, sloganLp);
    }

    function loadMasterpiece() {
        var imageView = new ImageView();
        imageView.setImageUri("images/masterpiece.jpg");
        imageView.setScaleType(ScaleType.CENTER_CROP);
        imageView.setBoxShadow(0, 3, 3, 0, R.color.shadow);
        var imgLp = new LayoutParams(LayoutParams.FILL_PARENT, 144);
        mContentView.addView(imageView, imgLp);
    }

    function loadGitCafeView() {
        var gitcafe = new TextView();
        gitcafe.setTextSize(R.dimen.title);
        gitcafe.setTextColor(R.color.theme);
        gitcafe.setText("GitCafé");
        var gitcafeLp = new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT);
        gitcafeLp.setMargins(mPadding, mParaPaddingTop, mPadding, mPadding);
        mContentView.addView(gitcafe, gitcafeLp);

        var gitcafeLayoutlp = new LayoutParams(LayoutParams.FILL_PARENT, 48);
        var cafeLayout = new LinearLayout();
        cafeLayout.setOnClickListener(function() {
            window.open("https://gitcafe.com/GTBrowser/Jndroid.js");
        });
        cafeLayout.setOrientation(LinearLayout.HORIZONTAL);
        mContentView.addView(cafeLayout, gitcafeLayoutlp);

        var imgLp = new LayoutParams(64, 24);
        imgLp.gravity = Gravity.CENTER;
        imgLp.leftMargin = mPadding;
        var urlLp = new LayoutParams(0, LayoutParams.FILL_PARENT);
        urlLp.weight = 1;
        urlLp.leftMargin = mPadding;
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
        githubLp.setMargins(mPadding, mParaPaddingTop, mPadding, mPadding);
        mContentView.addView(github, githubLp);

        var githubLayoutlp = new LayoutParams(LayoutParams.FILL_PARENT, 48);
        var starLayout = new LinearLayout();
        starLayout.setOnClickListener(function() {
            window.open("https://github.com/GTBrowser/Jndroid.js");
        });
        starLayout.setOrientation(LinearLayout.HORIZONTAL);
        mContentView.addView(starLayout, githubLayoutlp);

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

        var githubLayoutlp = new LayoutParams(LayoutParams.FILL_PARENT, 48);
        var forkLayout = new LinearLayout();
        forkLayout.setOnClickListener(function() {
            window.open("https://github.com/GTBrowser/Jndroid.js/fork");
        });
        forkLayout.setOrientation(LinearLayout.HORIZONTAL);
        mContentView.addView(forkLayout, githubLayoutlp);

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
        getstartLp.setMargins(mPadding, mParaPaddingTop, mPadding, mPadding);
        mContentView.addView(getstart, getstartLp);

        var playground = new Playground("Hello World", mHelloWorldCode, true);
        playground.setEditHeight(400);
        var lp = new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT);
        lp.setMargins(16);
        mContentView.addView(playground, lp);

        var androidL = new TextView();
        androidL.setTextSize(R.dimen.title);
        androidL.setTextColor(R.color.theme);
        androidL.setText(R.string.material_design);
        var androidLLp = new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT);
        androidLLp.setMargins(mPadding, mParaPaddingTop, mPadding, mPadding);
        mContentView.addView(androidL, androidLLp);

        playground = new Playground("Widgets", mMaterialDesignCode);
        playground.setEditHeight(480);
        mContentView.addView(playground, lp);

        var apidemos = new TextView();
        apidemos.setTextSize(R.dimen.title);
        apidemos.setTextColor(R.color.theme);
        apidemos.setText("API Demos");
        var apidemosLp = new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT);
        apidemosLp.setMargins(mPadding, mParaPaddingTop, mPadding, mPadding);
        mContentView.addView(apidemos, apidemosLp);

        playground = new Playground("Widgets", mWidgetCode);
        playground.setEditHeight(450);
        mContentView.addView(playground, lp);

        playground = new Playground("onMeasure & onLayout", mMeausreCode);
        playground.setEditHeight(400);
        mContentView.addView(playground, lp);

        playground = new Playground("onDraw", mDrawCode);
        playground.setEditHeight(300);
        mContentView.addView(playground, lp);

        playground = new Playground("onTouchEvent", mTouchCode);
        playground.setEditHeight(480);
        mContentView.addView(playground, lp);

        playground = new Playground("Animation", mAnimationCode);
        playground.setAppendCode(mAnimatonAppendCode);
        playground.setEditHeight(500);
        mContentView.addView(playground, lp);
    }
}

var mHelloWorldCode = "<!DOCTYPE html>\n" +
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
    "\tvar mLayout = new FrameLayout();\n" +
    "\tmLayout.setBackgroundColor(0x1a000000);\n\n" +
    "\t/* no activity here, setContentView will show your view fullscreen */\n" +
    "\t/* 没有Activity，直接setContentView就可以得到一个全屏的视图 */\n" +
    "\tsetContentView(mLayout);\n\n" +
    "\tvar mTextView = new TextView();\n" +
    "\tmTextView.setText(\"helle world\");\n" +
    "\tmLayout.addView(mTextView);\n\n" +
    "</script>\n" +
    "</body>\n" +
    "</html>";

var mMaterialDesignCode = "" +
    "var mLayout = new LinearLayout();\n" +
    "this.addView(mLayout);\n\n" +
    "var lp = new LayoutParams(LayoutParams.FILL_PARENT, 48);\n" +
    "lp.gravity = Gravity.LEFT;\n" +
    "lp.setMargins(8);\n\n" +
    "var mButton = new MButton();\n" +
    "mButton.setBackgroundColor(0xff673ab7);\n" +
    "mButton.setTextColor(0xffffffff);\n" +
    "mButton.setText(\"button\");\n" +
    "mButton.setOnClickListener(function() {\n" +
    "\twindow.alert(\"Material Design\");\n" +
    "});\n" +
    "mLayout.addView(mButton, lp);\n\n" +
    "var group = new MRadioGroup();\n" +
    "for (var i = 0; i < 3; i++) {\n" +
    "\tvar radioButton = new MRadioButton();\n" +
    "\tradioButton.setId(i);\n" +
    "\tradioButton.setColor(0xff673ab7);\n" +
    "\tradioButton.setText(\"RadioButton \" + i);\n" +
    "\tgroup.addChild(radioButton);\n" +
    "}\n" +
    "mLayout.addView(group);\n\n" +
    "var mEditText = new MEditText();\n" +
    "mEditText.setHint(\"input text here\");\n" +
    "mEditText.setHighlightColor(0xff673ab7);\n" +
    "mLayout.addView(mEditText, lp);\n\n" +
    "var progress = new MProgressBar();\n" +
    "progress.setProgressColor(0xff673ab7);\n" +
    "progress.setStyle(MProgressBar.Small);\n" +
    "mLayout.addView(progress, lp);\n\n" +
    "var toggleButton = new MToggleButton();\n" +
    "toggleButton.setColor(0xff673ab7);" +
    "mLayout.addView(toggleButton, lp);\n" +
    "";


var mWidgetCode = "" +
    "var mLayout = new LinearLayout();\n" +
    "this.addView(mLayout);\n\n" +
    "var lp = new LayoutParams(LayoutParams.FILL_PARENT, 48);\n" +
    "lp.setMargins(8);\n\n" +
    "var mButton = new Button();\n" +
    "mButton.setText(\"button\");\n" +
    "mButton.setOnClickListener(function() {\n" +
    "\twindow.alert(\"button click\");\n" +
    "});\n" +
    "mLayout.addView(mButton, lp);\n\n" +
    "var mTextView = new TextView();\n" +
    "mTextView.setText(\"textview\");\n" +
    "mLayout.addView(mTextView, lp);\n\n" +
    "var mEditText = new EditText();\n" +
    "mEditText.setHintText(\"edittext\");\n" +
    "mLayout.addView(mEditText, lp);\n\n" +
    "var mImageView = new ImageView();\n" +
    "mImageView.setImageUri(\"images/ic_launcher.png\")\n" +
    "mImageView.setScaleType(ScaleType.FIT_CENTER);\n" +
    "var imgLp = new LayoutParams(LayoutParams.FILL_PARENT, 108);\n" +
    "mLayout.addView(mImageView, imgLp);";

var mMeausreCode = "" +
    "var mView = new MyView();\n" +
    "this.addView(mView);\n\n" +
    "function MyView() {\n" +
    "\tViewGroup.apply(this, []);\n" +
    "\tthis.setBackgroundColor(0x1a000000);\n\n" +
    "\tvar mChild = new View();\n" +
    "\tmChild.setBackgroundColor(0xff673ab7);\n" +
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
    "\t\tvar density = DisplayMetrics.density;\n" +
    "\t\tcanvas.beginPath();\n" +
    "\t\tcanvas.arc(100 * density, 100 * density, 50 * density, 0, Math.PI * 2, true);\n" +
    "\t\tcanvas.closePath();\n" +
    "\t\tcanvas.fillStyle = \"#673ab7\";\n" +
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
    "\tthis.setBackgroundColor(0xff673ab7);\n" +
    "\tthis.setClickable(true);\n\n" +
    "\tvar mLastX = 0;\n" +
    "\tvar mLastY = 0;\n" +
    "\tthis.onTouchEvent = function(e) {\n" +
    "\t\tswitch (e.getAction()) {\n" +
    "\t\t\tcase MotionEvent.ACTION_DOWN:\n" +
    "\t\t\t\tthis.getParent().requestDisallowInterceptTouchEvent(true);\n" +
    "\t\t\t\tmLastX = e.getRawX();\n" +
    "\t\t\t\tmLastY = e.getRawY();\n" +
    "\t\t\t\tthis.setBackgroundColor(0xcc673ab7);\n" +
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
    "\t\t\t\tthis.setBackgroundColor(0xff673ab7);\n" +
    "\t\t\tbreak;\n" +
    "\t\t}\n" +
    "\t}" +
    "}";

var mAnimationCode = "" +
    "var target = new View();\n" +
    "target.setBackgroundColor(0xff673ab7);\n" +
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
