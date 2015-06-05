/**
 * Created by lency on 5/26/15.
 */
function AboutView() {
    ScrollView.apply(this, []);

    this.setBackgroundColor(CARD_BG_COLOR);

    var contentView = new LinearLayout();
    contentView.setPadding(0, 0, 0, PARAGRAPH_PADDING_TOP);
    this.addView(contentView);

    var titlelp = new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT);
    titlelp.topMargin = PARAGRAPH_PADDING_TOP;
    titlelp.leftMargin = PADDING;
    titlelp.bottomMargin = PADDING;

    var lp = new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT);
    lp.setMargins(8);

    var logoTitle = new TextView();
    logoTitle.setText("About");
    logoTitle.setTextColor(THEME_COLOR);
    logoTitle.setTextSize(TITLE_SIZE);
    contentView.addView(logoTitle, titlelp);

    var logoView = new LogoView();
    contentView.addView(logoView, lp);

    var commentTitle = new TextView();
    commentTitle.setText("Comments");
    commentTitle.setTextColor(THEME_COLOR);
    commentTitle.setTextSize(TITLE_SIZE);


    contentView.addView(commentTitle, titlelp);

    var commentView = new CommentView();
    contentView.addView(commentView, lp);

    var question = new TextView();
    question.setText("Q&A");
    question.setTextColor(THEME_COLOR);
    question.setTextSize(TITLE_SIZE);
    contentView.addView(question, titlelp);

    var questionView = new QuestionView();
    contentView.addView(questionView, lp);

    //var contributorTitle = new TextView();
    //contributorTitle.setText("Contributors");
    //contributorTitle.setTextColor(THEME_COLOR);
    //contributorTitle.setTextSize(TITLE_SIZE);
    //contentView.addView(contributorTitle, titlelp);
    //
    //var contributorView = new ContributorView();
    //var contributorLp = new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT);
    //contributorLp.setMargins(PADDING);
    //contentView.addView(contributorView, contributorLp);
}

function LogoView() {
    ViewGroup.apply(this, []);

    var LOGO_AREA = 152;
    var LOGO_SIZE = 128;
    var SUBHEADER_HEIGHT = 48;

    this.setBackgroundColor(0xffffffff);
    this.setCornerSize(2, 2, 2, 2);
    this.setBoxShadow(0, 1, 2, 0, 0x66000000);
    this.setPadding(PADDING, PADDING, PADDING, 0);

    var mLogoArea = new View();
    mLogoArea.setCornerSize(2);
    mLogoArea.setBackgroundColor(0x04000000);
    this.addView(mLogoArea);

    var mLogoImg = new ImageView();
    mLogoImg.setScaleType(ScaleType.CENTER_INSIDE);
    mLogoImg.setImageUri("images/logo.png");
    this.addView(mLogoImg);

    var mLogoName = new ImageView();
    mLogoName.setScaleType(ScaleType.CENTER_INSIDE);
    mLogoName.setImageUri("images/logoname.png");
    this.addView(mLogoName);

    var mTitle = new TextView();
    mTitle.setText("Jndroid Homepage");
    mTitle.setTextSize(TITLE_SIZE);
    mTitle.setTextColor(TEXT_COLOR);
    this.addView(mTitle);

    var mVersion = new TextView();
    mVersion.setText("Version:" + VERSION);
    mVersion.setTextSize(SUB_TEXT_SIZE);
    mVersion.setTextColor(SUB_TEXT_COLOR);
    this.addView(mVersion);

    var mCopyRight = new TextView();
    mCopyRight.setText("Copyright©2015 Jndroid. All Rights Reserved.");
    mCopyRight.setTextSize(SUB_TEXT_SIZE);
    mCopyRight.setTextColor(SUB_TEXT_COLOR);
    this.addView(mCopyRight);

    var mChangeLogTitle = new TextView();
    mChangeLogTitle.setText("Change Logs");
    mChangeLogTitle.setTextSize(TEXT_SIZE);
    mChangeLogTitle.setTextColor(SUB_TEXT_COLOR);
    mChangeLogTitle.setBorderTop(1, DIVIDERS_COLOR);
    mChangeLogTitle.setGravity(Gravity.LEFT | Gravity.CENTER_VERTICAL);
    //this.addView(mChangeLogTitle);

    this.onMeasure = function(widthMS, heightMS) {
        var width = MeasureSpec.getSize(widthMS);
        var height = LOGO_AREA + PADDING * 2;

        mLogoArea.measure(LOGO_AREA, LOGO_AREA);
        mLogoImg.measure(LOGO_SIZE, LOGO_SIZE);
        mLogoName.measure(LOGO_SIZE, LOGO_AREA - LOGO_SIZE);

        var contentWidth = width - PADDING * 3 - LOGO_AREA;
        mTitle.measure(contentWidth, 0);
        mVersion.measure(contentWidth, 0);
        mCopyRight.measure(contentWidth, 0);

        mChangeLogTitle.measure(width - PADDING * 2, MeasureSpec.makeMeasureSpec(SUBHEADER_HEIGHT, MeasureSpec.EXACTLY));

        this.setMeasuredDimension(width, height);
    };

    this.onLayout = function(x, y) {
        var offsetX = PADDING;
        var offsetY = PADDING;
        mLogoArea.layout(offsetX, offsetY);

        offsetX = PADDING + (LOGO_AREA - LOGO_SIZE) / 2;
        offsetY = 8;
        mLogoImg.layout(offsetX, offsetY);

        offsetY += mLogoImg.getMeasuredHeight() - 8;
        mLogoName.layout(offsetX, offsetY);

        offsetX = PADDING * 2 + LOGO_AREA;
        offsetY = 24;
        mTitle.layout(offsetX, offsetY);

        offsetY += mTitle.getMeasuredHeight() + 8;
        mVersion.layout(offsetX, offsetY);

        offsetY += mVersion.getMeasuredHeight() + 8;
        mCopyRight.layout(offsetX, offsetY);

        offsetX = PADDING;
        offsetY = PADDING + LOGO_AREA + PADDING;
        mChangeLogTitle.layout(offsetX, offsetY);
    }
}

