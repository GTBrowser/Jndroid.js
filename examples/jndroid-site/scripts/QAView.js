/**
 * Created by lency on 5/26/15.
 */
function QAView()
{
    ScrollView.apply(this, []);

    this.setBackgroundColor(CARD_BG_COLOR);

    var contentView = new LinearLayout();
    this.addView(contentView);

    var commentView = new CommentView();

    var lp = new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT);
    lp.setMargins(8);

    contentView.addView(commentView);
}

function CommentView()
{
    ViewGroup.apply(this, []);

    this.setBackgroundColor(0xffffffff);
    this.setCornerSize(2, 2, 2, 2);
    this.setBoxShadow(0, 1, 2, 0, 0x66000000);


    var contentView = new LinearLayout();

    this.onMeasure = function(widthMS, heightMS){
        var width = MeasureSpec.getSize(widthMS);
        contentView.measure(widthMS, heightMS);

        var height = contentView.getMeasuredHeight();

        this.setMeasuredDimension(width, height);
    };

    this.onLayout = function(x, y){
        contentView.layout(0, 0);
    };

    var comment1 = new Comment('images/ganlu.png','甘露大神','我从未见过有如此厚颜无耻之人!');
    contentView.addView(comment1);
}