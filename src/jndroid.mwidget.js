function MProgressBar() {
    View.apply(this, []);

    var HORIZONTAL_HEIGHT = 3;
    var SMALL_SIZE = 30;
    var LARGE_SIZE = 45;

    var mSelf = this;
    var mStyle = MProgressBar.Horizontal;
    var mColor = 0xff4688f5;
    var mSecondaryColor = 0xffb3d3ea;
    var mBeginDegree = 0;
    var mEndDegree = Math.PI * 2;
    var mOffsetDegree = 0;
    var mFinish = false;
    var mProcessor = new Processor();
    mProcessor.startProcess(0, 1, 2000);
    mProcessor.setProcessListener(function() {
        if (mFinish == false) {
            mOffsetDegree += Math.PI;
            mProcessor.startProcess(0, 1, 2000);
        }
    });

    this.setWillNotDraw(false);

    this.setStyle = function(style) {
        mStyle = style;
        this.requestLayout();
    };

    this.setProgressColor = function(c) {
        mColor = c;
    };

    this.setSecondaryProgressColor = function(c) {

    };

    this.stopAnimation = function() {
        mFinish = true;
        mProcessor.forceFinished(true);
    };

    this.onMeasure = function (widthMS, heightMS) {
        var width, height;
        if (mStyle == MProgressBar.Horizontal) {
            width = MeasureSpec.getSize(widthMS);
            height = HORIZONTAL_HEIGHT;
        } else if (mStyle == MProgressBar.Small) {
            width = SMALL_SIZE;
            height = SMALL_SIZE;
        } else if (mStyle == MProgressBar.Large) {
            width = LARGE_SIZE;
            height = LARGE_SIZE;
        }
        this.setMeasuredDimension(width, height);
    };

    this.onDraw = function(canvas) {
        if (mStyle == MProgressBar.Horizontal) {
            drawLine(canvas);
        } else {
            drawCircle(canvas);
        }
    };

    function drawLine(canvas) {
        var w = mSelf.getMeasuredWidth();
        var h = mSelf.getMeasuredHeight();
        var distance = w * 1.1;
        var p = mProcessor.getCurrProcess();
        var p1 = f2(p);
        var p2 = f1(p);
        var begin = distance * p1;
        var end = distance * p2;

        canvas.lineWidth = h;
        canvas.beginPath();
        canvas.moveTo(0, h / 2);
        canvas.lineTo(w, h / 2);
        canvas.closePath();
        canvas.strokeStyle = Utils.toCssColor(mSecondaryColor);
        canvas.stroke();

        canvas.beginPath();
        canvas.moveTo(begin - 0.05 * w, h / 2);
        canvas.lineTo(end, h / 2);
        canvas.closePath();
        canvas.strokeStyle = Utils.toCssColor(mColor);
        canvas.stroke();

        computeProcessOffset();
    }

    function drawCircle(canvas) {
        var x = mSelf.getMeasuredWidth() / 2;
        var y = mSelf.getMeasuredHeight() / 2;
        var lineWidth = x / 5;
        var radius = mSelf.getMeasuredWidth() / 2;
        var distance = Math.PI * 3;
        var p = mProcessor.getCurrProcess();
        var p1 = f1(p);
        var p2 = f2(p);
        mBeginDegree = mOffsetDegree + distance * p2;
        mEndDegree = mOffsetDegree + Math.PI * 0.1 + distance * p1;
        canvas.arc(x, y, radius - lineWidth / 2, mBeginDegree, mEndDegree);
        canvas.lineWidth = lineWidth;
        canvas.strokeStyle = Utils.toCssColor(mColor);
        canvas.stroke();

        computeProcessOffset();
    }

    function f1(x) {
        if (x < 0.25) {
            return x * 0.5 + 4 * x * x;
        } else if (x < 0.5) {
            return 0.75 - (0.5 - x) * 0.5 - 4 * (0.5 - x) * (0.5 - x);
        } else {
            return 1 - (1 - x) * 0.5;
        }
    }

    function f2(x) {
        if (x < 0.5) {
            return 0.5 * x;
        } else if (x < 0.75) {
            return 0.25 + (x - 0.5) * 0.5 + 4 * (x - 0.5) * (x - 0.5);
        } else {
            return 1 - (1 - x) * 0.5 - 4 * (1 - x) * (1 - x);
        }
    }

    function computeProcessOffset() {
        if (mProcessor.computeProcessOffset()) {
            mSelf.postInvalidate();
        }
    }
}
Object.defineProperty(MProgressBar,"Horizontal",{value:0});
Object.defineProperty(MProgressBar,"Small",{value:1});
Object.defineProperty(MProgressBar,"Large",{value:2});

