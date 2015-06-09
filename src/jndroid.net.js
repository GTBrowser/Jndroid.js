function liteAjax(url, _callback, method, postBody, _error) {

    this.url = url;
    this.callback = _callback;
    this.method = method ? method.toUpperCase() : "GET";
    this.postBody = postBody;

    this.bindCallback = function(caller, object) {
        return function() {
            return caller.apply(object, [object]);
        };
    };

    this.stateChange = function(object) {
        console.log(this.request.readyState);
        if (this.request.readyState == 4) {
            this.callback(this.request.responseText);
        }
    };

    this.getRequestObj = function() {
        if (window.ActiveXObject) {
            return new ActiveXObject('Microsoft.XMLHTTP');
        } else if (window.XMLHttpRequest) {
            return new XMLHttpRequest();
        }
    };

    this.request = this.getRequestObj();
    if (this.request) {
        var req = this.request;
        req.onreadystatechange = this.bindCallback(this.stateChange, this);

        if (this.method == "POST") {
            req.open("POST", url, true);
            req.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            req.setRequestHeader('Connection', 'close');
        } else {
            req.open("GET", url, true);
        }
        req.ontimeout = function() {
            console.log('timeout');
        };
        req.onerror = function() {
            console.log('error');
        };
        req.onabort = function() {
            console.log('abort')
        };
        req.send(this.postBody);
    }

}
