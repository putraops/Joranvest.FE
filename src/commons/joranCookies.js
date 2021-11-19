import Cookies from 'universal-cookie';

const cookies = new Cookies();
let user = cookies.get('joranvestCookie') || null;
const joranCookies = {
    set(data) {
        data.token = user.token;
                        
        var maxAge = 7*24*60*60;
        cookies.set(
            'joranvestCookie', 
            JSON.stringify(data), 
            { 
                path: '/',
                maxAge: maxAge,
                httpOnly: false,
            }
        );
        cookies.set(
            'joranvestCookie', 
            JSON.stringify(data), 
            { 
                path: '/',
                maxAge: maxAge,
                httpOnly: false,
                domain: "joranvest.com" 
            }
        );
    }
}
export default joranCookies