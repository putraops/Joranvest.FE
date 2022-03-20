const validate = {
    phoneNumberID(value) {
        value = String(value).trim();
        if (value.startsWith("0")) {
            value = '+62' + value.slice(1);
        } else if (value.startsWith('+62')) {
            value = '+62' + value.slice(3);
        } else if (value.startsWith('62')) {
            value = '+62' + value.slice(2);
        } else {
            return false
        }
        value = value.replace(/[- .]/g, '');
        return value;
    },
}
export default validate