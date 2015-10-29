function SettingView() {
    ViewGroup.apply(this);

    this.setBackgroundColor(0xffffffff);
    this.setBoxShadow(0, 0, 16, 0, R.color.shadow);

    var cnt = new LinearLayout();
    this.addView(cnt);

    var title = Theme.createTitle(R.string.setting);
    title.setPadding(R.dimen.padding);
    title.setBorderBottom(1, R.color.dividers);
    var titleLp = new LayoutParams(LayoutParams.FILL_PARENT, 48);
    titleLp.topMargin = 48;
    cnt.addView(title, titleLp);

    var languageTitle = Theme.createText(R.string.language);
    languageTitle.setPadding(R.dimen.padding);
    var subTitleLp = new LayoutParams(LayoutParams.FILL_PARENT, 48);
    cnt.addView(languageTitle, subTitleLp);

    var zhRadioButton = new MRadioButton();
    zhRadioButton.setText("中文");
    zhRadioButton.setId(0);
    zhRadioButton.setColor(R.color.theme);

    var enRadioButton = new MRadioButton();
    enRadioButton.setText("English");
    enRadioButton.setId(1);
    enRadioButton.setColor(R.color.theme);

    var languageGroup = new MRadioGroup();
    languageGroup.addChild(zhRadioButton);
    languageGroup.addChild(enRadioButton);
    languageGroup.setOnCheckedChangeListener(function(id) {
        if (id == 0) {
            localStorage["language"] = "zh";
        } else {
            localStorage["language"] = "en";
        }
        location.reload();
    });
    var languageLp = new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT);
    languageLp.leftMargin = R.dimen.padding;
    cnt.addView(languageGroup, languageLp);

    if (Manifest.language.indexOf("zh") >= 0) {
        zhRadioButton.setChecked(true);
    } else {
        enRadioButton.setChecked(true);
    }

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
    }
}
