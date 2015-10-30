function Tab() {
    ViewGroup.apply(this);

    var self = this;

    var maxItemW = 120;
    var items = [];
    var selectedIndex = 0;
    var selectedListener = null;
    var itemClickListener = null;

    var indicator = new View();
    this.addView(indicator);

    this.setOnSelectedListener = function(l) {
        selectedListener = l;
    };

    this.setOnItemClickListener = function(l) {
        itemClickListener = l;
    };

    this.getItemCount = function() {
        return items.length;
    };

    this.getTabItems = function() {
        return items;
    };

    this.getSelectIndex = function() {
        return selectedIndex;
    };

    this.setSelectIndex = function(i) {
        moveIndicator(selectedIndex, i);
        selectedIndex = i;
        if (selectedListener) {
            selectedListener.call(this, selectedIndex);
        }
    };

    this.setIndicatorColor = function(c) {
        indicator.setBackgroundColor(c);
    };

    this.addTabItem = function(btn) {
        btn.setOnClickListener(function() {
            var index = items.indexOf(this);
            if (index == selectedIndex) {
                return;
            }
            self.setSelectIndex(index);
            if (itemClickListener) {
                itemClickListener.call(self, index);
            }
        });
        this.addView(btn);
        items.push(btn);
    };

    this.onMeasure = function(wMS, hMS) {
        var w = MS.getSize(wMS);
        var h = MS.getSize(hMS);
        this.setMD(w, h);

        var itemW = w / items.length;
        itemW = Math.min(itemW, maxItemW);
        for (var i = 0; i< items.length; i++) {
            Utils.measureExactly(items[i], itemW, h);
        }
        Utils.measureExactly(indicator, itemW, 3);
    };

    this.onLayout = function() {
        var x = 0;
        var y = 0;
        for (var i = 0; i< items.length; i++) {
            items[i].layout(x, y);
            x += items[i].getMW();
        }
        x = 0;
        y = this.getMH() - indicator.getMH();
        indicator.layout(x, y);
    };

    function moveIndicator(from, to) {
        var itemW = items[from].getMW();
        var fromX = itemW * from;
        var toX = itemW * to;
        var t = new TranslateAnimation(fromX, toX, 0, 0);
        t.setFillAfter(true);
        t.setDuration(200);
        indicator.startAnimation(t);
    }
}

