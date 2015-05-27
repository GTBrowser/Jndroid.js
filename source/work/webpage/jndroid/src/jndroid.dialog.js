function DialogButton() {
    ViewGroup.apply(this, []);

    var mSelf = this;

    var mText = new TextView();
    mText.setTextSize(15);
    mText.setTextColor("#333333");
    mText.setGravity(Gravity.CENTER);
    this.addView(mText);

    this.setBackgroundColor("#fafafa");

    this.setText = function(text) {
        mText.setText(text);
    };

    this.onMeasure = function(width,height) {
        mText.measure(width, height);
        this.setMeasuredDimension(width, height);
    };

    this.onLayout = function(x, y) {
        var offsetX = 0;
        var offsetY = 0;
        mText.layout(offsetX, offsetY);
    };

    this.touchStart = function(event) {
        mSelf.setBackgroundColor("#efefef");
    };

    this.getDiv().addEventListener("touchstart", this.touchStart, false);

    this.touchEnd = function(event) {
        mSelf.setBackgroundColor("#fafafa");
    };

    this.getDiv().addEventListener("touchend", this.touchEnd, false);

    this.touchCancel = function(event) {
        mSelf.setBackgroundColor("#fafafa");
    };

    this.getDiv().addEventListener("touchcancel", this.touchCancel, false);
}

function Dialog() {
    this.DIALOG_WIDTH = 296;
    this.TITLE_HEIGHT = 72;
    this.BUTTON_HEIGHT = 52;
    this.CONTENT_PADDING_X = 20;
    this.MSG_PADDING_BOTTOM = 28;
    this.CORNER_SIZE = 3;
    this.LINE_WIDTH = 1;

    var mSelf = this;
    var mHasCancelButton = false;

    ViewGroup.apply(this, []);

    var mTitle = new TextView();
    mTitle.setGravity(Gravity.CENTER);
    mTitle.setTextSize(17);
    mTitle.setTextColor("#191919");
    this.addView(mTitle);

    var mMsgView = new TextView();
    mMsgView.setTextSize(14);
    mMsgView.setLineHeight(20);
    mMsgView.setTextColor("#666666");
    this.addView(mMsgView);

    mOkButton = new DialogButton();
    mOkButton.setText("ok");
    mOkButton.setCornerSize(0, 0, this.CORNER_SIZE, 0);
    this.addView(mOkButton);

    this.setWillNotDraw(false);
    this.setBackgroundColor("#f5f5f5");
    this.setCornerSize(this.CORNER_SIZE, this.CORNER_SIZE, this.CORNER_SIZE, this.CORNER_SIZE);

    this.setTitle = function(title) {
        mTitle.setText(title);
    };

    this.setMessage = function(msg) {
        mMsgView.setText(msg);
    };

    this.getMsgView = function() {
        return mMsgView;
    };

    this.getPositiveButton = function() {
        return mOkButton;
    };

    this.setPositiveButton = function(btnText, clickListener) {
        mOkButton.setText(btnText);
        mOkButton.setOnClickListener(clickListener);
    };

    this.setNegativeButton = function(btnText, clickListener) {
        mHasCancelButton = true;

        mCancelButton = new DialogButton();
        mCancelButton.setText(btnText);
        mCancelButton.setOnClickListener(clickListener);
        mCancelButton.setText("cancel");
        mCancelButton.setCornerSize(0, 0, 0, this.CORNER_SIZE);
        this.addView(mCancelButton);
    };

    this.onMeasure = function(widthSpec, heightSpec){
        mTitle.measure(this.DIALOG_WIDTH, MeasureSpec.makeMeasureSpec(this.TITLE_HEIGHT, MeasureSpec.EXACTLY));

        var contentWidth = this.DIALOG_WIDTH - this.CONTENT_PADDING_X * 2;
        mMsgView.measure(contentWidth, 0);

        if (mHasCancelButton) {
            var buttonWidth = (this.DIALOG_WIDTH - this.LINE_WIDTH) / 2;
            mOkButton.measure(buttonWidth, this.BUTTON_HEIGHT);
            mCancelButton.measure(buttonWidth, this.BUTTON_HEIGHT);
        } else {
            mOkButton.measure(this.DIALOG_WIDTH, this.BUTTON_HEIGHT);
        }

        var height = this.TITLE_HEIGHT + mMsgView.getMeasuredHeight() + this.MSG_PADDING_BOTTOM + this.BUTTON_HEIGHT;
        this.setMeasuredDimension(this.DIALOG_WIDTH, height);
    };

    this.onLayout = function(x,y) {
        var offsetX = 0;
        var offsetY = 0;
        mTitle.layout(offsetX, offsetY);

        offsetX = this.CONTENT_PADDING_X;
        offsetY += mTitle.getMeasuredHeight();
        mMsgView.layout(offsetX, offsetY);

        if (mHasCancelButton) {
            offsetX = 0;
            offsetY += mMsgView.getMeasuredHeight() + this.MSG_PADDING_BOTTOM;
            mCancelButton.layout(offsetX, offsetY);

            offsetX += mCancelButton.getMeasuredWidth() + this.LINE_WIDTH;
            mOkButton.layout(offsetX, offsetY);
        } else {
            offsetX = 0;
            offsetY += mMsgView.getMeasuredHeight() + this.MSG_PADDING_BOTTOM;
            mOkButton.layout(offsetX, offsetY);
        }
    };

    this.onDraw = function(canvas) {
        var width = this.getMeasuredWidth();
        var height = this.getMeasuredHeight();

        var offsetY = height - this.BUTTON_HEIGHT;
        canvas.strokeStyle = "rgb(234,234,234)";
        canvas.moveTo(0, offsetY);
        canvas.lineTo(width,offsetY);
        canvas.stroke();

        if (mHasCancelButton) {
            var offsetX = mCancelButton.getMeasuredWidth();
            canvas.moveTo(offsetX, offsetY);
            canvas.lineTo(offsetX, height);
            canvas.stroke();
        }
    };

    this.show = function(){
        showDialog(this);
    };

    this.dismiss = function() {
        dismissDialog(this);
    };
}

