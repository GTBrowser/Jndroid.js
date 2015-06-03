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
