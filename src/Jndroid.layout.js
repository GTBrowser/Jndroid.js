function LinearLayout() {
    ViewGroup.apply(this, []);

    this.HORIZONTAL = 0;
    this.VERTICAL = 1;

    var mOrientation = this.VERTICAL;

    this.setOrientation = function(orientation) {
        mOrientation = orientation;
        this.requestLayout();
    };

    this.onMeasure = function(widthMS, heightMS) {
        var width = MeasureSpec.getSize(widthMS);
        var height = MeasureSpec.getSize(heightMS);
        if (mOrientation == this.VERTICAL) {
            var childWidth = width - this.getPaddingLeft() - this.getPaddingRight();
            var childHeight = height - this.getPaddingTop() - this.getPaddingBottom();
            var h = this.getPaddingTop() + this.getPaddingBottom();
            for (var i = 0; i < this.getChildCount(); i++) {
                var child = this.getChildAt(i);
                child.measure(MeasureSpec.makeMeasureSpec(childWidth, MeasureSpec.EXACTLY),
                    MeasureSpec.makeMeasureSpec(childHeight, MeasureSpec.EXACTLY));
                h += child.getMeasuredHeight();
            }
            this.setMeasuredDimension(width, h);
        } else {
            var h = this.getPaddingTop() + this.getPaddingBottom();
            var w = this.getPaddingLeft() + this.getPaddingRight();
            for (var i = 0; i < this.getChildCount(); i++) {
                var child = this.getChildAt(i);
                child.measure(widthMS, heightMS);
                w += child.getMeasuredWidth();
            }
            if (this.getChildCount() > 0) {
                h += this.getChildAt(0).getMeasuredHeight();
            }
            this.setMeasuredDimension(w, h);
        }
    };

    this.onLayout = function(x, y) {
        var offsetX = this.getPaddingLeft();
        var offsetY = this.getPaddingTop();

        if (mOrientation == this.VERTICAL) {
            for (var i = 0; i < this.getChildCount(); i++) {
                var child = this.getChildAt(i);
                child.layout(offsetX, offsetY);
                offsetY += child.getMeasuredHeight();
            }
        } else {
            for (var i = 0; i < this.getChildCount(); i++) {
                var child = this.getChildAt(i);
                child.layout(offsetX, offsetY);
                offsetX += child.getMeasuredWidth();
            }
        }

    }
}

function FrameLayout() {
    ViewGroup.apply(this, []);

    this.onMeasure = function(width, height) {
        var childWidth = width - this.getPaddingLeft() - this.getPaddingRight();
        var childHeight = height - this.getPaddingTop() - this.getPaddingBottom();
        for (var i = 0; i < this.getChildCount(); i++) {
            var child = this.getChildAt(i);
            child.measure(childWidth, childHeight);
        }
        this.setMeasuredDimension(width, height);
    };

    this.onLayout = function(x, y) {
        var offsetX = this.getPaddingLeft();
        var offsetY = this.getPaddingTop();
        for (var i = 0; i < this.getChildCount(); i++) {
            var child = this.getChildAt(i);
            child.layout(offsetX, offsetY);
        }
    }
}