import moment from 'moment';
const dateFormat = {
    getLongDateFormatID(date) {
        var day = moment(date, "YYYY/MM/DD").format('DD');
        var number = moment(date, "YYYY/MM/DD").format('MM');
        var year = moment(date, "YYYY/MM/DD").format('YYYY');
        var month_name = this.getMonthNameID(number);
        return day + " " + month_name + " " + year;
    },
    getLongDateTimeFormatID(date) {
        var day = moment(date, "YYYY/MM/DD").format('DD');
        var number = moment(date, "YYYY/MM/DD").format('MM');
        var year = moment(date, "YYYY/MM/DD").format('YYYY');
        var time = moment(date, "YYYY/MM/DD HH:mm").format('HH:mm');
        var dayName = moment(date,  "YYYY/MM/DD HH:mm").format('dddd');
        dayName = this.getDayNameID(dayName);
        var month_name = this.getMonthNameID(number);

        return dayName + ", " + day + " " + month_name + " " + year + " | " + time;
    },
    getInteractiveLongDateTimeFormatID(date) {
        var day = moment(date, "YYYY/MM/DD").format('DD');
        var number = moment(date, "YYYY/MM/DD").format('MM');
        var year = moment(date, "YYYY/MM/DD").format('YYYY');
        var time = moment(date, "YYYY/MM/DD HH:mm").format('HH:mm');
        var dayName = moment(date,  "YYYY/MM/DD HH:mm").format('dddd');
        dayName = this.getDayNameID(dayName);
        var month_name = this.getMonthNameID(number);
        
        var interactiveFormat = moment.utc(date).local().startOf('seconds').fromNow();
        if (interactiveFormat.includes("minutes") || interactiveFormat.includes("hours")) {
            return "Last updated " + interactiveFormat;
        } else {
            return dayName + ", " + day + " " + month_name + " " + year + " | " + time;
        }
    },
    getMonthNameID(number) {
        var month_name = "";
        if (number === "01") month_name = "Januari";
        if (number === "02") month_name = "Februari";
        if (number === "03") month_name = "Maret";
        if (number === "04") month_name = "April";
        if (number === "05") month_name = "Mei";
        if (number === "06") month_name = "Juni";
        if (number === "07") month_name = "Juli";
        if (number === "08") month_name = "Agustus";
        if (number === "09") month_name = "September";
        if (number === "10") month_name = "Oktober";
        if (number === "11") month_name = "November";
        if (number === "12") month_name = "Desember";
        return month_name
    },
    getDayNameID(dayName) {
        if (dayName == "Monday") dayName = "Senin";
        if (dayName == "Tuesday") dayName = "Selasa";
        if (dayName == "Wednesday") dayName = "Rabu";
        if (dayName == "Thursday") dayName = "Kamis";
        if (dayName == "Friday") dayName = "Jumat";
        if (dayName == "Saturday") dayName = "Sabtu";
        if (dayName == "Sunday") dayName = "Minggu";
        return dayName
    }
}
export default dateFormat