/**
 * Created by lency on 5/26/15.
 */
function Comment(avatar, name, text) {
    LinearLayout.apply(this, []);

    var ICON_AREA_WIDTH = 72;
    var ICON_SIZE = 40;
    var mEditHeight = 150;

    this.setOrientation(LinearLayout.HORIZONTAL);


    this.setEditHeight = function(h) {
        mEditHeight = h;
        this.requestLayout();
    };

    var iconArea = new FrameLayout();
    var iconAreaLp = new LayoutParams(ICON_AREA_WIDTH, ICON_AREA_WIDTH);
    this.addView(iconArea, iconAreaLp);

    var mAvatar = new ImageView();
    mAvatar.setImgSrc(avatar);
    mAvatar.setImgWidth(ICON_SIZE);
    mAvatar.setImgHeight(ICON_SIZE);
    mAvatar.setCornerSize(ICON_SIZE / 2);
    var avatarLp = new LayoutParams(ICON_SIZE, ICON_SIZE);
    avatarLp.gravity = Gravity.CENTER;
    iconArea.addView(mAvatar, avatarLp);

    var contentArea = new LinearLayout();
    var contentLp = new LayoutParams(0, LayoutParams.WRAP_CONTENT);
    contentLp.weight = 1;
    this.addView(contentArea, contentLp);

    var mName = new TextView();
    mName.setText(name);
    mName.setTextSize(R.dimen.text);
    var namelp = new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT);
    namelp.topMargin = R.dimen.padding;
    contentArea.addView(mName, namelp);

    var mComment = new TextView();
    mComment.setText(text);
    mComment.setTextSize(R.dimen.sub_text);
    mComment.setTextColor(R.color.sub_text);
    mComment.setLineHeight(R.dimen.text * 2);
    var commentlp = new LayoutParams(namelp);
    commentlp.topMargin = R.dimen.half_padding;
    commentlp.bottomMargin = R.dimen.padding;
    contentArea.addView(mComment, commentlp);

}