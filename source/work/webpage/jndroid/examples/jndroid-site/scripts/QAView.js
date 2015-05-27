/**
 * Created by lency on 5/26/15.
 */
function QAView() {
    ScrollView.apply(this, []);

    this.setBackgroundColor(CARD_BG_COLOR);

    var contentView = new LinearLayout();
    this.addView(contentView);

    var commentTitle = new TextView();
    commentTitle.setText("Comments");
    commentTitle.setTextColor(THEME_COLOR);
    commentTitle.setTextSize(TITLE_SIZE);
    var titlelp = new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT);
    titlelp.topMargin = PARAGRAPH_PADDING_TOP;
    titlelp.leftMargin = PADDING;
    titlelp.bottomMargin = PADDING;
    contentView.addView(commentTitle, titlelp);

    var commentView = new CommentView();

    var lp = new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT);
    lp.setMargins(8);

    contentView.addView(commentView, lp);

    var question = new TextView();
    question.setText("Q&A");
    question.setTextColor(THEME_COLOR);
    question.setTextSize(TITLE_SIZE);
    contentView.addView(question, titlelp);

    var questionView = new QuestionView();
    contentView.addView(questionView, lp);
}

function CommentView() {
    LinearLayout.apply(this, []);

    this.setBackgroundColor(0xffffffff);
    this.setCornerSize(2, 2, 2, 2);
    this.setBoxShadow(0, 1, 2, 0, 0x66000000);
    this.setPadding(PADDING, PADDING, PADDING, 0);


    var comment1 = new Comment('images/kkmoving.jpg', 'kkmoving，资深架构师', '这可能是东半球最好用的WebApp框架了。');
    comment1.setBorderBottom(1, DIVIDERS_COLOR);
    this.addView(comment1);

    comment1 = new Comment('images/zhuyunbin.jpg', '朱云斌，安卓程序员', '作为一个Android开发者，Jndroid是一件令人兴奋的礼物。');
    comment1.setBorderBottom(1, DIVIDERS_COLOR);
    this.addView(comment1);

    comment1 = new Comment('images/yanglingfeng.png', 'Hulk Yang，一个见钱眼开的手艺人', 'Jndroid > (AngularJS | Backbone.js | Ember.js)');
    comment1.setBorderBottom(1, DIVIDERS_COLOR);
    this.addView(comment1);

    comment1 = new Comment('images/liuchenchen.png', 'UG84，资深设计师，手机应用设计领路人', '虽然我不知道这是什么，但是我觉得还是挺好看的。');
    comment1.setBorderBottom(1, DIVIDERS_COLOR);
    this.addView(comment1);

    comment1 = new Comment('images/zhangyang.png', '张阳', '本以为平行的世界有了交集，除了打破常规，强大的功能，快速的使用和轻松的体验，才是让人激动的。绝对是轻应用的一大步。');
    this.addView(comment1);
}

function QuestionView() {
    LinearLayout.apply(this, []);

    this.setBackgroundColor(0xffffffff);
    this.setCornerSize(2, 2, 2, 2);
    this.setBoxShadow(0, 1, 2, 0, 0x66000000);
    this.setPadding(PADDING);

    var question = new TextView();
    question.setText("To ask question, please send email to guyiyang@outlook.com");
    question.setTextSize(TEXT_SIZE);
    question.setTextColor(TEXT_COLOR);
    this.addView(question);
}
