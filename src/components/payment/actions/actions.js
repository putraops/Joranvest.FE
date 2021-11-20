const actions = {
    generateOrderNumber(payment_type) {
        var today = new Date();
        var monthRoman = this.intToRoman(today.getMonth() + 1);

        var payment_code = "";
        if (payment_type === "credit_card") payment_code = "CC";
        if (payment_type === "gopay") payment_code = "GOPAY";
        if (payment_type === "transfer") payment_code = "TRF";

        return "JORAN/" + payment_code + "/" + today.getFullYear() + "/" + monthRoman + "/" + today.getDate() + "" + today.getHours() + "" + today.getMinutes() + "" + today.getSeconds();
    },
    intToRoman(num){
        const map = {
          M:  1000,
          CM: 900,
          D:  500,
          CD: 400,
          C:  100,
          XC: 90,
          L:  50,
          XL: 40,
          X:  10,
          IX: 9,
          V:  5,
          IV: 4,
          I:  1,
        };
        let result = '';
        
        // main algorithm
        for (this.key in map) {
            result += this.key.repeat(Math.floor(num / map[this.key]));
            num %= map[this.key];
        }
        return result;
    }
}
export default actions