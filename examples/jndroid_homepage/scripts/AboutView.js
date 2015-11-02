function AboutView() {
    ScrollView.apply(this);

    var scrollCnt = new ViewGroup();
    scrollCnt.setBackgroundColor(R.color.card_bg);
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
    cnt.setPadding(0, 0, 0, R.dimen.content_padding_bottom);
    scrollCnt.addView(cnt);

    var lp = new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT);
    lp.setMargins(R.dimen.padding);

    var logoTitle = Theme.createThemeTitle(R.string.about);
    cnt.addView(logoTitle);

    var logoView = new LogoView();
    cnt.addView(logoView, lp);

    var commentTitle = Theme.createThemeTitle(R.string.comments);
    cnt.addView(commentTitle);

    var commentView = new CommentView();
    cnt.addView(commentView, lp);

    var question = Theme.createThemeTitle(R.string.qa);
    cnt.addView(question);

    var questionView = new QuestionView();
    cnt.addView(questionView, lp);
}

function LogoView() {
    ViewGroup.apply(this);

    var logoAreaW = 152;
    var logoSize = 128;
    var padding = R.dimen.padding;

    this.setBackgroundColor(0xffffffff);
    this.setCornerSize(2, 2, 2, 2);
    this.setBoxShadow(0, 1, 2, 0, 0x66000000);
    this.setPadding(padding, padding, padding, 0);

    var logoArea = new View();
    logoArea.setCornerSize(2);
    logoArea.setBackgroundColor(0x04000000);
    this.addView(logoArea);

    var logoImg = new ImageView();
    logoImg.setScaleType(ScaleType.CENTER_INSIDE);
    logoImg.setImageUri("images/logo.png");
    this.addView(logoImg);

    var logoName = new ImageView();
    logoName.setScaleType(ScaleType.CENTER_INSIDE);
    logoName.setImageUri("images/logoname.png");
    this.addView(logoName);

    var title = Theme.createTitle(R.string.jndroid_home);
    this.addView(title);

    var version = Theme.createSubText(R.string.version + ": " + Manifest.versionName);
    this.addView(version);

    var copyRight = Theme.createSubText("Copyright©2015 Jndroid. All Rights Reserved.");
    this.addView(copyRight);

    var mMileStoneView = new MileStoneView(Manifest.changeLogs);
    this.addView(mMileStoneView);

    this.onMeasure = function(wMS) {
        var w = MeasureSpec.getSize(wMS);
        var h = logoAreaW + padding * 2;

        logoArea.measure(logoAreaW, logoAreaW);
        logoImg.measure(logoSize, logoSize);
        logoName.measure(logoSize, logoAreaW - logoSize);

        var cntW = w - padding * 3 - logoAreaW;
        title.measure(MS.makeMS(cntW, MS.EXACTLY), 0);
        version.measure(MS.makeMS(cntW, MS.EXACTLY), 0);
        copyRight.measure(MS.makeMS(cntW, MS.EXACTLY), 0);

        if (mMileStoneView) {
            mMileStoneView.measure(w, 0);
            h += mMileStoneView.getMeasuredHeight();
        }

        this.setMeasuredDimension(w, h);
    };

    this.onLayout = function() {
        var x = padding;
        var y = padding;
        logoArea.layout(x, y);

        x = padding + (logoAreaW - logoSize) / 2;
        y = 8;
        logoImg.layout(x, y);

        y += logoImg.getMeasuredHeight() - 8;
        logoName.layout(x, y);

        x = padding * 2 + logoAreaW;
        y = 24;
        title.layout(x, y);

        y += title.getMeasuredHeight() + 8;
        version.layout(x, y);

        y += version.getMeasuredHeight() + 8;
        copyRight.layout(x, y);

        if (mMileStoneView) {
            x = 0;
            y = padding + logoAreaW + padding;
            mMileStoneView.layout(x, y);
        }
    };

    function MileStoneView(milestones) {
        LinearLayout.apply(this);

        var self = this;
        var isExpand = false;
        var padding = R.dimen.padding;

        loadViews();

        function loadViews() {
            var title = Theme.createText(R.string.change_log);
            title.setBorderTop(1, R.color.dividers);
            var titleLp = new LayoutParams(LayoutParams.FILL_PARENT, 48);
            titleLp.leftMargin = padding;
            titleLp.rightMargin = padding;
            titleLp.bottomMargin = -padding / 2;
            self.addView(title, titleLp);

            var issueLp = new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT);
            issueLp.leftMargin = padding;
            issueLp.rightMargin = padding;

            var length = 1;
            if (isExpand) {
                length = milestones.length;
            }
            for (var i = 0; i < length; i++) {
                if (milestones[i].issues && milestones[i].issues.length > 0) {
                    var item = new MileStoneItem(milestones[i]);
                    self.addView(item, issueLp);
                }
            }
            var btn = new MButton();
            if (isExpand) {
                btn.setText(R.string.show_less);
            } else {
                btn.setText(R.string.show_more);
            }
            btn.setGravity(Gravity.LEFT | Gravity.CENTER_VERTICAL);
            btn.setPadding(R.dimen.half_padding);
            btn.setDimBg(false);
            btn.setTextSize(R.dimen.text);
            btn.setTextColor(R.color.secondary_text);
            btn.setOnClickListener(function() {
                isExpand = !isExpand;
                self.removeAllViews();
                loadViews();
                self.getParent().getParent().requestLayout();
            });
            btn.setBorder(0);
            btn.setBoxShadow(0, 0, 0, 0, 0);

            var buttonLp = new LayoutParams(100, 36);
            buttonLp.setMargins(8);
            self.addView(btn, buttonLp);
        }

    }

    function MileStoneItem(milestone) {
        ViewGroup.apply(this);

        this.setBorderBottom(1, R.color.dividers);

        var padding = R.dimen.padding;

        var version = Theme.createText(R.string.version + ": " +milestone.title);
        version.setTextSize(R.dimen.sub_text);
        this.addView(version);

        var issueViews = [];

        var issues = milestone.issues;
        for (var i = 0; i < issues.length; i++) {
            var issue = Theme.createSubText(issues[i].trim());
            issueViews.add(issue);
            this.addView(issue);
        }

        var time = milestone.created_at;
        var timeView = Theme.createSubText(time);
        this.addView(timeView);

        this.onMeasure = function(wMS) {
            var w = MeasureSpec.getSize(wMS);
            var h = 0;

            Utils.measureExactly(version, logoAreaW, 24);
            Utils.measureExactly(timeView, logoAreaW, 24);

            var cntW = w - logoAreaW - padding;
            for (var i = 0; i < issueViews.length; i++) {
                issueViews[i].measure(cntW, MeasureSpec.makeMeasureSpec(24, MeasureSpec.EXACTLY));
                h += issueViews[i].getMeasuredHeight();
            }
            h = Math.max(80, h + 32);

            this.setMeasuredDimension(w, h);
        };

        this.onLayout = function() {
            var x, y;

            x = 0;
            y = padding;
            version.layout(x, y);

            y += version.getMeasuredHeight();
            timeView.layout(x, y);

            x = logoAreaW + padding;
            y = padding;
            for (var i = 0; i < issueViews.length; i++) {
                issueViews[i].layout(x, y);
                y += issueViews[i].getMeasuredHeight();
            }
        }
    }
}


