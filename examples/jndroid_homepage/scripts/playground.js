/**
 * Created by lency on 5/20/15.
 */
function Playground(name, preCode, code, appendCode, isHtml) {
    ViewGroup.apply(this);

    this.uuid = Math.floor(Math.random() * 100000);

    var buttonW = 48;
    var buttonH = 48;
    var editH = 300;

    var self = this;
    var padding = R.dimen.padding;

    this.setBackgroundColor(0xffffffff);
    this.setCornerSize(2);
    this.setBoxShadow(0, 1, 2, 0, 0x66000000);
    this.setPadding(16);

    var title = new TextView();
    title.setTextSize(R.dimen.title);
    title.setTextColor(R.color.text);
    title.setText(name);
    this.addView(title);

    var editView = new EditText();
    editView.setSingleLine(false);
    editView.setPadding(8);
    editView.setTextColor(0xff006600);
    editView.setText(code);
    editView.setHoverEnterListener(function() {
        this.setBorder(1, 0x661499f7);
    });
    editView.setHoverExitListener(function() {
        this.setBorder(1, R.color.dividers);
    });
    editView.setOnFocusChangeListener(function() {
        resetBorder();
    });

    this.addView(editView);

    var previewer;
    if (isHtml) {
        previewer = new HtmlPreviewer();
    } else {
        previewer = new CodePreviewer(this.uuid);
    }
    this.addView(previewer);

    update();

    var tryBtn = new MImageButton();
    tryBtn.setBackgroundColor(R.color.theme);
    tryBtn.setCornerSize(24);
    tryBtn.setImgSrc("images/play_icon.png");
    tryBtn.setImgWidth(40);
    tryBtn.setBoxShadow(0, 6, 6, 0, 0x66000000);
    tryBtn.setOnClickListener(function() {
        update();
    });
    this.addView(tryBtn);

    this.setEditHeight = function(h) {
        editH = h;
        this.requestLayout();
    };

    this.onMeasure = function(wMS){
        var w = MeasureSpec.getSize(wMS);
        var h = editH;

        title.measure(MeasureSpec.makeMeasureSpec(w, MeasureSpec.EXACTLY), 0);
        tryBtn.measure(MeasureSpec.makeMeasureSpec(buttonW, MeasureSpec.EXACTLY),
            MeasureSpec.makeMeasureSpec(buttonH, MeasureSpec.EXACTLY));

        var cntW = w - padding * 2;
        if(w > 700) {
            Utils.measureExactly(editView, cntW / 2, editH);
            previewer.measure(cntW / 2, editH);
            h = editH + padding * 2;
        } else{
            Utils.measureExactly(editView, cntW, editH);
            previewer.measure(cntW, editH);
            h = editH * 2 + padding * 2;
        }
        h += R.dimen.title_padding_top + title.getMeasuredHeight();
        this.setMeasuredDimension(w, h);
    };

    this.onLayout = function(){
        var padding = R.dimen.padding;
        var x = padding;
        var y = R.dimen.title_padding_top;
        title.layout(x, y);

        y += title.getMeasuredHeight() + padding;
        editView.layout(x, y);

        var w = this.getMeasuredWidth();
        var h = this.getMeasuredHeight();

        if(w > 700) {
            previewer.layout(previewer.getMeasuredWidth() + padding, y);
        } else {
            previewer.layout(padding, y + editArea.getMeasuredHeight());
        }

        x = (w - tryBtn.getMeasuredWidth()) / 2 - 2;
        y = (h - R.dimen.title_padding_top - title.getMeasuredHeight() - tryBtn.getMeasuredHeight()) / 2;
        y += R.dimen.title_padding_top + title.getMeasuredHeight();
        tryBtn.layout(x, y);

        resetBorder();
    };

    function resetBorder() {
        if (editView == undefined) {
            return;
        }
        if (editView.isFocused()) {
            editView.setBorder(1, 0xff1499f7);
        } else {
            editView.setBorder(1, R.color.dividers);
        }
        previewer.setBorderRight(1, R.color.dividers);
        previewer.setBorderBottom(1, R.color.dividers);
        if (self.getMeasuredWidth() > 700) {
            previewer.setBorderTop(1, R.color.dividers);
        } else {
            previewer.setBorderLeft(1, R.color.dividers);
        }
    }

    function update(){
        var code = preCode + " " + editView.getText() + " " + appendCode;
        previewer.applyCode(code);
    }
}

function HtmlPreviewer() {
    FrameLayout.apply(this);

    var display = new WebView();
    this.addView(display);

    this.setPadding(10);

    this.applyCode = function(code){
        display.loadDataWithBaseURL(code);
    };
}

function CodePreviewer(uuid) {
    FrameLayout.apply(this);

    var demoView;

    var display = new FrameLayout();
    this.addView(display);

    this.setPadding(10);

    this.applyCode = function(code){
        var scriptElem = document.createElement("script");
        scriptElem.innerHTML = "function DemoView" + uuid + "(){FrameLayout.apply(this);" + code + "}";
        document.head.appendChild(scriptElem);

        display.removeView(demoView);
        demoView = eval("new DemoView" + uuid + "()");
        display.addView(demoView);
    };
}
