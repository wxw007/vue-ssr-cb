if(!process.browser){
    return ;
}
var win = $(window);
setRootFontSize = function () {
    var ww = win.width();
    var wh = win.height()
    var root;
    if (ww < 320) root = 40;
    else if (320 <= ww && ww < 1024) root = ww * 133 / 1024;
    else if (1024 <= ww) root = 133;

    $("html").css("font-size", root + "px");
    var ua = navigator.userAgent.toLowerCase();

    if (ua.indexOf('ucbrowser') > -1 || ua.indexOf('qqbrowser') > -1) {
        fixUCrem();
    }
}
win.on('resize', setRootFontSize).on('load', setRootFontSize).resize()


//破除uc浏览器bug
function fixUCrem () {
    var selectors = [];
    var ss = [].slice.call(document.styleSheets);

    function pickSelectors (ss) {
        var rules = ss.cssRules || ss.rules;

        var re = /[^;]*rem(\s+|;|\})/i;
        [].slice.call(rules).forEach(function (rule) {
            if (re.test(rule.cssText)) {
                selectors.push(trim(rule.selectorText));
            }
        });
    }
    ss.forEach(pickSelectors);
    $(selectors.join(',')).css('zIndex', function (idx, val) {
        return isNaN(val) ? 1 : val - 0 + 1;
    });
}