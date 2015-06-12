var Manifest = new _Manifest();
function _Manifest() {
    this.versionCode = 000000080002;
    this.versionName = "0.8.2";

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
        if (this.versionCode > this.lastVersionCode) {
            return true;
        }
        return false;
    }
}

function getLocale() {
    var DEFAULT_VALUE = 'zh'; /* 默认设置为中文 */
    var PREFERRED_LANGUAGE = navigator.language || navigator.userLanguage || navigator.browserLanguage || navigator.systemLanguage || DEFAULT_VALUE;
    return PREFERRED_LANGUAGE;
}


