/**
 * Created by lency on 5/18/15.
 */
function IntroductionPage()
{
    ScrollView.apply(this, []);

    var contentView = new LinearLayout();
    this.addView(contentView);

    var playground = new Playground();
    var lp = new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.WRAP_CONTENT);
    lp.topMargin = 20;
    contentView.addView(playground, lp);
}

function Playground()
{
    ViewGroup.apply(this, []);

    var playgroundHeight = 400;

    var codeEditor = new CodeEditor();
    var codePreviewer = new CodePreviewer();

    this.addView(codeEditor);
    this.addView(codePreviewer);

    this.onMeasure = function(widthMS, heightMS){

        var width = MeasureSpec.getSize(widthMS);

        if(width > 700)
        {
            codeEditor.measure(width / 2, playgroundHeight);
            codePreviewer.measure(width / 2, playgroundHeight);
            this.setMeasuredDimension(width, playgroundHeight);

        }else{
            codeEditor.measure(width, playgroundHeight);
            codePreviewer.measure(width, playgroundHeight);
            this.setMeasuredDimension(width, playgroundHeight * 2);
        }
    };

    this.onLayout = function(x, y){
        codePreviewer.layout(0, 0);

        var width = this.getMeasuredWidth();
        if(width > 700)
        {
            codeEditor.layout(codePreviewer.getMeasuredWidth(), 0);
        }else{
            codeEditor.layout(0, playgroundHeight);
        }
    };
}

function CodeEditor()
{
    FrameLayout.apply(this, []);

    var editArea = new EditText();
    editArea.setSingleLine(false);
    editArea.setBorder(1, 0xFFCCCCCC);

    var lp = new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.FILL_PARENT);
    lp.topMargin = 10;
    lp.bottomMargin = 10;
    lp.leftMargin = 10;
    lp.rightMargin = 10;

    this.addView(editArea, lp);
}

function CodePreviewer()
{
    FrameLayout.apply(this, []);
    this.setBackgroundColor(0xffffff00);
}
