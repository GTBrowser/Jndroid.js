function ListView(ItemFunc) {
    ScrollView.apply(this);

    var listView = this;

    var dataList = [];
    var content;
    var itemHeight;
    var totalItemNum;
    var hasCalcTotalItemNum = false;

    var itemCreateListener = null;
    var itemUpdateListener = null;

    var header;
    var footer;
    var container;

    var headerHeight = 0;
    var footerHeight = 0;

    var topOffset = 0;

    container = new LinearLayout();

    this.getContentHeight = function() {
        return container.getMH();
    };
    this.addView(container);

    content = new ListViewContent();
    container.addView(content);

    totalItemNum = 1;

    if (ItemFunc == undefined) {
        console.error("请在构造时传入ListItem");
        ItemFunc = Button;
        ItemFunc.prototype.setModel = function(model) {
            this.setText(JSON.stringify(model));
        }
    }

    this.setBg = function(c) {
        container.setBg(c)
    };
    this.setBackgroundColro = this.setBg;
    this.setBg(0xffffffff);

    this.setOnItemCreateListener = function(l) {
        itemCreateListener = l;
    };

    this.setOnItemUpdateListener = function(l) {
        itemUpdateListener = l;
    };

    this.setData = function(data) {
        dataList = data;
        for (var i = 0; i < Math.min(totalItemNum, dataList.length); i++) {
            content.addView(getListItem(i, null));
        }
        content.layoutAtPosition();
    };

    this.getItemHeight = function() {
        return itemHeight;
    };

    this.getSize = function() {
        return dataList.length;
    };

    this.get = function(index) {
        return dataList[index];
    };

    this.add = function(data, index) {
        if (this.getMH() == 0) {
            this.postDelayed(function() {
                this.add(data, index);
            }, 100);
            return;
        }
        var datas = [];
        if (Utils.isArray(data)) {
            datas = data;
        } else {
            datas.push(data);
        }
        if (index == undefined) {
            index = this.getSize();
        } else {
            onDataChanged(0);
        }
        for (var i = 0; i < datas.length; i++) {
            dataList.add(index + i, datas[i]);
            if (dataList.length <= totalItemNum) {
                content.addView(getListItem(index + i, null), index + 1 + i);
            }
        }
        this.refresh();
    };

    this.removeAt = function(index) {
        dataList.removeAt(index);

        if (dataList.length == 0) {
            this.clear();
            return;
        }
        if (dataList.length < totalItemNum) {
            content.removeView(content.getChildAt(index));
        }
        onDataChanged();
        this.refresh();
    };

    this.clear = function() {
        dataList.clear();
        content.removeAllViews();
        this.scrollTo(0);
    };

    this.update = function(data, index) {
        this.removeAt(index);
        this.add(data, index);
    };

    this.refresh = function() {
        content.requestLayout();
        this.scrollToWidthRange(0, this.getScrollY());
        content.layoutAtPosition();
        this.scrollBy(1);
    };

    this.getHeader = function() {
        return header;
    };

    this.getFooter = function() {
        return footer;
    };

    this.addHeader = function(h) {
        if (header != null) {
            this.removeHeader();
        }
        header = h;
        container.addView(header, 0);
    };

    this.addFooter = function(f) {
        if (footer != null) {
            this.removeFooter();
        }
        footer = f;
        container.addView(footer);
    };

    this.removeHeader = function() {
        if (header != null) {
            container.removeView(header);
            header = null;
        }
    };

    this.removeFooter = function() {
        if (footer != null) {
            container.removeView(footer);
            footer = null;
        }
    };

    this.onAfterMeasure = function(wMS, hMS) {
        content.measure(wMS, hMS);
        calcTotalItemNum();

        if (header != null) {
            headerHeight = header.getMH();
        }
        if (footer != null) {
            footerHeight = footer.getMH();
        }
    };

    this.addScrollChangedListener(function(x, oldx, y, oldy) {
        if (y == oldy) {
            return;
        }
        topOffset = y;
        topOffset -= headerHeight;

        topOffset = Math.min(topOffset, content.getMH() - this.getMH());
        topOffset = Math.max(topOffset, 0);

        content.layoutInScroll(y > oldy);
    });

    this.onBeforeInterceptTouchEvent = function() {
        this.getParent().requestDisallowInterceptTouchEvent(true);
    };

    function onDataChanged() {
        for (var i = 0; i < content.getChildCount(); i++) {
            content.getChildAt(i).setId(-1);
        }
    }

    function calcTotalItemNum() {
        if (dataList.length == 0) {
            return;
        }

        if (hasCalcTotalItemNum) {
            return;
        }
        hasCalcTotalItemNum = true;

        totalItemNum = Math.ceil(listView.getMH() / itemHeight) + 1;
    }

    function getListItem(index, view) {
        if (view == null) {
            view = new ItemFunc();
            if (itemCreateListener != null) {
                itemCreateListener.call(this, index, view);
            }
        }
        if (view.getId() != index) {
            view.setId(index);
            view.setModel(dataList[index]);
            if (itemUpdateListener != null) {
                itemUpdateListener.call(this, index, view);
            }
        }
        return view;
    }

    function ListViewContent() {
        ViewGroup.apply(this);

        var listViewContent = this;
        var childCount = 0;
        var topPassCount = 0;
        var topIndex = 0;
        var lastTopIndex = 0;

        this.onMeasure = function(wMS, hMS) {
            var w = MS.getSize(wMS);
            var h = 0;
            childCount = this.getChildCount();
            for (var i = 0; i < childCount; i++) {
                var c = this.getChildAt(i);
                if (c.getMH() > 0 && c.getMW() == w) {
                    continue;
                }
                var itemH = 0;
                var cLp = c.getLayoutParams();
                var cwMS = wMS;
                if (cLp != null) {
                    if (cLp.height > 0) {
                        itemH = cLp.height;
                    }
                    if (cLp.width == LP.FP) {
                        cwMS = MS.makeMS(w, MS.EXACTLY);
                    }
                }
                c.measure(cwMS, MS.makeMS(itemH, MS.EXACTLY));
            }

            if (this.getChildCount() > 0) {
                itemHeight = this.getChildAt(0).getMH();
                h = itemHeight * dataList.length;
            }

            h = Math.max(h, MS.getSize(hMS) - headerHeight - footerHeight);
            this.setMD(w, h);
        };

        this.layoutAtPosition = function() {
            if (childCount == 0) {
                return;
            }
            var topPass = Math.floor(topOffset / itemHeight);
            topIndex = topPass % childCount;

            var y = topPass * itemHeight;
            for (var i = 0; i < childCount; i++) {
                var index = (i + topIndex) % childCount;
                var c = listViewContent.getChildAt(index);
                c.layoutByTransform(0, y);
                var modelIndex = topPass + i;
                getListItem(modelIndex, c);
                y += c.getMH();
            }
        };

        this.layoutInScroll = function(toUp) {
            if (childCount == 0) {
                return;
            }

            var topPass = Math.floor(topOffset / itemHeight);
            topIndex = topPass % childCount;
            if (topIndex == lastTopIndex) {
                return;
            }
            if (toUp) {
                scrollUp();
            } else  {
                scrollDown();
            }

            lastTopIndex = topIndex;

            function scrollUp() {
                var end = topIndex;
                if (end < lastTopIndex) {
                    end += childCount;
                }
                for (var i = lastTopIndex; i < end; i++) {
                    var c = listViewContent.getChildAt(i % childCount);
                    if (c) {
                        var lastIndex = (i + childCount - 1) % childCount;
                        var y = listViewContent.getChildAt(lastIndex).getBottom();
                        c.layoutByTransform(0, y);
                        var newIndex = y / itemHeight;
                        if (newIndex >= dataList.length) {
                            newIndex = dataList.length - 1;
                        }
                        getListItem(newIndex, c);
                    }
                }
            }

            function scrollDown() {
                var start = lastTopIndex;
                if (start < topIndex) {
                    start += childCount;
                }
                for (var i = start - 1; i >= topIndex; i--) {
                    var c = listViewContent.getChildAt(i % childCount);
                    if (c) {
                        var lastIndex = (i + 1) % childCount;
                        var y = listViewContent.getChildAt(lastIndex).getTop() - c.getMH();
                        c.layoutByTransform(0, y);
                        var newIndex = y / itemHeight;
                        if (newIndex < 0) {
                            newIndex = 0;
                        }
                        getListItem(newIndex, c);
                    }
                }
            }
        }

    }
}