var R = new _R();
function _R() {

    this.string = new _string();
    this.color = new _color();
    this.dimen = new _dimen();

    function _string() {
        if (Manifest.language.indexOf("zh") >= 0) {
            this.intro = "简介";
            this.getstart = "开始";
            this.vs_android = "前言";
            this.documentation = "文档";
            this.application = "应用";
            this.about = "关于";
            this.setting = "设置";
            this.language = "语言";

            this.intro_content = "Jndroid是一个JavaScript框架，能够让开发者使用Android的方式开发网页。";
            this.material_design = "谷歌 Material Design";

            this.to_android_develop = "致安卓开发者";
        } else {
            this.intro = "Introduction";
            this.getstart = "Getting Started";
            this.vs_android = "vs Android";
            this.documentation = "Documentation";
            this.application = "Application";
            this.about = "About";
            this.setting = "Setting";
            this.language = "Language";

            this.intro_content = "Jndroid is a JavaScript framework to write WebApp in Android way.";
            this.material_design = "Google Material Design";

            this.to_android_develop = "To Android Developer";
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