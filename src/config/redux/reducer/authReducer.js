import Cookies from 'universal-cookie';

const cookies = new Cookies();
const initState = {
    isLogin: false,
    isLoading: false,
    authError: "", 
    errorMessage: "", 
    authStatus: false,
    user: cookies.get('joranvestCookie') || null,
    username: "",
}

const authReducer = (state = initState, res) => {
    switch (res.type) {
        case "LOGIN_SUCCESS":
            return {
                ...state,
                errorMessage: ""
            }
        case "LOGIN_FAILED":
            return {
                ...state,
                errorMessage: ""
            }
        case "CHANGE_USER":
            return {
                ...state,
                username: res.value
            }
        case "CHANGE_LOADING":
            return {
                ...state,
                isLoading: res.value
            }
        case "FORM_UPDATE":
            return {
                ...state,
                authError: "",
                errorMessage: ""
            }
        case "EMAIL_NOT_FOUND":
            return {
                ...state,
                errorMessage: "Email tidak terdaftar."
            }
        case "INVALID_EMAIL":
            return {
                ...state,
                errorMessage: "Email yang anda masukkan salah."
            }
        case "INVALID_PASSWORD":
            return {
                ...state,
                errorMessage: "Email dan Password salah."
            }
        case "ALREADY_IN_USE":
            return {
                ...state,
                errorMessage: "Email sudah terdaftar. Silahkan login."
            }
        case "PASS_AND_REPASSWORD_NOT_MATCH":
            return {
                ...state,
                errorMessage: "Password dan Ulangi Password tidak sama."
            }
        case "WEAK_PASSWORD":
            return {
                ...state,
                errorMessage: "Password minimal terdiri dari 6 karakter."
            }
        default: 
            return state
    }
}

export default authReducer;