function MButton() {
    TextView.apply(this, []);
    var mId;

    var mBgDrawable = new WaveDrawable();
    mBgDrawable.setCallback(this);

    this.setWillNotDraw(false);
    this.setTextSize(16);
    this.setGravity(Gravity.CENTER);

    this.setCornerSize(2, 2, 2, 2);
    this.setBoxShadow(0, 0, 2, 0, 0x33000000);

    this.getId = function() {
        return mId;
    };

    this.setId = function(i) {
        mId = i;
    };

    this.setDimBg = function(dimBg) {
        mBgDrawable.setDimBg(dimBg);
    };

    this.setWaveColor = function(color) {
        mBgDrawable.setWaveColor(color);
    };

    this.onTouchEvent = function(ev) {
        switch (ev.getAction()) {
            case MotionEvent.ACTION_DOWN:
                mBgDrawable.setState(View.VIEW_STATE_PRESSED);
                mBgDrawable.setX(ev.getX());
                mBgDrawable.setY(ev.getY());
                break;
            case MotionEvent.ACTION_CANCEL:
            case MotionEvent.ACTION_UP:
                mBgDrawable.setState(View.VIEW_STATE_ENABLED);
                break;
        }
    };

    this.onDraw = function(canvas) {
        mBgDrawable.setBounds(0, 0, this.getMeasuredWidth(), this.getMeasuredHeight());
        mBgDrawable.draw(canvas);
    };
}

function MImageButton() {
    ImageButton.apply(this, []);
    var mId;

    var mBgDrawable = new WaveDrawable();
    mBgDrawable.setCallback(this);

    this.setWillNotDraw(false);

    this.setDimBg = function(dimBg) {
        mBgDrawable.setDimBg(dimBg);
    };

    this.setWaveColor = function(color) {
        mBgDrawable.setWaveColor(color);
    };

    this.onTouchEvent = function(ev) {
        switch (ev.getAction()) {
            case MotionEvent.ACTION_DOWN:
                mBgDrawable.setState(View.VIEW_STATE_PRESSED);
                mBgDrawable.setX(ev.getX());
                mBgDrawable.setY(ev.getY());
                break;
            case MotionEvent.ACTION_CANCEL:
            case MotionEvent.ACTION_UP:
                mBgDrawable.setState(View.VIEW_STATE_ENABLED);
                break;
        }
    };

    this.onDraw = function(canvas) {
        mBgDrawable.setBounds(0, 0, this.getMeasuredWidth(), this.getMeasuredHeight());
        mBgDrawable.draw(canvas);
    };
}

var MDialog = new _MDialog();
function _MDialog() {
    LinearLayout.apply(this, []);

    this.setTag("MDialog");
    this.setBackgroundColor(0xffffffff);
    this.setCornerSize(2);
    this.setBoxShadow(0, 4, 16, 8, 0x33000000);
    this.setPadding(24);

    var mSelf = this;
    var mOkAction = null;
    var mCancelAction = null;

    var mMask = new View();
    mMask.setBackgroundColor(0x66000000);

    var mTitle = new TextView();
    mTitle.setTextColor(0xff212121);
    mTitle.setTextSize(24);
    var titleLp = new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT);
    titleLp.bottomMargin = 20;

    var mMsg = new TextView();
    mMsg.setTextColor(0xff424242);
    mMsg.setTextSize(14);
    this.addView(mMsg);

    var mButtonarea = new LinearLayout();
    mButtonarea.setOrientation(LinearLayout.HORIZONTAL);
    var buttonareaLp = new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT);
    buttonareaLp.setMargins(0, 24, -16, -16);
    this.addView(mButtonarea, buttonareaLp);

    var paddingView = new View();
    var paddingLp = new LayoutParams(0, 36);
    paddingLp.weight = 1;
    mButtonarea.addView(paddingView, paddingLp);

    var btnLp = new LayoutParams(80, 36);

    var mCancel = new MButton();
    mCancel.setText("cancel");
    mCancel.setBoxShadow(0, 0, 0, 0, 0);
    mCancel.setDimBg(false);
    mCancel.setOnClickListener(function() {
        mSelf.hide();
        if (mCancelAction) {
            mCancelAction.call(this);
        }
    });
    mButtonarea.addView(mCancel, btnLp);

    var mOk = new MButton();
    mOk.setBoxShadow(0, 0, 0, 0, 0);
    mOk.setText("ok");
    mOk.setDimBg(false);
    mOk.setOnClickListener(function() {
        mSelf.hide();
        if (mOkAction) {
            mOkAction.call(this);
        }
    });
    mButtonarea.addView(mOk, btnLp);

    this.setOkText = function(t) {
        mOk.setText(t);
        return this;
    };

    this.setCancelText = function(t) {
        mCancel.setText(t);
        return this;
    };

    this.setTitle = function(t) {
        mTitle.setText(t);
        this.addView(mTitle, 0, titleLp);
        return this;
    };

    this.setMsg = function(msg) {
        mMsg.setText(msg);
        return this;
    };

    this.setOkAction = function(action) {
        mOkAction = action;
        return this;
    };

    this.setCancelAction = function(action) {
        mCancelAction = action;
        return this;
    };

    this.show = function() {
        var maskLp = new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.FILL_PARENT);
        mRootView.addView(mMask, maskLp);

        var lp = new LayoutParams(336, LayoutParams.WRAP_CONTENT);
        lp.gravity = Gravity.CENTER;
        mRootView.addView(this, lp);

        mMask.setAlpha(0);
        var a = new AlphaAnimation(0, 1);
        a.setDuration(200);
        mMask.startAnimation(a);

        this.setAlpha(0);
        var a2 = new AlphaAnimation(0, 1);
        a2.setDuration(200);
        this.startAnimation(a2);
    };

    this.hide = function() {
        var a = new AlphaAnimation(1, 0);
        a.setDuration(200);
        mMask.startAnimation(a);

        var a2 = new AlphaAnimation(1, 0);
        a2.setDuration(200);
        a2.setAnimationEndListener(function() {
            mRootView.removeView(mMask);
            mRootView.removeView(mSelf);
            mSelf.removeView(mTitle);
            mOkAction = null;
            mCancelAction = null;
        });
        this.startAnimation(a2);
    };
}

