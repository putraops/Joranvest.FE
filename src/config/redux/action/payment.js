import firebaseApp from "../../firebase/config";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, deleteUser } from "firebase/auth";
import axiosApi from '../../axiosConfig'
import Cookies from 'universal-cookie';

const auth = getAuth(firebaseApp);

export const showTransferModal = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch({type: "SHOW_TRANSFER_MODAL"});
        resolve(true);
    })
}

export const hideTransferModal = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch({type: "HIDE_TRANSFER_MODAL"});
        resolve(true);
    })
}