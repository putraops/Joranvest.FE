import axios from 'axios'
import joranCookies from '../commons/joranCookies';
import sideNotification from '../commons/sideNotification';

var baseURL = "";
let user = joranCookies.get();
var protocol = window.location.protocol;
var hostname = window.location.hostname;

if (hostname.includes("localhost")) {
    baseURL = protocol + "//" + hostname + ":10000/api";
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
instance.interceptors.response.use((response) => response, 
(error) => {
    // whatever you want to do with the error
    sideNotification.open("Something went wrong!", "Please check your connection...", false);
    throw error;
});
export default instance