function MEditText() {
    ViewGroup.apply(this, []);

    this.LABEL_SIZE = 12;
    this.TEXT_SIZE = 16;
    this.PADDING = 16;
    this.ERROR_SIZE = 12;
    this.GAP = 8;
    this.TEXT_AREA_HEIGHT = 100;

    var self = this;
    var hint = "";
    var focused;
    var disabled = false;
    var textsize = this.TEXT_SIZE;
    var isError = false;
    var isSingleLine = true;
    var focusListener = null;
    var textChangeListener = null;
    var highlightColor = 0xFF2196F2;
    var textColor = 0xff212121;
    var maxCount = 0;

    this.setTag("MEditText");

    var makeEditText = function() {
        edittext.setHintText(hint);
        edittext.setTextSize(textsize);
        edittext.setHintColor(0xffbcbcbc);
    };

    var updateCountView = function() {
        var curCount = edittext.getText().length;
        countView.setText(curCount + "/" + maxCount);
        if (maxCount > 0 && curCount > maxCount) {
            self.setError(true);
        } else {
            self.setError(false);
        }
    };

    var updateLine = function() {
        if (disabled) {
            line.setStyle("border-top", "#bcbcbc 1px dashed");
        } else if (isError) {
            line.setStyle("border-top", "#dd3226 2px solid");
        } else if (focused) {
            line.setStyle("border-top", Utils.toCssColor(highlightColor) + " 2px solid");
        } else {
            line.setStyle("border-top", "#bcbcbc 1px solid");
        }
    };

    var updateTextColor = function() {
        if (isError) {
            label.setTextColor(0xffdd3226);
            countView.setTextColor(0xffdd3226);
        } else if (disabled) {
            label.setTextColor(0xffbcbcbc);
            edittext.setTextColor(0xffbcbcbc);
            countView.setTextColor(0xffbcbcbc);
        } else if (focused) {
            label.setTextColor(highlightColor);
            countView.setTextColor(0xff757575);
        } else {
            label.setTextColor(0xff757575);
            countView.setTextColor(0xff757575);
            edittext.setTextColor(textColor);
        }
    };

    this.isError = function() {
        return isError;
    };

    this.setMaxCount = function(count) {
        if (count > 0) {
            maxCount = count;
            countView.setVisibility(View.VISIBLE);
            updateCountView();
        }
    };

    this.setHighlightColor = function(c) {
        highlightColor = c;
    };

    this.setDisabled = function(d) {
        disabled = d;
        edittext.setDisabled(d);
        updateLine();
        updateTextColor();
    };

    this.setText = function(t) {
        edittext.setText(t);
        label.setText(hint);
        updateCountView();
    };

    this.setOnFocusChangeListener = function(l) {
        focusListener = l;
    };

    this.setTextChangedListener = function(l) {
        textChangeListener = l;
    };

    this.setPassword = function(isPassword) {
        edittext.setPassword(isPassword);
    };

    this.setTextSize = function(ts) {
        textsize = ts;
        edittext.setTextSize(ts);
    };

    this.setHint = function(t) {
        this.setHintText(t);
    };

    this.setHintText = function(t) {
        hint = t;
        edittext.setHintText(t);
    };

    this.setError = function(iserror, msg) {
        if (disabled) {
            return;
        }
        isError = iserror;
        if (isError && msg != undefined) {
            errorMsg.setText(msg);
        } else {
            errorMsg.setText("");
        }
        updateLine();
        updateTextColor();
        this.requestLayout();
    };

    this.setSingleLine = function(s) {
        isSingleLine  = s;
        edittext.setSingleLine(s);
        edittext.setText("");
        makeEditText();
    };

    var label = new TextView();
    label.setTextSize(12);
    this.addView(label);

    var t = null;

    var edittext = new EditText();
    makeEditText();
    edittext.setOnFocusChangeListener(function(f) {
        if (focusListener != null) {
            focusListener.call(this, f);
        }
        focused = f;
        if (f) {
            if (edittext.getText() == "") {
                edittext.setHintText("");
                label.setText(hint);
                t = new TranslateAnimation(0, 0, 8, 0);
                t.setDuration(100);
                t.setAnimationEndListener(function() {
                    updateTextColor();
                    label.setText(hint);
                });
                label.startAnimation(t);
            }
        } else {
            if (edittext.getText() == "") {
                t = new TranslateAnimation(0, 0, 0, 8);
                t.setDuration(100);
                t.setAnimationEndListener(function(){
                    edittext.setHintText(hint);
                    label.setText("");
                });
                label.startAnimation(t);
            }
        }
        updateLine();
        updateTextColor();
        self.requestLayout();
    });
    edittext.setTextChangedListener(function() {
        updateCountView();
        if (textChangeListener != null) {
            textChangeListener.call(this);
        }
    });
    this.addView(edittext);

    var errorMsg = new TextView();
    errorMsg.setTextSize(12);
    errorMsg.setTextColor(0xFFDD3226);
    this.addView(errorMsg);

    var countView = new TextView();
    countView.setTextSize(12);
    countView.setVisibility(View.GONE);
    countView.setGravity(Gravity.RIGHT);
    this.addView(countView);

    var line = new View();
    this.addView(line);

    updateLine();
    updateTextColor();

    this.getText = function() {
        return edittext.getText();
    };

    this.onMeasure = function(widthMS, heightMS) {
        var width = MeasureSpec.getSize(widthMS);
        var contentWidth = width;

        measureTextView(label, contentWidth, this.LABEL_SIZE);
        measureTextView(errorMsg, contentWidth, this.LABEL_SIZE);
        measureTextView(countView, contentWidth, this.LABEL_SIZE);

        var height = 0;
        if (isSingleLine) {
            height = this.PADDING * 2 + this.GAP * 2 + this.ERROR_SIZE + this.LABEL_SIZE + 2 + textsize + 2;
            edittext.measure(MeasureSpec.makeMeasureSpec(contentWidth, MeasureSpec.EXACTLY),
                MeasureSpec.makeMeasureSpec(height, MeasureSpec.EXACTLY));
        } else {
            height = this.PADDING * 2 + this.GAP * 2 + this.ERROR_SIZE + this.LABEL_SIZE + 2 + this.TEXT_AREA_HEIGHT + 2;
            edittext.measure(MeasureSpec.makeMeasureSpec(contentWidth, MeasureSpec.EXACTLY),
                MeasureSpec.makeMeasureSpec(this.TEXT_AREA_HEIGHT, MeasureSpec.EXACTLY));
        }

        line.measure(contentWidth, 2);

        this.setMeasuredDimension(width, height);
    };

    this.onLayout = function(x, y) {
        var offsetX = 0;
        var offsetY = this.PADDING;
        label.layout(offsetX, offsetY - 2);

        offsetY = this.PADDING + 10 + this.GAP;
        if (isSingleLine) {
            edittext.layout(offsetX, 0);
        } else {
            edittext.layout(offsetX, offsetY);
        }
        offsetY = this.getMeasuredHeight() - this.ERROR_SIZE - this.GAP;
        errorMsg.layout(offsetX, offsetY - 2);
        countView.layout(offsetX, offsetY - 2);

        offsetY = this.getMeasuredHeight() - this.ERROR_SIZE - this.GAP * 2 - line.getMeasuredHeight();
        line.layout(offsetX, offsetY);
    };

    function measureTextView(view, width, height) {
        view.measure(MeasureSpec.makeMeasureSpec(width, MeasureSpec.EXACTLY),
            MeasureSpec.makeMeasureSpec(height, MeasureSpec.AT_MOST));
    }
}

