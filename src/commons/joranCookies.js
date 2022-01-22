import Cookies from 'universal-cookie';

var hostname = window.location.hostname;
const cookies = new Cookies();
let user;
if (hostname.includes("localhost")) {
    //-- Localhost
    user = cookies.get('joranvestLocalCookies') || null;
} else if (hostname.includes("dev")) {
    //-- Development
    user = cookies.get('joranvestDevCookies') || null;
} else {
    //-- Production
    user = cookies.get('joranvestCookies') || null;
}
const joranCookies = {
    set(data) {
        if (user) {
            data.token = user.token;
        }
                        
        var maxAge = 7*24*60*60;
        if (hostname.includes("localhost")) {
            //-- Localhost
            cookies.set(
                'joranvestLocalCookies', 
                JSON.stringify(data), 
                { 
                    path: '/',
                    maxAge: maxAge,
                    httpOnly: false,
                }
            );
        } else if (hostname.includes("dev")) {
            //-- Development
            cookies.set(
                'joranvestDevCookies', 
                JSON.stringify(data), 
                { 
                    path: '/',
                    maxAge: maxAge,
                    httpOnly: false,
                    domain: "joranvest.com"
                }
            );
        } else {
            //-- Production
            cookies.set(
                'joranvestCookies', 
                JSON.stringify(data), 
                { 
                    path: '/',
                    maxAge: maxAge,
                    httpOnly: false,
                    domain: "joranvest.com"
                }
            );
        }
    },
    get() {
        if (hostname.includes("localhost")) {
            //-- Localhost
            return cookies.get('joranvestLocalCookies') || null;
        } else if (hostname.includes("dev")) {
            //-- Development
            return cookies.get('joranvestDevCookies') || null;
        } else {
            //-- Production
            return cookies.get('joranvestCookies') || null;
        }
    },
    remove() {
        if (hostname.includes("localhost")) {
			//-- Localhost
			cookies.remove('joranvestLocalCookies')
		} else if (hostname.includes("dev")) {
			//-- Development
            cookies.remove('joranvestDevCookies', {
                domain: "joranvest.com"
            })
		} else {
			//-- Production
            cookies.remove('joranvestCookies', {
                domain: "joranvest.com"
            })
		}
    }
}
export default joranCookies