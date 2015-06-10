var R = new _R();
function _R() {

    this.string = new _string();
    this.color = new _color();
    this.dimen = new _dimen();

    function _string() {
        var lang = getLocale();
        if (lang.indexOf("zh") >= 0) {
            this.intro = "简介";
            this.getstart = "开始";
        } else {
            this.intro = "Introduction";
            this.getstart = "Getting Started";
        }

    }

    function _color() {
        this.theme = 0xFF3F51B5;
        this.card_bg = 0xffeeeeee;
        this.bg = 0xfffafafa;
        this.text = 0xff212121;
        this.secondary_text = 0xff454545;
        this.sub_text = 0xff757575;
        this.dividers = 0x20000000;
        this.shadow = 0x66000000;
    }

    function _dimen() {
        this.padding = 16;
        this.half_padding = 8;
        this.title_padding_top = 24;
        this.paragraph_padding_top = 72;
        this.content_padding_bottom = 72;

        this.corner = 2;

        this.title = 24;
        this.text = 14;
        this.sub_text = 12;
    }
}

function getLocale() {
    var DEFAULT_VALUE = 'zh'; /* 默认设置为中文 */
    var PREFERRED_LANGUAGE = navigator.language || navigator.userLanguage || navigator.browserLanguage || navigator.systemLanguage || DEFAULT_VALUE;
    return PREFERRED_LANGUAGE;
}