var Manifest = new _Manifest();
function _Manifest() {
    this.versionCode = 000000080000;
    this.versionName = "0.8.1";

    this.lastVersionCode = localStorage["versionCode"];
    localStorage["versionCode"] = this.versionCode;

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



