function SettingView() {
    ViewGroup.apply(this, []);

    this.setBackgroundColor(0xffffffff);
    this.setBoxShadow(0, 0, 16, 0, R.color.shadow);

    var mContent = new LinearLayout();
    this.addView(mContent);

    var mTitle = new TextView();
    mTitle.setText(R.string.setting);
    mTitle.setGravity(Gravity.LEFT | Gravity.CENTER_VERTICAL);
    mTitle.setTextSize(16);
    mTitle.setTextColor(R.color.text);
    mTitle.setPadding(R.dimen.padding);
    mTitle.setBorderBottom(1, R.color.dividers);
    var titleLp = new LayoutParams(LayoutParams.FILL_PARENT, 48);
    titleLp.topMargin = 48;
    mContent.addView(mTitle, titleLp);

    var mLanguageTitle = new TextView();
    mLanguageTitle.setText(R.string.language);
    mLanguageTitle.setTextSize(14);
    mLanguageTitle.setTextColor(R.color.sub_text);
    mLanguageTitle.setGravity(Gravity.LEFT | Gravity.CENTER_VERTICAL);
    mLanguageTitle.setPadding(R.dimen.padding);
    var subTitleLp = new LayoutParams(LayoutParams.FILL_PARENT, 48);
    mContent.addView(mLanguageTitle, subTitleLp);

    var mZhRadioButton = new MRadioButton();
    mZhRadioButton.setText("中文");
    mZhRadioButton.setId(0);
    mZhRadioButton.setColor(R.color.theme);

    var mEnRadioButton = new MRadioButton();
    mEnRadioButton.setText("English");
    mEnRadioButton.setId(1);
    mEnRadioButton.setColor(R.color.theme);

    var mLanguageGroup = new MRadioGroup();
    mLanguageGroup.addChild(mZhRadioButton);
    mLanguageGroup.addChild(mEnRadioButton);
    mLanguageGroup.setOnCheckedChangeListener(function(id) {
        if (id == 0) {
            localStorage["language"] = "zh";
        } else {
            localStorage["language"] = "en";
        }
        location.reload();
    });
    var languageLp = new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT);
    languageLp.leftMargin = R.dimen.padding;
    mContent.addView(mLanguageGroup, languageLp);

    if (Manifest.language.indexOf("zh") >= 0) {
        mZhRadioButton.setChecked(true);
    } else {
        mEnRadioButton.setChecked(true);
    }

    this.onMeasure = function(widthMS, heightMS) {
        var width = MeasureSpec.getSize(widthMS) * 2 / 3;
        var height = MeasureSpec.getSize(heightMS);

        if (width > 300) {
            width = 300;
        }

        mContent.measure(width, height);

        this.setMeasuredDimension(width, height);
    };

    this.onLayout = function(x, y) {
        var offsetX = 0;
        var offsetY = 0;
        mContent.layout(offsetX, offsetY);
    }
}
