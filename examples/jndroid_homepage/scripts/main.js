/**
 * Created by lency on 4/28/15.
 */
function MainView() {
    ViewGroup.apply(this);

    var introView = null;
    var vsView = null;
    var docView = null;
    var appView = null;
    var qaView = null;

    var cnt = new FrameLayout();
    this.addView(cnt);

    var title = new Titlebar();
    this.addView(title);

    var tab = title.getTab();
    tab.setOnSelectedListener(function(i) {
        setTimeout(function() {
            cnt.removeAllViews();
            switch (i) {
                case 0:
                    if (introView == null) {
                        introView = new IntroView();
                    }
                    cnt.addView(introView);
                    break;
                case 1:
                    if (vsView == null) {
                        vsView = new VSAndroidView();
                    }
                    cnt.addView(vsView);
                    break;
                case 2:
                    if (docView == null) {
                        docView = new DocView();
                    }
                    cnt.addView(docView);
                    break;
                case 3:
                    if (appView == null) {
                        appView = new AppView();
                    }
                    cnt.addView(appView);
                    break;
                case 4:
                    if (qaView == null) {
                        qaView = new AboutView();
                    }
                    cnt.addView(qaView);
                    break;
            }
        }, 200);
    });
    tab.setSelectIndex(0);

    this.postDelayed(function() {
        if (Manifest.isVersionUpgrade()) {
            if (LSnackBar) {
                LSnackBar.show("版本已更新");
            }
        }
    }, 1000);

    this.onMeasure = function(wMS, hMS) {
        if (window.innerWidth <= 720) {
            Manifest.isPhone = true;
        } else {
            Manifest.isPhone = false;
        }

        var w = MS.getSize(wMS);
        var h = MS.getSize(hMS);

        Utils.measureExactly(title, w, 48);

        var cntH = h - title.getMH();
        cnt.measure(wMS, cntH);

        this.setMeasuredDimension(w, h);
    };

    this.onLayout = function() {
        var x = 0;
        var y = 0;
        title.layout(x, y);

        y += title.getMH();
        cnt.layout(x, y);
    };
}