function MSelectionButton() {
    LinearLayout.apply(this, []);

    this.setTag("MSelectionButton");

    this.WIDTH = 160;
    this.HEIGHT = 48;

    var self = this;
    var width = this.WIDTH;
    var isMenuShow = false;
    var mask = new View();
    var menuPanel = new MenuPanel();
    var items = [];
    var selectIndex = 0;

    var selectedItem = new SelectedItem();
    selectedItem.setOnClickListener(function(){
        self.showMenu();
    });
    this.addView(selectedItem);

    var line = new View();
    line.setBackgroundColor(0xffbcbcbc);
    this.addView(line);

    this.addMenuItem = function(text) {
        items.push(text);
        menuPanel.makeMenu();
        this.setSelect(selectIndex);
    };

    this.setSelect = function(index) {
        selectIndex = index;
        selectedItem.setText(items[index]);
    };

    this.setWidth = function(w) {
        width = w;
    };

    this.showMenu = function() {
        if (isMenuShow) {
            return;
        }

        mask.setOnClickListener(function(){
            self.hideMenu();
        });
        var maskLp = new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.FILL_PARENT);
        mRootView.addView(mask, maskLp);

        var lp = new LayoutParams(width, LayoutParams.WRAP_CONTENT);
        var offset = Utils.getOffset(this.getDiv());
        menuPanel.makeMenu();
        menuPanel.setAlpha(0);
        lp.leftMargin = offset.left;
        lp.topMargin = offset.top - 8;
        mRootView.addView(menuPanel, lp);
        isMenuShow = true;

        var a = new AlphaAnimation(0, 1);
        a.setDuration(100);
        menuPanel.startAnimation(a);
    };

    this.hideMenu = function() {
        var a = new AlphaAnimation(1, 0);
        a.setDuration(100);
        a.setAnimationEndListener(function() {
            mRootView.removeView(mask);
            mRootView.removeView(menuPanel);
            isMenuShow = false;
        });
        menuPanel.startAnimation(a);
    };

    this.onMeasure = function(widthMS, heightMS) {
        selectedItem.measure(MeasureSpec.makeMeasureSpec(width, MeasureSpec.EXACTLY),
            MeasureSpec.makeMeasureSpec(this.HEIGHT, MeasureSpec.EXACTLY));
        line.measure(MeasureSpec.makeMeasureSpec(width, MeasureSpec.EXACTLY),
            MeasureSpec.makeMeasureSpec(1, MeasureSpec.EXACTLY));
        this.setMeasuredDimension(width, this.HEIGHT);
    };

    this.onLayout = function() {
        var offsetX = 0;
        var offsetY = 0;
        selectedItem.layout(offsetX, offsetY);

        offsetY = this.getMeasuredHeight() - line.getMeasuredHeight();
        line.layout(offsetX, offsetY);
    };

    function SelectedItem() {
        LinearLayout.apply(this, []);

        this.setWillNotDraw(false);

        var content = new LinearLayout();
        content.setOrientation(LinearLayout.HORIZONTAL);
        var contentLp = new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.FILL_PARENT);
        this.addView(content, contentLp);

        var textView = new TextView();
        textView.setTextSize(textSize);
        textView.setTextColor(textColor);
        textView.setPadding(padding, 0, 0, 0);
        textView.setGravity(Gravity.LEFT | Gravity.CENTER_VERTICAL);
        var textLp = new LayoutParams(0, LayoutParams.FILL_PARENT);
        textLp.weight = 1;
        content.addView(textView, textLp);

        this.setText = function(text) {
            textView.setText(text);
        };

        this.onDraw = function(canvas) {
            var w = this.getMeasuredWidth();
            var h = this.getMeasuredHeight();
            var s = 6;
            var x = (w - h) + (h / 2) - 10;
            var y = (h - s) / 2;
            canvas.fillStyle = "#bcbcbc";
            canvas.beginPath();
            canvas.moveTo(x, y);
            canvas.lineTo(x + s * 2, y);
            canvas.lineTo(x + s, y + s);
            canvas.closePath();
            canvas.fill();
        };
    }

    function MenuPanel() {
        LinearLayout.apply(this, []);

        this.setBackgroundColor(0xffffffff);
        this.setBoxShadow(0, 1, 2, 1, 0x33000000);
        this.setPadding(0, 8, 0, 8);

        var buttonView = new LinearLayout();
        buttonView.setOrientation(LinearLayout.VERTICAL);
        var buttonViewLp = new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT);
        this.addView(buttonView, buttonViewLp);

        var buttonLp = new LayoutParams(LayoutParams.FILL_PARENT, buttonHeight);

        this.makeMenu = function() {
            buttonView.removeAllViews();
            this.addMenuItem(selectIndex);
            for (var i = 0; i < items.length; i++) {
                if (i != selectIndex) {
                    this.addMenuItem(i);
                }
            }
        };

        this.addMenuItem = function(index) {
            var buttonLp = new LayoutParams(LayoutParams.FILL_PARENT, 48);
            var button = createButton(items[index]);
            button.setId(index);
            button.setOnClickListener(function () {
                self.setSelect(this.getId());
                self.hideMenu();
            });
            buttonView.addView(button, buttonLp);
        };

        var createButton = function(text) {
            var b = new MButton();
            b.setText(text);
            b.setTextColor(textColor);
            b.setTextSize(textSize);
            b.setBoxShadow(0,0,0,0);
            b.setPadding(padding, 0, 0, 0);
            b.setGravity(Gravity.LEFT | Gravity.CENTER_VERTICAL);
            b.setBackgroundColor(0x00000000);
            b.setCornerSize(0);
            return b;
        };
    }
}

