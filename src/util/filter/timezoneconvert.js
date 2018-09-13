// import moment from 'moment'
const format = (date, fmt) => {
    var o = {
        "M+": date.getMonth() + 1, //月份 
        "d+": date.getDate(), //日 
        "h+": date.getHours(), //小时 
        "m+": date.getMinutes(), //分 
        "s+": date.getSeconds(), //秒 
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
        "S": date.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

// 获取今天零点时间戳
const getTodayZeroTime = () => {
    return new Date(new Date().toLocaleDateString()).getTime()
}

// 将中国时间转换成当地时间
const convertChinaTime = (timeMillis, dateFormat) => {
    if (timeMillis == null) {
        return "";
    }

    if (isNaN(timeMillis)) {
        // yyyy-MM-dd HH:mm
        if (/^\d{4}-\d{1,2}-\d{1,2} \d{1,2}:\d{1,2}:\d{1,2}$/.test(timeMillis)) {
            let strDate = timeMillis;
            var times = strDate.split(" ");
            var time1 = times[0].split("-");
            var time2 = times[1].split(":");
            timeMillis = new Date(time1[0], time1[1] - 1, time1[2], time2[0], time2[1], time2[2]).getTime();
        }else{
            return timeMillis;
        }
    }

    var nowDate = new Date();
    // var timezoneOffset = nowDate.getTimezoneOffset();
    var resultDate = new Date(timeMillis)

    if (dateFormat != null && dateFormat != "") {//如果有指定格式的话, 就按指定格式输出
        return format(resultDate, dateFormat);
    }

    // yyyy-MM-dd HH:mm:ss
    var difSec = parseInt((nowDate.getTime() - resultDate.getTime()) / 1000);
    if (difSec < 0) {//未来时间
        return format(resultDate, "yyyy-MM-dd hh:mm");
    }

    if (difSec < 60) {//1分钟内
        return "刚刚";
    } else if (difSec < (60 * 60)) {//1小时内
        return parseInt(difSec / 60) + "分钟前";
    } else if (difSec < (60 * 60 * 24) && resultDate.getTime() >= getTodayZeroTime()) {//在今天内
        return parseInt(difSec / 3600) + "小时前";
    } else {
        if (resultDate.getTime() < getTodayZeroTime() && resultDate.getTime() > (getTodayZeroTime() - 24 * 60 * 60 * 1000)) {// 昨天内
            return "昨天 " + format(resultDate, "hh:mm");
        }
        if (resultDate.getFullYear() == nowDate.getFullYear()) {//是同一年的话
            return format(resultDate, "MM-dd hh:mm");
        } else {
            return format(resultDate, "yyyy-MM-dd hh:mm");
        }
    }
}
export default convertChinaTime;
