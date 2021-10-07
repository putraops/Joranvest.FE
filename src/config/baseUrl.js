var home = window.location.protocol + "//" + window.location.hostname;
if (window.location.hostname === "localhost") {
    home += ":" + window.location.port
}
const baseUrl = home;
export default baseUrl