function WaveDrawable() {
    Drawable.apply(this, []);

    this.waveDuration = 500;

    var mWaveProcessor = new Processor();

    var mCurrentState = View.VIEW_STATE_ENABLED;
    var mX = 0;
    var mY = 0;
    var mDimBg = true;
    var maxRadius = 9999;
    var mWaveColor = 0x25191919;
    var mBgColor = 0x33191919;

    this.onStateChange = function(state) {
        if (mCurrentState != View.VIEW_STATE_PRESSED && state == View.VIEW_STATE_PRESSED) {
            mWaveProcessor.startProcess(0, 1, this.waveDuration);
        }
        mCurrentState = state;
        this.invalidateSelf();
    };

    this.setX = function(x) {
        mX = x;
    };

    this.setY = function(y) {
        mY = y;
    };

    this.setDimBg = function(isDimBg) {
        mDimBg = isDimBg;
    };

    this.setWaveColor = function(color) {
        mWaveColor = color;
    };

    this.setMaxRadius = function(r) {
        maxRadius = r;
    };

    this.draw = function(canvas) {
        if (mCurrentState == View.VIEW_STATE_PRESSED) {
            this.drawPress(canvas);
        } else if (mCurrentState == View.VIEW_STATE_ENABLED) {
            this.drawEnable(canvas);
        }
        this.computeAnimation();
    };

    this.computeAnimation = function() {
        if (mWaveProcessor.computeProcessOffset()) {
            this.invalidateSelf();
        }
    };

    this.drawPress = function(canvas) {
        var b = this.getBounds();

        if (mDimBg) {
            canvas.fillStyle = Utils.toCssColor(mWaveColor);
            canvas.fillRect(b.left, b.top, b.width(), b.height());
        }

        var offsetX = b.left + mX;
        var offsetY = b.top + mY;
        var radius = b.height() / 2 + b.width() * mWaveProcessor.getCurrProcess() * 2;
        radius = radius / 2;
        radius = Math.min(radius, maxRadius);
        canvas.beginPath();
        canvas.arc(offsetX, offsetY, radius, 0, Math.PI * 2, true);
        canvas.closePath();
        canvas.fillStyle = Utils.toCssColor(mWaveColor);
        canvas.fill();
    };

    this.drawEnable = function(canvas) {

    };
}

