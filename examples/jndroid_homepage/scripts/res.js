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
            this.doc = "文档";
            this.app = "应用";
            this.about = "关于";
            this.setting = "设置";
            this.language = "语言";

            this.intro_content = "Jndroid是一个JavaScript框架，能够让开发者使用Android的方式开发网页。";
            this.material_design = "谷歌Material Design";

            this.to_android_develop = "致安卓开发者";
            this.more_tips = "更多建议";

            this.lestore = "乐商店";
            this.excel_demo = "Excel Demo(多点触控)";
            this.jndroid_home = "Jndroid官网";
            this.calculator = "计算器";

            this.version = "版本号";
            this.show_more = "显示更多";
            this.show_less = "收起显示";
            this.change_log = "更新记录";
            this.comments = "评论";
            this.qa = "答问";
            this.ask_question = "如需讨论，请发邮件至guyiyang@outlook.com";

            this.version_update = "版本已更新";

        } else {
            this.intro = "Introduction";
            this.getstart = "Getting Started";
            this.vs_android = "vs Android";
            this.doc = "Documentation";
            this.app = "Application";
            this.about = "About";
            this.setting = "Setting";
            this.language = "Language";

            this.intro_content = "Jndroid is a JavaScript framework to write WebApp in Android way.";
            this.material_design = "Google Material Design";

            this.to_android_develop = "To Android Developer";
            this.more_tips = "More Tips";

            this.lestore = "LeStore";
            this.excel_demo = "Excel Demo(multi-touch)";
            this.jndroid_home = "Jndroid Homepage";
            this.calculator = "Calculator";

            this.version = "Version";
            this.show_more = "show more";
            this.show_less = "show less";
            this.change_log = "Change Logs";
            this.comments = "Comments";
            this.qa = "Q&A";
            this.ask_question = "To ask question, please send email to guyiyang@outlook.com";

            this.version_update = "Version Updated";

        }
    }

    function _color() {
        this.theme = 0xFF673ab7;
        this.card_bg = 0xffeeeeee;
        this.bg = 0xfffafafa;
        this.text = 0xff191919;
        this.secondary_text = 0xff454545;
        this.sub_text = 0xff757575;
        this.dividers = 0x1a000000;
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