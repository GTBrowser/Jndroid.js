/**
 * Created by lency on 5/20/15.
 */
function Playground(title, initCode, isHtml) {
    ViewGroup.apply(this, []);

    this.uuid = Math.floor(Math.random() * 100000);

    var BUTTON_WIDTH = 48;
    var BUTTON_HEIGHT = 48;

    var mPadding = R.dimen.padding;
    var mSelf = this;
    var mEditHeight = 300;
    var mAppendCode = "";

    this.setBackgroundColor(0xffffffff);
    this.setCornerSize(2, 2, 2, 2);
    this.setBoxShadow(0, 1, 2, 0, 0x66000000);
    this.setPadding(16);

    var mTitle = new TextView();
    mTitle.setTextSize(R.dimen.title);
    mTitle.setTextColor(R.color.text);
    mTitle.setText(title);
    this.addView(mTitle);

    var mEditArea = new FrameLayout();
    mEditArea.setPadding(0);
    this.addView(mEditArea);

    var mEditView;

    if (mIsPhone) {
        mEditView = new EditText();
        mEditView.setSingleLine(false);
    } else {
        mEditView = new CodeMirrorView(isHtml);
    }
    mEditView.setOnFocusChangeListener(function() {
        resetBorder();
    });
    this.postDelayed(function() {
        mEditView.setText(initCode);
        update();
    }, 100);
    var lp = new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.FILL_PARENT);
    mEditArea.addView(mEditView, lp);

    var mCodePreviewer;
    if (isHtml) {
        mCodePreviewer = new HtmlPreviewer();
    } else {
        mCodePreviewer = new CodePreviewer(this.uuid);
    }
    this.addView(mCodePreviewer);

    var mTryButton = new LImageButton();
    mTryButton.setBackgroundColor(R.color.theme);
    mTryButton.setCornerSize(24);
    mTryButton.setImgSrc("images/play_icon.png");
    mTryButton.setImgWidth(40);
    mTryButton.setBoxShadow(0, 6, 6, 0, 0x66000000);
    mTryButton.setStyle("z-index", 10);
    mTryButton.setOnClickListener(function() {
        update();
    });
    this.addView(mTryButton);

    this.setEditHeight = function(h) {
        mEditHeight = h;
        this.requestLayout();
    };

    this.setAppendCode = function(code) {
        mAppendCode = code;
    };

    this.onMeasure = function(widthMS, heightMS){
        var width = MeasureSpec.getSize(widthMS);
        var height = mEditHeight;

        mTitle.measure(MeasureSpec.makeMeasureSpec(width, MeasureSpec.EXACTLY), 0);
        mTryButton.measure(MeasureSpec.makeMeasureSpec(BUTTON_WIDTH, MeasureSpec.EXACTLY),
            MeasureSpec.makeMeasureSpec(BUTTON_HEIGHT, MeasureSpec.EXACTLY));

        var contentWidth = width - mPadding * 2;
        if(width > 700) {
            mEditArea.measure(contentWidth / 2, mEditHeight);
            mCodePreviewer.measure(contentWidth / 2, mEditHeight);
            height = mEditHeight + mPadding * 2;
        } else{
            mEditArea.measure(contentWidth, mEditHeight);
            mCodePreviewer.measure(contentWidth, mEditHeight);
            height = mEditHeight * 2 + mPadding * 2;
        }
        height += R.dimen.title_padding_top + mTitle.getMeasuredHeight();
        this.setMeasuredDimension(width, height);
    };

    this.onLayout = function(x, y){
        var padding = R.dimen.padding;
        var offsetX = padding;
        var offsetY = R.dimen.title_padding_top;
        mTitle.layout(offsetX, offsetY);

        offsetY += mTitle.getMeasuredHeight() + padding;
        mEditArea.layout(offsetX, offsetY);

        var width = this.getMeasuredWidth();
        var height = this.getMeasuredHeight();

        if(width > 700) {
            mCodePreviewer.layout(mCodePreviewer.getMeasuredWidth() + padding, offsetY);
        } else {
            mCodePreviewer.layout(mPadding, offsetY + mEditArea.getMeasuredHeight());
        }

        offsetX = (width - mTryButton.getMeasuredWidth()) / 2;
        offsetY = (height - R.dimen.title_padding_top - mTitle.getMeasuredHeight() - mTryButton.getMeasuredHeight()) / 2;
        offsetY += R.dimen.title_padding_top + mTitle.getMeasuredHeight();
        mTryButton.layout(offsetX, offsetY);

        resetBorder();
    };

    function resetBorder() {
        if (mEditView == undefined) {
            return;
        }
        if (mEditView.isFocused()) {
            mEditArea.setBorder(1, 0xff1499f7);
        } else {
            mEditArea.setBorder(1, R.color.dividers);
        }
        mCodePreviewer.setBorderRight(1, R.color.dividers);
        mCodePreviewer.setBorderBottom(1, R.color.dividers);
        if (mSelf.getMeasuredWidth() > 700) {
            mCodePreviewer.setBorderTop(1, R.color.dividers);
        } else {
            mCodePreviewer.setBorderLeft(1, R.color.dividers);
        }
    }

    function update(){
        var code = mEditView.getText() + " " + mAppendCode;
        mCodePreviewer.applyCode(code);
    }
}

function HtmlPreviewer() {
    FrameLayout.apply(this, []);

    var mDisplayArea = new WebView();
    this.addView(mDisplayArea);

    this.setPadding(10);

    this.applyCode = function(code){
        mDisplayArea.loadData(code);
    };
}

function CodePreviewer(uuid) {
    FrameLayout.apply(this, []);

    var mDemoView;

    var mDisplayArea = new FrameLayout();
    this.addView(mDisplayArea);

    this.setPadding(10);

    this.applyCode = function(code){
        var scriptElem = document.createElement("script");

        var codeWrapper = "function DemoView" + uuid + "(){FrameLayout.apply(this, []);" + code + "}";

        scriptElem.innerHTML = codeWrapper;
        document.head.appendChild(scriptElem);

        mDisplayArea.removeView(mDemoView);
        mDemoView = eval("new DemoView" + uuid + "()");
        mDisplayArea.addView(mDemoView);
    };
}
