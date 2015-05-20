/**
 * Created by lency on 5/20/15.
 */
function Playground(initCode)
{
    ViewGroup.apply(this, []);
    this.uuid = Math.floor(Math.random() * 100000);

    var playgroundHeightHorizontal = 400;
    var playgroundHeightVertial = 300;

    var codeEditor = new CodeEditor(initCode);
    var codePreviewer = new CodePreviewer(this.uuid);

    this.addView(codeEditor);
    this.addView(codePreviewer);



    this.onMeasure = function(widthMS, heightMS){

        var width = MeasureSpec.getSize(widthMS);

        if(width > 700)
        {
            codeEditor.measure(width / 2, playgroundHeightHorizontal);
            codePreviewer.measure(width / 2, playgroundHeightHorizontal);
            this.setMeasuredDimension(width, playgroundHeightHorizontal);
        }else{
            codeEditor.measure(width, playgroundHeightVertial);
            codePreviewer.measure(width, playgroundHeightVertial);
            this.setMeasuredDimension(width, playgroundHeightVertial * 2);
        }
    };

    this.onLayout = function(x, y){
        codeEditor.layout(0, 0);

        var width = this.getMeasuredWidth();
        if(width > 700)
        {
            codePreviewer.layout(codePreviewer.getMeasuredWidth(), 0);
        }else{
            codePreviewer.layout(0, playgroundHeightVertial);
        }
    };

    this.update = function(){
        var code = codeEditor.getCode();
        codePreviewer.applyCode(code);
    };

    this.update();
}

function CodeEditor(initCode)
{
    ViewGroup.apply(this, []);

    var self = this;

    var editArea = new EditText();
    editArea.setSingleLine(false);
    editArea.setPadding(15, 10, 15, 10);
    editArea.setTextColor(0xFFFFE57F);
    editArea.setTextSize(14);
    editArea.setBackgroundColor(0xff616161);
    editArea.setText(initCode);

    this.addView(editArea);

    var refreshBtn = new TextView();
    refreshBtn.setText("Reload");
    refreshBtn.setTextSize(20);
    refreshBtn.setTextColor(0xFFFFFFFF);
    refreshBtn.setBackgroundColor(0xff616161);
    refreshBtn.setClickable(true);
    refreshBtn.setOnClickListener(function(){
        self.getParent().update();
    });

    this.addView(refreshBtn);

    this.onMeasure = function(widthMS, heightMS){
        var width = MeasureSpec.getSize(widthMS);
        var height = MeasureSpec.getSize(heightMS);

        var cWidthMS = MeasureSpec.makeMeasureSpec(width - 20, MeasureSpec.EXACTLY);
        var cHeightMS = MeasureSpec.makeMeasureSpec(height - 20, MeasureSpec.EXACTLY);

        editArea.measure(cWidthMS, cHeightMS);

        this.setMeasuredDimension(width, height);
    };

    this.onLayout = function(x, y){
        editArea.layout(10, 10);
        var width = editArea.getMeasuredWidth();
        refreshBtn.layout(width - 55, 15);
    };


    this.getCode = function(){
        return editArea.getText();
    };
}

function CodePreviewer(uuid)
{
    FrameLayout.apply(this, []);

    var demoView;

    var displayArea = new FrameLayout();
    this.addView(displayArea);

    this.setPadding(10);

    this.applyCode = function(code){
        var scriptElem = document.createElement("script");

        var codeWrapper = "function DemoView" + uuid + "(){FrameLayout.apply(this, []);" + code + "}";

        scriptElem.innerHTML = codeWrapper;
        document.head.appendChild(scriptElem);

        displayArea.removeView(demoView);
        demoView = eval("new DemoView"+uuid+"()");
        displayArea.addView(demoView);
    };
}
