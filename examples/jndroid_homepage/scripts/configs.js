var Manifest = new _Manifest();
function _Manifest() {
    var self = this;

    this.isPhone = false;
    this.maxWidth = 1080;

    this.versionCode = 000100000000;
    this.versionName = "1.0.0";

    this.lastVersionCode = localStorage["versionCode"];
    localStorage["versionCode"] = this.versionCode;

    this.language = localStorage["language"];
    if (this.language == undefined) {
        this.language = getLocale();
    }

    this.isVersionUpgrade = function() {
        if (this.lastVersionCode == undefined) {
            return true;
        }
        return this.versionCode > this.lastVersionCode;
    };

    this.setIsPhone = function(isPhone) {
        this.isPhone = isPhone;
        if (isPhone) {
            R.dimen.padding = 8;
            R.dimen.half_padding = 4;
            R.dimen.supTitle = 35;
            R.dimen.paragraph_padding_top = 24;
            R.dimen.content_padding_bottom = 24;
        } else {
            R.dimen.padding = 16;
            R.dimen.half_padding = 8;
            R.dimen.supTitle = 44;
            R.dimen.paragraph_padding_top = 72;
            R.dimen.content_padding_bottom = 72;
        }
    };

    this.changeLogs = [];

    addChangeLog("1.0.0", "2015-10-29", ["优化Jndroid性能，实现产品化", "增加ListView控件", "增加对多点触控的支持", "更新Jndroid首页"]);
    addChangeLog("0.9.0", "2015-6-19", ["全面支持Android Touch事件流，增加dispatchTouchEvent，onInterceptTouchEvent等方法",
        "增加Gallery控件", "onDraw支持不同density，解决高分辨屏上canvas绘制模糊的问题"]);
    addChangeLog("0.8.2", "2015-6-12", ["增加RadioButton与RadioGroup控件", "增加ToggleButton控件", "增加设置项，增加中英文语言切换"]);
    addChangeLog("0.8.1", "2015-6-9", ["更换主题样式", "增加官网版本控制", "增加Jndroid Logo"]);
    addChangeLog("0.8.0", "2015-6-6", ["建立Jndroid官网"]);

    function addChangeLog(title, time, issues) {
        var changeLog = {};
        changeLog.title = title;
        changeLog.issues = issues;
        changeLog.created_at = time;
        self.changeLogs.push(changeLog);
    }
}

function getLocale() {
    var DEFAULT_VALUE = 'zh'; /* 默认设置为中文 */
    return navigator.language || navigator.userLanguage || navigator.browserLanguage || navigator.systemLanguage || DEFAULT_VALUE;
}

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

            this.lestore = "应用商店";
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

            this.lestore = "App Store";
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
        this.theme = 0xff0091ea;
        this.card_bg = 0xffeeeeee;
        this.bg = 0xfffafafa;
        this.text = 0xff191919;
        this.secondary_text = 0xff454545;
        this.sub_text = 0xff757575;
        this.dividers = 0x1a000000;
        this.shadow = 0x66000000;
        this.wave = 0x1a000000;
    }

    function _dimen() {
        this.padding = 16;
        this.half_padding = 8;
        this.title_padding_top = 24;
        this.paragraph_padding_top = 72;
        this.content_padding_bottom = 72;

        this.corner = 2;

        this.supTitle = 44;
        this.title = 24;
        this.text = 14;
        this.sub_text = 12;
    }
}


