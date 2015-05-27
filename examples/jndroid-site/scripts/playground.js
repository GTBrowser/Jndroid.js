/**
 * Created by lency on 5/20/15.
 */
function Playground(title, initCode, isHtml) {
    ViewGroup.apply(this, []);

    this.uuid = Math.floor(Math.random() * 100000);

    var BUTTON_WIDTH = 48;
    var BUTTON_HEIGHT = 48;

    var mSelf = this;
    var mEditHeight = 300;
    var mAppendCode = "";

    this.setBackgroundColor(0xffffffff);
    this.setCornerSize(2, 2, 2, 2);
    this.setBoxShadow(0, 1, 2, 0, 0x66000000);
    this.setPadding(16);

    var mTitle = new TextView();
    mTitle.setTextSize(TITLE_SIZE);
    mTitle.setTextColor(TEXT_COLOR);
    mTitle.setText(title);
    this.addView(mTitle);

    var mEditArea = new FrameLayout();
    mEditArea.setPadding(0);
    this.addView(mEditArea);

    var mCodeMirrorView = new CodeMirrorView(isHtml);
    mCodeMirrorView.setOnFocusChangeListener(function() {
        resetBorder();
    });
    this.postDelayed(function() {
        mCodeMirrorView.setText(initCode);
        update();
    }, 100);
    mEditArea.addView(mCodeMirrorView);

    var mCodePreviewer;
    if (isHtml) {
        mCodePreviewer = new HtmlPreviewer();
    } else {
        mCodePreviewer = new CodePreviewer(this.uuid);
    }
    this.addView(mCodePreviewer);

    var mTryButton = new LImageButton();
    mTryButton.setBackgroundColor(THEME_COLOR);
    mTryButton.setCornerSize(24);
    mTryButton.setImgSrc("images/play_icon.png");
    mTryButton.setImgWidth(40);
    mTryButton.setBoxShadow(0, 6, 6, 0, 0x66000000);
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

        var contentWidth = width - PADDING * 2;
        if(width > 700) {
            mEditArea.measure(contentWidth / 2, mEditHeight);
            mCodePreviewer.measure(contentWidth / 2, mEditHeight);
            height = mEditHeight + PADDING * 2;
        } else{
            mEditArea.measure(contentWidth, mEditHeight);
            mCodePreviewer.measure(contentWidth, mEditHeight);
            height = mEditHeight * 2 + PADDING * 2;
        }
        height += TITLE_PADDING_TOP + mTitle.getMeasuredHeight();
        this.setMeasuredDimension(width, height);
    };

    this.onLayout = function(x, y){
        var offsetX = PADDING;
        var offsetY = TITLE_PADDING_TOP;
        mTitle.layout(offsetX, offsetY);

        offsetY += mTitle.getMeasuredHeight() + PADDING;
        mEditArea.layout(offsetX, offsetY);

        var width = this.getMeasuredWidth();
        var height = this.getMeasuredHeight();

        if(width > 700) {
            mCodePreviewer.layout(mCodePreviewer.getMeasuredWidth() + PADDING, offsetY);
        } else {
            mCodePreviewer.layout(PADDING, offsetY + mEditArea.getMeasuredHeight());
        }

        offsetX = (width - mTryButton.getMeasuredWidth()) / 2;
        offsetY = (height - TITLE_PADDING_TOP - mTitle.getMeasuredHeight() - mTryButton.getMeasuredHeight()) / 2;
        offsetY += TITLE_PADDING_TOP + mTitle.getMeasuredHeight();
        mTryButton.layout(offsetX, offsetY);

        resetBorder();
    };

    function resetBorder() {
        if (mCodeMirrorView.isFocused()) {
            mEditArea.setBorder(1, 0xff1499f7);
        } else {
            mEditArea.setBorder(1, DIVIDERS_COLOR);
        }
        mCodePreviewer.setBorderRight(1, DIVIDERS_COLOR);
        mCodePreviewer.setBorderBottom(1, DIVIDERS_COLOR);
        if (mSelf.getMeasuredWidth() > 700) {
            mCodePreviewer.setBorderTop(1, DIVIDERS_COLOR);
        } else {
            mCodePreviewer.setBorderLeft(1, DIVIDERS_COLOR);
        }
    }

    function update(){
        var code = mCodeMirrorView.getText() + " " + mAppendCode;
        mCodePreviewer.applyCode(code);
    }
}

function CodeMirrorView(isHtml) {
    ViewGroup.apply(this, []);

    var mFocused = false;
    var mFocusListener = null;

    var mTimeStamp = (new Date()).getTime();
    var mTextArea = document.createElement("textarea");
    mTextArea.type = "text";
    mTextArea.style.boxSizing = "border-box";
    mTextArea.style.width = "100%";
    mTextArea.style.height = "100%";
    mTextArea.style.background = "none";
    mTextArea.style.border = "0";
    mTextArea.outline = "none";
    mTextArea.id = "code" + mTimeStamp;
    mTextArea.name = "code" + mTimeStamp;

    var mCMEditor = null;

    this.getDiv().appendChild(mTextArea);
    this.postDelayed(function(){
        if (isHtml) {
            mode = "htmlmixed";
        } else {
            mode = "javascript";
        }
        var mixedMode = {
            name: mode
        };
        mCMEditor = CodeMirror.fromTextArea(document.getElementById("code" + mTimeStamp), {
            mode: mixedMode,
            lineNumbers: true,
            matchBrackets: true,
            continueComments: "Enter",
            lineWrapping:true,
            tabSize:2
        });
        mCMEditor.on("focus", function() {
            mFocused = true;
            if (mFocusListener != null) {
                mFocusListener.call(this, true);
            }
        });
        mCMEditor.on("blur", function() {
            mFocused = false;
            if (mFocusListener != null) {
                mFocusListener.call(this, false);
            }
        });
    }, 50);

    this.isFocused = function() {
        return mFocused;
    };

    this.setOnFocusChangeListener = function(l) {
        mFocusListener = l;
    };

    this.getEditor = function() {
        return mCMEditor;
    };

    this.getTextArea = function() {
        return mTextArea;
    };

    this.setSelection = function(start, end) {
        mTextArea.selectionStart = start;
        if (end == undefined) {
            mTextArea.selectionEnd = start;
        } else {
            mTextArea.selectionEnd = end;
        }
    };

    this.getSelectionStart = function() {
        return mTextArea.selectionStart;
    };

    this.getSelectionEnd = function() {
        return mTextArea.selectionEnd;
    };

    this.setTextChangedListener = function(listener) {
        mTextArea.oninput = listener;
    };

    this.getText = function() {
        if (mCMEditor != null) {
            return mCMEditor.getValue();
        }
        return "";
    };

    this.setText = function(text) {
        mTextArea.value = text;
        if (mCMEditor != null) {
            mCMEditor.setValue(text);
        }
    };

    this.onMeasure = function(widthMS, heightMS) {
        var width = MeasureSpec.getSize(widthMS);
        var height = MeasureSpec.getSize(heightMS);

        if (mCMEditor != null) {
            mCMEditor.setSize(width, height);
        }

        this.setMeasuredDimension(width, height);
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
