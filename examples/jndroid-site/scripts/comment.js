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
    mName.setTextSize(TEXT_SIZE);
    var namelp = new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT);
    namelp.topMargin = PADDING;
    contentArea.addView(mName, namelp);

    var mComment = new TextView();
    mComment.setText(text);
    mComment.setTextSize(SUB_TEXT_SIZE);
    mComment.setTextColor(SUB_TEXT_COLOR);
    mComment.setLineHeight(TEXT_SIZE + TEXT_SIZE);
    var commentlp = new LayoutParams(namelp);
    commentlp.topMargin = 8;
    commentlp.bottomMargin = PADDING;
    contentArea.addView(mComment, commentlp);

}