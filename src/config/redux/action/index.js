import firebaseApp from "../../firebase/config";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, deleteUser } from "firebase/auth";
import axiosApi from '../../axiosConfig'
import Cookies from 'universal-cookie';

const auth = getAuth(firebaseApp);

export const actionFormUpdate = () => (dispatch) => {
    return dispatch({type: 'FORM_UPDATE', value: ""});
}

export const actionPasswordAndRepasswordNotMatch = () => (dispatch) => {
    return dispatch({type: 'PASS_AND_REPASSWORD_NOT_MATCH', value: ""});
}

export const registerUser = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        const auth = getAuth(firebaseApp);

        dispatch({type: 'FORM_UPDATE', value: ""})
        dispatch({type: "CHANGE_LOADING", value: true});

        createUserWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
            var user = userCredential.user;
            data.firebase_id = user.uid;
            
            axiosApi.post(`/application_user/register`, 
                data
            ).then(r => {
                dispatch({type: "CHANGE_LOADING", value: false});
                resolve(true);
            }).catch((error) => {
                dispatch({type: "CHANGE_LOADING", value: false});
                deleteUser(user).then(() => {
                    reject(false);
                }).catch((error) => {
                    reject(false);
                });
            });
        }).catch((error) => {
            var type = "";
            if (error.message === "Firebase: Error (auth/email-already-in-use).") {
                type = "ALREADY_IN_USE";
            } else if (error.message === "Firebase: Password should be at least 6 characters (auth/weak-password).") {
                type = "WEAK_PASSWORD";
            }

            dispatch({type: type, errorMessage: ""});
            dispatch({type: "CHANGE_LOADING", value: false});
            reject(false);
        })
    })
}

export const userLogin = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch({type: "CHANGE_LOADING", value: true});
        signInWithEmailAndPassword(auth, data.email, data.password)
           .then((userCredential) => {
                var user = userCredential.user;
                dispatch({type: "CHANGE_LOADING", value: false});
                axiosApi.post(`/auth/login`, 
                    data
                ).then(res => {
                    var r = res.data;
                    if (r.status) {
                        const cookies = new Cookies();
                        
                        var maxAge = 7*24*60*60;
                        cookies.set(
                            'joranvestCookie', 
                            JSON.stringify(r.data), 
                            { 
                                path: '/',
                                maxAge: maxAge,
                                httpOnly: false,
                            }
                        );
                        cookies.set(
                            'joranvestCookie', 
                            JSON.stringify(r.data), 
                            { 
                                path: '/',
                                maxAge: maxAge,
                                httpOnly: false,
                                domain: "joranvest.com" 
                            }
                        );

                        dispatch({type: "LOGIN_SUCCESS", user: r.data});
                        resolve(true);
                    } else {
                        dispatch({type: "LOGIN_FAILED", errorMessage: r.message});
                        reject(false);
                    }
                });
           }).catch((error) => {
                var type = "";

                if (error.message === "Firebase: Error (auth/user-not-found).") {
                    type = "EMAIL_NOT_FOUND";
                } else if (error.message === "Firebase: Error (auth/invalid-email).") {
                    type = "INVALID_EMAIL";
                } else if (error.message === "Firebase: Error (auth/wrong-password).") {
                    type = "INVALID_PASSWORD";
                }

                dispatch({type: type, errorMessage: ""});
                dispatch({type: "CHANGE_LOADING", value: false});
                reject(false);
           })
    })
}