function MRadioGroup() {
    LinearLayout.apply(this, []);

    var mSelf = this;
    var mCheckedId = -1;
    var mOnCheckedChangeListener = null;

    this.addChild = function(child, indexOrParams, params) {
        if (child.isChecked()) {
            if (mCheckedId != -1) {
                setCheckedStateForView(mCheckedId, false);
            }
            setCheckedId(child.getId());
        }
        child.setCheckedListener(function() {
            mSelf.check(child.getId());
        });
        this.addView(child, indexOrParams, params);
    };

    /**
     * <p>Register a callback to be invoked when the checked radio button
     * changes in this group.</p>
     *
     * @method setOnCheckedChangeListener
     */
    this.setOnCheckedChangeListener = function(l) {
        mOnCheckedChangeListener = l;
    };

    /**
     * <p>Sets the selection to the radio button whose identifier is passed in
     * parameter. Using -1 as the selection identifier clears the selection;
     *
     * @method
     * @param id the unique id of the radio button to select in this group
     */
    this.check = function(id) {
        // don't even bother
        if (id != -1 && (id == mCheckedId)) {
            return;
        }
        if (mCheckedId != -1) {
            setCheckedStateForView(mCheckedId, false);
        }
        if (id != -1) {
            setCheckedStateForView(id, true);
        }
        setCheckedId(id);
    };

    /**
     * <p>Returns the identifier of the selected radio button in this group.
     * Upon empty selection, the returned value is -1.</p>
     *
     * @method getCheckedRadioButtonId
     * @return the unique id of the selected radio button in this group
     *
     */
    this.getCheckedRadioButtonId = function() {
        return mCheckedId;
    };

    /**
     * <p>Clears the selection. When the selection is cleared, no radio button
     * in this group is selected and {@link #getCheckedRadioButtonId()} returns
     * null.</p>
     *
     * @method clearCheck
     */
    this.clearCheck = function() {
        this.check(-1);
    };

    function setCheckedId(id) {
        mCheckedId = id;
        if (mOnCheckedChangeListener != null) {
            mOnCheckedChangeListener.call(this, mCheckedId);
        }
    }

    function setCheckedStateForView(viewId, checked) {
        var checkedView = mSelf.findViewById(viewId);
        if (checkedView != null) {
            checkedView.setChecked(checked);
        }
    }
}

function MRadioButton() {
    ViewGroup.apply(this, []);

    this.HEIGHT = 48;

    var mSelf = this;
    var mColor = 0xff009688;
    var mChecked = false;

    var mCheckedListener = null;

    var mRadioCheck = new LRadioCheck();
    mRadioCheck.setOnClickListener(onclick);
    this.addView(mRadioCheck);

    var mText = new TextView();
    mText.setTextSize(16);
    mText.setTextColor(0xff212121);
    mText.setPadding(4);
    mText.setGravity(Gravity.LEFT | Gravity.CENTER_VERTICAL);
    this.addView(mText);

    this.setOnClickListener(onclick);

    this.setColor = function(c) {
        mColor = c;
    };

    this.setText = function(text) {
        mText.setText(text);
    };

    this.isChecked = function() {
        return mChecked;
    };

    this.setChecked = function(checked) {
        mChecked = checked;
        mRadioCheck.setChecked(checked);
    };

    this.setCheckedListener = function(l) {
        mCheckedListener = l;
    };

    this.onTouchEvent = function(ev) {
        mRadioCheck.onTouchEvent(ev);
        mRadioCheck.getBgDrawable().setX(48);
    };

    this.onMeasure = function(widthMS, heightMS) {
        var width = MeasureSpec.getSize(widthMS);
        var height = this.HEIGHT;

        mRadioCheck.measure(50, 48);
        mText.measure(width - 50, MeasureSpec.makeMeasureSpec(48, MeasureSpec.EXACTLY));

        this.setMeasuredDimension(width, height);
    };

    this.onLayout = function(x, y) {
        var offsetX = 0;
        var offsetY = 0;
        mRadioCheck.layout(offsetX, offsetY);

        offsetX += 50;
        mText.layout(offsetX, offsetY);
    };

    function onclick() {
        mSelf.setChecked(!mChecked);
        if (mCheckedListener != null) {
            mCheckedListener.call(mSelf, mChecked);
        }
    }

    function LRadioCheck() {
        View.apply(this, []);

        var mBgDrawable = new WaveDrawable();
        mBgDrawable.setCallback(this);

        this.setWillNotDraw(false);
        this.setCornerSize(24);

        this.getBgDrawable = function() {
            return mBgDrawable;
        };

        this.setChecked = function(check) {
            var r = Color.red(mColor);
            var g = Color.green(mColor);
            var b = Color.blue(mColor);
            mBgDrawable.setWaveColor(Color.argb(25, r, g, b));
            this.postInvalidate();
        };

        this.onTouchEvent = function(ev) {
            switch (ev.getAction()) {
                case MotionEvent.ACTION_DOWN:
                    mBgDrawable.setState(View.VIEW_STATE_PRESSED);
                    mBgDrawable.setX(ev.getX());
                    mBgDrawable.setY(ev.getY());
                    break;
                case MotionEvent.ACTION_CANCEL:
                case MotionEvent.ACTION_UP:
                    mBgDrawable.setState(View.VIEW_STATE_ENABLED);
                    break;
            }
        };

        this.onDraw = function(canvas) {
            if (mChecked) {
                canvas.strokeStyle = Utils.toCssColor(mColor);
                canvas.fillStyle = Utils.toCssColor(mColor);
            } else {
                canvas.strokeStyle = Utils.toCssColor(0x88000000);
                canvas.fillStyle = Utils.toCssColor(0x88000000);
            }
            canvas.lineWidth = "2";
            canvas.beginPath();
            canvas.arc(24, 24, 9, 0, Math.PI * 2, false);
            canvas.closePath();
            canvas.stroke();

            canvas.beginPath();
            canvas.arc(24, 24, 5, 0, Math.PI * 2, false);
            canvas.closePath();
            canvas.fill();

            mBgDrawable.setBounds(0, 0, this.getMeasuredWidth(), this.getMeasuredHeight());
            mBgDrawable.draw(canvas);
        };
    }
}

