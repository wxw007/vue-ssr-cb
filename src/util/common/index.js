export default {
    /**
     * 判断字符str是否为空
     */
    isEmpty (str) {
        if (str == null || str.length == 0) {
            return true;
        }
        return false;
    }
}