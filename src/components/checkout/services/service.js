import axiosApi from "../../../config/axiosConfig"

var services = ["webinar", "membership", "joranvest-chart-system"];

export function getWebinarById(id) {
    return axiosApi.get(`/webinar/getById/${id}`);
}

export function getMembershipById(id) {
    return axiosApi.get(`/membership/getById/${id}`);
}

export function getProductById(id) {
    return axiosApi.get(`/product/getViewById/${id}`);
}

export function getProductByRecordId(record_id) {
    return axiosApi.get(`/product/getProductByRecordId/${record_id}`);
}

export function getPaymentById(id) {
    return axiosApi.get(`/payment/getById/${id}`);
}

export async function CreateEWalletPayment(payload){
    return axiosApi.post(`/payment/createEWalletPayment`, payload);
}

export async function CreateQRCode(payload){
    return axiosApi.post(`/payment/createQRCode`, payload);
}

export function getEWalletPaymentStatusByReferenceId(id) {
    return axiosApi.get(`/payment/getEWalletPaymentStatusByReferenceId/${id}`);
}

export function updateWalletPaymentStatus(payload) {
    return axiosApi.post(`/payment/updateWalletPaymentStatus`, payload);
}

export function isServiceAvailable(name) {
    if (services.indexOf(name.toLowerCase()) >= 0) {
        return true;
    } else {
        return false;
    }
}