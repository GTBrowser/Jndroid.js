/**
 * Created by lency on 4/28/15.
 */
function MainView() {
    ViewGroup.apply(this);

    var mIntroView = null;
    var mVSView = null;
    var mDocView = null;
    var mAppView = null;
    var mQAView = null;

    var cnt = new FrameLayout();
    this.addView(cnt);

    var title = new Titlebar();
    title.setBackgroundColor(R.color.theme);
    this.addView(title);

    var tab = new Tab();
    tab.setBg(R.color.theme);
    tab.addTabItem(createTabItem(R.string.intro));
    tab.addTabItem(createTabItem(R.string.vs_android));
    tab.addTabItem(createTabItem(R.string.documentation));
    tab.addTabItem(createTabItem(R.string.application));
    tab.addTabItem(createTabItem(R.string.about));
    tab.setIndicatorColor(0x99ffffff);
    tab.setOnSelectedListener(function(i) {
        cnt.removeAllViews();
        switch (i) {
            case 0:
                if (mIntroView == null) {
                    mIntroView = new IntroductionView();
                }
                cnt.addView(mIntroView);
                break;
            case 1:
                if (mVSView == null) {
                    mVSView = new VSAndroidView();
                }
                cnt.addView(mVSView);
                break;
            case 2:
                if (mDocView == null) {
                    mDocView = new DocumentationView();
                }
                cnt.addView(mDocView);
                break;
            case 3:
                if (mAppView == null) {
                    mAppView = new ApplicationsView();
                }
                cnt.addView(mAppView);
                break;
            case 4:
                if (mQAView == null) {
                    mQAView = new AboutView();
                }
                cnt.addView(mQAView);
                break;
        }
    });
    tab.setSelectIndex(0);
    this.addView(tab);


    function createTabItem(text) {
        var btn = new MButton();
        btn.setText(text);
        btn.setTextColor(0xffffffff);
        btn.setDimBg(false);
        btn.setWaveColor(0x33ffffff);
        btn.setBoxShadow(0, 0, 0, 0, 0);
        btn.setTextSize(16);
        return btn;
    }

    this.postDelayed(function() {
        if (Manifest.isVersionUpgrade()) {
            if (LSnackBar) {
                LSnackBar.show("版本已更新");
            }
        }
    }, 1000);

    this.onMeasure = function(wMS, hMS) {
        var w = MS.getSize(wMS);
        var h = MS.getSize(hMS);

        Utils.measureExactly(title, w, 48);
        tab.measure(wMS, 48);

        var cntH = h - tab.getMH() - title.getMH();
        cnt.measure(wMS, cntH);

        this.setMeasuredDimension(w, h);
    };

    this.onLayout = function() {
        var x = 0;
        var y = 0;
        title.layout(x, y);

        y += title.getMH();
        tab.layout(x, y);

        y += tab.getMH();
        cnt.layout(x, y);
    };
}