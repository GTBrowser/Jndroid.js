var Manifest = new _Manifest();
function _Manifest() {
    var self = this;

    this.isPhone = false;
    this.versionCode = 000100000000;
    this.versionName = "0.9.0";

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


