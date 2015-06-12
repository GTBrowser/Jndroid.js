function Titlebar() {
    LinearLayout.apply(this, []);

    this.setOrientation(LinearLayout.HORIZONTAL);

    var mLogo = new ImageView();
    mLogo.setImageUri("images/title_logo.png");
    mLogo.setImgWidth(36);
    var logoLp = new LayoutParams(72, 48);
    this.addView(mLogo, logoLp);

    var mTitle = new TextView();
    mTitle.setTextSize(R.dimen.title);
    mTitle.setTextColor(0xffffffff);
    mTitle.setText("Jndroid");
    mTitle.setGravity(Gravity.LEFT | Gravity.CENTER_VERTICAL);
    mTitle.setPadding(R.dimen.padding, 0, 0, 0);
    var titleLp = new LayoutParams(0, 48);
    titleLp.weight = 1;
    this.addView(mTitle, titleLp);

    var mSetting = new LImageButton();
    mSetting.setDimBg(false);
    mSetting.setOnClickListener(function() {
        var maskView = new View();
        maskView.setOnClickListener(function() {
            var alpha = new AlphaAnimation(1, 0);
            alpha.setDuration(200);
            maskView.startAnimation(alpha);

            var translate = new TranslateAnimation(0, settingView.getMeasuredWidth(), 0, 0);
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
        var lp = new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.FILL_PARENT);
        lp.gravity = Gravity.RIGHT;
        getRootView().addView(settingView, lp);

        var translate = new TranslateAnimation(settingView.getMeasuredWidth(), 0, 0, 0);
        translate.setDuration(200);
        settingView.startAnimation(translate);

        var alpha = new AlphaAnimation(0, 1);
        alpha.setDuration(200);
        maskView.startAnimation(alpha);
    });
    mSetting.setCornerSize(24);
    if (mSetting.setWaveColor) {
        mSetting.setWaveColor(0x33ffffff);
    }
    mSetting.setImageUri("images/ic_settings.png");
    mSetting.setImgWidth(28);
    var settingLp = new LayoutParams(48, 48);
    settingLp.rightMargin = R.dimen.padding;
    this.addView(mSetting, settingLp);
}
