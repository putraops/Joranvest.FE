var protocol = window.location.protocol;
var hostname = window.location.hostname;
var localhostPort = "3000";
var baseURL = "";
if (hostname.includes("localhost")) {
    baseURL = protocol + "//" + hostname + ":" + localhostPort + "";
} else if (hostname.includes("dev")) {
    baseURL = protocol + "//dev.joranvest.com"
} else if (hostname.includes("ngrok.io")) {
    baseURL = protocol + "//" + hostname;
} else {
    baseURL = protocol + "//joranvest.com"
}
const baseUrl = baseURL;
export default baseUrl