function LProgressBar() {
    View.apply(this, []);

    var HORIZONTAL_HEIGHT = 3;
    var SMALL_SIZE = 30;
    var LARGE_SIZE = 45;

    var mSelf = this;
    var mStyle = LProgressBar.Horizontal;
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
        if (mStyle == LProgressBar.Horizontal) {
            width = MeasureSpec.getSize(widthMS);
            height = HORIZONTAL_HEIGHT;
        } else if (mStyle == LProgressBar.Small) {
            width = SMALL_SIZE;
            height = SMALL_SIZE;
        } else if (mStyle == LProgressBar.Large) {
            width = LARGE_SIZE;
            height = LARGE_SIZE;
        }
        this.setMeasuredDimension(width, height);
    };

    this.onDraw = function(canvas) {
        if (mStyle == LProgressBar.Horizontal) {
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
Object.defineProperty(LProgressBar,"Horizontal",{value:0});
Object.defineProperty(LProgressBar,"Small",{value:1});
Object.defineProperty(LProgressBar,"Large",{value:2});

function LButton() {
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

function LImageButton() {
    ImageButton.apply(this, []);
    var mId;

    var mBgDrawable = new WaveDrawable();
    mBgDrawable.setCallback(this);

    this.setWillNotDraw(false);

    this.setDimBg = function(dimBg) {
        mBgDrawable.setDimBg(dimBg);
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

var LDialog = new _LDialog();
function _LDialog() {
    LinearLayout.apply(this, []);

    this.setTag("LDialog");
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

    var mCancel = new LButton();
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

    var mOk = new LButton();
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

function LEditText() {
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
    var maxCount = 0;

    this.setTag("LEditText");

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
            LeUI.measureExactly(edittext, contentWidth, height);
        } else {
            height = this.PADDING * 2 + this.GAP * 2 + this.ERROR_SIZE + this.LABEL_SIZE + 2 + this.TEXT_AREA_HEIGHT + 2;
            LeUI.measureExactly(edittext, contentWidth, this.TEXT_AREA_HEIGHT);
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

function LSelectionButton() {
    LinearLayout.apply(this, []);

    this.setTag("LSelectionButton");

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
            var b = new LButton();
            b.setText(text);
            b.setTextColor(textColor);
            b.setTextSize(textSize);
            b.setBoxShadow(0,0,0,0);
            b.setPadding(padding, 0, 0, 0);
            b.setGravity(Gravity.LEFT | Gravity.CENTER_VERTICAL);
            b.setBackgroundColor(0x00000000);
            b.setCornerSize(0);
            return b;
        }
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
            canvas.fillStyle = Utils.toCssColor(0x33191919);
            canvas.fillRect(b.left, b.top, b.width(), b.height());
        }

        var offsetX = mX;
        var offsetY = mY;
        var radius = b.height() + b.width() * mWaveProcessor.getCurrProcess() * 2;
        radius = radius / 2;
        radius = Math.min(radius, maxRadius);
        canvas.beginPath();
        canvas.arc(offsetX, offsetY, radius, 0, Math.PI * 2, true);
        canvas.closePath();
        canvas.fillStyle = Utils.toCssColor(0x25191919);
        canvas.fill();
    };

    this.drawEnable = function(canvas) {

    };
}

