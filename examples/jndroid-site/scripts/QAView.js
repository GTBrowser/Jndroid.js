/**
 * Created by lency on 5/26/15.
 */
function QAView()
{
    ScrollView.apply(this, []);

    this.setBackgroundColor(CARD_BG_COLOR);

    var contentView = new LinearLayout();
    this.addView(contentView);

    var comment1 = new Comment('images/ganlu.png','甘露大神','我从未见过有如此厚颜无耻之人!');
    var lp = new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT);
    lp.setMargins(8);
    contentView.addView(comment1, lp);

}