function CommentView() {
    LinearLayout.apply(this);

    this.setBackgroundColor(0xffffffff);
    this.setCornerSize(R.dimen.corner);
    this.setBoxShadow(0, 1, 2, 0, R.color.shadow);
    this.setPadding(R.dimen.padding, R.dimen.padding, R.dimen.padding, 0);


    var comment = new Comment('images/kkmoving.jpg', 'kkmoving，资深架构师', '这可能是东半球最好用的WebApp框架了。');
    comment.setBorderBottom(1, R.color.dividers);
    this.addView(comment);

    comment = new Comment('images/zhuyunbin.jpg', '朱云斌，安卓程序员', '作为一个Android开发者，Jndroid是一件令人兴奋的礼物。');
    comment.setBorderBottom(1, R.color.dividers);
    this.addView(comment);

    comment = new Comment('images/yanglingfeng.png', 'Hulk Yang，一个见钱眼开的手艺人', 'Jndroid > (AngularJS | Backbone.js | Ember.js)');
    comment.setBorderBottom(1, R.color.dividers);
    this.addView(comment);

    comment = new Comment('images/liuchenchen.png', 'UG84，资深设计师，手机应用设计领路人', '虽然我不知道这是什么，但是我觉得还是挺好看的。');
    comment.setBorderBottom(1, R.color.dividers);
    this.addView(comment);

    comment = new Comment('images/zhangyang.png', '张阳', '本以为平行的世界有了交集，除了打破常规，强大的功能，快速的使用和轻松的体验，才是让人激动的。绝对是轻应用的一大步。');
    this.addView(comment);
}

function Comment(icon, name, text) {
    LinearLayout.apply(this);

    var iconAreaW = 72;
    var iconSize = 40;
    var editH = 150;

    this.setOrientation(LinearLayout.HORIZONTAL);

    this.setEditHeight = function(h) {
        editH = h;
        this.requestLayout();
    };

    var iconArea = new FrameLayout();
    var iconAreaLp = new LayoutParams(iconAreaW, iconAreaW);
    this.addView(iconArea, iconAreaLp);

    var avatar = new ImageView();
    avatar.setImgSrc(icon);
    avatar.setImgWidth(iconSize);
    avatar.setImgHeight(iconSize);
    avatar.setCornerSize(iconSize / 2);
    var avatarLp = new LayoutParams(iconSize, iconSize);
    avatarLp.gravity = Gravity.CENTER;
    iconArea.addView(avatar, avatarLp);

    var contentArea = new LinearLayout();
    var contentLp = new LayoutParams(0, LayoutParams.WRAP_CONTENT);
    contentLp.weight = 1;
    this.addView(contentArea, contentLp);

    var nameView = Theme.createText(name);
    var nameLp = new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT);
    nameLp.topMargin = R.dimen.padding;
    contentArea.addView(nameView, nameLp);

    var comment = Theme.createSubText(text);
    comment.setLineHeight(R.dimen.text * 2);
    var commentLp = new LayoutParams(nameLp);
    commentLp.topMargin = R.dimen.half_padding;
    commentLp.bottomMargin = R.dimen.padding;
    contentArea.addView(comment, commentLp);

}

function QuestionView() {
    LinearLayout.apply(this);

    this.setBackgroundColor(0xffffffff);
    this.setCornerSize(R.dimen.corner);
    this.setBoxShadow(0, 1, 2, 0, R.color.shadow);
    this.setPadding(R.dimen.padding);

    var question = Theme.createText(R.string.ask_question);
    question.setTextIsSelectable(true);
    this.addView(question);
}