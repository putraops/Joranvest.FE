var _serverUrl = "http://www.joranvest.com";
var _serverPort = "10000";
if (window.location.hostname === "localhost") {
    _serverUrl = "http://" + window.location.hostname;
} 
_serverUrl += _serverPort === "" ? "" : (":" + _serverPort);
const serverUrl = _serverUrl;
export default serverUrl