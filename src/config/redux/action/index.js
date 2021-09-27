import firebaseApp from "../../firebase/config";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, deleteUser } from "firebase/auth";
import axiosApi from '../../axiosConfig'

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
                reject(false);
            });
        }).catch((error) => {
            console.log("error:", error);
            var type = error.message;
            if (type == "Firebase: Error (auth/email-already-in-use).") {
                type = "ALREADY_IN_USE";
            } else if (type == "Firebase: Password should be at least 6 characters (auth/weak-password).") {
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
               alert("Login Success");
               console.log(user);
               dispatch({type: "CHANGE_LOADING", value: false});
               // axiosApi.post(`/application_user/register`, 
               //     data
               // ).then(r => {
               //     // this.setState({
               //     //     ...this.state, 
               //     //     loading: false,
               //     // }); 
               // });
               resolve(true);
           }).catch((error) => {
                console.log("error:", error);
                var type = error.message;

                if (type == "Firebase: Error (auth/user-not-found).") {
                    type = "EMAIL_NOT_FOUND";
                } else if (type == "Firebase: Error (auth/invalid-email).") {
                    type = "INVALID_EMAIL";
                } else if (type == "Firebase: Error (auth/wrong-password).") {
                    type = "INVALID_PASSWORD";
                }
            

                dispatch({type: type, errorMessage: ""});
                dispatch({type: "CHANGE_LOADING", value: false});
                reject(false);
           })
    })
}