import axiosApi from '../../../config/axiosConfig';

// This is a service by Xendit
export async function CreateEWalletPayment(payload){
    return axiosApi.post(`/payment/createEWalletPayment`, payload);
}