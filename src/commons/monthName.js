const monthName = {
    getNameByLangID(number) {
        var name = "";
        if (number === "01") name = "Januari";
        if (number === "02") name = "Februari";
        if (number === "03") name = "Maret";
        if (number === "04") name = "April";
        if (number === "05") name = "Mei";
        if (number === "06") name = "Juni";
        if (number === "07") name = "Juli";
        if (number === "08") name = "Agustus";
        if (number === "09") name = "September";
        if (number === "10") name = "Oktober";
        if (number === "11") name = "November";
        if (number === "12") name = "Desember";
        return name;
    },
}
export default monthName