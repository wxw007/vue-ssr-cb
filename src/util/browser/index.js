export default {
    isIE () {
        if (window.navigator.userAgent.indexOf("MSIE") >= 1)
            return true;
        else
            return false;
    }
}