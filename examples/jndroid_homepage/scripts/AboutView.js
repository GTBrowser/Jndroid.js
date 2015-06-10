/**
 * Created by lency on 5/26/15.
 */
function AboutView() {
    ScrollView.apply(this, []);

    this.setBackgroundColor(R.color.card_bg);

    var contentView = new LinearLayout();
    contentView.setPadding(0, 0, 0, R.dimen.content_padding_bottom);
    this.addView(contentView);

    var titlelp = new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT);
    titlelp.topMargin = R.dimen.paragraph_padding_top;
    titlelp.leftMargin = R.dimen.padding;
    titlelp.bottomMargin = R.dimen.padding;

    var lp = new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT);
    lp.setMargins(8);

    var logoTitle = new TextView();
    logoTitle.setText("About");
    logoTitle.setTextColor(R.color.theme);
    logoTitle.setTextSize(R.dimen.title);
    contentView.addView(logoTitle, titlelp);

    var logoView = new LogoView();
    contentView.addView(logoView, lp);

    var commentTitle = new TextView();
    commentTitle.setText("Comments");
    commentTitle.setTextColor(R.color.theme);
    commentTitle.setTextSize(R.dimen.title);

    contentView.addView(commentTitle, titlelp);

    var commentView = new CommentView();
    contentView.addView(commentView, lp);

    var question = new TextView();
    question.setText("Q&A");
    question.setTextColor(R.color.theme);
    question.setTextSize(R.dimen.title);
    contentView.addView(question, titlelp);

    var questionView = new QuestionView();
    contentView.addView(questionView, lp);

    //var contributorTitle = new TextView();
    //contributorTitle.setText("Contributors");
    //contributorTitle.setTextColor(R.color.theme);
    //contributorTitle.setTextSize(R.dimen.title);
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
    this.setPadding(R.dimen.padding, R.dimen.padding, R.dimen.padding, 0);

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
    mTitle.setTextSize(R.dimen.title);
    mTitle.setTextColor(R.color.text);
    this.addView(mTitle);

    var mVersion = new TextView();
    mVersion.setText("Version: " + Manifest.versionName);
    mVersion.setTextSize(R.dimen.sub_text);
    mVersion.setTextColor(R.color.sub_text);
    this.addView(mVersion);

    var mCopyRight = new TextView();
    mCopyRight.setText("Copyright©2015 Jndroid. All Rights Reserved.");
    mCopyRight.setTextSize(R.dimen.sub_text);
    mCopyRight.setTextColor(R.color.sub_text);
    this.addView(mCopyRight);

    var mMileStoneView;

    try {
        loadLog();
    } catch(e) {

    }

    this.onMeasure = function(widthMS, heightMS) {
        var padding = R.dimen.padding;
        var width = MeasureSpec.getSize(widthMS);
        var height = LOGO_AREA + padding * 2;

        mLogoArea.measure(LOGO_AREA, LOGO_AREA);
        mLogoImg.measure(LOGO_SIZE, LOGO_SIZE);
        mLogoName.measure(LOGO_SIZE, LOGO_AREA - LOGO_SIZE);

        var contentWidth = width - padding * 3 - LOGO_AREA;
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
        var padding = R.dimen.padding;
        var offsetX = padding;
        var offsetY = padding;
        mLogoArea.layout(offsetX, offsetY);

        offsetX = padding + (LOGO_AREA - LOGO_SIZE) / 2;
        offsetY = 8;
        mLogoImg.layout(offsetX, offsetY);

        offsetY += mLogoImg.getMeasuredHeight() - 8;
        mLogoName.layout(offsetX, offsetY);

        offsetX = padding * 2 + LOGO_AREA;
        offsetY = 24;
        mTitle.layout(offsetX, offsetY);

        offsetY += mTitle.getMeasuredHeight() + 8;
        mVersion.layout(offsetX, offsetY);

        offsetY += mVersion.getMeasuredHeight() + 8;
        mCopyRight.layout(offsetX, offsetY);

        if (mMileStoneView) {
            offsetX = 0;
            offsetY = padding + LOGO_AREA + padding;
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
            mChangeLogTitle.setTextSize(R.dimen.text);
            mChangeLogTitle.setTextColor(R.color.sub_text);
            mChangeLogTitle.setBorderTop(1, R.color.dividers);
            mChangeLogTitle.setGravity(Gravity.LEFT | Gravity.CENTER_VERTICAL);
            var titleLp = new LayoutParams(LayoutParams.FILL_PARENT, 48);
            titleLp.leftMargin = R.dimen.padding;
            titleLp.rightMargin = R.dimen.padding;
            titleLp.bottomMargin = -R.dimen.half_padding;
            mSelf.addView(mChangeLogTitle, titleLp);

            var issueLp = new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT);
            issueLp.leftMargin = R.dimen.padding;

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
            mButton.setPadding(R.dimen.half_padding);
            mButton.setDimBg(false);
            mButton.setTextSize(R.dimen.text);
            mButton.setTextColor(R.color.secondary_text);
            mButton.setOnClickListener(function() {
                mIsExpand = !mIsExpand;
                mSelf.removeAllViews();
                loadViews();
                mSelf.getParent().getParent().requestLayout();
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
        mLine.setBackgroundColor(R.color.theme);
        this.addView(mLine);

        var mVersion = new TextView();
        mVersion.setText("Version: " +milestone.title);
        mVersion.setTextSize(R.dimen.sub_text);
        mVersion.setTextColor(R.color.text);
        mVersion.setGravity(Gravity.LEFT | Gravity.CENTER_VERTICAL);
        this.addView(mVersion);

        var mIssueViews = [];

        var issues = milestone.issues;
        for (var i = 0; i < issues.length; i++) {
            var issue = new TextView();
            issue.setTextSize(R.dimen.sub_text);
            issue.setTextColor(R.color.sub_text);
            issue.setGravity(Gravity.LEFT | Gravity.CENTER_VERTICAL);
            issue.setText(issues[i].title.trim());
            mIssueViews.add(issue);
            this.addView(issue);
        }

        var time = issues[0].created_at;
        time = time.substring(0, time.indexOf("T"));
        var mTimeView = new TextView();
        mTimeView.setTextSize(R.dimen.sub_text);
        mTimeView.setTextColor(R.color.sub_text);
        mTimeView.setGravity(Gravity.LEFT | Gravity.CENTER_VERTICAL);
        mTimeView.setText(time);
        this.addView(mTimeView);

        this.onMeasure = function(widthMS, heightMS) {
            var width = MeasureSpec.getSize(widthMS);
            var height = 0;

            mVersion.measure(LOGO_AREA, MeasureSpec.makeMeasureSpec(32, MeasureSpec.EXACTLY));
            mTimeView.measure(LOGO_AREA, MeasureSpec.makeMeasureSpec(32, MeasureSpec.EXACTLY));

            var contentWidth = width - LOGO_AREA - R.dimen.padding;
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

            offsetX = mLine.getMeasuredWidth() + R.dimen.padding;
            offsetY = 0;
            mVersion.layout(offsetX, offsetY);

            offsetY += mVersion.getMeasuredHeight();
            mTimeView.layout(offsetX, offsetY);

            offsetX = LOGO_AREA + R.dimen.padding;
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
    this.setCornerSize(R.dimen.corner);
    this.setBoxShadow(0, 1, 2, 0, R.color.shadow);
    this.setPadding(R.dimen.padding, R.dimen.padding, R.dimen.padding, 0);


    var comment1 = new Comment('images/kkmoving.jpg', 'kkmoving，资深架构师', '这可能是东半球最好用的WebApp框架了。');
    comment1.setBorderBottom(1, R.color.dividers);
    this.addView(comment1);

    comment1 = new Comment('images/zhuyunbin.jpg', '朱云斌，安卓程序员', '作为一个Android开发者，Jndroid是一件令人兴奋的礼物。');
    comment1.setBorderBottom(1, R.color.dividers);
    this.addView(comment1);

    comment1 = new Comment('images/yanglingfeng.png', 'Hulk Yang，一个见钱眼开的手艺人', 'Jndroid > (AngularJS | Backbone.js | Ember.js)');
    comment1.setBorderBottom(1, R.color.dividers);
    this.addView(comment1);

    comment1 = new Comment('images/liuchenchen.png', 'UG84，资深设计师，手机应用设计领路人', '虽然我不知道这是什么，但是我觉得还是挺好看的。');
    comment1.setBorderBottom(1, R.color.dividers);
    this.addView(comment1);

    comment1 = new Comment('images/zhangyang.png', '张阳', '本以为平行的世界有了交集，除了打破常规，强大的功能，快速的使用和轻松的体验，才是让人激动的。绝对是轻应用的一大步。');
    this.addView(comment1);
}

function QuestionView() {
    LinearLayout.apply(this, []);

    this.setBackgroundColor(0xffffffff);
    this.setCornerSize(R.dimen.corner);
    this.setBoxShadow(0, 1, 2, 0, R.color.shadow);
    this.setPadding(R.dimen.padding);

    var question = new TextView();
    question.setText("To ask question, please send email to guyiyang@outlook.com");
    question.setTextSize(R.dimen.text);
    question.setTextColor(R.color.text);
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
        name.setTextSize(R.dimen.text);
        name.setTextColor(R.color.text);
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