function CommentView() {
    LinearLayout.apply(this, []);

    this.setBackgroundColor(0xffffffff);
    this.setCornerSize(2, 2, 2, 2);
    this.setBoxShadow(0, 1, 2, 0, 0x66000000);
    this.setPadding(PADDING, PADDING, PADDING, 0);


    var comment1 = new Comment('images/kkmoving.jpg', 'kkmoving，资深架构师', '这可能是东半球最好用的WebApp框架了。');
    comment1.setBorderBottom(1, DIVIDERS_COLOR);
    this.addView(comment1);

    comment1 = new Comment('images/zhuyunbin.jpg', '朱云斌，安卓程序员', '作为一个Android开发者，Jndroid是一件令人兴奋的礼物。');
    comment1.setBorderBottom(1, DIVIDERS_COLOR);
    this.addView(comment1);

    comment1 = new Comment('images/yanglingfeng.png', 'Hulk Yang，一个见钱眼开的手艺人', 'Jndroid > (AngularJS | Backbone.js | Ember.js)');
    comment1.setBorderBottom(1, DIVIDERS_COLOR);
    this.addView(comment1);

    comment1 = new Comment('images/liuchenchen.png', 'UG84，资深设计师，手机应用设计领路人', '虽然我不知道这是什么，但是我觉得还是挺好看的。');
    comment1.setBorderBottom(1, DIVIDERS_COLOR);
    this.addView(comment1);

    comment1 = new Comment('images/zhangyang.png', '张阳', '本以为平行的世界有了交集，除了打破常规，强大的功能，快速的使用和轻松的体验，才是让人激动的。绝对是轻应用的一大步。');
    this.addView(comment1);
}

function QuestionView() {
    LinearLayout.apply(this, []);

    this.setBackgroundColor(0xffffffff);
    this.setCornerSize(2, 2, 2, 2);
    this.setBoxShadow(0, 1, 2, 0, 0x66000000);
    this.setPadding(PADDING);

    var question = new TextView();
    question.setText("To ask question, please send email to guyiyang@outlook.com");
    question.setTextSize(TEXT_SIZE);
    question.setTextColor(TEXT_COLOR);
    this.addView(question);
}

function ContributorView() {
    LinearLayout.apply(this, []);

    var ITEM_WIDTH = 100;
    var ITEM_HEIGHT = 32;

    var mColNum;

    for (var i = 0; i < mContributors.length; i++) {
        var name = new TextView();
        name.setText(mContributors[i]);
        name.setTextSize(TEXT_SIZE);
        name.setTextColor(TEXT_COLOR);
        this.addView(name);
    }

    this.onMeasure = function(widthMS, heightMS) {
        var width = MeasureSpec.getSize(widthMS);
        var height = 100;

        mColNum = Math.floor(width / ITEM_WIDTH);
        var itemWidth = width / mColNum;
        for (var i = 0; i < this.getChildCount(); i++) {
            var child = this.getChildAt(i);
            child.measure(MeasureSpec.makeMeasureSpec(itemWidth, MeasureSpec.EXACTLY),
                MeasureSpec.makeMeasureSpec(ITEM_HEIGHT, MeasureSpec.EXACTLY));
        }

        this.setMeasuredDimension(width, height);
    };

    this.onLayout = function(x, y) {
        for (var i = 0; i < this.getChildCount(); i++) {
            var child = this.getChildAt(i);
            var col = i % mColNum;
            var row = (i - col) / mColNum;
            child.layout(col * child.getMeasuredWidth(), row * ITEM_HEIGHT);
        }
    }
}

var mContributors = ["顾抑扬", "王佳思", "杨凌枫", "李文彬", "甘露", "杨继忠", "姜宇航",
    "吴鹏", "刘晨琛", "朱云斌", "刘煜", "马静"];