function Titlebar() {
    ViewGroup.apply(this);

    this.setBg(0xffffffff);
    this.setBorderBottom(1, R.color.dividers);

    var logoArea = new ViewGroup();
    logoArea.onMeasure = function(wMS, hMS) {
        this.applyDimen(wMS, hMS);
        logo.measure(48, 48);
        name.measure(96, 24);
    };
    logoArea.onLayout = function() {
        var x = (this.getMW() - name.getMW() - logo.getMW()) / 2;
        var y = (this.getMH() - logo.getMH()) / 2;
        logo.layout(x, y);

        x += logo.getMW();
        y = (this.getMH() - name.getMH()) / 2;
        name.layout(x, y);
    };
    this.addView(logoArea);

    var logo = new LiteImageView();
    logo.setImageUri("images/title_logo.png");
    logoArea.addView(logo);

    var name = new LiteImageView();
    name.setAlpha(0.8);
    name.setImageUri("images/logoname.png");
    logoArea.addView(name);

    var tab = new Tab();
    tab.addTabItem(createTabItem(R.string.intro));
    tab.addTabItem(createTabItem(R.string.vs_android));
    tab.addTabItem(createTabItem(R.string.doc));
    tab.addTabItem(createTabItem(R.string.app));
    tab.addTabItem(createTabItem(R.string.about));
    this.addView(tab);

    var setting = Theme.createIconBtn("images/ic_settings.png", 24);
    setting.setOnClickListener(function() {
        setTimeout(onSettingClick, 200);
    });
    setting.setWaveColor(R.color.wave);
    this.addView(setting);

    var menu = Theme.createIconBtn("images/ic_menu.png", 16);
    menu.setOnClickListener(function() {
        setTimeout(onSettingClick, 200);
    });
    menu.setWaveColor(R.color.wave);
    this.addView(menu);

    var line1 = new View();
    line1.setBg(R.color.dividers);
    this.addView(line1);

    var line2 = new View();
    line2.setBg(R.color.dividers);
    this.addView(line2);

    this.getTab = function() {
        return tab;
    };

    this.onMeasure = function(wMS) {
        var w = MeasureSpec.getSize(wMS);
        var h = 64;
        this.setMeasuredDimension(w, h);

        line1.measure(1, h);
        line2.measure(1, h);
        menu.measure(h, h);
        setting.measure(h, h);

        if (Manifest.isPhone) {
            menu.setVisibility(View.VISIBLE);
            tab.setVisibility(View.GONE);

            logoArea.measure(w - 128, h);
        } else {
            menu.setVisibility(View.GONE);
            tab.setVisibility(View.VISIBLE);

            logoArea.measure(190, h);
            tab.measure(w - 190 - 64, h);
        }
    };

    this.onLayout = function() {
        var x = 0;
        var y = 0;
        if (Manifest.isPhone) {
            menu.layout(x, y);

            x += menu.getMW();
            logoArea.layout(x, y);

            x += logoArea.getMW();
            setting.layout(x, y);

            x = menu.getMW();
            line1.layout(x, y);

            x = this.getMW() - 64;
            line2.layout(x, y);
        } else {
            logoArea.layout(x, y);

            x += logoArea.getMW();
            tab.layout(x, y);

            x = (this.getMW() - setting.getMW());
            setting.layout(x, y);

            x = logoArea.getMW();
            line1.layout(x, y);

            x = this.getMW() - 64;
            line2.layout(x, y);
        }
    };

    function createTabItem(text) {
        var btn = new MButton();
        btn.setHoverEnterListener(function() {
            this.setAlpha(0.8);
        });
        btn.setHoverExitListener(function() {
            this.setAlpha(1);
        });
        btn.setText(text);
        btn.setTextColor(R.color.sub_text);
        btn.setDimBg(false);
        btn.setWaveColor(R.color.wave);
        btn.setBoxShadow(0, 0, 0, 0, 0);
        btn.setTextSize(R.dimen.text);
        return btn;
    }

    function onSettingClick() {
        var maskView = new View();
        maskView.setOnClickListener(function() {
            var alpha = new AlphaAnimation(1, 0);
            alpha.setDuration(200);
            maskView.startAnimation(alpha);

            var translate = new TranslateAnimation(0, settingView.getMeasuredWidth() + 12, 0, 0);
            translate.setDuration(200);
            translate.setAnimationEndListener(function() {
                getRootView().removeView(maskView);
                getRootView().removeView(settingView);
            });
            settingView.startAnimation(translate);
        });
        maskView.setBackgroundColor(0x33000000);
        getRootView().addView(maskView);

        var settingView = new SettingView();
        settingView.setStyle("z-index", 10);
        var lp = new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.FILL_PARENT);
        lp.gravity = Gravity.RIGHT;
        getRootView().addView(settingView, lp);

        var translate = new TranslateAnimation(settingView.getMeasuredWidth() + 12, 0, 0, 0);
        translate.setDuration(200);
        settingView.startAnimation(translate);

        var alpha = new AlphaAnimation(0, 1);
        alpha.setDuration(200);
        maskView.startAnimation(alpha);
    }
}
