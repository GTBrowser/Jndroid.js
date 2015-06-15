function Indicator() {
    ViewGroup.apply(this, []);

    this.setTag("indicator");

    this.INDICATOR_SIZE = 8;
    this.GAP = 16;

    var mDensity = DisplayMetrics.density;
    var mStyle = Indicator.Spot;
    var mIndicatorCount = 0;
    var mSelectIndex = 0;
    var mIndicatorColor = 0xff999999;
    var mSelectColor = 0xff00ff00;
    var mProcess = 0;

    this.setWillNotDraw(false);

    this.setIndicatorColor = function(c) {
        mIndicatorColor = c;
    };

    this.setStyle =  function(style) {
        mStyle = style;
        this.requestLayout();
    }

    this.setSelectColor = function(c) {
        mSelectColor = c;
    };

    this.addIndicator = function() {
        mIndicatorCount++;
    };

    this.setIndicatorCount = function(count) {
        mIndicatorCount = count;
    };

    this.setSelectIndex = function(index) {
        mSelectIndex = index;
        this.postInvalidate();
    };

	this.onMeasure = function(widthMS, heightMS) {
        var width = 0;
        if (mIndicatorCount > 0) {
            width = this.INDICATOR_SIZE * mIndicatorCount + this.GAP * (mIndicatorCount - 1);
        }
        this.setMeasuredDimension(width, heightMS);
    };

    this.onDraw = function(canvas) {
        if (mStyle == Indicator.Line) {
            this.onDrawLine(canvas);
        } else {
            this.onDrawSpot(canvas);
        }
    };

    this.onDrawLine = function(canvas) {
        var totalWidth = (this.getMeasuredWidth() - this.INDICATOR_SIZE) * mDensity;
        var h = this.getMeasuredHeight() * mDensity;
        canvas.lineWidth = h;
        canvas.beginPath();
        var offSetX = totalWidth * mProcess;
        canvas.moveTo(offSetX, h/2);
        canvas.lineTo(offSetX + this.INDICATOR_SIZE * mDensity, h/2);
        canvas.closePath();
        canvas.strokeStyle = Utils.toCssColor(mIndicatorColor);
        canvas.stroke();

    }

    this.onDrawSpot = function(canvas) {
        for (var i = 0; i < mIndicatorCount; i++) {
            drawSpot(this, canvas, i, mIndicatorColor);
        }
        var radius = this.INDICATOR_SIZE / 2;
        var totalWidth = this.getMeasuredWidth() - this.INDICATOR_SIZE;
        var offsetX = radius + totalWidth * mProcess;
        var offsetY = radius;
        drawSpotAt(this, canvas, offsetX, offsetY, mSelectColor);
    };

    this.onXChanged = function(p) {
        mProcess = p;
        this.postInvalidate();
    };

    function drawSpot(indicator, canvas, index, color) {
        var radius = indicator.INDICATOR_SIZE / 2;
        var offsetX = radius + (indicator.GAP + indicator.INDICATOR_SIZE) * index;
        var offsetY = radius;
        drawSpotAt(indicator, canvas, offsetX, offsetY, color);
    }

    function drawSpotAt(indicator, canvas, offsetX, offsetY, color) {
        var radius = indicator.INDICATOR_SIZE / 2;
        canvas.beginPath();
        canvas.arc(offsetX, offsetY, radius, 0, Math.PI * 2, true);
        canvas.closePath();
        canvas.fillStyle = Utils.toCssColor(color);
        canvas.fill();
    }
}
Object.defineProperty(Indicator,"Spot",{value:0});
Object.defineProperty(Indicator,"Line",{value:1});
