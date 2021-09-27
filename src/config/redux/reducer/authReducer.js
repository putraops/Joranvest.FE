const initState = {
    isLogin: false,
    isLoading: false,
    authError: "", 
    errorMessage: "", 
    authStatus: false,
    user: {},
    username: '',
}

const authReducer = (state = initState, res) => {
    console.log(res.type);
    switch (res.type) {
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
                authError: "Email tidak terdaftar."
            }
        case "INVALID_EMAIL":
            return {
                ...state,
                authError: "Email yang anda masukkan salah."
            }
        case "INVALID_PASSWORD":
            return {
                ...state,
                authError: "Email dan Password salah."
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