/**
 *
 * A button with two states, checked and unchecked. When the button is pressed
 * or clicked, the state changes automatically.
 *
 * @class MToggleButton
 * @extends Button
 */
function MToggleButton() {
    View.apply(this, []);

    var mPaddingX = 24;
    var mTrackRadius = 8;
    var mSelf = this;
    var mChecked;
    var mOnCheckedChangeListener;
    var mDownX;
    var mColor;
    var mBgColor;
    var mProcessor = new Processor();
    var mDistance;
    var mRadius;

    var mWaveDrawable = new WaveDrawable();
    mWaveDrawable.setDimBg(false);
    mWaveDrawable.setX(24);
    mWaveDrawable.setY(24);
    mWaveDrawable.setMaxRadius(24);
    mWaveDrawable.setCallback(this);

    this.setClickable(true);
    this.setWillNotDraw(false);
    this.setBackgroundColor(0x00000000);

    mProcessor.setProcessListener(function() {
        if (mProcessor.getCurrProcess() < 0.5) {
            mChecked = false
        } else {
            mChecked = true;
        }

        if (mOnCheckedChangeListener != null) {
            mOnCheckedChangeListener.call(mSelf, mChecked);
        }
    });

    function refreshColors() {
        if (mProcessor.getCurrProcess() == 0) {
            mColor = 0xfffafafa;
            mBgColor = 0x42000000;
            mWaveDrawable.setWaveColor(0x33000000);
        } else {
            mColor = 0xff009688;
            var r = Color.red(mColor);
            var g = Color.green(mColor);
            var b = Color.blue(mColor);
            mBgColor = Color.argb(128, r, g, b);
            mWaveDrawable.setWaveColor(Color.argb(50, r, g, b));
        }
    }

    /**
     * Register a callback to be invoked when the checked state of this button
     * changes.
     *
     * @method setOnCheckedChangeListener
     * @param listener the callback to call on checked state change
     */
    this.setOnCheckedChangeListener = function (listener) {
        mOnCheckedChangeListener = listener;
    };

    /**
     * return the checked state of this button.
     *
     * @method isChecked
     * @return {boolean} the checked state of this button.
     */
    this.isChecked = function() {
        return mChecked;
    };

    function setCurrProcess(process) {
        mProcessor.setCurrProcess(process);
        mSelf.postInvalidate();
    }

    function isClick(ev) {
        var deltaX = Math.abs(mDownX - ev.getX());
        if (deltaX < 3) {
            return true;
        }
        return false;
    }

    /**
     * Changes the checked state of this button.The default state is true.
     *
     * @method setChecked
     * @param {boolean} checked true to check the button, false to uncheck it
     */
    this.setChecked = function (checked) {
        mChecked = checked;
        if (checked) {
            mProcessor.setCurrProcess(1);
        } else {
            mProcessor.setCurrProcess(0);
        }
        mSelf.postInvalidate();
        refreshColors();
    };

    this.setChecked(false);

    this.onMeasure = function(widthMS, heightMS) {
        var trackWidth = 24 - mTrackRadius;
        var width = trackWidth + 48;
        var height = 48;
        this.setMeasuredDimension(width, height);
    };

    this.onDraw = function(canvas) {
        var w = mSelf.getMeasuredWidth();
        var h = mSelf.getMeasuredHeight();
        var p = mProcessor.getCurrProcess();
        var offsetX;
        var offsetY;
        mRadius = 10;
        mDistance = w - mPaddingX * 2;

        refreshColors();

        canvas.beginPath();
        canvas.lineWidth = mTrackRadius * 2;
        canvas.lineCap = 'round';
        canvas.moveTo(24, h / 2);
        canvas.lineTo(w - 24, h / 2);
        canvas.strokeStyle = Utils.toCssColor(mBgColor);
        canvas.stroke();


        offsetX = mPaddingX + mDistance *  p;
        offsetY = h / 2;
        canvas.shadowOffsetX = 0;
        canvas.shadowOffsetY = 0;
        canvas.shadowBlur = 3;
        canvas.shadowColor = Utils.toCssColor(0x66000000);
        canvas.beginPath();
        canvas.arc(offsetX, offsetY, mRadius, 0, Math.PI * 2, true);
        canvas.closePath();
        canvas.fillStyle = Utils.toCssColor(mColor);
        canvas.fill();

        mWaveDrawable.setBounds(offsetX - 24, offsetY - 24, offsetX + 24, offsetY + 24);
        mWaveDrawable.draw(canvas);

        if (mProcessor.computeProcessOffset()) {
            mSelf.postInvalidate();
        }
    };

    this.onTouchEvent = function(ev) {
        var w = mSelf.getMeasuredWidth();

        var process = 0;
        if (mChecked) {
            process = 1 - (mDownX - ev.getX()) / mDistance;
        } else {
            process = (ev.getX() - mDownX) / mDistance;
        }
        process = Math.max(0, process);
        process = Math.min(1, process);
        switch (ev.getAction()) {
            case MotionEvent.ACTION_DOWN:
                mWaveDrawable.setState(View.VIEW_STATE_PRESSED);
                mDownX = ev.getX();
                break;
            case MotionEvent.ACTION_MOVE:

                if (!isClick(ev)) {
                    setCurrProcess(process);
                }
                break;
            case MotionEvent.ACTION_UP:
            case MotionEvent.ACTION_CANCEL:
                mWaveDrawable.setState(View.VIEW_STATE_ENABLED);
                if (isClick(ev)) {
                    if (mChecked) {
                        mProcessor.startProcess(1, 0, 100);
                    } else {
                        mProcessor.startProcess(0, 1, 100);
                    }
                } else {
                    if (process > 0.5) {
                        mChecked = true;
                        mProcessor.startProcess(process, 1.0, (1 - process) * 100);
                    } else {
                        mChecked = false;
                        mProcessor.startProcess(process, 0, process * 100);
                    }
                }
                if (mProcessor.computeProcessOffset()) {
                    mSelf.postInvalidate();
                }
                break;
            default:
                break;
        }
    };
}

