function Menu(titlebar) {
    ViewGroup.apply(this);

    this.setBackgroundColor(0xffffffff);
    this.setBoxShadow(0, 0, 16, 0, R.color.shadow);

    var self = this;
    var items = [];

    var tab = titlebar.getTab();

    var cnt = new LinearLayout();
    this.addView(cnt);

    var logoArea = new LogoArea(true);
    logoArea.setBorderBottom(1, R.color.dividers);
    var logoAreaLp = new LayoutParams(LayoutParams.FILL_PARENT, 64);
    cnt.addView(logoArea, logoAreaLp);

    addItem(0, R.string.intro);
    addItem(1, R.string.vs_android);
    addItem(2, R.string.doc);
    addItem(3, R.string.app);
    addItem(4, R.string.about);

    items[tab.getSelectIndex()].setTextColor(R.color.theme);

    var maskView = new View();
    maskView.setOnClickListener(function() {
        var alpha = new AlphaAnimation(1, 0);
        alpha.setDuration(200);
        maskView.startAnimation(alpha);

        var translate = new TranslateAnimation(0, -self.getMeasuredWidth() - 12, 0, 0);
        translate.setDuration(200);
        translate.setAnimationEndListener(function() {
            self.hide();
        });
        self.startAnimation(translate);
    });
    maskView.setBackgroundColor(0x66000000);

    this.show = function() {
        getRootView().addView(maskView);

        var lp = new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.FILL_PARENT);
        lp.gravity = Gravity.LEFT;
        getRootView().addView(self, lp);

        var translate = new TranslateAnimation(-self.getMeasuredWidth() - 12, 0, 0, 0);
        translate.setDuration(200);
        self.startAnimation(translate);

        var alpha = new AlphaAnimation(0, 1);
        alpha.setDuration(200);
        maskView.startAnimation(alpha);
    };

    this.hide = function() {
        getRootView().removeView(maskView);
        getRootView().removeView(this);
    };

    this.onMeasure = function(wMS, hMS) {
        var w = MeasureSpec.getSize(wMS) * 2 / 3;
        var h = MeasureSpec.getSize(hMS);

        if (w > 300) {
            w = 300;
        }
        cnt.measure(w, h);

        this.setMeasuredDimension(w, h);
    };

    this.onLayout = function() {
        cnt.layout(0, 0);
    };

    function addItem(id, text) {
        var v = new MButton();
        v.setId(id);
        v.setDimBg(false);
        v.setBorder(0, 0);
        v.setBoxShadow(0, 0, 0, 0, 0);
        v.setText(text);
        v.setTextSize(R.dimen.text);
        v.setTextColor(R.color.text);
        v.setGravity(Gravity.LEFT | Gravity.CENTER_VERTICAL);
        v.setPadding(R.dimen.padding, 0, 0, 0);
        v.setHoverEnterListener(function() {
            v.setAlpha(0.6);
        });
        v.setHoverExitListener(function() {
            v.setAlpha(1);
        });
        v.setOnClickListener(function() {
            setTimeout(function() {
                self.hide();

                var tabItems = tab.getTabItems();
                tabItems[id].performClick();
            }, 200);
        });
        items.push(v);

        var lp = new LayoutParams(LayoutParams.FILL_PARENT, 48);
        cnt.addView(v, lp);
    }
}
