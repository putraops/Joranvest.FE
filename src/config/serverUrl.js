var protocol = window.location.protocol;
var hostname = window.location.hostname;

var baseURL = "";
if (hostname.includes("localhost")) {
    baseURL = protocol + "//" + hostname + ":10000";
} else if (hostname.includes("dev")) {
    baseURL = protocol + "//dev.api.joranvest.com"
} else {
    baseURL = protocol + "//api.joranvest.com"
}
const serverUrl = baseURL;
export default serverUrl