var LSnackBar = new _LSnackbar();
function _LSnackbar() {
    ViewGroup.apply(this, []);
    var MAX_WIDTH = 568;
    var MIN_WIDTH = 288;
    var HEIGHT = 48;
    var TEXT_SIZE = 14;
    var mSelf = this;
    var mShowing = false;

    var hide = function() {
        console.log("hide snackbar");
        var t = new TranslateAnimation(0, 0, 0, HEIGHT);
        t.setDuration(200);
        t.setAnimationEndListener(function() {
            mRootView.removeView(mSelf);
            mShowing = false;
        });
        mSelf.startAnimation(t);
    };

    this.setTag("SnackBar");
    this.setCornerSize(2);
    this.setBackgroundColor(0xff323232);

    var content = new TextView();
    content.setSingleLine(true);
    content.setTextSize(TEXT_SIZE);
    content.setTextColor(0xffffffff);
    content.setPadding(24, 0, 0, 0);
    content.setGravity(Gravity.LEFT | Gravity.CENTER_VERTICAL);
    this.addView(content);

    this.show = function(text, time) {
        if (mShowing == true) {
            return;
        }
        console.log("show snackbar");
        mShowing = true;
        content.setText(text);
        var lp = new LayoutParams(LayoutParams.WRAP_CONTENT, LayoutParams.WRAP_CONTENT);
        lp.gravity = Gravity.BOTTOM | Gravity.CENTER_HORIZONTAL;
        mRootView.addView(this, lp);
        var t = new TranslateAnimation(0, 0, HEIGHT, 0);
        t.setDuration(200);
        this.startAnimation(t);

        var duration = 2500;
        if (time != undefined) {
            duration = time;
        }
        this.postDelayed(function() {
            hide();
        }, duration);
    };

    this.onMeasure = function(widthMS, heightMS) {
        var width = MeasureSpec.getSize(widthMS);
        width = Math.min(width, MAX_WIDTH);

        content.measure(MeasureSpec.makeMeasureSpec(width, MeasureSpec.UNSPECIFIED),
            MeasureSpec.makeMeasureSpec(HEIGHT, MeasureSpec.EXACTLY));


        this.setMeasuredDimension(content.getMeasuredWidth(), HEIGHT);
    };

    this.onLayout = function(x, y) {
        content.layout(0, 0);
    };
}

