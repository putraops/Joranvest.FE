import axios from 'axios'
import Cookies from 'universal-cookie';

const cookies = new Cookies();
var user = cookies.get('joranvestCookie') || null;
var protocol = window.location.protocol;
var hostname = window.location.hostname;

var baseURL = "";
if (hostname.includes("localhost")) {
    baseURL = protocol + "//" + hostname + ":10000/api";
    // baseURL = "https://dev.api.joranvest.com/api"
} else if (hostname.includes("dev")) {
    baseURL = protocol + "//dev.api.joranvest.com/api"
} else {
    baseURL = protocol + "//api.joranvest.com/api"
}
const instance = axios.create({
    baseURL: baseURL,
    headers: {
        'Authorization': user ? user.token : null,
    },
    
});
export default instance