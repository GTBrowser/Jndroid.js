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

    var mSelf = this;

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
    mVersion.setText("Version: " + Manifest.versionName);
    mVersion.setTextSize(SUB_TEXT_SIZE);
    mVersion.setTextColor(SUB_TEXT_COLOR);
    this.addView(mVersion);

    var mCopyRight = new TextView();
    mCopyRight.setText("Copyright©2015 Jndroid. All Rights Reserved.");
    mCopyRight.setTextSize(SUB_TEXT_SIZE);
    mCopyRight.setTextColor(SUB_TEXT_COLOR);
    this.addView(mCopyRight);

    var mMileStoneView;

    try {
        loadLog();
    } catch(e) {

    }

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

        if (mMileStoneView) {
            mMileStoneView.measure(width, 0);
            height += mMileStoneView.getMeasuredHeight();
        }

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

        if (mMileStoneView) {
            offsetX = 0;
            offsetY = PADDING + LOGO_AREA + PADDING;
            mMileStoneView.layout(offsetX, offsetY);
        }
    };

    function loadLog() {
        liteAjax("http://pd.mb.lenovomm.com/api/jndroid/milestone", function(data) {
            try {
                var milestones = JSON.parse(data);
                mMileStoneView = new MileStoneView(milestones);
                mSelf.addView(mMileStoneView);
                mSelf.requestLayout();
                mSelf.getParent().requestLayout();
            } catch(e) {

            }
        })
    }

    function MileStoneView(milestones) {
        LinearLayout.apply(this, []);

        var mSelf = this;
        var mIsExpand = false;

        loadViews();

        function loadViews() {
            var mChangeLogTitle = new TextView();
            mChangeLogTitle.setText("Change Logs");
            mChangeLogTitle.setTextSize(TEXT_SIZE);
            mChangeLogTitle.setTextColor(SUB_TEXT_COLOR);
            mChangeLogTitle.setBorderTop(1, DIVIDERS_COLOR);
            mChangeLogTitle.setGravity(Gravity.LEFT | Gravity.CENTER_VERTICAL);
            var titleLp = new LayoutParams(LayoutParams.FILL_PARENT, 48);
            titleLp.leftMargin = PADDING;
            titleLp.rightMargin = PADDING;
            titleLp.bottomMargin = -8;
            mSelf.addView(mChangeLogTitle, titleLp);

            var issueLp = new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT);
            issueLp.leftMargin = PADDING;

            var length = 1;
            if (mIsExpand) {
                length = milestones.length;
            }
            for (var i = 0; i < length; i++) {
                if (milestones[i].issues && milestones[i].issues.length > 0) {
                    var item = new MileStoneItem(milestones[i]);
                    mSelf.addView(item, issueLp);
                }
            }
            var mButton = new LButton();
            if (mIsExpand) {
                mButton.setText("show less");
            } else {
                mButton.setText("show more");
            }
            mButton.setGravity(Gravity.LEFT | Gravity.CENTER_VERTICAL);
            mButton.setPadding(8);
            mButton.setDimBg(false);
            mButton.setTextSize(TEXT_SIZE);
            mButton.setTextColor(0xff454545);
            mButton.setOnClickListener(function() {
                mIsExpand = !mIsExpand;
                mSelf.removeAllViews();
                loadViews();
                mSelf.getParent().requestLayout();
            });
            mButton.setBorder(0);
            mButton.setBoxShadow(0, 0, 0, 0, 0);

            var buttonLp = new LayoutParams(88, 36);
            buttonLp.setMargins(8);
            mSelf.addView(mButton, buttonLp);
        }

    }

    function MileStoneItem(milestone) {
        ViewGroup.apply(this, []);

        var mLine = new View();
        mLine.setBackgroundColor(THEME_COLOR);
        this.addView(mLine);

        var mVersion = new TextView();
        mVersion.setText("Version: " +milestone.title);
        mVersion.setTextSize(SUB_TEXT_SIZE);
        mVersion.setTextColor(TEXT_COLOR);
        mVersion.setGravity(Gravity.LEFT | Gravity.CENTER_VERTICAL);
        this.addView(mVersion);

        var mIssueViews = [];

        var issues = milestone.issues;
        for (var i = 0; i < issues.length; i++) {
            var issue = new TextView();
            issue.setTextSize(SUB_TEXT_SIZE);
            issue.setTextColor(SUB_TEXT_COLOR);
            issue.setGravity(Gravity.LEFT | Gravity.CENTER_VERTICAL);
            issue.setText(issues[i].title.trim());
            mIssueViews.add(issue);
            this.addView(issue);
        }

        var time = issues[0].created_at;
        time = time.substring(0, time.indexOf("T"));
        var mTimeView = new TextView();
        mTimeView.setTextSize(SUB_TEXT_SIZE);
        mTimeView.setTextColor(SUB_TEXT_COLOR);
        mTimeView.setGravity(Gravity.LEFT | Gravity.CENTER_VERTICAL);
        mTimeView.setText(time);
        this.addView(mTimeView);

        this.onMeasure = function(widthMS, heightMS) {
            var width = MeasureSpec.getSize(widthMS);
            var height = 0;

            mVersion.measure(LOGO_AREA, MeasureSpec.makeMeasureSpec(32, MeasureSpec.EXACTLY));
            mTimeView.measure(LOGO_AREA, MeasureSpec.makeMeasureSpec(32, MeasureSpec.EXACTLY));

            var contentWidth = width - LOGO_AREA - PADDING;
            for (var i = 0; i < mIssueViews.length; i++) {
                mIssueViews[i].measure(contentWidth, MeasureSpec.makeMeasureSpec(32, MeasureSpec.EXACTLY));
                height += mIssueViews[i].getMeasuredHeight();
            }
            height = Math.max(64, height);

            mLine.measure(4, height - 16);

            this.setMeasuredDimension(width, height);
        };

        this.onLayout = function(x, y) {
            var offsetX, offsetY;

            offsetX = 0;
            offsetY = 8;
            mLine.layout(offsetX, offsetY);

            offsetX = mLine.getMeasuredWidth() + PADDING;
            offsetY = 0;
            mVersion.layout(offsetX, offsetY);

            offsetY += mVersion.getMeasuredHeight();
            mTimeView.layout(offsetX, offsetY);

            offsetX = LOGO_AREA + PADDING;
            offsetY = 0;
            for (var i = 0; i < mIssueViews.length; i++) {
                mIssueViews[i].layout(offsetX, offsetY);
                offsetY += mIssueViews[i].getMeasuredHeight();
            }
        }
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