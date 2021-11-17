import Cookies from 'universal-cookie';

const joranCookies = {
    set(data) {
        const cookies = new Cookies();
                        
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