function WaitingDialog() {
    Dialog.apply(this, []);

    this.UI_WIDTH = 160;
    this.UI_HEIGHT = 100;
    this.ICON_WIDTH = 60;

    this.setWillNotDraw(true);
    this.setBackgroundColor(0x00000000);

    this.removeView(this.getPositiveButton());
    var mIcon = new ImageView();
    this.addView(mIcon);

    var rotate = new RotateAnimation(0, 7200);
    rotate.setDuration(10000);
    mIcon.setAnimation(rotate);
    rotate.start();

    var mText = this.getMsgView();
    mText.setGravity(Gravity.LEFT | Gravity.CENTER_VERTICAL);
    mText.setTextColor(0xffffffff);

    this.setIconSrc = function(src) {
        mIcon.setImgSrc(src);
    };

    this.onMeasure = function(widthMS, heightMS) {
        mIcon.measure(this.ICON_WIDTH, this.UI_HEIGHT);
        mText.measure(this.UI_WIDTH - this.ICON_WIDTH, MeasureSpec.makeMeasureSpec(this.UI_HEIGHT, MeasureSpec.EXACTLY));
        this.setMeasuredDimension(this.UI_WIDTH, this.UI_HEIGHT);
    };

    this.onLayout = function(x, y) {
        var offsetX = 0;
        var offsetY = 0;
        mIcon.layout(offsetX, offsetY);

        offsetX += this.ICON_WIDTH;
        mText.layout(offsetX, offsetY);
    };

    this.show = function() {
        showDialogWithoutAnim(this);
    };
}

function DialogLayout() {
    ViewGroup.apply(this, []);

    this.setBackgroundColor(0x66191919);

    this.onMeasure = function(widthMS, heightMS) {
        var width = MeasureSpec.getSize(widthMS);
        var height = MeasureSpec.getSize(heightMS);
        if (this.getChildCount() !== 0) {
            var child = this.getChildAt(0);
            child.measure(widthMS, heightMS);
        }
        this.setMeasuredDimension(width, height);
    };

    this.onLayout = function(x,y) {
        if (this.getChildCount() === 0) {
            return;
        }

        var child = this.getChildAt(0);
        var offsetX = (this.getMeasuredWidth() - child.getMeasuredWidth()) / 2;
        var offsetY = (this.getMeasuredHeight() - child.getMeasuredHeight()) / 2;
        child.layout(offsetX, offsetY);

    };

    //this.onDraw = function(canvas) {
    //    canvas.fillStyle = "rgba(0,0,0,0.2)";
    //    canvas.fillRect(0,0, this.getMeasuredWidth(), this.getMeasuredHeight());
    //}
}

var mDialogLayout = new DialogLayout();

function showDialogWithoutAnim(dialog) {
    mDialogLayout.addView(dialog);
    mDialogLayout.setVisibility(View.VISIBLE);
}

function showDialog(dialog) {
    mDialogLayout.addView(dialog);
    mDialogLayout.setVisibility(View.VISIBLE);

    var offsetY = (mDialogLayout.getMeasuredHeight() - dialog.getMeasuredHeight()) / 2;
    var translate = new TranslateAnimation(0,0,(mDialogLayout.getMeasuredHeight() - offsetY - dialog.getMeasuredHeight()),0);
    translate.setFillAfter(true);
    translate.setDuration(200);
    dialog.setAnimation(translate);
    translate.start();
}

function dismissDialog() {
    mDialogLayout.removeAllViews();
    mDialogLayout.setVisibility(View.GONE);
}
