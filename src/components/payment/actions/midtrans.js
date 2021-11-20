import axiosApi from '../../../config/axiosConfig';
import sideNotification from '../../../commons/sideNotification';

const midtrans = {
    createTokenByCard(payload) {
        return new Promise((resolve, reject) => {
            axiosApi.post(`/payment/createTokenByCard`, payload)
            .then(res => {
                var r = res.data
                if (r.status) {
                    resolve(r.data);
                } else {
                    reject(r.data);
                    sideNotification.open("Kartu tidak Valid", "Silahkan masukkan informasi Kartu yang benar.", false);
                }
            });
        });
    },
    payment(payload) {
        return new Promise((resolve, reject) => {
            axiosApi.post(`/payment/charge`, payload)
            .then(res => {
                var r = res.data
                if (r.status || 
                    (r.data.status_code === "201" && (r.data.payment_type === "credit_card" || r.data.payment_type === "gopay"))) {
                    if (payload.payment_type === "credit_card") {
                        resolve(r.data);
                    } else if (payload.payment_type === "gopay") {
                        if (r.data.transaction_status === "pending") {
                            //-- Open QR
                            var redirect_url = "";
                            for (var i = 0; i < r.data.actions.length; i++) {
                                if (r.data.actions[i].name === "generate-qr-code") {
                                    redirect_url = r.data.actions[i].url;
                                }
                            }
                            resolve(redirect_url);
                        }
                    }
                } else {
                    if (r.data.validation_messages.length > 0) {
                        for (var i = 0; i < r.data.validation_messages.length; i++) {
                            sideNotification.open("Informasi", r.data.validation_messages[i], false);
                        }
                    } 
                    // sideNotification.open("Kartu tidak Valid", "Silahkan masukkan informasi Kartu yang benar.", false);
                }
            });
        })
    }
}
export default midtrans