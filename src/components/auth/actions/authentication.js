
import { sessionService } from 'redux-react-session';
import axiosApi from '../../../config/axiosConfig';

export const SignIn = (credentials) => {
    return (dispatch, getState, api) => {
        //console.log("getState: ", getState);
       // console.log("api: ", api);
         var data = {
            username: credentials.username,
            email: credentials.email,
            password: credentials.password
        };
        axiosApi.post(`/auth/login`, 
            data
        ).then(res => {
            console.log(res);
            var r = res.data;
            if (r.status) {
                sessionService.saveSession(res.data)  
                dispatch({ type: true, data: r.data })
            } else {
                var errMessage = r.message;
                if (r.message == "User not found") {
                    errMessage = "User tidak ditemukan";
                } else if (r.message == "Wrong Password") {
                    errMessage = "Password anda salah.";
                }
                dispatch({ type: false, message: errMessage })
            }
        });
    }
}