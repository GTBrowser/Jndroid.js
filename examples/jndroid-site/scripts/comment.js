/**
 * Created by lency on 5/26/15.
 */
function Comment(avatar, name, text)
{
    ViewGroup.apply(this, []);

    var mEditHeight = 150;
    var mTitleHeight = 40;

    this.setEditHeight = function(h) {
        mEditHeight = h;
        this.requestLayout();
    };

    var mAvatar = new ImageView();
    mAvatar.setImgSrc(avatar);
    mAvatar.setImgWidth(mTitleHeight);
    mAvatar.setImgHeight(mTitleHeight);
    mAvatar.setCornerSize(mTitleHeight / 2, mTitleHeight / 2, mTitleHeight / 2, mTitleHeight / 2);
    this.addView(mAvatar);

    var mName = new TextView();
    mName.setText("---- by " + name);
    this.addView(mName);

    var mComment = new TextView();
    mComment.setText(text);
    mComment.setBorderBottom(1, DIVIDERS_COLOR);
    this.addView(mComment);

    this.onMeasure = function(widthMS, heightMS){
        var width = MeasureSpec.getSize(widthMS);
        var height = mEditHeight;

        mComment.measure(MeasureSpec.makeMeasureSpec(width - 2 * PADDING, MeasureSpec.EXACTLY),
            MeasureSpec.makeMeasureSpec(mEditHeight - mTitleHeight - 2 * PADDING, MeasureSpec.EXACTLY));

        mName.measure(MeasureSpec.makeMeasureSpec(width - 2 * PADDING, MeasureSpec.WRAP_CONTENT),
            MeasureSpec.makeMeasureSpec(mTitleHeight, MeasureSpec.EXACTLY));

        mAvatar.measure(MeasureSpec.makeMeasureSpec(mTitleHeight, MeasureSpec.EXACTLY),
            MeasureSpec.makeMeasureSpec(mTitleHeight, MeasureSpec.EXACTLY));

        this.setMeasuredDimension(width, height);
    };

    this.onLayout = function(x, y){
        mComment.layout(PADDING, PADDING);

        var width = mComment.getMeasuredWidth();

        mName.layout(width - mTitleHeight - 120, mEditHeight - mTitleHeight);
        mAvatar.layout(width - mTitleHeight, mEditHeight - mTitleHeight - PADDING / 2);
    };
}